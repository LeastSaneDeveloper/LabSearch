# Guidelines

Each script should have 3 main functions: paginate(), parse(), scrape().

In general, results (not to be confused with search results) should have these attributes in common:

{
    "type": ..., # search, image, maps, news, shopping, video
    "link": ...,
    "title": ...,
    "description": ...,
}

Search results should return:

{
    "type": "search",
    "link": ...,
    "title": ...,
    "favicon": ...,
    "image": ...,
    "description": ...,
    "page": ...,
}

Image results should return:

{
    "type": "image"
    "image": ..., # url of the actual image
    "url": ..., # url of where the image popped up (optional)
    "title": ...,
    "favicon": ...,
    "description": ...,
    "index": ...,
}

Maps results should return:

{
    "type": "maps",
    "link": ...,
}

News results should return:

{
    "type": "news",
    "link": ...,
    "title": ...,
    "favicon": ...,
    "image": ...,
    "description": ...,
    "age": ...,
}

Shopping results should return:

WIP

Video results should return:

{
    "type": "video",
    "link": ...,
    "title": ...,
    "favicon": ...,
    "image": ...,
    "description": ...,
    "age": ...,
    "source_website": ...,
}
