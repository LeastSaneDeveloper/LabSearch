import * as inhouseUtils from "../inhouseUtils.js";
import * as cheerio from "cheerio";

async function getMojeekSearchPageUrl(query, page = 1) {
    const baseUrl = `https://www.mojeek.com/search?q=${encodeURIComponent(query)}`;
    if (page === 1) return baseUrl;

    const html = await inhouseUtils.fetchHtml(baseUrl);
    const $ = cheerio.load(html);

    const paginationLinks = $(".pagination a")
        .map((_, el) => $(el).attr("href"))
        .get()
        .filter(href => href && href !== "Next");

    if (!paginationLinks[page - 1]) throw new Error("Page not found or blocked");

    return `https://www.mojeek.com${paginationLinks[page - 1]}`;
}

export async function parseMojeekPage(query, page) {
    await inhouseUtils.randomDelay();
    const url = await getMojeekSearchPageUrl(query, page);
    const html = await inhouseUtils.fetchHtml(url);
    const $ = cheerio.load(html);

    const links = $("a.title").toArray();
    const paragraphs = $("p.s").toArray();
    const length = Math.min(links.length, paragraphs.length);

    return await Promise.all(
        Array.from({ length }, async (_, i) => {
            return {
                type: "search",
                link: $(links[i]).attr("href"),
                title: $(links[i]).text().trim(),
                description: $(paragraphs[i]).html()
            };
        })
    );
}

export async function* scrapeMojeek(query, maxPages = 3) {
    for (let i = 1; i <= maxPages; i++) {
        const items = await parseMojeekPage(query, i);
        for (const item of items) yield item;
    }
}
