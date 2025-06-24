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
		ChevronsUpDown
	} from '@lucide/svelte';
	import * as config from '$lib/siteConfig';

	import katex from 'katex';
	import * as Table from '$lib/components/ui/table/index.js';

	const tutorials = [
		{
			title: 'USACO Guide',
			description: 'A comprehensive guide for all levels of the USA Computing Olympiad (USACO) with tutorials, practice problems, and resources.',
			url: 'https://usaco.guide/'
		},
		{
			title: 'OI Wiki',
			description: 'A Chinese wiki for competitive programming, covering a wide range of topics and algorithms with explanations and examples.',
			url: 'https://oi-wiki.org/'
		},
		{
			title: 'CP Algorithms',
			description: 'A collection of algorithms and data structures with explanations, examples, and practice problems.',
			url: 'https://cp-algorithms.com/'
		}
	];

	const practices = [
		{
			title: 'Codeforces',
			description: 'The largest competitive programming platform with a large collection of problems and contests.',
			url: 'https://codeforces.com/'
		},
		{
			title: 'AtCoder',
			description: 'A Japanese competitive programming platform that hosts regular contests and has a vast problem archive.',
			url: 'https://atcoder.jp/'
		},
		{
			title: 'CSES Problem Set',
			description: 'A collection of educational competitive programming problems.',
			url: 'https://cses.fi/problemset/'
		},
		{
			title: 'Kattis',
			description: 'An online judge with many past ICPC problems.',
			url: 'https://open.kattis.com/'
		},
		{
			title: 'OI Checklist',
			description: 'A collection of past problems from high school informatics olympiads.',
			url: 'https://usaco.guide/general/olympiads/'
		},
		{
			title: 'Project Euler',
			description: 'A collection of challenging competitive programming problems that are mathematical in nature.',
			url: 'https://projecteuler.net/'
		}
	];

	const others = [
		{
			title: 'ICPC Official Website',
			description: 'The official website of the International Collegiate Programming Contest.',
			url: 'https://icpc.global/'
		},
		{
			title: 'CLIST',
			description: 'A platform that aggregates competitive programming contests and problems from various online judges.',
			url: 'https://clist.by/'
		},
		{
			title: 'LeetCode',
			description: 'Contains common coding interview problems.',
			url: 'https://leetcode.com/'
		},
	];
</script>

<section
	class="mx-auto flex w-max max-w-full flex-col items-center gap-2 py-8 text-center md:py-12 lg:py-20"
>
	<h1
		class="text-3xl leading-tight font-bold tracking-tighter md:text-4xl lg:text-5xl lg:leading-[1.1]"
	>
		Resources
	</h1>

	<Table.Root class="w-full mt-10 text-left">
		<Table.Caption>Some key resources curated by club members.</Table.Caption>
		<Table.Body>
			<Table.Row class="bg-muted hover:bg-initial">
				<Table.Cell colspan={2}>Tutorials</Table.Cell>
			</Table.Row>
			{#each tutorials as resource}
				<Table.Row>
					<Table.Cell class="font-medium underline underline-offset-4">
						<a href={resource.url}>{resource.title}</a></Table.Cell>
					<Table.Cell>{resource.description}</Table.Cell>
				</Table.Row>
			{/each}
			<Table.Row class="bg-muted hover:bg-initial">
				<Table.Cell colspan={2}>Problemsets</Table.Cell>
			</Table.Row>
			{#each practices as resource}
				<Table.Row>
					<Table.Cell class="font-medium underline underline-offset-4">
						<a href={resource.url}>{resource.title}</a></Table.Cell>
					<Table.Cell>{resource.description}</Table.Cell>
				</Table.Row>
			{/each}
			<Table.Row class="bg-muted hover:bg-initial">
				<Table.Cell colspan={2}>Other Resources</Table.Cell>
			</Table.Row>
			{#each others as resource}
				<Table.Row>
					<Table.Cell class="font-medium underline underline-offset-4">
						<a href={resource.url}>{resource.title}</a></Table.Cell>
					<Table.Cell>{resource.description}</Table.Cell>
				</Table.Row>
			{/each}
		</Table.Body>
		<Table.Footer>
			<Table.Row>
			</Table.Row>
		</Table.Footer>
	</Table.Root>
</section>
