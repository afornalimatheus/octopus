export class CreateUserDto {
  name: string;
  email: string;
  password: string;
}

export class UpdateUserDto {
  name?: string;
  email?: string;
  password?: string;
}

export class User {
  id: string;
  name: string;
  email: string;
  password: string;
  alreadyDoneTutorial: boolean;
  lastLifeLostAt?: Date | null;
  exp: number;
  life: number;
  createdAt: Date;
  updatedAt: Date;
}
