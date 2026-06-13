#!/usr/bin/env python3
"""
patch_site.py  v1
=================
One-shot patcher for consentforms.xyz HTML pages.

Changes made to every index.html:
  1. Canonical tag  -> consentforms.xyz  (replaces vercel.app)
  2. OG URL tag     -> consentforms.xyz
  3. Cookie consent banner (before </body>)
  4. Author box     (before <footer> on template pages)
  5. Legal disclaimer box (after <main> opens, on template pages)

USAGE:
  python patch_site.py              # patch all index.html files
  python patch_site.py --dry-run    # preview only, no writes
  python patch_site.py --root ./src # custom root directory

IDEMPOTENT: sentinel comments prevent double-patching.
"""

import os, re, argparse, sys

# ── CONFIG ────────────────────────────────────────────────────────────────────
SITE_DOMAIN     = "consentforms.xyz"
OLD_DOMAIN      = "consentforms.vercel.app"
AUTHOR_NAME     = "Mudit Agarwal"
AUTHOR_INITIALS = "MA"
AUTHOR_TITLE    = "Digital Marketing Specialist &amp; Web Content Researcher"
AUTHOR_BIO      = (
    "Mudit Agarwal is a digital marketer with 8+ years of experience in content "
    "strategy and web publishing. He built ConsentForms.xyz to help researchers, "
    "journalists, UX designers, and students access professionally structured "
    "consent templates. All templates are researched against IRB guidelines, "
    "APA standards, and institutional requirements."
)
LINKEDIN_URL    = "https://www.linkedin.com/in/mudit-agarwal-62b03939/"
ABOUT_URL       = f"https://{SITE_DOMAIN}/about-us/"
REVIEW_DATE     = "June 2026"

# Sentinel strings — prevent double-patching
S_COOKIE     = "<!-- patch_cookie_v1 -->"
S_AUTHOR     = "<!-- patch_author_v1 -->"
S_DISCLAIMER = "<!-- patch_disclaimer_v1 -->"

# Pages that should NOT get author box / disclaimer
SKIP_AUTHOR_SLUGS = {
    "about-us", "contact-us", "privacy-policy",
    "terms-and-conditions", "sitemap", "404"
}

# ── HTML BLOCKS ───────────────────────────────────────────────────────────────

COOKIE_BANNER = """<!-- patch_cookie_v1 -->
<div id="cf-cookie-bar" style="display:none;position:fixed;bottom:0;left:0;right:0;
  background:#0f172a;color:#e2e8f0;padding:1rem 1.5rem;z-index:99999;
  font-family:inherit;font-size:.83rem;border-top:1px solid #1e293b;
  box-shadow:0 -4px 24px rgba(0,0,0,.35)">
  <div style="max-width:960px;margin:0 auto;display:flex;align-items:center;
    justify-content:space-between;gap:1rem;flex-wrap:wrap">
    <p style="margin:0;line-height:1.6">
      We use cookies, including Google AdSense advertising cookies, to improve your
      experience and serve relevant ads. Read our
      <a href="/privacy-policy/" style="color:#93c5fd;font-weight:600">Privacy Policy</a>
      to learn more.
    </p>
    <div style="display:flex;gap:.6rem;flex-shrink:0">
      <button onclick="cfAcceptCookies()"
        style="background:#1d4ed8;color:#fff;border:none;padding:.45rem 1.1rem;
          border-radius:6px;cursor:pointer;font-family:inherit;font-weight:700;
          font-size:.82rem">Accept All</button>
      <button onclick="cfDeclineCookies()"
        style="background:transparent;color:#94a3b8;border:1px solid #334155;
          padding:.45rem 1rem;border-radius:6px;cursor:pointer;font-family:inherit;
          font-size:.82rem">Decline</button>
    </div>
  </div>
</div>
<script>
(function(){
  var k = 'cf_cookie_consent';
  var v = localStorage.getItem(k);
  if (!v) { document.getElementById('cf-cookie-bar').style.display = 'block'; }
  window.cfAcceptCookies = function() {
    localStorage.setItem(k, 'accepted');
    document.getElementById('cf-cookie-bar').style.display = 'none';
  };
  window.cfDeclineCookies = function() {
    localStorage.setItem(k, 'declined');
    document.getElementById('cf-cookie-bar').style.display = 'none';
  };
})();
</script>"""

