/* The Block: the rest of the site. A hash router for the inner pages, which are drawn from the content below.
   Facts come only from VF's own site and blog (read 30 Sep and 2 Oct 2026), VF's site kit, and the citations verified on
   2 Oct; anything unconfirmed is left out here and listed in docs/TK.md. Noyah Cosmetics and Nios Skin Lab appear as projects;
   the site never calls them Virtual Fudge's own brands (Vemir, 19 Oct). The homepage's verses and plain lines are read from the page itself, so
   COPY.md has one home. Inner-page copy is a draft for Vemir's approval. */
(function () {
  "use strict";
  function $(s, r) { return (r || document).querySelector(s); }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }

  var STUDIO = {
    email: "hi@virtualfudge.com", partners: "partnerships@virtualfudge.com", careers: "careers@virtualfudge.com", press: "pr@virtualfudge.com",
    phone: "+1 646 470 9997", tel: "+16464709997",          // the studio's number, confirmed by Vemir (7 Oct)
    book: "https://calendar.app.google/aTmHkh5B71PkiYVe7",
    // Brevo's hosted sign-up page, form "Website newsletter" -> list "Website newsletter", double opt-in (made 26 Oct); "" = the email-app fallback
    newsletter: "https://20d8c190.sibforms.com/serve/MUIFAMPXWGzD5XZJWYQ6r2o8_qxZeWLL8xuiLSaAl--UQOpoSDFBJI_XBzcP_Eh1vm-eCp4WXjK9BP4VSaL8GEbwV2DipCzjE_bVSJ0F5HhboQwVVB7e-Ta7YG8a9K4L0EsAKDcyYfe44t1TfTM4PgqNvlPYXItsUDv3il1JIVt2EDQEx8VY7NymtvPkwNdrANJ2hKAJyBjwD2B0",
    address: ["315 W. 57th St, Ste 308", "New York, NY 10019"],
    about: "We are a cross-disciplinary team in New York City, with experience in coding, design, art, marketing, and sales, and a deep understanding of consumer packaged goods.",
    about2: "We live to imagine what hasn’t been imagined yet, and to design for what exists and what’s coming.",   // VF's second sentence ("for" added; TK.md)
    tagline: "Immersion that Converts",   // VF’s slogan (Vemir, 20 Oct)
    socials: [["LinkedIn", "https://www.linkedin.com/company/virtualfudge"], ["Instagram", "https://www.instagram.com/virtual_fudge/"], ["X", "https://x.com/virtual_fudge"],
              ["Threads", "https://www.threads.net/@virtual_fudge"], ["TikTok", "https://www.tiktok.com/@virtualfudge"], ["YouTube", "https://www.youtube.com/@VirtualFudge"], ["Facebook", "https://www.facebook.com/virtualfudge"]]
  };

  // Vemir's required line (the kit's CLAUDE.md): verbatim, in About, after the existing paragraph
  var REQUIRED = "We have a lot of flexibility in build structure and ability, making our bespoke digital studio more calibrated to the needs of the field.";
  // approved public language from the AWE USA 2026 press release (the kit's docs/source/drive/press-awe-2026.md); the booth's campaign title stays off
  var FOUNDER = ["The XR industry spent a decade asking when consumers would finally put on the headset. We bet on the device already in their pocket. … Utility is not a constraint. It is the whole design.", "Joshua Gordon, Founder and CEO"];   // from the AWE release; the sentence about the show to come is left out with an ellipsis now the show is past
  var AWE = [["Gortana, the Living Hologram", "Scan a printed logo and a life-size hologram walks out of it.", "#work-gortana"],
    ["Shade Match by Noyah Cosmetics", "Real-time AR lip try-on with AI shade calibration that adapts to actual skin tone and lighting.", "#work-noyah-tryon"],
    ["The Magic Mirror", "An AR mirror that toggles between a client’s current look and a treatment result in real time.", "#work-nios-mirror"],
    ["The Fudge Hunt", "An augmented wayfinding treasure hunt that turns the venue into a gamified discovery layer.", ""]];
  // from VF's own decks in Drive (Sales Deck and VF Partnerships Deck, read 7 Oct 2026)
  var TEAM = [["Joshua Gordon", "Founder and CEO", "/assets/team/josh.png"], ["Vemir Ambartsoumean", "Sales Manager", "/assets/team/vemir.png"],
              ["Evan Muchnicki", "Project Manager", "/assets/team/evan.png"]];
  var MISSION = ["At Virtual Fudge, our mission is to design immersive AR and VR experiences that look incredible and deliver real value.",
    "Based in New York City, our cross-disciplinary team blends engineering, design, AI, and storytelling to create AR solutions for today’s reality and tomorrow’s possibilities."];
  // partners described, not named (Vemir, 19 Oct)
  var PARTNERS = [["An industry association", "We are members of a worldwide organization for the immersive technology industry."],
    ["A holographic display maker", "Our partner for 3D holographic displays."], ["A charging-kiosk network", "AR activations at its phone-charging kiosks in high-footfall venues."]];
  var WAYS = [["Project-based", "From joint ideation to delivery, for a single campaign or product."], ["Collaborative co-creation", "We augment your team: you bring brand direction, we bring AR expertise."],
    ["Pilots and prototypes", "Low-risk, low-cost pilots to prove the concept and gather real metrics."], ["Ongoing partnership", "A retainer for continuous updates, analytics, and feature growth."],
    ["White-label and integrations", "Agency and partner programs for branded AR offerings."]];

  // live demos a visitor can try now, from VF's own codes in Drive (decoded and checked 7 Oct 2026):
  // the hologram opens a Zappar WebAR page; the Noyah Cosmetics code opens the App Store (the Google Play listing returns Not Found)
  var LIVE = {
    hologram: { title: "The Living Hologram", case: "gortana", qr: "/assets/try/gortana-qr.png", url: "https://qr1.be/32QNDZ", logo: true, clip: "gortana",
      text: "Scan the code, then point your phone at the Virtual Fudge logo. Our founder appears on it and speaks.", phone: "Open it on this phone" },
    shade: { title: "Shade Match by Noyah Cosmetics", case: "noyah-tryon", qr: "/assets/try/noyah-appstore-qr.png", url: "https://apps.apple.com/us/app/noyah-augmented-reality/id6446071291", clip: "tryon-face",
      text: "Scan the code to get the Noyah Cosmetics app on iPhone, then try any shade on your own face, in your own light.", phone: "Open in the App Store" }
  };
  // scan it, or watch it: the recording shows what the code opens, for anyone looking at a desktop
  function liveCard(d, withCase) {
    var c = CLIPS[d.clip];
    return '<div class="live"><figure class="clip phone live-clip"><div class="clip-frame" style="aspect-ratio:' + c[0] + " / " + c[1] + '">' + clipVideo(d.clip, d.title + ", recorded on a phone") + "</div>" + clipTag("phone") + "</figure>" +
      '<span class="try-target"><img class="try-qr" src="' + d.qr + '" width="200" height="200" alt="QR code: ' + esc(d.title) + '"></span>' +
      '<div class="live-text"><h3>' + esc(d.title) + "</h3><p>" + esc(d.text) + "</p>" +
      (d.logo ? '<div class="live-target" aria-hidden="true">' + (window.VFLogo ? window.VFLogo.svg() : "") + "</div>" : "") +
      '<p class="try-phone"><a class="link" href="' + d.url + '" target="_blank" rel="noopener">' + d.phone + NEWTAB + "</a></p>" +
      (withCase ? '<p><a class="link" href="#work-' + d.case + '">Learn more</a></p>' : "") + "</div></div>";
  }
  function liveSection(keys, heading, lead, withCase) {
    return '<section class="block-sec try"><h2>' + heading + "</h2>" + (lead ? '<p class="lead">' + lead + "</p>" : "") + '<div class="lives">' +
      keys.map(function (k) { return liveCard(LIVE[k], withCase); }).join("") + "</div></section>";
  }

  /* ---------- the real thing: VF's own recordings and photographs ----------
     Clips come from VF's project pages on virtualfudge.com and its Drive (Current Demos, Media; Media From Conferences),
     read 7 Oct 2026, trimmed to short silent loops; none is stock (the Freepik clips on VF's site stay retired). The reel is
     cut from "VF Sizzle Reel.mp4" (LED Wall Content) with only VF's own work: its licensed stock shots and the Tokyo TV
     segment are left out until Vemir confirms them (docs/TK.md). [width, height, kind] with kind phone (a screen
     recording) or cam (a camera). */
  var MEDIA = "/assets/media/";
  var CLIPS = {
    "noyah-box": [554, 1200, "phone"], "noyah-bloom": [674, 1200, "phone"], "nrf-tablet": [676, 1200, "cam"],
    "tryon-face": [552, 1200, "phone"], "tryon-app": [554, 1200, "phone"],
    "store-walk": [676, 1200, "phone"], "store-portal": [674, 1200, "phone"],
    "mirror-window": [676, 1200, "cam", "mirror"], "mirror-live": [676, 1200, "cam", "mirror"], "mirror-guest": [676, 1200, "cam", "mirror"],
    "nrf-mirror": [676, 1200, "cam", "mirror"],
    "gortana": [676, 1200, "phone"], "awe-fountain": [676, 1200, "cam"], "awe-mirror": [1280, 720, "cam"],
    "expo-booth": [676, 1200, "cam"]
  };
  var REEL = { src: MEDIA + "reel.mp4", poster: MEDIA + "reel.jpg", length: "1:44" };
  var REEL_BTN = '<button type="button" class="reel-btn" data-reel><span class="reel-play" aria-hidden="true"></span>Watch the reel<span class="reel-len">' + REEL.length + "</span></button>";
  function clipVideo(name, label) {
    return '<video muted loop playsinline preload="none" poster="' + MEDIA + name + '.jpg" data-src="' + MEDIA + name + '.mp4" aria-label="' + esc(label) + '"></video>' +
      '<button type="button" class="clip-toggle" aria-label="Pause the clip: ' + esc(label) + '"></button>';
  }
  // what a clip is, said on the clip: a phone's screen recording is the AR itself; a camera filmed it happening. A phone's tag
  // stands under the phone, over its caption: on the screen it covered the app's own top bar (the Noyah logo, 28 Oct)
  // the classes a clip's frame takes: its kind, and "mirror" for the Magic Mirror's own picture, which gets a thin screen's
  // bezel as the phones get theirs (Vemir, 29 Oct: "a minimalist little frame around it in each instance")
  function kindOf(c) { return c[2] + (c[3] ? " " + c[3] : ""); }
  function clipTag(kind) { return '<span class="clip-tag" aria-hidden="true">' + (kind === "phone" ? "AR capture" : "Filmed live") + "</span>"; }
  function clip(name, cap, link) {
    var c = CLIPS[name];
    var ph = c[2] === "phone";
    return '<figure class="clip ' + kindOf(c) + '"><div class="clip-frame" style="aspect-ratio:' + c[0] + " / " + c[1] + '">' + clipVideo(name, cap) + (ph ? "" : clipTag(c[2])) + "</div>" +
      "<figcaption>" + (ph ? clipTag("phone") : "") + esc(cap) + (link ? ' <a class="link" href="' + link[0] + '">' + esc(link[1]) + "</a>" : "") + "</figcaption></figure>";
  }
  // a row of clips: [name, caption, optional [href, label]]
  function film(items, heading, lead) {
    return '<section class="block-sec"><h2>' + heading + "</h2>" + (lead ? '<p class="lead">' + lead + "</p>" : "") + '<div class="film">' +
      items.map(function (i) { return clip(i[0], i[1], i[2]); }).join("") + "</div></section>";
  }
  // a justified gallery: every photo and clip keeps its own shape, each row the same height; [kind, name, w, h, words]
  function gallery(items) {
    return '<div class="gallery">' + items.map(function (i) {
      var r = (i[2] / i[3]).toFixed(4);
      return '<figure class="g' + (i[0] === "clip" ? " g-clip" : "") + '" style="--r:' + r + '">' + (i[0] === "clip" ? clipVideo(i[1], i[4])
        : '<img src="/assets/events/' + i[1] + '.jpg" width="' + i[2] + '" height="' + i[3] + '" alt="' + esc(i[4]) + '" loading="lazy" decoding="async">') + "</figure>";
    }).join("") + "</div>";
  }

  /* ---------- the pages, in virtualfudge.com's own words ----------
     Vemir, 15 Oct 2026: "Bring the virtualfudge.com website text onto this one, mirror it exactly, only add text (in the same
     style) for new sections." Every industry and project page below renders VF's live page section by section, in VF's order
     and VF's words (assets/vf-copy.js, built from the crawl by docs/source/build-vf-copy.py). What VF's site doesn't have (the
     footage, Try it live, the medical simulation sections, Events) is written in VF's voice. Vemir, 19 Oct: VF's sentences may be
     edited to read well and fit this site (build-vf-copy.py EDITS); the synthetic operating room is off the site. */
  var V = window.VFCopy || { industries: {}, projects: {}, cards: {} };

  // the work: VF's five projects, in the order its homepage slider shows them
  var CASES = [
    { slug: "noyah-packaging", world: 2 }, { slug: "nios-mirror", world: 1 }, { slug: "noyah-tryon", world: 1, live: "shade" },
    { slug: "noyah-store", world: 1 }, { slug: "gortana", world: 5, live: "hologram" }
  ];
  function caseBy(slug) { if (slug === "holo-card") slug = "gortana";   // the old link keeps working
    for (var i = 0; i < CASES.length; i++) if (CASES[i].slug === slug) return CASES[i]; return null; }
  function cardOf(slug) { return V.cards[slug] || { title: slug, tags: [], excerpt: "" }; }

  // the industries, by VF's names (its homepage grid and footer); seven are chapters of the block
  var IND = {
    retail: { n: 1, num: "I", name: "Retail", cases: ["noyah-tryon", "noyah-store", "nios-mirror"] },
    cpg: { n: 2, num: "II", name: "CPG", cases: ["noyah-packaging", "noyah-store"] },
    medicine: { n: 3, num: "III", name: "Healthcare", cases: [], medical: true },
    sports: { n: 4, num: "IV", name: "Sports", cases: [] },
    events: { n: 5, num: "V", name: "Marketing", cases: ["gortana", "nios-mirror"] },
    museums: { n: 6, num: "VI", name: "Museums", cases: [] },
    training: { n: 7, num: "VII", name: "Training", cases: [] },
    tourism: { name: "Tourism", world: 11, cases: [] }, gaming: { name: "Gaming", world: 13, cases: [] }, entertainment: { name: "Entertainment", world: 13, cases: [] },
    realestate: { name: "Real estate", world: 10, cases: [] }, manufacturing: { name: "Manufacturing", world: 7, cases: [] }, education: { name: "Education", world: 12, cases: [] }
  };
  var NICHE_ORDER = ["retail", "cpg", "medicine", "sports", "events", "museums", "training", "tourism", "gaming", "entertainment", "realestate", "manufacturing", "education"];
  // the Industries list: one plain line each on what AR does there (Vemir, 19 Oct: "clean up the sub titles"), and VF's
  // examples from its homepage grid in this site's sentence case (Museums and Gaming have none there)
  var SUB = {
    retail: "Try-ons and 3D products that answer “will it fit?” before anyone buys.",
    cpg: "Packaging that opens the brand’s story, the ingredients and checkout with one scan.",
    medicine: "AR guides at the bedside and on the device, and simulated patients to practice on.",
    sports: "Live stats over the field, 3D seat views and AR games for fans.",
    events: "Booth activations people stop for, play with and share.",
    museums: "Exhibits that come back to life on a visitor’s phone.",
    training: "Step-by-step AR instructions right on the equipment.",
    tourism: "City walks where the past appears around you.",
    gaming: "Quests that turn city streets and parks into the game board.",
    entertainment: "Shows and stories the audience can step into.",
    realestate: "Homes you can walk through and furnish before they’re built.",
    manufacturing: "Work instructions, quality checks and remote expert help, right on the factory floor.",
    education: "Lessons you can see in 3D, right on the desk."
  };
  var SHORT = {
    retail: ["Store virtualization", "try before you buy", "virtual fitting rooms", "3D product models", "shopping assistants"],
    cpg: ["Augmented packaging", "portals", "try-ons"], sports: ["Live data on each athlete", "game betting"],
    training: ["Immersive training", "virtual manuals"], tourism: ["AR guides", "360° navigation tours", "wayfinding"],
    entertainment: ["Filters", "games", "music shows", "theatre", "VR movies", "virtual exhibitions"],
    medicine: ["Medical equipment", "medical training", "meditation and physical therapy apps"], events: ["AR billboards", "360° promo videos", "holograms"],
    realestate: ["Virtual building models", "property tours and showrooms", "interior design"], manufacturing: ["Field-worker manuals", "equipment visualization"],
    education: ["Virtual classrooms", "tutorials", "information overlaid on real objects"]
  };
  // VF's "Also great for these industries", in the site's own order (the menu's and the Industries page's) and with VF's two
  // industries its list leaves out, Museums and Gaming, so every industry page links to all the others (20 Oct). "AR in VR
  // Collaboration" is left out (its page says "Coming soon"), and so is the page you are on.
  var ALSO = [["AR in retail", "retail"], ["AR in CPG", "cpg"], ["AR in healthcare", "medicine"], ["AR in sports", "sports"], ["AR in marketing", "events"],
    ["AR for museums", "museums"], ["AR in training", "training"], ["AR in tourism", "tourism"], ["AR gaming", "gaming"], ["AR in entertainment", "entertainment"],
    ["AR in real estate", "realestate"], ["AR in manufacturing", "manufacturing"], ["AR in education", "education"]];   // VF's link names in this site's sentence case, as its page titles ("AR in retail: Windows that win")

  // Healthcare's own depth: the medical simulation work, which VF's healthcare page doesn't cover, in VF's voice
  var MED = {
    buyersTitle: "Who calls us for medical AR\u00a0&\u00a0VR",
    buyers: [
      ["You teach clinicians.", "Sim centers, nursing programs, residencies. We build scenarios with your faculty, from your protocols: the procedure, a simulated patient who deteriorates, the emergency your unit sees once in a blue moon. Your clinicians sign off on the script before a single polygon gets built."],
      ["You train people on a device.", "Setup, steps of use and troubleshooting, written from your current IFU and labeling, with time for medical, legal and regulatory review built into the schedule. Your CAD becomes real-time 3D for headsets, tablets and browser AR. Labeling changes? The module changes with it."]],
    stepsTitle: "Backstage: how a medical module gets made",
    stepsLead: "Clinicians sign off before anything gets built in 3D, and again before it ships. Your faculty own the clinical content; we own the design, the build, and making it run on your devices.",
    steps: [["Fit call", "A straight answer, fast. If a library or a manikin would do the job better, we’ll tell you."],
      ["Clinical discovery", "Objectives, critical actions and the mistakes learners actually make, straight from your experts."],
      ["Assessment & tech plan", "How learning gets measured, and where it runs: devices, LMS, IT."],
      ["Script", "Every cue, branch and debrief question, on paper first.", "Clinical sign-off"],
      ["Prototype", "Playable early, and tested with a handful of your real learners."],
      ["Production", "3D, voice, interaction and QA, with builds you see as we go."],
      ["Deployment", "Installed on your devices, with your faculty trained to run it.", "Final build sign-off"],
      ["Updates", "Protocol or IFU changed? It goes back to a new script and a new sign-off."]],
    researchTitle: "What the research says",
    research: "It depends on what you’re teaching. A 2025 meta-analysis of 24 nursing studies found immersive VR improved knowledge, skills and problem-solving. A 2024 meta-analysis of 24 randomized trials in anatomy found VR improved knowledge scores and AR didn’t. So we pick the medium for each learning objective, and we measure it.",
    cites: [["Hsieh JY, et al. Nurse Education Today, 2025;151:106725.", "https://doi.org/10.1016/j.nedt.2025.106725", "doi:10.1016/j.nedt.2025.106725"],
            ["Salimi S, et al. Anatomical Sciences Education, 2024.", "https://doi.org/10.1002/ase.2501", "doi:10.1002/ase.2501"]]
  };

  // the blog, moved onto this site (assets/blog.js, built from blog.virtualfudge.com by docs/source/build-blog.py), newest first
  var BLOG = window.VFBlog || [];
  function postBy(slug) { for (var i = 0; i < BLOG.length; i++) if (BLOG[i].slug === slug) return BLOG[i]; return null; }
  var MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  function day(iso) { var d = iso.split("-"); return +d[2] + " " + MONTHS[+d[1] - 1] + " " + d[0]; }

  // VF's homepage, word for word: its tech stack, the problem, the answer, the development process and About Us
  var STACK = ["Web-based", "Markerless AR", "Marker-based", "ARKit", "ARCore", "App-based", "Unity", "Vuforia", "Location-based AR", "Portals"];
  var HOME = {
    hero: "We create mind-bogglingly useful, non-gimmicky AR, MR & XR experiences",
    problem: { title: "The problem: Many AR apps are quickly forgotten. Why?", items: [["Low utility:", "Cool graphics, but not useful."], ["Small field of view:", "A phone screen shows only a fraction of what the eye sees."],
      ["Yet some AR apps stick:", "Think of placing IKEA furniture in your room, or Instagram filters."]], close: "Phone-based AR works when it’s useful." },
    fly: { title: "So we design non-gimmicky AR, VR, XR, and MR applications", text: "Our apps still earn oohs and ahhs, but they focus on utility: shareability for brands (photos and social sharing), assisted decision-making (virtual try-ons), sales conversions (click-to-buy), and more." },
    process: { title: "Our development process", sub: "From the first call to the high fives.", steps: [
      ["Matchmaking", "An initial video call to see if we’re a fit. Tell us briefly what you want, and we’ll let you know if we can help."],
      ["Ideation", "Explain your mission, goals, and objectives in depth, as well as your resources (financial, databases, creative, and more)."],
      ["Business & technical analysis", "We weigh the possible solutions against your needs, then present a shiny PowerPoint that sets out the consumer-facing features and the back-end software stack."],
      ["Design", "Prototyping, 2D and 3D models, UX/UI, graphic design, 3D modeling, rigging, rendering, shading, audio, and video."],
      ["Test", "Alpha, beta, and all the other Greek letters. Implement feedback and crush the bugs."],
      ["Build", "Back-end and front-end programming, API integration, and QC."],
      ["Deploy", "Release and distribution."],
      ["Post-release work", "Tech support, metrics, API updates, high fives, and more."]] },
    projects: { title: "Example projects", text: "From the challenge to the results, one project at a time." },
    about: { title: "About us", text: "We are a New York City-based, cross-disciplinary team with experience in coding, design, art, marketing, and sales, and a deep understanding of consumer packaged goods. We live to imagine what’s yet to be imagined, designing the best solutions for both what exists and what’s to come.", btn: "Say hi" },
    agnostic: "We’re industry-agnostic: if you dream it, we can do it.",
    blog: { title: "Our blog" }
  };

  /* ---------- templates ---------- */
  var NEWTAB = '<span class="sr"> (opens in a new tab)</span>';
  var BOOK = '<a class="book" href="' + STUDIO.book + '" target="_blank" rel="noopener">Book a call' + NEWTAB + '</a>';
  // a chapter's title, read from the homepage (one home for it): "Medical Education" for #medicine
  function chTitle(id) {
    var e = document.querySelector("#h-" + id + " .ch-name"); if (!e) return "";
    var c = e.cloneNode(true), sr = c.querySelector(".sr"); if (sr) sr.remove(); return c.textContent.trim();
  }
  function hero(opts) {
    return '<section class="page-hero"><div class="col">' + (opts.num ? (opts.ch ? '<p class="ch"><span class="num" aria-hidden="true">' + opts.num + '</span><span class="ch-name">' + esc(opts.ch) + "</span></p>"
      : '<p class="num" aria-hidden="true">' + opts.num + '</p>') : "") +
      '<h1 class="display" tabindex="-1">' + opts.title + "</h1>" + (opts.verse ? '<p class="verse">' + esc(opts.verse) + "</p>" : "") +
      (opts.lede ? '<p class="plain">' + opts.lede + "</p>" : "") + (opts.lede2 ? '<p class="plain">' + opts.lede2 + "</p>" : "") + '<div class="acts">' + (opts.acts || BOOK) + "</div></div></section>";
  }
  // a VF button: every one of VF's opens its "Let's talk AR!" pop-up, which is #start here; a call goes to the calendar
  function btn(b, cls) {
    if (!b || !b[0]) return "";
    if (/\bcall\b/i.test(b[0])) return '<a class="' + (cls || "book") + '" href="' + STUDIO.book + '" target="_blank" rel="noopener">' + esc(b[0]) + NEWTAB + "</a>";
    return '<a class="' + (cls || "book") + '" href="' + esc(b[1] || "#start") + '">' + esc(b[0]) + "</a>";
  }
  function paras(list, lead) { return (list || []).map(function (p, k) { return "<p" + (k || !lead ? "" : ' class="lead"') + ">" + esc(p) + "</p>"; }).join(""); }
  // VF's run-in heads ("Fewer Returns: …", "Manufacturing & Automotive: …") stay bold, as on its pages
  function runIn(p) { var m = /^([^:.]{3,40}): (.+)$/.exec(p); return m ? "<strong>" + esc(m[1]) + ":</strong> " + esc(m[2]) : esc(p); }
  function points(list) { return (list || []).map(function (p, k) { return "<p" + (k ? "" : ' class="lead"') + ">" + (k ? runIn(p) : esc(p)) + "</p>"; }).join(""); }
  function grid(items) { return '<div class="three">' + items.map(function (i) { return "<div><h3>" + esc(i[0]) + "</h3><p>" + esc(i[1]) + "</p></div>"; }).join("") + "</div>"; }
  function sec(inner, cls) { return '<section class="block-sec' + (cls ? " " + cls : "") + '">' + inner + "</section>"; }
  function faqHtml(f) {
    if (!f || !f.items || !f.items.length) return "";
    return sec("<h2>" + esc(f.title || "FAQ") + "</h2>" + (f.text ? '<p class="lead">' + esc(f.text) + "</p>" : "") +
      '<dl class="faq">' + f.items.map(function (q) { return "<dt>" + esc(q[0]) + "</dt><dd>" + q[1].split("\n").map(function (a, k) { return "<p>" + (k ? runIn(a) : esc(a)) + "</p>"; }).join("") + "</dd>"; }).join("") + "</dl>");
  }
  // VF's banner under every page, said for this site: its homepage is the story of the block
  function story(s) {
    s = s || { title: "See the whole story", text: "Our homepage is one block of fudge that becomes seven industries as you scroll. Start at the top and see where it takes you.", btn: "Start the story" };
    return sec("<h2>" + esc(s.title) + '</h2><p class="lead">' + esc(s.text) + '</p><div class="acts"><a class="book" href="#top">' + esc(s.btn || "Start the story") + "</a>" + REEL_BTN + "</div>", "story");
  }
  // each case's recordings, in the order they tell it; the first is the card's picture
  var CASE_FILM = {
    "noyah-packaging": [["noyah-box", "Scan the box, and a flower blooms right over the Brooklyn Bridge."], ["noyah-bloom", "Same box, different table: the story springs out wherever you are."],
                        ["nrf-tablet", "On a tablet at our booth, NRF 2026."]],
    "noyah-tryon": [["tryon-face", "Real face, real light, real shade."], ["tryon-app", "From the product page to the try-on in one tap."]],
    "noyah-store": [["store-walk", "Step inside the Noyah Cosmetics virtual store."], ["store-portal", "The store’s portal, opened on a New York rooftop."]],
    "nios-mirror": [["mirror-window", "In the window of the Nios Skin Lab spa."], ["mirror-live", "Hair on, hair off: smooth results, live in the mirror."], ["mirror-guest", "A guest meets the Magic Mirror."]],
    "gortana": [["gortana", "A printed card, a phone, and our founder steps out to say hi."]]
  };
  var CARD_STILL = { "nios-mirror": "mirror-live" };   // the picture that says it fastest, where that isn't the first clip
  function cards(slugs, heading, text) {
    if (!slugs.length) return "";
    return sec("<h2>" + heading + "</h2>" + (text ? '<p class="lead">' + esc(text) + "</p>" : "") + '<ul class="cards">' + slugs.map(function (s, k) {
      var c = cardOf(s), f = CASE_FILM[s], still = CARD_STILL[s] || (f && f[0][0]);
      var pic = f ? '<span class="card-media"><img src="' + MEDIA + still + '.jpg" width="' + CLIPS[still][0] + '" height="' + CLIPS[still][1] + '" alt="" loading="lazy" decoding="async">' +
        '<video muted loop playsinline preload="none" aria-hidden="true" data-card-src="' + MEDIA + still + '.mp4"></video>' + clipTag(CLIPS[still][2]) + '<span class="card-scan"></span></span>' : '<span class="card-media blank"><span>Private client</span></span>';
      return '<li style="--i:' + k + '"><a class="card" href="#work-' + s + '">' + pic + '<span class="card-who">' + esc(tagLine(c.tags)) + '</span><span class="card-title">' + esc(c.title) +
        '</span><span class="card-line">' + esc(c.excerpt) + '</span><span class="card-more">Learn more</span></a></li>'; }).join("") + "</ul>");
  }
  function closing() {
    return sec("<h2>Tell us briefly what you want, and we’ll let you know if we can help</h2><div class=\"acts\">" + '<a class="book" href="#start">Get a quote</a>' + BOOK +
      '<a class="link" href="mailto:' + STUDIO.email + '">' + STUDIO.email + "</a></div>", "closing");
  }

  // Projects (Josh, 28 Oct: "kill the box on the projects page, can make projects more animated in the same style"): no block
  // here; the projects' own footage stands in a row, and the AR frame locks onto one clip at a time, names it and plays it, as
  // the homepage's frame tracks its world. A hover or a focus moves the frame to that clip; each clip opens its project
  var FINDER = [["noyah-tryon", "tryon-face", "Noyah Cosmetics try-on"], ["noyah-packaging", "noyah-box", "Noyah Cosmetics packaging"],
                ["nios-mirror", "mirror-live", "The Magic Mirror at Nios Skin Lab"], ["noyah-store", "store-walk", "The Noyah Cosmetics virtual store"],
                ["gortana", "gortana", "Gortana, the Living Hologram"]];
  function finder() {
    return '<div class="finder"><div class="finder-row">' + FINDER.map(function (f, k) {
      var c = CLIPS[f[1]];
      return '<a class="finder-clip ' + kindOf(c) + '" href="#work-' + f[0] + '" data-k="' + k + '" data-name="' + esc(f[2]) + '"><video muted loop playsinline preload="none" aria-hidden="true" poster="' + MEDIA + f[1] +
        '.jpg" data-finder-src="' + MEDIA + f[1] + '.mp4"></video><span class="sr">' + esc(f[2]) + "</span></a>";
    }).join("") + '</div><span class="finder-lock" aria-hidden="true"><span class="finder-scan"></span></span>' +
      '<p class="finder-read" aria-hidden="true"><span class="finder-tag"><i></i>Tracking</span><span class="finder-name"></span></p></div>';
  }
  function pageWork() {
    return hero({ title: "Projects", lede: "Oohs and ahhs, with a job to do. Here’s what we’ve built, and two you can try on your phone right now.", acts: REEL_BTN + '<a class="book" href="#start">Get a quote</a>' }).replace(/<\/section>$/, finder() + "</section>").replace('<section class="page-hero">', '<section class="page-hero has-finder">') +
      '<div class="page-body">' + cards(CASES.map(function (c) { return c.slug; }), esc(HOME.projects.title), HOME.projects.text) +
      liveSection(["hologram", "shade"], "Try it live", "Two of our builds are live right now. Point your phone at a code, or watch the recording right beside it.", true) +
      story() + closing() + "</div>";
  }

  // a project: VF's own page, section by section
  function pageCase(c) {
    var p = V.projects[c.slug], body = "";
    if (CASE_FILM[c.slug]) body += film(CASE_FILM[c.slug], "See it in action", "");
    body += sec("<h2>" + esc(p.about.title) + "</h2>" + paras(p.about.text, true) + grid(p.about.items));
    if (p.features && p.features.items.length) body += sec("<h2>" + esc(p.features.title) + '</h2><div class="three">' + p.features.items.map(function (f) {
      var i = f.indexOf(": "); return i > 0 ? "<div><h3>" + esc(f.slice(0, i)) + "</h3><p>" + esc(f.slice(i + 2)) + "</p></div>" : "<div><p>" + esc(f) + "</p></div>"; }).join("") + "</div>");
    if (p.banner && p.banner.title) body += sec("<h2>" + esc(p.banner.title) + "</h2>" + paras(p.banner.text, true) + '<div class="acts">' + btn(p.banner.btn) + "</div>", "tagline");
    if (c.live) body += liveSection([c.live], "Try it live", "", false);
    if (p.results && p.results.title) {
      var rb = p.results.btn, to = /marketing/i.test(rb) ? "#for-events" : /CPG/.test(rb) ? "#for-cpg" : /retail/i.test(rb) ? "#for-retail" : "#industries";
      body += sec("<h2>" + esc(p.results.title) + "</h2>" + paras(p.results.text, true) +
        (p.results.statement.length && p.results.statement.every(function (t) { return t.length < 60 && t.indexOf(".") < 0; })
          ? '<ul class="plainlist points">' + p.results.statement.map(function (t) { return "<li>" + esc(t) + "</li>"; }).join("") + "</ul>" : paras(p.results.statement)) + (rb ? '<p><a class="link" href="' + to + '">' + esc(rb) + "</a></p>" : ""));
    }
    if (p.tech && p.tech.items.length) body += sec("<h2>" + esc(p.tech.title) + "</h2>" + (p.tech.text ? '<p class="lead">' + esc(p.tech.text) + "</p>" : "") +
      (p.tech.preview ? "<p>" + esc(p.tech.preview) + "</p>" : "") + '<ul class="data">' + p.tech.items.map(function (t) { return "<li>" + esc(t) + "</li>"; }).join("") + "</ul>");
    // VF's order from here: its "More projects" slider (the others, in the order that page gives them), then the FAQ
    var others = p.more && p.more.order && p.more.order.length ? p.more.order
      : CASES.filter(function (o) { return o.slug !== c.slug; }).slice(0, 4).map(function (o) { return o.slug; });
    body += cards(others, (p.more && p.more.title) || "More projects", (p.more && p.more.text) || "");
    if (p.faq) body += faqHtml(p.faq);
    if (c.note) body += sec('<p class="note">' + esc(c.note) + "</p>");
    return hero({ title: esc(p.hero.title), lede: esc(p.hero.text), lede2: p.hero.extra ? esc(p.hero.extra) : "", acts: btn(p.hero.btn) + '<a class="link" href="#work">All projects</a>' }) +
      '<div class="page-body">' + body + story(p.story && p.story.title ? p.story : null) + closing() + "</div>";
  }

  function nicheName(k) { return (IND[k] && IND[k].name) || k; }
  // the industries where VF's own work is on film
  var IND_FILM = {
    retail: [[["mirror-live", "The Magic Mirror, live: hair on, hair off.", ["#work-nios-mirror", "The project"]], ["tryon-face", "The Noyah Cosmetics try-on, on a real face.", ["#work-noyah-tryon", "The project"]],
              ["store-portal", "The Noyah Cosmetics store’s portal, on a rooftop.", ["#work-noyah-store", "The project"]]], "See our AR in action"],
    cpg: [[["noyah-box", "The Noyah Cosmetics box springs to life.", ["#work-noyah-packaging", "The project"]], ["noyah-bloom", "Same box, any table."],
           ["store-walk", "The Noyah Cosmetics virtual store.", ["#work-noyah-store", "The project"]]], "See our AR in action"],
    events: [[["nrf-mirror", "The Magic Mirror at our booth, NRF 2026."], ["awe-fountain", "Our booth at AWE USA 2026 (yes, that’s a chocolate fountain)."],
              ["gortana", "The Living Hologram, straight off a printed card.", ["#work-gortana", "The project"]]], "See our AR on the show floor"],
    // the pages with no project of VF's own: real recordings from VF's projects, early on the page, so it isn't all words (Vemir, 20 Oct)
    medicine: [[["mirror-live", "The Magic Mirror: a treatment’s result, previewed live.", ["#work-nios-mirror", "The project"]], ["gortana", "The Living Hologram: the founder, life-like, standing on a business card.", ["#work-gortana", "The project"]],
                ["nrf-tablet", "AR anchored to a real object, on a tablet.", ["#work-noyah-packaging", "The project"]]], "Recorded live from our projects", ""],
    sports: [[["store-portal", "The Noyah Cosmetics store’s portal, opened on a New York rooftop.", ["#work-noyah-store", "The project"]], ["gortana", "The Living Hologram: the founder, life-like, standing on a business card.", ["#work-gortana", "The project"]],
              ["nrf-mirror", "The Magic Mirror at our booth, NRF 2026.", ["#work-nios-mirror", "The project"]]], "Recorded live from our projects", ""],
    museums: [[["gortana", "The Living Hologram: the founder, life-like, standing on a business card.", ["#work-gortana", "The project"]], ["noyah-box", "The Noyah Cosmetics box springs to life when you scan it.", ["#work-noyah-packaging", "The project"]],
               ["store-walk", "Walking through the Noyah Cosmetics virtual store.", ["#work-noyah-store", "The project"]]], "Recorded live from our projects", ""],
    training: [[["nrf-tablet", "AR anchored to a real object, on a tablet.", ["#work-noyah-packaging", "The project"]], ["mirror-live", "A live overlay that follows the person in the mirror.", ["#work-nios-mirror", "The project"]],
                ["gortana", "The Living Hologram: the founder, life-like, standing on a business card.", ["#work-gortana", "The project"]]], "Recorded live from our projects", ""],
    tourism: [[["noyah-box", "Scan the box, and a flower blooms right over the Brooklyn Bridge.", ["#work-noyah-packaging", "The project"]], ["store-portal", "The Noyah Cosmetics store’s portal, opened on a New York rooftop.", ["#work-noyah-store", "The project"]],
               ["gortana", "The Living Hologram: the founder, life-like, standing on a business card.", ["#work-gortana", "The project"]]], "Recorded live from our projects", ""],
    gaming: [[["store-portal", "The Noyah Cosmetics store’s portal, opened on a New York rooftop.", ["#work-noyah-store", "The project"]], ["noyah-box", "The Noyah Cosmetics box springs to life when you scan it.", ["#work-noyah-packaging", "The project"]],
              ["tryon-face", "The Noyah Cosmetics try-on, tracking a real face.", ["#work-noyah-tryon", "The project"]]], "Recorded live from our projects", ""],
    entertainment: [[["gortana", "The Living Hologram: the founder, life-like, standing on a business card.", ["#work-gortana", "The project"]], ["mirror-guest", "A guest meets the Magic Mirror.", ["#work-nios-mirror", "The project"]],
                     ["awe-fountain", "Our booth at AWE USA 2026 (yes, that’s a chocolate fountain)."]], "Recorded live from our projects", ""],
    realestate: [[["store-walk", "Walking through the Noyah Cosmetics virtual store.", ["#work-noyah-store", "The project"]], ["store-portal", "The Noyah Cosmetics store’s portal, opened on a New York rooftop.", ["#work-noyah-store", "The project"]],
                  ["nrf-tablet", "AR anchored to a real object, on a tablet.", ["#work-noyah-packaging", "The project"]]], "Recorded live from our projects", ""],
    manufacturing: [[["noyah-box", "The Noyah Cosmetics box springs to life when you scan it.", ["#work-noyah-packaging", "The project"]], ["nrf-tablet", "AR anchored to a real object, on a tablet.", ["#work-noyah-packaging", "The project"]],
                     ["tryon-app", "From the product page to the try-on in one tap.", ["#work-noyah-tryon", "The project"]]], "Recorded live from our projects", ""],
    education: [[["gortana", "The Living Hologram: the founder, life-like, standing on a business card.", ["#work-gortana", "The project"]], ["store-walk", "Walking through the Noyah Cosmetics virtual store.", ["#work-noyah-store", "The project"]],
                 ["mirror-live", "A live overlay that follows the person in the mirror.", ["#work-nios-mirror", "The project"]]], "Recorded live from our projects", ""]
  };
  // a list of VF's points beside another: the challenges, and what Virtual Fudge builds for them
  // a strip of real photos from the show floor partway down an industry page, where its words run longest (Vemir, 28 Oct:
  // "break up text walls"): people meeting VF's AR at its booths, captioned with the shows they were taken at
  var PLATE = {
    retail: ["awe-mirror", "nrf-demo"], cpg: ["expo-booth", "expo-team"], medicine: ["awe-scan", "nrf-talk"], sports: ["awe-crowd", "nrf-photo"],
    events: ["awe-wall", "awe-booth"], museums: ["awe-scan", "awe-mirror"], training: ["nrf-demo", "expo-front"], tourism: ["awe-booth", "nrf-talk"],
    gaming: ["awe-crowd", "awe-scan"], entertainment: ["awe-wall", "nrf-photo"], realestate: ["expo-front", "awe-booth"], manufacturing: ["expo-booth", "nrf-demo"],
    education: ["nrf-talk", "awe-crowd"]
  };
  var SHOW_SHORT = { awe: "AWE USA 2026", expo: "Expo West 2026", nrf: "NRF 2026" };
  function plate(names) {
    var found = (names || []).map(photoOf).filter(Boolean), shows = [];
    if (!found.length) return "";
    SHOWS.forEach(function (s) { if (found.some(function (f) { return f[1] === s; })) shows.push(SHOW_SHORT[s.id]); });
    return '<figure class="block-sec plate">' + gallery(found.map(function (f) { return f[0]; })) +
      "<figcaption>On the show floor at " + shows.join(" and ") + '. <a class="link" href="#shows">See the shows</a></figcaption></figure>';
  }
  function pairList(items) { return '<ul class="pair-list">' + items.map(function (i) { return "<li><h3>" + esc(i[0]) + "</h3><p>" + esc(i[1]) + "</p></li>"; }).join("") + "</ul>"; }
  // an industry: VF's page for it, in purposeful blocks (Josh, 23 Oct; Vemir, 27 Oct: "make those sections better"): why AR,
  // the challenges beside the answer, the proof, how it launches, one call to action, examples and questions
  function pageIndustry(id) {
    var d = IND[id] || {}, v = V.industries[id], body = "";
    if (!v) return hero({ title: esc(nicheName(id)) }) + '<div class="page-body">' + closing() + "</div>";
    body += sec("<h2>" + esc(v.why.title) + "</h2>" + paras(v.why.text, true) + '<p class="other">' + esc(v.why.other) + ' <a class="link" href="#industries">' + esc((v.why.btn || ["See all industries"])[0]) + "</a></p>");
    body += sec('<div class="pair"><div class="pair-ask"><h2>' + esc(v.challenges.title) + "</h2>" + paras(v.challenges.text, true) + pairList(v.challenges.items) +
      '</div><div class="pair-answer"><h2>' + esc(v.solution.title) + "</h2>" + paras(v.solution.text, true) + pairList(v.solution.items) + "</div></div>", "pair-sec");
    if (IND_FILM[id] && IND_FILM[id].length > 2) body += film(IND_FILM[id][0], IND_FILM[id][1], IND_FILM[id][2]);
    var late = !(IND_FILM[id] && IND_FILM[id].length > 2);   // the film comes after the examples: the photos go before the results
    if (late) body += plate(PLATE[id]);
    if (d.medical) {
      body += sec("<h2>" + esc(MED.buyersTitle) + "</h2>" + grid(MED.buyers));
      body += sec("<h2>" + esc(MED.stepsTitle) + '</h2><p class="lead">' + esc(MED.stepsLead) + '</p><ol class="steps">' +
        MED.steps.map(function (s, k) { return '<li><span class="step-n" aria-hidden="true">' + (k + 1) + "</span><h3>" + esc(s[0]) + "</h3><p>" + esc(s[1]) + "</p>" + (s[2] ? '<p class="signoff">' + s[2] + "</p>" : "") + "</li>"; }).join("") + "</ol>");
      body += plate(["nrf-photo", "awe-crowd"]);   // healthcare runs longest: a second strip, before the research
      body += sec("<h2>" + esc(MED.researchTitle) + '</h2><p class="lead">' + esc(MED.research) + '</p><ul class="cites">' +
        MED.cites.map(function (c) { return "<li>" + esc(c[0]) + ' <a href="' + c[1] + '" target="_blank" rel="noopener">' + c[2] + NEWTAB + "</a></li>"; }).join("") + "</ul>");
    }
    if (v.results.items.length) body += sec("<h2>" + esc(v.results.title) + "</h2>" + paras(v.results.text, true) + '<ul class="figures">' + v.results.items.map(function (r) {
      return '<li>' + (r[0] ? '<span class="fig">' + esc(r[0]) + "</span>" : "") + '<span class="fig-what">' + esc(r[1]) + '</span><span class="fig-src">Source: ' +
        (r[3] ? '<a href="' + esc(r[3]) + '" target="_blank" rel="noopener">' + esc(r[2]) + NEWTAB + "</a>" : esc(r[2])) + "</span></li>"; }).join("") + "</ul>");
    var f = v.featured;
    if (f.title) body += sec("<h2>" + esc(f.title) + "</h2>" + points(f.text) +
      (f.blockTitle ? "<h3 class=\"feat-ask\">" + esc(f.blockTitle) + "</h3>" : "") +
      f.slides.map(function (s) { return '<div class="example"><h3>' + esc(s[0]) + "</h3><p>" + esc(s[1]) + "</p>" + (s[2] ? '<p><a class="link" href="' + esc(s[2]) + '">' + esc(s[3] || "Learn more") + "</a></p>" : "") + "</div>"; }).join(""));
    if (IND_FILM[id] && IND_FILM[id].length < 3) body += film(IND_FILM[id][0], IND_FILM[id][1], "") + (id === "events" ? '<p class="after-film"><a class="link" href="#shows">See the shows we exhibited at</a></p>' : "");
    if (!late) body += plate(PLATE[id]);
    if (v.steps) body += sec("<h2>" + esc(v.steps.title) + "</h2>" + paras(v.steps.text, true) + '<ol class="steps three-steps">' + v.steps.items.map(function (s, k) {
      return '<li><span class="step-no">Step ' + (k + 1) + "</span><h3>" + esc(s[0]) + "</h3><p>" + esc(s[1]) + "</p></li>"; }).join("") + "</ol>");
    body += sec("<h2>" + esc(v.banner.title) + "</h2>" + paras(v.banner.text, true) + '<div class="acts">' + btn(v.banner.btn) + "</div>", "tagline");   // the page's one call to action, after how it launches
    body += cards(d.cases || [], "Example projects", "");
    body += faqHtml(v.faq);
    body += sec("<h2>" + esc(v.also) + '</h2><ul class="niches">' + ALSO.filter(function (a) { return a[1] !== id; }).map(function (a) {
      return '<li><a href="#for-' + a[1] + '">' + esc(a[0]) + "</a></li>"; }).join("") + "</ul>");
    body += story(v.story);   // the banner to the homepage story comes last before the form, as on the project pages
    return hero({ num: d.num, ch: d.num ? chTitle(id) : "", title: esc(v.hero.title), lede: esc(v.hero.text), acts: btn(v.hero.btn) }) + '<div class="page-body">' + body + closing() + "</div>";
  }
  function pageIndustries() {
    return hero({ title: "Industries", lede: esc(HOME.agnostic), acts: '<a class="book" href="#start">Get a quote</a>' }) +
      '<div class="page-body"><section class="block-sec"><ul class="index-list">' + NICHE_ORDER.map(function (k) {
        var t = SUB[k] || "";
        return '<li><a href="#for-' + k + '"><span class="il-num" aria-hidden="true">' + (IND[k].num || "") + '</span><span class="il-name">' + esc(nicheName(k)) +
          '</span><span class="il-line">' + esc(t) + (SHORT[k] ? '<span class="il-tags">' + esc(SHORT[k].join(", ")) + "</span>" : "") + "</span></a></li>"; }).join("") + "</ul>" +
        "</section>" + story() + closing() + "</div>";
  }
  function teamList() {
    return '<ul class="team">' + TEAM.map(function (t) { return '<li><img src="' + t[2] + '" width="76" height="76" alt="" loading="lazy" decoding="async"><span class="team-name">' + esc(t[0]) + '</span><span class="team-role">' + esc(t[1]) + "</span></li>"; }).join("") + "</ul>";
  }
  // About us: VF's homepage story in its order (About Us, the problem, the answer, the process, the stack), then the people
  // Josh, 28 Oct: "about us more dynamic right now its just a wall of text". The hero is the team itself, at its NRF booth, seen
  // as a phone's AR would see it: the frame locks on and a tag pins each name to its face (where they stand in the photo)
  var TEAM_PHOTO = { src: "/assets/events/nrf-team.jpg", w: 1600, h: 1067, alt: "Evan Muchnicki and Joshua Gordon at the Virtual Fudge booth, NRF 2026.",
    pins: [["Evan Muchnicki", "Project Manager", 29, 30, "left"], ["Joshua Gordon", "Founder and CEO", 73, 25, "right"]] };
  function teamPhoto() {
    var t = TEAM_PHOTO;
    return '<figure class="ar-photo"><div class="ar-photo-in"><img src="' + t.src + '" width="' + t.w + '" height="' + t.h + '" alt="' + esc(t.alt) + '" decoding="async">' +
      t.pins.map(function (p, k) { return '<span class="ar-pin ' + p[4] + '" style="--x:' + p[2] + "%;--y:" + p[3] + "%;--k:" + k + '" aria-hidden="true"><i></i><span class="ar-pin-tag">' + esc(p[0]) + "<small>" + esc(p[1]) + "</small></span></span>"; }).join("") +
      '<span class="finder-lock" aria-hidden="true"><span class="finder-scan"></span></span></div><figcaption class="finder-read"><span class="finder-tag"><i></i>Tracking</span><span class="finder-name">Our booth at NRF 2026</span></figcaption></figure>';
  }
  // the story VF's first website told (Josh, 6 Nov 2026: "a preview (hopfully animated too) from the about us page and then
  // allow those who want to continue"): its opening scene in a window, played by the scroll, as it was there. A hand raises a
  // phone to the mountain, the other taps it, and the one-eyed monster appears. The whole painted story is its own page,
  // /story/, ported from the old homepage; the paintings are that site's own (story/img). Under reduced motion it stands still
  // at its last moment
  var PEEK = "/story/img/";
  function peekImg(n, w, cls, sizes) {
    return '<img class="' + cls + '" src="' + PEEK + n + '.webp" srcset="' + PEEK + n + "-mobile.webp " + Math.round(w / 2) + "w, " + PEEK + n + ".webp " + w + 'w" sizes="' + sizes +
      '" alt="" loading="lazy" decoding="async">';
  }
  // the whole window is the way in, and its button stands on the painting from the start (Josh, 6 Nov: "VERY unclear one
  // should click in ... calling people's attention to it, which should be the main thing")
  function storyPeek() {
    return '<div class="peek"><a class="peek-win" href="/story/"><span class="peek-scene" aria-hidden="true">' +
      peekImg("sky", 2091, "pk-sky", "(max-width: 760px) 100vw, 1200px") + peekImg("main-mount", 2273, "pk-mount", "(max-width: 760px) 90vw, 700px") +
      peekImg("clouds", 1920, "pk-clouds", "(max-width: 760px) 120vw, 1300px") +
      '<span class="pk-phone"><span class="pk-screen"><span class="pk-lens"></span>' + peekImg("hand-phone-cyclop", 563, "pk-cyclop", "(max-width: 760px) 30vw, 200px") + "</span>" +
      peekImg("hand-phone", 900, "pk-hand", "(max-width: 760px) 45vw, 400px") + "</span>" + peekImg("left-hand", 900, "pk-tap", "(max-width: 760px) 40vw, 360px") +
      '</span><span class="peek-call"><span class="peek-line">The story our first website told, in paintings.</span> ' +
      '<span class="peek-go"><svg viewBox="0 0 16 16" aria-hidden="true" focusable="false"><path d="M4.5 2.8v10.4L13 8z"/></svg>Play the whole story</span></span>' +
      '<span class="finder-lock" aria-hidden="true"><span class="finder-scan"></span></span></a></div>';
  }
  function pageStudio() {
    return hero({ title: esc(HOME.about.title), lede: esc(HOME.about.text), lede2: esc(REQUIRED), acts: '<a class="book" href="#start">' + esc(HOME.about.btn) + "</a>" + BOOK })
        .replace(/<\/section>$/, teamPhoto() + "</section>").replace('<section class="page-hero">', '<section class="page-hero has-photo">') +
      '<div class="page-body">' + sec(storyPeek(), "peek-sec") +
      sec("<h2>" + esc(HOME.problem.title) + "</h2>" + grid(HOME.problem.items) + '<p class="lead after-grid">' + esc(HOME.problem.close) + "</p>") +
      sec("<h2>" + esc(HOME.fly.title) + '</h2><p class="lead">' + esc(HOME.fly.text) + "</p>") +
      sec("<h2>" + esc(HOME.process.title) + '</h2><p class="lead">' + esc(HOME.process.sub) + '</p><ol class="steps">' + HOME.process.steps.map(function (s, k) {
        return '<li><span class="step-n" aria-hidden="true">' + (k + 1) + "</span><h3>" + esc(s[0]) + "</h3><p>" + esc(s[1]) + "</p></li>"; }).join("") + "</ol>") +
      sec('<h2>Tech stack</h2><ul class="data">' + STACK.map(function (t) { return "<li>" + esc(t) + "</li>"; }).join("") + '</ul><p class="note">And much more.</p>') +
      sec("<h2>Meet the team</h2>" + MISSION.map(function (p, k) { return "<p" + (k ? "" : ' class="lead"') + ">" + esc(p) + "</p>"; }).join("") +
        "<p>Between us, we bring years of experience in AI, medicine, CPG, and beauty.</p>" + teamList() +
        '<blockquote class="quote"><p>“' + esc(FOUNDER[0]) + '”</p><footer>' + esc(FOUNDER[1]) + "</footer></blockquote>") +
      sec("<h2>On the show floor</h2><p class=\"lead\">In 2026 we took our AR on the road to NRF, Expo West and AWE USA, with four live activations at AWE alone. At NRF, TV Tokyo’s World Business Satellite stopped by to film our booth and interview Josh.</p>" +
        gallery([["img", "nrf-demo", 1600, 1067, "The team demoing at the Virtual Fudge booth, NRF 2026."], ["img", "awe-crowd", 1600, 1200, "Visitors at our booth at AWE USA 2026, talking with the team."],
                 ["img", "expo-team", 1600, 1408, "The team at the Virtual Fudge booth, Expo West 2026."]]) +
        "<p class=\"after-film\"><a class=\"link\" href=\"#shows\">Photos and film from all three</a></p>") +
      sec("<h2>How we can work together</h2>" + grid(WAYS)) +
      sec("<h2>Partnerships & memberships</h2>" + grid(PARTNERS) + '<p>Hardware makers, agencies, integrators and venues, come say hi: <a class="link" href="mailto:' + STUDIO.partners + '">' + STUDIO.partners + "</a></p>") +
      sec("<h2>Why a small studio?</h2><p class=\"lead\">Bigger isn’t always better, and we wrote down why.</p><p><a class=\"link\" href=\"#blog-small-ar-studio-advantages\">" + esc((postBy("small-ar-studio-advantages") || { title: "On our blog" }).title) + "</a></p>") +
      story() + closing() + "</div>";
  }
  // the shows VF exhibited at, newest first. Dates and venues from the organizers (AWE from VF's press release; NRF and
  // Expo West checked 8 Oct 2026); what was shown from VF's press release, its NRF blog post, and the footage itself.
  // Fast Company Festival and Advertising Week (Drive, 2025) look like attendance, not a booth, so they stay off.
  // VF's site has no events page: the words are new, in its voice.
  var SHOWS = [
    { id: "awe", name: "AWE USA 2026", when: "15 – 18 June 2026", where: "Long Beach Convention Center, booth 1235",
      lead: "Four live activations at the world’s largest XR event. And yes, that’s a chocolate fountain.", awe: true, quote: true,
      items: [["img", "awe-wall", 1200, 1600, "The Virtual Fudge booth at AWE USA 2026: the LED wall, the chocolate fountain and the red plinths."],
              ["clip", "awe-fountain", 676, 1200, "The chocolate fountain in front of the LED wall."],
              ["img", "awe-booth", 1600, 1200, "The whole booth from the aisle."],
              ["img", "awe-crowd", 1600, 1200, "Visitors at the booth, talking with the team."],
              ["img", "awe-mirror", 1200, 1600, "The Magic Mirror, running on the show floor."],
              ["clip", "awe-mirror", 1280, 720, "Visitors trying the Magic Mirror."],
              ["img", "awe-scan", 1600, 1200, "A visitor scanning a demo with a phone."]] },
    { id: "expo", name: "Natural Products Expo West 2026", when: "3 – 6 March 2026", where: "Anaheim Convention Center",
      lead: "North America’s largest natural and organic products show. We brought our own booth, and our AR packaging demo ran on tablets for every CPG brand that stopped by.",
      items: [["img", "expo-team", 1600, 1408, "The team at the Virtual Fudge booth, Expo West 2026."],
              ["img", "expo-booth", 1600, 1200, "The booth: Bespoke Augmented Reality Studio, Immersion that Converts."],
              ["clip", "expo-booth", 676, 1200, "Walking through the booth."],
              ["img", "expo-front", 1600, 1200, "The front of the booth."]] },
    { id: "nrf", name: "NRF 2026: Retail’s Big Show", when: "11 – 13 January 2026", where: "Javits Center, New York",
      lead: "Three of our builds under one roof: the Magic Mirror, the Noyah Cosmetics try-on and Gortana, our holographic business card.",
      post: ["What we took home from NRF, on our blog", "#blog-augmented-reality-retail-nrf-2026"], tv: true,
      items: [["img", "nrf-demo", 1600, 1067, "The team demoing at the Virtual Fudge booth, NRF 2026."],
              ["clip", "nrf-mirror", 676, 1200, "The Magic Mirror at the booth, with its Try Me knob."],
              ["img", "nrf-talk", 1600, 1067, "A visitor trying a demo on a phone."],
              ["img", "nrf-photo", 1600, 1067, "Demoing at the booth."],
              ["clip", "nrf-tablet", 676, 1200, "The AR packaging demo on a tablet."],
              ["img", "nrf-team", 1600, 1067, "At the booth, NRF 2026."]] }
  ];
  // TV Tokyo's World Business Satellite at NRF 2026: the segment as the reel carries it (a phone recording of the broadcast),
  // with its sound, played only on request. Its caption is translated from the Japanese on screen. Shown with Vemir's OK (8 Oct).
  var TV = '<div class="press"><figure class="press-clip"><video class="press-video" controls playsinline preload="none" poster="' + MEDIA + 'tv-wbs.jpg" data-src="' + MEDIA + 'tv-wbs.mp4" ' +
    'aria-label="TV Tokyo’s World Business Satellite at the Virtual Fudge booth, NRF 2026"></video></figure>' +
    '<div class="press-text"><h3>On TV Tokyo’s World Business Satellite</h3><p>Reporting on AI shopping from NRF 2026, WBS stopped by our booth: the Noyah Cosmetics virtual store on a tablet, and an interview with Josh.</p>' +
    '<p class="press-quote">“Product information in its own virtual space, showing customers a product’s world and what sets it apart.”</p><p class="press-src">WBS’s on-screen caption, translated from the Japanese. 53 seconds, with sound.</p></div></div>';
  function pageShows() {
    return hero({ title: "On the show floor", lede: "In 2026 we packed up our own booth for three of the biggest shows in the business and let people try every build for themselves.", acts: REEL_BTN + '<a class="book" href="#start">Get a quote</a>' }) +
      '<div class="page-body">' + SHOWS.map(function (s) {
        return '<section class="block-sec show" id="show-' + s.id + '" aria-labelledby="h-' + s.id + '"><h2 id="h-' + s.id + '">' + esc(s.name) + "</h2>" +
          '<p class="show-when">' + s.when + "<span>" + esc(s.where) + '</span></p><p class="lead">' + esc(s.lead) + "</p>" +
          (s.awe ? '<div class="four">' + AWE.map(function (a) { return "<div><h3>" + esc(a[0]) + "</h3><p>" + esc(a[1]) + "</p>" + (a[2] ? '<p><a class="link" href="' + a[2] + '">Learn more</a></p>' : "") + "</div>"; }).join("") + "</div>" : "") +
          gallery(s.items) +
          (s.tv ? TV : "") +
          (s.quote ? '<blockquote class="quote"><p>“' + esc(FOUNDER[0]) + '”</p><footer>' + esc(FOUNDER[1]) + "</footer></blockquote>" : "") +
          (s.post ? '<p class="after-film"><a class="link" href="' + s.post[1] + '">' + esc(s.post[0]) + "</a></p>" : "") + "</section>";
      }).join("") +
      sec("<h2>Bring it to your booth</h2><p class=\"lead\">One thing people stop for in the three seconds they give you, a scan that doubles as the sign-up, and an experience that goes home on their phone. Let’s build yours.</p>" +
        '<div class="acts"><a class="book" href="#start">Get a quote</a><a class="link" href="#for-events">AR in marketing</a></div>') + "</div>";
  }
  function tagLine(tags) { return tags.map(function (t, k) { return k && !/^[A-Z]{2}/.test(t) ? t.charAt(0).toLowerCase() + t.slice(1) : t; }).join(", "); }
  // meta in plain words, commas between (the brief: no middle-dot meta strings); a date or a reading time never breaks across lines
  function nw(t) { return '<span class="nw">' + t + "</span>"; }
  function readTime(p) { return nw(p.minutes + " min read"); }
  function postMeta(p) { return esc(p.category) + ", " + nw(day(p.date)) + ", " + readTime(p); }
  // A card crops its cover to 3:2, so the picture is drawn 1.58 times the card's width (mostly 450 to 710 css px), the
  // lead card up to 1013: covers wider than 1080 px offer the 640 and 1080 px copies tools/make-blog-cards.sh
  // makes, and the sizes below (measured 10 Nov 2026 from 320 to 2560 px windows) let the browser take the smallest sharp one.
  function cardSrcset(p, lead) {
    if (p.hero[1] <= 1080) return "";
    var b = p.hero[0].replace(/^\/assets\/blog\//, "/assets/blog/card/").replace(/\.jpg$/, "");
    return '" srcset="' + b + "-640.jpg 640w, " + b + "-1080.jpg 1080w, " + p.hero[0] + " " + p.hero[1] + 'w" sizes="' +
      (lead ? "(max-width: 1099px) 93vw, (max-width: 1299px) 54vw, (max-width: 1599px) 685px, 815px"
            : "(max-width: 640px) 146vw, (max-width: 1099px) 71vw, (max-width: 1299px) 46vw, (max-width: 1599px) 590px, 705px");
  }
  function postCard(p, lead) {
    return '<li class="post-card' + (lead ? " lead-post" : "") + '"><a href="#blog-' + p.slug + '">' +
      (p.hero ? '<span class="post-pic"><img src="' + p.hero[0] + cardSrcset(p, lead) + '" width="' + p.hero[1] + '" height="' + p.hero[2] + '" alt="" loading="' + (lead ? "eager" : "lazy") + '" decoding="async"></span>' : "") +
      '<span class="post-text"><span class="post-meta">' + postMeta(p) + '</span><span class="post-title">' + esc(p.title) + '</span><span class="post-line">' + esc(p.desc) + "</span></span></a></li>";
  }
  function pageJournal() {
    return hero({ title: esc(HOME.blog.title), lede: "Fresh out of the fudge kitchen: notes on AR, packaging, retail and everything in between.", acts: '<a class="book" href="#start">Get a quote</a>' }) +
      '<div class="page-body"><section class="block-sec blog-sec" aria-label="Posts"><ul class="post-grid">' + BLOG.map(function (p, k) { return postCard(p, k === 0); }).join("") + "</ul></section>" +
      closing() + "</div>";   // (the footer's newsletter form follows: the page's own was a second one, 10 Nov review)
  }
  // one post: VF's words as published, in this site's reading column; links out open in a new tab
  function block(b) {
    switch (b[0]) {
      case "p": return "<p>" + b[1] + "</p>";
      case "h": return "<h" + b[1] + ">" + b[2] + "</h" + b[1] + ">";
      case "ul": case "ol": return "<" + b[0] + ">" + b[1].map(function (i) { return "<li>" + i + "</li>"; }).join("") + "</" + b[0] + ">";
      case "hr": return '<hr>';
      case "quote": return "<blockquote><p>" + b[1] + "</p></blockquote>";
      case "img": return '<figure class="post-fig"><img src="' + b[1] + '" width="' + b[2] + '" height="' + b[3] + '" alt="' + esc(b[4]) + '" loading="lazy" decoding="async">' + (b[5] ? "<figcaption>" + b[5] + "</figcaption>" : "") + "</figure>";
      // VF's AR, MR and VR diagram, set as text (20 Oct): the umbrella term over its three kinds, from low immersion to high
      case "xr": return '<figure class="post-xr"><p class="xr-axis"><span><span class="xr-arr" aria-hidden="true">←</span> ' + esc(b[1]) + '</span><span>' + esc(b[2]) + ' <span class="xr-arr" aria-hidden="true">→</span></span></p>' +
        '<p class="xr-top"><strong>' + esc(b[3][0]) + "</strong>" + esc(b[3][1]) + '</p><ul class="xr-three">' +
        b[4].map(function (k) { return "<li><strong>" + esc(k[0]) + "</strong>" + esc(k[1]) + "</li>"; }).join("") + "</ul></figure>";
      case "gallery": return '<div class="post-gallery">' + b[1].map(function (i) { return '<figure style="--r:' + (i[1] / i[2]).toFixed(4) + '"><img src="' + i[0] + '" width="' + i[1] + '" height="' + i[2] + '" alt="' + esc(i[3]) + '" loading="lazy" decoding="async"></figure>'; }).join("") + "</div>";
      case "table": return '<div class="post-table" tabindex="0" role="region" aria-label="Table"><table>' + (b[1].length ? "<thead><tr>" + b[1].map(function (c) { return '<th scope="col">' + c + "</th>"; }).join("") + "</tr></thead>" : "") +
        "<tbody>" + b[2].map(function (r) { return "<tr>" + r.map(function (c, k) { return '<td data-label="' + esc((b[1][k] || "").replace(/<[^>]+>/g, "")) + '">' + c + "</td>"; }).join("") + "</tr>"; }).join("") + "</tbody></table></div>";
    }
    return "";
  }
  // pictures beside a long post, so it never reads as a wall of words (Vemir, 28 Oct): VF's own recordings, its show-floor
  // photos and the homepage's block of fudge, each chosen for the post's subject and captioned with what it truly shows. On
  // a wide screen they stand in the margin beside the column; narrower, they sit between its sections. A post gets about one
  // for every 2,600 characters, set evenly at its headings. [kind, name, words]: a clip (CLIP_CAP), a photo from the shows
  // (its own words) or the block (the industry it becomes on the homepage)
  var CLIP_CAP = {
    "noyah-box": ["Scan the box, and a flower blooms right over the Brooklyn Bridge.", "#work-noyah-packaging"],
    "noyah-bloom": ["Same box, different table: the story springs out wherever you are.", "#work-noyah-packaging"],
    "nrf-tablet": ["The Noyah Cosmetics box on a tablet at our booth, NRF 2026.", "#work-noyah-packaging"],
    "tryon-face": ["The Noyah Cosmetics try-on, on a real face.", "#work-noyah-tryon"],
    "tryon-app": ["From the product page to the try-on in one tap.", "#work-noyah-tryon"],
    "store-walk": ["Walking through the Noyah Cosmetics virtual store.", "#work-noyah-store"],
    "store-portal": ["The Noyah Cosmetics store’s portal, opened on a New York rooftop.", "#work-noyah-store"],
    "mirror-live": ["The Magic Mirror, live: hair on, hair off.", "#work-nios-mirror"],
    "nrf-mirror": ["The Magic Mirror at our booth, NRF 2026, with its Try Me knob.", "#work-nios-mirror"],
    "gortana": ["The Living Hologram: the founder, life-like, standing on a business card.", "#work-gortana"],
    "awe-fountain": ["Our booth at AWE USA 2026 (yes, that’s a chocolate fountain).", "#show-awe"]
  };
  var BLOCK_CAP = { cpg: "poured into a carton", retail: "set out on a shelf", museums: "carved into a bust", events: "built into an archway" };
  var ASIDES = {
    "ar-product-packaging": [["clip", "noyah-box"], ["block", "cpg"], ["clip", "noyah-bloom"], ["clip", "nrf-tablet"]],
    "augmented-reality-education": [["clip", "gortana"], ["photo", "awe-scan", "A visitor scanning one of our demos with a phone, AWE USA 2026."], ["block", "museums"], ["clip", "nrf-tablet"]],
    "difference-ar-mr-vr-xr": [["clip", "gortana"], ["clip", "mirror-live"], ["clip", "store-walk"]],
    "agentic-commerce-ar": [["clip", "tryon-app"], ["block", "retail"], ["clip", "store-walk"]],
    "augmented-reality-retail-nrf-2026": [["clip", "nrf-mirror"], ["photo", "nrf-talk", "A visitor trying one of our demos on a phone, NRF 2026."], ["clip", "nrf-tablet"]],
    "ar-customer-education": [["clip", "noyah-box"], ["block", "cpg"], ["clip", "tryon-face"]],
    "benefits-ar-architecture": [["clip", "store-portal"], ["clip", "store-walk"]],
    "xr-trends-a-glimpse-into-the-future": [["clip", "mirror-live"], ["clip", "store-walk"]],
    "choosing-an-xr-agency": [["photo", "nrf-demo", "The team demoing at the Virtual Fudge booth, NRF 2026."], ["clip", "gortana"]],
    "how-ar-can-help-create-engaging-product-demos": [["clip", "noyah-box"], ["clip", "tryon-app"]],
    "virtual-try-ons-ar": [["clip", "tryon-face"], ["clip", "tryon-app"]],
    "top-ar-niches": [["clip", "tryon-face"], ["clip", "mirror-live"]],
    "kpis-xr-marketing-campaign": [["clip", "awe-fountain"], ["block", "events"]],
    "small-ar-studio-advantages": [["photo", "expo-team", "The team at the Virtual Fudge booth, Expo West 2026."]]
  };
  // a show-floor photo by name: [the gallery item, its show]
  function photoOf(name) {
    for (var i = 0; i < SHOWS.length; i++) for (var j = 0; j < SHOWS[i].items.length; j++) if (SHOWS[i].items[j][0] === "img" && SHOWS[i].items[j][1] === name) return [SHOWS[i].items[j], SHOWS[i]];
    return null;
  }
  function aside(a) {
    if (a[0] === "clip") { var c = CLIP_CAP[a[1]]; return clip(a[1], c[0], [c[1], c[1].indexOf("#show") === 0 ? "See the show" : "The project"]).replace('<figure class="clip', '<figure class="aside clip'); }
    if (a[0] === "photo") { var f = photoOf(a[1]); if (!f) return "";
      return '<figure class="aside aside-photo"><img src="/assets/events/' + a[1] + '.jpg" width="' + f[0][2] + '" height="' + f[0][3] + '" alt="' + esc(a[2]) + '" loading="lazy" decoding="async">' +
        "<figcaption>" + esc(a[2]) + ' <a class="link" href="#show-' + f[1].id + '">See the show</a></figcaption></figure>'; }
    var name = (ALSO.filter(function (x) { return x[1] === a[1]; })[0] || [""])[0];
    return '<figure class="aside aside-block"><img src="/assets/stills/' + a[1] + '.jpg" width="1200" height="1200" alt="" loading="lazy" decoding="async">' +
      "<figcaption>The block of fudge from our homepage, " + BLOCK_CAP[a[1]] + '. <a class="link" href="#for-' + a[1] + '">' + esc(name) + "</a></figcaption></figure>";
  }
  // the post's blocks with its pictures set in, and its opening paragraph marked for the drop cap
  function postBody(p) {
    var list = ASIDES[p.slug] || [], at = [], total = 0, heads = [], put = {}, last = -1, opener = -1;
    p.body.forEach(function (b, i) {
      at.push(total); total += JSON.stringify(b).replace(/<[^>]+>/g, "").length;
      if (b[0] === "h" && i > 0) heads.push(i);
      if (opener === -1 && b[0] === "h") opener = -2;   // the drop cap opens the post: never under a heading
      if (opener === -1 && b[0] === "p" && !/^</.test(b[1])) opener = b[1].replace(/<[^>]+>/g, "").length >= 160 ? i : -2;   // the first paragraph, when it runs past three lines
    });
    var n = Math.min(list.length, Math.max(1, Math.round(total / 2600)));
    for (var k = 0; k < n; k++) {
      var goal = total * (k + 1) / (n + 1), best = -1;
      heads.forEach(function (i) { if (i > last && (best < 0 || Math.abs(at[i] - goal) < Math.abs(at[best] - goal))) best = i; });
      if (best < 0) break;
      put[best] = aside(list[k]); last = best;
    }
    return p.body.map(function (b, i) { return (put[i] || "") + (i === opener ? block(b).replace("<p>", '<p class="opener">') : block(b)); }).join("");
  }
  function pagePost(p) {
    var body = postBody(p).replace(/<a href="(https?:\/\/[^"]+)">([\s\S]*?)<\/a>/g, '<a href="$1" target="_blank" rel="noopener">$2' + NEWTAB + "</a>");
    var more = BLOG.filter(function (o) { return o.slug !== p.slug && o.category === p.category; })
      .concat(BLOG.filter(function (o) { return o.slug !== p.slug && o.category !== p.category; })).slice(0, 3);
    return '<section class="page-hero post-hero"><div class="col"><p class="over"><a href="#blog">' + esc(HOME.blog.title) + "</a>: " + esc(p.category) + "</p>" +
      '<h1 class="display" tabindex="-1">' + esc(p.title) + '</h1><p class="post-byline">' + (p.author ? "By " + esc(p.author) + ", " : "") +
      '<time datetime="' + p.date + '">' + nw(day(p.date)) + "</time>, " + readTime(p) + "</p></div></section>" +
      '<div class="page-body post-body">' + (p.hero ? '<figure class="post-lead"><img src="' + p.hero[0] + '" width="' + p.hero[1] + '" height="' + p.hero[2] + '" alt="' + esc(p.hero[3]) + '" decoding="async"></figure>' : "") +
      '<article class="post">' + body + "</article>" +
      '<section class="block-sec more-posts"><h2>Keep reading</h2><ul class="post-grid">' + more.map(function (o) { return postCard(o, false); }).join("") + '</ul><p><a class="link" href="#blog">All posts</a></p></section>' +
      closing() + "</div>";
  }
  // an address may break after its @ when a column is narrower than it ("partnerships@ / virtualfudge.com"), never mid-word
  function addr(a) { return esc(a).replace("@", "@<wbr>"); }
  function pageContact() {
    return hero({ title: "Say hi", lede: "Tell us briefly what you want, and we’ll let you know if we can help. Fastest way in? Book a call.", acts: BOOK + '<a class="link" href="#start">Get a quote</a>' }) +
      '<div class="page-body"><section class="block-sec"><h2 class="sr">How to reach us</h2><div class="three contact">' +
      '<div><h3>Write</h3><p><a class="link" href="mailto:' + STUDIO.email + '">' + addr(STUDIO.email) + "</a></p></div>" +
      '<div><h3>Call</h3><p><a class="link" href="tel:' + STUDIO.tel + '">' + STUDIO.phone + "</a></p></div>" +
      "<div><h3>Visit</h3><address>" + STUDIO.address.join("<br>") + "</address></div></div></section>" +
      sec("<h2>Who you’ll talk to</h2>" + teamList()) +
      // careers, press and partners side by side, each address the same size as the studio's own
      sec('<h2 class="sr">More ways in</h2><div class="three contact"><div><h3>Careers</h3><p><a class="link" href="mailto:' + STUDIO.careers + '">' + addr(STUDIO.careers) + '</a></p></div>' +
        '<div><h3>Press</h3><p><a class="link" href="mailto:' + STUDIO.press + '">' + addr(STUDIO.press) + "</a></p></div>" +
        '<div><h3>Partners</h3><p><a class="link" href="mailto:' + STUDIO.partners + '">' + addr(STUDIO.partners) + '</a></p><p class="contact-note">Hardware makers, creative and marketing agencies, integrators and venues: let’s make something sweet together.</p></div></div>') +
      sec("<h2>Let’s talk AR!</h2><p class=\"lead\">Looking to create a project, collaborate, join our team, or anything else?</p><div class=\"acts\"><a class=\"book\" href=\"#start\">Get a quote</a><a class=\"link\" href=\"#careers\">Join the team</a></div>") +
      sec('<h2>Elsewhere</h2><ul class="social">' + STUDIO.socials.map(function (s) { return '<li><a href="' + s[1] + '" target="_blank" rel="noopener">' + s[0] + NEWTAB + "</a></li>"; }).join("") + "</ul>") + "</div>";
  }

  // VF's three forms: its "Let's talk AR!" pop-up on virtualfudge.com, word for word (read 15 Oct 2026), in this site's type.
  // VF's own forms post to its WordPress behind a captcha, so here "Submit" opens the visitor's email app with the form filled
  // in: project quotes to partnerships@, general questions to hi@, careers to careers@ (the routing in VF's "Website Form
  // Structure", the kit's docs/source/drive/forms-spec.md). Its longer multi-step quote form, as v42 ran it, is kept in
  // docs/source/forms-multistep-v42.js for when VF launches it.
  // the newsletter: VF's own form words ("subscribe to our email newsletter", "Email address", "Subscribe"), on this site.
  // Subscribe posts the address to VF's Brevo form (STUDIO.newsletter; Brevo answers {success, message} and lets this site read
  // it), which sends the double opt-in email; if that fails, the status line offers Brevo's own sign-up page. With no link
  // set, it opens the visitor's email app addressed to the studio, like the forms.
  function newsForm(id) {
    return '<form class="news-form" novalidate><label for="' + id + '">Subscribe to our email newsletter</label><div class="news-field">' +
      '<input id="' + id + '" type="email" name="email" placeholder="Email address" autocomplete="email" required><button type="submit" class="book">Subscribe</button></div>' +
      '<p class="news-status" role="status"></p></form>';
  }
  function newsSection() { return sec(newsForm("news-" + Math.random().toString(36).slice(2, 7)), "news-sec"); }
  document.addEventListener("submit", function (e) {
    var f = e.target.closest && e.target.closest(".news-form"); if (!f) return;
    e.preventDefault();
    var input = $("input", f), st = $(".news-status", f), v = input.value.trim();
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v)) { st.textContent = "Please check your email address."; input.setAttribute("aria-invalid", "true"); input.focus(); return; }
    input.removeAttribute("aria-invalid");
    if (STUDIO.newsletter && window.fetch && window.FormData) {
      var btn = $("button", f), data = new FormData();
      data.append("EMAIL", v); data.append("email_address_check", ""); data.append("locale", "en");   // Brevo's own fields
      btn.disabled = true; st.textContent = "Signing you up…";
      fetch(STUDIO.newsletter, { method: "POST", body: data, headers: { Accept: "application/json" } })
        .then(function (r) { return r.json(); })
        .then(function (j) {
          if (!j || !j.success) throw new Error("not accepted");
          st.textContent = "Thank you! Check your inbox and click the link to confirm your subscription.";
          input.value = "";
        })
        .catch(function () {
          st.innerHTML = 'That didn’t go through. Please try again, or use <a class="link" href="' + esc(STUDIO.newsletter) +
            '" target="_blank" rel="noopener">our sign-up page</a>.';
        })
        .then(function () { btn.disabled = false; });
      return;
    }
    location.href = "mailto:" + STUDIO.email + "?subject=" + encodeURIComponent("Newsletter") + "&body=" + encodeURIComponent("Please add me to the Virtual Fudge newsletter: " + v + "\n");
    st.textContent = "Your email app opened with your address. Send it, and you’re on the list.";
  });
  document.addEventListener("input", function (e) { if (e.target.closest && e.target.closest(".news-form")) e.target.removeAttribute("aria-invalid"); });
  var FORMS = [
    { id: "quote", tab: "Get a quote", pick: "Tell us about your project, budget and timeline. Attach a brief if you have one.", title: "Get a quote", subject: "Project quote", to: "partners", send: "Submit",
      lead: "Thank you for your interest in building with us at Virtual Fudge. We look forward to working with you! Please fill out this form to the best of your ability, and we will get back to you shortly.",
      done: "Thank you for your interest in collaborating with us at Virtual Fudge! We will review and get back to you shortly. (Your email app opened with your answers: send it to reach us.)",
      fields: [["First name", "text", 1, "given-name", null, null, "First name"], ["Last name", "text", 1, "family-name", null, null, "Last name"],
               ["Company name", "text", 1, "organization", null, null, "Company name or N/A"], ["Phone", "tel", 1, "tel", null, null, "Phone"],
               ["Email", "email", 1, "email", null, null, "Email"], ["Website", "url", 0, "url", null, null, "Website"],
               ["Location", "text", 0, "street-address", null, null, "Address"], ["Project budget (estimated)", "text", 1, "", null, null, "A rough, wide range is fine."],
               ["Describe your project", "area", 1, "", null, null, "Briefly describe scope, goals, key deliverables"],
               ["What is your project’s timeline or deadline?", "select", 1, "", ["Within 3 months", "3 to 6 months", "6 to 12 months", "Over a year or multi-year", "Not sure yet", "Other"]],
               ["If “Other,” please specify", "text", 0, "", null, "What is your project’s timeline or deadline?=Other", "Other timeline"],
               ["@attach"],   // VF's place for the attachments: before "How did you find us?"
               ["How did you find us?", "text", 1, "", null, null, "e.g., Google, LinkedIn, Referral"]],
      attach: { label: "Feel free to attach any documents relevant to your project.", button: "Choose files", multiple: true, required: false, maxMB: 20,
        accept: ".pdf,.doc,.docx,.txt,.pages,.jpg,.jpeg,.png,.gif,.mp4,.mov,.mp3,.wav,.zip",
        note: "Max 20 MB. Allowed formats: PDF, DOC, DOCX, TXT, PAGES, JPG, JPEG, PNG, GIF, MP4, MOV, MP3, WAV, ZIP. For large files (3D models, hi-res video, PSD/AI) upload to a cloud service and paste the link in your description." } },
    { id: "general", tab: "Ask a question", pick: "Anything else, big or small.", title: "General inquiry", subject: "General inquiry", to: "email", send: "Send",
      done: "Your email app opened with your message. Send it, and we’ll get back to you.",
      fields: [["First name", "text", 1, "given-name", null, null, "First name"], ["Last name", "text", 0, "family-name", null, null, "Last name"],
               ["Email address", "email", 1, "email", null, null, "Email address"], ["Phone number", "tel", 0, "tel", null, null, "Phone number"], ["Message", "area", 1, "", null, null, "Message"]] },
    { id: "careers", tab: "Join the team", pick: "Send us your resume.", title: "Interested in working with us?", subject: "Careers", to: "careers", send: "Submit",
      lead: "We’re always looking for great people. Drop your resume below, and we’ll keep you in mind for future roles.",
      done: "Your email app opened with your details. Attach your resume and send it: our team will review your qualifications and keep your profile on file for future openings.",
      fields: [["Full name", "text", 1, "name", null, null, "Full name"], ["Email address", "email", 1, "email", null, null, "Email address"],
               ["@attach"],   // VF asks for the résumé right after the email address
               ["LinkedIn profile", "url", 0, "url", null, null, "LinkedIn profile"], ["Message", "area", 0, "", null, null, "Message"]],
      attach: { label: "Attach resume/CV", button: "Choose file", multiple: false, required: true, maxMB: 5, accept: ".pdf,.docx,.doc", note: "Max 5 MB. Allowed formats: PDF, DOCX, DOC." } }
  ];
  function fieldHtml(f, d, k) {
    var id = f.id + "-" + k, req = d[2] ? " required" : "", name = esc(d[0]), ac = d[3] ? ' autocomplete="' + d[3] + '"' : "";
    var cond = d[5] ? ' data-when="' + esc(d[5]) + '" hidden' : "", ph = d[6] ? ' placeholder="' + esc(d[6]) + '"' : "";
    var lab = '<label for="' + id + '">' + name + (d[2] ? " *" : "") + "</label>";
    var ctl = d[1] === "area" ? '<textarea id="' + id + '" name="' + name + '" rows="5" maxlength="2000"' + ph + req + "></textarea>"
      : d[1] === "select" ? '<select id="' + id + '" name="' + name + '"' + req + '><option value="">Please choose an option</option>' + d[4].map(function (t) { return "<option>" + esc(t) + "</option>"; }).join("") + "</select>"
      : '<input id="' + id + '" name="' + name + '" type="' + d[1] + '"' + ac + ph + req + ">";
    return '<div class="vf-field' + (d[1] === "area" ? " wide" : "") + '"' + cond + ">" + lab + ctl + "</div>";
  }
  // VF's attachment field: a button (or drop the files on it), the chosen files listed with their size, and VF's limits
  function attachHtml(f) {
    var a = f.attach, id = f.id + "-files";
    return '<div class="vf-field wide vf-attach" data-max="' + a.maxMB + '" data-accept="' + a.accept + '">' +
      '<label class="vf-attach-label" for="' + id + '">' + esc(a.label) + (a.required ? " *" : "") + "</label>" +
      '<label class="vf-drop" for="' + id + '"><input type="file" id="' + id + '" name="' + esc(a.label) + '" accept="' + a.accept + '"' + (a.multiple ? " multiple" : "") + (a.required ? " required" : "") +
      ' aria-describedby="' + id + '-note"><span class="vf-drop-btn">' + a.button + '</span><span class="vf-drop-hint">or drop ' + (a.multiple ? "them" : "it") + " here</span></label>" +
      '<ul class="vf-file-list"></ul><p class="note vf-attach-note" id="' + id + '-note">' + esc(a.note) + "</p></div>";
  }
  function formHtml(f, on) {
    var to = STUDIO[f.to], k = 0;
    return '<form class="vf-form" id="form-' + f.id + '" data-subject="' + f.subject + '" data-to="' + to + '" data-done="' + esc(f.done) + '" novalidate' + (on ? "" : " hidden") + '><h2>' + esc(f.title) + "</h2>" + (f.lead ? '<p class="lead">' + esc(f.lead) + "</p>" : "") +
      '<div class="vf-fields">' + f.fields.map(function (d) { return d[0] === "@attach" ? attachHtml(f) : fieldHtml(f, d, k++); }).join("") + "</div>" +
      '<div class="vf-final">' +
      '<div class="acts"><a class="book vf-send" href="mailto:' + to + '">' + f.send + '</a><span class="vf-status" role="status"></span></div>' +
      '<div class="vf-after" hidden><p class="lead"></p><div class="acts">' + BOOK + "</div></div>" +
      '<p class="vf-alt">Or write to <a class="link" href="mailto:' + to + '">' + to + "</a>.</p></div></form>";
  }
  // Start: the three ways in, each a card that says what it is for; #careers opens it on the careers form (Vemir, 19 Oct)
  // the top of Start and of Careers (one page, two addresses): its title, line and button follow the choice below
  var START_TOP = { start: ["Let’s talk AR!", "What would you like to do today?", BOOK + '<button type="button" class="link" data-see-options>Choose your option</button>'],   // the second act goes to the cards below: a quote-seeker saw only this first screen and had to guess the rest was there (30 Oct audit)
    careers: ["Careers", "Send us your resume, or choose another option below.", '<a class="link" href="#studio">Meet the team</a>'] };
  function pageStart(pick) {
    var on = FORMS.some(function (f) { return f.id === pick; }) ? pick : "quote";
    var top = START_TOP[on === "careers" ? "careers" : "start"];
    return hero({ title: top[0], lede: top[1], acts: top[2] }) +
      '<div class="page-body"><section class="block-sec"><p class="choose-label" id="choose-label">Choose your option:</p><div class="vf-choose" role="group" aria-labelledby="choose-label">' + FORMS.map(function (f) {
        return '<button type="button" class="vf-tab" data-form="' + f.id + '" aria-pressed="' + (f.id === on) + '"><span class="vf-tab-title">' + esc(f.tab) + '</span><span class="vf-tab-text">' + esc(f.pick) + "</span></button>"; }).join("") + "</div>" +
      FORMS.map(function (f) { return formHtml(f, f.id === on); }).join("") + "</section>" +
      sec('<h2>Rather call or write?</h2><p class="lead"><a class="link" href="mailto:' + STUDIO.email + '">' + STUDIO.email + '</a></p><p><a class="link" href="tel:' + STUDIO.tel + '">' + STUDIO.phone + "</a></p>") +
      newsSection() + "</div>";
  }
  // the forms: the chooser shows one form; "Send" carries what was typed into an email, once the required fields are filled
  function formMail(form) {
    var lines = [], missing = null;
    form.querySelectorAll("input, select, textarea").forEach(function (el) {
      var wrap = el.closest("[data-when]"); if (wrap && wrap.hidden) return;
      if (el.type === "file") {
        var fl = filesOf(form);
        if (el.required && !fl.length && !missing) missing = el;
        if (fl.length) lines.push(el.name + ": " + fl.map(function (x) { return x.name; }).join(", "));
        return;
      }
      var v = el.value.trim(); if (el.required && !v && !missing) missing = el;
      if (v) lines.push(el.name + ": " + v);
    });
    var mailEl = form.querySelector('input[type="email"]'), bad = null;
    if (!missing && mailEl && mailEl.value.trim() && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(mailEl.value.trim())) bad = mailEl;
    // the subject names the company, or the person when there's none ("Company name or N/A")
    var who = form.querySelector('[autocomplete="organization"]'), whoV = who && who.value.trim() && !/^n\/?a$/i.test(who.value.trim()) ? who.value.trim() : "";
    if (!whoV) { var nm = form.querySelector('[autocomplete="name"]') || form.querySelector('[autocomplete="given-name"]'); whoV = nm && nm.value.trim() ? nm.value.trim() : ""; }
    var href = "mailto:" + form.getAttribute("data-to") + "?subject=" + encodeURIComponent(form.getAttribute("data-subject") + (whoV ? ": " + whoV : "")) + "&body=" + encodeURIComponent(lines.join("\n") + "\n");
    return { href: href, missing: missing, bad: bad };
  }
  var FILES = new WeakMap();
  function filesOf(form) { return FILES.get(form) || []; }
  function size(b) { return b < 1048576 ? Math.max(1, Math.round(b / 1024)) + " KB" : (b / 1048576).toFixed(1) + " MB"; }
  function addFiles(form, list) {
    var box = $(".vf-attach", form); if (!box) return;
    var input = $("input[type=file]", box), max = +box.getAttribute("data-max") * 1048576, ok = box.getAttribute("data-accept").split(",");
    var have = input.multiple ? filesOf(form).slice() : [], refused = [];
    [].forEach.call(list, function (fl) {
      var ext = (fl.name.match(/\.[^.]+$/) || [""])[0].toLowerCase();
      if (ok.indexOf(ext) < 0) refused.push(fl.name + " (not an allowed format)");
      else if (fl.size > max) refused.push(fl.name + " (over " + box.getAttribute("data-max") + " MB)");
      else if (!have.some(function (h) { return h.name === fl.name && h.size === fl.size; })) have.push(fl);
    });
    if (!input.multiple) have = have.slice(-1);
    FILES.set(form, have); if (have.length) input.removeAttribute("aria-invalid");
    drawFiles(form);
    $(".vf-status", form).textContent = refused.length ? "Not added: " + refused.join("; ") + "." : "";
    $(".vf-send", form).href = formMail(form).href;
  }
  function drawFiles(form) {
    var ul = $(".vf-file-list", form); if (!ul) return;
    ul.innerHTML = filesOf(form).map(function (fl, k) {
      return '<li><span class="vf-file-name">' + esc(fl.name) + '</span><span class="vf-file-size">' + size(fl.size) + '</span><button type="button" class="vf-file-remove" data-k="' + k + '" aria-label="Remove ' + esc(fl.name) + '">Remove</button></li>';
    }).join("");
  }
  document.addEventListener("change", function (e) {
    var input = e.target; if (!input.matches || !input.matches(".vf-attach input[type=file]")) return;
    addFiles(input.closest("form"), input.files); input.value = "";   // the list keeps them; the field is free for more
  });
  ["dragenter", "dragover"].forEach(function (ev) { document.addEventListener(ev, function (e) { var d = e.target.closest && e.target.closest(".vf-drop"); if (d) { e.preventDefault(); d.classList.add("over"); } }); });
  ["dragleave", "drop"].forEach(function (ev) { document.addEventListener(ev, function (e) { var d = e.target.closest && e.target.closest(".vf-drop"); if (!d) return; d.classList.remove("over");
    if (ev === "drop") { e.preventDefault(); if (e.dataTransfer && e.dataTransfer.files.length) addFiles(d.closest("form"), e.dataTransfer.files); } }); });
  function whenUpdate(form) {
    form.querySelectorAll("[data-when]").forEach(function (w) {
      var rule = w.getAttribute("data-when").split("="), src = form.querySelector('select[name="' + rule[0] + '"]');
      w.hidden = !(src && rule[1].split("|").indexOf(src.value) > -1);
    });
  }
  document.addEventListener("click", function (e) {
    var t = e.target.closest ? e.target : e.target.parentElement;
    var see = t.closest("[data-see-options]");
    if (see) {
      var lab = $("#choose-label");
      if (lab) {
        // the page's own short glide, held frame by frame: a browser cancels a smooth scrollIntoView when late media
        // below still shifts the page, as it does right after this page opens; 124 leaves air under the fixed header
        var to = lab.getBoundingClientRect().top + window.scrollY - 124, from = window.scrollY, d = to - from, t0 = performance.now();
        if (REDUCE || !d) window.scrollTo(0, to);
        else requestAnimationFrame(function step(now) { var k = Math.min(1, (now - t0) / 450); window.scrollTo(0, from + d * (1 - Math.pow(1 - k, 3))); if (k < 1) requestAnimationFrame(step); });
        var on = $('.vf-tab[aria-pressed="true"]'); if (on) on.focus({ preventScroll: true });
      }
      return;
    }
    var tab = t.closest(".vf-tab");
    if (tab) {
      document.querySelectorAll(".vf-tab").forEach(function (b) { b.setAttribute("aria-pressed", String(b === tab)); });
      document.querySelectorAll(".vf-form").forEach(function (f) { f.hidden = f.id !== "form-" + tab.getAttribute("data-form"); });
      // the address and the tab's title follow the choice, so a copied link opens the form on screen (no re-render)
      var want = tab.getAttribute("data-form") === "careers" ? "careers" : "start", cur = asked();
      if ((cur === "start" || cur === "careers") && cur !== want) {
        history.replaceState(null, "", PATHS[want] || "#" + want); seen = location.href;
        document.title = route(want).title + ", Virtual Fudge";
        var top = START_TOP[want], h1 = $("#page h1"), lede = $("#page .page-hero .plain"), acts = $("#page .page-hero .acts");   // the page's top follows too
        if (h1) h1.textContent = top[0]; if (lede) lede.textContent = top[1]; if (acts) acts.innerHTML = top[2];
        document.querySelectorAll("[data-nav]").forEach(function (a) { if (a.getAttribute("data-nav") === want) a.setAttribute("aria-current", "page"); else if (a.getAttribute("data-nav") === cur) a.removeAttribute("aria-current"); });
      }
      return;
    }
    var send = t.closest(".vf-send");
    if (send) {
      var f2 = send.closest("form"), m2 = formMail(f2), st = $(".vf-status", f2);
      if (m2.missing || m2.bad) {
        e.preventDefault();
        var el = m2.missing || m2.bad;
        // the field itself says what's wrong too, for screen readers; the mark goes once it's answered
        f2.querySelectorAll("[aria-invalid]").forEach(function (x) { x.removeAttribute("aria-invalid"); }); el.setAttribute("aria-invalid", "true");
        el.focus(); st.textContent = m2.missing ? "Please answer: " + m2.missing.name + (/\?$/.test(m2.missing.name) ? "" : ".") : "Please check your email address.";
        return;
      }
      send.href = m2.href; st.textContent = "";
      var after = $(".vf-after", f2), done = f2.getAttribute("data-done"), fl = filesOf(f2);
      if (fl.length) {
        var names = fl.map(function (x) { return x.name; }).join(", "), to = f2.getAttribute("data-to");
        var canShare = false; try { canShare = !!(navigator.canShare && navigator.canShare({ files: fl })); } catch (err) { canShare = false; }
        if (canShare) {
          e.preventDefault();
          var body = decodeURIComponent(m2.href.split("&body=")[1] || "");
          navigator.share({ files: fl, title: f2.getAttribute("data-subject"), text: "To: " + to + "\n\n" + body }).then(function () {
            $(".lead", after).textContent = "Sent from your share sheet with " + (fl.length > 1 ? "your files" : names) + ". If it didn’t go to " + to + ", write to us there."; after.hidden = false;
          }).catch(function (err) {
            if (err && err.name === "AbortError") return;   // the visitor closed the sheet: nothing to say
            $(".lead", after).innerHTML = esc("This browser can’t hand files to your email app. Open your email with your answers, then add " + names + " before you send it.") +
              ' <a class="link" href="' + esc(m2.href) + '">Open your email</a>'; after.hidden = false;
          });
          return;
        }
        done = "Your email app opened with your answers. Add " + names + " to that email before you send it: a web page can’t attach files for you.";
      }
      $(".lead", after).textContent = done; after.hidden = false;
    }
    var rm = t.closest(".vf-file-remove");
    if (rm) {
      var f3 = rm.closest("form"), k3 = +rm.getAttribute("data-k"), list = filesOf(f3).slice(); list.splice(k3, 1); FILES.set(f3, list); drawFiles(f3); $(".vf-send", f3).href = formMail(f3).href;
      // the button just went with its file: focus moves to the next file's Remove, or back to the field once the list is empty
      var rest = f3.querySelectorAll(".vf-file-remove"), next = rest[Math.min(k3, rest.length - 1)] || $(".vf-attach input[type=file]", f3);
      if (next) next.focus();
      return;
    }
  });
  document.addEventListener("input", function (e) { var form = e.target.closest && e.target.closest(".vf-form"); if (!form) return; whenUpdate(form); $(".vf-send", form).href = formMail(form).href;
    if (e.target.value && e.target.value.trim()) e.target.removeAttribute("aria-invalid"); });
  document.addEventListener("change", function (e) { var form = e.target.closest && e.target.closest(".vf-form"); if (form) whenUpdate(form); });

  // virtualfudge.com's privacy policy, word for word (the pop-up on its homepage, read 7 Oct 2026; docs/source/vf-site/privacy-policy.md).
  // Only VF's own slip is mended: the "Third Party Privacy Policies" heading also opened its first paragraph.
  // Its headings are set in this site's sentence case, like every other heading (19 Oct). Since Vemir's notes of 19 Oct its
  // grammar and punctuation are mended too, never its meaning; legal should still read it before launch (docs/TK.md).
  var PRIVACY = [
    ["", ["At Virtual Fudge, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains the types of information that are collected and recorded by Virtual Fudge and how we use them.",
      "If you have additional questions or require more information about our Privacy Policy, do not hesitate to <a class=\"link\" href=\"#contact\">contact us</a>."]],
    ["Log files", ["Virtual Fudge follows a standard procedure of using log files. These files log visitors when they visit websites. All hosting companies do this as part of hosting services’ analytics. The information collected by log files includes internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks. These are not linked to any information that is personally identifiable. The purpose of the information is for analyzing trends, administering the site, tracking users’ movement on the website, and gathering demographic information."]],
    ["Cookies and web beacons", ["Like any other website, Virtual Fudge uses “cookies.” These cookies are used to store information including visitors’ preferences, and the pages on the website that the visitor accessed or visited. The information is used to optimize the users’ experience by customizing our web page content based on visitors’ browser type and/or other information."]],
    ["Privacy policies", ["The Noyah Cosmetics AR app respects your privacy.",
      "We only collect the same basic information as a standard online purchase: your login and order history. You can find our full privacy policy on this page. Any additional data used by the AR features (like the virtual try-on) stays on your device. We don’t collect or share it. For example, the Noyah Cosmetics AR app uses a selfie AR feature using ARKit and ARCore true-depth technology to recognize users’ face data so users can try cosmetics on their face in real time, then capture a selfie to share or save for later.",
      "This information is not transmitted or stored by us."]],
    ["Third-party privacy policies", ["Virtual Fudge’s Privacy Policy does not apply to other advertisers or websites. Thus, we are advising you to consult the respective Privacy Policies of these third-party ad servers for more detailed information. It may include their practices and instructions about how to opt out of certain options.",
      "Third-party websites, ad servers, or ad networks use technologies like cookies, JavaScript, or web beacons that are used in their respective advertisements and links that appear on Virtual Fudge, which are sent directly to users’ browsers. They automatically receive your IP address when this occurs. These technologies are used to measure the effectiveness of their advertising campaigns and/or to personalize the advertising content that you see on websites that you visit.",
      "You can choose to disable cookies through your individual browser options. More detailed information about cookie management with specific web browsers can be found at the browsers’ respective websites.",
      "Note that Virtual Fudge has no access to or control over cookies that are used by third-party advertisers."]],
    ["Children’s information", ["Another part of our priority is adding protection for children while using the internet. We encourage parents and guardians to observe, participate in, and/or monitor and guide their online activity.",
      "Virtual Fudge does not knowingly collect any Personally Identifiable Information from children under the age of 13. If you think that your child provided this kind of information on our website, we strongly encourage you to contact us immediately, and we will do our best to promptly remove such information from our records."]],
    ["Online privacy policy only", ["This Privacy Policy applies only to our online activities and is valid for visitors to our website with regard to the information that they shared and/or collect in Virtual Fudge. This policy is not applicable to any information collected offline or via channels other than this website."]],
    ["Consent", ["By using our website, you hereby consent to our Privacy Policy and agree to its Terms and Conditions."]]
  ];
  function pageLegal() {
    return hero({ title: "Privacy policy", lede: PRIVACY[0][1][0], acts: '<p class="plain">' + PRIVACY[0][1][1] + "</p>" }) +
      '<div class="page-body">' + PRIVACY.slice(1).map(function (sec) {
        return '<section class="block-sec"><h2>' + sec[0] + "</h2>" + sec[1].map(function (p) { return "<p>" + p + "</p>"; }).join("") + "</section>";
      }).join("") +
      // what this page itself does that VF's policy can't cover: the finale sends the visitor's line to Claude
      '<section class="block-sec"><h2>Cut me a sketch</h2><p>If you use “Cut me a sketch,” the line you type is sent to Claude, Anthropic’s AI model, so it can write the sketch. A sketch link carries the sketch in the link itself; nothing is saved on a server.</p></section></div>';
  }

  /* ---------- the clips: they play while on screen, always silent, and never against data saver (on every computer whatever
     its motion setting, 28 Oct) ---------- */
  var autoplay = !(navigator.connection && navigator.connection.saveData);
  function srcFor(v) {
    if (v.getAttribute("src") || !v.dataset.src) return;
    v.src = v.dataset.src;
    // a host that can't answer byte ranges keeps Safari from playing a file in place; then the clip plays from memory
    v.addEventListener("error", function once() {
      v.removeEventListener("error", once);
      if (v.dataset.blob) return; v.dataset.blob = "1";
      fetch(v.dataset.src).then(function (r) { return r.ok ? r.blob() : null; }).then(function (b) {
        if (b) { v.src = URL.createObjectURL(b); if (v.dataset.seen && !v.dataset.stopped) tryPlay(v); } }).catch(function () {});
    });
  }
  function tryPlay(v) { srcFor(v); var p = v.play(); if (p && p.catch) p.catch(function () { syncBtn(v); }); }
  function syncBtn(v) {
    var b = v.parentNode.querySelector(".clip-toggle"); if (!b) return;
    b.classList.toggle("on", !v.paused); b.setAttribute("aria-label", (v.paused ? "Play" : "Pause") + " the clip: " + v.getAttribute("aria-label"));
  }
  var io = "IntersectionObserver" in window ? new IntersectionObserver(function (es) {
    es.forEach(function (e) {
      var v = e.target;
      if (e.isIntersecting && e.intersectionRatio >= 0.35) { v.dataset.seen = "1"; if (autoplay && !v.dataset.stopped) tryPlay(v); }
      else { delete v.dataset.seen; if (!v.paused) v.pause(); }
    });
  }, { threshold: [0, 0.35, 0.7] }) : null;
  // back from another tab: what is on screen picks up where it was
  document.addEventListener("visibilitychange", function () {
    if (document.hidden || !autoplay) return;
    document.querySelectorAll("video[data-seen]").forEach(function (v) { if (!v.dataset.stopped && v.paused && !v.closest(".reel")) tryPlay(v); });
  });
  function wireClips(root) {
    root.querySelectorAll(".press-video").forEach(function (v) { if (!v.getAttribute("src")) srcFor(v); });
    root.querySelectorAll("video[data-src]:not(.press-video)").forEach(function (v) {
      if (v.dataset.wired) return; v.dataset.wired = "1";
      v.addEventListener("play", function () { syncBtn(v); }); v.addEventListener("pause", function () { syncBtn(v); });
      if (io) io.observe(v); else if (autoplay) tryPlay(v);
      syncBtn(v);
    });
  }
  // the galleries: every picture keeps its shape, each row is one height and ends flush. Rows are chosen together (the
  // breaks that keep every row nearest the target height), so no row is squeezed to fit a straggler.
  function justify(g) {
    var W = g.clientWidth; if (!W) return;
    var gap = parseFloat(getComputedStyle(g).columnGap) || 10, H = W < 560 ? 124 : Math.min(300, Math.max(150, window.innerWidth * 0.21));
    var els = [].slice.call(g.children), r = els.map(function (el) { return parseFloat(el.style.getPropertyValue("--r")) || 1; }), n = els.length;
    var best = [0], cut = [0], i, j, q, sum;
    for (i = 1; i <= n; i++) {
      best[i] = Infinity;
      for (j = i - 1, sum = 0; j >= 0; j--) {
        sum += r[j];
        var h = (W - gap * (i - j - 1)) / sum;
        if (h < H * 0.45) break;
        var cost = best[j] + (h - H) * (h - H) * (h < H ? 3 : i === n ? 0.35 : 1);   // small rows cost most; the last row may stand a little taller
        if (cost < best[i]) { best[i] = cost; cut[i] = j; }
      }
    }
    for (i = n; i > 0; i = cut[i]) {
      for (q = cut[i], sum = 0; q < i; q++) sum += r[q];
      var count = i - cut[i], fit = (W - gap * (count - 1)) / sum, ht = Math.min(fit, H * 1.6), used = 0;
      for (q = cut[i]; q < i; q++) {
        var w = q === i - 1 && ht === fit ? W - gap * (count - 1) - used - 0.5 : Math.floor(r[q] * ht * 100) / 100;
        used += w; els[q].style.flex = "none"; els[q].style.width = w + "px"; els[q].style.height = ht + "px";
      }
    }
  }
  var ro = "ResizeObserver" in window ? new ResizeObserver(function (es) { es.forEach(function (e) { justify(e.target); }); }) : null;
  function wireGalleries(root) { root.querySelectorAll(".gallery").forEach(function (g) { justify(g); if (ro) ro.observe(g); }); }
  // a hyphenated word in a heading stays whole, as "mind-bogglingly" does in the homepage's headline: a phone would
  // otherwise break "AR-guided" or "app-based" at its hyphen (20 Oct); captions too, where "life-like" broke in a narrow column
  function keepHyphens(root) {
    root.querySelectorAll("h1, h2, h3, .card-title, .vf-tab-title, figcaption").forEach(function (h) {
      var w = document.createTreeWalker(h, NodeFilter.SHOW_TEXT), nodes = [], n;
      while ((n = w.nextNode())) if (/\S-\S/.test(n.textContent) && !(n.parentNode.classList && n.parentNode.classList.contains("nw"))) nodes.push(n);
      nodes.forEach(function (t) {
        var f = document.createDocumentFragment();
        t.textContent.split(/(\S*\S-\S\S*)/).forEach(function (part, k) {
          if (!part) return;
          if (k % 2) { var s = document.createElement("span"); s.className = "nw"; s.textContent = part; f.appendChild(s); }
          else f.appendChild(document.createTextNode(part));
        });
        t.parentNode.replaceChild(f, t);
      });
    });
  }
  if (!ro) window.addEventListener("resize", function () { document.querySelectorAll(".gallery").forEach(justify); });
  // the Projects finder: the frame locks onto one clip, plays it, names it, and moves on every few seconds (not under reduced
  // motion: there it stays until a hover or a focus moves it); off screen or in a background tab it waits
  var finderTimer = 0, finderStop = null;
  function wireFinder(root) {
    if (finderStop) { finderStop(); finderStop = null; }
    var f = $(".finder", root); if (!f) return;
    var clips = [].slice.call(f.querySelectorAll(".finder-clip")), lock = $(".finder-lock", f), name = $(".finder-name", f), cur = -1, held = false, seen = true;
    var still = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
    function to(k) {
      if (k === cur) return;
      var a = clips[k], pad = 7;
      clips.forEach(function (c, j) { c.classList.toggle("on", j === k); var v = $("video", c); if (j !== k && !v.paused) v.pause(); });
      lock.style.transform = "translate(" + (a.offsetLeft - pad) + "px, " + (a.offsetTop - pad) + "px)";
      lock.style.width = a.offsetWidth + 2 * pad + "px"; lock.style.height = a.offsetHeight + 2 * pad + "px";
      lock.classList.remove("scan"); void lock.offsetWidth; lock.classList.add("scan");
      name.textContent = a.dataset.name; cur = k;
      var v = $("video", a);
      if (autoplay && seen) { if (!v.getAttribute("src")) v.src = v.dataset.finderSrc; var p = v.play(); if (p && p.catch) p.catch(function () {}); }
    }
    function tick() { if (!held && seen && !document.hidden) to((cur + 1) % clips.length); }
    clips.forEach(function (c, k) {
      c.addEventListener("mouseenter", function () { held = true; to(k); });
      c.addEventListener("mouseleave", function () { held = false; });
      c.addEventListener("focus", function () { held = true; to(k); });
      c.addEventListener("blur", function () { held = false; });
    });
    var io2 = "IntersectionObserver" in window ? new IntersectionObserver(function (es) {
      seen = es[0].isIntersecting;
      var v = cur > -1 && $("video", clips[cur]);
      if (v) { if (!seen) v.pause(); else if (autoplay && v.getAttribute("src")) { var p = v.play(); if (p && p.catch) p.catch(function () {}); } }
    }) : null;
    if (io2) io2.observe(f);
    function place() { var k = cur; cur = -1; to(k < 0 ? 0 : k); }
    window.addEventListener("resize", place);
    requestAnimationFrame(place);
    if (!still) finderTimer = setInterval(tick, 5200);
    finderStop = function () { clearInterval(finderTimer); window.removeEventListener("resize", place); if (io2) io2.disconnect(); clips.forEach(function (c) { $("video", c).pause(); }); };
  }
  // the pages build in as they scroll (Josh, 28 Oct: "more dynamic", "integrate media with animations to make more clearly
  // AR"): a row of points, steps or chips comes up one after another; a photo or a clip comes into view as a phone's AR frame
  // finds it, brackets closing on it and one scan line passing. Never under reduced motion; without the observer, all just there
  var revealIo = null;
  var REDUCE = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
  function wireReveal(root) {
    if (revealIo) { revealIo.disconnect(); revealIo = null; }
    if (REDUCE || !("IntersectionObserver" in window)) return;
    revealIo = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("in"); revealIo.unobserve(e.target); } }); }, { rootMargin: "0px 0px -10% 0px" });
    root.querySelectorAll(".page-body .three, .page-body .steps, .page-body .data, .page-body .team, .page-body .pair-list, .page-body .four, .page-body .figures").forEach(function (g) {
      g.classList.add("rv"); [].forEach.call(g.children, function (c, k) { c.style.setProperty("--i", k); }); revealIo.observe(g);
    });
    root.querySelectorAll(".page-body .clip-frame, .page-body .g, .page-body .press-clip, .ar-photo-in").forEach(function (m) {
      if (!m.querySelector(".ar-rv-lock") && !m.classList.contains("ar-photo-in")) { var l = document.createElement("span"); l.className = "ar-rv-lock"; l.setAttribute("aria-hidden", "true"); l.innerHTML = '<span class="ar-rv-scan"></span>'; m.appendChild(l); }
      m.classList.add("ar-rv"); revealIo.observe(m);
    });
  }
  // About's window on the old story: where the window stands in the screen is how far the scene has played (0 as its top comes
  // in under the screen, 1 as its bottom leaves over the top), so scrolling back plays it back. Off screen it does nothing
  var peekStop = null;
  function wirePeek(root) {
    if (peekStop) { peekStop(); peekStop = null; }
    var w = $(".peek-win", root); if (!w) return;
    if (REDUCE) { w.classList.add("still"); return; }
    var phone = $(".pk-phone", w), tap = $(".pk-tap", w), cyc = $(".pk-cyclop", w), lens = $(".pk-lens", w), mount = $(".pk-mount", w), clouds = $(".pk-clouds", w), raf = 0;
    function seg(p, a, b) { return Math.min(1, Math.max(0, (p - a) / (b - a))); }
    function out(t) { return 1 - Math.pow(1 - t, 3); }
    function draw() {
      raf = 0;
      var r = w.getBoundingClientRect(), vh = innerHeight;
      if (r.bottom < -40 || r.top > vh + 40) return;
      var p = seg(vh - r.top, 0, vh + r.height);
      var up = out(seg(p, 0.1, 0.4)), reach = out(seg(p, 0.36, 0.5)) * (1 - seg(p, 0.56, 0.68)), pop = out(seg(p, 0.49, 0.57));
      phone.style.transform = "translate3d(0, " + ((1 - up) * 78).toFixed(2) + "%, 0)";
      tap.style.transform = "translate3d(" + ((1 - reach) * -18).toFixed(2) + "%, " + ((1 - reach) * 92).toFixed(2) + "%, 0)";
      cyc.style.opacity = pop.toFixed(3); cyc.style.transform = "scale(" + (0.82 + 0.18 * pop).toFixed(3) + ")";
      lens.style.opacity = (1 - pop).toFixed(3);
      mount.style.transform = "translate3d(0, " + ((1 - seg(p, 0, 0.6)) * 6).toFixed(2) + "%, 0) scale(" + (1.06 - 0.06 * seg(p, 0, 0.6)).toFixed(3) + ")";
      clouds.style.transform = "translate3d(" + ((p - 0.5) * 6).toFixed(2) + "%, 0, 0)";
    }
    function ask() { if (!raf) raf = requestAnimationFrame(draw); }
    window.addEventListener("scroll", ask, { passive: true }); window.addEventListener("resize", ask);
    draw();
    peekStop = function () { window.removeEventListener("scroll", ask); window.removeEventListener("resize", ask); if (raf) cancelAnimationFrame(raf); };
  }
  // the project cards: each rises into place and its frame locks on as it comes into view; its clip plays under the pointer, or,
  // on a touch screen, while it is the card most in view
  var cardIo = null, cardPlayIo = null;
  function wireCards(root) {
    var cs = [].slice.call(root.querySelectorAll(".cards > li"));
    if (cardIo) cardIo.disconnect(); if (cardPlayIo) cardPlayIo.disconnect();
    if (!cs.length) return;
    if (!("IntersectionObserver" in window)) { cs.forEach(function (c) { c.classList.add("in"); }); return; }
    root.querySelector(".cards").classList.add("reveal");
    cardIo = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("in"); cardIo.unobserve(e.target); } }); }, { rootMargin: "0px 0px -8% 0px" });
    cs.forEach(function (c) { cardIo.observe(c); });
    function play(li, on) {
      var v = li.querySelector("video[data-card-src]"); if (!v) return;
      if (on && autoplay) { if (!v.getAttribute("src")) v.src = v.dataset.cardSrc; li.classList.add("playing"); var p = v.play(); if (p && p.catch) p.catch(function () { li.classList.remove("playing"); }); }
      else { v.pause(); li.classList.remove("playing"); }
    }
    var hover = window.matchMedia && matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (hover) cs.forEach(function (li) {
      var a = li.querySelector(".card");
      a.addEventListener("mouseenter", function () { play(li, true); }); a.addEventListener("mouseleave", function () { play(li, false); });
      a.addEventListener("focus", function () { play(li, true); }); a.addEventListener("blur", function () { play(li, false); });
    });
    else {
      var ratio = new Map();
      cardPlayIo = new IntersectionObserver(function (es) {
        es.forEach(function (e) { ratio.set(e.target, e.intersectionRatio); });
        var best = null, br = 0.6; ratio.forEach(function (r, li) { if (r > br) { br = r; best = li; } });
        cs.forEach(function (li) { play(li, li === best); });
      }, { threshold: [0, 0.3, 0.6, 0.8, 1] });
      cs.forEach(function (li) { cardPlayIo.observe(li); });
    }
  }
  function unwireClips(root) { if (ro) root.querySelectorAll(".gallery").forEach(function (g) { ro.unobserve(g); }); root.querySelectorAll("video[data-src]").forEach(function (v) { if (io) io.unobserve(v); v.pause(); }); }
  document.addEventListener("click", function (e) {
    var t = e.target.closest ? e.target : e.target.parentElement;
    var hit = t.closest(".clip-toggle, .clip-frame video, .g-clip video"); if (!hit) return;
    var v = hit.tagName === "VIDEO" ? hit : hit.parentNode.querySelector("video"), b = v.parentNode.querySelector(".clip-toggle");
    // the button's own state decides, so a second tap while the clip is still loading pauses it
    if (b ? !b.classList.contains("on") : v.paused) { delete v.dataset.stopped; v.dataset.seen = "1"; if (b) { b.classList.add("on"); b.setAttribute("aria-label", "Pause the clip: " + v.getAttribute("aria-label")); } tryPlay(v); }
    else { v.dataset.stopped = "1"; v.pause(); syncBtn(v); }
  });

  // the reel: a dialog with the cut and its sound, opened only on purpose
  var reelBox = null, reelFrom = null;
  function openReel(from) {
    if (!reelBox) {
      reelBox = document.createElement("dialog"); reelBox.className = "reel"; reelBox.setAttribute("aria-label", "The Virtual Fudge reel");
      reelBox.innerHTML = '<div class="reel-in"><video controls playsinline preload="none" poster="' + REEL.poster + '" data-src="' + REEL.src + '"></video>' +
        '<p class="reel-note">Only work we built: Noyah Cosmetics, the Magic Mirror, Gortana, our booths, and our booth on TV Tokyo’s World Business Satellite.</p><button type="button" class="reel-close">Close</button></div>';
      document.body.appendChild(reelBox);
      reelBox.addEventListener("close", function () { var v = $("video", reelBox); v.pause(); delete v.dataset.seen; if (reelFrom) reelFrom.focus(); });
      reelBox.addEventListener("click", function (e) { if (e.target === reelBox || (e.target.closest && e.target.closest(".reel-close"))) reelBox.close(); });
    }
    reelFrom = from;
    document.querySelectorAll(".press-video").forEach(function (p) { p.pause(); });   // one soundtrack at a time
    var v = $("video", reelBox); v.dataset.seen = "1";
    if (reelBox.showModal) reelBox.showModal(); else reelBox.setAttribute("open", "");
    tryPlay(v);
  }
  document.addEventListener("click", function (e) { var b = e.target.closest && e.target.closest("[data-reel]"); if (b) openReel(b); });

  // on the homepage, where a world has real work behind it, the recording sits under its plain line (wide screens only), and,
  // where the 3D runs on a wide screen, stands beside its world as a feature, pinned to it like a label seen through a phone
  // (Josh, 28 Oct: "put the videos in as a feature for each one"; the block places it, block.js). Living Exhibits shows Gortana:
  // a printed card that comes alive, VF's own work, said as what it is
  var cardsBox = null;
  [[1, "retail", "tryon-face", "noyah-tryon", "Real footage: the Noyah Cosmetics try-on", "Noyah Cosmetics try-on"],
   [2, "cpg", "noyah-box", "noyah-packaging", "Real footage: the Noyah Cosmetics box, scanned", "The Noyah Cosmetics box, scanned"],
   [5, "events", "nrf-mirror", "nios-mirror", "Real footage: the Magic Mirror at NRF 2026", "The Magic Mirror at NRF 2026"],
   [6, "museums", "gortana", "gortana", "Real footage: Gortana, a printed card that comes alive", "Gortana, a printed card that comes alive"]].forEach(function (p) {
    var ch = document.getElementById(p[1]), plain = ch && $(".plain", ch), c = CLIPS[p[2]]; if (!plain) return;
    var d = document.createElement("div"); d.className = "proof";
    d.innerHTML = '<div class="clip ' + kindOf(c) + '"><div class="clip-frame" style="aspect-ratio:' + c[0] + " / " + c[1] + '">' + clipVideo(p[2], p[4]).replace(' poster="', ' data-poster="') + "</div></div>" +
      '<a class="proof-link" href="#work-' + p[3] + '">' + esc(p[4]) + "</a>";
    plain.parentNode.insertBefore(d, plain.nextSibling);
    // the feature: the same clip and link, out of the reading order (the line above carries them for a screen reader)
    if (!cardsBox) { cardsBox = document.createElement("div"); cardsBox.className = "ar-cards-box"; cardsBox.setAttribute("aria-hidden", "true"); document.body.appendChild(cardsBox); }
    var f = document.createElement("figure"); f.className = "ar-card " + kindOf(c); f.dataset.w = p[0];
    f.innerHTML = '<div class="ar-card-in"><div class="clip-frame" style="aspect-ratio:' + c[0] + " / " + c[1] + '"><video muted loop playsinline preload="none" data-poster="' + MEDIA + p[2] +
      '.jpg" data-src="' + MEDIA + p[2] + '.mp4"></video></div><svg class="ar-card-br" viewBox="0 0 100 100" preserveAspectRatio="none" focusable="false"><path d="M0 12V0H12M88 0H100V12M100 88V100H88M12 100H0V88"/></svg>' +
      '<span class="ar-card-scan"></span></div><figcaption><span class="ar-card-tag"><i></i>' + (c[2] === "phone" ? "AR capture" : "Filmed live") + '</span><a href="#work-' + p[3] + '" tabindex="-1">' + esc(p[5]) + "</a></figcaption>";
    cardsBox.appendChild(f);
  });
  // their pictures wait for the page's load (or the first scroll, if sooner): the worlds are below the first screen, and on a
  // phone's data these four held up the fonts and so the transporter (Vemir, 28 Oct: "the transporter goes way too long")
  var postersIn = false;
  function setPosters() {
    if (postersIn) return; postersIn = true;
    document.querySelectorAll("video[data-poster]").forEach(function (v) { v.setAttribute("poster", v.getAttribute("data-poster")); v.removeAttribute("data-poster"); });
  }
  // (5 Nov: the first scroll or touch only, not the load: unseen, they were 320 KB of the first load PageSpeed counts)
  ["scroll", "wheel", "touchstart", "keydown"].forEach(function (ev) { window.addEventListener(ev, setPosters, { passive: true, once: true }); });
  if (window.scrollY > 0 || location.hash.length > 1 || document.documentElement.getAttribute("data-route")) setPosters();
  // the block plays a feature's clip once its world has risen, and stops it as the world goes back into the paper
  window.VFClips = { play: function (v) { v.dataset.seen = "1"; if (autoplay && !v.dataset.stopped) tryPlay(v); }, stop: function (v) { delete v.dataset.seen; if (!v.paused) v.pause(); } };
  wireClips(document.getElementById("main"));

  /* ---------- the router ---------- */
  var CHAPTERS = ["top", "retail", "cpg", "medicine", "sports", "events", "museums", "training", "yours"];
  // a still for each world, for the pages without the live block (10 to 13 are the niches' own worlds)
  var STILL = CHAPTERS.concat(["", "realestate", "tourism", "education", "gaming"]);
  // each page's shape for the block: [chapter, point in its change] (0, 0.28 is the block freshly cut)
  function route(h) {
    if (h === "work") return { title: "Projects", html: pageWork, stage: null };      // no block: the projects' own footage (Josh, 28 Oct)
    if (h.indexOf("work-") === 0) { var c = caseBy(h.slice(5)); return c ? { title: cardOf(c.slug).title, html: function () { return pageCase(c); }, stage: [c.world, 0] } : null; }
    if (h.indexOf("for-") === 0) { var id = h.slice(4), w = IND[id] ? IND[id].n || IND[id].world : 0; return w ? { title: nicheName(id), html: function () { return pageIndustry(id); }, stage: [w, 0] } : null; }
    if (h === "industries") return { title: "Industries", html: pageIndustries, stage: [0, 0.3] };   // the box beginning to open
    if (h === "shows") return { title: "Events", html: pageShows, stage: [5, 0] };   // the booth floor; named as the menu names it
    if (h === "studio") return { title: "About us", html: pageStudio, stage: null };   // the team, not the block (Josh, 28 Oct)
    if (h === "blog" || h === "journal") return { title: "Blog", html: pageJournal, stage: [0, 0.09] };   // the lid just open, a line of light
    if (h.indexOf("blog-") === 0) { var post = postBy(h.slice(5)); return post ? { title: post.title, html: function () { return pagePost(post); }, stage: null } : null; }   // a post reads on plain paper
    if (h === "contact") return { title: "Contact", html: pageContact, stage: [8, 0] };
    if (h === "start") return { title: "Get a quote", html: function () { return pageStart("quote"); }, stage: [8, 0] };
    if (h === "careers") return { title: "Careers", html: function () { return pageStart("careers"); }, stage: [8, 0] };
    if (h === "legal") return { title: "Privacy policy", html: pageLegal, stage: null };
    return null;
  }
  document.documentElement.lang = "en";
  var root = document.documentElement, pages = $("#page"), current = null;
  // a page with its own address (/industries/ar-in-retail/, /blog/<slug>/: tools/build-public.py writes them) names its page in
  // <html data-route> and keeps its own title there; the homepage's title rides along for the way back to it. Elsewhere the
  // page is the part after the # as before, and the # links, once followed from such a page, lead back onto the homepage's.
  var landPath = location.pathname, landRoute = root.getAttribute("data-route") || "", landTitle = document.title;
  var baseTitle = root.getAttribute("data-home-title") || document.title;
  // the published site (tools/build-public.py) also names every real address in <html data-paths> ({"for-retail":
  // "/industries/ar-in-retail/", ...}), so the site's own links, the address bar and Back and Forward use those addresses
  // instead of a # (SEO step 3, 9 Nov); a shared link is then the real page. Without it (the working copy) the # stays.
  var PATHS = {}, ROUTE_AT = {};
  try { PATHS = JSON.parse(root.getAttribute("data-paths") || "{}") || {}; } catch (e) { PATHS = {}; }
  Object.keys(PATHS).forEach(function (r) { ROUTE_AT[PATHS[r]] = r; });
  var REAL_ON = Object.keys(PATHS).length > 0;
  function asked() { return (location.hash || "").replace(/^#/, "") || ROUTE_AT[location.pathname] || (location.pathname === landPath ? landRoute : ""); }
  // a link to a page with its own address points there (copy link, open in a new tab, a crawler all get the real one)
  function realLinks(scope) {
    if (!REAL_ON || !scope) return;
    [].forEach.call(scope.querySelectorAll('a[href^="#"]'), function (a) { var r = a.getAttribute("href").slice(1); if (PATHS[r]) a.setAttribute("href", PATHS[r]); });
  }
  // an old # address (a link shared before, the block's own jump to an industry) settles on the real one, in place
  function settle(h) {
    if (!REAL_ON || !location.hash) return;
    var to = PATHS[h] ? PATHS[h] + location.search : location.pathname !== "/" ? "/" + location.search + location.hash : "";
    if (to) { history.replaceState(history.state, "", to); seen = location.href; }
  }
  // one title per page, however it was reached: an industry, project or post with its own address is titled by its heading,
  // as tools/build-public.py titles that page ("AR in CPG: Packaging that tells the story, Virtual Fudge"); hubs and the
  // rest keep the site's short name ("Events, Virtual Fudge")
  function pageTitle(h, r) {
    var h1 = /^(for|work|blog)-/.test(h) && $("h1", pages), t = h1 ? h1.textContent.replace(/\u00ad/g, "").replace(/[ \t\r\n]+/g, " ").replace(/^ | $/g, "") : "";   // a title's deliberate no-break space stays
    return (t || r.title) + ", Virtual Fudge";
  }
  var lostTimer = 0;
  // the skip link: on the homepage it jumps to the chapters; on a page it moves to that page's heading, never off the page
  var skip = $(".skip"), skipHome = skip ? skip.textContent : "";
  if (skip) skip.addEventListener("click", function (e) {
    if (!root.classList.contains("on-page")) return;
    var h1 = $("h1", pages); if (!h1) return;
    e.preventDefault(); h1.focus();
  });
  function go(first) {
    var h = asked();
    settle(h);
    var r = route(h), lost = $("#lost");
    // the header and the menu mark the section you are in
    var sec = h.indexOf("work") === 0 ? "work" : h === "industries" || h.indexOf("for-") === 0 ? "industries" : h === "journal" || h.indexOf("blog") === 0 ? "blog" : ["shows", "studio", "contact", "start", "careers"].indexOf(h) > -1 ? h : r ? "" : "home";
    document.querySelectorAll("[data-nav]").forEach(function (a) { if (a.getAttribute("data-nav") === sec) a.setAttribute("aria-current", "page"); else a.removeAttribute("aria-current"); });
    if (lost && !lost.hidden && (r || !h || CHAPTERS.indexOf(h) > -1)) { lost.hidden = true; clearTimeout(lostTimer); }   // somewhere real: the missing-slice line goes
    if (r) {
      unwireClips(pages);
      pages.innerHTML = r.html();
      keepHyphens(pages);
      realLinks(pages);
      wireClips(pages);
      // without the live block (no WebGL, or a stills copy), the page's world stands in its hero as a still
      if (r.stage && root.classList.contains("no-gl")) {
        var img = document.createElement("img"); img.className = "still"; img.alt = ""; img.decoding = "async"; img.width = img.height = 1200;
        img.src = "/assets/stills/" + (STILL[r.stage[0]] || "top") + ".jpg"; $(".page-hero", pages).appendChild(img);
      }
      pages.hidden = false; root.classList.add("on-page"); root.classList.toggle("page-plain", !r.stage);
      if (skip) skip.textContent = "Skip to the content";
      wireGalleries(pages);
      wireFinder(pages); wireCards(pages); wireReveal(pages); wirePeek(pages);
      document.title = h === landRoute && location.pathname === landPath ? landTitle : pageTitle(h, r);
      if (window.VFStage) window.VFStage.page(r.stage || false);
      window.scrollTo({ top: 0, behavior: "instant" });
      if (!first) { var h1 = $("h1", pages); if (h1) h1.focus({ preventScroll: true }); }
      current = h;
      return;
    }
    if (current !== null || first) {
      unwireClips(pages);
      pages.hidden = true; pages.innerHTML = ""; wireFinder(pages); wireCards(pages); wireReveal(pages); wirePeek(pages); root.classList.remove("on-page", "page-plain");
      if (skip) skip.textContent = skipHome;
      document.title = baseTitle;
      if (window.VFStage) window.VFStage.page(null);
    }
    current = null;
    if (h && CHAPTERS.indexOf(h) > -1) {
      // a jump to a chapter (the index, the skip link) also moves keyboard and screen-reader focus to it
      var t = document.getElementById(h), hd = t && t.querySelector("h1, h2");
      if (t) setTimeout(function () { t.scrollIntoView({ behavior: first ? "instant" : "smooth" }); if (!first && hd && hd.tabIndex === -1) hd.focus({ preventScroll: true }); }, first ? 60 : 0);
    }
    else if (h && h.indexOf("s.") !== 0) { lost.hidden = false; clearTimeout(lostTimer); lostTimer = setTimeout(function () { lost.hidden = true; }, 6000); }
    else if (!h && !first) window.scrollTo({ top: 0, behavior: "instant" });
  }
  var seen = location.href;
  function moved() { if (location.href === seen) return; seen = location.href; closeMenu(false); go(false); }
  window.addEventListener("hashchange", moved);
  window.addEventListener("popstate", moved);   // Back and Forward between a page's own address and the homepage's #
  // a link inside the site opens its page without a reload: at the page's real address where it has one; otherwise on the
  // homepage's # (on the homepage itself the browser's own # jump does that, as it always has)
  document.addEventListener("click", function (e) {
    if (e.defaultPrevented || e.button || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    var a = e.target.closest && e.target.closest("a[href]"); if (!a || a.target || a.hasAttribute("download")) return;
    var href = a.getAttribute("href"), r = "";
    if (href.charAt(0) === "#") r = href.slice(1);
    else if (a.origin === location.origin && !a.search) r = a.pathname === "/" ? a.hash.slice(1) : a.hash ? "" : ROUTE_AT[a.pathname] || "";
    if (!r) return;
    var to = PATHS[r] || (location.pathname === "/" ? "" : "/#" + r);
    if (!to) return;
    e.preventDefault(); closeMenu(false);
    if (to !== location.pathname + location.hash) history.pushState(null, "", to);
    moved();
  });
  realLinks(document);
  // the menu (narrower screens): the whole site, one tap away; Escape or Close returns to the page
  var menu = $("#menu"), menuBtn = $(".menu-btn");
  function openMenu() {
    if (!menu) return; menu.hidden = false; root.classList.add("menu-open"); menuBtn.setAttribute("aria-expanded", "true");
    var cur = $('.menu-main [aria-current="page"]', menu) || $(".menu-main a", menu); if (cur) cur.focus();
  }
  function closeMenu(refocus) {
    if (!menu || menu.hidden) return; menu.hidden = true; root.classList.remove("menu-open"); menuBtn.setAttribute("aria-expanded", "false");
    if (refocus) menuBtn.focus();
  }
  if (menuBtn) menuBtn.addEventListener("click", openMenu);
  if (menu) {
    $(".menu-close", menu).addEventListener("click", function () { closeMenu(true); });
    menu.addEventListener("click", function (e) { var a = e.target.closest && e.target.closest("a"); if (a && a.getAttribute("href").charAt(0) === "#") closeMenu(false); });
    document.addEventListener("keydown", function (e) {
      if (menu.hidden) return;
      if (e.key === "Escape") { e.preventDefault(); closeMenu(true); return; }
      if (e.key === "Tab") {   // keep focus inside the open menu
        var f = menu.querySelectorAll("a, button"), first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    });
  }
  // the chapter index steps aside once the footer is on screen: there is no chapter there to point to
  var foot = $(".foot");
  if (foot && "IntersectionObserver" in window) new IntersectionObserver(function (es) { root.classList.toggle("at-foot", es[0].isIntersecting); }, { rootMargin: "0px 0px -8% 0px" }).observe(foot);
  window.VFSite = { route: route };
  // start once every script has run (the block's engine registers itself), never on a timer that can beat it
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", function () { go(true); });
  else go(true);
})();
