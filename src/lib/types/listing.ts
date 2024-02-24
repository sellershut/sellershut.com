export type Listing = {
  id: string;
  userId: string;
  title: string;
  description: string;
  price: number;
  categoryId: string;
  imageUrl: string;
  otherImages: string[];
  active: boolean;
  tags: string[];
  location: string;
  liked_by: string[];
  created_at: Date;
  updated_at?: Date;
  deleted_at?: Date;
}
