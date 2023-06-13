export interface Ad {
  id: string;
  title: string;
  price: string;
  userId: string;
  images: string[];
  createdAt: Date;
  deletedAt?: Date;
  isLive: boolean;
  viewedBy: string[];
  description: string;
  categoryId: number;
  showUserEmail: boolean;
  showUserMobile: boolean;
}
