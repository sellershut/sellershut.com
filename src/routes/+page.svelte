<script lang="ts">
  import Hero from '$lib/components/hero/hero.svelte';
  import SectionDivider from '$lib/components/section-divider.svelte';
  import Statisitics from '$lib/components/statistics/statisitics.svelte';
  import { modal } from '$lib/util/stores/modal';
  import CreateAd from '$lib/components/modal/create-ad/create-ad.svelte';

  // import { page } from '$app/stores'; -> check if session is valid before creating ad
  const showModal = () => {
    $modal = {
      isVisible: true,
      content: CreateAd,
      title: {
        value: 'Select Category',
        subTitle: 'What best describes the item you want to sell?',
      },
    };
  };
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
        on:click={showModal}
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
