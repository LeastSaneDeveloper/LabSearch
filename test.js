import fetch from 'node-fetch';
import * as cheerio from 'cheerio';

async function scrapeBing(query) {
  const res = await fetch(
    `https://www.bing.com/images/search?q=${encodeURIComponent(query)}`,
    { headers: { 'User-Agent': 'Mozilla/5.0' } }
  );
  const html = await res.text();
  const $ = cheerio.load(html);

  const items = [];
  $('a.iusc').each((_, el) => {
    const m = $(el).attr('m');
    if (!m) return;
    const meta = JSON.parse(m);
    items.push({
      image: meta.murl,
      url: meta.purl,
      description: meta.t
    });
  });

  return items;
}

scrapeBing('mountains').then(console.log);
