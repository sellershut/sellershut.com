import type { IUser } from './user';

export type ISession = {
  id?: string;
  sessionToken: string;
  userId: string;
  expires: Date;
};

declare global {
  type LoginSession = {
    user?: IUser;
    expires?: Date;
    accessToken?: string | null;
  };
}
