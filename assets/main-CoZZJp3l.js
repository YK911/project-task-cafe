import{a as S,i as m,S as R,h as B}from"./vendor-BZku-XQG.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))r(s);new MutationObserver(s=>{for(const a of s)if(a.type==="childList")for(const n of a.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&r(n)}).observe(document,{childList:!0,subtree:!0});function t(s){const a={};return s.integrity&&(a.integrity=s.integrity),s.referrerPolicy&&(a.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?a.credentials="include":s.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function r(s){if(s.ep)return;s.ep=!0;const a=t(s);fetch(s.href,a)}})();const i={filters:[{name:"Muscles",value:"muscles"},{name:"Body parts",value:"bodypart"},{name:"Equipment",value:"equipment"}],selectedFilter:null,selectedCategory:null,keyword:"",currentPage:1,totalPages:1,isMobile:()=>window.innerWidth<768,selectFilter(e){this.selectedFilter=e,this.selectedCategory=null,this.page=1},selectCategory(e){this.selectedCategory=e,this.page=1},setKeyword(e){this.keyword=e,this.page=1},async getRequestResults(e,o){const{data:t}=await S.get(e,o);return this.totalPages=t.totalPages,t.results},async getCategories(){const e={filter:this.selectedFilter.name,page:this.currentPage,limit:this.isMobile()?9:12};return this.getRequestResults("https://your-energy.b.goit.study/api/filters",{params:e})},async getExercises(){const e={page:this.currentPage,limit:this.isMobile()?8:10};return e[this.selectedFilter.value]=this.selectedCategory.name,this.keyword&&(e.keyword=this.keyword),this.getRequestResults("https://your-energy.b.goit.study/api/exercises",{params:e})}};let I;function z(){document.querySelector(".loader-overlay").style.display="flex"}function k(){I=setTimeout(z,500)}function O(){clearTimeout(I),document.querySelector(".loader-overlay").style.display="none"}function F(e){const o=document.querySelector(".exercises-categories,.exercises-list-container"),t=o.querySelector(".pagination");if(i.totalPages<2){t&&t.remove();return}const r=document.createElement("ul");r.classList.add("pagination");for(let s=1;s<=i.totalPages;s+=1){const a=document.createElement("li");a.classList.add("pagination-item"),a.textContent=s,s===i.currentPage?a.classList.add("pagination-item-current"):a.addEventListener("click",()=>{e(s)}),r.appendChild(a),t?o.replaceChild(r,t):o.appendChild(r)}}function C(e){const t=e.charAt(0).toUpperCase(),r=e.slice(1);return t+r}const P="blockquote_cache",$="YYYY-MM-DD",f="favorites";function Q(e){const o=e._id,t=JSON.parse(localStorage.getItem(f))||{};t[o]=e;const r=JSON.stringify(t);localStorage.setItem(f,r)}function T(e){const o=localStorage.getItem(f);if(!o)return m.error({title:"Oops",message:"No data found in local storage",position:"topRight"}),!1;const t=JSON.parse(o);return t[e]?(delete t[e],localStorage.setItem(f,JSON.stringify(t)),!0):(m.error({title:"Oops",message:`No object found for id: ${e}`,position:"topRight"}),!1)}S.defaults.baseURL="https://your-energy.b.goit.study/api/exercises/";let x={};const A={starSize:18,maxStars:5,tooltip:!1,stars:e=>{const o=e;o.innerHTML='<svg viewBox="0 0 20 19" xmlns="http://www.w3.org/2000/svg"><path class="gl-star-full" d="M9.049.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 0 0 .95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 0 0-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.539 1.118l-3.975-2.888a1 1 0 0 0-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 0 0-.363-1.118L1.077 8.101c-.783-.57-.38-1.81.588-1.81h4.914a1 1 0 0 0 .951-.69L9.05.927Z"/></svg>'}},u={dialog:document.querySelector('[data-modal="exercise"]'),closeBtn:document.querySelector("[data-modal-close]"),favouritesBtn:document.querySelector("[data-add-favourites]"),ratingBtn:document.querySelector("[data-rating-open]"),exercisesLayout:document.querySelector("[data-exercise]")},d={dialog:document.querySelector('[data-modal="rating"]'),closeBtn:document.querySelector('[data-modal-close="rating"]'),form:document.querySelector('[data-modal="rating"] .rating-form'),ratingRate:document.querySelector(".rating-form-value")},j=()=>u.dialog.showModal(),V=()=>u.dialog.close(),W=()=>d.dialog.showModal(),U=()=>{d.dialog.close(),d.ratingRate.textContent="0.0",d.form.reset(),j()},J=e=>{const o=JSON.parse(localStorage.getItem(f))||[];return Object.keys(o).includes(e)},Z=(e,o,t)=>{const r=o;if(t){T(e),r.firstElementChild.textContent="Add to favorites",r.classList.remove("is-favourite");return}Q(x),r.firstElementChild.textContent="Remove",r.classList.add("is-favourite")},G=(e,o,t)=>{const r=o;if(t){r.firstElementChild.textContent="Add to favorites",r.classList.remove("is-favourite");return}r.firstElementChild.textContent="Remove",r.classList.add("is-favourite")},X=e=>{const o=e.currentTarget,t=o.dataset.addFavourites,r=J(t);Z(t,o,r)},ee=async e=>(await fetch(`https://your-energy.b.goit.study/api/exercises/${e}`)).json(),te=e=>{const{bodyPart:o,equipment:t,gifUrl:r,name:s,target:a,description:n,rating:l,burnedCalories:c,time:g,popularity:p}=e,y=Array.from({length:5},(w,h)=>`<option value="${h+1}" ${h+1===Math.round(l)?"selected":""}>${h+1} Stars</option>`).join("");return`<div class="modal-ill">
      <img
        src="${r}"
        alt="${s}"
        width="295"
        height="258"
        loading="lazy"
      />
    </div>
    <div class="modal-details">
    <h2 class="modal-caption">${C(s)}</h2>
    <div class="modal-rating">
      <p>${l.toFixed(1)}</p>
      <select class="star-rating">
          <option value="">Select a rating</option>
          ${y}
      </select>
    </div>
    <ul class="modal-meta">
      <li>
        <h3 class="modal-meta-caption">Target</h3>
        <p class="modal-meta-info">${C(a)}</p>
      </li>
      <li>
        <h3 class="modal-meta-caption">Body Part</h3>
        <p class="modal-meta-info">${C(o)}</p>
      </li>
      <li>
        <h3 class="modal-meta-caption">Equipment</h3>
        <p class="modal-meta-info">${C(t)}</p>
      </li>
      <li>
        <h3 class="modal-meta-caption">Popular</h3>
        <p class="modal-meta-info">${p}</p>
      </li>
      <li>
        <h3 class="modal-meta-caption">Burned Calories</h3>
        <p class="modal-meta-info">${c}/${g} min</p>
      </li>
    </ul>
    <p class="modal-desc">${n}</p></div>`},oe=e=>{const{value:o}=e.currentTarget.dataset,t=Number(o);d.ratingRate.textContent=t.toFixed(1)},re=()=>{const{_id:e}=x;V(),W(),new R(".rating-form-star",A),d.form.setAttribute("data-exs-id",e),document.querySelectorAll('[data-modal="rating"] .gl-star-rating .gl-star-rating--stars span').forEach(t=>t.addEventListener("click",oe))},se=e=>{e.preventDefault();const o=e.currentTarget,{exsId:t}=o.dataset,r=o.querySelector(".gl-star-rating--stars"),{rating:s}=r.dataset,{ratingEmail:a,ratingMessage:n}=o.elements;S.patch(`${t}/rating`,{rate:+s,email:a.value,review:n.value}),d.ratingRate.textContent="0.0",o.reset()};async function E(e){x=await ee(e);const o=te(x),t=u.dialog.querySelector(".modal-body"),r=u.dialog.querySelector(".modal-btn[data-add-favourites]"),s=J(e);r.dataset.addFavourites=e,t.innerHTML=o,G(e,r,!s),j(),new R(".star-rating",A)}u.closeBtn&&u.closeBtn.addEventListener("click",V);u.favouritesBtn&&u.favouritesBtn.addEventListener("click",X);u.exercisesLayout&&u.exercisesLayout.addEventListener("click",E);u.ratingBtn&&u.ratingBtn.addEventListener("click",re);d.closeBtn&&d.closeBtn.addEventListener("click",U);d.closeBtn&&d.closeBtn.addEventListener("click",U);d.form&&d.form.addEventListener("submit",se);function ae(e){const o="#excercise-card-detail-template",t=[],r=document.querySelector(o).content.cloneNode(!0);r.querySelector(".card-details-title").textContent="Burned Calories:",r.querySelector(".card-details-value").textContent=`${e.burnedCalories} / ${e.time} min`,t.push(r);const s=document.querySelector(o).content.cloneNode(!0);s.querySelector(".card-details-title").textContent="Body Part:",s.querySelector(".card-details-value").textContent=e.bodyPart[0].toUpperCase()+e.bodyPart.slice(1),t.push(s);const a=document.querySelector(o).content.cloneNode(!0);return a.querySelector(".card-details-title").textContent="Target:",a.querySelector(".card-details-value").textContent=e.target[0].toUpperCase()+e.target.slice(1),t.push(a),t}function ne(e){const t=document.querySelector("#excercise-card-template").content.cloneNode(!0),r="_id";t.children[0].dataset.id=e[r],t.querySelector(".card-category").textContent=e.bodyPart,t.querySelector(".rating-value").textContent=e.rating.toFixed(1),t.querySelector(".start-button").addEventListener("click",n=>{n.preventDefault(),E(e[r])}),t.querySelector(".card-title").textContent=e.name[0].toUpperCase()+e.name.slice(1);const a=t.querySelector(".card-details-list");return ae(e).forEach(n=>{a.append(n)}),t}async function q(e=1){i.currentPage=e;const o=await i.getExercises(),t=document.querySelector(".exercises-categories,.exercises-list-container");t.classList.remove("exercises-categories"),t.classList.add("exercises-list-container"),t.innerHTML="";const r=document.createElement("ul");r.classList.add("exercises-cards"),o.forEach(s=>{const a=ne(s);a.addEventListener("click",()=>{E(a)}),r.appendChild(a)}),t.appendChild(r),F(s=>{var a;q(s),(a=document.getElementById("exercises-filters"))==null||a.scrollIntoView({behavior:"smooth"})})}function ie(){const e=document.querySelector(".exercises-search");if(!e)return;const o=document.querySelector(".search-icon");e.addEventListener("input",t=>{t.target.value?o==null||o.classList.add("search-active"):o==null||o.classList.remove("search-active"),i.setKeyword(t.target.value)}),document.querySelector("#exercises-filters-form").addEventListener("submit",t=>{t.preventDefault(),q()}),o==null||o.addEventListener("click",()=>{i.keyword&&(o==null||o.classList.remove("search-active"),e.value="",i.setKeyword(""),q())})}function ce(){document.querySelector(".exercises-search").value=""}function _(){const e=document.querySelector(".exercises-search-container");e&&(i.selectedCategory?e.classList.remove("hide"):e.classList.add("hide"),ce())}function le(e,o){const t=document.querySelector("#exercise-category-template").content.cloneNode(!0);return t.querySelector("h3").textContent=e.name,t.querySelector("p").textContent=e.filter,t.querySelector(".exercise-category").style.backgroundImage=`url(${e.imgURL})`,o&&t.querySelector(".exercise-category").addEventListener("click",()=>o(e)),t}function K(){if(!i.selectedCategory){document.querySelector(".exercises-header-selected-category").classList.add("visually-hidden"),document.querySelector(".exercises-header-category-name").textContent="";return}document.querySelector(".exercises-header-category-name").textContent=i.selectedCategory.name,document.querySelector(".exercises-header-selected-category").classList.remove("visually-hidden")}async function D(e=1){i.currentPage=e;const o=await i.getCategories(),t=document.querySelector(".exercises-categories, .exercises-list-container");if(!t){m.error({title:"Oops",message:"Container not found",position:"topRight"});return}t.classList.add("exercises-categories"),t.classList.remove("exercises-list-container"),t.innerHTML="";const r=document.createElement("ul");r.classList.add("categories-cards"),o.forEach(s=>{const a=le(s,l=>{i.selectCategory(l),K(),_(),q()}),n=document.createElement("li");n.appendChild(a),r.appendChild(n)}),t.appendChild(r),F(s=>{var a;D(s),(a=document.getElementById("exercises-filters"))==null||a.scrollIntoView({behavior:"smooth"})})}function de(){const e=document.querySelector(".exercises-filter-list");e&&i.filters.forEach(o=>{const t=document.createElement("li");t.classList.add("exercises-filter-item"),o.value===i.selectedFilter.value&&t.classList.add("current");const r=document.createElement("button");r.setAttribute("type","button"),r.classList.add("exercises-filter-button"),r.textContent=o.name,r.addEventListener("click",async s=>{s.preventDefault(),e.querySelectorAll(".exercises-filter-item").forEach(n=>{n.classList.remove("current")}),t.classList.add("current"),i.selectFilter(o),K(),_(),await D()}),t.appendChild(r),e&&e.appendChild(t)})}document.addEventListener("DOMContentLoaded",async()=>{document.querySelector(".exercises-filters")&&(k(),i.selectFilter(i.filters[0]),de(),ie(),await D(),O())});function ue(){return B().utc().format($)}function me(e,o){return B(e).utc().isSame(B(o,$).utc(),"day")}async function ge(){const e=ue(),o=localStorage.getItem(P);if(o){const s=JSON.parse(o);if(me(e,s.date))return s.data}const t=await S.get("https://your-energy.b.goit.study/api/quote"),{data:r}=t;return r&&localStorage.setItem(P,JSON.stringify({data:r,date:e})),r}(async()=>{const e=await ge();(!e||!e.author||!e.quote)&&m.error({title:"Oops",message:"Can't retrieve fresh quote of the day data from provider's API",position:"topRight"});const o=document.querySelector(".quote-block"),t=o.querySelector(".quote-desc"),r=o.querySelector(".quote-author");t.textContent=e.quote,r.textContent=e.author})();const v=document.getElementById("subscribtionForm");(()=>{if(!v)return;const e=v.querySelector('input[name="email"]'),o=document.getElementById("subscribtionFormBtn"),t=a=>/^\w+(\.\w+)?@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(a),r=()=>{const a=e.value.trim();t(a)?(e.style.borderColor="",o.disabled=!1):(a===""?e.style.borderColor="":e.style.borderColor="red",o.disabled=!0)};document.addEventListener("DOMContentLoaded",r),e.addEventListener("input",r);const s=async a=>{a.preventDefault();try{o.disabled=!0,k(),await S.post("https://your-energy.b.goit.study/api/subscription",JSON.stringify({email:e.value.trim()}),{headers:{"Content-Type":"application/json"}}),v.reset(),m.success({title:"OK",message:"You have subscribed!",position:"topRight"})}catch(n){n.response?n.response.status===409?(v.reset(),m.warning({title:"OK",message:"Subscription already exists.",position:"topRight"})):m.error({title:"Oops",message:n.response.statusText,position:"topRight"}):m.error({title:"Oops",message:n.message,position:"topRight"})}finally{O()}};v.addEventListener("submit",s)})();const H=document.querySelector(".js-menu-backdrop"),pe=document.querySelector(".js-open-menu"),ye=document.querySelector(".js-close-menu"),fe=document.querySelector(".js-menu-link");function b(){H.classList.toggle("is-open")}function he(e){if(window.location.href===e.target.href){e.preventDefault();return}b()}function ve({target:e}){e.closest("#mob-menu")||b()}pe.addEventListener("click",b);ye.addEventListener("click",b);fe.addEventListener("click",he);H.addEventListener("click",ve);const L=document.getElementById("scrollBtn");L.addEventListener("click",e=>{e.preventDefault(),window.scrollTo({top:0,behavior:"smooth"}),L.blur()});window.addEventListener("scroll",()=>{window.scrollY>50?L.style.display="flex":L.style.display="none"});async function Se(e){const o=localStorage.getItem(f);if(!o)return m.error({title:"Oops",message:"No data found in local storage",position:"topRight"}),null;const r=JSON.parse(o)[e];return r||(m.error({title:"Oops",message:`No object found for key: ${e}`,position:"topRight"}),null)}function Ce(e){const o="#excercise-card-detail-template",t=[],r=document.querySelector(o).content.cloneNode(!0);r.querySelector(".card-details-title").textContent="Burned Calories:",r.querySelector(".card-details-value").textContent=`${e.burnedCalories} / ${e.time} min`,t.push(r);const s=document.querySelector(o).content.cloneNode(!0);s.querySelector(".card-details-title").textContent="Body Part:",s.querySelector(".card-details-value").textContent=e.bodyPart[0].toUpperCase()+e.bodyPart.slice(1),t.push(s);const a=document.querySelector(o).content.cloneNode(!0);return a.querySelector(".card-details-title").textContent="Target:",a.querySelector(".card-details-value").textContent=e.target[0].toUpperCase()+e.target.slice(1),t.push(a),t}function xe(e){const t=document.querySelector("#excercise-card-template").content.cloneNode(!0),r="_id";t.children[0].dataset.id=e[r],t.querySelector(".card-category").textContent=e.bodyPart,t.querySelector(".rating-value").textContent=e.rating.toFixed(1),t.querySelector(".start-button").addEventListener("click",n=>{n.preventDefault(),E(e[r])}),t.querySelector(".card-title").textContent=e.name[0].toUpperCase()+e.name.slice(1);const a=t.querySelector(".card-details-list");return Ce(e).forEach(n=>{a.append(n)}),t}function Y(){const e=document.getElementById("exerciseList"),o=document.getElementById("exerciseListEmpty");e&&(e.innerHTML="");const t=JSON.parse(localStorage.getItem(f))||[],r=Object.keys(t),s=document.createDocumentFragment();if(r.length===0&&o)o.classList.remove("display-none");else if(e){k();const a=r.map(n=>Se(n).then(l=>xe(l)));Promise.all(a).then(n=>{n.forEach(l=>{s.appendChild(l)}),O(),e.appendChild(s)}).then(()=>{document.querySelectorAll(".card-category").forEach(l=>{const c=document.createElement("button");c.className="remove-button",c.innerHTML='<div class="remove-btn-icon"><svg width="16" height="16" viewBox="0 0 14 16" xmlns="http://www.w3.org/2000/svg"><path d="M9.66667 4.00004V3.46671C9.66667 2.71997 9.66667 2.3466 9.52134 2.06139C9.39351 1.8105 9.18954 1.60653 8.93865 1.4787C8.65344 1.33337 8.28007 1.33337 7.53333 1.33337H6.46667C5.71993 1.33337 5.34656 1.33337 5.06135 1.4787C4.81046 1.60653 4.60649 1.8105 4.47866 2.06139C4.33333 2.3466 4.33333 2.71997 4.33333 3.46671V4.00004M5.66667 7.66671V11M8.33333 7.66671V11M1 4.00004H13M11.6667 4.00004V11.4667C11.6667 12.5868 11.6667 13.1469 11.4487 13.5747C11.2569 13.951 10.951 14.257 10.5746 14.4487C10.1468 14.6667 9.58677 14.6667 8.46667 14.6667H5.53333C4.41323 14.6667 3.85318 14.6667 3.42535 14.4487C3.04903 14.257 2.74307 13.951 2.55132 13.5747C2.33333 13.1469 2.33333 12.5868 2.33333 11.4667V4.00004" stroke="#242424" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" fill="none"/></svg></div>';const p=l.closest(".excercise-card-item").getAttribute("data-id");c.setAttribute("data-id",p),l.insertAdjacentElement("afterend",c),c.addEventListener("click",()=>{const y=c.getAttribute("data-id");T(y),Y()})})}).then(()=>{const n=document.querySelectorAll(".card");let l=10,c=1;window.innerWidth<768&&(l=8);const g=Math.ceil(n.length/l);g===1?(document.querySelector(".pagination-favorites").classList.remove("display-flex"),document.querySelector(".pagination-favorites").classList.remove("display-none"),document.querySelector(".pagination-favorites").style.display="none"):(document.querySelector(".pagination-favorites").classList.remove("display-none"),document.querySelector(".pagination-favorites").classList.add("display-flex"));function p(y){const w=(y-1)*l,h=w+l;n.forEach((M,N)=>{M.classList.remove("visible"),N>=w&&N<h&&M.classList.add("visible")}),document.getElementById("prev").disabled=y===1,document.getElementById("next").disabled=y===g}document.getElementById("prev").addEventListener("click",()=>{c>1&&(c-=1,p(c))}),document.getElementById("next").addEventListener("click",()=>{c<g&&(c+=1,p(c))}),p(c)})}}window.onload=()=>{Y()};
//# sourceMappingURL=main-CoZZJp3l.js.map
