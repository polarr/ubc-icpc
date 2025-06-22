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
		ChevronLeft,
		ChevronRight,
		ChevronsUpDown,
		Calendar
	} from '@lucide/svelte';

	import pb from '$lib/pocketbase';

	import { onMount } from 'svelte';

	import EventCard from '$lib/components/EventCard.svelte';
	import EventCardSkeleton from '$lib/components/EventCardSkeleton.svelte';
	import { Input } from '$lib/components/ui/input/index';
	import { Label } from '$lib/components/ui/label/index';
	import * as Select from '$lib/components/ui/select';
	import { Badge } from '$lib/components/ui/badge/index';
	import * as Popover from '$lib/components/ui/popover/index.js';
	import { RangeCalendar } from '$lib/components/ui/range-calendar/index';
	import type { DateRange } from 'bits-ui';
	import { CalendarDate, getLocalTimeZone, now, type DateValue } from '@internationalized/date';
	import { formatDateRange } from 'little-date';
	import * as Pagination from '$lib/components/ui/pagination';
	import { ScrollArea } from '$lib/components/ui/scroll-area';

	let upcomingItems: Event[] = $state([]),
		pastItems: Event[] = $state([]);
	let loading = $state(true);

	onMount(async () => {
		try {
			// Fetch all events from both 'practices' and 'events' collections, sorted by date descending
			let [upcomingPractices, pastPractices, upcomingEvents, pastEvents] = await Promise.all([
				pb
					.collection('practices')
					.getFullList({ sort: '+date', filter: 'date>@todayStart' }) as Promise<Event[]>,
				pb
					.collection('practices')
					.getFullList({ sort: '-date', filter: 'date<=@todayStart' }) as Promise<Event[]>,
				pb
					.collection('events')
					.getFullList({ sort: '+date', filter: 'date>@todayStart' }) as Promise<Event[]>,
				pb
					.collection('events')
					.getFullList({ sort: '-date', filter: 'date<=@todayStart' }) as Promise<Event[]>
			]);

			// Merge and sort by date ascending
			upcomingItems = [...upcomingPractices, ...upcomingEvents].sort(
				(a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
			);

			// Merge and sort by date descending
			pastItems = [...pastPractices, ...pastEvents].sort(
				(a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
			);
		} catch (e) {
			console.error('Failed to fetch events from PocketBase:', e);
		} finally {
			loading = false;
		}
	});

	let dateWithin = $state<DateRange | undefined>({
		start: new CalendarDate(2000, 1, 1),
		end: now(getLocalTimeZone())
	});

	function formatRange(start: DateValue, end: DateValue) {
		return formatDateRange(start.toDate(getLocalTimeZone()), end.toDate(getLocalTimeZone()), {
			includeTime: false
		});
	}

	let search = $state('');
	let filterType = $state('all');

	let filteredPastItems = $derived(
		pastItems.filter((event) => {
			let matchesSearch =
				search.trim() === '' ||
				(event.title && event.title.toLowerCase().includes(search.trim().toLowerCase()));
			let matchesType =
				filterType === 'all' ||
				(event.type == null && filterType === 'practice') ||
				(event.type != null && filterType === 'event');
			let matchesDate = true;
			if (dateWithin?.start && dateWithin?.end && event.date) {
				const eventDate = new Date(event.date);
				const startDate = dateWithin.start.toDate(getLocalTimeZone());
				const endDate = dateWithin.end.add({ days: 1 }).toDate(getLocalTimeZone());
				matchesDate = eventDate >= startDate && eventDate < endDate;
			}
			return matchesSearch && matchesType && matchesDate;
		})
	);

	let page = $state(1);
	const perPage = 10;

	let paginatedPastItems = $derived(filteredPastItems.slice((page - 1) * perPage, page * perPage));
</script>

<section
	class="mx-auto flex max-w-[980px] flex-col items-center gap-2 py-8 text-center md:py-12 md:pb-8 lg:py-24 lg:pb-20"
>
	<h1 class="text-3xl leading-tight font-bold tracking-tighter md:text-6xl lg:leading-[1.1]">
		Schedule
	</h1>
	<div class="flex w-full items-center justify-center space-x-4">
		<Button variant="secondary" href="#">
			<Calendar />
			Add to Google Calendar
		</Button>
	</div>
</section>

<section
	class="flex w-(--breakpoint-md) max-w-full flex-col space-y-4 px-2 text-center text-2xl sm:text-4xl"
>
	<h1 class="leading-tight font-bold tracking-tighter">Upcoming Practices and Events</h1>

	<section class="grid grid-cols-1 gap-2 pb-10 text-sm">
		{#if loading}
			<EventCardSkeleton />
		{:else if upcomingItems.length == 0}
			<p>No upcoming practices or events.</p>
		{:else}
			{#each upcomingItems as event}
				<EventCard {event} />
			{/each}
		{/if}
	</section>

	<h1 class="leading-tight font-bold tracking-tighter">Past Practices and Events</h1>

	<div
		class="xs:grid-cols-[1fr_minmax(auto,50%)] my-4 grid h-fit w-full max-w-full grid-cols-1 gap-2 gap-y-4 sm:grid-cols-[minmax(0,50%)_1fr_minmax(auto,25%)]"
	>
		<div class="xs:col-span-2 flex flex-col gap-3 sm:col-span-1">
			<Label for="search" class="px-1">Search</Label>
			<Input id="search" placeholder="Search by title..." bind:value={search} />
		</div>
		<div class="flex flex-col gap-3">
			<Label for="type" class="px-1">Type</Label>
			<Select.Root type="single" bind:value={filterType}>
				<Select.Trigger class="!h-10 w-full"
					>{filterType === 'all'
						? 'All Types'
						: filterType.charAt(0).toUpperCase() + filterType.slice(1)}</Select.Trigger
				>
				<Select.Content>
					<Select.Item value="all">All Types</Select.Item>
					<Select.Item value="practice">Practice</Select.Item>
					<Select.Item value="event">Event</Select.Item>
				</Select.Content>
			</Select.Root>
		</div>
		<div class="flex min-w-[200px] flex-col gap-3">
			<Label for="dates" class="px-1">Date Within</Label>
			<Popover.Root>
				<Popover.Trigger id="dates">
					{#snippet child({ props })}
						<Button {...props} variant="outline" class="h-10 justify-between font-normal">
							{#if dateWithin?.start && dateWithin?.end}
								{formatRange(dateWithin.start, dateWithin.end)}
							{:else}
								Select date
							{/if}
							<Calendar class="size-3.5" />
						</Button>
					{/snippet}
				</Popover.Trigger>
				<Popover.Content class="w-auto overflow-hidden p-0" align="start">
					<RangeCalendar bind:value={dateWithin} captionLayout="dropdown" />
				</Popover.Content>
			</Popover.Root>
		</div>
	</div>

	<ScrollArea class="h-[500px] rounded-sm border p-3">
		<section class="grid grid-cols-1 gap-2 text-sm">
			{#key paginatedPastItems}
				{#if loading}
					<EventCardSkeleton />
				{:else if paginatedPastItems.length == 0}
					<p>No past practices or events.</p>
				{:else}
					{#each paginatedPastItems as event, i}
						<EventCard {event} minimal={page > 1 || i > 4} />
					{/each}
				{/if}
			{/key}
		</section>
	</ScrollArea>

	<div class="mb-2 flex justify-center">
		<Pagination.Root count={filteredPastItems.length} {perPage} siblingCount={0} bind:page>
			{#snippet children({ pages, currentPage })}
				<Pagination.Content>
					<Pagination.Item>
						<Pagination.PrevButton>
							<ChevronLeft class="size-4" />
							<span class="hidden sm:block">Previous</span>
						</Pagination.PrevButton>
					</Pagination.Item>
					{#each pages as page (page.key)}
						{#if page.type === 'ellipsis'}
							<Pagination.Item>
								<Pagination.Ellipsis />
							</Pagination.Item>
						{:else}
							<Pagination.Item>
								<Pagination.Link {page} isActive={currentPage === page.value}>
									{page.value}
								</Pagination.Link>
							</Pagination.Item>
						{/if}
					{/each}
					<Pagination.Item>
						<Pagination.NextButton>
							<span class="hidden sm:block">Next</span>
							<ChevronRight class="size-4" />
						</Pagination.NextButton>
					</Pagination.Item>
				</Pagination.Content>
			{/snippet}
		</Pagination.Root>
	</div>
</section>
