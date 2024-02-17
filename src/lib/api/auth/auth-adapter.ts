/* eslint-disable class-methods-use-this */
import axios from "axios";
import type { Adapter, DatabaseSession, DatabaseUser } from "lucia";
import { logger } from "$lib/server/logger";
import { USERS_API } from "$env/static/private";

export default class AuthAdapter implements Adapter {
  async getSessionAndUser(sessionId: string): Promise<[session: DatabaseSession | null, user: DatabaseUser | null]> {
    console.log(sessionId);
    const resp = await axios
      .post(USERS_API, {
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
              username
            }
          }
        }`,
        variables: {
          sessionId,
        },
      });
    logger.debug('sessionAndUser', resp.data);
    if (resp.data.data.userAndSession) {
      const { user, session } = resp.data.data.userAndSession;
      const sessionValue: DatabaseSession = {
        id: session.sessionToken,
        userId: session.user,
        expiresAt: new Date(session.expiresAt),
        attributes: {}
      }
      return [sessionValue, user];
    }
    return [null, null]
  }

  async getUserSessions(userId: string): Promise<DatabaseSession[]> {
    const response = await axios
      .post(USERS_API, {
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
          userId
        },
      });

    logger.debug('userSessions', response.data);
    if (response.data.data.userSessions) {
      return response.data.data.userSessions.map((val: { sessionToken: string; user: string; expiresAt: string | number | Date; }) => ({
        id: val.sessionToken,
        userId: val.user,
        expiresAt: new Date(val.expiresAt),
      }))
    }
    return []

  }

  async setSession(session: DatabaseSession): Promise<void> {
    const response = await axios
      .post(USERS_API, {
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
    console.log('setSession', response.data);
  }

  async updateSessionExpiration(sessionId: string, expiresAt: Date): Promise<void> {
    const response = await axios
      .post(USERS_API, {
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
          expiresAt
        },
      });
    console.log('updateSession', response.data);
  }

  async deleteSession(sessionId: string): Promise<void> {
    const response = await axios
      .post(USERS_API, {
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
    console.log('deleteSession', response.data);
  }

  async deleteUserSessions(userId: string): Promise<void> {
    const response = await axios
      .post(USERS_API, {
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
    console.log('deleteUserSession', response.data);
  }

  async deleteExpiredSessions(): Promise<void> {
    const response = await axios
      .post(USERS_API, {
        query: `mutation deleteExpiredSession(
            $id: String,
          ) {
          deleteExpiredSession
        }`,
      });
    console.log('deleteExpiredSession', response.data);
  }
}
