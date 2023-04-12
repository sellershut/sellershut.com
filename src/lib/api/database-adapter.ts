import type {
  Adapter,
  AdapterAccount,
  AdapterSession,
  AdapterUser,
} from '@auth/core/adapters';
import type { Awaitable } from '@auth/core/types';
import { apiCreateUser, apiUpdateUser } from './user/mutation';
import {
  apiGetUser,
  apiGetUserByAccount,
  apiGetUserByEmail,
} from './user/query';
import { apiLinkAccount } from './account/mutation';

export const DatabaseAdapter: Adapter = {
  createUser(user: Omit<AdapterUser, 'id'>): Awaitable<AdapterUser> {
    return apiCreateUser(user);
  },
  getUser(id: string): Awaitable<AdapterUser | null> {
    return apiGetUser(id);
  },
  getUserByEmail(email: string): Awaitable<AdapterUser | null> {
    return apiGetUserByEmail(email);
  },
  getUserByAccount(
    providerAccountId: Pick<AdapterAccount, 'provider' | 'providerAccountId'>,
  ): Awaitable<AdapterUser | null> {
    return apiGetUserByAccount(providerAccountId);
  },
  updateUser(user: Partial<AdapterUser>): Awaitable<AdapterUser> {
    return apiUpdateUser(user);
  },
  linkAccount(
    account: AdapterAccount,
  ): Promise<void> | Awaitable<AdapterAccount | null | undefined> {
    return apiLinkAccount(account);
  },
  createSession(session: {
    sessionToken: string;
    userId: string;
    expires: Date;
  }): Awaitable<AdapterSession> {
    throw new Error('Function not implemented.');
  },
  getSessionAndUser(
    sessionToken: string,
  ): Awaitable<{ session: AdapterSession; user: AdapterUser } | null> {
    throw new Error('Function not implemented.');
  },
  updateSession(
    session: Partial<AdapterSession> & Pick<AdapterSession, 'sessionToken'>,
  ): Awaitable<AdapterSession | null | undefined> {
    throw new Error('Function not implemented.');
  },
  deleteSession(
    sessionToken: string,
  ): Promise<void> | Awaitable<AdapterSession | null | undefined> {
    throw new Error('Function not implemented.');
  },
};

export default DatabaseAdapter;
