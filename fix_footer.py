#!/usr/bin/env python3
"""
fix_footer.py
=============
- Har index.html me <footer>...</footer> ko ek canonical footer se replace karta hai.
- Canonical footer me:
    - Existing multi-column design (brand + categories)
    - Niche bottom row: About Us, Privacy Policy, Terms, Contact, Sitemap, Robots.txt
- Idempotent: data-footer-version="fix_footer_v1" sentinel ke basis par repeat run safe hai.

HOW TO RUN (locally):
  python fix_footer.py          # ya GitHub Actions workflow se run karein
"""

import os
import re
import argparse
import sys

FOOTER_SENTINEL = 'data-footer-version="fix_footer_v1"'


CANONICAL_FOOTER = '''  <footer class="footer" ''' + FOOTER_SENTINEL + '''>
    <div class="footer-inner container">

      <!-- Left brand/description column -->
      <div class="footer-brand">
        <a href="/" class="footer-logo">
          <span class="footer-logo-icon" aria-hidden="true">📋</span>
          <span class="footer-logo-text">InterviewConsentForms</span>
        </a>
        <p class="footer-tagline">
          Free interview consent form templates for researchers, journalists, students, UX designers, podcasters, and
          academics. Create, fill, and download in PDF or Word — no account needed.
        </p>
      </div>

      <!-- Link columns -->
      <div class="footer-columns" aria-label="Footer navigation">
        <div class="footer-column">
          <h3 class="footer-column-title">Research</h3>
          <a href="/interview-consent-form-for-research/">Research Interview Consent Form</a>
          <a href="/consent-form-for-interview/">Consent Form for Interview</a>
          <a href="/informed-interview-consent-form/">Informed Interview Consent Form</a>
          <a href="/irb-interview-consent-form/">IRB Interview Consent Form</a>
          <a href="/qualitative-interview-consent-form/">Qualitative Interview Consent Form</a>
          <a href="/focus-group-interview-consent-form/">Focus Group Interview Consent Form</a>
        </div>

        <div class="footer-column">
          <h3 class="footer-column-title">Academic</h3>
          <a href="/dissertation-interview-consent-form/">Dissertation Interview Consent Form</a>
          <a href="/student-interview-consent-form/">Student Interview Consent Form</a>
          <a href="/participant-interview-consent-form/">Participant Interview Consent Form</a>

          <h3 class="footer-column-title footer-column-title--spaced">Media &amp; Press</h3>
          <a href="/journalism-interview-consent-form/">Journalism Interview Consent Form</a>
          <a href="/podcast-interview-consent-form/">Podcast Interview Consent Form</a>
          <a href="/media-interview-consent-form/">Media Interview Consent Form</a>
        </div>

        <div class="footer-column">
          <h3 class="footer-column-title">Online &amp; Remote</h3>
          <a href="/online-interview-consent-form/">Online Interview Consent Form</a>
          <a href="/video-interview-consent-form/">Video Interview Consent Form</a>
          <a href="/recording-interview-consent-form/">Recording Interview Consent Form</a>
          <a href="/ux-interview-consent-form/">UX Interview Consent Form</a>
        </div>

        <div class="footer-column">
          <h3 class="footer-column-title">Resources</h3>
          <a href="/create-interview-consent-form/">Create Interview Consent Form</a>
          <a href="/interview-consent-form-template/">Interview Consent Form Template</a>
          <a href="/interview-consent-form-sample/">Samples &amp; Examples</a>
          <a href="/simple-interview-consent-form/">Simple Interview Consent Form</a>
          <a href="/how-to-write-an-interview-consent-form/">How to Write a Consent Form</a>
          <a href="/what-is-an-interview-consent-form/">What Is an Interview Consent Form?</a>
        </div>
      </div>
    </div>

    <!-- Bottom legal + utility row -->
    <div class="footer-bottom">
      <div class="footer-bottom-inner container">
        <p class="footer-bottom-text">
          © 2026 InterviewConsentForms. Templates are provided for informational purposes only and do not constitute legal advice.
        </p>
        <div class="footer-bottom-links">
          <a href="/about-us/">About Us</a>
          <a href="/privacy-policy/">Privacy Policy</a>
          <a href="/terms-and-conditions/">Terms &amp; Conditions</a>
          <a href="/contact-us/">Contact Us</a>
          <a href="/sitemap.xml">Sitemap</a>
          <a href="/robots.txt">Robots.txt</a>
        </div>
      </div>
    </div>
  </footer>'''


