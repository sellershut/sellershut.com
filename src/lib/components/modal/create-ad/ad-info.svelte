<script lang="ts">
  import Button from '$lib/components/button.svelte';
  import Step from '$lib/components/step.svelte';
  import { selectCategory } from '$lib/util/modal/create-ad/select-category';
  import { showModal } from '$lib/util/modal/driver';
  import createAdSteps from '$lib/util/steps';
  import IconBackCircle from '$lib/components/icons/icon-back-circle.svelte';
  import { modal } from '$lib/util/stores/modal';
  import { adPrice } from '$lib/util/modal/create-ad/ad-price';
  import { adInfoTitle } from '$lib/util/modal/create-ad/ad-info/ad-info-title';
  import AdTitle from './ad-info/ad-title.svelte';
  import AdPrice from './ad-info/ad-price.svelte';

  let title = '';
  let amount = 0;
  let titleEdited = false;
  let amountEdited = false;

  let currentStep = 0;

  let isInvalid = true;

  const titleChanged = (e: CustomEvent<string>): void => {
    titleEdited = true;
    title = e.detail;
  };

  const amountChanged = (e: CustomEvent<number>): void => {
    amountEdited = true;
    amount = e.detail;
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
        // you're in the last slide now, so next should handle event
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

  $: {
    switch (currentStep) {
      case 0:
        $modal.title = adInfoTitle;
        isInvalid = !title.trim().length && titleEdited;
        break;

      case 1:
        $modal.title = adPrice.title;
        isInvalid = !amountEdited || amount == null;
        break;

      default:
        isInvalid = true;
    }
  }
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
    <AdTitle {title} titleInvalid={isInvalid} on:titleChanged={titleChanged} />
  {:else if currentStep === 1}
    <AdPrice
      {amount}
      amountInvalid={isInvalid}
      on:amountChanged={amountChanged}
    />
  {/if}

  <div class="flex justify-between px-4 py-2">
    <Button
      icon={IconBackCircle}
      text={'Back'}
      isPrimary={false}
      eventHandler={() => navigator(true)}
    />
    {#if titleEdited && !isInvalid}
      <Button
        icon={IconBackCircle}
        text={'Proceed'}
        styles="rotate-180"
        eventHandler={() => navigator(false)}
      />
    {/if}
  </div>
</div>
