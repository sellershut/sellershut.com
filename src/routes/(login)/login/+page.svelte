<script lang="ts">
  import * as Card from '$lib/components/ui/card';
  import IconGitHub from '$lib/components/icons/icon-github.svelte';
  import IconGoogle from '$lib/components/icons/icon-google.svelte';

  const base =
    'inline-flex items-center justify-center rounded-md text-sm font-medium whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50';
  const outline =
    'border border-input bg-transparent shadow-sm hover:bg-accent hover:text-accent-foreground text-foreground';
</script>

<div class="container flex h-screen">
  <Card.Root class="w-[350px] md:w-[420px] lg:w-[450px] m-auto">
    <Card.Header>
      <Card.Title class="text-center text-2xl md:text-4xl"
        >Welcome to <span class="text-primary/90 font-bold">SellersHut</span></Card.Title
      >
      <Card.Description class="text-center">Please select a sign in method below</Card.Description>
    </Card.Header>
    <Card.Content>
      <div class="grid grid-cols-1 gap-2">
        <a
          href="/login/google"
          class={`${base} ${outline} w-full inline-flex gap-4 items-center py-2 font-bold`}
        >
          <IconGoogle class="h-4 w-4 text-foreground" />
          Google</a
        >
        <a
          href="/login/github"
          class={`${base} ${outline} w-full inline-flex gap-4 items-center py-2 font-bold`}
        >
          <IconGitHub class="h-4 w-4 text-foreground" />
          GitHub</a
        >
      </div>
    </Card.Content>
  </Card.Root>
</div>
