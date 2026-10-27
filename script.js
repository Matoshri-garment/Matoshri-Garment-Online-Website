const STORE_PHONE = "917218236483";
const ADMIN_DEMO_PASSWORD = "change-me-123";
const FALLBACK_IMAGE = "images/product-01.jpg";
// Product photos are unique and numbered in the same order as this catalog.
const defaultProducts = [
 {id:"p1",name:"Red Peplum Top",category:"Tops",originalPrice:599,price:449,colors:["Red","Black","Wine","Pink"],sizes:["S","M","L","XL"],image:"images/product-01.jpg",description:"A bright red peplum-style top for casual outings.",tag:"25% OFF"},
 {id:"p2",name:"Mauve Embroidered Top",category:"Tops",originalPrice:799,price:599,colors:["Mauve","Pink","Black","Wine"],sizes:["S","M","L","XL"],image:"images/product-02.jpg",description:"A mauve top with delicate embroidery and flared sleeves.",tag:"25% OFF"},
 {id:"p3",name:"Ivory Embroidered Shirt",category:"Tops",originalPrice:999,price:749,colors:["Ivory","White","Pink","Black"],sizes:["S","M","L","XL"],image:"images/product-03.jpg",description:"An ivory shirt with floral embroidery for a smart casual look.",tag:"25% OFF"},
 {id:"p4",name:"Mauve Button-Front Shirt",category:"Tops",originalPrice:999,price:749,colors:["Mauve","Pink","Blue","Black"],sizes:["S","M","L","XL"],image:"images/product-04.jpg",description:"A relaxed mauve button-front shirt, perfect with jeans.",tag:"25% OFF"},
 {id:"p5",name:"Olive Floral Shirt",category:"Tops",originalPrice:999,price:749,colors:["Olive Green","Black","Wine","Ivory"],sizes:["S","M","L","XL"],image:"images/product-05.jpg",description:"An olive green shirt with floral embroidery.",tag:"25% OFF"},
 {id:"p6",name:"Black Floral T-Shirt",category:"T-Shirts",originalPrice:499,price:374,colors:["Black","White","Blue","Pink"],sizes:["S","M","L","XL","XXL"],image:"images/product-06.jpg",description:"A black T-shirt with white floral details for everyday wear.",tag:"25% OFF"},
 {id:"p7",name:"Teal Printed Kurti",category:"Kurtis",originalPrice:899,price:674,colors:["Teal","Green","Wine","Black"],sizes:["S","M","L","XL","XXL"],image:"images/product-07.jpg",description:"A teal printed kurti with traditional motifs for everyday outings.",tag:"25% OFF"},
 {id:"p8",name:"Blue Printed Office Kurti",category:"Office Wear",originalPrice:899,price:674,colors:["Blue","Black","Wine","Pink"],sizes:["S","M","L","XL","XXL"],image:"images/product-08.jpg",description:"A blue printed kurti suitable for workdays and smart casual outings.",tag:"25% OFF"},
 {id:"p9",name:"Red Printed Party Tunic",category:"Party Wear",originalPrice:799,price:599,colors:["Red","Black","Wine","Pink"],sizes:["S","M","L","XL","XXL"],image:"images/product-09.jpg",description:"A red printed flared tunic for parties and festive occasions.",tag:"25% OFF"},
 {id:"p10",name:"Black Embroidered Anarkali Suit",category:"Anarkali",originalPrice:1799,price:1349,colors:["Black","White","Blue","Pink"],sizes:["S","M","L","XL","XXL"],image:"images/product-10.jpg",description:"A black Anarkali suit with elegant detailing for celebrations.",tag:"25% OFF"},
 {id:"p11",name:"Women's Wide-Leg Jeans",category:"Jeans",originalPrice:1199,price:899,colors:["Blue","Black","Grey","White"],sizes:["28","30","32","34","36","38"],image:"images/product-11.jpg",description:"Comfortable wide-leg denim jeans for everyday outfits.",tag:"25% OFF"},
 {id:"p12",name:"Sweatshirt and Jogger Set",category:"T-Shirts",originalPrice:899,price:674,colors:["Ivory","Black","Grey","Pink"],sizes:["S","M","L","XL"],image:"images/product-12.jpg",description:"A coordinated sweatshirt and jogger set for relaxed days.",tag:"25% OFF"}
];
const COLOR_HEX = {"Dusty Pink":"#b78291","Olive Green":"#666744","Black":"#222222","Blue":"#527ba7","Red":"#b52235","Wine":"#702b45","Ivory":"#eee5d7","Teal":"#176c69","Mint Green":"#b8d7a0","White":"#ffffff","Pink":"#e8a4b6","Purple":"#8f57be","Grey":"#8c8c8c","Yellow":"#e4c64d","Mustard":"#bd8d28","Navy Blue":"#182b50"};
const COLOR_FILTER = {"Red":"none","Black":"brightness(.58) saturate(.8)","Wine":"hue-rotate(315deg) saturate(1.25)","Pink":"hue-rotate(305deg) saturate(.75) brightness(1.12)","Purple":"hue-rotate(265deg) saturate(1.15)","Mauve":"hue-rotate(300deg) saturate(.55) brightness(1.03)","Ivory":"grayscale(.35) brightness(1.25)","White":"grayscale(1) brightness(1.45)","Blue":"hue-rotate(175deg) saturate(1.15)","Grey":"grayscale(1) brightness(.88)","Teal":"hue-rotate(145deg) saturate(1.2)","Green":"hue-rotate(85deg) saturate(1.15)","Olive Green":"hue-rotate(65deg) saturate(.8)","Yellow":"hue-rotate(35deg) saturate(1.2)","Mustard":"hue-rotate(25deg) saturate(1.15)"};
function colourFilter(color){return COLOR_FILTER[color]||"none"}
// Local garment recolour preview. It preserves per-pixel light/shadow detail and
// targets dark/neutral pixels; without an AI segmentation service it cannot know
// every garment boundary, so complex photos may need a dedicated AI API.
const RECOLOR_RGB = {Pink:[232,105,157],Purple:[143,78,190],Red:[198,38,55],Blue:[63,112,205],Green:[54,145,84],Wine:[112,35,66],Black:[22,22,27],Grey:[130,130,135],White:[238,235,232],Yellow:[220,185,58]};
function recolorDarkGarment(img, color){
 const target=RECOLOR_RGB[color]; if(!target || !img.complete || !img.naturalWidth) return;
 try {
  const canvas=document.createElement("canvas"); const max=1400; const scale=Math.min(1,max/Math.max(img.naturalWidth,img.naturalHeight));
  canvas.width=Math.round(img.naturalWidth*scale); canvas.height=Math.round(img.naturalHeight*scale);
  const ctx=canvas.getContext("2d",{willReadFrequently:true}); ctx.drawImage(img,0,0,canvas.width,canvas.height);
  const frame=ctx.getImageData(0,0,canvas.width,canvas.height), d=frame.data;
  for(let i=0;i<d.length;i+=4){
   const r=d[i],g=d[i+1],b=d[i+2], hi=Math.max(r,g,b),lo=Math.min(r,g,b), lum=.299*r+.587*g+.114*b, sat=hi===0?0:(hi-lo)/hi;
   // Only recolour dark and neutral pixels, keeping the garment's original shading.
   // Soft threshold avoids hard colour edges; brighter background pixels are left alone.
   if(lum<158 && sat<.42){
    const darkness=Math.max(0,Math.min(1,(158-lum)/125));
    const blend=Math.max(0,Math.min(.96,.25+darkness*.70));
    const shade=Math.max(.30,Math.min(1.18,(lum/128)+.28));
    d[i]=Math.min(255, r*(1-blend)+target[0]*shade*blend);
    d[i+1]=Math.min(255, g*(1-blend)+target[1]*shade*blend);
    d[i+2]=Math.min(255, b*(1-blend)+target[2]*shade*blend);
   }
  }
  ctx.putImageData(frame,0,0); img.onload=null; img.src=canvas.toDataURL("image/jpeg",.95);
 } catch(err){ /* Keep original photo if pixel processing is unavailable. */ }
}
function applyDressColorPreview(){const img=$("detailProductImage");if(!img||!selectedProduct)return;const color=selectedColor;const src=imageFor(selectedProduct);img.onload=null;img.removeAttribute("style");img.onload=()=>recolorDarkGarment(img,color);img.src=src;if(img.complete&&img.naturalWidth)recolorDarkGarment(img,color)}
const $ = id => document.getElementById(id);
let products = loadProducts();
let cart = loadCart();
let activeCategory = "All";
let selectedProduct = null;
let selectedColor = "";
let selectedSize = "";
let toastTimer;

