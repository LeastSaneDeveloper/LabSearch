import * as mojeekSearchResults from "./searchResults/mojeek";
import * as bingImageResults from "./imageResults/bing";
import * as braveSearchImageResults from "./imageResults/braveSearch";


(async () => {
    const query = "test";

    // console.log("=== Mojeek Search ===");
    // const results = await mojeekSearchResults.scrapeMojeek(query, 2);
    // results.forEach(result => console.log(result));

    console.log("=== Brave Search Images ===");
    const results = await braveSearchImageResults.scrapeBraveSearchImages(query);
    results.forEach(result => console.log(result));

    // console.log("\n=== Bing Images ===");
    // const images = await bingImageResults.scrapeBingImages(query);
    // images.forEach(img => console.log(img));
})();
