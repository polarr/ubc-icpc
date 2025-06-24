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
	import { Content } from '$lib/components/ui/drawer';

    interface Props {
        member: Member;
    }

    let { member }: Props = $props();

    let { display_name, username, role, title, description, avatar, href, codeforces } = member;

    const roleTitle = (role: memberRole) => {
        switch(role){
            case 'coach':
                return "Team Coach";
            default: 
            case 'contestant':
                return "Contestant";
        }
    };
</script>

<Card.Root class={"flex flex-col shrink justify-between shadow-none"}>
    <Card.Header>
        <div class={"flex items-center gap-4"}>
            <Avatar.Root class={"flex h-9 w-9"}>
                <Avatar.Image src={avatar} alt="Avatar" />
                <Avatar.Fallback class="text-lg">{(display_name?.[0] ?? username?.[0]).toUpperCase()}</Avatar.Fallback>
            </Avatar.Root>
            <div>
                <Card.Title>
                    {#if username}
                        {display_name} <span class="text-muted-foreground text-sm">({username})</span>
                    {:else}
                        {display_name}
                    {/if}
                </Card.Title>
                <Card.Description>
                    {title ?? 'UBC Student'} · {roleTitle(role)}
                </Card.Description>
            </div>
        </div>
    </Card.Header>
    <Card.Content>
        <p class="text-sm">
            {description ?? ""}
        </p>
    </Card.Content>
    <Card.Footer class="flex">
        <Button variant="secondary" href={codeforces}>
            <img src="/codeforces.svg" class="h-4 w-4 dark:invert dark:brightness-0" alt="Codeforces Logo">
        </Button>
        <Button href={href} class="ml-auto">Learn More</Button>
    </Card.Footer>
</Card.Root>