<script lang="ts">
  import myCountries from '$lib/content/country-list';
  import * as Command from '$components/ui/command';
  import * as Popover from '$components/ui/popover';
  import { Button } from '$components/ui/button';
  import { cn } from '$lib/utils';
  import { CaretSort, Check } from 'radix-icons-svelte';
  import { createEventDispatcher, tick } from 'svelte';
  import MapComponent from './map.svelte';
  import SlideTitle from './slide-title.svelte';

  const countryList = myCountries();

  let selectedValue: string | null = $state(null);
  const country = $derived(countryList.find((val) => val.name.common === selectedValue));
  let open = $state(false);

  const closeAndFocusTrigger = (triggerId: string) => {
    open = false;
    tick().then(() => {
      document.getElementById(triggerId)?.focus();
    });
  };

  const dispatch = createEventDispatcher();

  const pointSelected = (event: CustomEvent<number[]>) => {
    dispatch('slideValid', event.detail);
  };
</script>

<SlideTitle title={'Location'} description={'Please select your region...'} />

<Popover.Root bind:open let:ids>
  <Popover.Trigger asChild let:builder>
    <Button
      builders={[builder]}
      variant="outline"
      role="combobox"
      aria-expanded={open}
      class="w-[200px] justify-between mx-auto"
    >
      {country ? `${country.flag} ${country.name.common}` : 'Select a country...'}
      <CaretSort class="ml-2 h-4 w-4 shrink-0 opacity-50" />
    </Button>
  </Popover.Trigger>
  <Popover.Content class="w-52 p-0">
    <Command.Root>
      <Command.Input placeholder="Search country..." />
      <Command.Empty>No country found.</Command.Empty>
      <Command.Group class="max-h-48">
        {#each countryList as { name: { common }, flag }}
          <Command.Item
            value={common}
            onSelect={(currentValue) => {
              selectedValue = currentValue;
              closeAndFocusTrigger(ids.trigger);
            }}
          >
            <Check class={cn('mr-2 h-4 w-4', selectedValue !== common && 'text-transparent')} />
            {flag}
            {common}
          </Command.Item>
        {/each}
      </Command.Group>
    </Command.Root>
  </Popover.Content>
</Popover.Root>

{#if country}
  <MapComponent {country} on:pointSelected={pointSelected} />
{/if}
