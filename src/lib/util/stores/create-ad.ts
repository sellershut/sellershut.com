import { writable } from 'svelte/store';
import type { Category } from '$lib/@types/category';
import { LinkedList } from '../select-category/linked-list';

export const selectedCategories = writable(new LinkedList<Category>());

export default selectedCategories;
