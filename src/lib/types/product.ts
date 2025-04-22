export interface IProduct {
  _id: string;
  title: string;
  location: string;
  description: string;
  rent: string;
  bedrooms: string;
  bathrooms: string;
  imageUrls: string[];
  LandlordID: string;
  area: string;
  houseStatus: "available" | "rented";
  createdAt: string;
  updatedAt: string;
  __v?: number;
}
