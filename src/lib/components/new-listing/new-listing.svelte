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
  import type { Listing } from '$lib/types/listing';

  const slides = [SlideSelectCategory, SlideSelectArea, SlideListingInfo, SlideImages, SlideTags];
  let activeIndex = $state(0);
  const progress = $derived((activeIndex / slides.length) * 100);
  let stepValid = $state(false);

  type LocationSlide = Pick<Listing, 'location'> & { slideIndex: number };
  type CategorySlide = Pick<Listing, 'categoryId'> & { slideIndex: number };
  type InfoSlide = Pick<Listing, 'title' | 'description' | 'active' | 'price' | 'negotiable'> & {
    slideIndex: number;
  };

  const listing: Partial<Listing> = {};

  const stepIsValid = (event: CustomEvent<CategorySlide | LocationSlide | InfoSlide>) => {
    switch (event.detail.slideIndex) {
      case 0: {
        const categorySlide = event.detail as CategorySlide;
        listing.categoryId = categorySlide.categoryId;
        break;
      }
      case 1: {
        const locationSlide = event.detail as LocationSlide;
        listing.location = locationSlide.location;
        break;
      }
      case 2: {
        const infoSlide = event.detail as InfoSlide;
        listing.title = infoSlide.title;
        listing.description = infoSlide.description;
        listing.negotiable = infoSlide.negotiable;
        listing.active = infoSlide.active;
        listing.price = infoSlide.price;
        break;
      }
      default: {
        break;
      }
    }
    console.log(listing);

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
