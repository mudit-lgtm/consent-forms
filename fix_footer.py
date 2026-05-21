#!/usr/bin/env python3
"""
fix_footer.py  v2
=================
Replaces <footer>...</footer> in every index.html with a
fully updated canonical footer that includes:
  - All 21 consent form pages linked
  - Policy pages: About Us, Privacy Policy, Terms, Contact Us
  - Desktop 5-col grid, 3-col tablet, 2-col small tablet, 1-col mobile
  - Inline CSS auto-injected into existing <style> tag
  - Idempotent: data-footer-version="fix_footer_v2" sentinel

USAGE:
  python fix_footer.py              # update all index.html files
  python fix_footer.py --dry-run    # preview only, no writes
  python fix_footer.py --root ./src # custom root directory
"""

import os, re, argparse, sys

FOOTER_SENTINEL  = 'data-footer-version="fix_footer_v2"'
CSS_SENTINEL     = "/* fix_footer_v2_css */"
CSS_SENTINEL_END = "/* fix_footer_v2_css_end */"

# ── Canonical Footer HTML ────────────────────────────────────
CANONICAL_FOOTER = """\
  <footer class="ftv2" data-footer-version="fix_footer_v2" role="contentinfo">
    <div class="ftv2-inner">

      <!-- Brand -->
      <div class="ftv2-brand">
        <a href="/" class="ftv2-logo" aria-label="InterviewConsentForms Home">
          <span class="ftv2-logo-icon" aria-hidden="true">&#128203;</span>
          <span class="ftv2-logo-text">InterviewConsentForms</span>
        </a>
        <p class="ftv2-tagline">
          Free interview consent form templates for researchers, journalists, students,
          UX designers, podcasters, and academics. Create, fill, and download in PDF or
          Word &mdash; no account needed.
        </p>
        <a href="/interview-consent-form/" class="ftv2-cta">Create Form Free &rarr;</a>
      </div>

      <!-- Col 1: Research -->
      <nav class="ftv2-col" aria-label="Research forms">
        <h4 class="ftv2-col-title">Research</h4>
        <a href="/interview-consent-form-for-research/">Research Interview Consent Form</a>
        <a href="/informed-interview-consent-form/">Informed Interview Consent Form</a>
        <a href="/irb-interview-consent-form/">IRB Interview Consent Form</a>
        <a href="/qualitative-interview-consent-form/">Qualitative Interview Consent Form</a>
        <a href="/focus-group-interview-consent-form/">Focus Group Interview Consent Form</a>
        <a href="/interview-consent-form/">Interview Consent Form</a>
      </nav>

      <!-- Col 2: Academic -->
      <nav class="ftv2-col" aria-label="Academic forms">
        <h4 class="ftv2-col-title">Academic</h4>
        <a href="/dissertation-interview-consent-form/">Dissertation Consent Form</a>
        <a href="/student-interview-consent-form/">Student Interview Consent Form</a>
        <a href="/participant-interview-consent-form/">Participant Interview Consent Form</a>
        <a href="/simple-interview-consent-form/">Simple Interview Consent Form</a>
        <a href="/interview-consent-form-template/">Interview Consent Form Template</a>
        <a href="/interview-consent-form-sample/">Interview Consent Form Sample</a>
      </nav>

      <!-- Col 3: Media & Online -->
      <nav class="ftv2-col" aria-label="Media and online forms">
        <h4 class="ftv2-col-title">Media &amp; Online</h4>
        <a href="/journalism-interview-consent-form/">Journalism Consent Form</a>
        <a href="/podcast-interview-consent-form/">Podcast Interview Consent Form</a>
        <a href="/media-interview-consent-form/">Media Interview Consent Form</a>
        <a href="/online-interview-consent-form/">Online Interview Consent Form</a>
        <a href="/video-interview-consent-form/">Video Interview Consent Form</a>
        <a href="/recording-interview-consent-form/">Recording Consent Form</a>
        <a href="/ux-interview-consent-form/">UX Interview Consent Form</a>
      </nav>

      <!-- Col 4: Resources + Company -->
      <nav class="ftv2-col" aria-label="Resources and company links">
        <h4 class="ftv2-col-title">Resources</h4>
        <a href="/how-to-write-an-interview-consent-form/">How to Write a Consent Form</a>
        <a href="/what-is-an-interview-consent-form/">What Is an Interview Consent Form?</a>
        <a href="/interview-consent-form-template/">Free Template (PDF &amp; Word)</a>

        <h4 class="ftv2-col-title ftv2-col-title--gap">Company</h4>
        <a href="/about-us/">About Us</a>
        <a href="/contact-us/">Contact Us</a>
        <a href="/privacy-policy/">Privacy Policy</a>
        <a href="/terms-and-conditions/">Terms &amp; Conditions</a>
      </nav>

    </div>

    <!-- Bottom bar -->
    <div class="ftv2-bottom">
      <div class="ftv2-bottom-inner">
        <p class="ftv2-copy">
          &copy; 2026 InterviewConsentForms &mdash; Templates are for informational purposes only and do not constitute legal advice.
        </p>
        <div class="ftv2-legal" aria-label="Legal links">
          <a href="/about-us/">About</a>
          <a href="/privacy-policy/">Privacy Policy</a>
          <a href="/terms-and-conditions/">Terms</a>
          <a href="/contact-us/">Contact</a>
          <a href="/sitemap.xml">Sitemap</a>
          <a href="/robots.txt">Robots.txt</a>
        </div>
      </div>
    </div>
  </footer>"""

