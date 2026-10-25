/* =====================================================
   EDIT EVERYTHING HERE – no need to touch the rest.
   ===================================================== */
const CONFIG = {
  bride: "Neha",
  groom: "Shrinivas",
  intro: "Together with their families",
  invite: "Joyfully invite you to celebrate their wedding",
  hashtag: "#NehaWedsShrinivas",
  closing: "With love, and with gratitude for your presence.",

  shloka: "॥ शुभ विवाह ॥",
  blessing: "With the blessings of the Almighty and our elders, two hearts are becoming one. We humbly seek your presence and your heartfelt blessings as Neha and Shrinivas begin their journey of togetherness. Your love and good wishes will make our celebration complete.",

  // Format: YYYY-MM-DDTHH:mm:ss  (counts down to the wedding)
  weddingDateTime: "2027-02-14T11:30:00",

  events: [
    { title: "Wedding", date: "Thursday, 3 December 2026", time: "9:25 AM onwards",
      venue: " the Venue", address: "Full venue address, City, State",
      mapQuery: "Venue Name, City" },
    { title: "Reception", date: "Sunday, 14 February 2027", time: "7:00 PM onwards",
      venue: " Venue", address: "Full venue address, City, State",
      mapQuery: "Reception Venue, City" }
  ],

  story: [
    { when: "How we met",   title: "A chance hello",        text: "Our story began working together at the same airline. ✈️One day, in golden and black ,we unknowingly matched outfit and our eyes met amidst a crowd of colleagues. ✨A simple chai break turned into friendship, followed by our first ice cream date after shift. 🍦And just like that, a beautiful journey from friendship to love began, leading us to forever. ❤️" },
  ],

  // Add your photo paths or URLs here. Leave empty [] to show placeholders.
  photos: [
    // "photos/1.jpg", "photos/2.jpg", "photos/3.jpg"
  ],
  placeholderCount: 6,

  // Optional background music (e.g. "music/shehnai.mp3"). Leave "" for none.
  music: ""
};

/* ---------------- RENDER ---------------- */
const $ = s => document.querySelector(s);
document.querySelectorAll('[data-k]').forEach(el => el.textContent = CONFIG[el.dataset.k]);
$('#seal-ini').textContent = CONFIG.bride[0] + ' & ' + CONFIG.groom[0];
document.title = `${CONFIG.bride} & ${CONFIG.groom} – Wedding Invitation`;

const W = CONFIG.events[0];
$('#h-date').textContent = W.date.replace(/^\w+, /, '');
$('#h-place').textContent = W.venue;

$('#timeline').innerHTML = CONFIG.story.map(s =>
  `<div class="ev"><p class="caps">${s.when}</p><h3>${s.title}</h3><p>${s.text}</p></div>`).join('');

$('#eventCards').innerHTML = CONFIG.events.map(e => {
  const q = encodeURIComponent(e.mapQuery);
  return `<article class="card"><p class="caps" style="color:var(--gold)">${e.time}</p>
  <h3>${e.title}</h3><p class="when">${e.date}</p>
  <p class="where">${e.venue}<br><small>${e.address}</small></p>
  <iframe loading="lazy" title="Map of ${e.venue}" src="https://www.google.com/maps?q=${q}&output=embed"></iframe>
  <a class="btn" target="_blank" rel="noopener" href="https://www.google.com/maps/search/?api=1&query=${q}">GET DIRECTIONS</a></article>`;
}).join('');

const g = $('#galleryGrid');
if (CONFIG.photos.length) {
  g.innerHTML = CONFIG.photos.map(p => `<figure><img loading="lazy" src="${p}" alt="${CONFIG.bride} and ${CONFIG.groom}"></figure>`).join('');
} else {
  g.innerHTML = Array.from({length: CONFIG.placeholderCount}, () => `<figure><span class="ph">Your photo<br>here</span></figure>`).join('');
}
g.addEventListener('click', e => {
  const im = e.target.closest('figure')?.querySelector('img'); if (!im) return;
  $('#lb img').src = im.src; $('#lb').classList.add('on');
});
$('#lb').onclick = () => $('#lb').classList.remove('on');

/* hanging flowers + bells */
const hang = () => Array.from({length: 7}, () => '<span></span>').join('');
$('#hangA').innerHTML = hang(); $('#hangB').innerHTML = hang();
$('#bells').innerHTML = Array.from({length: 6}, () => '<div class="bell"><i></i><b></b></div>').join('');

/* ---------------- COUNTDOWN ---------------- */
const target = new Date(CONFIG.weddingDateTime).getTime();
$('#timer').innerHTML = ['Days','Hours','Minutes','Seconds'].map(u =>
  `<div class="unit"><b id="t-${u}">00</b><span class="caps">${u}</span></div>`).join('');
function tick() {
  let d = target - Date.now();
  if (d <= 0) { ['Days','Hours','Minutes','Seconds'].forEach(u => $('#t-' + u).textContent = '00');
    $('#countMsg').textContent = 'Today is the day. Thank you for celebrating with us!'; return; }
  const v = { Days: Math.floor(d/864e5), Hours: Math.floor(d/36e5)%24, Minutes: Math.floor(d/6e4)%60, Seconds: Math.floor(d/1e3)%60 };
  for (const k in v) $('#t-' + k).textContent = String(v[k]).padStart(2, '0');
  $('#countMsg').textContent = `Until ${W.date}`;
}
tick(); setInterval(tick, 1000);

/* ---------------- OPENING SEQUENCE ---------------- */
function petals(n) {
  const box = $('#petals');
  for (let i = 0; i < n; i++) {
    const p = document.createElement('div'); p.className = 'petal';
    p.style.left = Math.random() * 100 + 'vw';
    p.style.setProperty('--dx', (Math.random() * 200 - 100) + 'px');
    p.style.animationDuration = (5 + Math.random() * 6) + 's';
    p.style.animationDelay = Math.random() * 3 + 's';
    p.style.background = ['#d9694f','#e9a37d','#f0c27a','#e98f9a'][i % 4];
    box.appendChild(p); setTimeout(() => p.remove(), 14000);
  }
}
let audio;
$('#openBtn').onclick = () => {
  $('#intro').classList.add('open');
  setTimeout(() => petals(45), 900);
  setTimeout(() => { $('#intro').style.display = 'none'; document.body.classList.remove('locked'); }, 3400);
  if (CONFIG.music) {
    audio = new Audio(CONFIG.music); audio.loop = true; audio.play().catch(() => {});
    const m = $('#music'); m.style.display = 'block';
    m.onclick = () => { audio.paused ? audio.play() : audio.pause(); m.style.opacity = audio.paused ? .5 : 1; };
  }
};
