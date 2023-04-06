<script lang="ts">
  import { page } from '$app/stores';

  const data = $page.url.searchParams.get('category');
  console.log('from slot', data);
</script>
