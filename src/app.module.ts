import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { RankingModule } from './ranking/ranking.module';
import { ScheduleModule } from '@nestjs/schedule';
import { ScheduleModule as MyScheduleModule } from './schedule/schedule.module';
import { ContentModule } from './content/content.module';
import { ModuleModule } from './module/module.module';
import { ExerciseModule } from './exercise/exercise.module';
import { AnswerModule } from './answer/answer.module';

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
    ContentModule,
    ModuleModule,
    ExerciseModule,
    AnswerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
