/*
 * JDI BEAUTY — Lógica de la aplicación (JavaScript).
 * Gestiona los datos de ejemplo, persistencia local, navegación por hash,
 * renderizado de vistas, filtros, comparación, detalle, carrito, compra
 * simulada y operaciones del panel administrativo.
 * La documentación se añade mediante comentarios; no se alteran instrucciones.
 */

'use strict';
/* Atajo para consultar un elemento del DOM dentro de un contenedor opcional. */
const $=(s,r=document)=>r.querySelector(s);
/* Formatea importes usando la convención de miles de Colombia. */
const money=n=>'$'+Number(n).toLocaleString('es-CO');
const SHIP=12000;
const DEPTS=['Amazonas','Antioquia','Arauca','Atlántico','Bogotá D.C.','Bolívar','Boyacá','Caldas','Caquetá','Casanare','Cauca','Cesar','Chocó','Córdoba','Cundinamarca','Guainía','Guaviare','Huila','La Guajira','Magdalena','Meta','Nariño','Norte de Santander','Putumayo','Quindío','Risaralda','San Andrés y Providencia','Santander','Sucre','Tolima','Valle del Cauca','Vaupés','Vichada'];
const STATES=['Recibido','En preparación','Enviado','Cancelado'];
const CATS=['Rostro','Labios','Ojos','Paletas'];

/* ---------- DATOS Y ESTADO ---------- */
/* Define los productos de demostración, tonos, pedidos iniciales y estado en memoria. */
/* Crea un objeto de tono con nombre, color, categoría y disponibilidad. */
const T=(n,hex,color,ok=true)=>({n,hex,color,ok});
/* Catálogo inicial de demostración: productos, precios, stock y atributos cosméticos. */
const SEED=[
{id:1,ph:['base','base-2'],name:'Base de Maquillaje Luminosa',brand:'JDI Beauty',cat:'Rostro',type:'Base',price:78000,content:'30 ml',kind:'base',stock:15,rating:4.5,rv:24,
 desc:'Base de cobertura media con acabado luminoso que unifica el tono de la piel.',
 tones:[T('Porcelana','#f1cfb8','Nude'),T('Natural','#e6b894','Nude'),T('Beige','#d79f78','Beige'),T('Canela','#c48560','Beige'),T('Caramelo','#a9683f','Café',false)],
 skin:'Todo tipo',finish:'Luminoso',formula:'Líquida',ingr:'Agua, glicerina, dimeticona, pigmentos minerales.',use:'Aplicar con esponja o brocha desde el centro del rostro hacia afuera.',care:'Mantener en un lugar fresco y cerrar bien después de usar.',benefits:'Unifica y aporta luminosidad.'},
{id:2,ph:['labial','labial-2'],name:'Labial Mate Velvet',brand:'JDI Beauty',cat:'Labios',type:'Labial',price:52000,content:'4 g',kind:'labial',stock:8,rating:4.5,rv:18,
 desc:'Labial de acabado mate con textura cremosa y color intenso.',
 tones:[T('Rojo Pasión','#a52230','Rojo'),T('Rosa Nude','#c98a85','Rosa'),T('Vino','#6d1f33','Vino'),T('Rosa Intenso','#c4456a','Rosa')],
 skin:'Todo tipo',finish:'Mate',formula:'Crema',ingr:'Ceras, aceites vegetales, pigmentos.',use:'Aplicar directamente sobre los labios desde el centro hacia las comisuras.',care:'Guardar lejos del calor directo.',benefits:'Color intenso y larga duración.'},
{id:3,ph:['rubor','rubor-2'],name:'Rubor Compacto',brand:'JDI Beauty',cat:'Rostro',type:'Rubor',price:64000,content:'6 g',kind:'rubor',stock:0,rating:4,rv:11,
 desc:'Rubor en polvo compacto de acabado satinado.',
 tones:[T('Melocotón','#f0a58f','Coral'),T('Rosa Suave','#e89aa0','Rosa'),T('Coral','#e0705a','Coral'),T('Terracota','#b9674b','Café')],
 skin:'Piel seca y normal',finish:'Satinado',formula:'Polvo compacto',ingr:'Talco, mica, pigmentos.',use:'Aplicar sobre las mejillas con brocha y difuminar.',care:'Mantener tapado después de cada uso.',benefits:'Aporta color y define.'},
{id:4,ph:['mascara','ojos'],name:'Máscara de Pestañas Volume',brand:'JDI Beauty',cat:'Ojos',type:'Máscara',price:46000,content:'9 ml',kind:'mascara',stock:12,rating:4.5,rv:20,
 desc:'Máscara de pestañas que aporta volumen y definición.',
 tones:[T('Negro','#1c1a1a','Negro')],
 skin:'Todo tipo',finish:'Natural',formula:'Líquida',ingr:'Agua, ceras, pigmentos.',use:'Aplicar desde la raíz hacia las puntas de las pestañas.',care:'Cerrar bien después de usar.',benefits:'Volumen y definición.'},
{id:5,ph:['paletas','paleta-2'],name:'Paleta de Sombras Nude',brand:'JDI Beauty',cat:'Paletas',type:'Paleta',price:89000,content:'12 g',kind:'paleta',stock:10,rating:4.5,rv:9,
 desc:'Paleta de sombras en tonos nude y cobrizos.',
 tones:[T('Nude','#d9ab94','Nude'),T('Cobre','#a8644a','Café'),T('Rosa','#c98a85','Rosa')],
 skin:'Todo tipo',finish:'Satinado',formula:'Polvo compacto',ingr:'Talco, mica, pigmentos.',use:'Aplicar con brocha sobre el párpado y difuminar.',care:'Mantener cerrada y seca.',benefits:'Combinaciones versátiles para el día y la noche.'},
{id:6,ph:['rubor-2','rubor'],name:'Polvo Compacto Traslúcido',brand:'JDI Beauty',cat:'Rostro',type:'Polvo',price:58000,content:'9 g',kind:'rubor',stock:14,rating:4.5,rv:15,
 desc:'Polvo compacto que sella el maquillaje y controla el brillo durante el día.',
 tones:[T('Translúcido','#efd9c9','Nude'),T('Natural','#e2bfa3','Nude'),T('Beige','#d3a784','Beige')],
 skin:'Piel mixta y grasa',finish:'Mate',formula:'Polvo compacto',ingr:'Talco, mica, sílice, pigmentos.',use:'Aplicar con brocha o esponja sobre el rostro, principalmente en la zona T.',care:'Mantener tapado y lejos de la humedad.',benefits:'Controla el brillo y deja un acabado uniforme.'},
{id:7,ph:['labios','labial-2'],name:'Labial Satinado Rose',brand:'JDI Beauty',cat:'Labios',type:'Labial',price:49000,content:'4 g',kind:'labial',stock:20,rating:5,rv:22,
 desc:'Labial de acabado satinado con color luminoso y cómodo para el uso diario.',
 tones:[T('Rosa Palo','#d98b94','Rosa'),T('Fucsia','#c2306a','Rosa'),T('Coral','#e06a55','Coral'),T('Rojo Clásico','#b3202e','Rojo')],
 skin:'Todo tipo',finish:'Satinado',formula:'Crema',ingr:'Ceras, aceites vegetales, pigmentos.',use:'Aplicar directamente sobre los labios desde el centro hacia las comisuras.',care:'Guardar lejos del calor directo.',benefits:'Color luminoso e hidratación ligera.'},
{id:8,ph:['ojos','mascara'],name:'Máscara de Pestañas Lengthening',brand:'JDI Beauty',cat:'Ojos',type:'Máscara',price:44000,content:'8 ml',kind:'mascara',stock:6,rating:4.5,rv:13,
 desc:'Máscara de pestañas que alarga y separa cada pestaña.',
 tones:[T('Negro','#1c1a1a','Negro'),T('Café','#4a2e24','Café')],
 skin:'Todo tipo',finish:'Natural',formula:'Líquida',ingr:'Agua, ceras, pigmentos.',use:'Aplicar desde la raíz hacia las puntas de las pestañas.',care:'Cerrar bien después de usar.',benefits:'Alarga y define las pestañas.'},
{id:9,ph:['paleta-2','paletas'],name:'Paleta de Sombras Cobre',brand:'JDI Beauty',cat:'Paletas',type:'Paleta',price:92000,content:'14 g',kind:'paleta',stock:5,rating:4.5,rv:8,
 desc:'Paleta de sombras en tonos cobrizos y tierra para looks cálidos.',
 tones:[T('Cobre','#a8644a','Café'),T('Tierra','#8c5543','Café'),T('Nude','#d9ab94','Nude')],
 skin:'Todo tipo',finish:'Satinado',formula:'Polvo compacto',ingr:'Talco, mica, pigmentos.',use:'Aplicar con brocha sobre el párpado y difuminar.',care:'Mantener cerrada y seca.',benefits:'Pigmentación alta y fácil de difuminar.'},
{id:10,ph:['rostro','base-2'],name:'Base de Maquillaje Cobertura Total',brand:'JDI Beauty',cat:'Rostro',type:'Base',price:84000,content:'30 ml',kind:'base',stock:11,rating:4.5,rv:17,
 desc:'Base de alta cobertura con acabado mate para un look uniforme.',
 tones:[T('Porcelana','#f1cfb8','Nude'),T('Natural','#e6b894','Nude'),T('Beige','#d79f78','Beige'),T('Canela','#c48560','Beige')],
 skin:'Piel mixta y grasa',finish:'Mate',formula:'Líquida',ingr:'Agua, glicerina, dimeticona, pigmentos minerales.',use:'Aplicar con esponja o brocha desde el centro del rostro hacia afuera.',care:'Mantener en un lugar fresco y cerrar bien después de usar.',benefits:'Cobertura alta y larga duración.'}
];
/* Pedidos de ejemplo usados para mostrar la gestión administrativa. */
const SEED_ORD=[
{id:1003,date:'2026-10-10',client:'Ana Torres',items:[{pid:2,tone:'Rojo Pasión',qty:1}],ship:{nombre:'Ana Torres',depto:'Santander',muni:'Bucaramanga',barrio:'Cabecera',dir:'Cra 33 #45-10',info:'',recibe:'Ana Torres'},status:'En preparación'},
{id:1002,date:'2026-10-08',client:'Carlos Pérez',items:[{pid:1,tone:'Natural',qty:1},{pid:4,tone:'Negro',qty:1}],ship:{nombre:'Carlos Pérez',depto:'Antioquia',muni:'Medellín',barrio:'Laureles',dir:'Cl 70 #40-12',info:'',recibe:'Carlos Pérez'},status:'Recibido'},
{id:1001,date:'2026-10-05',client:'Laura Gómez',items:[{pid:5,tone:'Nude',qty:2}],ship:{nombre:'Laura Gómez',depto:'Bogotá D.C.',muni:'Bogotá',barrio:'Chapinero',dir:'Cl 60 #10-20',info:'',recibe:'Laura Gómez'},status:'Enviado'}
];
/* Lee un valor de localStorage y devuelve el valor alternativo si no existe o falla. */
const load=(k,d)=>{try{const v=JSON.parse(localStorage.getItem(k));return v||d}catch(e){return d}};
/* Persiste productos, carrito y pedidos en el almacenamiento local del navegador. */
const save=()=>{try{localStorage.setItem('jdi2',JSON.stringify({products:S.products,cart:S.cart,orders:S.orders}))}catch(e){}};
const saved=load('jdi2',{});
const S={products:saved.products||SEED,cart:saved.cart||[],orders:saved.orders||SEED_ORD,
 cmp:[],ct:{},f:{},q:'',cat:'',view:'home',arg:null,tone:null,qty:1,img:0,step:1,co:{},err:{},payErr:'',ofil:{},ifil:{q:'',cat:''},oid:null,adm:null,fav:[]};
