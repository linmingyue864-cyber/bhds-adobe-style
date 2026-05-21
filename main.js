/* =========================================
   BHDS — BH Design System
   Main JavaScript
   Tác giả: Nguyễn Tiến Đạt
   ========================================= */

(function () {
  'use strict';

  /* ---- Sidebar toggle (mobile) ---- */
  function initSidebar() {
    const sidebar  = document.getElementById('sidebar');
    const overlay  = document.getElementById('sidebarOverlay');
    const hamburger = document.getElementById('hamburger');
    if (!sidebar) return;

    function open() {
      sidebar.classList.add('open');
      overlay && overlay.classList.add('visible');
      document.body.style.overflow = 'hidden';
    }
    function close() {
      sidebar.classList.remove('open');
      overlay && overlay.classList.remove('visible');
      document.body.style.overflow = '';
    }

    hamburger && hamburger.addEventListener('click', open);
    overlay   && overlay.addEventListener('click', close);
    document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
  }

  /* ---- Active nav link ---- */
  function initActiveNav() {
    const current = location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.sidebar-item').forEach(el => {
      const href = el.getAttribute('href') || '';
      if (href === current || (current === '' && href === 'index.html')) {
        el.classList.add('active');
      }
    });
  }

  /* ---- Copy to clipboard ---- */
  function initCopy() {
    document.querySelectorAll('[data-copy]').forEach(btn => {
      btn.addEventListener('click', () => {
        const text = btn.getAttribute('data-copy');
        navigator.clipboard.writeText(text).then(() => {
          const orig = btn.textContent;
          btn.textContent = 'Đã sao chép!';
          setTimeout(() => { btn.textContent = orig; }, 1500);
        });
      });
    });
  }

  /* ---- Smooth in-page scroll for anchors ---- */
  function initAnchors() {
    document.querySelectorAll('a[href^="#"]').forEach(a => {
      a.addEventListener('click', e => {
        const target = document.querySelector(a.getAttribute('href'));
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });
  }

  /* ---- Tab component ---- */
  function initTabs() {
    document.querySelectorAll('[data-tabs]').forEach(container => {
      const triggers = container.querySelectorAll('[data-tab-trigger]');
      const panels   = container.querySelectorAll('[data-tab-panel]');

      function activate(index) {
        triggers.forEach((t, i) => {
          t.classList.toggle('active', i === index);
          t.setAttribute('aria-selected', i === index);
        });
        panels.forEach((p, i) => {
          p.hidden = i !== index;
        });
      }

      triggers.forEach((t, i) => {
        t.addEventListener('click', () => activate(i));
      });

      activate(0);
    });
  }

  /* ---- Accordion ---- */
  function initAccordion() {
    document.querySelectorAll('[data-accordion-trigger]').forEach(btn => {
      btn.addEventListener('click', () => {
        const item = btn.closest('[data-accordion-item]');
        const panel = item.querySelector('[data-accordion-panel]');
        const open = item.hasAttribute('data-open');
        if (open) {
          item.removeAttribute('data-open');
          panel.style.maxHeight = '0';
          btn.setAttribute('aria-expanded', 'false');
        } else {
          item.setAttribute('data-open', '');
          panel.style.maxHeight = panel.scrollHeight + 'px';
          btn.setAttribute('aria-expanded', 'true');
        }
      });
    });
  }

  /* ---- Progress bar demo animation ---- */
  function initProgressDemo() {
    document.querySelectorAll('.progress-fill[data-value]').forEach(el => {
      const v = el.getAttribute('data-value');
      requestAnimationFrame(() => {
        setTimeout(() => { el.style.width = v + '%'; }, 300);
      });
    });
  }

  /* ---- Colour hex copy on click ---- */
  function initSwatchCopy() {
    document.querySelectorAll('.swatch').forEach(sw => {
      sw.style.cursor = 'pointer';
      sw.addEventListener('click', () => {
        const hex = sw.querySelector('.swatch-hex');
        if (!hex) return;
        const text = hex.textContent;
        navigator.clipboard.writeText(text).then(() => {
          const orig = hex.textContent;
          hex.textContent = 'Đã sao chép!';
          setTimeout(() => { hex.textContent = orig; }, 1200);
        });
      });
    });
  }

  /* ---- Toast notification ---- */
  window.showToast = function(msg, type) {
    type = type || 'info';
    let container = document.getElementById('toastContainer');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toastContainer';
      Object.assign(container.style, {
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        zIndex: '9999'
      });
      document.body.appendChild(container);
    }
    const colors = {
      info:    { bg: '#EBF3FE', border: '#C5DBFC', color: '#0A55B0' },
      success: { bg: '#DFFCE8', border: '#12B76A', color: '#027A48' },
      warning: { bg: '#FFF8E1', border: '#F59E0B', color: '#B45309' },
      danger:  { bg: '#FEE4E2', border: '#F04438', color: '#B42318' },
    };
    const c = colors[type] || colors.info;
    const toast = document.createElement('div');
    Object.assign(toast.style, {
      background: c.bg,
      border: `1px solid ${c.border}`,
      color: c.color,
      borderRadius: '8px',
      padding: '12px 16px',
      fontSize: '14px',
      fontFamily: 'Inter, sans-serif',
      fontWeight: '500',
      boxShadow: '0 4px 12px rgba(0,0,0,.12)',
      maxWidth: '320px',
      opacity: '0',
      transform: 'translateY(8px)',
      transition: 'opacity .2s ease, transform .2s ease'
    });
    toast.textContent = msg;
    container.appendChild(toast);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        toast.style.opacity = '1';
        toast.style.transform = 'translateY(0)';
      });
    });
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(8px)';
      setTimeout(() => toast.remove(), 200);
    }, 3000);
  };

  /* ---- Init ---- */
  document.addEventListener('DOMContentLoaded', () => {
    initSidebar();
    initActiveNav();
    initCopy();
    initAnchors();
    initTabs();
    initAccordion();
    initProgressDemo();
    initSwatchCopy();
  });

})();
