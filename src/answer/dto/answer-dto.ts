import { Prisma } from '@prisma/client';

export class AnswerDto {
  id?: string;
  userId: string;
  exerciseId: string;
  answer?: Prisma.InputJsonValue | null;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;
}