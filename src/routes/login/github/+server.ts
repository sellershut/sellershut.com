import { redirect } from "@sveltejs/kit";
import { generateState } from "arctic";
import { github } from "$lib/server/auth";
import type { RequestEvent } from "@sveltejs/kit";
import { logger } from "$lib/server/logger";

export async function GET(event: RequestEvent): Promise<Response> {
  const state = generateState();
  const url = await github.createAuthorizationURL(state);

  logger.debug(state);
  event.cookies.set("github_oauth_state", state, {
    path: "/",
    secure: import.meta.env.PROD,
    httpOnly: true,
    maxAge: 60 * 10,
    sameSite: "lax"
  });

  redirect(302, url.toString());
}

