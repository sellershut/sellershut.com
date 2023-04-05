/* eslint-disable max-len */
import { adapterCreateAccount, adapterDeleteAccount } from '$lib/api/account/mutation';
import { adapterGetUserByAccount } from '$lib/api/account/query';
import {
  adapterCreateSession,
  adapterDeleteSession,
  adapterUpdateSession,
} from '$lib/api/session/mutation';
import { adapterGetSessionAndUser } from '$lib/api/session/query';
import { adapterCreateUser, adapterDeleteUser, adapterUpdateUser } from '$lib/api/user/mutation';
import { getUserById } from '$lib/api/user/query';
import {
  adapterCreateVerificationToken,
  adapterDeleteVerificationToken,
} from '$lib/api/verification_token/mutation';
import type {
  Adapter,
  AdapterAccount,
  AdapterSession,
  AdapterUser,
  VerificationToken,
} from '@auth/core/adapters';

export const DatabaseAdapter: Adapter = {
  createUser: (user: Omit<AdapterUser, 'id'>): Promise<AdapterUser> => adapterCreateUser(user),
  getUser: (id: string): Promise<AdapterUser | null> => getUserById(id, 'id'),
  getUserByEmail: (email: string): Promise<AdapterUser | null> => getUserById(email, 'email'),
  getUserByAccount: (
    providerAccountId: Pick<AdapterAccount, 'provider' | 'providerAccountId'>,
  ): Promise<AdapterUser | null> => adapterGetUserByAccount(providerAccountId),
  updateUser: (user: Partial<AdapterUser>): Promise<AdapterUser> => adapterUpdateUser(user),
  deleteUser: (userId: string) => adapterDeleteUser(userId),
  linkAccount: (account: AdapterAccount) => adapterCreateAccount(account),
  unlinkAccount: (account: Pick<AdapterAccount, 'provider' | 'providerAccountId'>) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { provider, providerAccountId } = account;
    return adapterDeleteAccount(account);
  },
  getSessionAndUser: (
    sessionToken: string,
  ): Promise<{
    session: AdapterSession;
    user: AdapterUser;
  } | null> => adapterGetSessionAndUser(sessionToken),
  createSession: (session: {
    sessionToken: string;
    userId: string;
    expires: Date;
  }): Promise<AdapterSession> => adapterCreateSession(session),
  updateSession: (
    session: Partial<AdapterSession> & Pick<AdapterSession, 'sessionToken'>,
  ): Promise<AdapterSession | null | undefined> => adapterUpdateSession(session),
  deleteSession: (sessionToken: string) => adapterDeleteSession(sessionToken),
  createVerificationToken: (verificationToken: VerificationToken): Promise<VerificationToken> => {
    const token = verificationToken;
    return adapterCreateVerificationToken(token);
  },
  useVerificationToken: (params: { identifier: string; token: string }) => {
    const { identifier, token } = params;
    return adapterDeleteVerificationToken(identifier, token);
  },
};

export default DatabaseAdapter;
