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
	import { ScrollArea } from '$lib/components/ui/scroll-area/index.js';
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
		ChevronsUpDown
	} from '@lucide/svelte';
	import * as config from '$lib/siteConfig';

	import katex from 'katex';
	import * as Table from '$lib/components/ui/table/index.js';
	import results from '$lib/data/results';

	const parseResult = (result: number | null | undefined) => {
		if (result === null) return 'N/A';
		if (!result) return '-';
		// Convert number to ordinal string
		const n = Number(result);
		const mod10 = n % 10,
			mod100 = n % 100;
		let suffix = 'th';
		if (mod10 === 1 && mod100 !== 11) suffix = 'st';
		else if (mod10 === 2 && mod100 !== 12) suffix = 'nd';
		else if (mod10 === 3 && mod100 !== 13) suffix = 'rd';
		return `${n}${suffix}`;
	};
</script>

<section
	class="mx-auto flex w-full flex-col items-center gap-2 py-8 text-center md:py-12 lg:py-20">
	<h1
		class="text-3xl leading-tight font-bold tracking-tighter md:text-4xl lg:text-5xl lg:leading-[1.1]">
		History
	</h1>
	<div class="w-full flex flex-col items-center relative mt-20 mb-30">
		<div
			class="pointer-events-none absolute -top-16 -bottom-16 left-1/2 z-0 w-full -translate-x-1/2 overflow-hidden">
			<img
				src="/plaques.png"
				alt="ICPC Large Background"
				class="h-full w-full object-cover opacity-70 blur-[3px] select-none dark:opacity-50"
				style="max-width: none;" />
		</div>
		<div class="relative z-10">
			<h2 class="text-3xl leading-tight font-bold tracking-tighter lg:leading-[1.1] mb-10">
				Best Placements
			</h2>
			<div class = "grid grid-cols-1 sm:grid-cols-3 gap-4 p-4">
				<img src="/plaque-regionals.svg" alt="Best Regionals Placement" class="w-[200px]" />
				<img src="/plaque-nac.svg" alt="Best NA Championship Placement" class="w-[200px]" />
				<img src="/plaque-wf.svg" alt="Best World Finals Placement" class="w-[200px]" />
			</div>
		</div>
	</div>
	<ScrollArea
		class="mt-10 h-max max-h-full w-max max-w-full rounded-md border p-4"
		orientation="both">
		<Table.Root class="w-full text-left">
			<Table.Header>
				<Table.Row>
					<Table.Head>Year</Table.Head>
					<Table.Head>Regionals</Table.Head>
					<Table.Head>NA Championship</Table.Head>
					<Table.Head class="text-right">World Finals</Table.Head>
				</Table.Row>
			</Table.Header>
			<Table.Body>
				{#each results as { year, team, regionalsPlacement, nacPlacement, wfPlacement }}
					<Table.Row>
						<Table.Cell>
							<a
								class="font-medium underline underline-offset-4"
								href={'/team#' + year.slice(-4)}
								data-sveltekit-reload>
								{year}
							</a>
							<br />
							<span>
								{team}
							</span>
						</Table.Cell>
						<Table.Cell class="text-center">{parseResult(regionalsPlacement)}</Table.Cell>
						<Table.Cell class="text-center">{parseResult(nacPlacement)}</Table.Cell>
						<Table.Cell class="text-center">{parseResult(wfPlacement)}</Table.Cell>
					</Table.Row>
				{/each}
			</Table.Body>
		</Table.Root>
	</ScrollArea>
</section>
