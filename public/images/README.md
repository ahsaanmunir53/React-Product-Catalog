Put product photos in this folder.

Then reference them in src/data/products.json like this:

  "image": "/images/your-photo.jpg"

Note the leading slash and that "public" is NOT part of the path —
public/ becomes the site root when the app is built.

Guidelines: roughly 4:3 (e.g. 800x600), under ~200 KB, .jpg or .webp.
If the path is wrong the card falls back to a drawing, so check spelling
first if a photo is not appearing.