/* Busca un producto por identificador en el estado actual. */
const P=id=>S.products.find(p=>p.id==id);
/* Determina si un producto tiene unidades disponibles. */
const avail=p=>p.stock>0;

/* ---------- IMÁGENES Y REPRESENTACIÓN VISUAL ---------- */
/* Genera ilustraciones de respaldo y resuelve las rutas de imágenes de cada producto. */
/* Construye una ilustración SVG de respaldo para los tipos de producto. */
function art(kind,hex,v=0){
const bg=['#f6d3d4','#f3c4c6','#fbe3e3'][v%3];
const base=`<defs><linearGradient id="g${kind}${v}" x1="0" x2="1"><stop offset="0" stop-color="#fff" stop-opacity=".55"/><stop offset=".5" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".15"/></linearGradient></defs>`;
let b='';
if(kind==='base')b=`<rect x="78" y="18" width="44" height="50" rx="5" fill="#3a2a2e"/><rect x="62" y="64" width="76" height="130" rx="10" fill="${hex}"/><rect x="62" y="64" width="76" height="130" rx="10" fill="url(#g${kind}${v})"/><rect x="76" y="110" width="48" height="30" rx="3" fill="#fff" opacity=".8"/><text x="100" y="130" font-size="11" text-anchor="middle" fill="#8b2e43" font-family="serif" font-weight="700">JDI</text>`;
else if(kind==='labial')b=`<rect x="72" y="20" width="56" height="60" rx="8" fill="${hex}"/><rect x="60" y="80" width="80" height="22" fill="#b97b6a"/><rect x="56" y="102" width="88" height="92" rx="6" fill="#d89b8d"/><rect x="56" y="102" width="88" height="92" rx="6" fill="url(#g${kind}${v})"/>`;
else if(kind==='rubor')b=`<circle cx="100" cy="115" r="78" fill="#d98c78"/><circle cx="100" cy="115" r="64" fill="${hex}"/><circle cx="100" cy="115" r="64" fill="url(#g${kind}${v})"/><circle cx="82" cy="95" r="14" fill="#fff" opacity=".25"/>`;
else if(kind==='mascara')b=`<rect x="88" y="14" width="24" height="90" rx="6" fill="#222"/><rect x="94" y="100" width="12" height="40" fill="#555"/><rect x="62" y="140" width="76" height="56" rx="8" fill="#2b2326"/><rect x="62" y="140" width="76" height="56" rx="8" fill="url(#g${kind}${v})"/>`;
else b=`<rect x="22" y="40" width="156" height="130" rx="8" fill="#6e4a40"/>${[0,1,2,3].map(i=>[0,1].map(j=>`<rect x="${32+i*36}" y="${52+j*56}" width="30" height="46" rx="4" fill="${['#e5c0aa','#d59f84','#b87457','#8c5543'][(i+j*2+v)%4]}"/>`).join('')).join('')}`;
return `<svg viewBox="0 0 200 210" xmlns="http://www.w3.org/2000/svg" role="img">${base}${b}</svg>`;
}
const PH={base:['base','base-2'],labial:['labial','labial-2'],rubor:['rubor','rubor-2'],mascara:['mascara','ojos'],paleta:['paletas','paleta-2']};
/* Devuelve la galería configurada para un producto o imágenes predeterminadas por tipo. */
const photosOf=p=>(p.photos&&p.photos.length)?p.photos.map(src=>({src,z:1})):(p.ph||PH[p.kind]||PH.base).map(n=>({src:'img/'+n+'.jpg',z:1}));
/* Genera la etiqueta de imagen de producto con texto alternativo. */
const pic=(p,v=0)=>{const a=photosOf(p),f=a[v%a.length];return `<img alt="${esc(p.name)}" src="${f.src}" style="${f.z>1?`transform:scale(${f.z})`:''}">`};
/* Recupera el tono seleccionado o el primer tono válido del producto. */
const curTone=p=>(S.ct[p.id]&&toneOk(p,S.ct[p.id]))?S.ct[p.id]:firstTone(p);
/* Dibuja los círculos de tonos disponibles en las tarjetas de producto. */
const dots=p=>p.tones.length?`<div class="dots">${p.tones.map(t=>`<span class="dot ${t.ok?'':'off'} ${t.n===curTone(p)?'on':''}" title="${esc(t.n)}" style="background:${t.hex}" data-ctone="${p.id}|${esc(t.n)}"></span>`).join('')}</div>`:'';
/* Representa visualmente la calificación y el número de valoraciones de ejemplo. */
const stars=p=>{const f=Math.floor(p.rating);return `<div class="stars">${'★'.repeat(f)}${p.rating%1?'★':''}${'☆'.repeat(5-f-(p.rating%1?1:0))} <span>(${p.rv})</span></div>`};

