/*
 * model User {
 *   id            String    @id @default(cuid())
 *   name          String?
 *   email         String?   @unique
 *   emailVerified DateTime? @map("email_verified")
 *   image         String?
 *   accounts      Account[]
 *   sessions      Session[]
 *
 *   @@map("users")
 * }
 * */
export type IUser = {
  id: string;
  name?: string | null;
  email: string;
  emailVerified: Date | null;
  image?: string | null;
};
