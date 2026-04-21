#!/usr/bin/env python3
"""
fix_nav.py
==========
Replaces the <header>...</header> block in every index.html across
the repo with a single canonical nav that includes:
  - Consistent desktop mega-dropdown navigation
  - Fully working mobile hamburger menu with slide-in drawer
  - Accessible keyboard navigation (Enter / Space / Escape)
  - All nav CSS and JS self-contained — no external file dependency

IDEMPOTENT: Safe to run multiple times. Already-updated files are skipped.

HOW TO RUN
----------
  python3 fix_nav.py [--root PATH] [--dry-run]

  --root PATH   Root directory of your repo (default: current directory)
  --dry-run     Preview which files would change, without writing anything

EXAMPLES
--------
  # From inside your repo root:
  python3 fix_nav.py

  # Preview without writing:
  python3 fix_nav.py --dry-run

  # Specify a custom path:
  python3 fix_nav.py --root /path/to/repo
"""

import os, re, argparse, sys

# Sentinel used to detect already-processed files (idempotency)
SENTINEL = 'data-nav-version="fix_nav_v2"'

# ─────────────────────────────────────────────────────────────────────────────
# CANONICAL HEADER HTML
# ─────────────────────────────────────────────────────────────────────────────
CANONICAL_HEADER = '''  <header class="site-header" role="banner" ''' + SENTINEL + '''>
    <nav class="navbar container" aria-label="Main navigation">

      <a href="/" class="nav-logo" aria-label="InterviewConsentForms Home">
        <span class="nav-logo-icon" aria-hidden="true">&#128203;</span>
        InterviewConsentForms
      </a>

      <ul class="nav-menu" id="nav-menu" role="list">
        <li class="nav-item">
          <a href="/interview-consent-form-for-research/" class="nav-link" aria-haspopup="true" aria-expanded="false">Research <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg></a>
          <div class="nav-dropdown" role="menu">
            <p class="nav-dropdown-label">Research Forms</p>
            <a href="/interview-consent-form-for-research/" role="menuitem">Research Interview Consent Form</a>
            <a href="/informed-interview-consent-form/" role="menuitem">Informed Interview Consent Form</a>
            <a href="/irb-interview-consent-form/" role="menuitem">IRB Interview Consent Form</a>
            <a href="/qualitative-interview-consent-form/" role="menuitem">Qualitative Interview Consent Form</a>
            <a href="/focus-group-interview-consent-form/" role="menuitem">Focus Group Interview Consent Form</a>
          </div>
        </li>
        <li class="nav-item">
          <a href="/dissertation-interview-consent-form/" class="nav-link" aria-haspopup="true" aria-expanded="false">Academic <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg></a>
          <div class="nav-dropdown" role="menu">
            <p class="nav-dropdown-label">Academic Forms</p>
            <a href="/dissertation-interview-consent-form/" role="menuitem">Dissertation Interview Consent Form</a>
            <a href="/student-interview-consent-form/" role="menuitem">Student Interview Consent Form</a>
            <a href="/participant-interview-consent-form/" role="menuitem">Participant Interview Consent Form</a>
          </div>
        </li>
        <li class="nav-item">
          <a href="/journalism-interview-consent-form/" class="nav-link" aria-haspopup="true" aria-expanded="false">Media &amp; Press <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg></a>
          <div class="nav-dropdown" role="menu">
            <p class="nav-dropdown-label">Media &amp; Press Forms</p>
            <a href="/journalism-interview-consent-form/" role="menuitem">Journalism Interview Consent Form</a>
            <a href="/podcast-interview-consent-form/" role="menuitem">Podcast Interview Consent Form</a>
            <a href="/media-interview-consent-form/" role="menuitem">Media Interview Consent Form</a>
          </div>
        </li>
        <li class="nav-item">
          <a href="/online-interview-consent-form/" class="nav-link" aria-haspopup="true" aria-expanded="false">Online &amp; Remote <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg></a>
          <div class="nav-dropdown" role="menu">
            <p class="nav-dropdown-label">Online &amp; Remote Forms</p>
            <a href="/online-interview-consent-form/" role="menuitem">Online Interview Consent Form</a>
            <a href="/video-interview-consent-form/" role="menuitem">Video Interview Consent Form</a>
            <a href="/recording-interview-consent-form/" role="menuitem">Recording Interview Consent Form</a>
            <a href="/ux-interview-consent-form/" role="menuitem">UX Interview Consent Form</a>
          </div>
        </li>
        <li class="nav-item">
          <a href="/interview-consent-form-template/" class="nav-link" aria-haspopup="true" aria-expanded="false">Resources <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg></a>
          <div class="nav-dropdown" role="menu">
            <p class="nav-dropdown-label">Templates &amp; Guides</p>
            <a href="/interview-consent-form-template/" role="menuitem">Interview Consent Form Template</a>
            <a href="/interview-consent-form-sample/" role="menuitem">Interview Consent Form Sample</a>
            <a href="/simple-interview-consent-form/" role="menuitem">Simple Interview Consent Form</a>
            <a href="/how-to-write-an-interview-consent-form/" role="menuitem">How to Write an Interview Consent Form</a>
            <a href="/what-is-an-interview-consent-form/" role="menuitem">What Is an Interview Consent Form?</a>
          </div>
        </li>
      </ul>

      <a href="/interview-consent-form/" class="nav-cta">Create Form Free &#8594;</a>

      <button class="hamburger" id="hamburger-btn"
              aria-label="Open navigation menu"
              aria-expanded="false"
              aria-controls="nav-menu">
        <span class="ham-bar"></span>
        <span class="ham-bar"></span>
        <span class="ham-bar"></span>
      </button>

    </nav>

    <div class="mobile-overlay" id="mobile-overlay" aria-hidden="true"></div>

    <div class="mobile-drawer" id="mobile-drawer"
         aria-hidden="true" role="dialog" aria-modal="true"
         aria-label="Navigation menu">
      <div class="mobile-drawer-header">
        <a href="/" style="font-size:1rem;font-weight:800;color:#1a3f8f;text-decoration:none;display:flex;align-items:center;gap:.5rem;">
          <span style="width:28px;height:28px;background:#1d4ed8;border-radius:6px;display:flex;align-items:center;justify-content:center;font-size:.85rem;color:#fff;">&#128203;</span>
          InterviewConsentForms
        </a>
        <button class="mobile-close" id="mobile-close-btn" aria-label="Close navigation menu">&#10005;</button>
      </div>
      <nav aria-label="Mobile navigation">
        <div class="mob-section">
          <p class="mob-section-label">Research Forms</p>
          <a href="/interview-consent-form-for-research/">Research Interview Consent Form</a>
          <a href="/informed-interview-consent-form/">Informed Interview Consent Form</a>
          <a href="/irb-interview-consent-form/">IRB Interview Consent Form</a>
          <a href="/qualitative-interview-consent-form/">Qualitative Interview Consent Form</a>
          <a href="/focus-group-interview-consent-form/">Focus Group Interview Consent Form</a>
        </div>
        <div class="mob-section">
          <p class="mob-section-label">Academic Forms</p>
          <a href="/dissertation-interview-consent-form/">Dissertation Interview Consent Form</a>
          <a href="/student-interview-consent-form/">Student Interview Consent Form</a>
          <a href="/participant-interview-consent-form/">Participant Interview Consent Form</a>
        </div>
        <div class="mob-section">
          <p class="mob-section-label">Media &amp; Press Forms</p>
          <a href="/journalism-interview-consent-form/">Journalism Interview Consent Form</a>
          <a href="/podcast-interview-consent-form/">Podcast Interview Consent Form</a>
          <a href="/media-interview-consent-form/">Media Interview Consent Form</a>
        </div>
        <div class="mob-section">
          <p class="mob-section-label">Online &amp; Remote Forms</p>
          <a href="/online-interview-consent-form/">Online Interview Consent Form</a>
          <a href="/video-interview-consent-form/">Video Interview Consent Form</a>
          <a href="/recording-interview-consent-form/">Recording Interview Consent Form</a>
          <a href="/ux-interview-consent-form/">UX Interview Consent Form</a>
        </div>
        <div class="mob-section">
          <p class="mob-section-label">Templates &amp; Guides</p>
          <a href="/interview-consent-form-template/">Interview Consent Form Template</a>
          <a href="/interview-consent-form-sample/">Interview Consent Form Sample</a>
          <a href="/simple-interview-consent-form/">Simple Interview Consent Form</a>
          <a href="/how-to-write-an-interview-consent-form/">How to Write an Interview Consent Form</a>
          <a href="/what-is-an-interview-consent-form/">What Is an Interview Consent Form?</a>
        </div>
        <div style="padding:1.25rem 1.5rem 2rem;">
          <a href="/interview-consent-form/"
             style="display:block;text-align:center;background:#1d4ed8;color:#fff;padding:.9rem;border-radius:8px;font-weight:700;font-size:.95rem;text-decoration:none;">
            Create Form Free &#8594;
          </a>
        </div>
      </nav>
    </div>

  </header>'''