/* ---------- UTILIDADES GENERALES ---------- */
/* Incluye mensajes, navegación, formato de dinero, cantidades y validaciones comunes. */
/* Muestra un mensaje temporal de confirmación o validación. */
function toast(m){const t=$('#toast');t.textContent=m;t.hidden=false;clearTimeout(toast.t);toast.t=setTimeout(()=>t.hidden=true,2600)}
/* Cambia la ruta interna mediante el fragmento de URL. */
const go=h=>{location.hash=h};
/* Suma las unidades de todos los elementos del carrito. */
const cartCount=()=>S.cart.reduce((a,i)=>a+i.qty,0);
/* Calcula el subtotal de una línea del carrito. */
const lineTotal=i=>P(i.pid).price*i.qty;
/* Calcula el subtotal general de los productos del carrito. */
const subtotal=()=>S.cart.reduce((a,i)=>a+lineTotal(i),0);
/* Comprueba si un tono existe y está habilitado para el producto. */
const toneOk=(p,n)=>{const t=p.tones.find(x=>x.n===n);return t&&t.ok};
/* Obtiene el primer tono disponible para usarlo como selección predeterminada. */
const firstTone=p=>{const t=p.tones.find(x=>x.ok);return t?t.n:null};

/* Agrega un producto o acumula su cantidad, respetando el stock disponible. */
function addToCart(pid,tone,qty){
 const p=P(pid);if(!avail(p))return false;
 const ex=S.cart.find(i=>i.pid==pid&&i.tone===tone);
 const cur=ex?ex.qty:0;
 const q=Math.min(qty,p.stock-cur);
 if(q<=0){toast('Stock restante: '+Math.max(0,p.stock-cur));return false}
 if(ex)ex.qty+=q;else S.cart.push({pid:+pid,tone,qty:q});
 save();renderHeader();return true;
}

/* ---------- ENCABEZADO Y NAVEGACIÓN ---------- */
/* Construye el logotipo, los enlaces, el buscador y los indicadores del carrito. */
/* Renderiza el encabezado, navegación, búsqueda e indicador del carrito. */
function renderHeader(){
 const adm=S.view.startsWith('admin');
 $('#topbar').hidden=adm;$('#header').hidden=adm;
 $('#header').innerHTML=`<div class="logo" data-go="/">JDI<small>BEAUTY</small></div>
 <nav><a data-go="/" class="${S.view==='home'?'on':''}">Inicio</a>
 <div class="dd"><a data-go="/lista" class="${S.view==='list'&&!S.cat?'on':''}">Maquillaje ⌄</a><div class="ddm">${CATS.map(c=>`<a data-go="/lista/${c}">${c}</a>`).join('')}</div></div>
 <a data-go="/lista/Labios" class="${S.cat==='Labios'?'on':''}">Labios ⌄</a>
 <a data-go="/lista/Ojos" class="${S.cat==='Ojos'?'on':''}">Ojos ⌄</a>
 <a data-go="/lista/Rostro" class="${S.cat==='Rostro'?'on':''}">Rostro ⌄</a></nav>
 <form class="search" id="sform"><input id="sq" placeholder="Buscar productos..." value="${esc(S.q)}"><button aria-label="Buscar">🔍</button></form>
 <div class="icons"><a class="ibtn" data-go="/admin/catalogo" title="Panel de administración">👤</a><a class="ibtn" data-go="/carrito">🛒${cartCount()?`<span class="badge">${cartCount()}</span>`:''}</a></div>`;
}
/* Escapa caracteres HTML para mostrar textos dinámicos de forma segura. */
const esc=s=>String(s??'').replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));

/* ---------- PÁGINA DE INICIO ---------- */
/* Renderiza el banner principal, beneficios, productos destacados y categorías. */
/* Genera la vista inicial de la tienda. */
function home(){
  return `<section class="hero"><div class="himg l"><img alt="" src="img/hero-ojo.jpg"></div><div class="htxt"><h1>BELLEZA<br>QUE RESALTA<br>TU ESENCIA</h1><p>Maquillaje de alta calidad para cada versión de ti.</p><button class="btn" data-go="/lista">Descubrir productos</button></div><div class="himg r"><img alt="JDI Beauty" src="img/hero-prod.jpg"></div></section>
 <div class="perks"><div class="perk"><i>🚚</i><span>Envío fijo $12.000<br>a todo el país</span></div><div class="perk"><i>🛡</i><span>Productos 100%<br>originales</span></div><div class="perk"><i>🍃</i><span>Maquillaje para<br>tu tipo de piel</span></div><div class="perk"><i>♡</i><span>Belleza que<br>resalta tu esencia</span></div></div>
 <section class="sec"><div class="sec-h"><h2>Productos destacados</h2><a data-go="/lista">Ver todos</a></div><div class="carwrap"><button class="cbtn l" data-car="-1" aria-label="Anterior">‹</button><div class="car" id="car">${S.products.map(p=>card(p)).join('')}</div><button class="cbtn r" data-car="1" aria-label="Siguiente">›</button></div></section>
 <section class="sec"><div class="sec-h"><h2>Nuestras categorías</h2></div><div class="cats">${CATS.map(c=>{return `<div class="cat" data-go="/lista/${c}"><div class="pic"><img alt="${c}" src="img/${c.toLowerCase()}.jpg"></div><div class="t">${c}</div></div>`}).join('')}</div></section>`;
}
/* Crea una tarjeta de producto con precio, tonos y acciones disponibles. */
function card(p,cmp){
 return `<div class="card"><div class="pic" data-go="/producto/${p.id}">${pic(p)}</div>${cmp?`<label class="cmpchk"><input type="checkbox" data-cmp="${p.id}" ${S.cmp.includes(p.id)?'checked':''}> Comparar</label>`:''}<div class="body">
 <div class="nm">${esc(p.name)}<br><small style="color:var(--mut)">${esc(p.brand)}</small></div><div class="price">${money(p.price)}</div>${dots(p)}${stars(p)}
  <button class="btn sm" data-go="/producto/${p.id}">Ver detalle</button>
 ${cmp?(avail(p)?`<button class="btn sm out" data-add="${p.id}">Agregar al carrito</button>`:`<button class="btn sm out" disabled>Agotado</button>`):''}</div></div>`;
}

