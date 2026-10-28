// Static checks for the site in /public. No dependencies: run with `npm test`.
import { readFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import vm from "node:vm";

const root = join(dirname(fileURLToPath(import.meta.url)), "..", "public");
const pages = ["index.html", "credits.html", "404.html"];
const errors = [];
let checks = 0;

function check(ok, message) {
  checks++;
  if (!ok) errors.push(message);
}

// ---------- Config ----------
const sandbox = { window: {} };
vm.runInNewContext(readFileSync(join(root, "assets/js/config.js"), "utf8"), sandbox);
const cfg = sandbox.window.SITE_CONFIG;
check(cfg, "config.js must define window.SITE_CONFIG");
check(/^91\d{10}$/.test(cfg.whatsappNumber), `whatsappNumber must be 91 + 10 digits, got "${cfg.whatsappNumber}"`);
check(cfg.phoneTel === "+" + cfg.whatsappNumber, "phoneTel should match whatsappNumber");
check(cfg.phoneDisplay.replace(/\D/g, "") === cfg.whatsappNumber, "phoneDisplay should match whatsappNumber");
for (const [key, msg] of Object.entries(cfg.messages)) {
  const url = "https://wa.me/" + cfg.whatsappNumber + "?text=" + encodeURIComponent(msg);
  const parsed = new URL(url);
  check(parsed.searchParams.get("text") === msg, `WhatsApp message "${key}" does not round-trip through URL encoding`);
  check(!/\s/.test(url), `WhatsApp URL for "${key}" contains unencoded whitespace`);
}
check(cfg.youtube === null || /^https:\/\//.test(cfg.youtube), "youtube must be null or an https URL");
check(/^https:\/\/www\.instagram\.com\/[\w.]+\/$/.test(cfg.instagram), "instagram must be a clean https://www.instagram.com/<handle>/ URL");
check(cfg.instagramHandle === "@" + cfg.instagram.split("/")[3], "instagramHandle should match the instagram URL");
check(cfg.instagramFollowers === null || !!cfg.instagramFollowersAsOf, "instagramFollowers needs an instagramFollowersAsOf date");
for (const url of cfg.instagramPosts || []) {
  check(/^https:\/\/www\.instagram\.com\/(p|reel)\/[\w-]+\/$/.test(url), `instagramPosts entry is not a post/reel URL: ${url}`);
}

// ---------- Pages ----------
for (const page of pages) {
  const html = readFileSync(join(root, page), "utf8");
  const ids = new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]));

  check(/<title>[^<]{10,}<\/title>/.test(html), `${page}: missing <title>`);
  check((html.match(/<h1[\s>]/g) || []).length === 1, `${page}: must have exactly one <h1>`);
  check(/<meta name="viewport"/.test(html), `${page}: missing viewport meta`);

  // Local asset references
  const refs = [
    ...[...html.matchAll(/\s(?:src|href)="(\/[^"#?]*)"/g)].map((m) => m[1]),
    ...[...html.matchAll(/(?:srcset|imagesrcset)="([^"]+)"/g)].flatMap((m) =>
      m[1].split(",").map((s) => s.trim().split(/\s+/)[0])
    ),
  ];
  for (const ref of refs) {
    if (!ref.startsWith("/")) continue;
    const file = ref === "/" ? "index.html" : ref.slice(1);
    check(existsSync(join(root, file)), `${page}: missing local file ${ref}`);
  }

  // CSS/JS keep their names between deploys, so each link carries a ?v= cache-buster
  for (const [, ref] of html.matchAll(/\s(?:src|href)="(\/assets\/(?:css|js)\/[^"]+)"/g)) {
    check(/\?v=\w+$/.test(ref), `${page}: ${ref} needs a ?v= version so browsers don't serve a stale copy`);
  }

  // In-page anchors
  for (const [, target] of html.matchAll(/href="#([^"]*)"/g)) {
    check(target && ids.has(target), `${page}: anchor #${target} has no matching id`);
  }

  // Every link has a real destination
  for (const [tag] of html.matchAll(/<a\b[^>]*>/g)) {
    check(/href="[^"]+"/.test(tag) && !/href="#"/.test(tag), `${page}: link without a destination: ${tag}`);
  }

  // Images: alt text, lazy loading below the fold
  for (const [tag] of html.matchAll(/<img\b[^>]*>/g)) {
    if (tag.includes('src=""')) continue; // lightbox placeholder, filled by JS
    check(/\salt="[^"]+"/.test(tag), `${page}: image without alt text: ${tag.slice(0, 80)}`);
    check(/width="\d+"/.test(tag) && /height="\d+"/.test(tag), `${page}: image without width/height: ${tag.slice(0, 80)}`);
    check(/fetchpriority="high"|loading="lazy"/.test(tag), `${page}: image should be lazy-loaded: ${tag.slice(0, 80)}`);
  }

  // WhatsApp buttons reference a configured message
  for (const [, kind] of html.matchAll(/data-wa="([^"]+)"/g)) {
    check(kind in cfg.messages, `${page}: data-wa="${kind}" has no message in config.js`);
  }
  for (const [tag] of html.matchAll(/<a\b[^>]*data-wa="(?:service|courseItem)"[^>]*>/g)) {
    check(/data-wa-item="[^"]+"/.test(tag), `${page}: item-specific WhatsApp button needs data-wa-item`);
  }

  // External links opened in a new tab are safe
  for (const [tag] of html.matchAll(/<a\b[^>]*target="_blank"[^>]*>/g)) {
    check(/rel="[^"]*noopener/.test(tag), `${page}: target=_blank without rel=noopener`);
  }
}

// Floating WhatsApp button
const index = readFileSync(join(root, "index.html"), "utf8");
check(/class="wa-float"[^>]*data-wa="general"[^>]*aria-label="Chat on WhatsApp"/.test(index), "floating WhatsApp button missing or mislabeled");

// Main navigation covers the required sections
for (const id of ["top", "services", "gallery", "academy", "reviews", "contact"]) {
  check(new RegExp(`<nav id="site-nav"[\\s\\S]*href="#${id}"[\\s\\S]*</nav>`).test(index), `main nav is missing #${id}`);
}

// Instagram section and links
check(/id="instagram"/.test(index) && /data-ig-posts/.test(index), "Instagram section missing");
check(/data-instagram[^>]*>[\s\S]{0,120}Follow on Instagram/.test(index), "Follow on Instagram button missing");
for (const [tag] of index.matchAll(/<a\b[^>]*data-instagram[^>]*>/g)) {
  check(tag.includes(`href="${cfg.instagram}"`), `Instagram link fallback href should be ${cfg.instagram}: ${tag}`);
}

// Enquiry form: labelled fields, and no claim of a backend submission
const form = (index.match(/<form id="enquiry-form"[\s\S]*?<\/form>/) || [""])[0];
check(form, "enquiry form missing");
check(!/\saction=/.test(form), "enquiry form must not post anywhere: it opens WhatsApp instead");
for (const [, id] of form.matchAll(/<(?:input|select|textarea)\b[^>]*id="([^"]+)"/g)) {
  check(form.includes(`for="${id}"`), `form field #${id} has no <label>`);
}

if (errors.length) {
  console.error(`\n✗ ${errors.length} of ${checks} checks failed:\n`);
  for (const e of errors) console.error("  - " + e);
  process.exit(1);
}
console.log(`✓ All ${checks} site checks passed.`);
