<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
    import { Skeleton } from '$lib/components/ui/skeleton/index';
	import * as Card from '$lib/components/ui/card/index.js';
	import DOMPurify from 'dompurify';
</script>

<Card.Root class="flex flex-col justify-between text-left">
	<Card.Header>
		<Card.Title><Skeleton class="h-[20px] w-[200px] rounded-full"/></Card.Title>
        <Skeleton class="h-[20px] w-[80px] rounded-full"/>
	</Card.Header>
</Card.Root>
