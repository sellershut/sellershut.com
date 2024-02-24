<script lang="ts">
  import { Plus } from 'radix-icons-svelte';
  import * as Dialog from '$components/ui/dialog';
  import { Progress } from '$components/ui/progress';
  import SlideSelectCategory from '$components/new-listing/01-select-category.svelte';
  import SlideSelectArea from '$components/new-listing/02-select-location.svelte';
  import SlideListingInfo from '$components/new-listing/03-listing-info.svelte';
  import SlideImages from '$components/new-listing/04-images.svelte';
  import SlideTags from '$components/new-listing/05-tags-finish.svelte';
  import { Button } from '$components/ui/button';
  import { getContext } from 'svelte';
  import type { Session, User } from 'lucia';

  const slides = [SlideSelectCategory, SlideSelectArea, SlideListingInfo, SlideImages];
  let activeIndex = $state(0);
  const progress = $derived((activeIndex / slides.length) * 100);
  let stepValid = $state(false);

  const stepIsValid = (/* event: CustomEvent<{ categoryId: string; slide: number }> */) => {
    stepValid = true;
  };

  const nextSlide = () => {
    activeIndex += 1;
    stepValid = false;
  };

  const previousSlide = () => {
    activeIndex -= 1;
  };

  const invalidate = () => {
    stepValid = false;
  };
  const session: Session | null = getContext('sessionData');
  const user: User | null = getContext('sessionUser');
</script>

<!-- <Dialog.Root closeOnOutsideClick={false} open={true} preventScroll={true}> -->
<Dialog.Root closeOnOutsideClick={false} preventScroll={true}>
  <Dialog.Trigger
    disabled={!session || !user}
    class="inline-flex items-center justify-center rounded-md text-sm font-medium whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 h-9 px-4 py-2 bg-primary text-primary-foreground shadow hover:bg-primary/90"
  >
    <Plus />
  </Dialog.Trigger>
  <Dialog.Content>
    <Dialog.Header class="p-2">
      <Progress value={progress} />
      <!--       <Dialog.Title>New Listing</Dialog.Title> -->
    </Dialog.Header>
    <svelte:component
      this={slides[activeIndex]}
      on:slideValid={stepIsValid}
      on:invalidate={invalidate}
    />
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
