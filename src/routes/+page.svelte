<script lang="ts">
  import Hero from '$lib/components/hero/hero.svelte';
  import SectionDivider from '$lib/components/section-divider.svelte';
  import Statisitics from '$lib/components/statistics/statisitics.svelte';
  import { showModal } from '$lib/util/modal/driver';
  import { selectCategory } from '$lib/util/modal/create-ad/select-category';
</script>

<div class="container pt-16">
  <Hero />
  <div class="px-5 py-24 mx-auto">
    <div
      class="lg:w-2/3 flex flex-col sm:flex-row sm:items-center items-start mx-auto"
    >
      <h1 class="flex-grow sm:pr-16 text-2xl font-medium">
        Something's taking up space? Get your ad live in a few...
      </h1>
      <a
        on:click={() => showModal(selectCategory)}
        href={'#'}
        class="flex-shrink-0 text-white bg-rose-500 border-0 py-2 px-8 focus:outline-none
        hover:bg-rose-600 rounded text-lg mt-10 sm:mt-0">Get Started</a
      >
    </div>
  </div>
  <SectionDivider params={{ hintEnabled: true, position: 'centre' }} />
  <Statisitics />

  <h1 class="text-xl">Welcome to SvelteKit</h1>
  <p>
    Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation
  </p>
</div>
