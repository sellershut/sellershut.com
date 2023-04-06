<script lang="ts">
  import type { ICategory } from '$lib/types/category';
  import IconArt from '../icons/icon-art.svelte';
  import IconBaby from '../icons/icon-baby.svelte';
  import IconElectronics from '../icons/icon-electronics.svelte';
  import IconGardenHome from '../icons/icon-garden-home.svelte';
  import IconHome from '../icons/icon-home.svelte';
  import IconPet from '../icons/icon-pet.svelte';
  import IconShirt from '../icons/icon-shirt.svelte';

  export let categories: ICategory[];

  const hashMap = new Map();

  for (let index = 0; index < categories.length; index += 1) {
    const category = categories[index];
    switch (category.name.toLowerCase()) {
      case 'electronics':
        hashMap.set(category.name, IconElectronics);
        break;
      case 'apparel':
        hashMap.set(category.name, IconShirt);
        break;
      case 'pets':
        hashMap.set(category.name, IconPet);
        break;
      case 'garden & home':
        hashMap.set(category.name, IconGardenHome);
        break;
      case 'baby supplies':
        hashMap.set(category.name, IconBaby);
        break;
      case 'collectibles & art':
        hashMap.set(category.name, IconArt);
        break;
      case 'property':
        hashMap.set(category.name, IconHome);
        break;
      case 'toys & recreational':
        hashMap.set(category.name, IconHome);
        break;
      case 'vehicles':
        hashMap.set(category.name, IconHome);
        break;
      case 'health & beauty':
        hashMap.set(category.name, IconHome);
        break;
      case 'books, movies & music':
        hashMap.set(category.name, IconHome);
        break;
      case 'sporting':
        hashMap.set(category.name, IconHome);
        break;
      default:
        hashMap.set(category.name, IconHome);
    }
  }
</script>

<div class="pt-4 flex items-stretch justify-between overflow-x-auto">
  {#each categories as category}
    <div
      class="flex flex-col items-center gap-2 p-3 border-b-2 hover:text-zinc-800 transition cursor-pointer"
    >
      <svelte:component this={hashMap.get(category.name)} />
      <p class="font-medium text-center text-xs">
        {category.name}
      </p>
    </div>
  {/each}
</div>
