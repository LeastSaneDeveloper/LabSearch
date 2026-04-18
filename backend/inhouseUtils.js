import { getRandom as getRandomUserAgent } from "random-useragent";
import { fetch } from "node-fetch";


function getRandomHeaders() {
    // TODO: Might need to randomize/add more headers to this
    return {
        "User-Agent": getRandomUserAgent(),
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.5",
        "Connection": "keep-alive",
        "Referer": "https://www.google.com/",
        "Upgrade-Insecure-Requests": "1",
        "Sec-Fetch-Dest": "document",
        "Sec-Fetch-Mode": "navigate",
        "Sec-Fetch-Site": "same-origin",
        "Sec-Fetch-User": "?1",
    };
}

function randomDelay(min = 60, max = 100) {
    return new Promise(resolve => setTimeout(resolve, Math.random() * (max - min) + min));
}

async function fetchHtml(url, retries = 3) {
    for (let i = 0; i < retries; i++) {
        try {
            const res = await fetch(url, { headers: getRandomHeaders() });
            if (res.status === 403 || res.status === 429) {
                await randomDelay(1000, 3000);
                continue;
            }
            return await res.text();
        } catch {
            await randomDelay(500, 1500);
        }
    }
    throw new Error(`Failed to fetch ${url}`);
}