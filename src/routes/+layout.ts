import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async ({ data }) => {
  const { darkMode } = data;

  return { darkMode };
};
