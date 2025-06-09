import { Prisma } from '@prisma/client';

export class ExerciseDto {
  id?: string;
  contentId: string;
  type: 'fill_blanks' | 'only_choice' | 'true_false' | 'combining_pairs';
  description: string;
  template: string;
  data?: Prisma.InputJsonValue | null;
  blanks: string;
  answer: string;
  explanation: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;
}
