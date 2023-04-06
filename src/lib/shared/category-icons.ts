import type { ICategory } from '$lib/types/category';
import type { SvelteComponent } from 'svelte';
import IconArt from '../components/icons/icon-art.svelte';
import IconBaby from '../components/icons/icon-baby.svelte';
import IconBeauty from '../components/icons/icon-beauty.svelte';
import IconCar from '../components/icons/icon-car.svelte';
import IconElectronics from '../components/icons/icon-electronics.svelte';
import IconGardenHome from '../components/icons/icon-garden-home.svelte';
import IconHome from '../components/icons/icon-home.svelte';
import IconLibrary from '../components/icons/icon-library.svelte';
import IconPet from '../components/icons/icon-pet.svelte';
import IconShirt from '../components/icons/icon-shirt.svelte';
import IconSporting from '../components/icons/icon-sporting.svelte';
import IconToy from '../components/icons/icon-toy.svelte';

export const categoryIcons = (categories: ICategory[]): Map<string, typeof SvelteComponent> => {
  const icons = new Map<string, typeof SvelteComponent>();

  for (let index = 0; index < categories.length; index += 1) {
    const category = categories[index];
    switch (category.name.toLowerCase()) {
      case 'electronics':
        icons.set(category.name, IconElectronics);
        break;
      case 'apparel':
        icons.set(category.name, IconShirt);
        break;
      case 'pets':
        icons.set(category.name, IconPet);
        break;
      case 'garden & home':
        icons.set(category.name, IconGardenHome);
        break;
      case 'baby supplies':
        icons.set(category.name, IconBaby);
        break;
      case 'collectibles & art':
        icons.set(category.name, IconArt);
        break;
      case 'property':
        icons.set(category.name, IconHome);
        break;
      case 'toys & recreational':
        icons.set(category.name, IconToy);
        break;
      case 'vehicles':
        icons.set(category.name, IconCar);
        break;
      case 'health & beauty':
        icons.set(category.name, IconBeauty);
        break;
      case 'books, movies & music':
        icons.set(category.name, IconLibrary);
        break;
      case 'sporting':
        icons.set(category.name, IconSporting);
        break;
      default:
        icons.set(category.name, IconHome);
    }
  }

  return icons;
};

export default categoryIcons;
