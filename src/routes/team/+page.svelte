<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';

    import MemberCard from './MemberCard.svelte';

    const executives: Member[] = [
        {
            display_name: "Binh Nguyen",
            username: "ngpin04",
            role: "contestant",
            title: "Undergrad Year 2"
        },
        {
            display_name: "Joel Gunawan",
            username: "joelgun14",
            role: "contestant",
            title: "Undergrad Year 2"
        },
        {
            display_name: "Rain Yang",
            username: "ryazimn",
            role: "contestant",
            title: "Undergrad Year 2"
        },
        {
            display_name: "Xingyu Zhou",
            username: "cnjzxy",
            role: "coach",
            title: "PhD Year "
        }
    ];
</script>

<section
	class="mx-auto flex max-w-[980px] flex-col items-center gap-2 p-8 text-center md:py-12 md:pb-8 lg:py-24 lg:pb-20"
>
	<h1 class="text-3xl font-bold leading-tight tracking-tighter md:text-6xl lg:leading-[1.1]">
		UBC ICPC Teams
	</h1>
	<p class="max-w-[750px] text-balance text-lg text-muted-foreground sm:text-xl">
		Past teams representing the University of British Columbia at the ICPC
	</p>
</section>

<section class="max-w-full w-[400px] md:w-(--breakpoint-md) flex flex-col space-y-4 text-2xl md:text-4xl">
    <h1 class="font-bold leading-tight tracking-tighter text-center">
        2024-2025 Team
    </h1>

    <section class="grid grid-cols-1 gap-4 md:grid-cols-2 px-4">
        {#each executives as member}
            <MemberCard {member}/>
        {/each}
    </section>
</section>