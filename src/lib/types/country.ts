import type { Country } from 'world-countries';

export type MyCountry = Pick<Country, 'latlng' | 'cca2' | 'flag' | 'name'>;
