/* ============================================================
   SAIRAJ AGAWANE — PORTFOLIO SCRIPT
   ============================================================ */

'use strict';

// ── Cursor glow ──
const cursorGlow = document.querySelector('.cursor-glow');
document.addEventListener('mousemove', e => {
    if (cursorGlow) {
        cursorGlow.style.left = e.clientX + 'px';
        cursorGlow.style.top  = e.clientY + 'px';
    }
});

// ── Navbar scroll ──
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (!navbar) return;
    if (window.scrollY > 60) {
        navbar.style.background = 'rgba(2,6,15,0.95)';
        navbar.style.boxShadow  = '0 4px 30px rgba(0,0,0,0.5), 0 0 0 1px rgba(0,245,255,0.1)';
    } else {
        navbar.style.background = 'rgba(3,7,18,0.72)';
        navbar.style.boxShadow  = '';
    }
}, { passive: true });

// ── Active nav on scroll ──
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            navLinks.forEach(a => {
                a.classList.toggle('active', a.getAttribute('href') === '#' + entry.target.id);
            });
        }
    });
}, { threshold: 0.35 });
sections.forEach(s => observer.observe(s));

// ── Mobile menu ──
const menuBtn    = document.querySelector('.mobile-menu-btn');
const drawer     = document.getElementById('mobile-drawer');
const drawerLinks = document.querySelectorAll('.mobile-nav-drawer a');
menuBtn?.addEventListener('click', () => drawer.classList.toggle('open'));
drawerLinks.forEach(a => a.addEventListener('click', () => drawer.classList.remove('open')));

// ── Typed.js ──
if (typeof Typed !== 'undefined') {
    new Typed('.typing-text', {
        strings: ['Software Developer', 'AI Developer', 'ML Engineer', 'IoT Builder'],
        typeSpeed: 55, backSpeed: 35, loop: true, backDelay: 2200,
        showCursor: false
    });

    new Typed('.typed-terminal', {
        strings: [
            'init portfolio.sys<br>^400>> loading AI modules...<br>^400>> connecting neural network...<br>^400>> <span style="color:#38ef7d">✓ system ready — type help</span>'
        ],
        typeSpeed: 28, showCursor: true, cursorChar: '▋', loop: false,
        onComplete() {
            const line = document.getElementById('terminal-input-line');
            const box  = document.getElementById('terminal-input');
            if (line) line.style.display = 'flex';
            if (box)  box.focus({ preventScroll: true });
        }
    });
}

// ── Terminal commands ──
const termInput  = document.getElementById('terminal-input');
const termOutput = document.getElementById('terminal-output');
const commands   = ['github','instagram','linkedin','whatsapp','about','skills','projects','experience','contact','help','clear'];
let cmdHistory   = [], histIdx = -1;

if (termInput) {
    termInput.addEventListener('keydown', e => {
        if (e.key === 'Enter') {
            const cmd = termInput.value.trim().toLowerCase();
            if (!cmd) return;
            cmdHistory.push(cmd); histIdx = cmdHistory.length;
            addTermLine(`<span class="tp">sairaj@ai:~$</span> ${cmd}`);
            termInput.value = '';

            switch (cmd) {
                case 'github':    window.open('https://github.com/SairajAgawane','_blank'); break;
                case 'instagram': window.open('https://instagram.com','_blank'); break;
                case 'linkedin':  window.open('https://linkedin.com/in/SairajAgawane','_blank'); break;
                case 'whatsapp':  window.open('https://wa.me/','_blank'); break;
                case 'about':     scrollTo('about'); break;
                case 'skills':    scrollTo('skills'); break;
                case 'projects':  scrollTo('projects'); break;
                case 'experience':scrollTo('experience'); break;
                case 'contact':   scrollTo('contact'); break;
                case 'clear':
                    termOutput.querySelectorAll('.cmd-out').forEach(el => el.remove()); break;
                case 'help':
                    addTermLine(`<span style="color:#94a3b8">Commands: github · instagram · linkedin · whatsapp<br>Sections: about · skills · projects · experience · contact<br>Utils: clear · help</span>`);
                    break;
                default:
                    addTermLine(`<span style="color:#f87171">bash: ${cmd}: command not found</span>`);
            }
        }
        if (e.key === 'ArrowUp')   { if (histIdx > 0) termInput.value = cmdHistory[--histIdx]; }
        if (e.key === 'ArrowDown') { histIdx < cmdHistory.length - 1 ? termInput.value = cmdHistory[++histIdx] : (histIdx = cmdHistory.length, termInput.value = ''); }
        if (e.key === 'Tab')       { e.preventDefault(); const m = commands.find(c => c.startsWith(termInput.value)); if (m) termInput.value = m; }
    });
}

