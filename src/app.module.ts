import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { RankingModule } from './ranking/ranking.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'mysql_db',
      port: 3306,
      database: 'octopus',
      entities: [],
      username: 'root',
      password: '123',
      synchronize: true,
    }),
    AuthModule,
    UsersModule,
    RankingModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