# ── Footer CSS ───────────────────────────────────────────────
FOOTER_CSS = """\
    /* fix_footer_v2_css */
    .ftv2{background:#020617;color:rgba(255,255,255,.65);padding:4rem 0 0;border-top:1px solid #0f172a;font-size:.88rem}
    .ftv2-inner{max-width:1220px;margin:0 auto;padding:0 1.5rem;display:grid;grid-template-columns:2fr 1fr 1fr 1fr 1.2fr;gap:2.5rem;align-items:flex-start}
    .ftv2-logo{display:inline-flex;align-items:center;gap:.55rem;text-decoration:none;color:#fff;font-size:1rem;font-weight:800;margin-bottom:.85rem}
    .ftv2-logo-icon{width:32px;height:32px;background:#1d4ed8;border-radius:7px;display:flex;align-items:center;justify-content:center;font-size:.95rem;flex-shrink:0}
    .ftv2-logo-text{line-height:1.2}
    .ftv2-tagline{font-size:.82rem;color:rgba(255,255,255,.55);line-height:1.75;margin:0 0 1.25rem}
    .ftv2-cta{display:inline-block;background:#1d4ed8;color:#fff;text-decoration:none;font-size:.82rem;font-weight:700;padding:.5rem 1.1rem;border-radius:6px;transition:background .15s}
    .ftv2-cta:hover{background:#0f2d6e;color:#fff}
    .ftv2-col{display:flex;flex-direction:column}
    .ftv2-col-title{font-size:.68rem;font-weight:800;color:rgba(255,255,255,.35);text-transform:uppercase;letter-spacing:.12em;margin:0 0 .85rem}
    .ftv2-col-title--gap{margin-top:1.75rem}
    .ftv2-col a{font-size:.82rem;color:rgba(255,255,255,.6);text-decoration:none;margin-bottom:.42rem;line-height:1.45;transition:color .12s}
    .ftv2-col a:hover{color:#fff}
    .ftv2-bottom{border-top:1px solid rgba(255,255,255,.07);margin-top:3rem;padding:1.35rem 0 1.5rem}
    .ftv2-bottom-inner{max-width:1220px;margin:0 auto;padding:0 1.5rem;display:flex;align-items:center;justify-content:space-between;gap:1rem;flex-wrap:wrap}
    .ftv2-copy{margin:0;font-size:.76rem;color:rgba(255,255,255,.35)}
    .ftv2-legal{display:flex;flex-wrap:wrap;gap:1.25rem}
    .ftv2-legal a{font-size:.76rem;color:rgba(255,255,255,.45);text-decoration:none;font-weight:500;transition:color .12s}
    .ftv2-legal a:hover{color:#fff}
    @media(max-width:1100px){
      .ftv2-inner{grid-template-columns:1fr 1fr 1fr;gap:2rem}
      .ftv2-brand{grid-column:1/-1}
    }
    @media(max-width:700px){
      .ftv2-inner{grid-template-columns:1fr 1fr;gap:1.5rem 2rem}
      .ftv2-brand{grid-column:1/-1}
    }
    @media(max-width:480px){
      .ftv2-inner{grid-template-columns:1fr;padding:0 1rem}
      .ftv2-bottom-inner{flex-direction:column;align-items:flex-start;padding:0 1rem}
      .ftv2-legal{gap:.85rem}
    }
    /* fix_footer_v2_css_end */"""


