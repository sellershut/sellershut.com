import countries from 'world-countries';

export const formattedCountries = countries.map((country) => ({
  value: country.cca2,
  label: country.name.common,
  icon: country.flag,
  coordinates: {
    lat: country.latlng[0],
    lo: country.latlng[1],
  },
  region: country.region,
}));

export const getCountryByValue = (value: string) =>
  formattedCountries.find((item) => item.value === value);

export default formattedCountries;
