export class UserResponseDto {
  id: number;
  clerkId?: string;
  name?: string;
  email: string;
  status: boolean;
  deletedAt?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}
