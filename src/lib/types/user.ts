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
export interface TProduct {
  _id: string
  title: string
  location: string
  description: string
  rent: string
  bedrooms: string
  bathrooms: string
  imageUrls: string[]
  images?: string[]
  LandlordID: string
  area: string
  houseStatus?: "available" | "rented"
}
export interface TProduct {
  _id: string
  title: string
  location: string
  description: string
  rent: string
  bedrooms: string
  bathrooms: string
  imageUrls: string[]
  images?: string[]
  LandlordID: string
  area: string
  houseStatus?: "available" | "rented"
}
 