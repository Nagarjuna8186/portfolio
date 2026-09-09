const nav=document.querySelector(".nav"),menu=document.querySelector(".menu-toggle");
menu?.addEventListener("click",()=>{const open=nav.classList.toggle("open");menu.setAttribute("aria-expanded",open)});
document.querySelectorAll('.nav a[href^="#"]').forEach(a=>a.addEventListener("click",()=>nav.classList.remove("open")));

const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add("visible")}),{threshold:.12});
document.querySelectorAll(".reveal").forEach(el=>observer.observe(el));

const sections=[...document.querySelectorAll("main section[id]")];
const links=[...document.querySelectorAll(".nav a[href^='#']")];
const activeObserver=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){links.forEach(l=>l.classList.remove("active"));const l=document.querySelector(`.nav a[href="#${e.target.id}"]`);l?.classList.add("active")}}),{rootMargin:"-35% 0px -55% 0px"});
sections.forEach(s=>activeObserver.observe(s));

const topBtn=document.getElementById("topBtn");
window.addEventListener("scroll",()=>topBtn.classList.toggle("show",scrollY>600),{passive:true});
topBtn.addEventListener("click",()=>scrollTo({top:0,behavior:"smooth"}));

const glow=document.querySelector(".cursor-glow");
if(window.matchMedia("(pointer:fine)").matches)document.addEventListener("pointermove",e=>{glow.style.transform=`translate(${e.clientX-120}px,${e.clientY-120}px)`});

document.querySelectorAll(".skill-group b").forEach(x=>x.addEventListener("mouseenter",()=>x.style.color="#b6abff"));

const form=document.getElementById("contactForm"),msg=document.getElementById("formMessage");
form.addEventListener("submit",e=>{
  e.preventDefault();
  const data=new FormData(form),email=data.get("email");
  if(!data.get("name")||!email||!data.get("subject")||!data.get("message")){msg.textContent="Please complete all fields.";msg.style.color="#eef35f";return}
  const valid=/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  if(!valid){msg.textContent="Please enter a valid email address.";msg.style.color="#eef35f";return}
  const subject=encodeURIComponent(data.get("subject"));
  const body=encodeURIComponent(`Name: ${data.get("name")}\nEmail: ${email}\n\n${data.get("message")}`);
  window.location.href=`mailto:yamalanagarjuna2004@gmail.com?subject=${subject}&body=${body}`;
  msg.textContent="Opening your email client…";
  msg.style.color="#00cbaa";
});

document.querySelectorAll(".project").forEach(card=>{
  card.addEventListener("pointermove",e=>{
    if(!window.matchMedia("(pointer:fine)").matches)return;
    const r=card.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;
    card.style.transform=`perspective(900px) rotateX(${y*-1.2}deg) rotateY(${x*1.2}deg)`;
  });
  card.addEventListener("pointerleave",()=>card.style.transform="");
});
