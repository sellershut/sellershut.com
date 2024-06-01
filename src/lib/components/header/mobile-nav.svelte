<script lang="ts">
import { IconSmartHome } from "@tabler/icons-svelte";
import {
	AlbumsOutline,
	ChatbubbleOutline,
	CogOutline,
	PersonOutline,
} from "svelte-ionicons";

// TODO: fix type
//biome-ignore lint/suspicious/noExplicitAny: <explanation>
const items: { icon: any; text: string }[] = [
	{
		icon: IconSmartHome,
		text: "Home",
	},
	{
		icon: AlbumsOutline,
		text: "Browse",
	},
	{
		icon: PersonOutline,
		text: "Profile",
	},
	{
		icon: ChatbubbleOutline,
		text: "Messages",
	},
	{
		icon: CogOutline,
		text: "Settings",
	},
];

let indicator = 0;
</script>

<!--NOTE: Goes under footer, intended, if you decided to change this, because I know you :), increase the z-index -->
<nav class="fixed bottom-0 w-screen md:hidden">
  <ul class="navigation-bar relative m-2 flex items-center justify-around rounded-lg p-2 shadow">
    {#each items as { icon, text }, index}
      <li class="group h-full w-full">
        <button
          class="relative flex w-full flex-col items-center justify-center gap-1 text-center"
          on:click={() => {
            indicator = index;
          }}
        >
          <span
            class={`${index === indicator ? 'absolute -top-8 h-12 w-12 rounded-full border-[6px] border-muted bg-card transition-all duration-500' : 'hidden'}`}
          ></span>
          <svelte:component
            this={icon}
            size={'1.5em'}
            class={`relative leading-[70px] duration-500 ${index === indicator ? '-translate-y-5' : 'translate-y-[10px] '}`}
          />
          <span
            class={`relative flex flex-col items-center duration-500 ${index === indicator ? '-translate-y-[6px] opacity-100' : 'opacity-0'}`}
          >
            <span class="text-xs tracking-wider">{text}</span>
            <span class={`absolute top-4 h-1 w-2 rounded-full bg-primary`}></span>
          </span>
        </button>
      </li>
    {/each}
  </ul>
</nav>

