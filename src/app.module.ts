import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { RankingModule } from './ranking/ranking.module';
import { ScheduleModule } from '@nestjs/schedule';
import { ScheduleModule as MyScheduleModule } from './schedule/schedule.module';

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
    ScheduleModule.forRoot(),
    MyScheduleModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
