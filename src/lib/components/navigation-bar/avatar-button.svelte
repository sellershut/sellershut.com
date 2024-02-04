<script lang="ts">
  import * as DropdownMenu from '$components/ui/dropdown-menu';
  import { Button } from '$components/ui/button';
  import * as Avatar from '$components/ui/avatar';
  import {
    Bell,
    ChatBubble,
    MixerVertical,
    Pencil1,
    Person,
    Plus,
    StarFilled,
    Value,
  } from 'radix-icons-svelte';

  const gap = 'inline-flex gap-2 w-full';
</script>

<DropdownMenu.Root>
  <DropdownMenu.Trigger asChild let:builder>
    <Button variant="ghost" builders={[builder]} class="hover:bg-transparent">
      <Avatar.Root>
        <Avatar.Image src="https://github.com/shadcn.png" alt="@shadcn" />
        <Avatar.Fallback>CN</Avatar.Fallback>
      </Avatar.Root>
    </Button>
  </DropdownMenu.Trigger>
  <DropdownMenu.Content class="w-56 dark:border-muted">
    <DropdownMenu.Label class="text-center">Hey User...</DropdownMenu.Label>
    <DropdownMenu.Separator />
    <DropdownMenu.Group>
      <div class="sm:hidden">
        <DropdownMenu.Item class={`${gap}`}><Bell />Notifications</DropdownMenu.Item>
        <DropdownMenu.Separator />
      </div>
      <DropdownMenu.Sub>
        <DropdownMenu.SubTrigger class={gap}><Value />My Hut</DropdownMenu.SubTrigger>
        <DropdownMenu.SubContent class="dark:border-muted">
          <DropdownMenu.Item class={gap}><Plus />Create</DropdownMenu.Item>
          <DropdownMenu.Item class={gap}><StarFilled />Starred</DropdownMenu.Item>
          <DropdownMenu.Item class={gap}><Pencil1 />Drafts</DropdownMenu.Item>
        </DropdownMenu.SubContent>
      </DropdownMenu.Sub>
    </DropdownMenu.Group>
    <DropdownMenu.Separator />
    <DropdownMenu.Group>
      <DropdownMenu.Sub>
        <DropdownMenu.SubTrigger class="inline-flex gap-2 w-full"
          ><Person />Profile</DropdownMenu.SubTrigger
        >
        <DropdownMenu.SubContent class="dark:border-muted">
          <DropdownMenu.Item class={gap}><ChatBubble />Messages</DropdownMenu.Item>
          <DropdownMenu.Item class={gap}><MixerVertical /> Settings</DropdownMenu.Item>
          <DropdownMenu.Item disabled>Sign Out</DropdownMenu.Item>
        </DropdownMenu.SubContent>
      </DropdownMenu.Sub>
    </DropdownMenu.Group>
  </DropdownMenu.Content>
</DropdownMenu.Root>
