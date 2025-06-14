<script lang="ts">
	import { cn } from "$lib/utils.js";
	import { Button, type ButtonProps } from "$lib/components/ui/button/index.js";
	import * as Popover from "$lib/components/ui/popover/index.js";
	import type { HTMLAnchorAttributes } from "svelte/elements";
	import * as config from "$lib/siteConfig";

	type MobileLinkProps = HTMLAnchorAttributes & {
		content?: string;
	};

	let { class: className, ...restProps }: ButtonProps = $props();

	let open = $state(false);
</script>

{#snippet MobileLink({ href, content, class: className, ...props }: MobileLinkProps)}
	<a
		{href}
		onclick={() => {
			open = false;
		}}
		class={cn("text-2xl font-medium", className)}
		{...props}
	>
		{content}
	</a>
{/snippet}

<Popover.Root bind:open>
	<Popover.Trigger>
		{#snippet child({ props })}
			<Button
				{...props}
				{...restProps}
				variant="ghost"
				class={cn(
					"extend-touch-target h-8 touch-manipulation items-center justify-start gap-2.5 p-0! hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 active:bg-transparent dark:hover:bg-transparent md:hidden",
					className
				)}
			>
				<div class="relative flex h-8 w-4 items-center justify-center">
					<div class="relative size-4">
						<span
							class={cn(
								"bg-foreground absolute left-0 block h-0.5 w-4 transition-all duration-100",
								open ? "top-[0.4rem] -rotate-45" : "top-1"
							)}
						></span>
						<span
							class={cn(
								"bg-foreground absolute left-0 block h-0.5 w-4 transition-all duration-100",
								open ? "top-[0.4rem] rotate-45" : "top-2.5"
							)}
						></span>
					</div>
					<span class="sr-only">Toggle Menu</span>
				</div>
				<span class="flex h-8 items-center text-md sm:text-lg font-medium leading-none"> {config.site.name} </span>
			</Button>
		{/snippet}
	</Popover.Trigger>
	<Popover.Content
		class="bg-background/90 no-scrollbar h-screen w-screen overflow-y-auto rounded-none border-none p-0 shadow-none backdrop-blur duration-100"
		align="start"
		side="bottom"
		alignOffset={-16}
		sideOffset={14}
		preventScroll
	>
		<div class="flex flex-col gap-12 overflow-auto px-6 py-6">
			<div class="flex flex-col gap-4">
				<div class="text-muted-foreground text-sm font-medium">Menu</div>
				<div class="flex flex-col gap-3">
					{@render MobileLink({ href: "/", content: "Home" })}
					{#each config.nav as item, i (i)}
						{@render MobileLink({ href: item.href, content: item.title })}
					{/each}
				</div>
			</div>
		</div>
	</Popover.Content>
</Popover.Root>

<!--

<script lang="ts">
	import * as Sheet from "$lib/components/ui/sheet/index";
    import { ScrollArea } from "$lib/components/ui/scroll-area/index.js";
	import { Button } from "$lib/components/ui/button/index";
    import { HamburgerMenu } from "svelte-radix";
    
    import * as config from "$lib/siteConfig";

	let open = $state(false);
</script>

<Sheet.Root bind:open>
	<Sheet.Trigger asChild >
		{#snippet children({ builder })}
				<Button
				builders={[builder]}
				variant="ghost"
				class="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
			>
				<HamburgerMenu class="h-5 w-5" />
				<span class="sr-only">Toggle Menu</span>
			</Button>
					{/snippet}
		</Sheet.Trigger>
	<Sheet.Content side="left" class="pr-0">
		<MobileLink href="/" class="flex items-center" bind:open>
            <img src="/vo.png" alt="Virtual Olympiad Logo" class="mr-4 h-4 w-4" />
			<span class="font-bold">Virtual Olympiad</span>
		</MobileLink>
		<ScrollArea orientation="both" class="my-4 h-[calc(100vh-8rem)] pb-10 pl-6">
			<div class="flex flex-col space-y-3">
				{#each config.nav as navItem, index (navItem + index.toString())}
					{#if navItem.href}
						<MobileLink href={navItem.href} bind:open class="text-foreground">
							{navItem.title}
						</MobileLink>
					{/if}
				{/each}
			</div>
		</ScrollArea>
	</Sheet.Content>
</Sheet.Root>

-->