function addTermLine(html) {
    const div = document.createElement('div');
    div.className = 'terminal-line cmd-out';
    div.innerHTML = html;
    termOutput.appendChild(div);
    termOutput.scrollTop = termOutput.scrollHeight;
}
function scrollTo(id) { document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }); }

document.querySelector('.terminal-window')?.addEventListener('click', () => termInput?.focus({ preventScroll: true }));

// ── TagCloud ──
if (typeof TagCloud !== 'undefined') {
    TagCloud('#skill-sphere', [
        'Python','Machine Learning','AI','JavaScript','Flask',
        'Data Science','C++','Java','OpenCV','React',
        'HTML','CSS','SQL','Git','Deep Learning',
        'NLP','ESP32','IoT','Robotics','Cybersecurity'
    ], {
        radius:    window.innerWidth < 768 ? 130 : 220,
        maxSpeed:  'fast', initSpeed: 'normal', direction: 135, keep: true
    });
}

// ── Skill bar animation ──
const fills = document.querySelectorAll('.skill-fill');
const skillObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const el = entry.target;
            el.style.width = el.dataset.w + '%';
            skillObserver.unobserve(el);
        }
    });
}, { threshold: 0.2 });
fills.forEach(f => skillObserver.observe(f));

// ── ScrollReveal ──
if (typeof ScrollReveal !== 'undefined') {
    const sr = ScrollReveal({ reset: false, distance: '50px', duration: 900, delay: 150, easing: 'cubic-bezier(0.4,0,0.2,1)' });
    sr.reveal('.reveal-up',    { origin: 'bottom', interval: 100 });
    sr.reveal('.reveal-left',  { origin: 'left' });
    sr.reveal('.reveal-right', { origin: 'right' });
    sr.reveal('.section-heading', { origin: 'top', delay: 100 });
}

// ── Contact form ──
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', async e => {
        e.preventDefault();
        const btn  = contactForm.querySelector('button[type="submit"]');
        const orig = btn.innerHTML;
        btn.innerHTML = '<span>Sending…</span> <i class="fas fa-spinner fa-spin"></i>';
        btn.disabled = true;

        const fd = new FormData();
        fd.append('access_key', '2180806b-af16-48e9-a989-ac0f8834ca0a');
        fd.append('name',    document.getElementById('name').value);
        fd.append('email',   document.getElementById('email').value);
        fd.append('message', document.getElementById('message').value);

        try {
            const res = await fetch('https://api.web3forms.com/submit', { method: 'POST', body: fd });
            if (res.ok) {
                btn.innerHTML = '<span>Sent ✓</span>';
                btn.style.background  = '#10b981';
                btn.style.color = '#fff';
                contactForm.reset();
            } else throw new Error();
        } catch {
            btn.innerHTML = '<span>Error — try again</span>';
            btn.style.background = '#ef4444';
        } finally {
            btn.disabled = false;
            setTimeout(() => { btn.innerHTML = orig; btn.style.background = ''; btn.style.color = ''; }, 3500);
        }
    });
}

// ── CAROUSEL ──
(function initCarousels() {
    document.querySelectorAll('.carousel').forEach(car => {
        const track = car.querySelector('.carousel-track');
        if (!track) return;
        car._idx = 0;
        const total = track.querySelectorAll('.carousel-slide').length;
        const tick = setInterval(() => {
            car._idx = (car._idx + 1) % total;
            _updateCar(car);
        }, 3200);
        car.addEventListener('mouseenter', () => clearInterval(tick));
    });
})();

function _updateCar(car) {
    const track = car.querySelector('.carousel-track');
    const dots  = car.querySelectorAll('.cdot');
    const total = track.querySelectorAll('.carousel-slide').length;
    const idx   = ((car._idx % total) + total) % total;
    track.style.transform = `translateX(-${idx * 100}%)`;
    dots.forEach((d,i) => d.classList.toggle('active', i === idx));
    car._idx = idx;
}
function carouselPrev(btn) {
    const car = btn.closest('.carousel');
    car._idx  = car._idx - 1;
    _updateCar(car);
}
function carouselNext(btn) {
    const car = btn.closest('.carousel');
    car._idx  = car._idx + 1;
    _updateCar(car);
}
function carouselGoTo(dots, i) {
    const car = dots.closest('.carousel');
    car._idx  = i;
    _updateCar(car);
}

