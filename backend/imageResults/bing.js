import * as inhouseUtils from "../inhouseUtils";
import * as cheerio from "cheerio";

async function scrapeBingImages(query) {
    await inhouseUtils.randomDelay();
    const html = await inhouseUtils.fetchHtml(`https://www.bing.com/images/search?q=${encodeURIComponent(query)}`);
    const $ = cheerio.load(html);

    return $("a.iusc").toArray().map(element => {
        const m = $(element).attr("m");
        if (!m) return null;
        const metadata = JSON.parse(m);
        return {
            type: "image",
            image: metadata.murl,
            url: metadata.purl,
            description: metadata.t
        };
    }).filter(Boolean);
}