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
		ChevronsUpDown
	} from '@lucide/svelte';
	import * as config from '$lib/siteConfig';

	import katex from 'katex';
</script>

<section class="mx-auto flex max-w-[980px] flex-col items-center gap-2 py-8 text-center md:py-12">
	<h1 class="text-3xl leading-tight font-bold tracking-tighter md:text-4xl lg:leading-[1.1]">
		Enjoy solving tough problems?<br />
		Want to sharpen your coding skills?
	</h1>
</section>

<section class="grid max-w-(--breakpoint-lg) grid-cols-1 gap-4 px-4 pb-10">
	<Card.Root class="flex w-full flex-col justify-between">
		<Card.Header>
			<Card.Title>History</Card.Title>
		</Card.Header>
		<Card.Content class="space-y-2 tracking-tight">
			<p>
				Every year, the <a
					class="underline underline-offset-4"
					href="https://en.wikipedia.org/wiki/International_Collegiate_Programming_Contest"
					>International Collegiate Programming Competition</a
				> (ICPC) draws students from over 3,000 universities around the world to compete in solving tough
				algorithmic problems. Over the past decade, the ICPC Pacific Northwest regional competition has
				been dominated by UBC, Berkeley, and Stanford. Most years, one of our teams advances to the North
				American Championships and/or World Finals: an unforgettable week abroad with chances to meet
				the world's top collegiate programmers!
			</p>
			<p>
				We are a group of students and alumni from various disciplines who practice algorithmic
				programming, with the main goal of competing in the ICPC. We also welcome students who wish
				to simply improve their problem solving, algorithm design and coding skills and collaborate
				with like-minded people. Contests are hard, but we stand to learn a great deal by
				challenging ourselves!
			</p>
			<p>
				Even if you don't make it into the prestigious World Finals, practicing will do wonders for
				your coding ability, not to mention the ability to ace technical software interviews! Past
				UBC contestants have landed internships and full-time jobs at companies including and not
				limited to Google, Microsoft, Facebook, and Amazon. The abstract problem solving aspect of
				these contests can also serve as a stepping stone towards full-fledged computer science
				research: past contestants have gone on to complete PhDs at places like Stanford, MIT, and
				CMU.
			</p>
			<p>What are you waiting for? Join the club!</p>
		</Card.Content>
		<Card.Footer class="flex gap-2">
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
		</Card.Footer>
	</Card.Root>
	<Card.Root class="flex w-full flex-col justify-between">
		<Card.Header>
			<Card.Title>How It Works</Card.Title>
		</Card.Header>
		<Card.Content class="space-y-2 tracking-tight">
			<p>
				The ICPC is a competition between teams. Each team consists of three contestants. The teams
				are presented with a set of problems. The objective is to solve as many of the problems as
				possible, under a strict time limit. For each team a score will be determined, based on how
				quickly problems are solved and how many attempts it took to solve a problem. The team with
				the best score at the end of the time limit wins the competition.
			</p>
			<p>
				The Pacific Northwest regional competition is held in mid-November. We send six of our teams
				(18 people) to this competition to compete with teams from SFU, Washington, Stanford,
				Berkeley and more. Winning teams from the regional will advance to the North America
				Championships, and the winners there win a trip to the World Finals, to represent UBC and
				Canada on the competitive programming stage.
			</p>
		</Card.Content>
	</Card.Root>
	<Card.Root id="what-we-do" class="flex w-full flex-col justify-between">
		<Card.Header>
			<Card.Title>What We Do</Card.Title>
		</Card.Header>
		<Card.Content class="space-y-2 tracking-tight">
			<p>
				We hold regular practice sessions, in which everyone is again welcome to participate.
				Usually these will be held on Saturdays and Wednesdays. Pizza will be served during most of
				our meetings.
			</p>
			<p>We'll also be offering an undergraduate course, CPSC 490, on advanced DSA topics.</p>
			<p>
				Around the beginning of the academic year we hold two tryout contests to select the ICPC teams. Everyone is welcome to
				participate, the more the merrier.
			</p>
			<p>
				<b>IMPORTANT</b>: Please note that certain requirements must be fulfilled in order for you
				to be eligible to participate in official competitions. Visit the
				<a href="https://icpc.global/regionals/rules" class="underline underline-offset-4"
					>official rules</a
				> (be sure you're reading the current ones) and see the Eligibility Decision Tree.
			</p>
			<p>Those interested in competing officially must also:</p>
			<ul class="ml-4 list-inside list-disc">
				<li>Regularly attend practice sessions</li>
				<li>
					Commit to attending the regionals in mid-November, and possibly the North America
					Championship in the Spring and the World Finals in the Summer/Fall
				</li>
				<li>Enjoy solving problems of algorithmic or mathematical nature</li>
				<li>Learn to solve problems under time pressure</li>
			</ul>
		</Card.Content>
	</Card.Root>
</section>
