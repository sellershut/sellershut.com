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
  linkAccount: (account: AdapterAccount) => adapterCreateAccount(account),
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
  createVerificationToken: (verificationToken: VerificationToken): Promise<VerificationToken> =>
    adapterCreateVerificationToken(verificationToken),
  useVerificationToken: (params: { identifier: string; token: string }) =>
    adapterDeleteVerificationToken(identifierToken),
};

export default DatabaseAdapter;
