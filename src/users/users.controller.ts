import {
  Controller,
  Post,
  Body,
  Get,
  UseGuards,
  Param,
  Patch,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, type UpdateUserDto } from './dto/create-user-dto';
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

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.updateUser(id, updateUserDto);
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
