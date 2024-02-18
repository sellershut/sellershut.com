/* eslint-disable class-methods-use-this */
import axios from 'axios';
import type { Adapter, DatabaseSession, DatabaseUser } from 'lucia';
import { logger } from '$lib/server/logger';
import { generateFromEmail } from 'unique-username-generator';
import { USERS_API } from '$env/static/private';

export default class AuthAdapter implements Adapter {
  async getSessionAndUser(
    sessionId: string
  ): Promise<[session: DatabaseSession | null, user: DatabaseUser | null]> {
    const resp = await axios.post(USERS_API, {
      query: `query userAndSession(
            $sessionId: String
          ) {
          userAndSession(
            sessionToken: $sessionId,
          ) {
            session {
              id,
              user,
              expiresAt
            },
            user {
              id,
              username,
              avatar,
              name,
              email,
              userType
            }
          }
        }`,
      variables: {
        sessionId,
      },
    });
    logger.debug(resp.data, 'sessionAndUser');
    if (resp.data.data.userAndSession) {
      const { user, session } = resp.data.data.userAndSession;
      const sessionValue: DatabaseSession = {
        id: session.sessionToken,
        userId: session.user,
        expiresAt: new Date(session.expiresAt),
        attributes: {},
      };

      const userValue: DatabaseUser = {
        id: user.id,
        attributes: {
          username: user.username,
          email: user.email,
          name: user.name,
          userType: user.userType,
          avatar: user.avatar,
        },
      };
      return [sessionValue, userValue];
    }
    return [null, null];
  }

  async getUserSessions(userId: string): Promise<DatabaseSession[]> {
    const response = await axios.post(USERS_API, {
      query: `query userSessions(
            $userId: String
          ) {
          userSessions(
            userId: $userId,
          ) {
            id,
            expiresAt,
            user,
            sessionToken
          }
        }`,
      variables: {
        userId,
      },
    });

    logger.debug(response.data, 'userSessions');
    if (response.data.data.userSessions) {
      return response.data.data.userSessions.map(
        (val: { sessionToken: string; user: string; expiresAt: string | number | Date }) => ({
          id: val.sessionToken,
          userId: val.user,
          expiresAt: new Date(val.expiresAt),
        })
      );
    }
    return [];
  }

  async setSession(session: DatabaseSession): Promise<void> {
    const response = await axios.post(USERS_API, {
      query: `mutation createSession(
            $userId: String, $expiresAt: DateTime, $sessionToken: String
          ) {
          createSession(
            input: {
              user: $userId,
              expiresAt: $expiresAt
              sessionToken: $sessionToken,
            }
          ) {
            id,
            expiresAt,
            user,
            sessionToken
          }
        }`,
      variables: {
        userId: session.userId,
        expiresAt: session.expiresAt,
        sessionToken: session.id,
      },
    });
    logger.debug(response.data, 'setSession');
  }

  async updateSessionExpiration(sessionId: string, expiresAt: Date): Promise<void> {
    const response = await axios.post(USERS_API, {
      query: `mutation updateSession(
            $id: String, $expiresAt: DateTime
          ) {
          updateSession(
            id: $id,
            expiresAt: $expiresAt
          ) {
            id,
          }
        }`,
      variables: {
        id: sessionId,
        expiresAt,
      },
    });
    logger.debug(response.data, 'updateSession');
  }

  async deleteSession(sessionId: string): Promise<void> {
    const response = await axios.post(USERS_API, {
      query: `mutation deleteSession(
            $id: String,
          ) {
          deleteSession(
            id: $id
          ) 
        }`,
      variables: {
        id: sessionId,
      },
    });
    logger.debug(response.data, 'deleteSession');
  }

  async deleteUserSessions(userId: string): Promise<void> {
    const response = await axios.post(USERS_API, {
      query: `mutation deleteUserSession(
            $id: String,
          ) {
          deleteUserSession(
            userId: $id
          ) 
        }`,
      variables: {
        id: userId,
      },
    });
    logger.debug(response.data, 'deleteUserSessions');
  }

  async deleteExpiredSessions(): Promise<void> {
    const response = await axios.post(USERS_API, {
      query: `mutation deleteExpiredSession(
            $id: String,
          ) {
          deleteExpiredSession
        }`,
    });
    logger.debug(response.data, 'deleteExpiredSession');
  }
}

export const getUserByEmail = async (email: string): Promise<DatabaseUser | undefined> => {
  const response = await axios.post(USERS_API, {
    query: `query userByEmail(
            $email: String,
          ) {
          userByEmail(
            email: $email,
          ) {
            id,
            username,
            name,
            email,
            userType,
            avatar
          }
        }`,
    variables: {
      email,
    },
  });

  const { data } = response;
  logger.debug('existingUserByEmail', data);
  const userData = data.data.userByEmail;
  if (userData) {
    const user: DatabaseUser = {
      id: userData.id,
      attributes: {
        username: userData.username,
        email: data.email,
        avatar: data.avatar,
        name: data.name,
        userType: data.userType,
      },
    };
    return user;
  }
  return undefined;
};

export const createUserFn = async (
  username: string,
  email?: string,
  avatar?: string,
  name?: string,
  userType?: string
): Promise<DatabaseUser> => {
  const response = await axios.post(USERS_API, {
    query: `mutation createUser(
            $username: String!,
            $email: String,
            $avatar: String,
            $name: String,
            $userType: UserType
          ) {
          createUser(
            input: {
              username: $username,
              email: $email,
              avatar: $avatar,
              name: $name,
              userType: $userType
            }
          ) {
            id,
            username,
            email,
            avatar,
            name,
            userType
          }
        }`,
    variables: {
      username,
      email,
      avatar,
      name,
      userType: userType ?? 'INDIVIDUAL',
    },
  });

  const data = response.data.data.createUser;
  logger.debug('createUser', data);
  const user: DatabaseUser = {
    id: data.id,
    attributes: {
      username: data.username,
      email: data.email,
      avatar: data.avatar,
      name: data.name,
      userType: data.userType,
    },
  };
  return user;
};

export const createOauthAccount = async (
  user: string,
  provider: string,
  providerAccountId: string
) => {
  const response = await axios.post(USERS_API, {
    query: `mutation createAccount(
            $user: String,
            $provider: String,
            $providerAccountId: String,
          ) {
          createAccount(
            input: {
              user: $user,
              provider: $provider,
              providerAccountId: $providerAccountId,
            }
          ) {
            id,
          }
        }`,
    variables: {
      user,
      provider,
      providerAccountId,
    },
  });
  return response.data.data.createAccount;
};

export const usernameFromEmail = (email: string) => {
  const random = (min: number, max: number) => Math.floor(Math.random() * (max - min)) + min;
  return generateFromEmail(email, random(3, 5));
};
