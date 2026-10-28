# Shiv Shakti Makeup Studio & Training Center — Demo Website

Single-page demo site for Shiv Shakti Makeup Studio & Training Center, Sector 62A, Noida. It is plain HTML, CSS and JS, with no framework and no build step. Everything that gets deployed lives in `public/`.

See [`BUSINESS_RESEARCH.md`](BUSINESS_RESEARCH.md) for verified business details, what still needs owner confirmation, and image sources.

## Files

```
public/index.html          page markup, SEO meta
public/credits.html        Unsplash image credits
public/404.html            not-found page
public/assets/js/config.js business details: phone, WhatsApp, address, map, Instagram, messages
public/assets/js/main.js   builds links, Instagram embeds and structured data from config;
                           menu, scroll effects, lightbox, WhatsApp enquiry form
public/assets/css/styles.css all styles (black & gold brand colours are CSS variables in :root)
public/assets/img/         optimised WebP images, 600px and 1200px (temporary stock)
public/favicon.svg         placeholder monogram
scripts/check-site.mjs     pre-deploy checks (no dependencies)
netlify.toml               Netlify config
```

## Run locally

```bash
npm start          # serves public/ on http://localhost:3000
npm test           # config, asset, link, SEO and WhatsApp checks
```

## Common edits

- **Phone / WhatsApp / address / messages:** edit `public/assets/js/config.js`. Every phone link, WhatsApp button, map link and the structured data are generated from it.
- **Instagram:** `instagram`, `instagramHandle`, `instagramFollowers` and `instagramFollowersAsOf` in `config.js`. Update the follower figure and its date together, or set it to `null` to hide it.
- **Featured Instagram posts:** list post or reel URLs in `instagramPosts`. They are shown with Instagram's official embed, loaded only when the visitor scrolls near the section. This is a hand-picked list, not a live feed.
- **YouTube:** set `youtube` in `config.js` to a verified URL. The videos section stays hidden while it is `null`.
- **Enquiry form:** has no backend. It builds a WhatsApp message from the fields and opens WhatsApp, and the visitor presses Send. To collect submissions by email instead, add Netlify Forms, and update the form's help text to match.
- **Services and courses:** edit the cards in `public/index.html` (and the matching options in the enquiry form `<select>` and `makesOffer` in `main.js`). Only services and courses seen on the official Instagram are listed. See `BUSINESS_RESEARCH.md`.
- **Photos:** replace files in `public/assets/img/` (same names, both sizes), then update `credits.html` and remove the demo notice bar at the top of `index.html`.
- **Logo:** the "SS" monogram is a stand-in. Replace the `.brand-mark` in `index.html` and `favicon.svg` with the owner's logo file.

## Deploy to Netlify

1. Connect this folder in Netlify (or drag and drop it).
2. Netlify reads `netlify.toml`: publishes `public/` and runs `npm test` first, so a failed check blocks the deploy.
3. Add a custom domain, then add the website link to the Google Business listing.
4. Once the domain is known, make `og:image` absolute and add `og:url` / canonical tags (see the comment in `index.html` head).
