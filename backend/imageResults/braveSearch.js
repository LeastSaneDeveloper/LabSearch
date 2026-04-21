import * as inhouseUtils from "../inhouseUtils.js";
import * as cheerio from "cheerio";

export async function scrapeBraveSearchImages(query) {
    await inhouseUtils.randomDelay();
    const html = await inhouseUtils.fetchHtml(`https://search.brave.com/images?q=${encodeURIComponent(query)}`);
    const $ = cheerio.load(html);

    return $("button.image-result").toArray().map(el => {
        const button = $(el);
        const img = button.find("img").first();
        if (!img.length) return null;
        const image = img.attr("src");
        const description = img.attr("alt");
        const index = button.attr("data-index");
        const source = button.find(".image-metadata-source").text().trim();
        return {
            type: "image",
            image,
            description,
            source,
            index
        };
    }).filter(Boolean);
}
