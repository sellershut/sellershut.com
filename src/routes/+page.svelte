<script>
  import SectionDivider from '$lib/components/section-divider.svelte';
</script>

<div class="pt-14 flex flex-col space-y-4">
  <h1 class="title-font font-bold text-4xl sm:text-5xl">Top Categories</h1>
  <div
    class="relative flex border border-white/5 shadow-md flex-col space-y-2 bg-gradient-to-br
    bg-opacity-40 from-white/60 to-white/20 p-4 backdrop-blur-md rounded-lg
    dark:bg-[conic-gradient(at_bottom_left,_var(--tw-gradient-stops))] dark:from-zinc-800
    dark:via-slate-700 dark:to-zinc-600"
  >
    <div
      class="absolute top-0 left-0 noise h-full w-full mix-blend-overlay opacity-5
      dark:opacity-10 -z-10"
    />
    <div class="w-full flex flex-col space-y-2 items-center group">
      <div
        class="w-36 aspect-square rounded-full bg-zinc-500 group-hover:border-4
        group-hover:border-rose-500"
      />
      <p class="small-caps tracking-wider font-medium dark:opacity-70">Electronics</p>
      <span class="invisible w-2 aspect-square bg-rose-500 rounded-full group-hover:visible" />
    </div>
  </div>
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
  <p class="small-caps">
    Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation
  </p>
</div>
