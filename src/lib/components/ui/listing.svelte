<script lang="ts">
  import * as Card from '$components/ui/card';
  import { Calendar } from 'radix-icons-svelte';
  import * as Avatar from '$components/ui/avatar';
  import * as HoverCard from '$components/ui/hover-card';
  import type { Listing } from '$lib/types/listing';
  const { categoryId, description, title, location, imageUrl, id, price } =
    $props<Partial<Listing>>();

  const limit: number = 80;
</script>

<li class="lg:w-1/4 md:w-1/2 w-full scale-[.975] list-none">
  <Card.Root class="hover:bg-muted border-muted p-4">
    <a href={'#'} class="block relative h-48 rounded overflow-hidden">
      <img
        alt={`${id} image`}
        class="object-cover object-center w-full h-full block"
        src={imageUrl}
      />
    </a>
    <Card.Title>
      <div class="mt-4">
        <h3
          class="text-muted-foreground text-xs tracking-widest title-font mb-1 font-normal uppercase"
        >
          {categoryId}
        </h3>
        <h2 class="title-font text-lg font-medium">{title}</h2>
      </div>
    </Card.Title>
    <Card.Content>
      <p class="mt-1 text-xs text-muted-foreground">
        {description?.slice(0, limit)}{description!.length >= limit ? '...' : ''}
      </p>
    </Card.Content>
    <Card.Footer>
      <div class="flex justify-between w-full">
        <p>${price}</p>
        <div class="flex flex-col">
          <p class="text-xs font-semibold">{location}</p>
          <HoverCard.Root>
            <HoverCard.Trigger
              class="text-xs font-medium inline-flex items-center gap-1 place-self-end"
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
