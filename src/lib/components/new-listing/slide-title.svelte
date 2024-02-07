<script lang="ts">
  import * as Dialog from '$components/ui/dialog';

  const { title, description } = $props<{ title: string; description: string }>();
</script>

<div class="space-y-1 text-center">
  <h4 class="text-sm font-medium leading-none text-foreground">{title}</h4>
  <Dialog.Description>{description}</Dialog.Description>
</div>
