const audio=new Audio('love-story.mpeg');
audio.volume=.72;
audio.preload='auto';


const observer=new IntersectionObserver(entries=>{
 entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('show')});
},{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));

function sealDate(){
 const name=document.getElementById('name').value.trim();
 const signature=document.getElementById('signature').value.trim();

 // His actual name — spelling is checked, but CAPITAL/lowercase doesn't matter
 const correctName='Soumyadeep Ghosh';

 if(!name){
  document.getElementById('name').focus();
  document.getElementById('name').placeholder='First type your name, Mr. Brave Guy 😌';
  return;
 }

 // Name validation — Rahul, rahul, RAHUL, RaHuL etc. are accepted
if(name.toLowerCase() !== correctName.toLowerCase()){
  const nameField = document.getElementById('name');
  const nameError = document.getElementById('nameError');

  nameField.focus();

  nameField.classList.remove('wrong-name');

  // Restart shake animation
  void nameField.offsetWidth;

  nameField.classList.add('wrong-name');

  // Show error message
  nameError.textContent = "Sorry, wrong person. You aren't that person ❤️";
  nameError.classList.add('show-error');

  setTimeout(()=>{
    nameField.classList.remove('wrong-name');
  },700);

  return;
}

 if(!signature){
  document.getElementById('signature').focus();
  document.getElementById('signature').placeholder='You forgot the most important part… sign here ❤️';
  return;
 }

 document.getElementById('signBtn').disabled=true;
 document.getElementById('name').disabled=true;
 document.getElementById('signature').disabled=true;
 document.getElementById('seal').classList.add('show');

 audio.currentTime=0;
 audio.play().catch(()=>{});

 celebration();

 setTimeout(()=>{
   const final=document.getElementById('final');
   final.classList.add('show');
   final.scrollIntoView({behavior:'smooth'});
 },1200);
}

function celebration(){
 const c=document.getElementById('confetti'),ctx=c.getContext('2d');
 c.width=innerWidth;
 c.height=innerHeight;

 let pieces=[];

 for(let i=0;i<180;i++) pieces.push({
  x:innerWidth/2,
  y:innerHeight*.55,
  vx:(Math.random()-.5)*12,
  vy:-Math.random()*13-3,
  s:Math.random()*7+3,
  r:Math.random()*6.28,
  vr:(Math.random()-.5)*.3,
  life:Math.random()*90+80
 });

 let frame=0;

 function draw(){
  ctx.clearRect(0,0,c.width,c.height);

  pieces.forEach(p=>{
   p.x+=p.vx;
   p.vy+=.35;
   p.y+=p.vy;
   p.r+=p.vr;
   p.life--;

   ctx.save();
   ctx.translate(p.x,p.y);
   ctx.rotate(p.r);

   ctx.fillStyle=[
    '#ffc1d5',
    '#ff7fa8',
    '#542b3c',
    '#b86b8d'
   ][Math.floor(Math.random()*4)];

   ctx.fillRect(-p.s/2,-p.s/2,p.s,p.s*.55);
   ctx.restore();
  });

  pieces=pieces.filter(p=>p.life>0);

  if(pieces.length && frame++<170)
   requestAnimationFrame(draw);
 }

 draw();
}

window.addEventListener('resize',()=>{
 const c=document.getElementById('confetti');
 c.width=innerWidth;
 c.height=innerHeight;
});