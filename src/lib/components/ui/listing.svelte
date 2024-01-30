<script lang="ts">
  import * as Card from '$components/ui/card';
</script>

<Card.Root class="lg:w-1/4 md:w-1/2 p-4 w-full scale-95 hover:bg-muted border-muted">
  <a href={'#'} class="block relative h-48 rounded overflow-hidden">
    <img
      alt="ecommerce"
      class="object-cover object-center w-full h-full block"
      src="https://dummyimage.com/420x260"
    />
  </a>
  <Card.Footer>
    <div class="mt-4">
      <h3 class="text-muted-foreground text-xs tracking-widest title-font mb-1">CATEGORY</h3>
      <h2 class="title-font text-lg font-medium">The Catalyzer</h2>
      <p class="mt-1">$16.00</p>
    </div>
  </Card.Footer>
</Card.Root>
