import * as inhouseUtils from "../inhouseUtils.js";
import * as cheerio from "cheerio";

export function paginate(query, page = 1) {
    const url = new URL("https://search.brave.com/search");
    url.searchParams.set("q", query);

    // brave's pagination:
    // page 1 = no offset param
    // page 2 = offset=1
    // page 3 = offset=2

    if (page > 1) {
        url.searchParams.set("offset", page - 1);
    }

    return url.toString();
}

export async function parse(html, page = 1) {
    await inhouseUtils.randomDelay();
    const $ = cheerio.load(html);
    const results = [];

    $(".result-content").each((_, el) => {
        const container = $(el);
        const anchor = container.find("a.l1").first();
        const link = anchor.attr("href");
        const title = container.find(".title").first().text().trim();
        const favicon = container.find(".favicon").first().attr("src");
        // get thumbnail image if it exists
        const image = container.find(".thumbnail img").first().attr("src") || null;
        const description = container.find(".generic-snippet .content").first().text().replace(/\s+/g, " ").trim();

        results.push({
            type: "search",
            link,
            title,
            favicon,
            image,
            description,
            page,
        });
    });

    return results;
}

export async function scrape(query, page = 1) {
    const url = paginate(query, page);
    const html = await inhouseUtils.fetchHtml(url);

    return parse(html, page);
}
