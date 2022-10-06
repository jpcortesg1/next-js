export interface User {
  id: number;
  birthDate: string;
  created_at: string;
  identificationNumber: number;
  name: string;
  publishedAt: string;
  updatedAt: string;
}

export interface CreateUser
  extends Omit<User, "id" | "created_at" | "publishedAt" | "updatedAt"> {}

export interface UpdateUser extends Partial<CreateUser> {}
