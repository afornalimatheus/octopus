import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { PrismaService } from 'prisma/prisma.service';
import { UsersService } from '../users/users.service';
import type { User } from 'src/users/dto/create-user-dto';

@Injectable()
export class ScheduleService {
  private readonly logger = new Logger(ScheduleService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly usersService: UsersService,
  ) {}

  @Cron(CronExpression.EVERY_10_SECONDS)
  async handleLifeRecovery() {
    const users = await this.usersService.findUsersWithOneLife();

    this.logger.log(
      `Verificando recuperação de vida para ${users.length} usuários`,
    );

    for (const user of users) {
      if (this.shouldRecoverLife(user)) {
        await this.usersService.addLife(user.id);
        this.logger.log(`Vida recuperada para o usuário ${user.id}`);
      }
    }
  }

  private shouldRecoverLife(user: User): boolean {
    if (!user.lastLifeLostAt) {
      this.logger.log(`Usuário ${user.id} não tem lastLifeLostAt definido`);
      return false;
    }

    const now = new Date();
    const lastLifeLostAt = new Date(user.lastLifeLostAt);
    const oneHour = 60 * 60 * 1000;
    const timeSinceLastLifeLost = now.getTime() - lastLifeLostAt.getTime();

    if (timeSinceLastLifeLost < oneHour) {
      this.logger.log(`Ainda não passou 1 hora para o usuário ${user.id}`);
      return false;
    }

    return true;
  }
}