# ─────────────────────────────────────────────────────────────────────────────
# CANONICAL NAV CSS
# ─────────────────────────────────────────────────────────────────────────────
NAV_CSS_SENTINEL = '/* fix_nav_v2_css */'
NAV_CSS = '''
    ''' + NAV_CSS_SENTINEL + '''
    .site-header{position:sticky;top:0;z-index:200;background:#fff;border-bottom:1px solid #e2e8f0;box-shadow:0 1px 2px rgba(0,0,0,.06)}
    .navbar{display:flex;align-items:center;height:66px;gap:0;max-width:1220px;margin:0 auto;padding:0 1.5rem}
    .nav-logo{font-size:1.1rem;font-weight:800;color:#1a3f8f;text-decoration:none;display:flex;align-items:center;gap:.5rem;white-space:nowrap;margin-right:1.5rem;flex-shrink:0}
    .nav-logo-icon{width:34px;height:34px;background:#1d4ed8;border-radius:6px;display:flex;align-items:center;justify-content:center;font-size:1rem}
    .nav-menu{display:flex;align-items:center;gap:0;flex:1;list-style:none;padding:0;margin:0}
    .nav-item{position:relative}
    .nav-link{display:flex;align-items:center;gap:.3rem;padding:0 .9rem;height:66px;font-size:.86rem;font-weight:600;color:#334155;text-decoration:none;white-space:nowrap;cursor:pointer;border-bottom:2px solid transparent;transition:color .15s,border-color .15s;background:none;border-top:none;border-left:none;border-right:none;font-family:inherit}
    .nav-link:hover,.nav-item:hover .nav-link,.nav-item.open .nav-link{color:#1d4ed8;border-bottom-color:#1d4ed8}
    .nav-link svg{width:14px;height:14px;transition:transform .2s;flex-shrink:0}
    .nav-item:hover .nav-link svg,.nav-item.open .nav-link svg{transform:rotate(180deg)}
    .nav-dropdown{display:none;position:absolute;top:calc(100% + 2px);left:0;background:#fff;border:1px solid #e2e8f0;border-radius:10px;box-shadow:0 20px 60px rgba(0,0,0,.15);padding:.75rem;min-width:270px;z-index:300}
    .nav-item:hover .nav-dropdown,.nav-item.open .nav-dropdown{display:block}
    .nav-dropdown a{display:block;padding:.6rem .85rem;font-size:.84rem;font-weight:500;color:#334155;text-decoration:none;border-radius:6px;border-left:2px solid transparent;transition:all .15s}
    .nav-dropdown a:hover{background:#eff6ff;color:#1d4ed8;border-left-color:#1d4ed8}
    .nav-dropdown-label{font-size:.7rem;font-weight:700;color:#64748b;text-transform:uppercase;letter-spacing:.08em;padding:.5rem .85rem .25rem;border-top:1px solid #f1f5f9;margin-top:.25rem}
    .nav-dropdown-label:first-child{border-top:none;margin-top:0}
    .nav-cta{margin-left:auto;background:#1d4ed8;color:#fff!important;padding:.55rem 1.1rem;border-radius:6px;font-size:.84rem;font-weight:700;text-decoration:none;white-space:nowrap;flex-shrink:0;transition:background .15s}
    .nav-cta:hover{background:#0f2d6e!important;color:#fff!important}
    .hamburger{display:none;flex-direction:column;justify-content:center;gap:5px;width:40px;height:40px;background:none;border:1px solid transparent;cursor:pointer;padding:8px;border-radius:6px;margin-left:.75rem;flex-shrink:0;transition:background .15s,border-color .15s}
    .hamburger:hover{background:#f1f5f9;border-color:#e2e8f0}
    .ham-bar{display:block;width:20px;height:2px;background:#334155;border-radius:2px;transition:transform .25s,opacity .2s,width .2s;transform-origin:center}
    .hamburger.is-open .ham-bar:nth-child(1){transform:translateY(7px) rotate(45deg)}
    .hamburger.is-open .ham-bar:nth-child(2){opacity:0;width:0}
    .hamburger.is-open .ham-bar:nth-child(3){transform:translateY(-7px) rotate(-45deg)}
    .mobile-overlay{display:none;position:fixed;inset:0;background:rgba(15,23,42,.5);z-index:400;opacity:0;transition:opacity .25s}
    .mobile-overlay.active{display:block;opacity:1}
    .mobile-drawer{position:fixed;top:0;right:0;bottom:0;width:min(320px,90vw);background:#fff;z-index:500;transform:translateX(100%);transition:transform .28s cubic-bezier(.4,0,.2,1);overflow-y:auto;-webkit-overflow-scrolling:touch}
    .mobile-drawer.active{transform:translateX(0)}
    .mobile-drawer-header{display:flex;align-items:center;justify-content:space-between;padding:1rem 1.25rem;border-bottom:1px solid #e2e8f0;position:sticky;top:0;background:#fff;z-index:10}
    .mobile-close{background:none;border:none;font-size:1.2rem;cursor:pointer;color:#64748b;width:36px;height:36px;border-radius:6px;display:flex;align-items:center;justify-content:center;transition:background .15s,color .15s}
    .mobile-close:hover{background:#fee2e2;color:#dc2626}
    .mob-section{padding:.85rem 1.5rem .4rem}
    .mob-section+.mob-section{border-top:1px solid #f1f5f9}
    .mob-section-label{font-size:.67rem;font-weight:800;color:#94a3b8;text-transform:uppercase;letter-spacing:.09em;margin-bottom:.6rem}
    .mob-section a{display:block;padding:.55rem 0;font-size:.88rem;font-weight:500;color:#334155;text-decoration:none;transition:color .15s}
    .mob-section a:hover{color:#1d4ed8}
    @media(max-width:900px){.nav-menu{display:none}.hamburger{display:flex}.nav-cta{display:none}}
    @media(max-width:480px){.navbar{padding:0 1rem}.nav-logo{font-size:1rem}}
    /* fix_nav_v2_css_end */
'''

