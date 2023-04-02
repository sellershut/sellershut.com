import { adapterCreateUser } from '$lib/api/user/mutation/create-user';
import { /* getUserByAccountId, */ getUserById } from '$lib/api/user/query';
import type { Adapter, AdapterUser } from '@auth/core/adapters';

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
  };
}
