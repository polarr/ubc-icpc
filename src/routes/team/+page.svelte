<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';

	import MemberCard from './MemberCard.svelte';
	import teams from '$lib/data/teams';
	import * as Card from '$lib/components/ui/card/index.js';
	import { onMount, tick } from 'svelte';

	let currentTeam = teams[0];
</script>

<section
	class="mx-auto flex max-w-[980px] flex-col items-center gap-2 p-8 text-center md:py-12 md:pb-8 lg:py-24 lg:pb-20"
>
	<h1 class="text-3xl leading-tight font-bold tracking-tighter md:text-6xl lg:leading-[1.1]">
		UBC ICPC Teams
	</h1>
	<p class="text-muted-foreground max-w-[750px] text-lg text-balance sm:text-xl">
		Past teams representing the University of British Columbia at the ICPC
	</p>
</section>

<section class="mb-8 flex w-[400px] max-w-full flex-col space-y-8 md:w-(--breakpoint-md)">
	<div class="relative mt-20 mb-30">
		<div
			class="pointer-events-none absolute -top-16 -bottom-16 left-1/2 z-0 w-screen -translate-x-1/2"
		>
			<img
				src="/icpc-large.png"
				alt="ICPC Large Background"
				class="h-full w-full object-cover opacity-70 blur-sm select-none dark:opacity-30"
				style="max-width: none;"
			/>
		</div>
		<div class="relative z-10">
			<Card.Root id={currentTeam.year.slice(-4)} class="bg-card/70 dark:bg-card/80">
				<Card.Header class="p-4 pt-6 pb-0">
					<Card.Title class="text-center">
						{currentTeam.year} Team
					</Card.Title>
					<Card.Description class="text-center">
						{currentTeam.name}
					</Card.Description>
				</Card.Header>
				<Card.Content class="p-4">
					<section class="grid grid-cols-1 gap-4 md:grid-cols-2">
						{#each currentTeam.members as member}
							<MemberCard {member} />
						{/each}
					</section>
				</Card.Content>
			</Card.Root>
		</div>
	</div>

	{#each teams.slice(1) as team}
		<Card.Root id={team.year.slice(-4)}>
			<Card.Header class="p-4 pt-6 pb-0">
				<Card.Title class="text-center">
					{team.year} Team
				</Card.Title>
				<Card.Description class="text-center">
					{team.name}
				</Card.Description>
			</Card.Header>
			<Card.Content class="p-4">
				<section class="grid grid-cols-1 gap-4 md:grid-cols-2">
					{#each team.members as member}
						<MemberCard {member} />
					{/each}
				</section>
			</Card.Content>
		</Card.Root>
	{/each}
</section>
