<script lang="ts">
import { goto } from "$app/navigation";
import { Button } from "$lib/components/ui/button";
import { IconMessage, IconShoppingBag } from "@tabler/icons-svelte";
import AvatarDesktopButton from "./avatar-desktop-button.svelte";
</script>

<div class="flex items-center justify-center">
  <AvatarDesktopButton />
  <Button variant="ghost" size="icon">
    <IconShoppingBag
      onmousedown={() => {
        goto("/new");
      }}
    />
  </Button>
  <Button variant="ghost" size="icon">
    <IconMessage />
  </Button>
</div>
