import type { Ad } from '$lib/@types/ad';
import { writable } from 'svelte/store';

export const newAd = writable<Ad | undefined>();

export default newAd;
