/*
 * SITE CONFIGURATION — the single place to edit business contact details.
 *
 * Every phone link, WhatsApp button, map link and the structured data on the
 * page is generated from this object by main.js. Change a value here and it
 * updates everywhere.
 *
 * Verification status (see BUSINESS_RESEARCH.md):
 *   - name, mapsUrl, geo ........ verified from the Google Maps listing
 *   - phone, address ............ from the client brief — OWNER MUST CONFIRM
 *   - WhatsApp on this number ... NOT verified — OWNER MUST CONFIRM
 *   - youtube, instagram ........ not verified — left null (sections stay hidden)
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

  // Set to a verified URL to show the "Watch Our Videos" / Instagram links.
  youtube: null,
  instagram: null,

  // Pre-filled WhatsApp messages. The visitor still presses Send themselves.
  messages: {
    general:
      "Hello! I found Shiv Shakti Makeup Studio & Training Center online. I would like to know more about your makeup services and training courses. Please share the available details.",
    course:
      "Hello! I am interested in learning more about your makeup training courses. Could you please share the course details?",
    // {item} is replaced with the service or course name on the button.
    service:
      "Hello! I found Shiv Shakti Makeup Studio & Training Center online. I would like to enquire about {item}. Please share the available details.",
    courseItem:
      "Hello! I am interested in learning more about your {item}. Could you please share the course details?",
  },
};
