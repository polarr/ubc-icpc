<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';

    import MemberCard from './MemberCard.svelte';

    const executives: Member[] = [
        {
            display_name: "Binh",
            username: "polarity",
            role: "executive",
            title: "Founder and Lead Developer",
            description: "Charles is an undergraduate student at the University of British Columbia.",
            avatar: "",
            href: "https://polarity.sh",
            sponsor_href: "https://github.com/sponsors/polarr"
        },
        {
            display_name: "Joel",
            username: "polarity",
            role: "executive",
            title: "Founder and Lead Developer",
            description: "Charles is an undergraduate student at the University of British Columbia.",
            avatar: "",
            href: "https://polarity.sh",
            sponsor_href: "https://github.com/sponsors/polarr"
        },
        {
            display_name: "Rain",
            username: "polarity",
            role: "executive",
            title: "Founder and Lead Developer",
            description: "Charles is an undergraduate student at the University of British Columbia.",
            avatar: "",
            href: "https://polarity.sh",
            sponsor_href: "https://github.com/sponsors/polarr"
        }
    ];
</script>

<section
	class="mx-auto flex max-w-[980px] flex-col items-center gap-2 py-8 text-center md:py-12 md:pb-8 lg:py-24 lg:pb-20"
>
	<h1 class="text-3xl font-bold leading-tight tracking-tighter md:text-6xl lg:leading-[1.1]">
		UBC ICPC Teams
	</h1>
	<p class="max-w-[750px] text-balance text-lg text-muted-foreground sm:text-xl">
		Past teams representing the University of British Columbia at the ICPC
	</p>
</section>

<section class="max-w-(--breakpoint-xl) flex flex-col space-y-4 text-2xl sm:text-4xl">
    <h1 class="font-bold leading-tight tracking-tighter text-center">
        2024-2025 Team
    </h1>

    <section class="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3 px-4">
        {#each executives as member}
            <MemberCard {member}/>
        {/each}
    </section>
</section>