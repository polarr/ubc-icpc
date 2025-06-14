declare global {
    type memberRole = "contestant" | "coach";

    interface Member {
        display_name: string;
        username?: string;
        role: memberRole;
        title?: string;
        avatar?: string;
        description?: string;
        href?: string;
        codeforces?: string;
    }

    type EventType = "competition" | "tryout" | "other";
    interface Event {
        id: string;
        title: string;
        description?: string;
        registration?: string;
        link?: string;
        date: string;
        location?: string;
        type?: EventType;
    }
}

export {};