FOOTER_CSS_SENTINEL = '/* fix_footer_v1_css */'
FOOTER_CSS = '''
    ''' + FOOTER_CSS_SENTINEL + '''
    .footer {
      background: #020617;
      color: #e5e7eb;
      padding-block: 3rem 2rem;
      border-top: 1px solid #0f172a;
      font-size: 0.9rem;
    }
    .footer-inner {
      display: flex;
      gap: 3rem;
      align-items: flex-start;
      justify-content: space-between;
    }
    .footer-brand {
      max-width: 280px;
    }
    .footer-logo {
      display: inline-flex;
      align-items: center;
      gap: 0.6rem;
      text-decoration: none;
      color: #f9fafb;
      font-weight: 700;
      margin-bottom: 0.75rem;
    }
    .footer-logo-icon {
      width: 32px;
      height: 32px;
      border-radius: 0.9rem;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #1d4ed8;
      font-size: 1.1rem;
    }
    .footer-logo-text {
      font-size: 1rem;
    }
    .footer-tagline {
      margin: 0;
      color: #9ca3af;
      line-height: 1.7;
    }
    .footer-columns {
      display: grid;
      grid-template-columns: repeat(4, minmax(0, 1fr));
      gap: 2.5rem;
      flex: 1;
    }
    .footer-column-title {
      font-size: 0.75rem;
      text-transform: uppercase;
      letter-spacing: 0.14em;
      color: #9ca3af;
      margin-bottom: 1rem;
    }
    .footer-column-title--spaced {
      margin-top: 1.75rem;
    }
    .footer-column a {
      display: block;
      font-size: 0.86rem;
      color: #e5e7eb;
      text-decoration: none;
      margin-bottom: 0.35rem;
    }
    .footer-column a:hover {
      color: #f9fafb;
    }
    .footer-bottom {
      border-top: 1px solid #111827;
      margin-top: 2.5rem;
      padding-top: 1.25rem;
      font-size: 0.78rem;
      color: #6b7280;
    }
    .footer-bottom-inner {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 1.5rem;
    }
    .footer-bottom-text {
      margin: 0;
    }
    .footer-bottom-links {
      display: flex;
      flex-wrap: wrap;
      gap: 1.25rem;
    }
    .footer-bottom-links a {
      color: inherit;
      text-decoration: none;
      font-weight: 500;
    }
    .footer-bottom-links a:hover {
      color: #e5e7eb;
    }
    @media (max-width: 960px) {
      .footer-inner {
        flex-direction: column;
        align-items: flex-start;
      }
      .footer-columns {
        grid-template-columns: repeat(2, minmax(0, 1fr));
      }
    }
    @media (max-width: 640px) {
      .footer-columns {
        grid-template-columns: 1fr;
      }
      .footer-bottom-inner {
        flex-direction: column;
        align-items: flex-start;
      }
    }
    /* fix_footer_v1_css_end */
'''


def find_html_files(root: str):
    files = []
    for dirpath, dirnames, filenames in os.walk(root):
        dirnames[:] = [d for d in dirnames if not d.startswith('.') and d not in ('node_modules', '__pycache__')]
        for fname in filenames:
            if fname == 'index.html':
                files.append(os.path.join(dirpath, fname))
    return sorted(files)


