import * as inhouseUtils from "../inhouseUtils.js";
import * as cheerio from "cheerio";

export function paginate(query, page = 1) {
    const url = new URL("https://bing.com/");
    
    url.searchParams.set("q", query);

    // bing's pagination:
    // page 1 = first=1 (or omitted)
    // page 2 = first=11
    // page 3 = first=21
    if (page > 1) {
        url.searchParams.set("first", ((page - 1) * 10 + 1).toString());
    }

    return url.toString();
}

export async function parse(html, page = 1) {
    await inhouseUtils.randomDelay();
    const $ = cheerio.load(html);
    const results = [];
    // this is a special search result, since for some reason the search result is credited to copilot. parse if exists
    const specialFirst = $(".b_wpt_bl").first();

    if (specialFirst.length) {
        const titleAnchor = specialFirst.find("h2 a").first();
        const title = titleAnchor.text().trim();
        const link = titleAnchor.attr("href");
        let favicon = specialFirst.find(".rms_img img").attr("src") || null;
        const description = specialFirst.find(".b_paractl").text().replace("See more", "").trim();

        if (favicon?.startsWith("//")) {
            favicon = `https:${favicon}`;
        }

        results.push({
            type: "search",
            link,
            title,
            favicon,
            image: null,
            description,
            page,
        });
    }

    // these are for the normal search results
    $(".b_algo").each((_, el) => {
        const result = $(el);
        const titleAnchor = result.find("h2 a").first();
        const title = titleAnchor.text().trim();
        const link = titleAnchor.attr("href");
        let favicon = result.find(".rms_img img").attr("src") || null;
        // thumbnail image (if exists)
        let image = result.find(".b_circleImage img").first().attr("src") || null;
        const description = result.find(".b_caption p").first().text().trim();

        if (favicon?.startsWith("//")) {
            favicon = `https:${favicon}`;
        }

        if (image?.startsWith("//")) {
            image = `https:${image}`;
        }

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
