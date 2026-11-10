"""The live site's check (GitHub Actions, every 30 minutes; .github/workflows/site-check.yml in vf-website-live).

It checks the live site, https://virtualfudge.com/ (10 Nov 2026: it used to read the CNAME beside it, which is the old
password preview virtualfudgehq.com, so the live site went unwatched). If a page shows the password screen it checks that;
otherwise that the page and its code arrive, the page starts (the live
3D, or the stills where the runner has no graphics card) with no script error, the main pages open, a phone loads too, and an
old virtualfudge.com address lands where it should. Any failure fails the run, and GitHub emails whoever owns the check.
Nothing is sent anywhere else; nothing is filled in or submitted.
"""
import json, os, sys, time, urllib.request
from playwright.sync_api import sync_playwright

here = os.path.dirname(os.path.abspath(__file__))
domain = "virtualfudge.com"   # the live site (Hostinger), not the preview this check's repo serves
base = os.environ.get("CHECK_BASE") or "https://" + domain + "/"   # (CHECK_BASE: a local dry run of the public copy)
problems, notes = [], []


def fetch(url):
    t0 = time.time()
    req = urllib.request.Request(url, headers={"User-Agent": "VF site check (GitHub Actions)", "Cache-Control": "no-cache"})
    with urllib.request.urlopen(req, timeout=30) as r:
        return r.status, r.read(), time.time() - t0


# 1. the address answers, over HTTPS, quickly
try:
    status, body, secs = fetch(base + "?check=" + str(int(time.time())))
    notes.append("%s answered %d in %.1f s (%d KB)" % (base, status, secs, len(body) // 1024))
    if secs > 10: problems.append("the page took %.1f s to arrive" % secs)
except Exception as e:
    print("FAIL: %s did not answer: %s" % (base, e)); sys.exit(1)
locked = b'id="lock"' in body
# (behind the password the code goes out inside the page, encrypted: then only the plain files are asked for)
for a in (() if locked else ("assets/site.js", "assets/block.js", "assets/block.css")) + ("assets/stills/top.jpg", "assets/media/tryon-face.mp4"):
    try:
        st, b, s = fetch(base + a)
        if st != 200 or len(b) < 1000: problems.append("%s: %d, %d bytes" % (a, st, len(b)))
    except Exception as e:
        problems.append("%s did not load: %s" % (a, e))

# 2. a real browser: no script errors, the page starts, the pages open
with sync_playwright() as p:
    b = p.chromium.launch(channel="chrome")
    for name, vp, mobile in (("desktop", {"width": 1440, "height": 900}, False), ("phone", {"width": 390, "height": 844}, True)):
        ctx = b.new_context(viewport=vp, is_mobile=mobile, has_touch=mobile, device_scale_factor=2 if mobile else 1)
        pg = ctx.new_page(); errs, bad = [], []
        pg.on("pageerror", lambda e: errs.append(str(e)[:200]))
        pg.on("response", lambda r: bad.append("%d %s" % (r.status, r.url)) if r.status >= 400 and r.url.startswith(base) and not r.url.endswith("favicon.ico") else None)
        pg.goto(base, wait_until="load", timeout=60000)
        if locked:
            pg.wait_for_selector("#lock", timeout=20000)
            notes.append(name + ": the password screen is up (the site is private)")
        else:
            try:
                pg.wait_for_function("document.documentElement.classList.contains('ready') || document.documentElement.classList.contains('no-gl')", timeout=45000)
                mode = pg.evaluate("document.documentElement.classList.contains('no-gl') ? 'stills' : 'live 3D'")
                notes.append(name + ": the page started (" + mode + ")")
            except Exception:
                problems.append(name + ": the page never started (neither the 3D nor the stills) in 45 s")
            if name == "desktop":
                for route in ("work", "studio", "for-retail", "blog", "contact", "start", "shows", "work-noyah-tryon"):
                    pg.evaluate("location.hash = %s" % json.dumps(route)); time.sleep(1.2)
                    h1 = pg.evaluate("(document.querySelector('#page h1') || {}).textContent || ''")
                    if not h1.strip(): problems.append("#" + route + ": no heading (the page didn't render)")
                pg.evaluate("location.hash = ''"); time.sleep(0.5)
                # a real page opens as itself (its own address and heading), and an old address forwards to its real page
                pg.goto(base + "industries/ar-in-retail/", wait_until="domcontentloaded", timeout=30000); time.sleep(2)
                h1 = pg.evaluate("(document.querySelector('#page h1') || {}).textContent || ''")
                if "/industries/ar-in-retail/" not in pg.url or not h1.strip(): problems.append("the page /industries/ar-in-retail/ ended at " + pg.url + " with heading '" + h1.strip()[:60] + "'")
                pg.goto(base + "about/", wait_until="domcontentloaded", timeout=30000); time.sleep(3)
                if "/about-us/" not in pg.url: problems.append("the old address /about/ ended at " + pg.url + " (should be /about-us/)")
                for path in ("story/", "sitemap.xml"):
                    try:
                        st, b2, s2 = fetch(base + path)
                        if st != 200 or len(b2) < 500: problems.append("%s: %d, %d bytes" % (path, st, len(b2)))
                    except Exception as e: problems.append("%s did not load: %s" % (path, e))
        if errs: problems.append(name + ": script errors: " + "; ".join(errs[:3]))
        if bad: problems.append(name + ": failed requests: " + "; ".join(bad[:5]))
        ctx.close()
    b.close()

report = "\n".join(["Checked " + base + " at " + time.strftime("%Y-%m-%d %H:%M UTC", time.gmtime())] + ["ok   " + n for n in notes] + ["FAIL " + q for q in problems])
print(report)
if os.environ.get("GITHUB_STEP_SUMMARY"):
    open(os.environ["GITHUB_STEP_SUMMARY"], "a").write("```\n" + report + "\n```\n")
sys.exit(1 if problems else 0)
