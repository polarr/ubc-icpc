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
                <img src="/logo.svg" alt="Logo" class="h-7 w-7 hidden sm:block" />
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