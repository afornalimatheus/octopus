import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { User, CreateUserDto, type UpdateUserDto } from './dto/create-user-dto';
@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  async findOne(username: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: {
        email: username,
      },
    });
  }

  async createUser(data: CreateUserDto) {
    const existingUser = await this.prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (existingUser) {
      throw new BadRequestException(
        'Este e-mail já está cadastrado. Por favor, use outro ou entre em contato com o suporte.',
      );
    }

    const hashedPassword = await this.hashPassword(data.password);

    return this.prisma.user.create({
      data: {
        ...data,
        password: hashedPassword,
      },
    });
  }

  async updateUser(id: string, data: Partial<UpdateUserDto>) {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new BadRequestException('Usuario não encontrado.');
    }

    if (data.password) {
      data.password = await this.hashPassword(data.password);
    }

    return this.prisma.user.update({
      where: { id },
      data,
    });
  }

  async completeTutorial(id: string) {
    return this.prisma.user.update({
      where: { id },
      data: { alreadyDoneTutorial: true },
    });
  }

  async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
  }

  async removeLife(id: string): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new BadRequestException('Usuario não encontrado.');
    }

    if (user.life <= 0) {
      throw new BadRequestException(
        'O usuário não tem vidas para ser removidas.',
      );
    }

    const newLife = user.life - 1;

    if (newLife === 0) {
      await this.prisma.user.update({
        where: { id },
        data: {
          lastLifeLostAt: new Date(),
        },
      });
    }

    const updatedUser = await this.prisma.user.update({
      where: { id },
      data: { life: newLife },
    });

    return updatedUser;
  }

  async addLife(id: string): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new BadRequestException('Usuário não encontrado.');
    }

    if (user.life >= 3) {
      throw new BadRequestException('O máximo sao 3 vidas por usuário.');
    }

    const newLife = user.life + 1;

    const updatedUser = await this.prisma.user.update({
      where: { id },
      data: { life: newLife },
    });

    return updatedUser;
  }

  async recoveryLife(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new BadRequestException('Usuário não encontrado.');
    }

    if (user.exp < 100) {
      throw new BadRequestException(
        'User does not have enough experience points',
      );
    }

    if (user.life >= 3) {
      throw new BadRequestException('O máximo são 3 vidas por usuário.');
    }

    const newLife = user.life + 1;
    const newExp = user.exp - 100;

    const updatedUser = await this.prisma.user.update({
      where: { id },
      data: {
        life: newLife,
        exp: newExp,
      },
    });

    return updatedUser;
  }

  async addExp(id: string, exp: number) {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new BadRequestException('Usuario não encontrado.');
    }

    const newExp = user.exp + exp;

    const updatedUser = await this.prisma.user.update({
      where: { id },
      data: { exp: newExp },
    });

    return updatedUser;
  }

  async removeExp(id: string, exp: number) {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new BadRequestException('Usuario não encontrado.');
    }

    const newExp = user.exp - exp;

    const updatedUser = await this.prisma.user.update({
      where: { id },
      data: { exp: newExp },
    });

    return updatedUser;
  }

  async findUsersWithOneLife() {
    return this.prisma.user.findMany({
      where: {
        life: 0,
      },
    });
  }
}
