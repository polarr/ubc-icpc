<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import * as Card from '$lib/components/ui/card/index.js';
	import { Badge } from '$lib/components/ui/badge/index.js';
	import * as Accordion from '$lib/components/ui/accordion/index.js';
	import * as Avatar from '$lib/components/ui/avatar/index.js';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index';
	import * as Tooltip from '$lib/components/ui/tooltip';
	import * as Breadcrumb from '$lib/components/ui/breadcrumb/index.js';
	import * as Collapsible from '$lib/components/ui/collapsible/index';
	import { Separator } from '$lib/components/ui/separator/index';
	import { DiscordLogo, GithubLogo } from 'svelte-radix';
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
	import pb from '$lib/pocketbase';

	import EventCard from '$lib/components/EventCard.svelte';
	import EventCardSkeleton from '$lib/components/EventCardSkeleton.svelte';

	import katex from 'katex';
	import { Content } from '$lib/components/ui/drawer';

	import Typed from 'typed.js';
	import { browser } from '$app/environment';
	import { onMount, tick } from 'svelte';

	let showTyped = false;

	function sleep(ms: number) {
		return new Promise((resolve) => setTimeout(resolve, ms));
	}

	async function handleResize() {
		if (window.innerWidth < 768) {
			showTyped = false;
			await tick();
		} else {
			showTyped = true;
			await tick();
		}
	}

	onMount(async () => {
		let resizeListener = window.addEventListener('resize', handleResize);

		await sleep(5000);
		showTyped = true;
		await tick();

		new Typed('#typed', {
			strings: ['Competitive <br class="lg:hidden">Programming', 'ICPC', 'DSA', 'Algorithms'],
			typeSpeed: 50,
			backSpeed: 20,
			startDelay: 0,
			backDelay: 2000,
			cursorChar: '│',
			loop: true
		});
	});

	let events: Event[] = [];
	let loading = true;
	let upcoming = 0,
		past = 0;

	onMount(async () => {
		try {
			// Fetch all events from both 'practices' and 'events' collections, sorted by date descending
			let [practices, otherEvents] = await Promise.all([
				pb.collection('practices').getList(1, 1, { sort: '+date', filter: 'date>@todayStart' }),
				pb.collection('events').getList(1, 1, { sort: '+date', filter: 'date>@todayStart' })
			]);

			// Merge and sort by date descending
			events = [
				...(otherEvents?.items as unknown as Event[]),
				...(practices?.items as unknown as Event[])
			];
		} catch (e) {
			console.error('Failed to fetch events from PocketBase:', e);
		} finally {
			loading = false;
			upcoming = events.length;
		}
	});
</script>

<section
	class="mx-auto flex max-w-[980px] flex-col items-center gap-2 px-2 py-8 text-center md:py-12 md:pb-8 lg:py-24 lg:pb-20"
