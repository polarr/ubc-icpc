<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
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

    import pb from '$lib/pocketbase';

    import { onMount } from 'svelte';

    import EventCard from '$lib/components/EventCard.svelte';
	import EventCardSkeleton from '$lib/components/EventCardSkeleton.svelte';

    let upcomingItems: Event[] = [], pastItems: Event[] = [];
    let loading = true;

    onMount(async () => {
        try {
            // Fetch all events from both 'practices' and 'events' collections, sorted by date descending
            let [upcomingPractices, pastPractices, upcomingEvents, pastEvents] = await Promise.all([
                pb.collection('practices').getFullList({ sort: '+date', filter: 'date>@todayStart' }) as Promise<Event[]>,
                pb.collection('practices').getFullList({ sort: '-date', filter: 'date<=@todayStart'}) as Promise<Event[]>,
                pb.collection('events').getFullList({ sort: '+date', filter: 'date>@todayStart' }) as Promise<Event[]>,
                pb.collection('events').getFullList({ sort: '-date', filter: 'date<=@todayStart' }) as Promise<Event[]>
            ]);

            // Merge and sort by date ascending
            upcomingItems = [...upcomingPractices, ...upcomingEvents].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

            // Merge and sort by date descending
            pastItems = [...pastPractices, ...pastEvents].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
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
        <Button variant="secondary" href="#">
            <Calendar />
            Add to Google Calendar
        </Button>
    </div>
</section>

<section class="max-w-full w-(--breakpoint-md) flex flex-col space-y-4 text-2xl sm:text-4xl text-center">
    <h1 class="font-bold leading-tight tracking-tighter">
        Upcoming Practices and Events
    </h1>

    <section class="grid grid-cols-1 gap-4 px-4 pb-10 text-sm">
        {#if loading}
            <EventCardSkeleton />
        {:else if upcomingItems.length == 0}
            <p>No upcoming practices or events.</p>
        {:else}
            {#each upcomingItems as event}
                {#if event?.date && new Date(event.date) >= new Date()}
                    <EventCard {event}/>
                {/if}
            {/each}
        {/if}
    </section>

    <h1 class="font-bold leading-tight tracking-tighter">
        Past Practices and Events
    </h1>

    <section class="grid grid-cols-1 gap-2 px-4 text-sm">
        {#if loading}
            <EventCardSkeleton/>
        {:else if pastItems.length == 0}
            <p>No past practices or events.</p>
        {:else}
            {#each pastItems as event, i}
                {#if !event?.date || new Date(event.date) < new Date()}
                    <EventCard {event} minimal={i>4}/>
                {/if}
            {/each}
        {/if}
    </section>
</section>