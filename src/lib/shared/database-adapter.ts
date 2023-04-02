import { adapterCreateAccount } from '$lib/api/account/mutation';
import { adapterGetUserByAccount } from '$lib/api/account/query';
import {
  adapterCreateSession,
  adapterDeleteSession,
  adapterUpdateSession,
} from '$lib/api/session/mutation';
import { adapterGetSessionAndUser } from '$lib/api/session/query';
import { adapterCreateUser, adapterUpdateUser } from '$lib/api/user/mutation';
import { getUserById } from '$lib/api/user/query';
import type {
  Adapter, AdapterAccount, AdapterSession, AdapterUser,
} from '@auth/core/adapters';

export default function DatabaseAdapter(): Adapter {
  return {
    createUser: async (user: Omit<AdapterUser, 'id'>): Promise<AdapterUser> => {
      const dbUser = await adapterCreateUser(user);
      return dbUser;
    },
    getUser: async (id: string): Promise<AdapterUser | null> => {
      const user = await getUserById(id, 'id');
      return user;
    },
    getUserByEmail: async (email: string): Promise<AdapterUser | null> => {
      const user = await getUserById(email, 'email');
      return user;
    },
    updateUser: async (user: Partial<AdapterUser>): Promise<AdapterUser> => {
      const dbUser = await adapterUpdateUser(user);
      return dbUser;
    },
    createSession: async (session: {
      sessionToken: string;
      userId: string;
      expires: Date;
    }): Promise<AdapterSession> => {
      const dbSession = await adapterCreateSession(session);
      return dbSession;
    },
    deleteSession: async (sessionToken: string) => {
      const dbSession = await adapterDeleteSession(sessionToken);
      return dbSession;
    },
    updateSession: async (
      session: Partial<AdapterSession> & Pick<AdapterSession, 'sessionToken'>,
    ): Promise<AdapterSession | null | undefined> => {
      const dbSession = await adapterUpdateSession(session);
      return dbSession;
    },
    getUserByAccount: async (
      providerAccountId: Pick<AdapterAccount, 'provider' | 'providerAccountId'>,
    ): Promise<AdapterUser | null> => {
      const user = await adapterGetUserByAccount(providerAccountId);
      return user;
    },
    linkAccount: async (account: AdapterAccount) => {
      const dbAccount = await adapterCreateAccount(account);
      return dbAccount;
    },
    getSessionAndUser: async (
      sessionToken: string,
    ): Promise<{ session: AdapterSession; user: AdapterUser } | null> => {
      const result = await adapterGetSessionAndUser(sessionToken);
      return result;
    },
  };
}
