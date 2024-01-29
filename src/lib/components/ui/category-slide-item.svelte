<script lang="ts">
  import { page } from '$app/stores';
  import { QuestionMarkCircled } from 'radix-icons-svelte';
  import type { ComponentType } from 'svelte';

  let { data } = $props<{
    data: { text: string; path: string; icon?: ComponentType };
  }>();

  let searchParams = $state();

  $effect(() => {
    searchParams = $page.url.searchParams.get('explore');
  });

  function routePage(name: string): string {
    let url = new URLSearchParams($page.url.searchParams);

    url.set('explore', name);
    return `?${url.toString()}`;
  }
</script>

<a
  href={routePage(data.text)}
  class={`flex flex-col items-center justify-center text-xs text-center transition ${searchParams === data.text ? '' : 'opacity-80'} hover:opacity-100`}
>
  <svelte:component this={data.icon ?? QuestionMarkCircled} />
  {data.text}
</a>
<div
  class={`mt-2 h-[2px] w-full rounded-full bg-primary ${searchParams === data.text ? '' : 'invisible'} `}
/>
