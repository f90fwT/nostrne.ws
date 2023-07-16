import NDK, { NDKEvent, NDKNip07Signer, type NDKConstructorParams, type NDKFilter } from "@nostr-dev-kit/ndk";

const relays = [
    "wss://relay.damus.io",
    "wss://nos.lol",
    "wss://relay.snort.social",
    "wss://nostr.wine",
    "wss://relay.nostr.band",
    "wss://nostr.bitcoiner.social",
    "wss://eden.nostr.land",
    "wss://nostr.rocks",
]

const constructor: NDKConstructorParams = {
    explicitRelayUrls: relays,
}

export const ndk = new NDK(constructor);

export async function getProfile(hexpubkey: string) {
    let username = ndk.getUser({ hexpubkey });
    await username.fetchProfile();
    return username;
}

export async function getCommentCount(id: string, pubkey: string) {
    const filter: NDKFilter = { kinds: [1,], ["#e"]: [id,], };
    const data: Set<NDKEvent> = await ndk.fetchEvents(filter);
    return data.size;
}

export async function getComments (id: string, pubkey: string) {
    const filter: NDKFilter = { kinds: [1,], ["#e"]: [id,], };
    const data: Set<NDKEvent> = await ndk.fetchEvents(filter);
    return data;
}

export async function getReactions (event: NDKEvent) {
    
}

type Post = {
    title: string,
    url?: string,
    text?: string,
}

export async function newPost (post: Post) {
    try {
        if (ndk.signer === undefined) {
            ndk.signer = new NDKNip07Signer();
        }
        const ndkEvent = new NDKEvent(ndk);
        ndkEvent.kind = 1;
        let content: string = "";
        content += `nostrne.ws post`;
        content += `\ntitle: ${post.title}`;
        if (post.url) content += `\nurl: ${post.url}`;
        if (post.text) content += `\ntext: ${post.text}`;
        ndkEvent.content = content;
        ndkEvent.tags = [["t", "nostrnews"]];
        await ndkEvent.publish();
    } catch (err) {
        return false;
    }
    return true;
}

export async function login () {
    try {
        ndk.signer = new NDKNip07Signer();
    } catch (err) {
        return false;
    }
    return true;
}

export async function addComment (event: NDKEvent, comment: string) {
    try {
        if (ndk.signer === undefined) {
            ndk.signer = new NDKNip07Signer();
        }
        const ndkEvent = new NDKEvent(ndk);
        ndkEvent.kind = 1;
        ndkEvent.content = comment;
        ndkEvent.tags = [["e", event.id], ["p", event.pubkey], ...event.tags];
        await ndkEvent.publish();
    } catch (err) {
        return false;
    }
    return true;
}

export async function upvote (event: NDKEvent) {
    try {
        if (ndk.signer === undefined) {
            ndk.signer = new NDKNip07Signer();
        }
        const ndkEvent = new NDKEvent(ndk);
        ndkEvent.kind = 7;
        ndkEvent.content = "+";
        ndkEvent.tags = [["e", event.id], ["p", event.pubkey]];
        await ndkEvent.publish();
    } catch (err) {
        return false;
    }
    return true;
}