# ─────────────────────────────────────────────────────────────────────────────
# CANONICAL NAV JS
# ─────────────────────────────────────────────────────────────────────────────
NAV_JS_SENTINEL = '/* fix_nav_v2_js */'
NAV_JS = '''
  <script>''' + NAV_JS_SENTINEL + '''
  (function(){
    var btn=document.getElementById('hamburger-btn');
    var drawer=document.getElementById('mobile-drawer');
    var overlay=document.getElementById('mobile-overlay');
    var closeBtn=document.getElementById('mobile-close-btn');
    if(!btn||!drawer||!overlay)return;
    function openMenu(){
      btn.classList.add('is-open');btn.setAttribute('aria-expanded','true');
      drawer.classList.add('active');drawer.setAttribute('aria-hidden','false');
      overlay.classList.add('active');document.body.style.overflow='hidden';
      var first=drawer.querySelector('a,button');if(first)first.focus();
    }
    function closeMenu(){
      btn.classList.remove('is-open');btn.setAttribute('aria-expanded','false');
      drawer.classList.remove('active');drawer.setAttribute('aria-hidden','true');
      overlay.classList.remove('active');document.body.style.overflow='';
      btn.focus();
    }
    btn.addEventListener('click',function(e){e.stopPropagation();btn.getAttribute('aria-expanded')==='true'?closeMenu():openMenu();});
    if(closeBtn)closeBtn.addEventListener('click',closeMenu);
    overlay.addEventListener('click',closeMenu);
    document.addEventListener('keydown',function(e){if(e.key==='Escape')closeMenu();});
    document.querySelectorAll('.nav-link[aria-haspopup]').forEach(function(link){
      link.addEventListener('keydown',function(e){
        if(e.key==='Enter'||e.key===' '){
          e.preventDefault();
          var item=link.closest('.nav-item');
          var isOpen=item.classList.contains('open');
          document.querySelectorAll('.nav-item').forEach(function(i){i.classList.remove('open');i.querySelector('.nav-link').setAttribute('aria-expanded','false');});
          if(!isOpen){item.classList.add('open');link.setAttribute('aria-expanded','true');}
        }
        if(e.key==='Escape'){link.closest('.nav-item').classList.remove('open');link.setAttribute('aria-expanded','false');}
      });
    });
    document.addEventListener('click',function(e){
      if(!e.target.closest('.nav-item'))
        document.querySelectorAll('.nav-item').forEach(function(i){i.classList.remove('open');});
    });
  })();
  </script>'''