/* ---------- CATÁLOGO, BÚSQUEDA Y FILTROS ---------- */
/* Filtra productos por texto y criterios seleccionados y dibuja sus tarjetas. */
/* Aplica los filtros activos y la búsqueda al catálogo. */
function filtered(){
 const f=S.f;const q=S.q.trim().toLowerCase();
 return S.products.filter(p=>{
  if(S.cat&&p.cat!==S.cat)return false;
  if(q&&!p.name.toLowerCase().includes(q))return false;
  if(f.type&&p.type!==f.type)return false;
  if(f.color&&!p.tones.some(t=>t.color===f.color))return false;
  if(f.formula&&p.formula!==f.formula)return false;
  if(f.skin&&p.skin!==f.skin)return false;
  if(f.tone&&!p.tones.some(t=>t.n===f.tone))return false;
  if(f.min&&p.price<+f.min)return false;
  if(f.max&&p.price>+f.max)return false;
  return true});
}
/* Obtiene opciones únicas para construir listas de filtros. */
const uniq=(fn)=>[...new Set(S.products.flatMap(fn))].sort();
/* Genera un selector HTML reutilizable para los filtros del catálogo. */
function sel(id,label,opts,val){return `<div><label>${label}</label><select data-f="${id}"><option value="">Todos</option>${opts.map(o=>`<option ${o===val?'selected':''}>${esc(o)}</option>`).join('')}</select></div>`}
/* Renderiza el listado de productos, panel de filtros y barra de comparación. */
function list(){
 const f=S.f,res=filtered();
 const chips=Object.keys(f).filter(k=>f[k]);
 return `<div class="crumb">Inicio › ${S.q?'Búsqueda':(S.cat||'Maquillaje')}</div><div class="layout"><aside class="filters"><h3 style="font-size:18px">Filtros</h3>
 ${sel('type','Tipo de producto',uniq(p=>[p.type]),f.type)}${sel('color','Color',uniq(p=>p.tones.map(t=>t.color)),f.color)}${sel('formula','Fórmula cosmética',uniq(p=>[p.formula]),f.formula)}${sel('skin','Tipo de piel',uniq(p=>[p.skin]),f.skin)}${sel('tone','Tonos',uniq(p=>p.tones.map(t=>t.n)),f.tone)}
 <div><label>Rango de precio</label><div class="row2"><input type="number" min="0" placeholder="Mín" data-f="min" value="${f.min||''}"><input type="number" min="0" placeholder="Máx" data-f="max" value="${f.max||''}"></div></div>
 <button class="btn out sm" id="clearf">Limpiar filtros</button></aside>
 <div><div class="toolbar"><h2 class="serif" style="font-size:26px">${S.q?'Resultados de «'+esc(S.q)+'»':(S.cat||'Maquillaje')}</h2></div>
 ${res.length?`<div class="grid">${res.map(p=>card(p,true)).join('')}</div>`:`<div class="empty">No se encontraron resultados</div>`}</div></div>`;
}
/* Actualiza la barra flotante con la cantidad de productos seleccionados. */
function renderCmpBar(){
 const b=$('#cmpbar');
 if(S.view!=='list'||!S.cmp.length){b.hidden=true;return}
 b.hidden=false;
 b.innerHTML=`<span>Has seleccionado ${S.cmp.length} de 4 productos</span><button class="btn" id="docmp" ${S.cmp.length<2?'disabled':''}>Comparar</button>`;
}

/* ---------- COMPARACIÓN DE PRODUCTOS ---------- */
/* Gestiona la selección de 2 a 4 productos y construye la tabla comparativa. */
/* Abre la tabla comparativa para los productos seleccionados. */
function openCompare(){
 const ps=S.cmp.map(P);
 const row=(l,fn)=>`<tr><td>${l}</td>${ps.map(p=>`<td>${fn(p)}</td>`).join('')}</tr>`;
 const m=$('#modal');m.hidden=false;
 m.innerHTML=`<div class="box"><div class="top"><h2 style="font-size:22px">Comparar productos (${ps.length}/4)</h2><a class="link" id="backlist">Volver al listado</a></div>
 <div style="overflow:auto"><table class="cmp-t"><tr><td></td>${ps.map(p=>`<td style="text-align:center"><div class="cw">${pic(p)}</div></td>`).join('')}</tr>
 ${row('Nombre',p=>`<a class="link" data-detail="${p.id}">${esc(p.name)}</a>`)}${row('Precio',p=>`<b>${money(p.price)}</b>`)}${row('Descripción',p=>esc(p.desc))}${row('Contenido',p=>p.content)}
 ${row('Tonos disponibles',p=>`<div class="dots">${p.tones.filter(t=>t.ok).map(t=>`<span class="dot" style="background:${t.hex}"></span>`).join('')}</div>`)}
 ${row('Disponibilidad',p=>avail(p)?'<span class="stock">En stock</span>':'<span class="stock no">Agotado</span>')}${row('Tipo de piel',p=>p.skin)}${row('Acabados',p=>p.finish)}${row('Fórmula cosmética',p=>p.formula)}${row('Beneficios',p=>esc(p.benefits))}
 <tr><td>Cantidad</td>${ps.map(p=>`<td>${avail(p)?`<div class="qty" data-cq="${p.id}"><button data-cm="-">−</button><span>1</span><button data-cm="+">+</button></div>
 ${p.tones.length>1?`<select data-ct="${p.id}" style="margin-top:6px">${p.tones.filter(t=>t.ok).map(t=>`<option>${t.n}</option>`).join('')}</select>`:''}
 <div style="margin-top:8px"><button class="btn sm" data-cadd="${p.id}">Agregar al carrito</button></div><div class="msg" id="cmsg${p.id}"></div>`:''}</td>`).join('')}</tr></table></div></div>`;
}
/* Cierra y limpia el contenido de la ventana modal. */
function closeModal(){$('#modal').hidden=true;$('#modal').innerHTML=''}

/* ---------- DETALLE DEL PRODUCTO ---------- */
/* Muestra la galería, descripción, tonos, stock y control de cantidad. */
/* Renderiza la ficha del producto y sus controles de galería, tonos y cantidad. */
function detail(){
 const p=P(S.arg);if(!p)return '<div class="wrap empty">No se encontraron resultados</div>';
  const selTone=S.tone||firstTone(p);
 const th=p.tones.find(t=>t.n===selTone);
 const imgs=photosOf(p).map((_,i)=>i),NI=imgs.length;
 return `<div class="crumb">Inicio › ${p.cat} › ${esc(p.name)}</div><div class="detail">
 <div class="thumbs">${imgs.map(i=>`<div class="${S.img===i?'on':''}" data-img="${i}">${pic(p,i)}</div>`).join('')}</div>
 <div class="gal"><button class="nav" style="left:10px" data-nav="-1">‹</button>${pic(p,S.img)}<button class="nav" style="right:10px" data-nav="1">›</button></div>
 <div><a class="link" data-go="${S.back||'/lista'}">← Volver al listado</a><h1 style="font-size:26px;margin:10px 0 4px">${esc(p.name)}</h1><div class="price" style="font-size:22px">${money(p.price)}</div>${stars(p)}
 <p style="margin:12px 0;color:var(--mut);line-height:1.5">${esc(p.desc)}</p>
 <div style="display:flex;justify-content:space-between;align-items:center"><b>Contenido: ${p.content}</b>${avail(p)?'<span class="stock">En stock</span>':'<span class="stock no">Agotado</span>'}</div>
 ${p.tones.length?`<div style="margin-top:12px"><b>Tonos disponibles:</b> <span style="color:var(--mut)">${esc(selTone||'')}</span><div class="tones">${p.tones.map(t=>`<span class="tone ${t.ok?'':'off'} ${t.n===selTone&&t.ok?'on':''}" title="${esc(t.n)}" style="background:${t.hex}" data-tone="${esc(t.n)}"></span>`).join('')}</div></div>`:''}
 <b>Cantidad:</b><div style="margin:6px 0 12px"><div class="qty"><button data-q="-">−</button><span>${S.qty}</span><button data-q="+">+</button></div></div>
 <div class="msg" id="dmsg"></div>
 <button class="btn full" id="dadd" ${avail(p)?'':'disabled'}>${avail(p)?'Agregar al carrito':'Agotado'}</button>
 <table class="info"><tbody>${[['Descripción',p.desc],['Contenido',p.content],['Tipo de piel',p.skin],['Acabados',p.finish],['Fórmula cosmética',p.formula],['Ingredientes',p.ingr],['Modo de uso',p.use],['Cuidados',p.care],['Beneficios',p.benefits]].map(([a,b])=>`<tr><th>${a}</th><td>${esc(b)}</td></tr>`).join('')}</tbody></table></div></div>`;
}

