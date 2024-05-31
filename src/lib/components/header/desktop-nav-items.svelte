<script lang="ts">
import { Button } from "$lib/components/ui/button";
import { IconMessage, IconShoppingBag } from "@tabler/icons-svelte";
import AvatarDesktopButton from "./avatar-desktop-button.svelte";
</script>

<div class="flex items-center justify-center">
  <AvatarDesktopButton />
  <Button variant="ghost" size="icon">
    <IconShoppingBag />
  </Button>
  <Button variant="ghost" size="icon">
    <IconMessage />
  </Button>
</div>
