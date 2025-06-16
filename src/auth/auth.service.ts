import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from 'src/users/dto/create-user-dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(
    username: string,
    pass: string,
  ): Promise<{ access_token: string; user: Omit<User, 'password'> }> {
    const user = await this.usersService.findOne(username);

    if (!user) {
      throw new UnauthorizedException('E-mail não encontrado.');
    }

    if (!(await this.validatePassword(pass, user.password))) {
      throw new UnauthorizedException('Senha incorreta.');
    }

    const payload = { sub: user.id, email: user.email };

    const { password, ...userWithoutPassword } = user;

    return {
      access_token: await this.jwtService.signAsync(payload),
      user: userWithoutPassword,
    };
  }

  async validatePassword(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(password, hashedPassword);
  }
}
