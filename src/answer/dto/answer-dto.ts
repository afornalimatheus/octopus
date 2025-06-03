export class AnswerDto {
  id?: string;
  userId: string;
  exerciseId: string;
  answer: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;
}