# ─────────────────────────────────────────────────────────────────────────────
# HELPERS
# ─────────────────────────────────────────────────────────────────────────────

def find_html_files(root):
    results = []
    for dirpath, dirnames, filenames in os.walk(root):
        dirnames[:] = [d for d in dirnames if not d.startswith('.') and d not in ('node_modules', '__pycache__')]
        for fname in filenames:
            if fname == 'index.html':
                results.append(os.path.join(dirpath, fname))
    return sorted(results)


def replace_header(html, filepath):
    """Replace <header>...</header> block with canonical version."""
    start_m = re.search(r'<header\b[^>]*>', html)
    if not start_m:
        return html, 'no-header'

    start = start_m.start()
    search = start_m.end()
    depth = 1
    end = search
    while depth > 0:
        nopen  = html.find('<header', search)
        nclose = html.find('</header>', search)
        if nclose == -1:
            return html, 'unclosed'
        if nopen != -1 and nopen < nclose:
            depth += 1
            search = nopen + 7
        else:
            depth -= 1
            end = nclose + 9
            search = end

    html = html[:start] + CANONICAL_HEADER + html[end:]
    return html, 'replaced'


def ensure_css(html):
    """Inject nav CSS once; remove stale copies first."""
    # Remove all existing instances of our CSS block
    html = re.sub(
        r'/\* fix_nav_v2_css \*/.*?/\* fix_nav_v2_css_end \*/',
        '', html, flags=re.DOTALL
    )
    # Inject before first </style>
    pos = html.find('</style>')
    if pos == -1:
        pos = html.find('</head>')
        if pos == -1:
            return html
        html = html[:pos] + '<style>' + NAV_CSS + '</style>\n' + html[pos:]
    else:
        html = html[:pos] + NAV_CSS + html[pos:]
    return html


