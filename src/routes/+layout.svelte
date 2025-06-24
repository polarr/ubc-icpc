<script lang="ts">
	import '../app.css';
	import { ModeWatcher, toggleMode } from 'mode-watcher';
	import { page } from '$app/stores';
	import { cn } from '$lib/utils';

	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
	import * as Avatar from '$lib/components/ui/avatar/index.js';
	import * as Sheet from '$lib/components/ui/sheet';

	import MobileNav from '$lib/components/mobileNav.svelte';

	import { GithubLogo, Sun, Moon } from 'svelte-radix';

	import { Button } from '$lib/components/ui/button/index.js';

	import * as config from '$lib/siteConfig';
	import { onMount, tick } from 'svelte';
	import { afterNavigate, disableScrollHandling } from '$app/navigation';

	let open = false;

	async function scrollToHash() {
        let hash = window.location.hash?.slice(1);
		if (!hash) return;
        console.log(hash);
		const target = document.getElementById(hash);
		if (target) {
			target.scrollIntoView({ behavior: 'smooth', block: 'center' });
			return;
		}

		// Observe DOM until the target appears
		const observer = new MutationObserver(() => {
			const el = document.getElementById(hash);
			if (el) {
				el.scrollIntoView({ behavior: 'smooth', block: 'center' });
				observer.disconnect();
			}
		});

		observer.observe(document.body, {
			childList: true,
			subtree: true
		});
	}

	onMount(async () => {
        await tick(); // Ensure DOM is updated before scrolling

		// Handle initial page load
		scrollToHash();

		// Handle user manually editing hash or clicking same-page links
		window.addEventListener('hashchange', () => {
			scrollToHash();
		});
	});

	// Handle internal navigation (route changes)
	afterNavigate(async () => {
        await tick(); // Ensure DOM is updated before scrolling
		scrollToHash();
	});
</script>

<svelte:head>
	<title>{config.site.name}</title>
	<meta property="keywords" content={config.site.keywords} />
	<meta property="description" content={config.site.description} />
	<meta property="author" content="polarity" />
	<meta property="og:site_name" content={config.site.name} />
	<meta property="og:title" content={config.site.name} />
	<meta property="og:url" content={config.site.url} />
	<meta property="og:description" content={config.site.description} />
	<meta property="og:image" content={config.site.ogImage} />
	<meta property="og:type" content="website" />
</svelte:head>

<ModeWatcher defaultMode={'light'} />
<header
	class="border-border/40 bg-background/95 supports-backdrop-filter:bg-background/60 sticky top-0 z-50 w-full border-b backdrop-blur">
	<div class="container flex h-14 max-w-(--breakpoint-2xl) items-center">
		<div class="mr-4 hidden md:flex">
			<a href="/" class="mr-6 flex items-center space-x-2">
				<img src="/logo.svg" alt="Logo" class="h-7 w-7" />
				<span class="ml-1 hidden font-bold tracking-tight text-balance select-none sm:inline-block">
					{config.site.name}
				</span>
			</a>
			<nav class="flex items-center gap-6 text-sm">
				{#each config.nav as { title, href }}
					<a
						{href}
						class={cn(
							'hover:text-foreground/80 transition-colors',
							$page.url.pathname === href ? 'text-foreground' : 'text-foreground/60'
						)}>
						{title}
					</a>
				{/each}
			</nav>
		</div>

		<MobileNav />
		<div class="ml-auto flex items-center">
			<Button onclick={toggleMode} variant="ghost" size="sm">
				<Sun class="h-4 w-4 scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
				<Moon
					class="absolute h-4 w-4 scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
				<span class="sr-only">Toggle theme</span>
			</Button>
			<!--
			<DropdownMenu.Root>
				<DropdownMenu.Trigger asChild let:builder>
					<Button variant="ghost" builders={[builder]} class="relative h-8 w-8 rounded-full">
						<Avatar.Root class="h-8 w-8">
							<Avatar.Image src="/avatars/01.png" alt="@shadcn" />
							<Avatar.Fallback>SC</Avatar.Fallback>
						</Avatar.Root>
					</Button>
				</DropdownMenu.Trigger>
				<DropdownMenu.Content class="w-56" align="end">
					<DropdownMenu.Label class="font-normal">
						<div class="flex flex-col space-y-1">
							<p class="text-sm font-medium leading-none">shadcn</p>
							<p class="text-xs leading-none text-muted-foreground">m@example.com</p>
						</div>
					</DropdownMenu.Label>
					<DropdownMenu.Separator />
					<DropdownMenu.Group>
						<DropdownMenu.Item>
							Profile
							<DropdownMenu.Shortcut>⇧⌘P</DropdownMenu.Shortcut>
						</DropdownMenu.Item>
						<DropdownMenu.Item>
							Billing
							<DropdownMenu.Shortcut>⌘B</DropdownMenu.Shortcut>
						</DropdownMenu.Item>
						<DropdownMenu.Item>
							Settings
							<DropdownMenu.Shortcut>⌘S</DropdownMenu.Shortcut>
						</DropdownMenu.Item>
						<DropdownMenu.Item>New Team</DropdownMenu.Item>
					</DropdownMenu.Group>
					<DropdownMenu.Separator />
					<DropdownMenu.Item>
						Log out
						<DropdownMenu.Shortcut>⇧⌘Q</DropdownMenu.Shortcut>
					</DropdownMenu.Item>
				</DropdownMenu.Content>
			</DropdownMenu.Root>
		-->
		</div>
	</div>
</header>

<main class="flex flex-col items-center" style="min-height: calc(100dvh - 3.5rem)">
	<slot />
</main>

<footer class="py-6 md:px-8 md:py-0">
	<div class="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
		<div class="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
			<p class="text-muted-foreground text-center text-sm leading-loose md:text-left">
				Built with &#9829; by
				<a
					href={config.links.polarity}
					target="_blank"
					rel="noreferrer"
					class="font-medium underline underline-offset-4">
					Charles Ran
				</a>
				. The source code is available on
				<a
					href={config.links.github}
					target="_blank"
					rel="noreferrer"
					class="font-medium underline underline-offset-4">
					GitHub
				</a>
				.
			</p>
		</div>
		<p class="text-muted-foreground text-center text-sm leading-loose md:text-right">
			&#169; 1996-present {config.site.name}
		</p>
	</div>
</footer>

<style></style>
