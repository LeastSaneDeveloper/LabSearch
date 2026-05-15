import * as mojeekSearchResults from "./searchResults/mojeek.js";
import * as bingSearchResults from "./searchResults/bing.js";
import * as braveSearchResults from "./searchResults/braveSearch.js";

import * as braveSearchImageResults from "./imageResults/braveSearch.js";
import * as bingImageResults from "./imageResults/bing.js";


(async () => {
    const query = "test";

    // console.log("=== Mojeek Search ===");
    // let mojeekSearchResultsList = await mojeekSearchResults.scrape(query, 2);
    // console.log(mojeekSearchResultsList);

    // console.log("=== Bing Search ===");
    // let bingSearchResultsList = await bingSearchResults.scrape(query);
    // console.log(bingSearchResultsList);

    // console.log("=== Brave Search ===");
    // let braveSearchResultsList = await braveSearchResults.scrape(query);
    // console.log(braveSearchResultsList);
    

    // console.log("=== Brave Search Images ===");
    // let braveImageResultsList = await braveSearchImageResults.scrape(query, );
    // console.log(braveImageResultsList)

    // console.log("\n=== Bing Images ===");
    // const bingImageResultsList = await bingImageResults.scrape(query);
    // console.log(bingImageResultsList)
})();
