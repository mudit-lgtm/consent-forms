/* js/main.js — InterviewConsentForms
   Deferred, non-critical enhancements */

(function() {
  'use strict';

  /* ─── FAQ ACCORDION ───────────────────────────────────── */
  function initFAQ() {
    document.querySelectorAll('.faq-question').forEach(function(q) {
      q.addEventListener('click', function() {
        var item = this.parentElement;
        var wasOpen = item.classList.contains('open');
        // Close all
        document.querySelectorAll('.faq-item').forEach(function(i) { i.classList.remove('open'); });
        // Toggle clicked
        if (!wasOpen) item.classList.add('open');
      });
    });
  }

  /* ─── MOBILE NAV ──────────────────────────────────────── */
  function initMobileNav() {
    var toggle = document.querySelector('.nav-toggle');
    var navPrimary = document.querySelector('.nav-primary');
    if (!toggle || !navPrimary) return;

    toggle.addEventListener('click', function() {
      navPrimary.classList.toggle('open');
      var isOpen = navPrimary.classList.contains('open');
      toggle.setAttribute('aria-expanded', isOpen);
    });

    // Mobile dropdown toggles
    document.querySelectorAll('.nav-item.has-dropdown > a').forEach(function(link) {
      link.addEventListener('click', function(e) {
        if (window.innerWidth <= 768) {
          e.preventDefault();
          var item = this.parentElement;
          item.classList.toggle('mobile-open');
        }
      });
    });

    // Close on outside click
    document.addEventListener('click', function(e) {
      if (!e.target.closest('.main-nav')) {
        navPrimary.classList.remove('open');
      }
    });
  }

  /* ─── LIVE FORM PREVIEW ───────────────────────────────── */
  function initFormPreview() {
    var fields = [
      { input: 'participant-name',  preview: 'preview-participant',    placeholder: 'Participant name will appear here' },
      { input: 'study-title',       preview: 'preview-study',           placeholder: 'Study title will appear here' },
      { input: 'study-title',       preview: 'preview-study-inline',    placeholder: '[study title]' },
      { input: 'researcher-name',   preview: 'preview-researcher',      placeholder: 'Researcher name will appear here' },
      { input: 'institution',       preview: 'preview-institution',     placeholder: 'Institution will appear here' },
      { input: 'interview-date',    preview: 'preview-date',            placeholder: 'Date will appear here' },
      { input: 'interview-duration',preview: 'preview-duration',        placeholder: 'Duration will appear here' },
      { input: 'contact-email',     preview: 'preview-email',           placeholder: 'Contact email will appear here' },
    ];

    fields.forEach(function(f) {
      var inp = document.getElementById(f.input);
      var prev = document.getElementById(f.preview);
      if (!inp || !prev) return;
      inp.addEventListener('input', function() {
        var val = this.value.trim();
        prev.textContent = val || f.placeholder;
        prev.classList.toggle('filled', !!val);
      });
    });

    // Recording select
    var recSelect = document.getElementById('recording-consent');
    var recPreview = document.getElementById('preview-recording');
    if (recSelect && recPreview) {
      recSelect.addEventListener('change', function() {
        var map = {
          'yes':   'This interview will be audio and video recorded.',
          'audio': 'This interview will be audio recorded.',
          'video': 'This interview will be video recorded.',
          'no':    'This interview will NOT be recorded.'
        };
        recPreview.textContent = map[this.value] || '';
        recPreview.classList.add('filled');
      });
    }

    // Confidentiality select
    var confSelect = document.getElementById('confidentiality');
    var confPreview = document.getElementById('preview-confidentiality');
    if (confSelect && confPreview) {
      confSelect.addEventListener('change', function() {
        var map = {
          'anonymous':    'All responses will be fully anonymous.',
          'pseudonym':    'A pseudonym will be used to protect your identity.',
          'identified':   'You will be identified with your consent.',
          'confidential': 'Data will be kept confidential within the research team only.'
        };
        confPreview.textContent = map[this.value] || '';
        confPreview.classList.add('filled');
      });
    }
  }

  /* ─── COPY FORM TEXT ──────────────────────────────────── */
  function showToast(msg) {
    var toast = document.getElementById('copy-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'copy-toast';
      toast.className = 'copy-toast';
      document.body.appendChild(toast);
    }
    toast.textContent = msg;
    toast.classList.add('show');
    setTimeout(function() { toast.classList.remove('show'); }, 2500);
  }

  window.copyFormText = function() {
    var box = document.querySelector('.sample-text-box');
    if (!box) return;
    var text = box.innerText || box.textContent;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).then(function() {
        showToast('✓ Form text copied to clipboard!');
      }).catch(function() {
        fallbackCopy(text);
      });
    } else {
      fallbackCopy(text);
    }
  };

  function fallbackCopy(text) {
    var ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
    showToast('✓ Copied to clipboard!');
  }

  /* ─── DOWNLOAD FILLED PDF (static fallback) ───────────── */
  window.downloadFilledPDF = function() {
    // Collect field values for display
    var fields = {
      'Participant': (document.getElementById('participant-name') || {}).value || '',
      'Study': (document.getElementById('study-title') || {}).value || '',
      'Researcher': (document.getElementById('researcher-name') || {}).value || '',
      'Institution': (document.getElementById('institution') || {}).value || '',
      'Date': (document.getElementById('interview-date') || {}).value || '',
    };

    // Build a simple printable page
    var filled = Object.values(fields).some(function(v) { return v.trim() !== ''; });

    if (!filled) {
      // Redirect to static PDF
      var link = document.querySelector('a[href*=".pdf"][download]');
      if (link) { link.click(); return; }
      window.location.href = '/assets/templates/interview-consent-form.pdf';
      return;
    }

    // Build printable
    var win = window.open('', '_blank');
    if (!win) { window.location.href = '/assets/templates/interview-consent-form.pdf'; return; }

    var html = '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>Interview Consent Form</title>' +
      '<style>body{font-family:Georgia,serif;max-width:720px;margin:3rem auto;padding:0 2rem;line-height:1.7;color:#111}' +
      'h1{font-size:1.4rem;text-align:center;text-transform:uppercase;letter-spacing:.1em;border-bottom:2px solid #111;padding-bottom:1rem;margin-bottom:2rem}' +
      '.field{margin-bottom:1.2rem}.label{font-size:.75rem;font-weight:bold;text-transform:uppercase;letter-spacing:.08em;color:#555}' +
      '.value{border-bottom:1px solid #aaa;padding:.3rem 0;min-height:1.8rem;font-size:1rem}' +
      '.body-text{margin:1.5rem 0;font-size:.95rem}' +
      '.sig{margin-top:3rem;display:flex;gap:3rem}.sig-line{flex:1;border-bottom:1px solid #111;padding-top:2rem;font-size:.85rem}' +
      '@media print{body{margin:1cm}}</style></head><body>';

    html += '<h1>Interview Consent Form</h1>';
    for (var k in fields) {
      html += '<div class="field"><div class="label">' + k + '</div><div class="value">' + (fields[k] || '&nbsp;') + '</div></div>';
    }
    html += '<div class="body-text"><strong>PURPOSE OF STUDY:</strong> You are being invited to participate in a research interview. The purpose of this study is ' + (fields['Study'] || '[Study Title]') + '.</div>';
    html += '<div class="body-text"><strong>VOLUNTARY PARTICIPATION:</strong> Your participation is completely voluntary. You may withdraw at any time without penalty or loss of benefits.</div>';
    html += '<div class="body-text"><strong>CONFIDENTIALITY:</strong> All information collected will be kept confidential in accordance with applicable privacy regulations.</div>';
    html += '<div class="body-text"><strong>YOUR RIGHTS:</strong> You may decline to answer any question. You may request that the recording be stopped at any time.</div>';
    html += '<div class="sig"><div class="sig-line">Participant Signature</div><div class="sig-line">Date</div></div>';
    html += '<div class="sig"><div class="sig-line">Researcher Signature</div><div class="sig-line">Date</div></div>';
    html += '<script>window.onload=function(){window.print();}<\/script></body></html>';

    win.document.write(html);
    win.document.close();
  };

  /* ─── SMOOTH SCROLL FOR ANCHOR LINKS ─────────────────── */
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(function(a) {
      a.addEventListener('click', function(e) {
        var target = document.querySelector(this.getAttribute('href'));
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });
  }

  /* ─── ACTIVE NAV LINK ─────────────────────────────────── */
  function initActiveNav() {
    var path = window.location.pathname.replace(/\/$/, '') || '/';
    document.querySelectorAll('.nav-item > a, .dropdown-mega a').forEach(function(a) {
      var href = a.getAttribute('href').replace(/\/$/, '') || '/';
      if (href === path || (href !== '' && path.startsWith(href))) {
        a.style.color = 'var(--primary)';
        a.style.fontWeight = '700';
      }
    });
  }

  /* ─── INIT ────────────────────────────────────────────── */
  document.addEventListener('DOMContentLoaded', function() {
    initFAQ();
    initMobileNav();
    initFormPreview();
    initSmoothScroll();
    initActiveNav();
  });

})();