function cloneDefaults(){return defaultProducts.map(p=>({...p,colors:["Pink","Purple","Red","Blue"],sizes:[...p.sizes]}))}
function loadProducts(){try{const saved=localStorage.getItem("matoshri_products_v5");if(!saved)return cloneDefaults();const parsed=JSON.parse(saved);if(!Array.isArray(parsed))return cloneDefaults();return parsed.map(p=>({...p,colors:["Pink","Purple","Red","Blue"],image:p.image||FALLBACK_IMAGE}))}catch(e){return cloneDefaults()}}
function loadCart(){try{const saved=JSON.parse(localStorage.getItem("matoshri_cart")||"[]");return Array.isArray(saved)?saved:[]}catch(e){return []}}
function saveProducts(){try{localStorage.setItem("matoshri_products_v5",JSON.stringify(products))}catch(e){toast("Could not save products in this browser.")}}
function saveCart(){try{localStorage.setItem("matoshri_cart",JSON.stringify(cart))}catch(e){}renderCartCount()}
function safeText(value){return String(value??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]))}
function money(n){return "₹"+Number(n||0).toLocaleString("en-IN")}
function toast(message){const el=$("toast");if(!el)return;el.textContent=message;el.classList.remove("hidden");clearTimeout(toastTimer);toastTimer=setTimeout(()=>el.classList.add("hidden"),2800)}
function renderCartCount(){$("cartCount").textContent=cart.reduce((n,i)=>n+Number(i.qty||0),0)}
function imageFor(p){return p.image||FALLBACK_IMAGE}
function getFilters(){return {query:$("searchInput").value.trim().toLowerCase(),category:$("categoryFilter").value,color:$("colorFilter").value,price:Number($("priceFilter").value),sort:$("sortSelect").value}}
function renderProducts(){
 const f=getFilters();let list=products.filter(p=>(!f.query||(p.name+" "+p.category+" "+(p.description||"")).toLowerCase().includes(f.query))&&(f.category==="All"||p.category===f.category)&&(f.color==="All"||(p.colors||[]).includes(f.color))&&Number(p.price)<=f.price);
 if(f.sort==="low")list.sort((a,b)=>a.price-b.price);if(f.sort==="high")list.sort((a,b)=>b.price-a.price);if(f.sort==="name")list.sort((a,b)=>a.name.localeCompare(b.name));
 $("productGrid").innerHTML=list.map(p=>`<article class="product-card"><div class="product-image-wrap" data-view="${safeText(p.id)}"><img class="product-image" src="${safeText(imageFor(p))}" alt="${safeText(p.name)}" loading="lazy" onerror="this.onerror=null;this.src='${FALLBACK_IMAGE}'"><span class="product-tag">${safeText(p.tag||p.category)}</span><button class="quick-add" data-view="${safeText(p.id)}" type="button">View options +</button></div><div class="product-info"><div class="product-category">${safeText(p.category)}</div><h3 class="product-name">${safeText(p.name)}</h3><div class="price-row"><span class="price">${money(p.price)}</span><span class="old-price">${money(p.originalPrice||Math.round(p.price/0.75))}</span><span class="discount-label">25% OFF</span></div><div class="colour-count">${(p.colors||[]).length} colour option(s)</div><div class="swatches">${(p.colors||[]).slice(0,5).map(c=>`<span class="swatch" title="${safeText(c)}" style="background:${COLOR_HEX[c]||'#ccc'}"></span>`).join("")}</div></div></article>`).join("");
 $("emptyState").classList.toggle("hidden",list.length>0);
 $("priceValue").textContent=money(f.price);
}
function openProduct(id){const p=products.find(x=>x.id===id);if(!p)return;selectedProduct=p;selectedColor=(p.colors||[])[0]||"";selectedSize=(p.sizes||[])[0]||"";renderProductDetail();$("productOverlay").classList.remove("hidden")}
function renderProductDetail(){const p=selectedProduct;if(!p)return;$("productDetail").innerHTML=`<div class="detail-layout"><img id="detailProductImage" src="${safeText(imageFor(p))}" alt="${safeText(p.name)}" onerror="this.onerror=null;this.src='${FALLBACK_IMAGE}'"><div><p class="eyebrow">${safeText(p.category)}</p><h2>${safeText(p.name)}</h2><div class="detail-price">${money(p.price)} <del class="old-price">${money(p.originalPrice||Math.round(p.price/0.75))}</del> <span class="discount-label">25% OFF</span></div><p class="detail-description">${safeText(p.description||"A lovely addition to your wardrobe.")}</p><span class="option-label">Choose colour</span><div class="choice-row">${(p.colors||[]).map(c=>`<button type="button" class="choice color-choice ${c===selectedColor?"selected":""}" data-color="${safeText(c)}"><span class="color-dot" style="background:${COLOR_HEX[c]||'#ccc'}"></span>${safeText(c)}</button>`).join("")}</div><span class="option-label">Choose size</span><div class="choice-row">${(p.sizes||[]).map(s=>`<button type="button" class="choice ${s===selectedSize?"selected":""}" data-size="${safeText(s)}">${safeText(s)}</button>`).join("")}</div><button type="button" class="primary-button detail-add" id="addToCart">Add to bag — ${money(p.price)}</button><p class="tiny-note">Need help choosing? Order directly through WhatsApp at 72182 36483.</p></div></div>`;applyDressColorPreview()}
function addToCart(){if(!selectedProduct)return;const existing=cart.find(i=>i.id===selectedProduct.id&&i.color===selectedColor&&i.size===selectedSize);if(existing)existing.qty++;else cart.push({id:selectedProduct.id,name:selectedProduct.name,price:Number(selectedProduct.price),image:imageFor(selectedProduct),color:selectedColor,size:selectedSize,qty:1});saveCart();$("productOverlay").classList.add("hidden");toast("Added to your bag.")}
function renderCart(){const wrap=$("cartItems");if(!cart.length){wrap.innerHTML='<p class="muted">Your bag is empty. Explore the collection to add your favourites.</p>'}else{wrap.innerHTML=cart.map((i,index)=>`<div class="cart-line"><img src="${safeText(i.image||FALLBACK_IMAGE)}" alt=""><div><strong>${safeText(i.name)}</strong><p>${safeText(i.color)} · Size ${safeText(i.size)} · Qty ${Number(i.qty||0)}</p><button type="button" data-remove="${index}">Remove</button></div><b>${money(i.price*i.qty)}</b></div>`).join("")}const total=cart.reduce((s,i)=>s+Number(i.price)*Number(i.qty),0);$("cartTotal").textContent=money(total);$("checkoutOpen").disabled=!cart.length;$("checkoutOpen").style.opacity=cart.length?1:.5}
function openAdmin(){$("adminOverlay").classList.remove("hidden");$("adminLogin").classList.remove("hidden");$("adminDashboard").classList.add("hidden");$("adminLoginForm").reset()}
function renderAdminList(){$("adminProductList").innerHTML="<h3>Products ("+products.length+")</h3>"+products.map(p=>`<div class="admin-product-row"><div><strong>${safeText(p.name)}</strong><br><span>${money(p.price)} · ${safeText(p.category)}</span></div><div><button type="button" data-edit="${safeText(p.id)}">Edit</button> · <button type="button" data-delete="${safeText(p.id)}">Delete</button></div></div>`).join("")}
function resetProductForm(){$("productForm").reset();$("productForm").elements.id.value="";$("adminImagePreview").classList.add("hidden")}
function editProduct(id){const p=products.find(x=>x.id===id);if(!p)return;const f=$("productForm");f.elements.id.value=p.id;f.elements.name.value=p.name;f.elements.category.value=p.category;f.elements.price.value=p.price;f.elements.colors.value=(p.colors||[]).join(", ");f.elements.sizes.value=(p.sizes||[]).join(", ");f.elements.image.value=(p.image&&p.image.startsWith("data:"))?p.image:(p.image||"");f.elements.imageFile.value="";const preview=$("adminImagePreview");if(p.image){preview.src=p.image;preview.classList.remove("hidden")}else preview.classList.add("hidden");f.elements.description.value=p.description||"";f.scrollIntoView({behavior:"smooth",block:"start"})}
function orderText(data){const lines=cart.map((i,n)=>`${n+1}. ${i.name} | Colour: ${i.color} | Size: ${i.size} | Qty: ${i.qty} | ${money(i.price*i.qty)}`);const total=cart.reduce((s,i)=>s+i.price*i.qty,0);return `Hello Matoshri Ladies Garment Collection! I would like to place an order.\n\n${lines.join("\n")}\n\nTotal: ${money(total)}\nPayment: ${data.payment}\n\nCustomer: ${data.name}\nMobile: ${data.phone}\nDelivery address: ${data.address}\n\nPlease confirm availability and delivery charges.`}
function closeAll(){document.querySelectorAll(".overlay").forEach(el=>el.classList.add("hidden"))}

