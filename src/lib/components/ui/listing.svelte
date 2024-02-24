<script lang="ts">
  import * as Card from '$components/ui/card';
  import { Calendar } from 'radix-icons-svelte';
  import * as Avatar from '$components/ui/avatar';
  import * as HoverCard from '$components/ui/hover-card';

  const limit: number = 80;

  let text =
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores ullam eos ratione magni quos eligendi sapiente error, suscipit id illo ex cupiditate commodi totam reiciendis corrupti? Earum maxime ea perspiciatis?';
</script>

<li class="lg:w-1/4 md:w-1/2 w-full scale-[.975] list-none">
  <Card.Root class="hover:bg-muted border-muted p-4">
    <a href={'#'} class="block relative h-48 rounded overflow-hidden">
      <img
        alt="ecommerce"
        class="object-cover object-center w-full h-full block"
        src="https://dummyimage.com/420x260"
      />
    </a>
    <Card.Title>
      <div class="mt-4">
        <h3 class="text-muted-foreground text-xs tracking-widest title-font mb-1 font-normal">
          CATEGORY
        </h3>
        <h2 class="title-font text-lg font-medium">The Catalyzer</h2>
      </div>
    </Card.Title>
    <Card.Content>
      <p class="mt-1 text-xs text-muted-foreground">
        {text.slice(0, limit)}{text.length >= limit ? '...' : ''}
      </p>
    </Card.Content>
    <Card.Footer class="relative">
      <div class="absolute left-0 right-0 translate-y-1/2 flex justify-between w-full items-center">
        <p>$16.00</p>
        <div class="flex flex-col ">
          <p class="text-xs font-semibold">Some Area</p>
          <HoverCard.Root>
            <HoverCard.Trigger
              class="text-xs font-medium inline-flex items-center gap-1 place-self-center"
              ><Calendar />7d</HoverCard.Trigger
            >
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
        </div>
      </div>
    </Card.Footer>
  </Card.Root>
</li>
