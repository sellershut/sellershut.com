<script lang="ts">
  import Button from '$lib/components/button.svelte';
  import Step from '$lib/components/step.svelte';
  import { selectCategory } from '$lib/util/modal/create-ad/select-category';
  import { showModal } from '$lib/util/modal/driver';
  import { slide } from 'svelte/transition';
  import createAdSteps from '$lib/util/steps';
  import IconBackCircle from '$lib/components/icons/icon-back-circle.svelte';
  import AdTitle from './ad-info/ad-title.svelte';
  import AdPrice from './ad-info/ad-price.svelte';

  let title = '';
  let titleEdited = false;

  let currentStep = 0;

  const titleChanged = (e: CustomEvent<string>): void => {
    titleEdited = true;
    title = e.detail;
  };

  const navigator = (isBack: boolean) => {
    switch (currentStep) {
      case 0:
        if (isBack) {
          showModal(selectCategory);
        } else {
          currentStep += 1;
        }
        break;
      case createAdSteps.length - 1:
        if (!isBack) {
          // go to next slide
        } else {
          currentStep -= 1;
        }
        break;
      default:
        if (isBack) {
          currentStep -= 1;
        } else {
          currentStep += 1;
        }
    }
  };

  $: isInvalid = (): boolean => {
    switch (currentStep) {
      case 0:
        return !title.trim().length && titleEdited;

      default:
        return true;
    }
  };
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

  {#if currentStep === 0}
    <AdTitle
      {title}
      titleInvalid={isInvalid()}
      on:titleChanged={titleChanged}
    />
  {:else if currentStep === 1}
    <AdPrice />
  {/if}

  <div in:slide class="flex justify-between px-4 py-2">
    <Button
      icon={IconBackCircle}
      text={'Back'}
      isPrimary={false}
      eventHandler={() => navigator(true)}
    />
    {#if !isInvalid()}
      <Button
        icon={IconBackCircle}
        text={'Proceed'}
        styles="rotate-180"
        eventHandler={() => navigator(false)}
      />
    {/if}
  </div>
</div>
