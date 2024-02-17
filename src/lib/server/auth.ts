import { GitHub } from "arctic";
import { Lucia } from "lucia";
import AuthAdapter from "$lib/api/auth/auth-adapter";
import { dev } from "$app/environment";
import { AUTH_GITHUB_ID, AUTH_GITHUB_SECRET } from "$env/static/private";

export const github = new GitHub(
  AUTH_GITHUB_ID,
  AUTH_GITHUB_SECRET
);
export const lucia = new Lucia(new AuthAdapter(), {
  sessionCookie: {
    attributes: {
      secure: !dev
    }
  },
  getUserAttributes: (attributes) => ({
    username: attributes.username,
  })
});

declare module "lucia" {
  interface Register {
    Lucia: typeof lucia;
    DatabaseUserAttributes: DatabaseUserAttributes
  }
}

interface DatabaseUserAttributes {
  username: string;
}



export default github;
