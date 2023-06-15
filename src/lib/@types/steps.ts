import type { SvelteComponent } from 'svelte';

export interface StepItem {
  icon?: typeof SvelteComponent;
  text: string;
}
