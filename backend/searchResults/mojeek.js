import * as inhouseUtils from "../inhouseUtils.js";
import * as cheerio from "cheerio";

export function paginate(query, page = 1) {
    const encodedQuery = encodeURIComponent(query);

    if (page <= 1) {
        return `https://mojeek.com/search?q=${encodedQuery}`;
    }

    const start = (page - 1) * 10 + 1;

    return `https://mojeek.com/search?q=${encodedQuery}&s=${start}`;
}

export function parse(html, page = 1) {
    const $ = cheerio.load(html);
    const results = [];

    $('li[class^="r"]').each((_, el) => {
        const result = $(el);
        const titleAnchor = result.find("h2 a.title").first();
        const link = titleAnchor.attr("href")?.trim();
        const title = titleAnchor.text().trim();
        const description = result.find("p.s").text().trim();

        if (!link || !title) return;

        results.push({
            type: "search",
            link,
            title,
            favicon: inhouseUtils.getFaviconFromWebsite(link),
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