/* ---------- CARRITO DE COMPRAS ---------- */
/* Calcula subtotales y permite ajustar cantidades o eliminar productos. */
/* Dibuja el contenido del carrito, los controles de cantidad y los totales. */
function cart(){
 if(!S.cart.length)return `<div class="wrap"><h2 class="serif" style="font-size:28px;margin-bottom:16px">Tu carrito de compras</h2><div class="empty">El carrito está vacío</div><p style="margin-top:14px"><a class="link" data-go="/lista">Continuar comprando</a></p></div>`;
 return `<div class="wrap"><h2 class="serif" style="font-size:28px;margin-bottom:10px">Tu carrito de compras</h2>
 ${S.cart.map((i,ix)=>{const p=P(i.pid),t=p.tones.find(x=>x.n===i.tone);return `<div class="cartrow"><div class="th">${pic(p,0)}</div><div><b>${esc(p.name)}</b>${i.tone?`<br><small style="color:var(--mut)">Tono: ${esc(i.tone)}</small>`:''}<br><small style="color:var(--mut)">Precio unitario: ${money(p.price)}</small></div>
 <div class="qty"><button data-cq2="${ix}" data-d="-1">−</button><span>${i.qty}</span><button data-cq2="${ix}" data-d="1">+</button></div><div><small style="color:var(--mut)">Subtotal</small><br><b>${money(lineTotal(i))}</b></div><button data-del="${ix}" title="Eliminar">🗑</button></div>`}).join('')}
 <div class="msg" id="cmsgx"></div>
 <div class="sum"><div class="tot"><span>Total general</span><span>${money(subtotal())}</span></div></div>
 <div style="display:flex;gap:12px;margin-top:18px;justify-content:space-between;flex-wrap:wrap"><button class="btn out" data-go="/lista">Continuar comprando</button><button class="btn" data-go="/compra">Continuar con la compra</button></div></div>`;
}

/* ---------- PROCESO DE COMPRA ---------- */
/* Valida datos de cliente y entrega y simula el pago antes de registrar el pedido. */
/* Devuelve el objeto que almacena temporalmente los datos del checkout. */
const co=()=>S.co;
/* Construye un campo del formulario y muestra su posible error de validación. */
function fld(id,label,type='text',extra=''){const e=S.err[id];return `<div class="fld ${e?'err':''}"><label>${label}</label>${type==='area'?`<textarea data-co="${id}" rows="2">${esc(co()[id]||'')}</textarea>`:`<input type="${type}" data-co="${id}" value="${esc(co()[id]||'')}" ${extra}>`}${e?`<div class="e">${e}</div>`:''}</div>`}
const REQ_ALL=['nombre','tel','doc','mail','depto','muni','barrio','dir','recibe'];
/* Verifica que los campos obligatorios de compra estén completos. */
const formDone=()=>REQ_ALL.every(k=>(S.co[k]||'').trim());
/* Construye el contenedor del resumen de compra. */
function summary(){return `<div class="box2" id="sumbox">${sumInner()}</div>`}
/* Calcula y dibuja líneas de productos, envío y total de compra. */
function sumInner(){const ship=S.step>=2||formDone();return `<h3 style="font-size:18px;margin-bottom:10px">Resumen de compra</h3>${S.cart.map(i=>{const p=P(i.pid);return `<div style="display:flex;justify-content:space-between;padding:5px 0"><span>${esc(p.name)} x${i.qty}</span><span>${money(lineTotal(i))}</span></div>`}).join('')}
 <div class="sum" style="margin-left:0;max-width:none"><div><span>Subtotal</span><span>${money(subtotal())}</span></div>${ship?`<div><span>Envío (fijo)</span><span>${money(SHIP)}</span></div><div class="tot"><span>Total a pagar</span><span>${money(subtotal()+SHIP)}</span></div>`:''}</div>`}
/* Renderiza los pasos de datos, entrega, pago y confirmación del pedido. */
function checkout(){
 if(!S.cart.length&&S.step!==3)return cart();
 const st=['Datos personales','Envío','Pago','Confirmación'];
 const lvl=S.step===1?1:S.step===2?2:3;const head=`<div class="steps">${st.map((s,i)=>`<span class="${i<=lvl?'on':''} ${i===lvl?'cur':''}"><b>${i+1}</b> ${s}</span>`).join('')}</div>`;
 if(S.step===3){ // confirmación
  const o=S.orders.find(x=>x.id===S.lastOrder);
  return `<div class="wrap"><h2 class="serif" style="font-size:28px;margin-bottom:12px">Compra confirmada</h2><div class="box2"><p><b>Pedido #${o.id}</b> — Estado: ${o.status}</p><h3 style="margin:14px 0 6px;font-size:17px">Información de entrega</h3>
  <p>${esc(o.ship.recibe)}<br>${esc(o.ship.dir)}, ${esc(o.ship.barrio)}<br>${esc(o.ship.muni)}, ${esc(o.ship.depto)}${o.ship.info?'<br>'+esc(o.ship.info):''}</p></div><button class="btn" style="margin-top:16px" id="tohome">Volver al inicio</button></div>`;
 }
 if(S.step===2){
  const m=S.pm;
  return `<div class="wrap">${head}<div class="co"><div class="box2"><h3 style="margin-bottom:12px">Método de pago</h3>
  <div class="pay"><label><input type="radio" name="pm" value="Tarjeta de crédito" ${m==='Tarjeta de crédito'?'checked':''}> Tarjeta de crédito</label><label><input type="radio" name="pm" value="Tarjeta débito" ${m==='Tarjeta débito'?'checked':''}> Tarjeta débito</label></div>
  ${S.payErr?`<div class="msg" style="margin-bottom:10px">${S.payErr}</div>`:''}
  ${m?`${fld('card','Número de tarjeta','text','inputmode="numeric" maxlength="19"')}<div class="row2">${fld('exp','Fecha de vencimiento (MM/AA)','text','maxlength="5"')}${fld('cvv','CVV','text','maxlength="4"')}</div>${fld('holder','Nombre del titular')}<button class="btn full" id="pay">Pagar</button>`:''}
  <p style="margin-top:12px"><a class="link" id="backco">Volver</a></p></div>${summary()}</div></div>`;
 }
 return `<div class="wrap">${head}<div class="co"><div class="box2"><h3 style="margin-bottom:12px">Información personal</h3>
 ${fld('nombre','Nombre completo')}${fld('tel','Teléfono','tel')}${fld('doc','Documento')}${fld('mail','Correo electrónico','email')}
 <h3 style="margin:16px 0 12px">Dirección de entrega</h3>
 <div class="fld ${S.err.depto?'err':''}"><label>Departamento</label><select data-co="depto"><option value="">Seleccionar</option>${DEPTS.map(d=>`<option ${co().depto===d?'selected':''}>${d}</option>`).join('')}</select>${S.err.depto?`<div class="e">${S.err.depto}</div>`:''}</div>
 ${fld('muni','Municipio')}${fld('barrio','Barrio')}${fld('dir','Dirección de casa')}${fld('info','Información adicional','area')}${fld('recibe','Nombre de quien recibe')}
 <button class="btn full" id="topay">Continuar al pago</button><p style="margin-top:12px"><a class="link" data-go="/carrito">Volver al carrito</a></p></div>${summary()}</div></div>`;
}

