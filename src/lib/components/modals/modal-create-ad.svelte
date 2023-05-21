<script lang="ts">
  import { hideModal } from '$lib/util/toggle-modal';
  import { selectedCategories } from '$lib/util/stores/create-ad';
  import { nextEnabled } from '$lib/util/create-ad-stepper';
  import IconX from '../icons/icon-x.svelte';
  import Categories from './create-ad/categories.svelte';

  $: step = 1;

  const incrementStep = () => {
    step += 1;
  };
</script>

<div class="p-4 flex flex-col gap-2 z-[99]">
  <div class="relative pb-3 border-b-[1px] dark:border-zinc-700">
    <button on:click={hideModal} class="absolute left-0">
      <IconX class="hover:text-rose-500 transition duration-300 scale-75" />
    </button>
    <h1 class="font-semibold text-center small-caps">Create an Ad</h1>
  </div>
  <div class="flex flex-col gap-1">
    <h1 class="font-bold">Which best describes the item you want to sell?</h1>
    <Categories />
    <div class="md:mt-2 flex justify-end">
      <a
        href={'#'}
        on:click={incrementStep}
        class={`${
          nextEnabled(step, $selectedCategories)
            ? 'bg-rose-500 hover:bg-rose-600'
            : ''
        } flex-shrink-0 text-white border-0 py-1 px-8 focus:outline-none
         rounded text-lg mt-10 sm:mt-0`}>Next</a
      >
    </div>
  </div>
</div>
