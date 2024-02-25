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
  negotiable: boolean;
  tags: string;
  location: number[];
  likedBy: string[];
  createdAt: Date;
};
