<script lang="ts">
  import * as Carousel from '$components/ui/carousel/index.js';
  import SlideTitle from './slide-title.svelte';
</script>

<SlideTitle title={'Images'} description={'Final touches...'} />

<div class="flex items-center justify-center w-full">
  <label
    for="dropzone-file"
    class="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer hover:bg-card bg-card/70"
  >
    <div class="flex flex-col items-center justify-center pt-5 pb-6 text-foreground">
      <svg
        class="w-8 h-8 mb-4"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 20 16"
      >
        <path
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
        />
      </svg>
      <p class="mb-2 text-sm">
        <span class="font-semibold">Click to upload</span> or drag and drop
      </p>
      <p class="text-xs">SVG, PNG, JPG or GIF</p>
    </div>
    <input id="dropzone-file" type="file" class="hidden" />
  </label>
</div>
<div></div>

<Carousel.Root>
  <Carousel.Content class="-ml-2 md:-ml-4 justify-center">
    {#each Array(5) as _, i (i)}
      <Carousel.Item class="pl-2 md:pl-4 h-16 w-24 aspect-auto basis-auto">
        <img
          alt="ecommerce"
          class="object-cover object-center w-full h-full block"
          src="https://dummyimage.com/421x261"
        />
      </Carousel.Item>
    {/each}
  </Carousel.Content>
</Carousel.Root>
