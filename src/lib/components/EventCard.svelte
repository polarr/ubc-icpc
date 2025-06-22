<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import * as Card from '$lib/components/ui/card/index.js';
	import DOMPurify from 'dompurify';
	import { Badge } from '$lib/components/ui/badge/index.js';
	import { cn } from '$lib/utils';
	import { ChevronDown } from 'svelte-radix';

	let { event, minimal = false } = $props();
	let { title, description, registration, link, date, location, type } = event;

    let expanded = $state(!minimal);

	const isPastDay = () => {
		let currTime = new Date();
		currTime.setHours(0, 0, 0, 0);
		let pastTime = new Date(date);
		pastTime.setHours(0, 0, 0, 0);

		return currTime > pastTime;
	};

	const getType = () => {
		switch (type) {
			case 'competition':
				return 'Official Competition';
			case 'tryout':
				return 'UBC Tryout';
			default:
			case 'other':
				return 'Event';
		}
	};

	const getStyle = () => {
		switch (type) {
			case undefined: // No type specified
				return '';
			case 'competition':
				return ' border-2 border-blue-500 dark:border-blue-800';
			case 'tryout':
				return ' border-2 border-red-500 dark:border-red-800';
			default:
			case 'other':
				return ' border-2 border-green-500 dark:border-green-800';
		}
	};

	let displayDate = $derived(
		new Date(date).toLocaleString('en-CA', {
			dateStyle: 'medium',
			timeStyle: new Date(date).getHours() == 0 ? undefined : 'short'
		})
	);
</script>

<Card.Root class={'flex flex-col justify-between text-left ' + getStyle()}>
	<Card.Header class={(minimal ? 'p-4 ':'')}>
        <div class='flex items-center gap-6'>
            <div>
                <Card.Title>
                    {#if type}
                        <Badge class="mb-2">{getType()}</Badge>
                    {/if}
                    <div>{title}</div>
                </Card.Title>
                <div class="text-muted-foreground text-sm">
                    {#if date}
                        {displayDate}
                    {/if}
                    {#if date && location}
                        ·
                    {/if}
                    {#if location}
                        {location}
                    {/if}
                </div>
            </div>
            {#if minimal}
                <Button onclick={()=> expanded = !expanded} class="ml-auto" variant="ghost">
                    <ChevronDown class="size-4"/>
                </Button>
            {/if}
        </div>
	</Card.Header>
	{#if expanded}
		{#if description}
			<Card.Content class={(minimal ? 'p-4 ':'')}>
				<p class="text-sm">{@html DOMPurify.sanitize(description)}</p>
			</Card.Content>
		{/if}

		<Card.Footer class={'flex gap-2 ' + (minimal ? 'p-4 ':'')}>
			<Button
				disabled={isPastDay() || !registration}
				variant="outline"
				target="_blank"
				rel="noreferrer"
				href={!isPastDay() && registration}
			>
				Register
			</Button>
			<Button disabled={!link} class="ml-auto" target="_blank" rel="noreferrer" href={link}>
				Join
			</Button>
		</Card.Footer>
	{/if}
</Card.Root>
