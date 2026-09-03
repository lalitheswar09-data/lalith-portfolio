const canvas=document.getElementById("field");
const ctx=canvas.getContext("2d");
let points=[],mouse={x:-9999,y:-9999};
function resize(){const d=window.devicePixelRatio||1;canvas.width=innerWidth*d;canvas.height=innerHeight*d;canvas.style.width=innerWidth+"px";canvas.style.height=innerHeight+"px";ctx.setTransform(d,0,0,d,0,0);const count=Math.min(90,Math.floor(innerWidth/16));points=Array.from({length:count},()=>({x:Math.random()*innerWidth,y:Math.random()*innerHeight,vx:(Math.random()-.5)*.16,vy:(Math.random()-.5)*.16}))}
addEventListener("resize",resize);
addEventListener("mousemove",e=>{mouse.x=e.clientX;mouse.y=e.clientY;const c=document.querySelector(".cursor");if(c)c.style.transform=`translate(${e.clientX-6.5}px,${e.clientY-6.5}px)`});
resize();
function animate(){ctx.clearRect(0,0,innerWidth,innerHeight);for(const p of points){p.x+=p.vx;p.y+=p.vy;if(p.x<0||p.x>innerWidth)p.vx*=-1;if(p.y<0||p.y>innerHeight)p.vy*=-1;const d=Math.hypot(mouse.x-p.x,mouse.y-p.y);if(d<150){p.x+=(p.x-mouse.x)*.0006;p.y+=(p.y-mouse.y)*.0006}ctx.beginPath();ctx.arc(p.x,p.y,1,0,Math.PI*2);ctx.fillStyle="#79ffb088";ctx.fill()}for(let i=0;i<points.length;i++)for(let j=i+1;j<points.length;j++){const a=points[i],b=points[j],d=Math.hypot(a.x-b.x,a.y-b.y);if(d<120){ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);ctx.strokeStyle=`rgba(121,255,176,${(1-d/120)*.09})`;ctx.stroke()}}requestAnimationFrame(animate)}
animate();

const dateFormatter=new Intl.DateTimeFormat("en-IN",{timeZone:"Asia/Kolkata",weekday:"long",day:"2-digit",month:"short",year:"numeric"});
function updateClock(){const now=new Date();const parts=new Intl.DateTimeFormat("en-IN",{timeZone:"Asia/Kolkata",hour:"2-digit",minute:"2-digit",hour12:true}).formatToParts(now);const hour=parts.find(x=>x.type==="hour")?.value||"";const minute=parts.find(x=>x.type==="minute")?.value||"";const period=(parts.find(x=>x.type==="dayPeriod")?.value||"").toUpperCase();const time=`${hour}:${minute}`;const date=dateFormatter.format(now).toUpperCase();document.getElementById("lock-time").textContent=time;document.getElementById("lock-period").textContent=period;document.getElementById("lock-date").textContent=date.replaceAll(",","");document.getElementById("desktop-time").textContent=`${time} ${period}`;document.getElementById("desktop-date").textContent=date}
updateClock();setInterval(updateClock,1000);
const observer=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting)entry.target.classList.add("visible")})},{threshold:.12});
document.querySelectorAll(".reveal").forEach(el=>observer.observe(el));


/* =========================================================
   SLIDE 3 — ONE CONTINUOUS GSAP MOTION PATH
   The visual is one uninterrupted snake/tube. Scroll draws the tube
   from top-right through both rounded turns to the lower endpoint,
   while one white marker travels on that exact same path.
   ========================================================= */
