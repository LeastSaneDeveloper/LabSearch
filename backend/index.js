import * as mojeekSearchResults from "./searchResults/mojeek.js";
import * as bingImageResults from "./imageResults/bing.js";
import * as braveSearchImageResults from "./imageResults/braveSearch.js";


(async () => {
    const query = "test";

    console.log("=== Mojeek Search ===");
    const results = await mojeekSearchResults.scrapeMojeek(query);
    results.forEach(result => console.log(result));

    // console.log("=== Brave Search Images ===");
    // const results = await braveSearchImageResults.scrapeBraveSearchImages(query, );
    // results.forEach(result => console.log(result));

    // console.log("\n=== Bing Images ===");
    // const images = await bingImageResults.scrapeBingImages(query);
    // images.forEach(img => console.log(img));
})();
