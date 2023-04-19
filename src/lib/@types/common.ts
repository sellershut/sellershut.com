import type { SvelteComponent } from 'svelte';

export type SectionDividerProps = {
  position?: 'centre' | 'left' | 'right';
  hintEnabled: boolean;
};

export type AvatarDropDown = {
  text: string;
  icon: typeof SvelteComponent;
  onClick?: () => void;
};
