/**
 * ============================================================
 *  PORTFOLIO RENDERER
 * ============================================================
 *  Lee window.PORTFOLIO_DATA y genera el HTML dinámicamente
 *  para las ventanas: win-about (tabs), win-projects y win-skills.
 *  Se ejecuta antes que main.js / window-manager.js.
 * ============================================================
 */

(function () {
  'use strict';

  const D = window.PORTFOLIO_DATA;
  if (!D) {
    console.error('[renderer] PORTFOLIO_DATA no encontrado. ¿Cargaste portfolio-data.js primero?');
    return;
  }

  // ── Helpers ─────────────────────────────────────────────────

  function el(tag, attrs, ...children) {
    const node = document.createElement(tag);
    if (attrs) {
      Object.entries(attrs).forEach(([k, v]) => {
        if (k === 'class') node.className = v;
        else if (k === 'html') node.innerHTML = v;
        else if (k === 'style') node.style.cssText = v;
        else node.setAttribute(k, v);
      });
    }
    children.flat().forEach(c => {
      if (c == null) return;
      node.appendChild(typeof c === 'string' ? document.createTextNode(c) : c);
    });
    return node;
  }

  function html(tag, attrs, htmlString) {
    const node = document.createElement(tag);
    if (attrs) Object.entries(attrs).forEach(([k, v]) => {
      if (k === 'class') node.className = v;
      else if (k === 'style') node.style.cssText = v;
      else node.setAttribute(k, v);
    });
    node.innerHTML = htmlString;
    return node;
  }

  // ── RENDER: Tab General (win-about) ─────────────────────────

  function renderTabGeneral() {
    const p = D.profile;
    return el('div', { id: 'tab-general', class: 'xp-tab-content active' },
      el('div', { class: 'sys-prop-banner' },
        el('div', { class: 'sys-pc-illustration', 'data-render-icon': 'my-computer', 'data-icon-size': '64' }),
        el('div', { class: 'sys-specs-grid' },
          el('span', { class: 'sys-label' }, 'Sistema:'),
          el('span', { class: 'sys-val' }, 'AmaruOS XP Professional v2026'),
          el('span', { class: 'sys-label' }, 'Desarrollador:'),
          html('span', { class: 'sys-val' }, `<strong>${p.name}</strong>`),
          el('span', { class: 'sys-label' }, 'Especialidad:'),
          el('span', { class: 'sys-val' }, p.title),
          el('span', { class: 'sys-label' }, 'Ubicación:'),
          el('span', { class: 'sys-val' }, p.location),
          el('span', { class: 'sys-label' }, 'Universidad:'),
          el('span', { class: 'sys-val' }, p.university),
          el('span', { class: 'sys-label' }, 'Stack Principal:'),
          el('span', { class: 'sys-val' }, p.stack),
        ),
      ),
      el('fieldset', { class: 'xp-groupbox' },
        el('legend', {}, 'Contacto Rápido'),
        el('div', { style: 'display:flex;gap:8px;flex-wrap:wrap;' },
          el('a', { href: p.linkedin, target: '_blank', class: 'xp-button' }, 'LinkedIn ↗'),
          el('a', { href: p.github,   target: '_blank', class: 'xp-button' }, 'GitHub ↗'),
          el('a', { href: `mailto:${p.email}`,          class: 'xp-button' }, 'Enviar Correo'),
          el('a', { href: p.whatsapp, target: '_blank', class: 'xp-button primary' }, `WhatsApp (${p.phone})`),
        ),
      ),
      el('div', { style: 'display:flex;justify-content:flex-end;gap:6px;margin-top:10px;' },
        el('button', { class: 'xp-button primary', onclick: "window.windowManager.openWindow('win-projects')" }, 'Ver Experiencia'),
        el('button', { class: 'xp-button',         onclick: "window.windowManager.closeWindow('win-about')"  }, 'Aceptar'),
      ),
    );
  }

  // ── RENDER: Tab Perfil Profesional ──────────────────────────

  function renderTabProfile() {
    const p = D.profile;
    return el('div', { id: 'tab-profile', class: 'xp-tab-content' },
      el('fieldset', { class: 'xp-groupbox' },
        el('legend', {}, 'Descripción Profesional'),
        ...p.bio.map((t, i) =>
          html('p', { style: `line-height:1.6;font-size:11px;color:#222;${i > 0 ? 'margin-top:8px;' : ''}` }, t)
        ),
      ),
      el('fieldset', { class: 'xp-groupbox' },
        el('legend', {}, 'Puntos Clave de Enfoque'),
        el('ul', { style: 'padding-left:18px;line-height:1.5;font-size:11px;' },
          ...p.keyPoints.map(pt => el('li', {}, pt)),
        ),
      ),
    );
  }

  // ── RENDER: Tab Educación ────────────────────────────────────

  function renderTabEducation() {
    return el('div', { id: 'tab-education', class: 'xp-tab-content' },
      ...D.education.map(edu =>
        el('fieldset', { class: 'xp-groupbox' },
          el('legend', {}, 'Título Universitario'),
          el('div', { style: 'font-size:12px;font-weight:bold;color:#003399;margin-bottom:4px;' }, edu.degree),
          html('div', { style: 'font-size:11px;color:#333;margin-bottom:6px;' }, `<strong>${edu.institution}</strong>`),
          el('div', { style: 'font-size:11px;color:#666;margin-bottom:10px;' }, edu.period),
          el('p',   { style: 'font-size:11px;line-height:1.5;color:#333;' }, edu.description),
        )
      ),
    );
  }

  // ── RENDER: Tab Certificaciones ──────────────────────────────

  function renderTabCerts() {
    return el('div', { id: 'tab-certs', class: 'xp-tab-content' },
      el('div', { style: 'display:flex;flex-direction:column;gap:8px;' },
        ...D.certifications.map(c =>
          el('div', { style: 'border:1px solid #D1D7E0;padding:8px;border-radius:4px;background:#FFF;' },
            el('div', { style: 'font-weight:bold;color:#003399;' }, c.name),
            el('div', { style: 'font-size:10px;color:#666;margin-top:2px;' }, c.description),
          )
        ),
      ),
    );
  }

  // ── RENDER: Ventana win-about ────────────────────────────────

  function buildWinAbout() {
    const body = document.getElementById('win-about-body');
    if (!body) return;

    // Limpiar el contenido estático existente
    body.innerHTML = '';

    // Recrear cabecera de tabs
    const tabsHeader = el('div', { class: 'xp-tabs-header' },
      el('button', { class: 'xp-tab-btn active', 'data-target-tab': 'tab-general'   }, 'General'),
      el('button', { class: 'xp-tab-btn',        'data-target-tab': 'tab-profile'   }, 'Perfil Profesional'),
      el('button', { class: 'xp-tab-btn',        'data-target-tab': 'tab-education' }, 'Educación'),
      el('button', { class: 'xp-tab-btn',        'data-target-tab': 'tab-certs'     }, 'Certificaciones'),
    );

    body.appendChild(tabsHeader);
    body.appendChild(renderTabGeneral());
    body.appendChild(renderTabProfile());
    body.appendChild(renderTabEducation());
    body.appendChild(renderTabCerts());
  }

  // ── RENDER: Tarjeta de experiencia ──────────────────────────

  function renderExperienceCard(exp) {
    if (exp.isOpenSource) {
      return el('div', { class: 'project-card-xp' },
        el('div', { class: 'project-header' },
          el('span', { class: 'project-title' }, exp.company),
          el('span', { class: 'project-badge' }, exp.badge),
        ),
        el('p', { style: 'font-size:11px;line-height:1.5;color:#333;margin-bottom:8px;' }, exp.description),
        el('a', { href: exp.link, target: '_blank', class: 'xp-button' }, exp.linkLabel),
      );
    }

    return el('div', { class: 'project-card-xp' },
      el('div', { class: 'project-header' },
        el('span', { class: 'project-title' }, exp.company),
        el('span', { class: 'project-badge' }, exp.badge),
      ),
      el('div', { class: 'project-role-dates' }, `${exp.role} | ${exp.period}`),
      el('ul', { class: 'project-desc-list' },
        ...exp.bullets.map(b => html('li', {}, b)),
      ),
      exp.tags.length > 0
        ? el('div', { class: 'project-tags' },
            ...exp.tags.map(t => el('span', { class: 'tag-pill' }, t)),
          )
        : null,
    );
  }

  // ── RENDER: Ventana win-projects ─────────────────────────────

  function buildWinProjects() {
    const content = document.querySelector('#win-projects .explorer-content');
    if (!content) return;

    content.innerHTML = '';
    D.experience.forEach(exp => content.appendChild(renderExperienceCard(exp)));

    // Actualizar contador en statusbar
    const statusPane = document.querySelector('#win-projects .xp-status-pane');
    if (statusPane) statusPane.textContent = `${D.experience.length} elementos en Experiencia`;
  }

  // ── RENDER: Ventana win-skills ───────────────────────────────

  function buildWinSkills() {
    const grid = document.querySelector('#win-skills .skills-grid');
    if (!grid) return;

    grid.innerHTML = '';
    D.skills.forEach(cat => {
      const box = el('div', { class: 'skill-category-box' },
        el('div', { class: 'skill-cat-title' },
          el('span', {}, `${cat.icon} ${cat.title}`),
        ),
        el('div', { class: 'project-tags', style: 'margin-top: 8px; flex-wrap: wrap;' },
          ...cat.items.map(name =>
            el('span', { class: 'tag-pill' }, name),
          ),
        ),
      );
      grid.appendChild(box);
    });
  }

  // ── RENDER: Vista Mobile (#mobile-shell) ──────────────────

  function buildMobileShell() {
    const root = document.getElementById('mobile-content-root');
    if (!root) return;

    root.innerHTML = '';
    const p = D.profile;

    // Sección 1: Sobre Mí
    const secAbout = el('div', { id: 'mob-sec-about', class: 'mobile-section active' },
      el('div', { class: 'mobile-panel' },
        el('div', { class: 'mobile-panel-title' },
          el('span', {}, '👤'),
          el('span', {}, 'Perfil Profesional'),
        ),
        el('div', { class: 'mobile-panel-body' },
          ...p.bio.map(b => html('p', { class: 'mobile-bio' }, b)),
          el('ul', { class: 'mobile-key-points' },
            ...p.keyPoints.map(kp => el('li', {}, kp)),
          ),
        ),
      ),
      el('div', { class: 'mobile-panel' },
        el('div', { class: 'mobile-panel-title' },
          el('span', {}, '💻'),
          el('span', {}, 'Datos del Sistema'),
        ),
        el('div', { class: 'mobile-panel-body' },
          html('div', { style: 'font-size:11px;line-height:1.7;color:#333;' },
            `<strong>Ubicación:</strong> ${p.location}<br>` +
            `<strong>Universidad:</strong> ${p.university}<br>` +
            `<strong>Stack:</strong> ${p.stack}`
          ),
        ),
      ),
    );

    // Sección 2: Experiencia
    const expElements = D.experience.map(exp => {
      if (exp.isOpenSource) {
        return el('div', { class: 'mobile-oss-card' },
          el('div', { style: 'font-weight:bold;color:#003399;font-size:12px;margin-bottom:6px;' }, exp.company),
          el('p', {}, exp.description),
          el('a', { href: exp.link, target: '_blank', rel: 'noopener' }, exp.linkLabel || 'Ver en GitHub ↗'),
        );
      }

      return el('div', { class: 'mobile-exp-card' },
        el('div', { class: 'mobile-exp-header' },
          el('span', { class: 'mobile-exp-company' }, exp.company),
          el('span', { class: 'mobile-exp-badge' }, exp.badge),
        ),
        el('div', { class: 'mobile-exp-dates' }, `${exp.role} • ${exp.period}`),
        el('ul', { class: 'mobile-exp-bullets' },
          ...exp.bullets.map(b => html('li', {}, b)),
        ),
        exp.tags && exp.tags.length > 0
          ? el('div', { class: 'mobile-exp-tags' },
              ...exp.tags.map(t => el('span', { class: 'tag-pill' }, t)),
            )
          : null,
      );
    });

    const secExp = el('div', { id: 'mob-sec-exp', class: 'mobile-section' },
      el('div', { class: 'mobile-panel' },
        el('div', { class: 'mobile-panel-title' },
          el('span', {}, '📁'),
          el('span', {}, 'Experiencia Profesional'),
        ),
        el('div', { class: 'mobile-panel-body' },
          ...expElements,
        ),
      ),
    );

    // Sección 3: Habilidades
    const skillCats = D.skills.map(cat =>
      el('div', { class: 'mobile-skill-cat' },
        el('div', { class: 'mobile-skill-cat-title' },
          el('span', {}, cat.icon),
          el('span', {}, cat.title),
        ),
        el('div', { class: 'mobile-skill-tags' },
          ...cat.items.map(name => el('span', { class: 'tag-pill' }, name)),
        ),
      )
    );

    const secSkills = el('div', { id: 'mob-sec-skills', class: 'mobile-section' },
      el('div', { class: 'mobile-panel' },
        el('div', { class: 'mobile-panel-title' },
          el('span', {}, '⚙️'),
          el('span', {}, 'Habilidades & Tecnologías'),
        ),
        el('div', { class: 'mobile-panel-body' },
          el('div', { class: 'mobile-skills-grid' }, ...skillCats),
        ),
      ),
    );

    // Sección 4: Educación y Certificaciones
    const eduItems = D.education.map(edu =>
      el('div', { class: 'mobile-edu-item' },
        el('div', { class: 'mobile-edu-degree' }, edu.degree),
        el('div', { class: 'mobile-edu-institution' }, edu.institution),
        el('div', { class: 'mobile-edu-period' }, edu.period),
        el('p',   { class: 'mobile-edu-desc' }, edu.description),
      )
    );

    const certItems = D.certifications.map(c =>
      el('div', { class: 'mobile-cert-item' },
        el('div', { class: 'mobile-cert-name' }, c.name),
        el('div', { class: 'mobile-cert-desc' }, c.description),
      )
    );

    const secEdu = el('div', { id: 'mob-sec-edu', class: 'mobile-section' },
      el('div', { class: 'mobile-panel' },
        el('div', { class: 'mobile-panel-title' },
          el('span', {}, '🎓'),
          el('span', {}, 'Educación'),
        ),
        el('div', { class: 'mobile-panel-body' }, ...eduItems),
      ),
      el('div', { class: 'mobile-panel' },
        el('div', { class: 'mobile-panel-title' },
          el('span', {}, '📜'),
          el('span', {}, 'Certificaciones'),
        ),
        el('div', { class: 'mobile-panel-body' }, ...certItems),
      ),
    );

    root.appendChild(secAbout);
    root.appendChild(secExp);
    root.appendChild(secSkills);
    root.appendChild(secEdu);

    // Listeners para la barra de navegación mobile
    document.querySelectorAll('.mobile-nav-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const targetId = btn.dataset.mobileSection;
        if (!targetId) return;

        document.querySelectorAll('.mobile-nav-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        document.querySelectorAll('.mobile-section').forEach(s => s.classList.remove('active'));
        const targetEl = document.getElementById(targetId);
        if (targetEl) {
          targetEl.classList.add('active');
          const mobileShell = document.getElementById('mobile-shell');
          if (mobileShell) {
            mobileShell.scrollTo({ top: 0, behavior: 'smooth' });
          }
        }
      });
    });
  }

  // ── INIT ─────────────────────────────────────────────────────

  function init() {
    buildWinAbout();
    buildWinProjects();
    buildWinSkills();
    buildMobileShell();
    console.log('[renderer] Portafolio renderizado desde portfolio-data.js (desktop + mobile) ✓');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
