<script lang="ts">
  import { buttonVariants } from '$components/ui/button';
  import * as Dialog from '$components/ui/dialog';
  import { MixerHorizontal } from 'radix-icons-svelte';
</script>

<Dialog.Root>
  <Dialog.Trigger class={`${buttonVariants({ variant: 'outline' })} inline-flex gap-2`}
    ><MixerHorizontal />Filter</Dialog.Trigger
  >
  <Dialog.Content>
    <Dialog.Header>
      <Dialog.Title>Are you sure absolutely sure?</Dialog.Title>
      <Dialog.Description>
        This action cannot be undone. This will permanently delete your account and remove your data
        from our servers.
      </Dialog.Description>
    </Dialog.Header>
  </Dialog.Content>
</Dialog.Root>
