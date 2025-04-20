export interface IUser {
  _id: string;
  name: string;
  email: string;  
  phone?: string;
  password?: string;
  role: "tenant" | "admin" | "landlord"; 
  createdAt?: Date;
  updatedAt?: Date;
  __v?: number;
  token?: string;
}