DISCLAIMER_BOX = """<!-- patch_disclaimer_v1 -->
<div style="background:#fef3c7;border:1px solid #f59e0b;border-radius:8px;
  padding:.9rem 1.2rem;margin:1.5rem 0 1rem;font-size:.83rem;color:#78350f;
  line-height:1.6;font-family:inherit">
  &#9888;&#65039; <strong>Legal Disclaimer:</strong> This template is provided for
  informational and general reference purposes only. It does <strong>not</strong>
  constitute legal advice. Consent form requirements vary by jurisdiction,
  institution, and research type. Consult your institution's IRB office or a
  qualified legal professional for guidance specific to your situation.
</div>"""

AUTHOR_BOX = f"""<!-- patch_author_v1 -->
<div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:10px;
  padding:1.25rem 1.5rem;margin:2.5rem 0 1rem;display:flex;gap:1rem;
  align-items:flex-start;font-family:inherit">
  <div style="width:52px;height:52px;border-radius:50%;background:#1d4ed8;
    display:flex;align-items:center;justify-content:center;color:#fff;
    font-size:1.1rem;font-weight:800;flex-shrink:0;letter-spacing:-.02em">
    {AUTHOR_INITIALS}
  </div>
  <div style="min-width:0">
    <p style="margin:0 0 .15rem;font-weight:800;font-size:.95rem;color:#0f172a">
      {AUTHOR_NAME}
    </p>
    <p style="margin:0 0 .5rem;font-size:.78rem;color:#64748b;font-weight:600">
      {AUTHOR_TITLE}
    </p>
    <p style="margin:0;font-size:.82rem;color:#475569;line-height:1.65">
      {AUTHOR_BIO}
      <a href="{ABOUT_URL}" style="color:#1d4ed8;font-weight:700"> Learn more &rarr;</a>
    </p>
    <p style="margin:.55rem 0 0;font-size:.76rem;color:#94a3b8">
      &#128197; Last reviewed: {REVIEW_DATE} &nbsp;&bull;&nbsp;
      <a href="{LINKEDIN_URL}" target="_blank" rel="noopener noreferrer"
        style="color:#1d4ed8;font-weight:600">LinkedIn Profile</a>
    </p>
  </div>
</div>"""

# ── HELPERS ───────────────────────────────────────────────────────────────────

def find_html_files(root):
    files = []
    for dp, dns, fns in os.walk(root):
        dns[:] = [d for d in dns if not d.startswith('.')
                  and d not in ('node_modules', '__pycache__', '.git', '.vercel')]
        for fn in fns:
            if fn == 'index.html':
                files.append(os.path.join(dp, fn))
    return sorted(files)


def get_slug(path):
    parts = path.replace('\\', '/').split('/')
    if 'index.html' in parts:
        idx = parts.index('index.html')
        if idx > 0:
            return parts[idx - 1].lower()
    return ''


def is_template_page(path, root):
    slug = get_slug(path)
    if slug in SKIP_AUTHOR_SLUGS:
        return False
    if os.path.abspath(path) == os.path.join(os.path.abspath(root), 'index.html'):
        return False
    return True


def fix_canonical(html):
    html = re.sub(
        r'(<link[^>]+rel=["\']canonical["\'][^>]+href=["\'])https?://' + re.escape(OLD_DOMAIN),
        r'\1https://' + SITE_DOMAIN,
        html, flags=re.IGNORECASE
    )
    html = re.sub(
        r'(<link[^>]+href=["\'])https?://' + re.escape(OLD_DOMAIN) + r'(["\'][^>]+rel=["\']canonical["\'])',
        r'\1https://' + SITE_DOMAIN + r'\2',
        html, flags=re.IGNORECASE
    )
    html = re.sub(
        r'(<meta[^>]+property=["\']og:url["\'][^>]+content=["\'])https?://' + re.escape(OLD_DOMAIN),
        r'\1https://' + SITE_DOMAIN,
        html, flags=re.IGNORECASE
    )
    return html


