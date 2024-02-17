import type {
  Adapter,
  AdapterAccount,
  AdapterSession,
  AdapterUser,
  VerificationToken,
} from '@auth/core/adapters';
import type { Awaitable } from '@auth/core/types';
import axios from 'axios';

export class Driver {
  users_api: string;

  constructor(api: string) {
    this.users_api = api;
  }

  createUser(user: AdapterUser): Awaitable<AdapterUser> {
    return axios
      .post(this.users_api, {
        query: `mutation createUser($name: String, $emailVerified: Date, $email: String, $image: String) {
          createUser(input: { name: $name, email: $email, emailVerified: $emailVerified, image: $image}) {
            id,
            name,
            emailVerified,
            image,
            email
          }
        }`,
        variables: {
          name: user.name,
          email: user.email,
          image: user.image,
          emailVerified: user.emailVerified,
        },
      })
      .then(
        ({
          data: {
            data: { createUser },
          },
        }) => {
          const returnedUser: AdapterUser = {
            name: createUser.name,
            id: createUser.id,
            emailVerified: createUser.emailVerified,
            email: createUser.email,
            image: createUser.image,
          };
          return returnedUser;
        }
      );
  }

  getUser(id: string): Awaitable<AdapterUser | null> {
    return axios
      .post(this.users_api, {
        query: `query userById($id: String) {
          userById(id: $id) {
            id,
            name,
            emailVerified,
            image,
            email
          }
        }`,
        variables: {
          id,
        },
      })
      .then(
        ({
          data: {
            data: { userById },
          },
        }) => {
          if (userById) {
            const returnedUser: AdapterUser = {
              name: userById.name,
              id: userById.id,
              emailVerified: userById.emailVerified,
              email: userById.email,
              image: userById.image,
            };
            return returnedUser;
          }
          return null;
        }
      );
  }

  getUserByEmail(email: string): Awaitable<AdapterUser | null> {
    return axios
      .post(this.users_api, {
        query: `query userByEmail($email: String) {
          userByEmail(email: $email) {
            id,
            name,
            emailVerified,
            image,
            email
          }
        }`,
        variables: {
          email,
        },
      })
      .then(
        ({
          data: {
            data: { userByEmail },
          },
        }) => {
          if (userByEmail) {
            const returnedUser: AdapterUser = {
              name: userByEmail.name,
              id: userByEmail.id,
              emailVerified: userByEmail.emailVerified,
              email: userByEmail.email,
              image: userByEmail.image,
            };
            return returnedUser;
          }
          return null;
        }
      );
  }

  getUserByAccount(
    providerAccountId: Pick<AdapterAccount, 'provider' | 'providerAccountId'>
  ): Awaitable<AdapterUser | null> {
    return axios
      .post(this.users_api, {
        query: `query userByAccount($providerAccountId: String, $provider: String) {
          userByAccount(providerAccountId: $providerAccountId, provider: $provider) {
            id,
            name,
            emailVerified,
            image,
            email
          }
        }`,
        variables: {
          providerAccountId: providerAccountId.provider,
          provider: providerAccountId.provider,
        },
      })
      .then(
        ({
          data: {
            data: { userByAccount },
          },
        }) => {
          if (userByAccount) {
            const returnedUser: AdapterUser = {
              name: userByAccount.name,
              id: userByAccount.id,
              emailVerified: userByAccount.emailVerified,
              email: userByAccount.email,
              image: userByAccount.image,
            };
            return returnedUser;
          }
          return null;
        }
      );
  }

  updateUser(user: Partial<AdapterUser> & Pick<AdapterUser, 'id'>): Awaitable<AdapterUser> {
    // your adapter methods here
    return axios
      .post(this.users_api, {
        query: `mutation updateUser($name: String, $emailVerified: Date, $email: String, $image: String) {
          updateUser(input: { name: $name, email: $email, emailVerified: $emailVerified, image: $image}) {
            id,
            name,
            emailVerified,
            image,
            email
          }
        }`,
        variables: {
          name: user.name,
          email: user.email,
          image: user.image,
          emailVerified: user.emailVerified,
        },
      })
      .then(
        ({
          data: {
            data: { updateUser },
          },
        }) => {
          const returnedUser: AdapterUser = {
            name: updateUser.name,
            id: updateUser.id,
            emailVerified: updateUser.emailVerified,
            email: updateUser.email,
            image: updateUser.image,
          };
          return returnedUser;
        }
      );
  }

  deleteUser(userId: string): Awaitable<AdapterUser | null | undefined> {
    return axios
      .post(this.users_api, {
        query: `mutation deleteUser($userId: String) {
          deleteUser(id: $userId) {
            id,
            name,
            emailVerified,
            image,
            email
          }
        }`,
        variables: {
          userId,
        },
      })
      .then(
        ({
          data: {
            data: { deleteUser },
          },
        }) => {
          const returnedUser: AdapterUser = {
            name: deleteUser.name,
            id: deleteUser.id,
            emailVerified: deleteUser.emailVerified,
            email: deleteUser.email,
            image: deleteUser.image,
          };
          return returnedUser;
        }
      );
  }

