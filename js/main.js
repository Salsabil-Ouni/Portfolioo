/* Mobile nav burger */
const burger = document.querySelector('.nav-burger');
const navEl  = document.querySelector('nav');
if (burger) {
  burger.addEventListener('click', () => navEl.classList.toggle('nav-open'));
  document.querySelectorAll('.nav-links a').forEach(a =>
    a.addEventListener('click', () => navEl.classList.remove('nav-open'))
  );
  document.addEventListener('click', e => {
    if (!navEl.contains(e.target)) navEl.classList.remove('nav-open');
  });
}

/* Scroll reveal */
const obs = new IntersectionObserver(
  e => e.forEach(x => { if (x.isIntersecting) x.target.classList.add('v'); }),
  { threshold: .08 }
);
document.querySelectorAll('.reveal').forEach(el => obs.observe(el));

/* Active nav highlight */
const NAV_IDS = ['about','experience','education','skills','projects','certifications','languages','achievement','volunteering','contact'];
const linkMap = {};
NAV_IDS.forEach(id => {
  const a = document.querySelector(`.nav-links a[href="#${id}"]`);
  if (a) linkMap[id] = a;
});
const activeObs = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      Object.values(linkMap).forEach(a => a.classList.remove('active'));
      if (linkMap[entry.target.id]) linkMap[entry.target.id].classList.add('active');
    }
  });
}, { rootMargin: '-66px 0px -55% 0px', threshold: 0 });
NAV_IDS.forEach(id => { const el = document.getElementById(id); if (el) activeObs.observe(el); });

/* Back to top */
const btt = document.getElementById('btt');
window.addEventListener('scroll', () => btt.classList.toggle('btt-show', window.scrollY > 400));
btt.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

/* Project modal */
const projModal = document.getElementById('proj-modal');
projModal.addEventListener('click', e => {
  if (e.target === projModal) {
    projModal.classList.remove('open');
    const v = projModal.querySelector('video'); if (v) v.pause();
  }
});
document.querySelectorAll('.pc[data-name]').forEach(card => {
  card.addEventListener('click', () => {
    document.getElementById('pm-icon').textContent = card.dataset.icon || '';
    document.getElementById('pm-name').textContent = card.dataset.name;
    document.getElementById('pm-desc').textContent = card.dataset.desc;
    const videoEl = document.getElementById('pm-video');
    if (card.dataset.video) {
      videoEl.innerHTML = `<video src="${card.dataset.video}" controls style="width:100%;border-radius:12px;margin-bottom:20px;max-height:280px;background:#000;"></video>`;
    } else {
      videoEl.innerHTML = '';
    }
    document.getElementById('pm-tags').innerHTML = card.dataset.tech.split(',').map(t => `<span class="pm-tag">${t.trim()}</span>`).join('');
    const btns = document.getElementById('pm-btns');
    btns.innerHTML = '';
    if (card.dataset.demo)   btns.innerHTML += `<a href="${card.dataset.demo}"   target="_blank" class="btn btn-p" style="font-size:.8rem;padding:7px 18px;">🚀 live demo</a>`;
    if (card.dataset.github) btns.innerHTML += `<a href="${card.dataset.github}" target="_blank" class="btn btn-s" style="font-size:.8rem;padding:7px 18px;">🐙 github</a>`;
    projModal.classList.add('open');
  });
});

/* Resume modal */
const resumeModal = document.getElementById('resume-modal');
resumeModal.addEventListener('click', e => { if (e.target === resumeModal) resumeModal.classList.remove('open'); });

/* Escape key */
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    projModal.classList.remove('open');
    resumeModal.classList.remove('open');
    const v = projModal.querySelector('video'); if (v) v.pause();
  }
});
