import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { User, CreateUserDto } from './dto/create-user-dto';
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
    const hashedPassword = await this.hashPassword(data.password);

    return this.prisma.user.create({
      data: {
        ...data,
        password: hashedPassword,
      },
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
      throw new Error('User not found');
    }

    if (user.life <= 0) {
      throw new Error('User has no lives left');
    }

    const newLife = user.life - 1;

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
      throw new Error('User not found');
    }

    if (user.life >= 3) {
      throw new Error('User has maximum lives');
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
      throw new Error('User not found');
    }

    if (user.exp < 100) {
      throw new Error('User does not have enough experience points');
    }

    if (user.life >= 3) {
      throw new Error('User has maximum lives');
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
      throw new Error('User not found');
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
      throw new Error('User not found');
    }

    const newExp = user.exp - exp;

    const updatedUser = await this.prisma.user.update({
      where: { id },
      data: { exp: newExp },
    });

    return updatedUser;
  }
}
