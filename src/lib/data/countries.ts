import type { Country } from '$lib/@types/country';
import countries from 'world-countries';

export const formattedCountries: Country[] = countries.map((country) => ({
  value: country.cca2,
  label: country.name.common,
  icon: country.flag,
  latlng: country.latlng,
  region: country.region,
}));

export const getCountryByValue = (value: string) =>
  formattedCountries.find((item) => item.value === value);

export default formattedCountries;
