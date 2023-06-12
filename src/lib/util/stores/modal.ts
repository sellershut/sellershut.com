import type { SvelteComponent } from 'svelte';
import { writable } from 'svelte/store';

export interface ModalStatus {
  isVisible: boolean;
  content?: typeof SvelteComponent;
  title?: {
    value: string;
    subTitle: string;
  };
}

export const modal = writable<ModalStatus>({
  isVisible: false,
});
