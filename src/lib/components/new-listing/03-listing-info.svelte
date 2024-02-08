<script lang="ts">
  import { Input } from '$components/ui/input';
  import { Label } from '$components/ui/label';
  import { Checkbox } from '$components/ui/checkbox';
  import { createEventDispatcher } from 'svelte';
  import SlideTitle from './slide-title.svelte';

  let title = $state('');
  let titleValid = $state(false);

  let description = $state('');
  const descriptionValid = $state(false);

  let active = $state(false);
  let negotiable = $state(false);

  let price = $state('');

  const slideValid = $derived(titleValid && descriptionValid);
  const dispatch = createEventDispatcher();

  const isNotEmptyOrWhitespace = (value: string): boolean => {
    // Regular expression to match non-empty and non-whitespace strings
    const regex = /\S/;

    // Test the input value against the regular expression
    return regex.test(value);
  };

  $effect(() => {
    if (slideValid) {
      dispatch('postDetails', { title, description, active });
    }
  });
</script>

<SlideTitle title={'Listing'} description={'Tell us more about your listing...'} />

<div class="grid w-full items-center gap-1.5">
  <Label for="post-name">Title</Label>
  <Input
    type="text"
    id="post-name"
    placeholder=""
    bind:value={title}
    on:input={() => {
      titleValid = isNotEmptyOrWhitespace(title);
    }}
  />
  <p class="text-xs text-muted-foreground">Give your listing a title</p>
</div>
<div class="grid w-full mitems-center gap-1.5">
  <Label for="post-description">Description</Label>
  <Input type="text" id="post-description" placeholder="" bind:value={description} />
  <p class="text-xs text-muted-foreground">Information supplementary to the title</p>
</div>
<div class="flex w-full mitems-center gap-1.5">
  <div class="flex-1">
    <Label for="post-price">Price</Label>
    <Input type="text" id="post-price" placeholder="" bind:value={price} />
    <p class="text-xs text-muted-foreground">How much is this going for</p>
  </div>
  <div class="place-self-center flex gap-2 pt-2">
    <Checkbox bind:checked={negotiable} />
    <p class="text-xs text-muted-foreground">Negotiable?</p>
  </div>
</div>
<div
  class="flex flex-row items-start space-x-3 space-y-0 rounded-md border border-muted p-4 shadow bg-card"
>
  <Checkbox bind:checked={active} />
  <div class="space-y-1 leading-none text-xs font-normal flex flex-col">
    <Label>Mark as active</Label>
    <Label class="text-muted-foreground text-xs font-normal">
      Enabling this will make your listing visible to others
    </Label>
  </div>
</div>
