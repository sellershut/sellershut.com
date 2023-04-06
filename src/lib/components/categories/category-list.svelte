<script lang="ts">
  import type { ICategory } from '$lib/types/category';
  import type { SvelteComponent } from 'svelte';
  import IconArt from '../icons/icon-art.svelte';
  import IconBaby from '../icons/icon-baby.svelte';
  import IconBeauty from '../icons/icon-beauty.svelte';
  import IconCar from '../icons/icon-car.svelte';
  import IconElectronics from '../icons/icon-electronics.svelte';
  import IconGardenHome from '../icons/icon-garden-home.svelte';
  import IconHome from '../icons/icon-home.svelte';
  import IconLibrary from '../icons/icon-library.svelte';
  import IconPet from '../icons/icon-pet.svelte';
  import IconShirt from '../icons/icon-shirt.svelte';
  import IconSporting from '../icons/icon-sporting.svelte';
  import IconToy from '../icons/icon-toy.svelte';
  import CategoryListEntry from './category-list-entry.svelte';

  export let categories: ICategory[];

  const sort = (arr: ICategory[]): ICategory[] => arr.sort((a, b) => a.name.localeCompare(b.name));

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
</script>

<div class="pt-4 flex items-stretch justify-between overflow-x-auto">
  {#each sort(categories) as category}
    <CategoryListEntry {icons} {category} />
  {/each}
</div>
