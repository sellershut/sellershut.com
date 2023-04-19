import type { SvelteComponent } from 'svelte';
import { writable } from 'svelte/store';

export const showModal = writable(false);
export const modalContent = writable<undefined | typeof SvelteComponent>(
  undefined,
);

export default showModal;
