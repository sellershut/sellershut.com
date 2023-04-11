import {
  type Adapter,
  type AdapterAccount,
  type AdapterSession,
  type AdapterUser,
} from '@auth/core/adapters';
import type { Awaitable } from '@auth/core/types';
import apiCreateUser from './user/mutation';

export const DatabaseAdapter: Adapter = {
  createUser(user: Omit<AdapterUser, 'id'>): Awaitable<AdapterUser> {
    return apiCreateUser(user);
  },
  getUser(id: string): Awaitable<AdapterUser | null> {
    throw new Error('Function not implemented.');
  },
  getUserByEmail(email: string): Awaitable<AdapterUser | null> {
    throw new Error('Function not implemented.');
  },
  getUserByAccount(
    providerAccountId: Pick<AdapterAccount, 'provider' | 'providerAccountId'>,
  ): Awaitable<AdapterUser | null> {
    throw new Error('Function not implemented.');
  },
  updateUser(user: Partial<AdapterUser>): Awaitable<AdapterUser> {
    throw new Error('Function not implemented.');
  },
  linkAccount(
    account: AdapterAccount,
  ): Promise<void> | Awaitable<AdapterAccount | null | undefined> {
    throw new Error('Function not implemented.');
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
