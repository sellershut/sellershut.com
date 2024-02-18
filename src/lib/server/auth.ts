import { GitHub, Google } from 'arctic';
import { Lucia } from 'lucia';
import AuthAdapter from '$lib/api/auth/auth-adapter';
import { dev } from '$app/environment';
import {
  AUTH_GITHUB_ID,
  AUTH_GITHUB_SECRET,
  AUTH_GOOGLE_ID,
  AUTH_GOOGLE_SECRET,
} from '$env/static/private';

export const github = new GitHub(AUTH_GITHUB_ID, AUTH_GITHUB_SECRET);
export const google = new Google(
  AUTH_GOOGLE_ID,
  AUTH_GOOGLE_SECRET,
  'http://localhost:5173/login/google/callback'
);
export const lucia = new Lucia(new AuthAdapter(), {
  sessionCookie: {
    attributes: {
      secure: !dev,
    },
  },
  getUserAttributes: (attributes) => ({
    username: attributes.username,
    email: attributes.email,
    avatar: attributes.avatar,
    name: attributes.name,
    userType: attributes.userType,
  }),
});

declare module 'lucia' {
  interface Register {
    Lucia: typeof lucia;
    DatabaseUserAttributes: DatabaseUserAttributes;
  }
}

interface DatabaseUserAttributes {
  username: string;
  email: string;
  avatar?: string;
  name?: string;
  userType: string;
}

export default github;