def inject_cookie_banner(html):
    if S_COOKIE in html:
        return html, False
    pos = html.lower().rfind('</body>')
    if pos == -1:
        return html, False
    return html[:pos] + '\n' + COOKIE_BANNER + '\n' + html[pos:], True


def inject_disclaimer(html):
    if S_DISCLAIMER in html:
        return html, False
    for tag in ['<main', '<article']:
        m = re.search(tag + r'[^>]*>', html, re.IGNORECASE)
        if m:
            pos = m.end()
            return html[:pos] + '\n' + DISCLAIMER_BOX + html[pos:], True
    return html, False


def inject_author_box(html):
    if S_AUTHOR in html:
        return html, False
    m = re.search(r'<footer\b', html, re.IGNORECASE)
    if m:
        return html[:m.start()] + AUTHOR_BOX + '\n' + html[m.start():], True
    m = re.search(r'</main>', html, re.IGNORECASE)
    if m:
        return html[:m.start()] + AUTHOR_BOX + '\n' + html[m.start():], True
    return html, False


def process_file(path, root, dry=False):
    try:
        with open(path, 'r', encoding='utf-8') as f:
            original = f.read()
    except Exception as e:
        print(f'  [ERROR] read  {os.path.relpath(path)}: {e}')
        return 'error'

    html = original
    changes = []

    fixed = fix_canonical(html)
    if fixed != html:
        html = fixed
        changes.append('canonical')

    html, added = inject_cookie_banner(html)
    if added:
        changes.append('cookie-banner')

    if is_template_page(path, root):
        html, added = inject_disclaimer(html)
        if added:
            changes.append('disclaimer')
        html, added = inject_author_box(html)
        if added:
            changes.append('author-box')

    if not changes:
        print(f'  [SKIP]  {os.path.relpath(path)}')
        return 'skip'

    if dry:
        print(f'  [DRY]   {os.path.relpath(path):<55}  changes: {", ".join(changes)}')
        return 'dry'

    try:
        with open(path, 'w', encoding='utf-8') as f:
            f.write(html)
        print(f'  [DONE]  {os.path.relpath(path):<55}  changes: {", ".join(changes)}')
        return 'done'
    except Exception as e:
        print(f'  [ERROR] write {os.path.relpath(path)}: {e}')
        return 'error'


# ── MAIN ──────────────────────────────────────────────────────────────────────

def main():
    parser = argparse.ArgumentParser(
        description='patch_site.py — canonical + cookie banner + author box + disclaimer')
    parser.add_argument('--root',    default='.', help='Repo root (default: .)')
    parser.add_argument('--dry-run', action='store_true', help='Preview only, no writes')
    args = parser.parse_args()

    root = os.path.abspath(args.root)
    if not os.path.isdir(root):
        print(f'ERROR: {root} is not a directory.')
        sys.exit(1)

    mode = 'DRY RUN' if args.dry_run else 'LIVE'
    print(f'\npatch_site.py  v1  [{mode}]')
    print(f'Root   : {root}')
    print(f'Domain : {OLD_DOMAIN}  ->  {SITE_DOMAIN}')
    print('─' * 70)

    files = find_html_files(root)
    if not files:
        print('No index.html files found.')
        sys.exit(0)

    stats = {}
    for path in files:
        r = process_file(path, root, dry=args.dry_run)
        stats[r] = stats.get(r, 0) + 1

    print('─' * 70)
    if args.dry_run:
        print(f"  Would update : {stats.get('dry', 0)}")
        print(f"  Already good : {stats.get('skip', 0)}")
        print(f"  Errors       : {stats.get('error', 0)}")
    else:
        print(f"  Updated  : {stats.get('done', 0)}")
        print(f"  Skipped  : {stats.get('skip', 0)}")
        print(f"  Errors   : {stats.get('error', 0)}")
    print()


if __name__ == '__main__':
    main()
