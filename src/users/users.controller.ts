import { Controller, Post, Body, Get, UseGuards, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user-dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(AuthGuard)
  @Get()
  async getUsers() {
    return this.usersService.findAll();
  }

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }

  @UseGuards(AuthGuard)
  @Post(':id/complete-tutorial')
  async completeTutorial(@Param('id') id: string) {
    return this.usersService.completeTutorial(id);
  }

  @UseGuards(AuthGuard)
  @Post(':id/remove-life')
  async removeLife(@Param('id') id: string) {
    return this.usersService.removeLife(id);
  }

  @UseGuards(AuthGuard)
  @Post(':id/add-life')
  async addLife(@Param('id') id: string) {
    return this.usersService.addLife(id);
  }

  @UseGuards(AuthGuard)
  @Post(':id/recovery-life')
  async recoveryLife(@Param('id') id: string) {
    return this.usersService.recoveryLife(id);
  }

  @UseGuards(AuthGuard)
  @Post(':id/add-exp')
  async addExp(@Param('id') id: string, @Body('exp') exp: number) {
    return this.usersService.addExp(id, exp);
  }

  @UseGuards(AuthGuard)
  @Post(':id/remove-exp')
  async removeExp(@Param('id') id: string, @Body('exp') exp: number) {
    return this.usersService.removeExp(id, exp);
  }
}