# ── Helpers ──────────────────────────────────────────────────

def find_html_files(root):
    files = []
    for dp, dns, fns in os.walk(root):
        dns[:] = [d for d in dns if not d.startswith('.')
                  and d not in ('node_modules', '__pycache__', '.git')]
        for fn in fns:
            if fn == 'index.html':
                files.append(os.path.join(dp, fn))
    return sorted(files)


def replace_footer_block(html):
    """Find <footer>...</footer> and replace with CANONICAL_FOOTER."""
    m = re.search(r'<footer\b[^>]*>', html, re.IGNORECASE)
    if not m:
        return html, 'no-footer'
    start  = m.start()
    search = m.end()
    depth  = 1
    end    = search
    while depth > 0:
        nopen  = html.lower().find('<footer', search)
        nclose = html.lower().find('</footer>', search)
        if nclose == -1:
            return html, 'unclosed'
        if nopen != -1 and nopen < nclose:
            depth  += 1
            search  = nopen + 7
        else:
            depth -= 1
            end    = nclose + len('</footer>')
            search = end
    return html[:start] + CANONICAL_FOOTER + html[end:], 'replaced'


def ensure_footer_css(html):
    """Remove old footer CSS block (v1 or v2) then inject fresh CSS."""
    html = re.sub(
        r'/\* fix_footer_v[12]_css \*/.*?/\* fix_footer_v[12]_css_end \*/',
        '', html, flags=re.DOTALL
    )
    pos = html.find('</style>')
    if pos == -1:
        pos = html.find('</head>')
        if pos == -1:
            return html
        html = html[:pos] + '<style>\n' + FOOTER_CSS + '\n</style>\n' + html[pos:]
    else:
        html = html[:pos] + '\n' + FOOTER_CSS + '\n' + html[pos:]
    return html


def process_file(path, dry=False):
    try:
        with open(path, 'r', encoding='utf-8') as f:
            original = f.read()
    except Exception as e:
        print(f'  [ERROR] read  {os.path.relpath(path)}: {e}')
        return 'error'

    if FOOTER_SENTINEL in original and CSS_SENTINEL in original:
        print(f'  [SKIP]  {os.path.relpath(path)}')
        return 'skip'

    html = ensure_footer_css(original)
    html, status = replace_footer_block(html)

    if status == 'no-footer':
        print(f'  [WARN]  no <footer> found   — {os.path.relpath(path)}')
        return 'warn'
    if status == 'unclosed':
        print(f'  [WARN]  unclosed <footer>   — {os.path.relpath(path)}')
        return 'warn'

    if dry:
        print(f'  [DRY]   would update        — {os.path.relpath(path)}')
        return 'dry'

    try:
        with open(path, 'w', encoding='utf-8') as f:
            f.write(html)
        print(f'  [DONE]  updated             — {os.path.relpath(path)}')
        return 'done'
    except Exception as e:
        print(f'  [ERROR] write {os.path.relpath(path)}: {e}')
        return 'error'


# ── Main ──────────────────────────────────────────────────────

def main():
    parser = argparse.ArgumentParser(
        description='Replace <footer> in all index.html files with canonical footer v2.')
    parser.add_argument('--root',    default='.',   help='Repo root (default: .)')
    parser.add_argument('--dry-run', action='store_true', help='Preview only, no file writes')
    args = parser.parse_args()

    root = os.path.abspath(args.root)
    if not os.path.isdir(root):
        print(f'ERROR: {root} is not a directory.'); sys.exit(1)

    mode = 'DRY RUN' if args.dry_run else 'LIVE'
    print(f'\nfix_footer.py  v2  [{mode}]')
    print(f'Root : {root}')
    print('─' * 62)

    files = find_html_files(root)
    if not files:
        print('No index.html files found.'); sys.exit(0)

    stats = dict(done=0, skip=0, dry=0, warn=0, error=0)
    for path in files:
        r = process_file(path, dry=args.dry_run)
        stats[r] = stats.get(r, 0) + 1

    print('─' * 62)
    if args.dry_run:
        print(f"Would update : {stats['dry']}")
        print(f"Already good : {stats['skip']}")
        print(f"Warnings     : {stats['warn']}\n")
    else:
        print(f"Updated  : {stats['done']}")
        print(f"Skipped  : {stats['skip']}")
        print(f"Warnings : {stats['warn']}")
        print(f"Errors   : {stats['error']}\n")


if __name__ == '__main__':
    main()
