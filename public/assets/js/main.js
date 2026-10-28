(function () {
  "use strict";

  var cfg = window.SITE_CONFIG;
  if (!cfg) return;

  // ---------- Link builders ----------
  function waLink(message) {
    return "https://wa.me/" + cfg.whatsappNumber + "?text=" + encodeURIComponent(message);
  }

  function messageFor(el) {
    var kind = el.getAttribute("data-wa") || "general";
    var item = el.getAttribute("data-wa-item");
    var template = cfg.messages[kind] || cfg.messages.general;
    return item ? template.replace("{item}", item) : template;
  }

  var a = cfg.address;
  var fullAddress = [a.line1, a.line2, a.region + " " + a.postalCode].join(", ");
  var directionsUrl =
    "https://www.google.com/maps/dir/?api=1&destination=" +
    encodeURIComponent(cfg.name + ", " + fullAddress);

  // ---------- Wire up config-driven elements ----------
  document.querySelectorAll("[data-wa]").forEach(function (el) {
    el.href = waLink(messageFor(el));
    el.target = "_blank";
    el.rel = "noopener";
  });

  document.querySelectorAll("[data-phone]").forEach(function (el) {
    if (el.tagName === "A") el.href = "tel:" + cfg.phoneTel;
    if (!el.hasAttribute("data-keep-text")) el.textContent = cfg.phoneDisplay;
  });

  document.querySelectorAll("[data-address]").forEach(function (el) {
    el.innerHTML = "";
    [a.line1, a.line2, a.region + " " + a.postalCode].forEach(function (line, i) {
      if (i) el.appendChild(document.createElement("br"));
      el.appendChild(document.createTextNode(line));
    });
  });

  document.querySelectorAll("[data-maps]").forEach(function (el) {
    el.href = cfg.mapsUrl;
    el.target = "_blank";
    el.rel = "noopener";
  });

  document.querySelectorAll("[data-directions]").forEach(function (el) {
    el.href = directionsUrl;
    el.target = "_blank";
    el.rel = "noopener";
  });

  // Optional social links: only shown once a verified URL is configured.
  ["youtube"].forEach(function (key) {
    document.querySelectorAll('[data-social="' + key + '"]').forEach(function (el) {
      if (!cfg[key]) return;
      el.hidden = false;
      el.querySelectorAll("a[data-social-link]").forEach(function (link) {
        link.href = cfg[key];
      });
    });
  });

  // ---------- Instagram ----------
  document.querySelectorAll("[data-instagram]").forEach(function (el) {
    el.href = cfg.instagram;
    el.target = "_blank";
    el.rel = "noopener";
  });
  document.querySelectorAll("[data-ig-handle]").forEach(function (el) {
    el.textContent = cfg.instagramHandle;
  });
  document.querySelectorAll("[data-ig-followers-wrap]").forEach(function (el) {
    el.hidden = !cfg.instagramFollowers;
  });
  document.querySelectorAll("[data-ig-followers]").forEach(function (el) {
    el.textContent = cfg.instagramFollowers;
  });
  document.querySelectorAll("[data-ig-asof]").forEach(function (el) {
    el.textContent = cfg.instagramFollowersAsOf ? "(" + cfg.instagramFollowersAsOf + ")" : "";
  });

  // Selected posts as official embeds. Each starts as a plain link card, and
  // Instagram's embed.js is only loaded when the section nears the viewport.
  var igGrid = document.querySelector("[data-ig-posts]");
  var igPosts = cfg.instagramPosts || [];
  if (igGrid && igPosts.length) {
    igPosts.forEach(function (url) {
      var quote = document.createElement("blockquote");
      quote.className = "instagram-media";
      quote.setAttribute("data-instgrm-permalink", url + "?utm_source=ig_embed");
      quote.setAttribute("data-instgrm-version", "14");
      var link = document.createElement("a");
      link.href = url;
      link.target = "_blank";
      link.rel = "noopener";
      link.textContent = "View this post on Instagram";
      quote.appendChild(link);
      igGrid.appendChild(quote);
    });

    var loadEmbeds = function () {
      if (window.instgrm) return window.instgrm.Embeds.process();
      var s = document.createElement("script");
      s.async = true;
      s.src = "https://www.instagram.com/embed.js";
      document.body.appendChild(s);
    };
    if ("IntersectionObserver" in window) {
      var igIo = new IntersectionObserver(
        function (entries) {
          if (entries.some(function (e) { return e.isIntersecting; })) {
            igIo.disconnect();
            loadEmbeds();
          }
        },
        { rootMargin: "400px 0px" }
      );
      igIo.observe(igGrid);
    } else {
      loadEmbeds();
    }
  } else if (igGrid) {
    igGrid.hidden = true;
  }

  // ---------- Structured data (LocalBusiness) ----------
  var ld = {
    "@context": "https://schema.org",
    "@type": "BeautySalon",
    name: cfg.name,
    telephone: cfg.phoneTel,
    address: {
      "@type": "PostalAddress",
      streetAddress: a.line1,
      addressLocality: "Noida",
      addressRegion: a.region,
      postalCode: a.postalCode,
      addressCountry: a.country,
    },
    geo: { "@type": "GeoCoordinates", latitude: cfg.geo.lat, longitude: cfg.geo.lng },
    hasMap: cfg.mapsUrl,
  };
  ld.makesOffer = [
    "Bridal Makeup", "Party / Occasion Makeup", "Festive / Karwa Chauth Makeup", "Mehndi",
    "Makeup Course", "Beauty & Salon Skills course", "PMU (Permanent Makeup) Training",
  ].map(function (name) {
    return { "@type": "Offer", itemOffered: { "@type": "Service", name: name } };
  });
  var sameAs = [cfg.youtube, cfg.instagram].filter(Boolean);
  if (sameAs.length) ld.sameAs = sameAs;
  var script = document.createElement("script");
  script.type = "application/ld+json";
  script.textContent = JSON.stringify(ld);
  document.head.appendChild(script);

  // ---------- Header & mobile navigation ----------
  var header = document.querySelector(".site-header");
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("site-nav");

  function setNav(open) {
    toggle.setAttribute("aria-expanded", String(open));
    nav.classList.toggle("is-open", open);
    document.body.classList.toggle("nav-open", open);
  }

  toggle.addEventListener("click", function () {
    setNav(toggle.getAttribute("aria-expanded") !== "true");
  });
  nav.addEventListener("click", function (e) {
    if (e.target.closest("a")) setNav(false);
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && nav.classList.contains("is-open")) {
      setNav(false);
      toggle.focus();
    }
  });

  function onScroll() {
    header.classList.toggle("is-scrolled", window.scrollY > 24);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // ---------- Reveal on scroll ----------
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px" }
    );
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("is-visible"); });
  }

  // ---------- Gallery lightbox ----------
  var dialog = document.getElementById("lightbox");
  var items = Array.prototype.slice.call(document.querySelectorAll(".gallery-item"));
  var lbImg = dialog.querySelector("img");
  var lbCaption = dialog.querySelector("figcaption");
  var current = 0;

  function show(index) {
    current = (index + items.length) % items.length;
    var item = items[current];
    var img = item.querySelector("img");
    lbImg.src = item.getAttribute("href");
    lbImg.alt = img.alt;
    lbCaption.textContent = img.alt;
  }

  items.forEach(function (item, i) {
    item.addEventListener("click", function (e) {
      if (typeof dialog.showModal !== "function") return; // fall back to opening the image
      e.preventDefault();
      show(i);
      dialog.showModal();
    });
  });

  dialog.querySelector(".lb-close").addEventListener("click", function () { dialog.close(); });
  dialog.querySelector(".lb-prev").addEventListener("click", function () { show(current - 1); });
  dialog.querySelector(".lb-next").addEventListener("click", function () { show(current + 1); });
  dialog.addEventListener("click", function (e) {
    if (e.target === dialog) dialog.close();
  });
  dialog.addEventListener("keydown", function (e) {
    if (e.key === "ArrowLeft") show(current - 1);
    if (e.key === "ArrowRight") show(current + 1);
  });

  // ---------- WhatsApp enquiry form ----------
  // No backend: the form composes a message and opens WhatsApp. The visitor
  // reviews it and presses Send themselves.
  var form = document.getElementById("enquiry-form");
  if (form) {
    form.hidden = false;

    var setError = function (field, show) {
      var err = document.getElementById(field.id + "-error");
      field.setAttribute("aria-invalid", String(show));
      if (err) {
        err.hidden = !show;
        if (show) field.setAttribute("aria-describedby", err.id);
        else field.removeAttribute("aria-describedby");
      }
      return show;
    };

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var name = form.elements.name;
      var interest = form.elements.interest;
      var bad = [
        setError(name, !name.value.trim()) && name,
        setError(interest, !interest.value) && interest,
      ].filter(Boolean);
      if (bad.length) {
        bad[0].focus();
        return;
      }

      var lines = [
        "Hello! I found " + cfg.name + " online.",
        "",
        "Name: " + name.value.trim(),
        "Interested in: " + interest.value,
      ];
      var date = form.elements.date.value;
      if (date) {
        var d = new Date(date + "T00:00:00");
        lines.push("Preferred date: " + d.toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" }));
      }
      var note = form.elements.message.value.trim();
      if (note) lines.push("Message: " + note);
      lines.push("", "Please share the details.");

      // A real link click (rather than window.open) keeps this a user gesture
      // and opens the WhatsApp app directly on mobile.
      var link = document.createElement("a");
      link.href = waLink(lines.join("\n"));
      link.target = "_blank";
      link.rel = "noopener";
      document.body.appendChild(link);
      link.click();
      link.remove();
    });

    ["name", "interest"].forEach(function (key) {
      var field = form.elements[key];
      field.addEventListener(key === "interest" ? "change" : "input", function () {
        if (field.getAttribute("aria-invalid") === "true") setError(field, !field.value.trim());
      });
    });
  }

  // ---------- Footer year ----------
  var year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();
})();
