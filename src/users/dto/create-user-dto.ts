export class CreateUserDto {
  name: string;
  email: string;
  password: string;
}

export class User {
  id: number;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
}
