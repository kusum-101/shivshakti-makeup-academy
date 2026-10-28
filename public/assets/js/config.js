/*
 * SITE CONFIGURATION — the single place to edit business contact details.
 *
 * Every phone link, WhatsApp button, map link, Instagram link and the
 * structured data on the page is generated from this object by main.js.
 * Change a value here and it updates everywhere.
 *
 * Verification status (see BUSINESS_RESEARCH.md):
 *   - name, mapsUrl, geo ........ verified from the Google Maps listing
 *   - phone ..................... matches the official Instagram bio (28 Oct 2026)
 *   - address ................... from the client brief — OWNER MUST CONFIRM
 *                                 (Instagram's map link points to Indirapuram, Ghaziabad)
 *   - WhatsApp on this number ... NOT verified — OWNER MUST CONFIRM
 *   - instagram ................. verified public profile (28 Oct 2026)
 *   - youtube ................... not verified — left null (section stays hidden)
 */
window.SITE_CONFIG = {
  name: "Shiv Shakti Makeup Studio & Training Center",
  shortName: "Shiv Shakti",

  // Digits only, with country code, no "+", spaces or dashes (wa.me format).
  whatsappNumber: "918802129089",
  // Human-readable form for display and tel: links.
  phoneDisplay: "+91 88021 29089",
  phoneTel: "+918802129089",

  address: {
    line1: "B-117, Prem Vihar, Khora Colony",
    line2: "Sector 62A, Noida",
    region: "Uttar Pradesh",
    postalCode: "201020",
    country: "IN",
  },

  geo: { lat: 28.6272697, lng: 77.3527928 },
  mapsUrl: "https://maps.app.goo.gl/SwcfP8617315HCdg6",

  instagram: "https://www.instagram.com/shivshakti_makeupsalon_/",
  instagramHandle: "@shivshakti_makeupsalon_",
  // Follower count as read from the public profile. Update both values together,
  // or set instagramFollowers to null to hide the figure.
  instagramFollowers: "31.5K",
  instagramFollowersAsOf: "Oct 2026",
  // Posts shown as official Instagram embeds in the Instagram section.
  // Chosen by hand — this is NOT a live feed. Ask the owner which posts to feature.
  instagramPosts: [
    "https://www.instagram.com/reel/De33-eWCgMd/",
    "https://www.instagram.com/reel/De1PuNnC0re/",
    "https://www.instagram.com/p/DXwO9aiE9QV/",
  ],

  // Set to a verified URL to show the "Watch Our Videos" section.
  youtube: null,

  // Pre-filled WhatsApp messages. The visitor still presses Send themselves.
  messages: {
    general:
      "Hello! I found Shiv Shakti Makeup Studio & Training Center online. I would like to know more about your makeup services and training courses. Please share the details.",
    course:
      "Hello! I am interested in learning more about your makeup training courses. Could you please share the course details and the next batch date?",
    // {item} is replaced with the service or course name on the button.
    service:
      "Hello! I found Shiv Shakti Makeup Studio & Training Center online. I would like to enquire about {item}. Please share the available details.",
    courseItem:
      "Hello! I am interested in your {item}. Could you please share the course details and the next batch date?",
  },
};
