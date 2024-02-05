<script lang="ts">
  import { Plus } from 'radix-icons-svelte';
  import * as Dialog from '$components/ui/dialog';
  import { Progress } from '$components/ui/progress';
  import SlideSelectCategory from '$components/new-listing/01-select-category.svelte';
  import { Button } from '$components/ui/button';

  const slides = [SlideSelectCategory];
  let activeIndex = $state(0);
  const progress = $derived((activeIndex / slides.length) * 100);
  let stepValid = $state(false);

  const stepIsValid = (/* event: CustomEvent<{ categoryId: string; slide: number }> */) => {
    stepValid = true;
  };

  const nextSlide = () => {
    activeIndex -= 1;
    stepValid = false;
  };

  const previousSlide = () => {
    activeIndex += 1;
  };
</script>

<Dialog.Root closeOnOutsideClick={false} open={true}>
  <Dialog.Trigger
    class="inline-flex items-center justify-center rounded-md text-sm font-medium whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 h-9 px-4 py-2 bg-primary text-primary-foreground shadow hover:bg-primary/90"
  >
    <Plus />
  </Dialog.Trigger>
  <Dialog.Content>
    <Dialog.Header>
      <Dialog.Title>New Listing</Dialog.Title>
      <Progress value={progress} />
    </Dialog.Header>
    <svelte:component this={slides[activeIndex]} on:slideValid={stepIsValid} />
    <div class="flex gap-2">
      <Button
        variant="outline"
        class={`${activeIndex ? 'w-1/2' : 'hidden'}`}
        on:click={previousSlide}>Previous</Button
      >
      <Button class="flex-1" disabled={!stepValid} on:click={nextSlide}>Next</Button>
    </div>
  </Dialog.Content>
</Dialog.Root>