def replace_footer_block(html: str):
    m_start = re.search(r'<footer\\b[^>]*>', html, flags=re.IGNORECASE)
    if not m_start:
        return html, 'no-footer'

    start = m_start.start()
    search = m_start.end()
    depth = 1
    end = search

    while depth > 0:
        nopen = html.lower().find('<footer', search)
        nclose = html.lower().find('</footer>', search)
        if nclose == -1:
            return html, 'unclosed'
        if nopen != -1 and nopen < nclose:
            depth += 1
            search = nopen + 7
        else:
            depth -= 1
            end = nclose + len('</footer>')
            search = end

    new_html = html[:start] + CANONICAL_FOOTER + html[end:]
    return new_html, 'replaced'


def ensure_footer_css(html: str):
    # remove old footer-css block if exists
    html = re.sub(
        r'/\\* fix_footer_v1_css \\*/.*?/\\* fix_footer_v1_css_end \\*/',
        '',
        html,
        flags=re.DOTALL
    )
    pos = html.find('</style>')
    if pos == -1:
        # if no style tag, inject before </head>
        pos = html.find('</head>')
        if pos == -1:
            return html
        html = html[:pos] + '<style>' + FOOTER_CSS + '</style>\n' + html[pos:]
    else:
        html = html[:pos] + FOOTER_CSS + html[pos:]
    return html


def process_file(path: str, dry: bool = False):
    try:
        with open(path, 'r', encoding='utf-8') as f:
            original = f.read()
    except Exception as e:
        print(f'  [ERROR] Cannot read {path}: {e}')
        return 'error'

    if FOOTER_SENTINEL in original and FOOTER_CSS_SENTINEL in original:
        print(f'  [SKIP]  Already up to date: {os.path.relpath(path)}')
        return 'skip'

    html = ensure_footer_css(original)
    html, status = replace_footer_block(html)

    if status == 'no-footer':
        print(f'  [WARN]  No <footer> found: {os.path.relpath(path)}')
        return 'warn'
    if status == 'unclosed':
        print(f'  [WARN]  Unclosed <footer> tag: {os.path.relpath(path)}')
        return 'warn'

    if dry:
        print(f'  [DRY]   Would update: {os.path.relpath(path)}')
        return 'dry'

    try:
        with open(path, 'w', encoding='utf-8') as f:
            f.write(html)
        print(f'  [DONE]  Updated: {os.path.relpath(path)}')
        return 'done'
    except Exception as e:
        print(f'  [ERROR] Cannot write {path}: {e}')
        return 'error'


def main():
    parser = argparse.ArgumentParser(description='Replace footer across all index.html files.')
    parser.add_argument('--root', default='.', help='Repo root (default: .)')
    parser.add_argument('--dry-run', action='store_true', help='Preview changes only')
    args = parser.parse_args()

    root = os.path.abspath(args.root)
    if not os.path.isdir(root):
        print(f'ERROR: {root} is not a directory.')
        sys.exit(1)

    mode = 'DRY RUN' if args.dry_run else 'LIVE'
    print(f'\nfix_footer.py [{mode}]')
    print(f'Root: {root}')
    print('------------------------------------------------------------')

    files = find_html_files(root)
    if not files:
        print('No index.html files found.')
        sys.exit(0)

    stats = {'done':0,'skip':0,'dry':0,'warn':0,'error':0}
    for path in files:
        result = process_file(path, dry=args.dry_run)
        stats[result] = stats.get(result, 0) + 1

    print('------------------------------------------------------------')
    if args.dry_run:
        print(f"Would update : {stats['dry']}")
        print(f"Already good : {stats['skip']}")
        print(f"Warnings     : {stats['warn']}\n")
    else:
        print(f"Updated      : {stats['done']}")
        print(f"Skipped      : {stats['skip']}")
        print(f"Warnings     : {stats['warn']}")
        print(f"Errors       : {stats['error']}\n")


if __name__ == '__main__':
    main()
