import type { MyCountry } from '$lib/types/country';
import type { Country } from 'world-countries';
import countries from 'world-countries';

const myCountries = (): MyCountry[] => {
  const worldCountries: MyCountry[] = countries.map((country: Country) => {
    const { flag, cca2, name, latlng } = country;
    const myCountry: MyCountry = {
      name, flag, cca2, latlng
    }
    return myCountry
  });
  return worldCountries

}

export default myCountries;
