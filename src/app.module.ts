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
import { UserProgressModule } from './user-progress/user-progress.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '54.94.221.214',
      port: 3306,
      database: 'octopus',
      entities: [],
      username: 'admin',
      password: 'amanda_power_user',
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
    UserProgressModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
