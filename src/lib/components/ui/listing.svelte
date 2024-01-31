<script lang="ts">
  import * as Card from '$components/ui/card';
  import { Calendar } from 'radix-icons-svelte';
  import * as Avatar from '$components/ui/avatar';
  import * as HoverCard from '$components/ui/hover-card';

  let text =
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores ullam eos ratione magni quos eligendi sapiente error, suscipit id illo ex cupiditate commodi totam reiciendis corrupti? Earum maxime ea perspiciatis?';
</script>

<Card.Root class="lg:w-1/4 md:w-1/2 p-4 w-full scale-95 hover:bg-muted border-muted">
  <a href={'#'} class="block relative h-48 rounded overflow-hidden">
    <img
      alt="ecommerce"
      class="object-cover object-center w-full h-full block"
      src="https://dummyimage.com/420x260"
    />
  </a>
  <div class="mt-4">
    <h3 class="text-muted-foreground text-xs tracking-widest title-font mb-1">CATEGORY</h3>
    <h2 class="title-font text-lg font-medium">The Catalyzer</h2>
    <p class="mt-1 text-xs">{text.slice(0, 80)}{text.length >= 80 ? '...' : ''}</p>
  </div>
  <Card.Footer>
    <div class="flex flex-col gap-1">
      <p class="mt-4">$16.00</p>
      <HoverCard.Root>
        <HoverCard.Trigger class="text-xs font-medium">7d</HoverCard.Trigger>
        <HoverCard.Content class="w-80">
          <div class="flex justify-between space-x-4">
            <Avatar.Root>
              <Avatar.Image src="https://github.com/sveltejs.png" />
              <Avatar.Fallback>RK</Avatar.Fallback>
            </Avatar.Root>
            <div class="space-y-1">
              <h4 class="text-sm font-semibold">@username</h4>
              <p class="text-sm">Cybernetically enhanced web apps.</p>
              <div class="flex items-center pt-2">
                <Calendar class="mr-2 h-4 w-4 opacity-70" />{' '}
                <span class="text-xs text-muted-foreground"> Joined September 2022 </span>
              </div>
            </div>
          </div>
        </HoverCard.Content>
      </HoverCard.Root>
      <p class="text-xs font-medium">Some Area</p>
    </div>
  </Card.Footer>
</Card.Root>