/* ---------- ADMINISTRACIÓN ---------- */
/* Incluye acceso de demostración, catálogo, inventario y gestión de pedidos. */
/* Comprueba la sesión administrativa temporal del navegador. */
const isAdmin=()=>{try{return sessionStorage.getItem('jdiAdmin')==='1'}catch(e){return S.adm===1}};
/* Muestra el formulario de acceso de demostración al panel administrativo. */
function login(){return `<div class="login"><form id="lform" class="lbox"><div class="logo" style="text-align:center;margin-bottom:6px">JDI<small style="text-align:center">BEAUTY</small></div><h2 style="text-align:center;font-size:22px;margin:8px 0 16px">Panel de administración</h2>
 <div class="fld"><label>Usuario</label><input id="lu" autocomplete="username" autofocus></div><div class="fld"><label>Contraseña</label><input id="lp" type="password" autocomplete="current-password"></div>
 <div class="msg" id="lerr" style="margin:0 0 10px">${S.loginErr?'Usuario o contraseña incorrectos':''}</div><button class="btn full">Iniciar sesión</button><p style="text-align:center;margin-top:14px"><a class="link" data-go="/">Volver a la tienda</a></p></form></div>`}
/* Genera el marco común del panel administrativo y su navegación. */
function adminShell(inner,on){
 return `<div class="admin"><aside class="side"><div class="logo" style="font-size:26px" data-go="/">JDI<small>BEAUTY</small></div><small style="color:var(--mut);margin:6px 4px">Panel de administración</small>
 <a data-go="/admin/catalogo" class="${on==='cat'?'on':''}">Catálogo</a><a data-go="/admin/pedidos" class="${on==='ped'?'on':''}">Pedidos</a><a data-go="/admin/inventario" class="${on==='inv'?'on':''}">Inventario</a><a id="logout" style="margin-top:auto">Cerrar sesión</a></aside><div class="main">${inner}</div></div>`;
}
/* Muestra visualmente si el producto está disponible o agotado. */
function stockBadge(p){return avail(p)?'<span class="stock">En stock</span>':'<span class="stock no">Agotado</span>'}
/* Renderiza la tabla de catálogo y las acciones de crear o editar productos. */
function adminCat(){
 return adminShell(`<div class="bar" style="justify-content:space-between"><h2 class="serif" style="font-size:24px;flex:1">Catálogo de productos</h2><button class="btn" id="newp">Agregar producto</button></div>
 <table><tr><th>Imagen</th><th>Nombre</th><th>Categoría</th><th>Precio</th><th>Disponibilidad</th><th>Acciones</th></tr>
 ${S.products.map(p=>`<tr><td><div class="thumbimg">${pic(p)}</div></td><td>${esc(p.name)}</td><td>${p.cat}</td><td>${money(p.price)}</td><td>${stockBadge(p)}</td><td><button class="btn sm out" data-edit="${p.id}">Editar</button></td></tr>`).join('')}</table>`,'cat');
}
/* Construye una fila editable para configurar un tono en el formulario de producto. */
function toneRow(t={}){return `<div class="trow"><input class="tn" placeholder="Nombre del tono" value="${esc(t.n||'')}"><input class="tc" type="color" value="${t.hex||'#d9ab94'}"><label class="chk"><input class="to" type="checkbox" ${t.ok===false?'':'checked'}> Disponible</label><button type="button" class="btn sm out" data-rmtone>Quitar</button></div>`}
/* Abre el formulario de creación o edición de los datos de un producto. */
function prodForm(p){
 const n=!p;p=p||{name:'',cat:'',type:'',price:'',content:'',desc:'',tones:[],skin:'',finish:'',formula:'',ingr:'',use:'',care:'',benefits:'',stock:0};
 const i=(id,l,v,t='text')=>`<div class="fld"><label>${l}</label><input id="pf_${id}" type="${t}" value="${esc(v)}"></div>`;
 const a=(id,l,v)=>`<div class="fld full"><label>${l}</label><textarea id="pf_${id}" rows="2">${esc(v)}</textarea></div>`;
 const m=$('#modal');m.hidden=false;
 m.innerHTML=`<div class="box" style="max-width:780px"><div class="top"><h2 style="font-size:22px">${n?'Agregar producto':'Editar producto'}</h2><a class="link" id="closem">Cerrar</a></div>
 <h3 class="fh">Información general</h3><div class="form-grid">${i('name','Nombre *',p.name)}<div class="fld"><label>Categoría *</label><select id="pf_cat"><option value="">Seleccionar</option>${CATS.map(c=>`<option ${p.cat===c?'selected':''}>${c}</option>`).join('')}</select></div>${i('type','Tipo de producto',p.type)}${i('price','Precio *',p.price,'number')}${i('content','Contenido',p.content)}</div>
 <h3 class="fh">Descripción</h3><div class="form-grid">${a('desc','Descripción',p.desc)}</div>
 <h3 class="fh">Tonos disponibles</h3><div id="trows">${p.tones.map(toneRow).join('')}</div><button type="button" class="btn sm out" id="addtone" style="margin:6px 0 10px">+ Agregar tono</button>
 <h3 class="fh">Características</h3><div class="form-grid">${i('skin','Tipo de piel recomendado',p.skin)}${i('finish','Acabado',p.finish)}${i('formula','Fórmula cosmética',p.formula)}</div>
 <h3 class="fh">Detalles</h3><div class="form-grid">${a('ingr','Ingredientes',p.ingr)}${a('use','Modo de uso',p.use)}${a('care','Cuidados',p.care)}${a('benefits','Beneficios',p.benefits)}</div>
 <h3 class="fh">Fotos del producto</h3><div class="fld"><input type="file" id="pf_photos" accept="image/*" multiple>${p.photos&&p.photos.length?`<small style="color:var(--mut)">${p.photos.length} foto(s) cargada(s). Si seleccionas nuevas, reemplazan a las actuales.</small>`:''}</div>
 <h3 class="fh">Disponibilidad</h3><div class="form-grid">${i('stock','Unidades disponibles',p.stock,'number')}</div>
 <div class="msg" id="pf_err"></div><button class="btn" id="savep" data-id="${n?'':p.id}">${n?'Confirmar':'Guardar cambios'}</button></div>`;
}
/* Valida y guarda los cambios de catálogo en el estado y almacenamiento local. */
function saveProd(id){
 const v=k=>$('#pf_'+k).value.trim();
 if(!v('name')||!v('price')||!v('cat')){$('#pf_err').textContent='Los campos obligatorios (nombre, precio y categoría) deben estar diligenciados';return}
 const tones=[...document.querySelectorAll('#trows .trow')].map(r=>({n:r.querySelector('.tn').value.trim(),hex:r.querySelector('.tc').value,ok:r.querySelector('.to').checked})).filter(t=>t.n).map(t=>({...t,color:t.n}));
 const kindMap={Rostro:'base',Labios:'labial',Ojos:'mascara',Paletas:'paleta'};
 const data={name:v('name'),cat:v('cat'),type:v('type'),price:+v('price'),content:v('content'),desc:v('desc'),skin:v('skin'),finish:v('finish'),formula:v('formula'),ingr:v('ingr'),use:v('use'),care:v('care'),benefits:v('benefits'),stock:Math.max(0,+v('stock')||0),tones};
 const fl=[...$('#pf_photos').files];
 const fin=(photos)=>{let p;
  if(id){p=P(id);Object.assign(p,data)}else{p={id:Math.max(0,...S.products.map(x=>x.id))+1,brand:'JDI Beauty',kind:kindMap[data.cat],rating:0,rv:0,...data};S.products.push(p)}
  if(photos&&photos.length)p.photos=photos;save();closeModal();render()};
 if(!fl.length)return fin();
 Promise.all(fl.map(f=>new Promise(r=>{const fr=new FileReader();fr.onload=()=>r(fr.result);fr.readAsDataURL(f)}))).then(fin);
}
/* Renderiza el inventario, búsqueda, filtro por categoría y edición de stock. */
function adminInv(){
 const f=S.ifil;const ps=S.products.filter(p=>(!f.cat||p.cat===f.cat)&&(!f.q||p.name.toLowerCase().includes(f.q.toLowerCase())));
 return adminShell(`<h2 class="serif" style="font-size:24px;margin-bottom:12px">Control de inventario</h2>
 <div class="bar"><input id="iq" placeholder="Buscar producto..." value="${esc(f.q)}"><select id="icat"><option value="">Categoría</option>${CATS.map(c=>`<option ${f.cat===c?'selected':''}>${c}</option>`).join('')}</select><button class="btn" id="isearch">Buscar</button></div>
 <table><tr><th>Producto</th><th>Categoría</th><th>Stock actual</th><th>Estado</th><th>Nueva cantidad</th><th>Guardar</th></tr>
 ${ps.map(p=>`<tr><td>${esc(p.name)}</td><td>${p.cat}</td><td>${p.stock}</td><td>${avail(p)?'<span class="stock">En stock</span>':'<span class="stock no">Agotado</span>'}</td><td><input id="inv${p.id}" value="${p.stock}" style="width:90px"><div class="msg" id="invm${p.id}"></div></td><td><button class="btn sm" data-inv="${p.id}">Guardar</button></td></tr>`).join('')}</table>`,'inv');
}
/* Muestra el listado de pedidos y sus filtros administrativos. */
function adminPed(){
 const f=S.ofil;let os=[...S.orders].sort((a,b)=>b.date.localeCompare(a.date)||b.id-a.id);
 os=os.filter(o=>(!f.st||o.status===f.st)&&(!f.d||o.date===f.d)&&(!f.c||o.client.toLowerCase().includes(f.c.toLowerCase())));
 const tot=o=>o.items.reduce((a,i)=>a+P(i.pid).price*i.qty,0)+SHIP;
 return adminShell(`<h2 class="serif" style="font-size:24px;margin-bottom:12px">Gestión de pedidos</h2>
 <div class="bar"><select id="ost"><option value="">Estado</option>${STATES.map(s=>`<option ${f.st===s?'selected':''}>${s}</option>`).join('')}</select><input type="date" id="od" value="${f.d||''}"><input id="oc" placeholder="Buscar por cliente" value="${esc(f.c||'')}"><button class="btn" id="ofilter">Filtrar</button><button class="btn out" id="oclear">Limpiar filtros</button></div>
 ${os.length?`<table><tr><th>N° Pedido</th><th>Cliente</th><th>Fecha</th><th>Total</th><th>Estado</th></tr>${os.map(o=>`<tr class="click" data-ord="${o.id}"><td>#${o.id}</td><td>${esc(o.client)}</td><td>${o.date}</td><td>${money(tot(o))}</td><td><span class="pill">${o.status}</span></td></tr>`).join('')}</table>`:'<div class="empty">No se encontraron resultados</div>'}`,'ped');
}
/* Muestra el detalle de un pedido y permite actualizar su estado. */
function adminOrd(){
 const o=S.orders.find(x=>x.id==S.oid);if(!o)return adminPed();
 const sub=o.items.reduce((a,i)=>a+P(i.pid).price*i.qty,0);
 return adminShell(`<a class="link" id="backord">Volver al listado</a><h2 class="serif" style="font-size:24px;margin:10px 0">Pedido #${o.id} <span class="pill" style="font-family:Inter;font-size:12px;vertical-align:middle">${o.status}</span></h2><p style="color:var(--mut);margin-bottom:12px">Fecha: ${o.date} · Cliente: ${esc(o.client)}</p>
 <table><tr><th>Foto</th><th>Producto</th><th>Tono</th><th>Cantidad</th></tr>${o.items.map(i=>{const p=P(i.pid),t=p.tones.find(x=>x.n===i.tone);return `<tr><td><div class="thumbimg">${pic(p,0)}</div></td><td>${esc(p.name)}</td><td>${esc(i.tone||'—')}</td><td>${i.qty}</td></tr>`}).join('')}</table>
 <div class="sum" style="margin-left:0"><div><span>Subtotal</span><span>${money(sub)}</span></div><div><span>Envío (fijo)</span><span>${money(SHIP)}</span></div><div class="tot"><span>Valor de la compra</span><span>${money(sub+SHIP)}</span></div></div>
 <div class="box2" style="margin:16px 0"><b>Datos de envío</b><p style="margin-top:6px;line-height:1.6">${esc(o.client)}<br>Recibe: ${esc(o.ship.recibe)}<br>${esc(o.ship.dir)}, ${esc(o.ship.barrio)}<br>${esc(o.ship.muni)}, ${esc(o.ship.depto)}${o.ship.info?'<br>'+esc(o.ship.info):''}</p></div>
 <div class="fld" style="max-width:300px"><label>Estado del pedido</label><select id="ostate">${STATES.map(s=>`<option ${o.status===s?'selected':''}>${s}</option>`).join('')}</select></div>
 <button class="btn" id="osave">Guardar cambios</button>`,'ped');
}

