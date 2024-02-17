import { logger } from '$lib/server/logger';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ cookies, locals }) => {
  const theme = cookies.get('siteTheme') ?? 'light';
  const darkMode = theme === 'dark';

  logger.debug(locals.user, 'user');
  logger.debug(locals.session, 'session');

  return { darkMode };
};
