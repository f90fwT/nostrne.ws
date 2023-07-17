import type { NDKEvent } from "@nostr-dev-kit/ndk";

export function dateFormatter(unixDate: number): string {
    const currentDate = new Date();
    const timestamp = Math.floor(currentDate.getTime() / 1000) - unixDate;

    const intervals = [
        { label: "year", seconds: 31536000 },
        { label: "month", seconds: 2592000 },
        { label: "day", seconds: 86400 },
        { label: "hour", seconds: 3600 },
        { label: "minute", seconds: 60 },
    ];

    for (const interval of intervals) {
        const intervalInSeconds = interval.seconds;
        const numberOfIntervals = Math.floor(timestamp / intervalInSeconds);

        if (numberOfIntervals >= 1) {
            return `${numberOfIntervals} ${interval.label}${numberOfIntervals > 1 ? "s" : ""
                } ago`;
        }
    }

    return "Just now";
}

export function removeDuplicateComments(event: NDKEvent, ind: Number) {
    var underComments = document.querySelectorAll(`[id^="_Comment_${event.id}_"]`);
    underComments.forEach((element) => {
      let underInd = Number(element.id.split(`_Comment_${event.id}_`)[1]);
      if (ind > underInd) {
        element.classList.add("duplicate");
        element.remove();
      }
    });
}

type Post = {
    title: string,
    url?: string,
    text?: string,
}

export function formatPostContent(content: string) {
    try {
        const lines = content.split('\n');
        const titleLine = lines[1];
        const urlLine = lines[2];
        const textLines = lines.slice(3);
      
        const titleMatch = titleLine.match(/title:\s*(.*)/);
        const urlMatch = urlLine.match(/url:\s*(.*)/);
      
        const title = titleMatch ? titleMatch[1] : '';
        const url = urlMatch ? urlMatch[1] : '';
        let text = textLines.join('\n');

        if (text.startsWith("text: ")) text = text.substring(6);
      
        return {
          title: title || content,
          url: url || undefined,
          text: text || undefined,
        };
    } catch (err) {
        return { title: content, url: undefined, text: undefined };
    }
}

export function getDomain(url: string) {
    let formattedUrl = url.replace(/^(https?:\/\/)/, '');
    formattedUrl = formattedUrl.split('/')[0];
    return formattedUrl;
}