  linkAccount(account: AdapterAccount): Awaitable<AdapterAccount | null | undefined> {
    return axios
      .post(this.users_api, {
        query: `mutation createAccount(
            $expires_at: Int, $expires_in: Int,
            $userId: String, $provider: String,
            $providerAccountId: String, $type: String,
            $scope: String, $id_token: String,
            $token_type: String, $access_token: String, 
            $refresh_token: String
          ) {
          createAccount(input: {
            expiresAt: $expires_at, expiresIn: $expires_in,
            userId: $userId, provider: $provider,
            providerAccountId: $providerAccountId, type: $type,
            scope: $scope, idToken: $id_token,
            tokenType: $token_type, accessToken: $access_token,
            refreshToken: $refresh_token
          }) {
            userId,
            type,
            provider,
            providerAccountId,
            scope,
            idToken,
            expiresAt,
            expiresIn,
            tokenType,
            accessToken,
            refreshToken,
          }
        }`,
        variables: {
          userId: account.userId,
          provider: account.provider,
          providerAccountId: account.providerAccountId,
          type: account.type,
          scope: account.scope,
          id_token: account.id_token,
          expires_at: account.expires_at,
          expires_in: account.expires_in,
          token_type: account.token_type,
          access_token: account.access_token,
          refresh_token: account.refresh_token,
        },
      })
      .then(
        ({
          data: {
            data: { createAccount: accountRet },
          },
        }) => {
          const returnedAccount: AdapterAccount = {
            userId: accountRet.userId,
            provider: accountRet.provider,
            providerAccountId: accountRet.providerAccountId,
            type: accountRet.type,
            scope: accountRet.scope,
            id_token: accountRet.id_token,
            expires_at: accountRet.expires_at,
            expires_in: accountRet.expires_in,
            token_type: accountRet.token_type,
            access_token: accountRet.access_token,
            refresh_token: accountRet.refresh_token,
          };
          return returnedAccount;
        }
      );
  }

  unlinkAccount(
    providerAccountId: Pick<AdapterAccount, 'provider' | 'providerAccountId'>
  ): Awaitable<AdapterAccount | undefined> {
    return axios
      .post(this.users_api, {
        query: `mutation deleteAccount(
            $providerAccountId: String, $provider: String, 
          ) {
          deleteAccount(
            provider: $provider,
            providerAccountId: $providerAccountId
          ) {
            userId,
            type,
            provider,
            providerAccountId,
            scope,
            idToken,
            expiresAt,
            expiresIn,
            tokenType,
            accessToken,
            refreshToken,
          }
        }`,
        variables: {
          provider: providerAccountId.provider,
          providerAccountId: providerAccountId.providerAccountId,
        },
      })
      .then(
        ({
          data: {
            data: { createAccount: account },
          },
        }) => {
          const returnedAccount: AdapterAccount = {
            userId: account.userId,
            provider: account.provider,
            providerAccountId: account.providerAccountId,
            type: account.type,
            scope: account.scope,
            id_token: account.id_token,
            expires_at: account.expires_at,
            expires_in: account.expires_in,
            token_type: account.token_type,
            access_token: account.access_token,
            refresh_token: account.refresh_token,
          };
          return returnedAccount;
        }
      );
  }

  createSession(session: {
    sessionToken: string;
    userId: string;
    expires: Date;
  }): Awaitable<AdapterSession> {
    return axios
      .post(this.users_api, {
        query: `mutation createSession(
            $sessionToken: String, $userId: String, $expires: Date
          ) {
          createSession(
            input: {
              sessionToken: $sessionToken,
              userId: $userid,
              expires: $expires
            }
          ) {
            expires,
            sessionToken,
            userId
          }
        }`,
        variables: {
          sessionToken: session.sessionToken,
          userId: session.userId,
          expires: session.expires,
        },
      })
      .then(
        ({
          data: {
            data: { createSession },
          },
        }) => createSession
      );
  }

  getSessionAndUser(
    sessionToken: string
  ): Awaitable<{ session: AdapterSession; user: AdapterUser } | null> {
    return axios
      .post(this.users_api, {
        query: `query sessionAndUser(
            $sessionToken: String
          ) {
          sessionAndUser(
            sessionToken: $sessionToken,
          ) {
            session,
            user
          }
        }`,
        variables: {
          sessionToken,
        },
      })
      .then(
        ({
          data: {
            data: { sessionAndUser },
          },
        }) => sessionAndUser
      );
  }

  updateSession(
    session: Partial<AdapterSession> & Pick<AdapterSession, 'sessionToken'>
  ): Awaitable<AdapterSession | null | undefined> {
    return axios
      .post(this.users_api, {
        query: `mutation updateSession(
            $sessionToken: String
            $userId: String,
            $expires: String,
          ) {
          updateSession(
            sessionToken: $sessionToken,
            data: {
              userId: $userId,
              expires: $expires,
            }
          ) {
            sessionToken,
            userId,
            expires
          }
        }`,
        variables: {
          sessionToken: session.sessionToken,
          userId: session.userId,
          expires: session.expires,
        },
      })
      .then(
        ({
          data: {
            data: { updateSession },
          },
        }) => updateSession
      );
  }

