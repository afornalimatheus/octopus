export class ModuleDto {
  id?: string;
  label: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;
}

export class CreateModuleDto {
  label: string;

  constructor(partial: Partial<CreateModuleDto>) {
    Object.assign(this, partial);
  }
}
