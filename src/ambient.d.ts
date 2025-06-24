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

    interface Team {
        year: string;
        name: string;
        members: Member[];
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

    interface Result {
        year: string;
        team: string;
        regionalsPlacement?: number;
        regionalsAward?: string;
        nacPlacement?: number | null;
        nacAward?: string | null;
        wfPlacement?: number;
        wfAward?: string;
    }
}

export {};