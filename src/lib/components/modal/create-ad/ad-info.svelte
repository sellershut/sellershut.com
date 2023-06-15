<script lang="ts">
  import Button from '$lib/components/button.svelte';
  import Step from '$lib/components/step.svelte';
  import createAdSteps from '$lib/util/steps';
  import IconBackCircle from '$lib/components/icons/icon-back-circle.svelte';
  import { fade, slide } from 'svelte/transition';
  import { showModal } from '$lib/util/modal/driver';
  import { selectCategory } from '$lib/util/modal/create-ad/select-category';

  let title = '';
  let titleEdited = false;

  const currentStep = 0;

  $: titleInvalid = !title.trim().length && titleEdited;
</script>

<div class="h-full flex flex-col space-y-2">
  <div
    class="flex space-x-2 p-2 rounded shadow drop-shadow items-center justify-center dark:bg-zinc-900 bg-zinc-300"
  >
    {#each createAdSteps as step, index}
      <Step
        num={index + 1}
        {step}
        isCurrent={index === currentStep}
        max={createAdSteps.length}
      />
    {/each}
  </div>
  <div transition:fade class="flex flex-col flex-1 text-left space-y-4">
    <div class="flex flex-col space-y-2">
      <p class="inline-flex gap-2">
        Title <span
          transition:fade
          class={`${
            titleInvalid ? 'block' : 'hidden'
          } font-light text-red-500 italic`}
          >(your title is empty or too short)</span
        >
      </p>
      <input
        type="text"
        bind:value={title}
        on:input={() => {
          titleEdited = true;
        }}
        class={`w-full ${
          titleInvalid ? 'border-2 border-red-500' : ''
        } focus:ring-rose-500 focus:border-rose-500 rounded bg-transparent text-sm`}
        placeholder="My ad title"
      />
    </div>
    <div class="flex flex-col space-y-2 flex-1">
      <p>Description</p>
      <textarea
        class="w-full flex-1 focus:ring-rose-500 focus:border-rose-500 rounded bg-transparent text-sm"
        placeholder="Don't shy away from the details now :)"
      />
    </div>
  </div>

  <div in:slide class="flex justify-between px-4 py-2">
    <Button
      icon={IconBackCircle}
      text={'Back'}
      isPrimary={false}
      eventHandler={() => showModal(selectCategory)}
    />
    <Button icon={IconBackCircle} text={'Proceed'} styles="rotate-180" />
  </div>
</div>
