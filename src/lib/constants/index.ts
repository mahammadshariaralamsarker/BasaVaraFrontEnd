import { z } from "zod";

export const formSchema = z.object({
  title: z.string().min(3, {
    message: "Title must be at least 3 characters.",
  }),
  location: z.string().min(3, {
    message: "Location must be at least 3 characters.",
  }),
  price: z.coerce.number().positive({
    message: "Price must be a positive number.",
  }),
  rent: z.coerce.number().positive({
    message: "Rent must be a positive number.",
  }),
  bedrooms: z.coerce.number().int().positive({
    message: "Bedrooms must be a positive integer.",
  }),
  bathrooms: z.coerce.number().positive({
    message: "Bathrooms must be a positive number.",
  }),
  area: z.coerce.number().positive({
    message: "Area must be a positive number.",
  }),
  status: z.enum(["Available", "Rented", "Pending"]),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  amenities: z.array(z.string()).optional(),
});
