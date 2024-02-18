import { logger } from '$lib/server/logger';
import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ cookies, locals }) => {
  logger.debug(locals.user, 'user');
  logger.debug(locals.session, 'session');
  if (locals.user && locals.session) {
    redirect(302, '/');
  }

  const theme = cookies.get('siteTheme') ?? 'light';
  const darkMode = theme === 'dark';

  return { darkMode, user: locals.user, session: locals.session };
};
