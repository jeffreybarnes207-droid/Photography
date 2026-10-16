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

// Navigate the same photographs currently visible in the gallery.
let viewerPhotos = [], viewerIndex = 0;
const viewer = $('#viewer');
const controls = document.createElement('div');
controls.className = 'viewer-controls';
const previous = document.createElement('button');
previous.type = 'button';
previous.textContent = '← Previous';
previous.setAttribute('aria-label', 'Previous photograph');
const position = document.createElement('span');
position.setAttribute('role', 'status');
position.setAttribute('aria-live', 'polite');
const next = document.createElement('button');
next.type = 'button';
next.textContent = 'Next →';
next.setAttribute('aria-label', 'Next photograph');
controls.append(previous, position, next);
viewer.append(controls);
const viewerStyle = document.createElement('style');
viewerStyle.textContent = '.viewer-controls{display:flex;align-items:center;justify-content:space-between;gap:16px;padding:16px 4px;color:white}.viewer-controls button{border:1px solid currentColor;padding:10px 14px;min-height:44px;color:inherit;background:transparent;cursor:pointer}.viewer-controls button:focus-visible{outline:3px solid #f4b8d0;outline-offset:3px}.viewer-controls button:disabled{opacity:.4;cursor:default}';
document.head.append(viewerStyle);
function showViewerPhoto(index) {
  if (!viewerPhotos.length) return;
  viewerIndex = (index + viewerPhotos.length) % viewerPhotos.length;
  const photo = viewerPhotos[viewerIndex];
  $('#big').src = photo.url;
  $('#big').alt = photo.title;
  $('#photo-title').textContent = photo.title;
  $('#photo-category').textContent = photo.category;
  position.textContent = (viewerIndex + 1) + ' of ' + viewerPhotos.length;
  previous.disabled = next.disabled = viewerPhotos.length < 2;
}
function openViewer(list, index) {
  viewerPhotos = list.slice();
  showViewerPhoto(index);
  viewer.showModal();
}
previous.onclick = () => showViewerPhoto(viewerIndex - 1);
next.onclick = () => showViewerPhoto(viewerIndex + 1);
viewer.addEventListener('keydown', event => {
  if (!viewer.open || event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
  if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
    event.preventDefault();
    showViewerPhoto(viewerIndex + (event.key === 'ArrowRight' ? 1 : -1));
  }
});

function render(){
$('#count').textContent=String(photos.length).padStart(2,'0');const cats=['All photos',...new Set(photos.map(p=>p.category))];$('#filters').replaceChildren(...cats.map(c=>{const b=document.createElement('button');b.textContent=c;b.setAttribute('aria-pressed',String(filter===c));b.className=filter===c?'active':'';b.onclick=()=>{filter=c;render()};return b}));
const list=photos.filter(p=>(filter==='All photos'||p.category===filter)&&p.title.toLowerCase().includes($('#search').value.toLowerCase()));$('#empty').hidden=photos.length>0;$('#none').hidden=!(photos.length>0&&list.length===0);$('#grid').replaceChildren(...list.map((p,index)=>{const b=document.createElement('button');b.className='photo';const img=document.createElement('img');img.src=p.url;img.alt=p.title;img.loading='lazy';const wrap=document.createElement('div');wrap.className='image-wrap';wrap.append(img);const cap=document.createElement('div');cap.className='caption';const title=document.createElement('span');title.textContent=p.title;const cat=document.createElement('small');cat.textContent=p.category;cap.append(title,cat);b.append(wrap,cap);b.onclick=()=>openViewer(list,index);return b}))
}

document.querySelectorAll('[data-close]').forEach(button => button.onclick = () => button.closest('dialog').close());
$('#search').oninput = render;
$('#retry').onclick = load;
load();