(function initExperienceMotion(){
  function start(){
    if (!window.gsap || !window.ScrollTrigger) return;
    gsap.registerPlugin(ScrollTrigger);

    const wrap = document.querySelector('.scroll-trigger-ready__worm-wrap');
    if (!wrap) return;

    const path = wrap.querySelector('.worm-single');
    const glow = wrap.querySelector('.worm-single-glow');
    const orb = wrap.querySelector('.motion-orb-single');
    const node = wrap.querySelector('.node-upper');
    if (!path || !glow || !orb || !node) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const length = path.getTotalLength();
    const glowLength = glow.getTotalLength();

    gsap.set(path, { strokeDasharray: length, strokeDashoffset: reduced ? 0 : length });
    gsap.set(glow, { strokeDasharray: glowLength, strokeDashoffset: reduced ? 0 : glowLength });
    gsap.set(node, { opacity: 1, scale: 1, transformOrigin: '50% 50%' });
    gsap.set(orb, { opacity: reduced ? 1 : 0, x: 0, y: 0, scale: 1, transformOrigin: '50% 50%' });

    if (reduced) return;

    // SVG-native path sampling is used for the marker. This avoids the
    // SVG transform/cx-cy mismatch that caused the earlier animation bug.
    const startPoint = path.getPointAtLength(0);
    gsap.set(orb, { x: 0, y: 0, opacity: 1 });

    const state = { progress: .015 };
    const renderMarker = () => {
      const p = path.getPointAtLength(length * state.progress);
      gsap.set(orb, { x: p.x - startPoint.x, y: p.y - startPoint.y });
    };

    const tl = gsap.timeline({
      defaults: { ease: 'none' },
      scrollTrigger: {
        trigger: wrap,
        start: 'top 82%',
        end: 'bottom 8%',
        scrub: 1,
        invalidateOnRefresh: true
      }
    });

    tl.to([path, glow], { strokeDashoffset: 0, duration: 1 }, 0)
      .to(state, {
        progress: .985,
        duration: 1,
        onUpdate: renderMarker
      }, 0);

    renderMarker();

    gsap.to(wrap.querySelector('.orbit-one'), { rotation: 360, duration: 30, repeat: -1, ease: 'none' });
    gsap.to(wrap.querySelector('.orbit-two'), { rotation: -360, duration: 24, repeat: -1, ease: 'none' });

    ScrollTrigger.refresh();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start, { once: true });
  } else {
    start();
  }
})();

/* =========================================================
   SLIDE 4 — PROJECTS / PINNED HORIZONTAL SCROLL
   Exact behavior of the supplied Lusion-style reference:
   vertical page scroll -> pinned 100vh rail -> horizontal track.
   ========================================================= */
(function initProjectsPinScroll(){
  function start(){
    const wrapper = document.getElementById('pinWrapper');
    const track = document.getElementById('track');
    const progressBar = document.getElementById('pinProgress');
    const progressLabel = document.getElementById('pinProgressLabel');
    const sticky = wrapper?.querySelector('.pin-sticky');
    const dragCursor = document.getElementById('projectsDragCursor');
    if (!wrapper || !track || !sticky) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    const isNarrow = window.matchMedia('(max-width: 768px)').matches;
    if (reduceMotion || isTouch || isNarrow) return;

    let ticking = false;
    let scrollableDistance = 1;
    let maxTranslate = 0;

    function measure(){
      scrollableDistance = Math.max(wrapper.offsetHeight - window.innerHeight, 1);
      maxTranslate = Math.max(track.scrollWidth - window.innerWidth, 0);
      update();
    }

    function update(){
      const rect = wrapper.getBoundingClientRect();
      const progress = Math.min(Math.max(-rect.top / scrollableDistance, 0), 1);
      const x = -progress * maxTranslate;
      track.style.transform = `translate3d(${x}px,0,0)`;

      if (progressBar) {
        progressBar.style.width = `${progress * 100}%`;
      }

      if (progressLabel) {
        const index = Math.min(4, Math.max(1, Math.floor(progress * 4) + 1));
        progressLabel.textContent = `${String(index).padStart(2,'0')} / 04`;
      }
    }

    function requestUpdate(){
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        update();
        ticking = false;
      });
    }

    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', measure);
    window.addEventListener('load', measure, { once: true });

    if ('ResizeObserver' in window) {
      const ro = new ResizeObserver(measure);
      ro.observe(track);
      ro.observe(wrapper);
    }

    if (dragCursor) {
      window.addEventListener('mousemove', (event) => {
        dragCursor.style.setProperty('--cx', `${event.clientX}px`);
        dragCursor.style.setProperty('--cy', `${event.clientY}px`);
      }, { passive: true });

      sticky.addEventListener('mouseenter', () => {
        dragCursor.classList.add('show');
        document.body.classList.add('projects-cursor-active');
      });

      sticky.addEventListener('mouseleave', () => {
        dragCursor.classList.remove('show');
        document.body.classList.remove('projects-cursor-active');
      });
    }

    measure();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start, { once: true });
  } else {
    start();
  }
})();