/* ---------- ENRUTADOR DE VISTAS ---------- */
/* Interpreta location.hash y determina qué vista debe mostrarse. */
/* Interpreta la URL para elegir la vista y reiniciar los datos temporales necesarios. */
function route(){
 const h=location.hash.replace(/^#/,'')||'/';const [path,qs]=h.split('?');const seg=path.split('/').filter(Boolean);
 const prev=S.view;
 S.q=new URLSearchParams(qs||'').get('q')||'';S.cat='';
 if(!seg.length)S.view='home';
 else if(seg[0]==='lista'){S.view='list';S.cat=decodeURIComponent(seg[1]||'');if(prev!=='list'||S.lastCat!==S.cat+S.q){S.f={};S.cmp=[]}S.lastCat=S.cat+S.q;S.back=h}
 else if(seg[0]==='producto'){S.view='detail';S.arg=seg[1];S.tone=null;S.qty=1;S.img=0}
 else if(seg[0]==='carrito')S.view='cart';
 else if(seg[0]==='compra'){S.view='checkout';if(prev!=='checkout'){S.step=1;S.err={};S.deliv=false}}
 else if(seg[0]==='admin'){S.view=isAdmin()?'admin-'+(seg[1]||'catalogo'):'admin-login';S.oid=seg[2]||null}
 else S.view='home';
 closeModal();render();window.scrollTo(0,0);
}
/* Inserta la vista actual en #app y actualiza encabezado y comparación. */
function render(){
 const v=S.view;
 renderHeader();
 $('#app').innerHTML=v==='home'?home():v==='list'?list():v==='detail'?detail():v==='cart'?cart():v==='checkout'?checkout():
  v==='admin-login'?login():v==='admin-pedidos'?(S.oid?adminOrd():adminPed()):v==='admin-inventario'?adminInv():adminCat();
 renderCmpBar();
}

/* ---------- DELEGACIÓN DE EVENTOS ---------- */
/* Los listeners globales gestionan acciones de botones, formularios y cambios. */
document.addEventListener('click',e=>{
 const t=e.target;const c=(s)=>t.closest(s);
 let x;
 if(x=c('[data-go]')){go(x.dataset.go);return}
 if(x=c('[data-detail]')){closeModal();go('/producto/'+x.dataset.detail);return}
 if(c('#backlist')){S.cmp=[];closeModal();render();return}
 if(c('#closem')){closeModal();return}
 if(c('#clearf')){S.f={};render();return}
 if(c('#docmp')){openCompare();return}
 if(x=c('[data-add]')){addToCart(x.dataset.add,curTone(P(x.dataset.add)),1);return}
 if(x=c('[data-ctone]')){const [id,n]=x.dataset.ctone.split('|');if(toneOk(P(id),n)){S.ct[id]=n;render()}return}
 if(x=c('[data-car]')){const r=$('#car');r.scrollBy({left:+x.dataset.car*r.clientWidth*.8,behavior:'smooth'});return}
 if(x=c('[data-cm]')){const q=x.parentElement,id=q.dataset.cq,p=P(id),sp=q.querySelector('span');let n=+sp.textContent+(x.dataset.cm==='+'?1:-1);const m=$('#cmsg'+id);m.textContent='';
  if(n<1)n=1;if(n>p.stock){n=p.stock;m.textContent='Stock restante: '+p.stock}sp.textContent=n;return}
 if(x=c('[data-cadd]')){const id=x.dataset.cadd,p=P(id),q=+$(`[data-cq="${id}"] span`).textContent,se=$(`[data-ct="${id}"]`);addToCart(id,se?se.value:firstTone(p),q);return}
 if(x=c('[data-img]')){S.img=+x.dataset.img;render();return}
 if(x=c('[data-nav]')){const n=photosOf(P(S.arg)).length;S.img=(S.img+ +x.dataset.nav+n)%n;render();return}
 if(x=c('[data-tone]')){const p=P(S.arg),tt=p.tones.find(z=>z.n===x.dataset.tone);if(tt&&tt.ok){S.tone=tt.n;render()}return}
 if(x=c('[data-q]')){const p=P(S.arg);let n=S.qty+(x.dataset.q==='+'?1:-1);if(n<1)n=1;render();
  if(n>p.stock){n=p.stock;S.qty=n;render();$('#dmsg').textContent='Stock restante: '+p.stock}else{S.qty=n;render()}return}
 if(c('#dadd')){const p=P(S.arg);addToCart(p.id,S.tone||firstTone(p),S.qty);return}
 if(x=c('[data-cq2]')){const i=S.cart[x.dataset.cq2],p=P(i.pid),n=i.qty+ +x.dataset.d;
  if(n<=0)S.cart.splice(x.dataset.cq2,1);else if(n>p.stock){i.qty=p.stock;save();render();$('#cmsgx').textContent='Cantidad máxima disponible: '+p.stock;return}else i.qty=n;
  save();render();return}
 if(x=c('[data-del]')){S.cart.splice(x.dataset.del,1);save();render();return}
 if(c('#topay')){const req={nombre:'Nombre completo',tel:'Teléfono',doc:'Documento',mail:'Correo electrónico',depto:'Departamento',muni:'Municipio',barrio:'Barrio',dir:'Dirección de casa',recibe:'Nombre de quien recibe'};
  S.err={};for(const k in req)if(!(co()[k]||'').trim())S.err[k]='Campo obligatorio';
  if(Object.keys(S.err).length){render();return}S.step=2;S.payErr='';render();return}
 if(c('#backco')){S.step=1;render();return}
 if(c('#pay')){const req={card:'Número de tarjeta',exp:'Fecha de vencimiento',cvv:'CVV',holder:'Nombre del titular'};S.err={};
  for(const k in req)if(!(co()[k]||'').trim())S.err[k]='Campo obligatorio';
  const cd=(co().card||'').replace(/\s/g,'');
  if(!S.err.card&&!/^\d{13,19}$/.test(cd))S.err.card='Formato inválido';
  if(!S.err.exp&&!/^(0[1-9]|1[0-2])\/\d{2}$/.test(co().exp))S.err.exp='Formato inválido';
  if(!S.err.cvv&&!/^\d{3,4}$/.test(co().cvv))S.err.cvv='Formato inválido';
  if(Object.keys(S.err).length){render();return}
  if(cd.endsWith('0000')){S.payErr='Pago rechazado. Puede intentar con otro método de pago.';S.pm=null;render();return}
  const id=Math.max(1000,...S.orders.map(o=>o.id))+1;const c0=co();
  S.orders.push({id,date:new Date().toISOString().slice(0,10),client:c0.nombre,items:S.cart.map(i=>({...i})),ship:{nombre:c0.nombre,depto:c0.depto,muni:c0.muni,barrio:c0.barrio,dir:c0.dir,info:c0.info||'',recibe:c0.recibe},status:'Recibido'});
  S.cart=[];S.lastOrder=id;S.step=3;S.co={...c0,card:'',exp:'',cvv:'',holder:''};save();render();return}
 if(c('#tohome')){S.step=1;go('/');return}
 /* admin */
 if(c('#logout')){try{sessionStorage.removeItem('jdiAdmin')}catch(e){}S.adm=0;go('/');return}
 if(c('#newp')){prodForm();return}
 if(x=c('[data-edit]')){prodForm(P(x.dataset.edit));return}
 if(x=c('#savep')){saveProd(x.dataset.id);return}
 if(c('#addtone')){$('#trows').insertAdjacentHTML('beforeend',toneRow());return}
 if(x=c('[data-rmtone]')){x.closest('.trow').remove();return}
 if(x=c('[data-inv]')){const id=x.dataset.inv,v=$('#inv'+id).value.trim();
  if(!/^\d+$/.test(v)){$('#invm'+id).textContent='Cantidad inválida';return}
  P(id).stock=+v;save();render();return}
 if(c('#isearch')){S.ifil={q:$('#iq').value,cat:$('#icat').value};render();return}
 if(c('#ofilter')){S.ofil={st:$('#ost').value,d:$('#od').value,c:$('#oc').value};render();return}
 if(c('#oclear')){S.ofil={};render();return}
 if(x=c('[data-ord]')){go('/admin/pedidos/'+x.dataset.ord);return}
 if(c('#backord')){go('/admin/pedidos');return}
 if(c('#osave')){const o=S.orders.find(z=>z.id==S.oid),v=$('#ostate').value;
  if(v===o.status){toast('El estado no ha cambiado');return}o.status=v;save();render();toast('Estado del pedido actualizado');return}
});
document.addEventListener('change',e=>{
 const t=e.target;
 if(t.dataset.f!==undefined){S.f[t.dataset.f]=t.value;render();return}
 if(t.dataset.cmp){const id=+t.dataset.cmp;
  if(t.checked){if(S.cmp.length>=4){t.checked=false;toast('Máximo 4 productos para comparar');return}S.cmp.push(id)}else S.cmp=S.cmp.filter(z=>z!==id);
  renderCmpBar();return}
 if(t.name==='pm'){S.pm=t.value;S.payErr='';render();return}
 if(t.id==='pf_photos'){/* fotos cargadas en el formulario */}
});
document.addEventListener('input',e=>{const t=e.target;if(t.dataset.co){S.co[t.dataset.co]=t.value;if(S.err[t.dataset.co]){delete S.err[t.dataset.co];const f=t.closest('.fld');if(f){f.classList.remove('err');const er=f.querySelector('.e');if(er)er.remove()}}const b=$('#sumbox');if(b&&S.view==='checkout')b.innerHTML=sumInner()}});
document.addEventListener('change',e=>{const t=e.target;if(t.dataset&&t.dataset.co==='depto'){S.co.depto=t.value;const b=$('#sumbox');if(b)b.innerHTML=sumInner()}});
document.addEventListener('submit',e=>{
 if(e.target.id==='lform'){e.preventDefault();const u=$('#lu').value.trim().toLowerCase(),p=$('#lp').value;
  if((u==='jdi'||u==='jid')&&p==='1234'){S.loginErr=false;S.adm=1;try{sessionStorage.setItem('jdiAdmin','1')}catch(e){}if(!/admin\//.test(location.hash))location.hash='/admin/catalogo';else route();}
  else{S.loginErr=true;render()}return}
 if(e.target.id==='sform'){e.preventDefault();const q=$('#sq').value.trim();go('/lista'+(q?'?q='+encodeURIComponent(q):''))}});
window.addEventListener('hashchange',route);
route();
