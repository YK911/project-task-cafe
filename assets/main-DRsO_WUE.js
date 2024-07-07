import{a as L,h as q,i as y}from"./vendor-CtRQQMrb.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))o(r);new MutationObserver(r=>{for(const n of r)if(n.type==="childList")for(const a of n.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&o(a)}).observe(document,{childList:!0,subtree:!0});function t(r){const n={};return r.integrity&&(n.integrity=r.integrity),r.referrerPolicy&&(n.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?n.credentials="include":r.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function o(r){if(r.ep)return;r.ep=!0;const n=t(r);fetch(r.href,n)}})();const i={filters:[{name:"Muscles",value:"muscles"},{name:"Body parts",value:"bodypart"},{name:"Equipment",value:"equipment"}],selectedFilter:null,selectedCategory:null,keyword:"",currentPage:1,totalPages:1,isMobile:()=>window.innerWidth<768,selectFilter(e){this.selectedFilter=e,this.selectedCategory=null,this.page=1},selectCategory(e){this.selectedCategory=e,this.page=1},setKeyword(e){this.keyword=e,this.page=1},async getRequestResults(e,s){const{data:t}=await L.get(e,s);return this.totalPages=t.totalPages,t.results},async getCategories(){const e={filter:this.selectedFilter.name,page:this.currentPage,limit:this.isMobile()?9:12};return this.getRequestResults("https://your-energy.b.goit.study/api/filters",{params:e})},async getExercises(){const e={page:this.currentPage,limit:this.isMobile()?8:10};return e[this.selectedFilter.value]=this.selectedCategory.name,this.keyword&&(e.keyword=this.keyword),this.getRequestResults("https://your-energy.b.goit.study/api/exercises",{params:e})}};let B;function A(){document.querySelector(".loader-overlay").style.display="flex"}function b(){B=setTimeout(A,500)}function E(){clearTimeout(B),document.querySelector(".loader-overlay").style.display="none"}function N(e){const s=document.querySelector(".exercises-categories,.exercises-list-container"),t=s.querySelector(".pagination");if(i.totalPages<2){t&&t.remove();return}const o=document.createElement("ul");o.classList.add("pagination");for(let r=1;r<=i.totalPages;r+=1){const n=document.createElement("li");n.classList.add("pagination-item"),n.textContent=r,r===i.currentPage?n.classList.add("pagination-item-current"):n.addEventListener("click",()=>{e(r)}),o.appendChild(n),t?s.replaceChild(o,t):s.appendChild(o)}}function g(e){const t=e.charAt(0).toUpperCase(),o=e.slice(1);return t+o}const k="blockquote_cache",D="YYYY-MM-DD",u="favorites";function R(e){const s=e._id,t=JSON.parse(localStorage.getItem(u))||{};t[s]=e;const o=JSON.stringify(t);localStorage.setItem(u,o)}function P(e){const s=localStorage.getItem(u);if(!s)return console.log("No data found in local storage"),!1;const t=JSON.parse(s);return t[e]?(delete t[e],localStorage.setItem(u,JSON.stringify(t)),!0):(console.log(`No object found for id: ${e}`),!1)}let x={};const c={dialog:document.querySelector('[data-modal="exercise"]'),closeBtn:document.querySelector("[data-modal-close]"),favouritesBtn:document.querySelector("[data-add-favourites]"),ratingBtn:document.querySelector("[data-rating-open]"),exercisesLayout:document.querySelector("[data-exercise]")},V=()=>c.dialog.showModal(),j=()=>c.dialog.close(),O=e=>{const s=JSON.parse(localStorage.getItem(u))||[];return Object.keys(s).includes(e)},J=(e,s,t)=>{const o=s;if(t){P(e),o.firstElementChild.textContent="Add to favorites",o.classList.remove("is-favourite");return}R(x),o.firstElementChild.textContent="Remove from favorites",o.classList.add("is-favourite")},U=(e,s,t)=>{const o=s;if(t){o.firstElementChild.textContent="Add to favorites",o.classList.remove("is-favourite");return}o.firstElementChild.textContent="Remove from favorites",o.classList.add("is-favourite")},K=e=>{const s=e.currentTarget,t=s.dataset.addFavourites,o=O(t);J(t,s,o)},Y=()=>{console.log("Click on rating btn")},_=async e=>(await fetch(`https://your-energy.b.goit.study/api/exercises/${e}`)).json(),H=e=>{const{bodyPart:s,equipment:t,gifUrl:o,name:r,target:n,description:a,rating:l,burnedCalories:d,time:C,popularity:S}=e;return`<div class="modal-ill">
      <img
        src="${o}"
        alt="${r}"
        width="295"
        height="258"
        loading="lazy"
      />
    </div>
    <div class="modal-details">
    <h2 class="modal-caption">${g(r)}</h2>
    <div class="modal-rating">
      <p>${l.toFixed(1)}</p>
      <svg width="98" height="13" id="rating-stars">
        <use style="--shift: -2" href="./assets/icons.svg#star"></use>
        <use style="--shift: -1" href="./assets/icons.svg#star"></use>
        <use style="--shift: 0" href="./assets/icons.svg#star"></use>
        <use style="--shift: 1" href="./assets/icons.svg#star"></use>
        <use style="--shift: 2" href="./assets/icons.svg#star"></use>
      </svg>
    </div>
    <ul class="modal-meta">
      <li>
        <h3 class="modal-meta-caption">Target</h3>
        <p class="modal-meta-info">${g(n)}</p>
      </li>
      <li>
        <h3 class="modal-meta-caption">Body Part</h3>
        <p class="modal-meta-info">${g(s)}</p>
      </li>
      <li>
        <h3 class="modal-meta-caption">Equipment</h3>
        <p class="modal-meta-info">${g(t)}</p>
      </li>
      <li>
        <h3 class="modal-meta-caption">Popular</h3>
        <p class="modal-meta-info">${S}</p>
      </li>
      <li>
        <h3 class="modal-meta-caption">Burned Calories</h3>
        <p class="modal-meta-info">${d}/${C} min</p>
      </li>
    </ul>
    <p class="modal-desc">${a}</p></div>`};async function h(e){x=await _(e);const s=H(x),t=c.dialog.querySelector(".modal-body"),o=c.dialog.querySelector(".modal-btn[data-add-favourites]"),r=O(e);o.dataset.addFavourites=e,t.innerHTML=s,U(e,o,!r),V()}c.closeBtn&&c.closeBtn.addEventListener("click",j);c.favouritesBtn&&c.favouritesBtn.addEventListener("click",K);c.ratingBtn&&c.ratingBtn.addEventListener("click",Y);c.exercisesLayout&&c.exercisesLayout.addEventListener("click",h);function z(e){const s="#excercise-card-detail-template",t=[],o=document.querySelector(s).content.cloneNode(!0);o.querySelector(".card-details-title").textContent="Burned Calories:",o.querySelector(".card-details-value").textContent=`${e.burnedCalories} / ${e.time} min`,t.push(o);const r=document.querySelector(s).content.cloneNode(!0);r.querySelector(".card-details-title").textContent="Body Part:",r.querySelector(".card-details-value").textContent=e.bodyPart[0].toUpperCase()+e.bodyPart.slice(1),t.push(r);const n=document.querySelector(s).content.cloneNode(!0);return n.querySelector(".card-details-title").textContent="Target:",n.querySelector(".card-details-value").textContent=e.target[0].toUpperCase()+e.target.slice(1),t.push(n),t}function Q(e){const t=document.querySelector("#excercise-card-template").content.cloneNode(!0),o="_id";t.children[0].dataset.id=e[o],t.querySelector(".card-category").textContent=e.bodyPart,t.querySelector(".rating-value").textContent=e.rating.toFixed(1),t.querySelector(".start-button").addEventListener("click",a=>{a.preventDefault(),h(e[o])}),t.querySelector(".card-title").textContent=e.name[0].toUpperCase()+e.name.slice(1);const n=t.querySelector(".card-details-list");return z(e).forEach(a=>{n.append(a)}),t}async function p(e=1){i.currentPage=e;const s=await i.getExercises(),t=document.querySelector(".exercises-categories,.exercises-list-container");t.classList.remove("exercises-categories"),t.classList.add("exercises-list-container"),t.innerHTML="";const o=document.createElement("ul");o.classList.add("exercises-cards"),s.forEach(r=>{const n=Q(r);n.addEventListener("click",()=>{h(n)}),o.appendChild(n)}),t.appendChild(o),N(r=>{var n;p(r),(n=document.getElementById("exercises-filters"))==null||n.scrollIntoView({behavior:"smooth"})})}function W(){const e=document.querySelector(".exercises-search");if(!e)return;const s=document.querySelector(".search-icon");e.addEventListener("input",t=>{t.target.value?s==null||s.classList.add("search-active"):s==null||s.classList.remove("search-active"),i.setKeyword(t.target.value)}),document.querySelector("#exercises-filters-form").addEventListener("submit",t=>{t.preventDefault(),p()}),s==null||s.addEventListener("click",()=>{i.keyword&&(s==null||s.classList.remove("search-active"),e.value="",i.setKeyword(""),p())})}function Z(){document.querySelector(".exercises-search").value=""}function M(){const e=document.querySelector(".exercises-search-container");e&&(i.selectedCategory?e.classList.remove("hide"):e.classList.add("hide"),Z())}function G(e,s){const t=document.querySelector("#exercise-category-template").content.cloneNode(!0);return t.querySelector("h3").textContent=e.name,t.querySelector("p").textContent=e.filter,t.querySelector(".exercise-category").style.backgroundImage=`url(${e.imgURL})`,s&&t.querySelector(".exercise-category").addEventListener("click",()=>s(e)),t}function I(){if(!i.selectedCategory){document.querySelector(".exercises-header-selected-category").classList.add("visually-hidden"),document.querySelector(".exercises-header-category-name").textContent="";return}document.querySelector(".exercises-header-category-name").textContent=i.selectedCategory.name,document.querySelector(".exercises-header-selected-category").classList.remove("visually-hidden")}async function w(e=1){i.currentPage=e;const s=await i.getCategories(),t=document.querySelector(".exercises-categories, .exercises-list-container");if(!t){console.log("Container not found");return}t.classList.add("exercises-categories"),t.classList.remove("exercises-list-container"),t.innerHTML="";const o=document.createElement("ul");o.classList.add("categories-cards"),s.forEach(r=>{const n=G(r,l=>{i.selectCategory(l),I(),M(),p()}),a=document.createElement("li");a.appendChild(n),o.appendChild(a)}),t.appendChild(o),N(r=>{var n;w(r),(n=document.getElementById("exercises-filters"))==null||n.scrollIntoView({behavior:"smooth"})})}function X(){const e=document.querySelector(".exercises-filter-list");e&&i.filters.forEach(s=>{const t=document.createElement("li");t.classList.add("exercises-filter-item"),s.value===i.selectedFilter.value&&t.classList.add("current");const o=document.createElement("button");o.setAttribute("type","button"),o.classList.add("exercises-filter-button"),o.textContent=s.name,o.addEventListener("click",async r=>{r.preventDefault(),e.querySelectorAll(".exercises-filter-item").forEach(a=>{a.classList.remove("current")}),t.classList.add("current"),i.selectFilter(s),I(),M(),await w()}),t.appendChild(o),e&&e.appendChild(t)})}document.addEventListener("DOMContentLoaded",async()=>{document.querySelector(".exercises-filters")&&(b(),i.selectFilter(i.filters[0]),X(),W(),await w(),E())});function ee(){return q().utc().format(D)}function te(e,s){return q(e).utc().isSame(q(s,D).utc(),"day")}async function se(){const e=ee(),s=localStorage.getItem(k);if(s){const r=JSON.parse(s);if(te(e,r.date))return r.data}const t=await L.get("https://your-energy.b.goit.study/api/quote"),{data:o}=t;return o&&localStorage.setItem(k,JSON.stringify({data:o,date:e})),o}(async()=>{const e=await se();(!e||!e.author||!e.quote)&&console.log("Can't retrieve fresh quote of the day data from provider's API");const s=document.querySelector(".quote-block"),t=s.querySelector(".quote-desc"),o=s.querySelector(".quote-author");t.textContent=e.quote,o.textContent=e.author})();const m=document.getElementById("subscribtionForm");(()=>{if(!m)return;const e=m.querySelector('input[name="email"]'),s=document.getElementById("subscribtionFormBtn"),t=n=>/^\w+(\.\w+)?@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(n),o=()=>{const n=e.value.trim();t(n)?(e.style.borderColor="",s.disabled=!1):(n===""?e.style.borderColor="":e.style.borderColor="red",s.disabled=!0)};document.addEventListener("DOMContentLoaded",o),e.addEventListener("input",o);const r=async n=>{n.preventDefault();try{s.disabled=!0,b(),await L.post("https://your-energy.b.goit.study/api/subscription",JSON.stringify({email:e.value.trim()}),{headers:{"Content-Type":"application/json"}}),m.reset(),y.success({title:"OK",message:"You have subscribed!",position:"topRight"})}catch(a){a.response?a.response.status===409?(m.reset(),y.warning({title:"OK",message:"Subscription already exists.",position:"topRight"})):y.error({title:"Oops",message:a.response.statusText,position:"topRight"}):y.error({title:"Oops",message:a.message,position:"topRight"})}finally{E()}};m.addEventListener("submit",r)})();const F=document.querySelector(".js-menu-backdrop"),oe=document.querySelector(".js-open-menu"),re=document.querySelector(".js-close-menu"),ne=document.querySelector(".js-menu-link");function v(){F.classList.toggle("is-open")}function ae(e){if(window.location.href===e.target.href){e.preventDefault();return}v()}function ie({target:e}){e.closest("#mob-menu")||v()}oe.addEventListener("click",v);re.addEventListener("click",v);ne.addEventListener("click",ae);F.addEventListener("click",ie);const f=document.getElementById("scrollBtn");f.addEventListener("click",e=>{e.preventDefault(),window.scrollTo({top:0,behavior:"smooth"}),f.blur()});window.addEventListener("scroll",()=>{window.scrollY>50?f.style.display="flex":f.style.display="none"});async function ce(e){const s=localStorage.getItem(u);if(!s)return console.log("No data found in local storage"),null;const o=JSON.parse(s)[e];return o||(console.log(`No object found for key: ${e}`),null)}function le(e){const s="#excercise-card-detail-template",t=[],o=document.querySelector(s).content.cloneNode(!0);o.querySelector(".card-details-title").textContent="Burned Calories:",o.querySelector(".card-details-value").textContent=`${e.burnedCalories} / ${e.time} min`,t.push(o);const r=document.querySelector(s).content.cloneNode(!0);r.querySelector(".card-details-title").textContent="Body Part:",r.querySelector(".card-details-value").textContent=e.bodyPart[0].toUpperCase()+e.bodyPart.slice(1),t.push(r);const n=document.querySelector(s).content.cloneNode(!0);return n.querySelector(".card-details-title").textContent="Target:",n.querySelector(".card-details-value").textContent=e.target[0].toUpperCase()+e.target.slice(1),t.push(n),t}function de(e){const t=document.querySelector("#excercise-card-template").content.cloneNode(!0),o="_id";t.children[0].dataset.id=e[o],t.querySelector(".card-category").textContent=e.bodyPart,t.querySelector(".rating-value").textContent=e.rating.toFixed(1),t.querySelector(".start-button").addEventListener("click",a=>{a.preventDefault(),h(e[o])}),t.querySelector(".card-title").textContent=e.name[0].toUpperCase()+e.name.slice(1);const n=t.querySelector(".card-details-list");return le(e).forEach(a=>{n.append(a)}),t}function $(){const e=document.getElementById("exerciseList"),s=document.getElementById("exerciseListEmpty");e&&(e.innerHTML="");const t=JSON.parse(localStorage.getItem(u))||[],o=Object.keys(t),r=document.createDocumentFragment();if(o.length===0&&s)s.classList.remove("visually-hidden");else if(e){b();const n=o.map(a=>ce(a).then(l=>de(l)));Promise.all(n).then(a=>{a.forEach(l=>{r.appendChild(l)}),E(),e.appendChild(r)}).then(()=>{document.querySelectorAll(".card-category").forEach(l=>{const d=document.createElement("button");d.className="remove-button",d.innerHTML='<div class="remove-btn-icon"><svg width="16" height="16" viewBox="0 0 14 16" xmlns="http://www.w3.org/2000/svg"><path d="M9.66667 4.00004V3.46671C9.66667 2.71997 9.66667 2.3466 9.52134 2.06139C9.39351 1.8105 9.18954 1.60653 8.93865 1.4787C8.65344 1.33337 8.28007 1.33337 7.53333 1.33337H6.46667C5.71993 1.33337 5.34656 1.33337 5.06135 1.4787C4.81046 1.60653 4.60649 1.8105 4.47866 2.06139C4.33333 2.3466 4.33333 2.71997 4.33333 3.46671V4.00004M5.66667 7.66671V11M8.33333 7.66671V11M1 4.00004H13M11.6667 4.00004V11.4667C11.6667 12.5868 11.6667 13.1469 11.4487 13.5747C11.2569 13.951 10.951 14.257 10.5746 14.4487C10.1468 14.6667 9.58677 14.6667 8.46667 14.6667H5.53333C4.41323 14.6667 3.85318 14.6667 3.42535 14.4487C3.04903 14.257 2.74307 13.951 2.55132 13.5747C2.33333 13.1469 2.33333 12.5868 2.33333 11.4667V4.00004" stroke="#242424" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" fill="none"/></svg></div>';const S=l.closest(".excercise-card-item").getAttribute("data-id");d.setAttribute("data-id",S),l.insertAdjacentElement("afterend",d),d.addEventListener("click",()=>{const T=d.getAttribute("data-id");P(T),$()})})})}}window.onload=()=>{$()};
//# sourceMappingURL=main-DRsO_WUE.js.map
