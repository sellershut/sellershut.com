<script lang="ts">
import { Button } from "$lib/components/ui/button";
</script>

<section class="container">
  <div class="flex flex-col justify-center items-center">
    <div class="w-full md:w-2/3 flex flex-col mb-16 items-center text-center">
      <h1 class="title-font sm:text-4xl text-3xl mb-4 font-bold">
        Welcome to sellers<span class="text-primary">hut</span>.
      </h1>
      <p class="mb-8 leading-relaxed">
        Kickstarter biodiesel roof party wayfarers cold-pressed. Palo santo
        live-edge tumeric scenester copper mug flexitarian. Prism vice offal
        plaid everyday carry. Gluten-free chia VHS squid listicle artisan.
      </p>
      <p class="text-sm mt-2 mb-8 w-full">
        Log in to see personalised listings...
      </p>
    </div>
    <div class="grid md:grid-cols-4 auto-rows-[300px] gap-">
      {#each Array(7) as _, i}
        <div
          class={`flex flex-col items-center justify-center rounded-xl border-2 border-foreground/10 p-2 ${i === 0 || i === 4 || i === 5 || i === 6 ? "md:col-span-2" : ""} ${i === 2 ? "md:row-span-2" : ""}`}
        >
          <img
            class="object-cover object-center rounded w-full h-full"
            alt="hero"
            src="https://dummyimage.com/720x600"
          />
        </div>
      {/each}
    </div>
  </div>
</section>

<section class="w-full container">
  <div class="px-4 md:px-6">
    <div
      class="flex flex-col items-center justify-center space-y-4 text-center"
    >
      <div class="space-y-2">
        <h2 class="text-3xl font-bold tracking-tighter sm:text-5xl capitalize">
          Some other heading
        </h2>
        <p
          class="max-w-[900px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed"
        >
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti cum
          repellat facilis minus possimus magnam voluptatem assumenda, minima
          recusandae asperiores dignissimos inventore molestiae aspernatur
          veritatis deleniti dolores tempora iste impedit.
        </p>
      </div>
    </div>
  </div>
</section>

<section class="container">
  <div class="flex flex-wrap -m-4 text-center">
    <div class="p-4 sm:w-1/4 w-1/2">
      <h2 class="title-font font-medium sm:text-4xl text-3xl">2.7K</h2>
      <p class="leading-relaxed">Users</p>
    </div>
    <div class="p-4 sm:w-1/4 w-1/2">
      <h2 class="title-font font-medium sm:text-4xl text-3xl">1.8K</h2>
      <p class="leading-relaxed">Subscribes</p>
    </div>
    <div class="p-4 sm:w-1/4 w-1/2">
      <h2 class="title-font font-medium sm:text-4xl text-3xl">35</h2>
      <p class="leading-relaxed">Downloads</p>
    </div>
    <div class="p-4 sm:w-1/4 w-1/2">
      <h2 class="title-font font-medium sm:text-4xl text-3xl">4</h2>
      <p class="leading-relaxed">Products</p>
    </div>
  </div>
</section>
