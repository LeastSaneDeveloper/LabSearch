import * as mojeekSearchResults from "./searchResults/mojeek.js";
import * as bingImageResults from "./imageResults/bing.js";
import * as braveSearchImageResults from "./imageResults/braveSearch.js";


(async () => {
    const query = "test";

    console.log("=== Mojeek Search ===");
    let mojeekSearchResultsList = await mojeekSearchResults.scrape(query, 2);
    console.log(mojeekSearchResultsList);

    console.log("=== Brave Search Images ===");
    let braveImageResultsList = await braveSearchImageResults.scrapeBraveSearchImages(query, );
    console.log(braveImageResultsList)

    console.log("\n=== Bing Images ===");
    const bingImageResultsList = await bingImageResults.scrapeBingImages(query);
    console.log(bingImageResultsList)
})();