  deleteSession(sessionToken: string): Awaitable<AdapterSession | null | undefined> {
    return axios
      .post(this.users_api, {
        query: `mutation deleteSession(
            $sessionToken: String
          ) {
          updateSession(
            sessionToken: $sessionToken,
          ) {
            sessionToken,
            userId,
            expires
          }
        }`,
        variables: {
          sessionToken,
        },
      })
      .then(
        ({
          data: {
            data: { deleteSession },
          },
        }) => deleteSession
      );
  }

  createVerificationToken(
    verificationToken: VerificationToken
  ): Awaitable<VerificationToken | null | undefined> {
    return axios
      .post(this.users_api, {
        query: `mutation createVerificationToken(
            $token: String,
            $identifier: String,
            $expires: Date,
          ) {
          createVerificationToken(
            token: $sessionToken,
            identifier: $identifier,
            expires: $expires,
          ) {
            sessionToken,
            userId,
            expires
          }
        }`,
        variables: {
          token: verificationToken.token,
          expires: verificationToken.expires,
          identifier: verificationToken.identifier,
        },
      })
      .then(
        ({
          data: {
            data: { createVerificationToken },
          },
        }) => createVerificationToken
      );
  }

  useVerificationToken(params: {
    identifier: string;
    token: string;
  }): Awaitable<VerificationToken | null> {
    return axios
      .post(this.users_api, {
        query: `mutation deleteVerificationToken(
            $token: String,
            $identifier: String,
          ) {
          deleteVerificationToken(
            token: $sessionToken,
            identifier: $identifier,
          ) {
            sessionToken,
            userId,
            expires
          }
        }`,
        variables: {
          token: params.token,
          identifier: params.identifier,
        },
      })
      .then(
        ({
          data: {
            data: { deleteVerificationToken },
          },
        }) => deleteVerificationToken
      );
  }

  getVerificationToken(params: {
    identifier: string;
    token: string;
  }): Awaitable<VerificationToken | null> {
    return axios
      .post(this.users_api, {
        query: `query verificationToken(
            $token: String,
            $identifier: String,
          ) {
          verificationToken(
            token: $sessionToken,
            identifier: $identifier,
          ) {
            sessionToken,
            userId,
            expires
          }
        }`,
        variables: {
          token: params.token,
          identifier: params.identifier,
        },
      })
      .then(
        ({
          data: {
            data: { verificationToken },
          },
        }) => verificationToken
      );
  }
}

export function SellershutAdapter(driver: Driver): Adapter {
  return {
    createUser(user: AdapterUser): Awaitable<AdapterUser> {
      return driver.createUser(user);
    },

    getUser(id: string): Awaitable<AdapterUser | null> {
      return driver.getUser(id);
    },

    getUserByEmail(email: string): Awaitable<AdapterUser | null> {
      return driver.getUserByEmail(email);
    },

    getUserByAccount(
      providerAccountId: Pick<AdapterAccount, 'provider' | 'providerAccountId'>
    ): Awaitable<AdapterUser | null> {
      return driver.getUserByAccount(providerAccountId);
    },

    updateUser(user: Partial<AdapterUser> & Pick<AdapterUser, 'id'>): Awaitable<AdapterUser> {
      return driver.updateUser(user);
    },

    deleteUser(userId: string): Awaitable<AdapterUser | null | undefined> {
      return driver.deleteUser(userId);
    },

    linkAccount(account: AdapterAccount): Awaitable<AdapterAccount | null | undefined> {
      return driver.linkAccount(account);
    },

    unlinkAccount(
      providerAccountId: Pick<AdapterAccount, 'provider' | 'providerAccountId'>
    ): Awaitable<AdapterAccount | undefined> {
      return driver.unlinkAccount(providerAccountId);
    },

    createSession(session: {
      sessionToken: string;
      userId: string;
      expires: Date;
    }): Awaitable<AdapterSession> {
      return driver.createSession(session);
    },

    getSessionAndUser(
      sessionToken: string
    ): Awaitable<{ session: AdapterSession; user: AdapterUser } | null> {
      return driver.getSessionAndUser(sessionToken);
    },

    updateSession(
      session: Partial<AdapterSession> & Pick<AdapterSession, 'sessionToken'>
    ): Awaitable<AdapterSession | null | undefined> {
      return driver.updateSession(session);
    },

    deleteSession(sessionToken: string): Awaitable<AdapterSession | null | undefined> {
      return driver.deleteSession(sessionToken);
    },

    createVerificationToken(
      verificationToken: VerificationToken
    ): Awaitable<VerificationToken | null | undefined> {
      return driver.createVerificationToken(verificationToken);
    },

    useVerificationToken(params: {
      identifier: string;
      token: string;
    }): Awaitable<VerificationToken | null> {
      return driver.useVerificationToken(params);
    },
  };
}
