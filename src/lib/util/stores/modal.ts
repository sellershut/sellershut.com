import type { SvelteComponent } from 'svelte';
import { writable } from 'svelte/store';

export interface ModalStatus {
  isVisible: boolean;
  content?: typeof SvelteComponent;
}

export const modal = writable<ModalStatus>({
  isVisible: false,
});