$("year").textContent=new Date().getFullYear();
renderProducts();renderCartCount();
$("searchForm").addEventListener("submit",e=>{e.preventDefault();renderProducts();$("shop").scrollIntoView({behavior:"smooth"})});
["searchInput","categoryFilter","colorFilter","priceFilter","sortSelect"].forEach(id=>$(id).addEventListener(id==="searchInput"?"input":"change",renderProducts));
document.querySelectorAll(".category-pill").forEach(btn=>btn.addEventListener("click",()=>{activeCategory=btn.dataset.category;$("categoryFilter").value=activeCategory;document.querySelectorAll(".category-pill").forEach(b=>b.classList.toggle("active",b===btn));renderProducts();$("shop").scrollIntoView({behavior:"smooth",block:"start"})}));
$("productGrid").addEventListener("click",e=>{const target=e.target.closest("[data-view]");if(target)openProduct(target.dataset.view)});
$("productDetail").addEventListener("click",e=>{const c=e.target.closest("[data-color]");const s=e.target.closest("[data-size]");if(c){selectedColor=c.dataset.color;renderProductDetail()}else if(s){selectedSize=s.dataset.size;renderProductDetail()}else if(e.target.id==="addToCart")addToCart()});
$("cartOpen").addEventListener("click",()=>{$("cartOverlay").classList.remove("hidden");renderCart()});
$("cartItems").addEventListener("click",e=>{const b=e.target.closest("[data-remove]");if(b){cart.splice(Number(b.dataset.remove),1);saveCart();renderCart()}});
$("checkoutOpen").addEventListener("click",()=>{if(!cart.length)return;$("cartOverlay").classList.add("hidden");$("checkoutOverlay").classList.remove("hidden")});
$("checkoutForm").addEventListener("submit",e=>{e.preventDefault();if(!cart.length){toast("Your bag is empty.");return}const data=Object.fromEntries(new FormData(e.currentTarget).entries());const url="https://wa.me/"+STORE_PHONE+"?text="+encodeURIComponent(orderText(data));const win=window.open(url,"_blank");if(win)win.opener=null;else window.location.href=url;toast("WhatsApp order message prepared. Please press Send in WhatsApp.")});
document.querySelectorAll("[data-close]").forEach(btn=>btn.addEventListener("click",()=>$(btn.dataset.close).classList.add("hidden")));
document.querySelectorAll(".overlay").forEach(ov=>ov.addEventListener("click",e=>{if(e.target===ov)ov.classList.add("hidden")}));
document.addEventListener("keydown",e=>{if(e.key==="Escape")closeAll()});
$("adminOpen").addEventListener("click",openAdmin);
$("adminLoginForm").addEventListener("submit",e=>{e.preventDefault();const password=new FormData(e.currentTarget).get("password");if(password!==ADMIN_DEMO_PASSWORD){toast("Incorrect demo password.");return}$("adminLogin").classList.add("hidden");$("adminDashboard").classList.remove("hidden");renderAdminList()});
$("adminLogout").addEventListener("click",()=>{$("adminDashboard").classList.add("hidden");$("adminLogin").classList.remove("hidden");toast("Logged out.")});
$("productForm").elements.imageFile.addEventListener("change",async e=>{const file=e.target.files&&e.target.files[0];if(!file)return;if(!file.type.startsWith("image/")){toast("Please choose an image file.");e.target.value="";return}try{const dataUrl=await resizeImage(file);$("productForm").elements.image.value=dataUrl;const preview=$("adminImagePreview");preview.src=dataUrl;preview.classList.remove("hidden");toast("Photo selected. Save product to apply it.")}catch(err){toast("Could not read that image. Please try another photo.")}});
function resizeImage(file){return new Promise((resolve,reject)=>{const reader=new FileReader();reader.onerror=reject;reader.onload=()=>{const img=new Image();img.onerror=reject;img.onload=()=>{const max=1000,scale=Math.min(1,max/Math.max(img.width,img.height));const canvas=document.createElement("canvas");canvas.width=Math.round(img.width*scale);canvas.height=Math.round(img.height*scale);const ctx=canvas.getContext("2d");ctx.drawImage(img,0,0,canvas.width,canvas.height);resolve(canvas.toDataURL("image/jpeg",.82))};img.src=reader.result};reader.readAsDataURL(file)})}
$("productForm").addEventListener("submit",e=>{e.preventDefault();const f=e.currentTarget;const data=Object.fromEntries(new FormData(f).entries());const price=Number(data.price);if(price<350||price>2000){toast("Please set a price between ₹350 and ₹2,000.");return}const item={id:data.id||"p"+Date.now(),name:data.name.trim(),category:data.category,price,colors:data.colors.split(",").map(x=>x.trim()).filter(Boolean),sizes:data.sizes.split(",").map(x=>x.trim()).filter(Boolean),image:data.image.trim()||FALLBACK_IMAGE,description:data.description.trim(),tag:"Store pick"};if(!item.colors.length||!item.sizes.length){toast("Add at least one colour and size.");return}const index=products.findIndex(p=>p.id===item.id);if(index>=0)products[index]=item;else products.unshift(item);saveProducts();renderProducts();renderAdminList();resetProductForm();toast("Product saved in this browser.")});
$("resetProductForm").addEventListener("click",resetProductForm);
$("adminProductList").addEventListener("click",e=>{const edit=e.target.closest("[data-edit]");const del=e.target.closest("[data-delete]");if(edit)editProduct(edit.dataset.edit);if(del){if(confirm("Delete this product?")){products=products.filter(p=>p.id!==del.dataset.delete);saveProducts();renderProducts();renderAdminList();toast("Product deleted.")}}});
$("resetDemo").addEventListener("click",()=>{if(confirm("Restore the original sample products? This will replace your current browser product list.")){products=cloneDefaults();saveProducts();renderProducts();renderAdminList();toast("Sample products restored.")}});
