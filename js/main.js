// ===== TYPING ANIMATION =====
const roles = ['a Graphic Designer.','a Brand Identity Expert.','a Visual Creator.','a Typography Lover.','an Art Director.'];
let roleIndex=0,charIndex=0,isDeleting=false;
const typingEl=document.getElementById('typingText');
function type(){
  const cur=roles[roleIndex];
  if(isDeleting){typingEl.textContent=cur.substring(0,charIndex-1);charIndex--;}
  else{typingEl.textContent=cur.substring(0,charIndex+1);charIndex++;}
  let speed=isDeleting?60:100;
  if(!isDeleting&&charIndex===cur.length){speed=2000;isDeleting=true;}
  else if(isDeleting&&charIndex===0){isDeleting=false;roleIndex=(roleIndex+1)%roles.length;speed=400;}
  setTimeout(type,speed);
}
type();

// ===== NAVBAR =====
const navbar=document.getElementById('navbar');
window.addEventListener('scroll',()=>{
  navbar.classList.toggle('scrolled',window.scrollY>20);
  updateActiveLink();
});
function updateActiveLink(){
  const sections=document.querySelectorAll('section[id]');
  let current='';
  sections.forEach(s=>{if(window.scrollY>=s.offsetTop-100)current=s.id;});
  document.querySelectorAll('.nav-link').forEach(l=>{
    l.classList.remove('active');
    if(l.getAttribute('href')==='#'+current)l.classList.add('active');
  });
}

// ===== HAMBURGER =====
const hamburger=document.getElementById('hamburger');
const navLinks=document.getElementById('navLinks');
hamburger.addEventListener('click',()=>{
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
});
document.querySelectorAll('.nav-link').forEach(l=>l.addEventListener('click',()=>{
  hamburger.classList.remove('open');
  navLinks.classList.remove('open');
}));

// ===== PORTFOLIO FILTER =====
const filterBtns=document.querySelectorAll('.filter-btn');
const portfolioCards=document.querySelectorAll('.portfolio-card');
filterBtns.forEach(btn=>{
  btn.addEventListener('click',()=>{
    filterBtns.forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
    const f=btn.dataset.filter;
    portfolioCards.forEach(card=>{
      if(f==='all'||card.dataset.category===f){card.classList.remove('hidden');}
      else{card.classList.add('hidden');}
    });
  });
});

// ===== LIGHTBOX =====
const portfolioData=[
  {src:'assets/portfolio/p1.jpg',category:'Branding',title:'Natura Brand Identity'},
  {src:'assets/portfolio/p2.jpg',category:'Print',title:'Bloom Magazine Layout'},
  {src:'assets/portfolio/p3.jpg',category:'Digital',title:'Lumina Social Campaign'},
  {src:'assets/portfolio/p4.jpg',category:'Illustration',title:'Abstract Series Vol.1'},
  {src:'assets/portfolio/p5.jpg',category:'Print',title:'Maison Packaging Design'},
  {src:'assets/portfolio/p6.jpg',category:'Branding',title:'Apex Corporate Rebrand'},
];
let currentIdx=0;
const lightbox=document.getElementById('lightbox');
const lightboxImg=document.getElementById('lightboxImg');
const lightboxCat=document.getElementById('lightboxCategory');
const lightboxTitle=document.getElementById('lightboxTitle');
function openLightbox(i){currentIdx=i;updateLightbox();lightbox.classList.add('open');document.body.style.overflow='hidden';}
function closeLightbox(){lightbox.classList.remove('open');document.body.style.overflow='';}
function navigateLightbox(d){currentIdx=(currentIdx+d+portfolioData.length)%portfolioData.length;updateLightbox();}
function updateLightbox(){const d=portfolioData[currentIdx];lightboxImg.src=d.src;lightboxImg.alt=d.title;lightboxCat.textContent=d.category;lightboxTitle.textContent=d.title;}
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeLightbox();if(e.key==='ArrowLeft')navigateLightbox(-1);if(e.key==='ArrowRight')navigateLightbox(1);});

// ===== SCROLL REVEAL =====
const revealObs=new IntersectionObserver(entries=>{
  entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible');});
},{threshold:.1});
document.querySelectorAll('.reveal').forEach(el=>revealObs.observe(el));

// ===== SKILL BARS =====
const skillObs=new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      e.target.querySelectorAll('.skill-fill').forEach(f=>{f.style.width=f.dataset.width+'%';});
      skillObs.unobserve(e.target);
    }
  });
},{threshold:.3});
const skillsSec=document.querySelector('.skills-section');
if(skillsSec)skillObs.observe(skillsSec);

// ===== CONTACT FORM =====
const form=document.getElementById('contactForm');
if(form){
  form.addEventListener('submit',e=>{
    e.preventDefault();
    const btn=form.querySelector('.btn-send');
    const orig=btn.textContent;
    btn.textContent='MESSAGE SENT \u2713';
    btn.style.background='#22c55e';
    setTimeout(()=>{btn.textContent=orig;btn.style.background='';form.reset();},3000);
  });
}
