import { goto } from '$app/navigation';

export const navigate = (name: string, url: URL) => {
  const newUrl = new URL(url);
  newUrl.pathname = 'browse/categories';
  newUrl.searchParams.set('category', name);
  goto(`${newUrl}`);
};

export default navigate;
