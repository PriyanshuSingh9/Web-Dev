// ---------- Utilities ----------
function validUrl(u){
try{
const url = new URL(u);
return url.protocol === 'http:' || url.protocol === 'https:';
}catch(e){
return false;
}
}

function saveList(key, arr){
localStorage.setItem(key, JSON.stringify(arr));
}
function loadList(key){
try{ return JSON.parse(localStorage.getItem(key)) || []; }catch(e){ return []; }
}

// ---------- Onclick version (uses onclick attribute) ----------
const KEY_ONCLICK = 'bookmarks_onclick';

function renderOnclick(){
const list = loadList(KEY_ONCLICK);
const ul = document.getElementById('listOnclick');
ul.innerHTML = '';
list.forEach((b, i) => {
const li = document.createElement('li');
li.className = 'bookmark';
li.innerHTML = `<div><a href="${escapeHtml(b.url)}" target="_blank" rel="noopener">${escapeHtml(b.title)}</a><div class="small">${escapeHtml(b.url)}</div></div>`;

const deleteBtn = document.createElement('button');
deleteBtn.className = 'btn danger';
deleteBtn.textContent = 'Delete';
// attach delete using onclick property on the button element
deleteBtn.onclick = function(){
list.splice(i,1);
saveList(KEY_ONCLICK, list);
renderOnclick();
};

li.appendChild(deleteBtn);
ul.appendChild(li);
});
}

// called from the button's onclick attribute in HTML
function addBookmarkOnclick(e){
e && e.preventDefault && e.preventDefault();
const title = document.getElementById('titleOnclick').value.trim();
const url = document.getElementById('urlOnclick').value.trim();

if(!title || !url){ alert('Please provide both title and url.'); return; }
if(!validUrl(url)){ alert('Please enter a valid http/https URL.'); return; }

const list = loadList(KEY_ONCLICK);
list.push({title, url});
saveList(KEY_ONCLICK, list);
document.getElementById('titleOnclick').value = '';
document.getElementById('urlOnclick').value = '';
renderOnclick();
}

function clearOnclickStorage(){
if(confirm('Clear all bookmarks in onclick demo?')){
localStorage.removeItem(KEY_ONCLICK);
renderOnclick();
}
}

// ---------- addEventListener version ----------
const KEY_LISTENER = 'bookmarks_listener';

const addBtn = document.getElementById('addListenerBtn');
const clearBtn = document.getElementById('clearListenerBtn');

function renderListener(){
const list = loadList(KEY_LISTENER);
const ul = document.getElementById('listListener');
ul.innerHTML = '';
list.forEach((b, i) => {
const li = document.createElement('li');
li.className = 'bookmark';
const linkDiv = document.createElement('div');
const a = document.createElement('a');
a.href = b.url;
a.target = '_blank';
a.rel = 'noopener';
a.textContent = b.title;
const meta = document.createElement('div'); meta.className = 'small'; meta.textContent = b.url;
linkDiv.appendChild(a); linkDiv.appendChild(meta);

const deleteBtn = document.createElement('button');
deleteBtn.className = 'btn danger';
deleteBtn.textContent = 'Delete';
// attach delete handler using addEventListener
deleteBtn.addEventListener('click', function(){
list.splice(i,1);
saveList(KEY_LISTENER, list);
renderListener();
});

li.appendChild(linkDiv);
li.appendChild(deleteBtn);
ul.appendChild(li);
});
}

// handler functions attached via addEventListener
function onAddListenerClick(e){
e && e.preventDefault && e.preventDefault();
const title = document.getElementById('titleListener').value.trim();
const url = document.getElementById('urlListener').value.trim();
if(!title || !url){ alert('Please provide both title and url.'); return; }
if(!validUrl(url)){ alert('Please enter a valid http/https URL.'); return; }
const list = loadList(KEY_LISTENER);
list.push({title, url});
saveList(KEY_LISTENER, list);
document.getElementById('titleListener').value = '';
document.getElementById('urlListener').value = '';
renderListener();
}

function onClearListenerClick(){
if(confirm('Clear all bookmarks in addEventListener demo?')){
localStorage.removeItem(KEY_LISTENER);
renderListener();
}
}

// attach listeners
addBtn.addEventListener('click', onAddListenerClick);
clearBtn.addEventListener('click', onClearListenerClick);

// ---------- helpers ----------
function escapeHtml(s){
return String(s)
.replace(/&/g, '&amp;')
.replace(/</g, '&lt;')
.replace(/>/g, '&gt;')
.replace(/"/g, '&quot;')
.replace(/'/g, '&#039;');
}

// initial render
renderOnclick();
renderListener();
