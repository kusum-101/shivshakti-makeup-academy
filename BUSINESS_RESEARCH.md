# Business Details: Shiv Shakti Makeup Studio & Training Center

Last updated: 28 October 2026

## 1. Business information and verification status

| Field | Value | Status |
|---|---|---|
| Name | Shiv Shakti Makeup Studio & Training Center | Verified (Google Maps listing) |
| Google Maps link | https://maps.app.goo.gl/SwcfP8617315HCdg6 | Verified (resolves to the listing above) |
| Coordinates | 28.6272697, 77.3527928 | Verified (Google Maps listing) |
| Address | B-117, Prem Vihar, Khora Colony, Sector 62A, Noida, Uttar Pradesh 201020 | From client brief — **owner must confirm** (see §3, address conflict) |
| Phone | +91 88021 29089 | **Matches the official Instagram bio** ("learn more :8802129089") |
| WhatsApp on that number | — | **Not verified — owner must confirm** |
| Instagram | https://www.instagram.com/shivshakti_makeupsalon_/ | Verified, public profile viewed 28 Oct 2026 |
| Instagram followers | 31.5K | Verified 28 Oct 2026 (shown on site with that date) |
| Google rating / reviews | — | **Not verifiable** — Google Maps pages render only with JavaScript; site links to the listing instead |
| Logo / brand colours | Black badge, gold "SS" monogram with a woman's profile, scissors and brush; rim text "SHIV SHAKTI · BY VAISHALI DIXIT" | **In use on the site** (header, footer, favicon) as `logo-100.jpg`, taken from the Instagram profile picture at the client's request. Only 100×100 px is publicly available — **ask the owner for the original file** |
| Opening hours | — | Not on the site yet; ask owner |
| YouTube | — | Not verified; left `null` in `config.js`, so the section stays hidden |

All of these values live in `public/assets/js/config.js`.

## 2. Instagram branding summary (internal)

Viewed on 28 Oct 2026 without logging in. Only text, alt text and dates were readable. No images were downloaded or reused.

- **Display name:** "Shivshakti makeup salon & Academy" (different from the Google listing name)
- **Bio:** "Academy Makeup & Beauty | PMU / Learn Makeup & Salon Skills / 🎓Certified by Meera Sakrani / 📞learn more :8802129089" (truncated with "… more")
- **Highlights:** Mehndi, Karwa Chauth makeup, client review, 9th batch, Link, Freelancing, PR Packages, Baby, Bridal makeup, Makeup
- **Recent posts:** frequent reels in Oct 2026. Alt text mentions makeup, lipstick, palettes, henna/mehndi, nails and hair. There are also carousels from Sep 2025 and Apr 2026.
- **Positioning:** both a salon/studio and an academy, with the academy side prominent (courses, batches, PMU)

**What the site now treats as verified**

| Area | Shown on site | Source |
|---|---|---|
| Services | Bridal Makeup, Party & Occasion Makeup, Festive / Karwa Chauth Makeup, Mehndi | Highlights "Bridal makeup", "Makeup", "Katwachuthmakeu", "Mehndi" |
| Academy | Makeup Course, Beauty & Salon Skills, PMU (Permanent Makeup) Training; batch-based | Bio + "9th batch" highlight |
| Not claimed | Engagement/reception, hairstyling, photoshoot makeup | Not seen on the profile. The site only invites visitors to *ask* about them |

**Design decision:** the official avatar is a black badge with a gold monogram, so the site uses **brand black and gold** as its identity colours, on an ivory base for readability. Dark bands (Instagram section, footer) carry the black-and-gold look. All colours are CSS variables in `:root`. The header, footer and favicon use the official logo from the Instagram profile picture. It is low resolution (100px), so replace it with the owner's original file.

**Address evidence:** one of the embedded posts (`/p/DXwO9aiE9QV/`) has a caption mentioning "Indirapuram Gyankhand-2". This supports the Instagram account operating in Indirapuram (see §3, item 1).

## 3. Open issues for the owner — please confirm before launch

1. **Address conflict (most important).** The brief and the Google listing give *B-117, Prem Vihar, Khora Colony, Sector 62A, Noida*. The Instagram bio's map link points to *First Floor, Shiv Shakti Makeup Salon and Academy, CS-5, Gyan Khand II, Indirapuram, Ghaziabad 201014*. Is that a second branch, a new location, or a different business? The site currently shows only the Noida address.
2. **Business name.** Use "Shiv Shakti Makeup Studio & Training Center" (Google) or "Shivshakti Makeup Salon & Academy" (Instagram)?
3. Does +91 88021 29089 take WhatsApp messages?
4. **High-resolution logo file** (SVG, or a PNG of at least 512px). The site currently uses the 100px Instagram profile picture. Please confirm the exact colours, and that "by Vaishali Dixit" is the current logo wording.
5. "Certified by Meera Sakrani" — who holds the certification, and may the site display it? It is not shown yet.
6. Course details: names, duration, certificate, fees (only if you want them shown), next batch date.
7. Which Instagram posts should appear on the website? Three recent posts are pre-selected in `config.js` (`instagramPosts`).
8. Permission to use your own photos (bridal work, studio, students in class) in the gallery.
9. Opening hours and preferred domain name.

## 4. Content honesty choices

- A notice bar says the site is a concept preview with stock photos.
- There are no invented testimonials, ratings, student counts, prices, awards or certifications.
- Instagram posts are official embeds of posts chosen in `config.js`. The site does not claim they update automatically.
- The enquiry form composes a WhatsApp message. Nothing is sent until the visitor presses Send in WhatsApp. There is no backend.

## 5. Images

All photos are temporary stock images under the Unsplash License, credited per photographer in `public/credits.html`. They do not show the studio's own clients, students or work.