>
	<div class="flex">
		<img src="/ubc-blue.png" alt="UBC Crest" class="h-12 dark:brightness-0 dark:invert" />
		<Separator class="mx-3" orientation="vertical" />
		<img src="/logo.svg" alt="Logo" class="h-12 w-12" />
	</div>
	<p class="text-muted-foreground max-w-[750px] text-lg text-balance sm:text-xl">
		University of British Columbia
	</p>
	<h1
		class="max-w-full text-3xl leading-tight font-bold tracking-tighter text-nowrap md:text-6xl lg:leading-[1.1]"
	>
		<span id="typed">
			{#if !showTyped}
				Competitive <br class="lg:hidden" />Programming
			{/if}
		</span> Club
	</h1>
	<p class="text-muted-foreground max-w-[750px] text-lg text-balance sm:text-xl">
		We eat problems and pizza.
	</p>
	<div class="flex w-full items-center justify-center space-x-2 py-4 md:pb-10">
		<Button target="_blank" rel="noreferrer" href={config.links.github}>
			<GithubLogo class="h-4 w-4" />
			GitHub
		</Button>
		<Button target="_blank" rel="noreferrer" href={config.links.discord}>
			<DiscordLogo class="h-4 w-4" />
			Discord
		</Button>
		<Button target="_blank" rel="noreferrer" href={config.links.codeforces}>
			<img
				src="/codeforces.svg"
				class="h-4 w-4 brightness-0 invert dark:brightness-100 dark:invert-0"
				alt="Codeforces Logo"
			/>
			Codeforces
		</Button>
	</div>
</section>

<section
	class="flex w-(--breakpoint-md) max-w-full flex-col items-center space-y-4 text-center text-2xl md:text-4xl"
>
	<h1 class="px-2 leading-tight font-bold tracking-tighter">Upcoming Practices and Events</h1>
	<Button variant="link" class="text-muted-foreground max-w-fit" href="/schedule"
		>View full schedule</Button
	>

	<section class="grid w-full grid-cols-1 gap-4 px-4 pb-10 text-sm">
		{#if loading}
			<EventCardSkeleton />
		{:else if upcoming == 0}
			<p>No upcoming practices or events.</p>
		{:else}
			{#each events as event}
				{#if event?.date && new Date(event.date) >= new Date()}
					<EventCard {event} />
				{/if}
			{/each}
		{/if}
	</section>
</section>

<section class="bg-secondary mt-20 w-full py-10">
	<div
		class="text-secondary-foreground mx-auto grid max-w-[680px] grid-cols-1 gap-8 px-8 pb-10 lg:max-w-[1080px] lg:grid-cols-2"
	>
		<div class="flex flex-col gap-2 text-pretty">
			<h1 class="text-2xl leading-tight font-bold tracking-tighter lg:text-4xl">
				What is Competitive Programming?
			</h1>
			<p>
				In competitive programming, participants solve algorithmic or mathematical problems by
				writing code. The International Collegiate Programming Contest (ICPC) is an annual
				multi-tiered competitive programming competition among 3,000+ participating universities in
				the world.
			</p>
			<p>
				To improve our algorithmic programming skills and prepare for the ICPC, we hold regular
				practice sessions. Everyone is welcome to participate! Usually these will be held on
				Saturdays and Wednesdays. There may also be tutorial sessions for newcomers. Pizza will be
				served during most of our meetings.
			</p>
			<p>
				Even if you don't make it into the prestigious ICPC World Finals, practicing will do wonders
				for your coding ability, not to mention the ability to ace technical software interviews!
			</p>

			<a class="text-accent-foreground w-fit underline underline-offset-4" href="/about"
				>Learn more
			</a>
		</div>
		<img src="/icpc-live.png" alt="Live at ICPC" />
	</div>
</section>

<section
	class="my-20 flex flex-col items-center space-y-8"
>
	<h1 class="px-2 text-2xl md:text-4xl leading-tight font-bold tracking-tighter text-center">Join Our Community!</h1>
	<div
		class="mx-auto grid max-w-[680px] grid-cols-1 gap-8 px-8 lg:max-w-(--breakpoint-lg) lg:grid-cols-[1fr_0fr_400px]"
	>
		<div class="flex flex-col gap-2 text-pretty">
			<p>
				Whether you're just getting started or already love solving tough problems, the UBC Competitive Programming Club is the perfect place to grow your skills alongside others who share a passion for algorithmic programming. Join our Discord server and Codeforces group to connect with fellow coders, ask questions, and stay updated on all our events.
			</p>
            <div class="flex space-x-2 mt-2 mb-8">
                <Button variant="outline" target="_blank" rel="noreferrer" href={config.links.discord}>
                    <DiscordLogo class="h-4 w-4" />
                    Discord
                </Button>
                <Button variant="outline" target="_blank" rel="noreferrer" href={config.links.codeforces}>
                    <img
                        src="/codeforces.svg"
                        class="h-4 w-4 dark:brightness-0 dark:invert"
                        alt="Codeforces Logo"
                    />
                    Codeforces
                </Button>
            </div>
			<p>
				Additionally, explore our curated <a href="/resources" class="text-accent-foreground w-fit underline underline-offset-4">resources</a> to sharpen your algorithms, data structures, and problem-solving techniques. You can also browse our <a href="achievements" class="text-accent-foreground w-fit underline underline-offset-4">past achievements</a> to see how we have historically performed. One day you might <a href="/team" class="text-accent-foreground w-fit underline underline-offset-4">represent UBC</a> at the ICPC North American Championships or World Finals!
			</p>
		</div>
        <Separator orientation="vertical" />
        <div class="flex flex-col items-center">
            <h2 class="text-3xl leading-tight font-bold tracking-tighter">FAQ</h2>
            <Accordion.Root type="single" class="w-full" value="item-1">
                <Accordion.Item value="item-1">
                    <Accordion.Trigger>Do I need experience to join?</Accordion.Trigger>
                    <Accordion.Content class="flex flex-col gap-4 text-balance">
                        <p>Not at all! We welcome all skill levels.</p>
                    </Accordion.Content>
                </Accordion.Item>
                <Accordion.Item value="item-2">
                    <Accordion.Trigger>How often do you meet?</Accordion.Trigger>
                    <Accordion.Content class="flex flex-col gap-4 text-balance">
                        <p>We usually host meetings every Wednesday and Saturday. Check our <a class="text-accent-foreground w-fit underline underline-offset-4" href="/schedule">schedule</a> for the most up-to-date information.</p>
                    </Accordion.Content>
                </Accordion.Item>
                <Accordion.Item value="item-3">
                    <Accordion.Trigger>Is it free to join?</Accordion.Trigger>
                    <Accordion.Content class="flex flex-col gap-4 text-balance">
                        <p>Yes—joining the club is completely free. Our ICPC teams are also fully funded!</p>
                    </Accordion.Content>
                </Accordion.Item>
                <Accordion.Item value="item-4">
                    <Accordion.Trigger>How can I prepare for competitions?</Accordion.Trigger>
                    <Accordion.Content class="flex flex-col gap-4 text-balance">
                        <p>Check out our resources, attend our sessions, and join in on group practices—we'll help you improve step by step.</p>
                    </Accordion.Content>
                </Accordion.Item>
                <Accordion.Item value="item-5">
                    <Accordion.Trigger>Can I still join mid-year?</Accordion.Trigger>
                    <Accordion.Content class="flex flex-col gap-4 text-balance">
                        <p>Absolutely! It's never too late to start.</p>
                    </Accordion.Content>
                </Accordion.Item>
            </Accordion.Root>
        </div>
	</div>
</section>