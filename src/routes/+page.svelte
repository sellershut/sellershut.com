<script>
  import FeatureCategoryContainer from '$lib/components/hero/feature-category-container.svelte';
  import SectionDivider from '$lib/components/section-divider.svelte';
  import Statistics from '$lib/components/statistics/statistics.svelte';
</script>

<div class="pt-14 flex flex-col space-y-4">
  <FeatureCategoryContainer />
  <div class="px-5 py-24 mx-auto">
    <div class="lg:w-2/3 flex flex-col sm:flex-row sm:items-center items-start mx-auto">
      <h1 class="flex-grow sm:pr-16 text-2xl font-medium title-font">
        Something's taking up space? Get your ad live in a few...
      </h1>
      <a
        href={'#'}
        class="flex-shrink-0 text-white bg-rose-500 border-0 py-2 px-8 focus:outline-none
        hover:bg-rose-600 rounded text-lg mt-10 sm:mt-0">Get Started</a
      >
    </div>
  </div>
  <SectionDivider params={{ hintEnabled: true, position: 'centre' }} />
  <Statistics />
  <p class="small-caps">
    Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation
  </p>
</div>