// ── MODAL ──
function openModal() {
    document.getElementById('project-modal').classList.add('active');
    document.body.style.overflow = 'hidden';
}
function closeModal(e) {
    if (e.target.id === 'project-modal') closeModalBtn();
}
function closeModalBtn() {
    document.getElementById('project-modal').classList.remove('active');
    document.body.style.overflow = '';
}
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModalBtn(); });

// ══════════════════════════════════════════════════════
//  NEURAL NETWORK CANVAS BACKGROUND
//  Draws animated nodes + connections like a circuit board
// ══════════════════════════════════════════════════════
(function initNeuralCanvas() {
    const canvas = document.getElementById('neural-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let W, H, nodes, animId;
    const NODE_COUNT = () => Math.floor((W * H) / 22000);
    const MAX_DIST   = 160;
    const CYAN   = '0,245,255';
    const VIOLET = '124,58,237';

    function resize() {
        W = canvas.width  = window.innerWidth;
        H = canvas.height = window.innerHeight;
        buildNodes();
    }

    function buildNodes() {
        const count = NODE_COUNT();
        nodes = Array.from({ length: count }, () => ({
            x:  Math.random() * W,
            y:  Math.random() * H,
            vx: (Math.random() - 0.5) * 0.35,
            vy: (Math.random() - 0.5) * 0.35,
            r:  Math.random() * 2 + 1,
            pulse: Math.random() * Math.PI * 2,
            color: Math.random() > 0.5 ? CYAN : VIOLET
        }));
    }

    function draw() {
        ctx.clearRect(0, 0, W, H);

        // Draw grid lines (circuit board effect)
        ctx.strokeStyle = 'rgba(0,245,255,0.03)';
        ctx.lineWidth = 1;
        const STEP = 60;
        for (let x = 0; x < W; x += STEP) {
            ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke();
        }
        for (let y = 0; y < H; y += STEP) {
            ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
        }

        // Move + wrap nodes
        nodes.forEach(n => {
            n.x += n.vx; n.y += n.vy; n.pulse += 0.02;
            if (n.x < 0) n.x = W; if (n.x > W) n.x = 0;
            if (n.y < 0) n.y = H; if (n.y > H) n.y = 0;
        });

        // Draw connections
        for (let i = 0; i < nodes.length; i++) {
            for (let j = i + 1; j < nodes.length; j++) {
                const a = nodes[i], b = nodes[j];
                const dx = a.x - b.x, dy = a.y - b.y;
                const dist = Math.sqrt(dx*dx + dy*dy);
                if (dist < MAX_DIST) {
                    const alpha = (1 - dist / MAX_DIST) * 0.25;
                    const grad = ctx.createLinearGradient(a.x, a.y, b.x, b.y);
                    grad.addColorStop(0, `rgba(${a.color},${alpha})`);
                    grad.addColorStop(1, `rgba(${b.color},${alpha})`);
                    ctx.beginPath();
                    ctx.strokeStyle = grad;
                    ctx.lineWidth   = 0.7;
                    ctx.moveTo(a.x, a.y);
                    ctx.lineTo(b.x, b.y);
                    ctx.stroke();
                }
            }
        }

        // Draw nodes (pulsing dots)
        nodes.forEach(n => {
            const pulse = Math.sin(n.pulse) * 0.5 + 0.5;
            const r = n.r + pulse * 1.2;
            const alpha = 0.5 + pulse * 0.4;

            // Glow
            const grd = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, r * 4);
            grd.addColorStop(0, `rgba(${n.color},${alpha * 0.5})`);
            grd.addColorStop(1, `rgba(${n.color},0)`);
            ctx.beginPath();
            ctx.fillStyle = grd;
            ctx.arc(n.x, n.y, r * 4, 0, Math.PI * 2);
            ctx.fill();

            // Core dot
            ctx.beginPath();
            ctx.fillStyle = `rgba(${n.color},${alpha})`;
            ctx.arc(n.x, n.y, r, 0, Math.PI * 2);
            ctx.fill();
        });

        animId = requestAnimationFrame(draw);
    }

    window.addEventListener('resize', () => { cancelAnimationFrame(animId); resize(); draw(); });
    resize();
    draw();
})();
