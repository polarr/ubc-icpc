<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import * as Card from '$lib/components/ui/card/index.js';

	interface Props {
		event: Event;
	}

	let { event }: Props = $props();
</script>

<Card.Root class="flex flex-col justify-between">
	<Card.Header>
		<Card.Title>{event.title}</Card.Title>
		{#if event.date}
			<div class="text-muted-foreground text-sm">
				{new Date(event.date).toLocaleString(undefined, {
					dateStyle: 'medium'
				})}
			</div>
		{/if}
	</Card.Header>
	<Card.Content>
		<p class="text-sm">{event.description}</p>
	</Card.Content>
	<Card.Footer class="flex gap-2">
		<Button
			disabled={!event.registration}
			variant="outline"
			target="_blank"
			rel="noreferrer"
			href={event.registration}
		>
			Register
		</Button>
		<Button
			disabled={!event.link}
			class="ml-auto"
			target="_blank"
			rel="noreferrer"
			href={event.link}
		>
			Join
		</Button>
	</Card.Footer>
</Card.Root>
