export class ContentDto {
  id?: string;
  label: string;
  moduleId: string;
  duration: number;
  hits: number;
  exp: number;
  completedAt?: Date | null;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;

  constructor(partial: Partial<ContentDto>) {
    Object.assign(this, partial);
  }
}

export class CreateContentDto {
  label: string;
  duration: number;
  exp: number;

  constructor(partial: Partial<CreateContentDto>) {
    Object.assign(this, partial);
  }
}
