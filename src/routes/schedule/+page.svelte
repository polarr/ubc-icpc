<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import * as Card from '$lib/components/ui/card/index.js';
	import { Badge } from '$lib/components/ui/badge/index.js';
	import * as Avatar from '$lib/components/ui/avatar/index.js';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index';
	import * as Tooltip from '$lib/components/ui/tooltip';
	import * as Breadcrumb from '$lib/components/ui/breadcrumb/index.js';
    import * as Collapsible from '$lib/components/ui/collapsible/index';
	import { Separator } from '$lib/components/ui/separator';
	import { GithubLogo } from 'svelte-radix';
	import {
		Activity,
		Star,
		ChevronDown,
		Plus,
		Circle,
		Heart,
		Gauge,
		Slash,
		Hash,
		ChevronRight,

		ChevronsUpDown,
        Calendar
	} from '@lucide/svelte';
	import * as config from '$lib/siteConfig';

	import katex from 'katex';
	import { Content } from '$lib/components/ui/drawer';

    import pb from '$lib/pocketbase';

    import EventCard from './EventCard.svelte';
	import { onMount } from 'svelte';

    let events: Event[] = [];
    let loading = true;

    onMount(async () => {
        try {
            // Fetch all events from both 'practices' and 'events' collections, sorted by date descending
            let [practices, otherEvents] = await Promise.all([
                pb.collection('practices').getFullList({ sort: '-date' }) as Promise<Event[]>,
                pb.collection('events').getFullList({ sort: '-date' }) as Promise<Event[]>
            ]);
            // Merge and sort by date descending
            events = [...practices, ...otherEvents].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        } catch (e) {
            console.error('Failed to fetch events from PocketBase:', e);
        } finally {
            loading = false;
        }
    });
</script>

<section
        class="mx-auto flex max-w-[980px] flex-col items-center gap-2 py-8 text-center md:py-12 md:pb-8 lg:py-24 lg:pb-20"
    >
    <h1 class="text-3xl font-bold leading-tight tracking-tighter md:text-6xl lg:leading-[1.1]">
        Schedule
    </h1>
    <div class="flex w-full items-center justify-center space-x-4">
        <Button href="#">
            <Calendar />
            Add to Google Calendar
        </Button>
    </div>
</section>

<section class="max-w-(--breakpoint-xl) flex flex-col space-y-4 text-2xl sm:text-4xl">
    <h1 class="font-bold leading-tight tracking-tighter text-center">
        Upcoming Practices and Events
    </h1>

    <section class="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3 px-4">
        {#if loading}
            <div>Loading...</div>
        {:else}
            {#each events as event}
                {#if event?.date && new Date(event.date) >= new Date()}
                    <EventCard {event}/>
                {/if}
            {/each}
        {/if}
    </section>

    <h1 class="font-bold leading-tight tracking-tighter text-center">
        Past Practices and Events
    </h1>

    <section class="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3 px-4">
        {#if loading}
            <div>Loading...</div>
        {:else}
            {#each events as event}
                {#if !event?.date || new Date(event.date) < new Date()}
                    <EventCard {event}/>
                {/if}
            {/each}
        {/if}
    </section>
</section>