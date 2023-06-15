import type { StepItem } from '$lib/@types/steps';
import IconInfo from '$lib/components/icons/icon-info.svelte';
import IconMoney from '$lib/components/icons/icon-money.svelte';
import IconLocation from '$lib/components/icons/icon-location.svelte';
import IconPrivacyView from '$lib/components/icons/icon-privacy-view.svelte';
import IconCheck from '$lib/components/icons/icon-check.svelte';

const createAdSteps: StepItem[] = [
  {
    text: 'Information',
    icon: IconInfo,
  },
  { text: 'Price', icon: IconMoney },
  { text: 'Location', icon: IconLocation },
  { text: 'Privacy', icon: IconPrivacyView },
  { text: 'Publish', icon: IconCheck },
];

export default createAdSteps;
