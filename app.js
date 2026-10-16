const $ = s => document.querySelector(s);
let photos = [], filter = 'All photos';
function say(message) { $('#status').textContent = message; }
function validatePhoto(photo) {
  if (!photo || typeof photo.title !== 'string' || !photo.title.trim() || typeof photo.category !== 'string' || !photo.category.trim() || typeof photo.url !== 'string') throw Error('Invalid photo entry.');
  const url = new URL(photo.url, document.baseURI);
  const folder = new URL('./photos/', document.baseURI);
  if (url.origin !== folder.origin || !url.pathname.startsWith(folder.pathname) || !/\.(jpg|jpeg|png|webp|gif)$/i.test(url.pathname)) throw Error('Photos must use image files in the photos folder.');
  return { title: photo.title, category: photo.category, url: url.href };
}
async function load() {
  $('#loading').hidden = false; $('#retry').hidden = true;
  try {
    const response = await fetch(new URL('./photos.json', document.baseURI), { cache: 'no-cache' });
    if (!response.ok) throw Error('Photo list unavailable.');
    const list = await response.json();
    if (!Array.isArray(list)) throw Error('Invalid photo list.');
    photos = list.map(validatePhoto); render(); say('');
  } catch {
    $('#empty').hidden = true;
    say('The photographs could not be loaded. Please try again shortly.');
    $('#retry').hidden = false;
  } finally { $('#loading').hidden = true; }
}
function render(){
$('#count').textContent=String(photos.length).padStart(2,'0');const cats=['All photos',...new Set(photos.map(p=>p.category))];$('#filters').replaceChildren(...cats.map(c=>{const b=document.createElement('button');b.textContent=c;b.setAttribute('aria-pressed',String(filter===c));b.className=filter===c?'active':'';b.onclick=()=>{filter=c;render()};return b}));
const list=photos.filter(p=>(filter==='All photos'||p.category===filter)&&p.title.toLowerCase().includes($('#search').value.toLowerCase()));$('#empty').hidden=photos.length>0;$('#none').hidden=!(photos.length>0&&list.length===0);$('#grid').replaceChildren(...list.map(p=>{const b=document.createElement('button');b.className='photo';const img=document.createElement('img');img.src=p.url;img.alt=p.title;img.loading='lazy';const wrap=document.createElement('div');wrap.className='image-wrap';wrap.append(img);const cap=document.createElement('div');cap.className='caption';const title=document.createElement('span');title.textContent=p.title;const cat=document.createElement('small');cat.textContent=p.category;cap.append(title,cat);b.append(wrap,cap);b.onclick=()=>{$('#big').src=p.url;$('#big').alt=p.title;$('#photo-title').textContent=p.title;$('#photo-category').textContent=p.category;$('#viewer').showModal()};return b}))
}

document.querySelectorAll('[data-close]').forEach(button => button.onclick = () => button.closest('dialog').close());
$('#search').oninput = render;
$('#retry').onclick = load;
load();
