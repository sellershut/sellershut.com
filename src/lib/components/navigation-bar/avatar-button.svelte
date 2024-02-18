<script lang="ts">
  import * as DropdownMenu from '$components/ui/dropdown-menu';
  import { Button } from '$components/ui/button';
  import * as AvatarComponent from '$components/ui/avatar';
  import {
    Avatar,
    Bell,
    ChatBubble,
    MixerVertical,
    Pencil1,
    Person,
    Plus,
    StarFilled,
    Value,
  } from 'radix-icons-svelte';
  import { getContext } from 'svelte';
  import type { Session, User } from 'lucia';

  const gap = 'inline-flex gap-2 w-full';
  const user: User | null = getContext('sessionUser');
  const session: Session | null = getContext('sessionData');

  const getInitials = (name: string): string => {
    const tokens = name.split(' ');
    if (tokens.length > 1) {
      const first = tokens[0].charAt(0);
      const last = tokens[tokens.length - 1].charAt(0);
      return `${first}${last}`;
    }
    const first = tokens[0].charAt(0);
    return first;
  };
</script>

{#if session && user}
  <DropdownMenu.Root>
    <DropdownMenu.Trigger asChild let:builder>
      <Button variant="ghost" builders={[builder]} class="hover:bg-transparent">
        <AvatarComponent.Root>
          {#if user.avatar}
            <AvatarComponent.Image src={user.avatar} alt="profile image" />
            {#if user.name}
              <AvatarComponent.Fallback
                >{user.name ? getInitials(user.name) : ''}</AvatarComponent.Fallback
              >
            {/if}
          {:else}
            <AvatarComponent.Fallback><Avatar class="scale-125" /></AvatarComponent.Fallback>
          {/if}
        </AvatarComponent.Root>
      </Button>
    </DropdownMenu.Trigger>
    <DropdownMenu.Content class="w-56 dark:border-muted">
      {#if user?.name && session}
        <DropdownMenu.Label class="text-center">{`Hey ${user.name}`}...</DropdownMenu.Label>
      {/if}
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
            <DropdownMenu.Item disabled class={gap}><MixerVertical /> Settings</DropdownMenu.Item>
            <DropdownMenu.Item>
              <a href="/login">Sign In</a>
            </DropdownMenu.Item>
          </DropdownMenu.SubContent>
        </DropdownMenu.Sub>
      </DropdownMenu.Group>
    </DropdownMenu.Content>
  </DropdownMenu.Root>
{:else}
  <a
    href="/login"
    class="rounded-full p-3 bg-muted border border-input bg-transparent shadow-sm hover:bg-accent hover:text-accent-foreground text-foreground"
    ><Avatar class="scale-125 text-foreground/70" /></a
  >
{/if}
