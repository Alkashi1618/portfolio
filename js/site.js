(function () {
  'use strict';
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Données ---------- */
  var PROJECTS = [
    {
      id: 'vote', cat: 'crypto', catLabel: 'Cryptographie', icon: '🗳️',
      grad: 'linear-gradient(135deg,#0e7490,#6d28d9)',
      title: 'Vote électronique souverain — ZKP & Blockchain',
      short: 'Système de vote pour le Sénégal : confidentialité par preuves ZKP, intégrité par blockchain permissionnée.',
      details: [
        'Mémoire de Licence (LACGAA) : vote électronique à preuves à divulgation nulle de connaissance sur Ethereum.',
        'Évolution en cours vers un système souverain : ZKP (Circom/SnarkJS) pour la confidentialité.',
        'Chiffrement ElGamal homomorphe à seuil pour le dépouillement sans révéler les votes individuels.',
        'Hyperledger Fabric (blockchain permissionnée) pour l\'intégrité et la traçabilité, identité numérique eSignet.'
      ],
      tags: ['Circom', 'SnarkJS', 'ElGamal', 'Hyperledger Fabric', 'Ethereum', 'Python', 'Django']
    },
    {
      id: 'soar', cat: 'secu', catLabel: 'Sécurité & SOC', icon: '🛰️',
      grad: 'linear-gradient(135deg,#065f46,#0e7490)',
      title: 'Plateforme SOC / SOAR',
      short: 'Architecture de 9 VMs avec SIEM, EDR, IDS/IPS, orchestration et réponse à incident automatisées.',
      details: [
        'Architecture de 9 VMs : Windows Server 2022, Windows 10, Ubuntu, Kali, avec Active Directory (enterprise.local).',
        'Détection : Wazuh (SIEM + EDR), Suricata (IDS/IPS), Zeek.',
        'Orchestration et réponse : Shuffle, TheHive, Cortex, IRIS, Velociraptor.',
        'Renseignement sur la menace : MISP et OpenCTI. Supervision : Grafana + Prometheus.'
      ],
      tags: ['Wazuh', 'Suricata', 'Zeek', 'Shuffle', 'TheHive', 'MISP', 'OpenCTI', 'Velociraptor']
    },
    {
      id: 'kc', cat: 'secu', catLabel: 'Sécurité & SOC', icon: '🔑',
      grad: 'linear-gradient(135deg,#1e3a8a,#0891b2)',
      title: 'Authentification centralisée — Keycloak',
      short: 'Déploiement SSO / IAM intégré à LDAP et Active Directory, avec MFA et gestion fine des rôles.',
      details: [
        'Déploiement d\'un SSO/IAM Keycloak.',
        'Intégration LDAP / Active Directory.',
        'Protocoles : OAuth2, SAML, OpenID Connect.',
        'Politiques MFA, gestion des rôles et des permissions.'
      ],
      tags: ['Keycloak', 'SSO', 'MFA', 'OAuth2', 'SAML', 'OIDC', 'LDAP']
    },
    {
      id: 'vxlan', cat: 'reseau', catLabel: 'Réseaux', icon: '🌐',
      grad: 'linear-gradient(135deg,#7c2d12,#be185d)',
      title: 'Interconnexion VXLAN/IPsec & SD-WAN',
      short: 'Interconnexion sécurisée (−30 % de latence) et SD-WAN en haute disponibilité (99,5 % d\'uptime).',
      details: [
        'Interconnexion VXLAN over IPsec sur équipements Cisco et Fortinet : −30 % de latence.',
        'Déploiement SD-WAN et haute disponibilité : 99,5 % d\'uptime.',
        'Durcissement de serveurs Linux (SSH, services, pare-feu, mises à jour).',
        'Déploiement Kaspersky EDR : 20+ politiques de sécurité sur 50+ postes.'
      ],
      tags: ['VXLAN', 'IPsec', 'SD-WAN', 'FortiGate', 'Cisco', 'Kaspersky EDR']
    },
    {
      id: 'ctf', cat: 'crypto', catLabel: 'Cryptographie', icon: '🧮',
      grad: 'linear-gradient(135deg,#4c1d95,#be185d)',
      title: 'Plateforme de cryptographie — WICECTF 2025',
      short: 'Application web de chiffrement / déchiffrement et de hachage, déployée sur Vercel.',
      details: [
        'Plateforme web complète de chiffrement et déchiffrement.',
        'Algorithmes classiques et modernes : AES, RSA.',
        'Fonctions de hachage : MD5 et famille SHA.',
        'Déployée sur Vercel.'
      ],
      tags: ['AES', 'RSA', 'SHA', 'MD5', 'Web', 'Vercel'],
      link: { href: 'https://wicectf2025crypto.vercel.app', label: 'Voir le site' }
    },
    {
      id: 'rooms', cat: 'dev', catLabel: 'Développement', icon: '🏢',
      grad: 'linear-gradient(135deg,#0f766e,#1d4ed8)',
      title: 'LmcRooms — Réservation de salles',
      short: 'Application web de réservation de salles conçue chez Pyramide Technologies.',
      details: [
        'Conception et développement complets de l\'application.',
        'Back-end Django / Django REST Framework, base PostgreSQL.',
        'Interface React.'
      ],
      tags: ['Django', 'DRF', 'React', 'PostgreSQL']
    }
  ];

  var SKILLS = [
    { icon: '🔐', title: 'Cryptographie', items: ['Chiffrement symétrique & asymétrique', 'Signature numérique', 'Hachage', 'PKI / X.509', 'Chiffrement homomorphe', 'ZKP', 'OpenSSL', 'CryptoJAVA'] },
    { icon: '🛡️', title: 'Sécurité des infrastructures', items: ['FortiGate (HA, IPsec)', 'Cisco ASA', 'pfSense', 'Kaspersky EDR', 'VPN IPsec / VXLAN', 'Suricata IDS/IPS', 'Segmentation réseau'] },
    { icon: '📡', title: 'SOC & SOAR', items: ['Wazuh', 'Shuffle', 'TheHive', 'MISP', 'Velociraptor', 'Zeek', 'OpenCTI', 'Grafana', 'Prometheus'] },
    { icon: '🧩', title: 'Identités & accès', items: ['Active Directory', 'Microsoft Entra ID', 'Keycloak', 'MFA', 'OAuth2', 'SAML', 'OIDC', 'GPO'] },
    { icon: '🔎', title: 'Analyse & tests', items: ['Wireshark', 'Nmap', 'Metasploit', 'BurpSuite', 'Gobuster', 'Sqlmap', 'Analyse de logs'] },
    { icon: '📋', title: 'Gouvernance & conformité', items: ['ISO 27001', 'ISO 27005', 'EBIOS RM', 'PCA / PRA', 'PCI DSS', 'Audit de sécurité'] },
    { icon: '🌐', title: 'Réseaux', items: ['LAN / WAN', 'VLAN', 'SD-WAN', 'Haute disponibilité', 'VXLAN', 'Routage', 'GNS3', 'PNetLab'] },
    { icon: '🖥️', title: 'Systèmes & Cloud', items: ['Windows Server', 'Linux Ubuntu / Debian', 'Microsoft 365', 'VMware ESXi', 'Hyper-V', 'Zabbix', 'WSUS'] },
    { icon: '💻', title: 'Développement', items: ['Python', 'Java (JEE / Spring Boot)', 'Django', 'React', 'SQL (PostgreSQL, Oracle)', 'Docker', 'Git'] }
  ];

  var CERTS = [
    { org: 'Fortinet', title: 'Fortinet Certified Fundamentals in Cybersecurity (FCF)', img: 'img/certif/fortinet-fcf.jpg' },
    { org: 'Fortinet', title: 'Fortinet Certified Associate in Cybersecurity (FCA) · NSE3', img: 'img/certif/fortinet-fca.jpg' },
    { org: 'ForceN', title: 'Analyste Junior en Cybersécurité', img: 'img/certif/forcen-analyste.jpg' },
    { org: 'Udemy', title: 'Windows Command Mastery', img: 'img/certif/udemy-windows.jpg' },
    { org: 'Udemy', title: 'Advanced IT Troubleshooting', img: 'img/certif/udemy-troubleshooting.jpg' }
  ];

  var esc = function (s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); };

  /* ---------- Rendu ---------- */
  $('#projects').innerHTML = PROJECTS.map(function (p, i) {
    return '<button class="project reveal" style="--d:' + (i % 3) * 0.08 + 's" data-cat="' + p.cat + '" data-id="' + p.id + '" aria-label="Détails : ' + esc(p.title) + '">' +
      '<div class="p-cover" style="background:' + p.grad + '"><span>' + p.icon + '</span></div>' +
      '<div class="p-body"><span class="p-cat">' + p.catLabel + '</span><h3>' + esc(p.title) + '</h3><p>' + esc(p.short) + '</p>' +
      '<div class="tags">' + p.tags.slice(0, 4).map(function (t) { return '<span>' + esc(t) + '</span>'; }).join('') + '</div>' +
      '<span class="p-more">Voir le détail →</span></div></button>';
  }).join('');

  $('#skills').innerHTML = SKILLS.map(function (g, i) {
    return '<div class="skill-box reveal" style="--d:' + (i % 3) * 0.08 + 's"><h3><i>' + g.icon + '</i>' + esc(g.title) + '</h3><div class="pills">' +
      g.items.map(function (t) { return '<span class="pill">' + esc(t) + '</span>'; }).join('') + '</div></div>';
  }).join('');

  $('#certs').innerHTML = CERTS.map(function (c, i) {
    return '<button class="cert reveal" style="--d:' + (i % 4) * 0.07 + 's" data-img="' + c.img + '" data-title="' + esc(c.title) + '">' +
      '<div class="cert-img"><img src="' + c.img + '" alt="Certificat : ' + esc(c.title) + '" loading="lazy"></div>' +
      '<div class="cert-body"><small>' + c.org + '</small><h3>' + esc(c.title) + '</h3></div></button>';
  }).join('');

  /* ---------- Thème ---------- */
  $('#themeBtn').addEventListener('click', function () {
    var next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    try { localStorage.setItem('theme', next); } catch (e) {}
    $('meta[name="theme-color"]').setAttribute('content', next === 'dark' ? '#0a0f1e' : '#f7f9fd');
  });

  /* ---------- Nav ---------- */
  var nav = $('#nav'), links = $('#links'), burger = $('#burger');
  burger.addEventListener('click', function () {
    var open = links.classList.toggle('open');
    burger.setAttribute('aria-expanded', open);
  });
  $$('a', links).forEach(function (a) { a.addEventListener('click', function () { links.classList.remove('open'); burger.setAttribute('aria-expanded', false); }); });

  var bar = $('#progress');
  function onScroll() {
    var y = window.scrollY, h = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.width = (h > 0 ? (y / h) * 100 : 0) + '%';
    nav.classList.toggle('scrolled', y > 20);
  }
  window.addEventListener('scroll', onScroll, { passive: true }); onScroll();

  var secs = $$('main section[id]');
  var spy = new IntersectionObserver(function (es) {
    es.forEach(function (e) {
      if (e.isIntersecting) {
        $$('a', links).forEach(function (a) { a.classList.toggle('active', a.getAttribute('href') === '#' + e.target.id); });
      }
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  secs.forEach(function (s) { spy.observe(s); });

  /* ---------- Glow souris ---------- */
  if (!reduce && window.matchMedia('(pointer:fine)').matches) {
    var glow = $('#glow');
    window.addEventListener('mousemove', function (e) { glow.style.setProperty('--mx', e.clientX + 'px'); glow.style.setProperty('--my', e.clientY + 'px'); }, { passive: true });
  }

  /* ---------- Reveal + compteurs ---------- */
  function countUp(el) {
    var end = parseFloat(el.dataset.count), dec = parseInt(el.dataset.dec || 0, 10),
      pre = el.dataset.prefix || '', suf = el.dataset.suffix || '', dur = 1600, t0 = null;
    function step(t) {
      if (!t0) t0 = t;
      var p = Math.min((t - t0) / dur, 1), v = end * (1 - Math.pow(1 - p, 3));
      el.textContent = pre + v.toFixed(dec).replace('.', ',') + suf;
      if (p < 1) requestAnimationFrame(step);
    }
    if (reduce) { el.textContent = pre + end.toFixed(dec).replace('.', ',') + suf; } else { requestAnimationFrame(step); }
  }
  var io = new IntersectionObserver(function (es) {
    es.forEach(function (e) {
      if (!e.isIntersecting) return;
      e.target.classList.add('in');
      $$('[data-count]', e.target).forEach(countUp);
      io.unobserve(e.target);
    });
  }, { threshold: .12 });
  $$('.reveal').forEach(function (el) { io.observe(el); });

  /* ---------- Texte tapé ---------- */
  var roles = ['Ingénieur Sécurité des SI', 'Administrateur Réseaux & Sécurité', 'Formateur en Cryptographie', 'Chercheur Crypto-Informatique (ZKP)'];
  var tEl = $('#typed'), ri = 0, ci = 0, del = false;
  function type() {
    var w = roles[ri];
    tEl.textContent = w.slice(0, ci);
    if (!del && ci < w.length) { ci++; setTimeout(type, 70); }
    else if (!del) { del = true; setTimeout(type, 1500); }
    else if (ci > 0) { ci--; setTimeout(type, 30); }
    else { del = false; ri = (ri + 1) % roles.length; setTimeout(type, 300); }
  }
  if (reduce) { tEl.textContent = roles[0]; } else { type(); }

  /* ---------- Onglets ---------- */
  $$('.tab').forEach(function (b) {
    b.addEventListener('click', function () {
      $$('.tab').forEach(function (x) { x.classList.toggle('active', x === b); x.setAttribute('aria-selected', x === b); });
      $$('.tab-panel').forEach(function (p) { p.classList.toggle('active', p.id === 'tab-' + b.dataset.tab); });
      $$('#tab-' + b.dataset.tab + ' .reveal').forEach(function (r) { r.classList.add('in'); });
    });
  });

  /* ---------- Filtres projets ---------- */
  $$('#filters .chip-btn').forEach(function (b) {
    b.addEventListener('click', function () {
      $$('#filters .chip-btn').forEach(function (x) { x.classList.toggle('active', x === b); });
      $$('.project').forEach(function (p) { p.classList.toggle('hide', b.dataset.f !== 'all' && p.dataset.cat !== b.dataset.f); });
    });
  });

  /* ---------- Modales ---------- */
  var lastFocus = null;
  function openModal(m) { lastFocus = document.activeElement; m.classList.add('open'); m.setAttribute('aria-hidden', 'false'); document.body.style.overflow = 'hidden'; var c = $('.modal-close', m); if (c) c.focus(); }
  function closeModal(m) { m.classList.remove('open'); m.setAttribute('aria-hidden', 'true'); document.body.style.overflow = ''; if (lastFocus) lastFocus.focus(); }
  var modal = $('#modal'), lb = $('#lightbox');
  $('#projects').addEventListener('click', function (e) {
    var card = e.target.closest('.project'); if (!card) return;
    var p = PROJECTS.filter(function (x) { return x.id === card.dataset.id; })[0];
    $('#modalBody').innerHTML =
      '<div class="m-cover" style="background:' + p.grad + '">' + p.icon + '</div><div class="m-body"><span class="p-cat">' + p.catLabel + '</span><h3>' + esc(p.title) + '</h3><p>' + esc(p.short) + '</p><ul>' +
      p.details.map(function (d) { return '<li>' + esc(d) + '</li>'; }).join('') + '</ul><div class="tags">' +
      p.tags.map(function (t) { return '<span>' + esc(t) + '</span>'; }).join('') + '</div>' +
      (p.link ? '<div class="m-actions"><a class="btn btn-primary btn-sm" href="' + p.link.href + '" target="_blank" rel="noopener">' + p.link.label + ' ↗</a></div>' : '') + '</div>';
    openModal(modal);
  });
  $('#certs').addEventListener('click', function (e) {
    var c = e.target.closest('.cert'); if (!c) return;
    var img = $('#lbImg'); img.src = c.dataset.img; img.alt = c.dataset.title; openModal(lb);
  });
  $('#modalClose').addEventListener('click', function () { closeModal(modal); });
  $('#lbClose').addEventListener('click', function () { closeModal(lb); });
  [modal, lb].forEach(function (m) { m.addEventListener('click', function (e) { if (e.target === m) closeModal(m); }); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') { [modal, lb].forEach(function (m) { if (m.classList.contains('open')) closeModal(m); }); } });

  /* ---------- Formulaire (EmailJS) ---------- */
  var hasEmailJS = typeof emailjs !== 'undefined';
  if (hasEmailJS) emailjs.init('RN1mK9jE_cYJ9-kDi');
  var form = $('#contactForm'), msg = $('#formMsg'), btn = $('#sendBtn');
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    msg.className = 'form-msg'; msg.textContent = '';
    var data = { from_name: $('#name').value.trim(), from_email: $('#email').value.trim(), subject: $('#subject').value.trim(), message: $('#message').value.trim(), to_email: 'Alkashi089@gmail.com' };
    if (!data.from_name || !/^\S+@\S+\.\S+$/.test(data.from_email) || !data.subject || !data.message) {
      msg.className = 'form-msg err'; msg.textContent = 'Merci de remplir tous les champs avec un email valide.'; return;
    }
    if (!hasEmailJS) { msg.className = 'form-msg err'; msg.textContent = 'Service d\'envoi indisponible. Écrivez-moi directement à ousmane.deme1@outlook.com.'; return; }
    btn.disabled = true; var old = btn.textContent; btn.textContent = 'Envoi en cours…';
    emailjs.send('service_0o611qj', 'template_f41zba5', data).then(function () {
      msg.className = 'form-msg ok'; msg.textContent = 'Message envoyé. Je vous réponds dans les plus brefs délais.'; form.reset();
    }, function () {
      msg.className = 'form-msg err'; msg.textContent = 'Échec de l\'envoi. Réessayez ou écrivez à ousmane.deme1@outlook.com.';
    }).then(function () { btn.disabled = false; btn.textContent = old; });
  });

  $('#year').textContent = new Date().getFullYear();

  /* ---------- Réseau animé (hero) ---------- */
  var cv = $('#net');
  if (cv && !reduce) {
    var ctx = cv.getContext('2d'), W, H, pts = [], mouse = { x: -999, y: -999 }, run = true;
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    function size() {
      W = cv.clientWidth; H = cv.clientHeight; cv.width = W * dpr; cv.height = H * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      var n = Math.min(90, Math.floor(W * H / 14000)); pts = [];
      for (var i = 0; i < n; i++) pts.push({ x: Math.random() * W, y: Math.random() * H, vx: (Math.random() - .5) * .35, vy: (Math.random() - .5) * .35 });
    }
    function col() { return getComputedStyle(document.documentElement).getPropertyValue('--accent').trim() || '#22d3ee'; }
    function draw() {
      if (!run) return;
      ctx.clearRect(0, 0, W, H);
      var c = col(), i, j, a, b, d;
      for (i = 0; i < pts.length; i++) {
        a = pts[i]; a.x += a.vx; a.y += a.vy;
        if (a.x < 0 || a.x > W) a.vx *= -1; if (a.y < 0 || a.y > H) a.vy *= -1;
        ctx.globalAlpha = .9; ctx.fillStyle = c; ctx.beginPath(); ctx.arc(a.x, a.y, 1.8, 0, 6.283); ctx.fill();
        for (j = i + 1; j < pts.length; j++) {
          b = pts[j]; d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < 130) { ctx.globalAlpha = (1 - d / 130) * .35; ctx.strokeStyle = c; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke(); }
        }
        d = Math.hypot(a.x - mouse.x, a.y - mouse.y);
        if (d < 160) { ctx.globalAlpha = (1 - d / 160) * .6; ctx.strokeStyle = '#8b5cf6'; ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(mouse.x, mouse.y); ctx.stroke(); }
      }
      requestAnimationFrame(draw);
    }
    cv.parentElement.addEventListener('mousemove', function (e) { var r = cv.getBoundingClientRect(); mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top; });
    cv.parentElement.addEventListener('mouseleave', function () { mouse.x = mouse.y = -999; });
    new IntersectionObserver(function (es) { var v = es[0].isIntersecting; if (v && !run) { run = true; draw(); } run = v; }).observe(cv);
    window.addEventListener('resize', size);
    size(); draw();
  }
})();