def ensure_js(html):
    """Inject nav JS once; remove stale copies first."""
    html = re.sub(
        r'<script>/\* fix_nav_v2_js \*/.*?</script>',
        '', html, flags=re.DOTALL
    )
    pos = html.rfind('</body>')
    if pos == -1:
        return html
    html = html[:pos] + NAV_JS + '\n' + html[pos:]
    return html


def process_file(filepath, dry_run=False):
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            original = f.read()
    except Exception as e:
        print(f'  [ERROR] Cannot read {filepath}: {e}')
        return 'error'

    # Idempotency: skip if already at current version
    if SENTINEL in original and NAV_CSS_SENTINEL in original and NAV_JS_SENTINEL in original:
        print(f'  [SKIP]  Already up to date: {os.path.relpath(filepath)}')
        return 'skip'

    html = original
    html = ensure_css(html)
    html, header_status = replace_header(html, filepath)
    if header_status == 'no-header':
        print(f'  [WARN]  No <header> tag found, skipping: {os.path.relpath(filepath)}')
        return 'warn'
    if header_status == 'unclosed':
        print(f'  [WARN]  Unclosed <header> tag, skipping: {os.path.relpath(filepath)}')
        return 'warn'
    html = ensure_js(html)

    if dry_run:
        print(f'  [DRY]   Would update: {os.path.relpath(filepath)}')
        return 'dry'

    try:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(html)
        print(f'  [DONE]  Updated: {os.path.relpath(filepath)}')
        return 'done'
    except Exception as e:
        print(f'  [ERROR] Cannot write {filepath}: {e}')
        return 'error'


# ─────────────────────────────────────────────────────────────────────────────
# MAIN
# ─────────────────────────────────────────────────────────────────────────────

def main():
    parser = argparse.ArgumentParser(
        description='Fix nav + add mobile hamburger menu to all HTML pages (idempotent).'
    )
    parser.add_argument('--root', default='.', metavar='PATH',
                        help='Root of your repo (default: current directory)')
    parser.add_argument('--dry-run', action='store_true',
                        help='Preview changes without writing files')
    args = parser.parse_args()

    root = os.path.abspath(args.root)
    if not os.path.isdir(root):
        print(f'ERROR: {root} is not a directory.')
        sys.exit(1)

    mode = 'DRY RUN' if args.dry_run else 'LIVE'
    print(f'\nfix_nav.py  [{mode}]')
    print(f'Root: {root}')
    print('─' * 60)

    files = find_html_files(root)
    if not files:
        print('No index.html files found.')
        sys.exit(0)

    print(f'Found {len(files)} HTML file(s):\n')

    counts = {'done': 0, 'skip': 0, 'dry': 0, 'warn': 0, 'error': 0}
    for filepath in files:
        result = process_file(filepath, dry_run=args.dry_run)
        counts[result] = counts.get(result, 0) + 1

    print('\n' + '─' * 60)
    if args.dry_run:
        print(f"Would update : {counts['dry']}")
        print(f"Already good : {counts['skip']}")
        print(f"Warnings     : {counts['warn']}")
        print('\nRun without --dry-run to apply changes.\n')
    else:
        print(f"Updated      : {counts['done']}")
        print(f"Skipped      : {counts['skip']}  (already up to date)")
        print(f"Warnings     : {counts['warn']}")
        print(f"Errors       : {counts['error']}")
        print()


if __name__ == '__main__':
    main()
