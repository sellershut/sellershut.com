import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ cookies }) => {
  const theme = cookies.get('siteTheme') ?? 'light';
  const darkMode = theme === 'dark';

  return { darkMode };
};
