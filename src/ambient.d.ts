declare global {
    type memberRole = "executive" | "developer" | "db-maintainer" | "db-volunteer";

    interface Member {
        display_name?: string;
        username: string;
        role: memberRole;
        title?: string;
        avatar: string;
        description?: string;
        href: string;
        sponsor_href?: string;
        inactive?: boolean;
    }

    type EventType = "competition" | "tryout" | "other";
    interface Event {
        id: string;
        title: string;
        description?: string;
        registration?: string;
        link?: string;
        date?: string;
        type?: EventType;
    }
}

export {};