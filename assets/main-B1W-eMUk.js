import{a as f,h as C,i as u}from"./vendor-CtRQQMrb.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))r(o);new MutationObserver(o=>{for(const n of o)if(n.type==="childList")for(const a of n.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&r(a)}).observe(document,{childList:!0,subtree:!0});function t(o){const n={};return o.integrity&&(n.integrity=o.integrity),o.referrerPolicy&&(n.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?n.credentials="include":o.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function r(o){if(o.ep)return;o.ep=!0;const n=t(o);fetch(o.href,n)}})();function S(){document.querySelector(".loader-overlay").style.display="flex"}function x(){document.querySelector(".loader-overlay").style.display="none"}const i={filters:[{name:"Muscles",value:"muscles"},{name:"Body parts",value:"bodypart"},{name:"Equipment",value:"equipment"}],selectedFilter:null,selectedCategory:null,keyword:"",currentPage:1,totalPages:1,isMobile:()=>window.innerWidth<768,selectFilter(e){this.selectedFilter=e,this.selectedCategory=null,this.page=1},selectCategory(e){this.selectedCategory=e,this.page=1},setKeyword(e){this.keyword=e,this.page=1},async getRequestResults(e,s){S();const{data:t}=await f.get(e,s);return this.totalPages=t.totalPages,x(),t.results},async getCategories(){const e={filter:this.selectedFilter.name,page:this.currentPage,limit:this.isMobile()?9:12};return this.getRequestResults("https://your-energy.b.goit.study/api/filters",{params:e})},async getExercises(){const e={page:this.currentPage,limit:this.isMobile()?8:10};return e[this.selectedFilter.value]=this.selectedCategory.name,this.keyword&&(e.keyword=this.keyword),this.getRequestResults("https://your-energy.b.goit.study/api/exercises",{params:e})}};function w(e){const s=document.querySelector(".exercises-categories,.exercises-list-container"),t=s.querySelector(".pagination");if(i.totalPages<2){t&&t.remove();return}const r=document.createElement("ul");r.classList.add("pagination");for(let o=1;o<=i.totalPages;o+=1){const n=document.createElement("li");n.classList.add("pagination-item"),n.textContent=o,o===i.currentPage?n.classList.add("pagination-item-current"):n.addEventListener("click",()=>{e(o)}),r.appendChild(n),t?s.replaceChild(r,t):s.appendChild(r)}}function m(e){const t=e.charAt(0).toUpperCase(),r=e.slice(1);return t+r}function O(e){const s=e.trim();if(s){const t=JSON.parse(localStorage.getItem("favorites"))||[];t.includes(s)||(t.push(s),localStorage.setItem("favorites",JSON.stringify(t)))}}const c={dialog:document.querySelector('[data-modal="exercise"]'),closeBtn:document.querySelector("[data-modal-close]"),favouritesBtn:document.querySelector("[data-add-favourites]"),ratingBtn:document.querySelector("[data-rating-open]"),exercisesLayout:document.querySelector("[data-exercise]")},F=()=>c.dialog.showModal(),I=()=>c.dialog.close(),R=e=>{const t=e.currentTarget.dataset.addFavourites;O(t),console.log(`Click on favourites btn ${t}`)},T=()=>{console.log("Click on rating btn")},A=async e=>(await fetch(`https://your-energy.b.goit.study/api/exercises/${e}`)).json(),U=e=>{const{bodyPart:s,equipment:t,gifUrl:r,name:o,target:n,description:a,rating:d,burnedCalories:b,time:M,popularity:$}=e;return`<div class="modal-ill">
      <img
        src="${r}"
        alt="${o}"
        width="295"
        height="258"
        loading="lazy"
      />
    </div>
    <h2 class="modal-caption">${m(o)}</h2>
    <div class="modal-rating">
      <p>${d}</p>
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
        <p class="modal-meta-info">${m(n)}</p>
      </li>
      <li>
        <h3 class="modal-meta-caption">Body Part</h3>
        <p class="modal-meta-info">${m(s)}</p>
      </li>
      <li>
        <h3 class="modal-meta-caption">Equipment</h3>
        <p class="modal-meta-info">${m(t)}</p>
      </li>
      <li>
        <h3 class="modal-meta-caption">Popular</h3>
        <p class="modal-meta-info">${$}</p>
      </li>
      <li>
        <h3 class="modal-meta-caption">Burned Calories</h3>
        <p class="modal-meta-info">${b}/${M} min</p>
      </li>
    </ul>
    <p class="modal-desc">${a}</p>`};async function h(e){const s=await A(e),t=U(s),r=c.dialog.querySelector(".modal-body"),o=c.dialog.querySelector(".modal-btn[data-add-favourites]");o.dataset.addFavourites=e,r.innerHTML=t,F()}c.closeBtn&&c.closeBtn.addEventListener("click",I);c.favouritesBtn&&c.favouritesBtn.addEventListener("click",R);c.ratingBtn&&c.ratingBtn.addEventListener("click",T);c.exercisesLayout&&c.exercisesLayout.addEventListener("click",h);function K(e){const s="#excercise-card-detail-template",t=[],r=document.querySelector(s).content.cloneNode(!0);r.querySelector(".card-details-title").textContent="Burned Calories:",r.querySelector(".card-details-value").textContent=`${e.burnedCalories} / ${e.time} min`,t.push(r);const o=document.querySelector(s).content.cloneNode(!0);o.querySelector(".card-details-title").textContent="Body Part:",o.querySelector(".card-details-value").textContent=e.bodyPart[0].toUpperCase()+e.bodyPart.slice(1),t.push(o);const n=document.querySelector(s).content.cloneNode(!0);return n.querySelector(".card-details-title").textContent="Target:",n.querySelector(".card-details-value").textContent=e.target[0].toUpperCase()+e.target.slice(1),t.push(n),t}function Y(e){const t=document.querySelector("#excercise-card-template").content.cloneNode(!0),r="_id";t.children[0].dataset.id=e[r],t.querySelector(".card-category").textContent=e.bodyPart,t.querySelector(".rating-value").textContent=e.rating.toFixed(1),t.querySelector(".start-button").addEventListener("click",a=>{a.preventDefault(),h(e[r])}),t.querySelector(".card-title").textContent=e.name[0].toUpperCase()+e.name.slice(1);const n=t.querySelector(".card-details-list");return K(e).forEach(a=>{n.append(a)}),t}async function y(e=1){i.currentPage=e;const s=await i.getExercises(),t=document.querySelector(".exercises-categories,.exercises-list-container");t.classList.remove("exercises-categories"),t.classList.add("exercises-list-container"),t.innerHTML="";const r=document.createElement("ul");r.classList.add("exercises-cards"),s.forEach(o=>{const n=Y(o);n.addEventListener("click",()=>{h(n)}),r.appendChild(n)}),t.appendChild(r),w(o=>y(o))}function j(){const e=document.querySelector(".exercises-search");if(!e)return;const s=document.querySelector(".search-icon");e.addEventListener("input",t=>{t.target.value?s==null||s.classList.add("search-active"):s==null||s.classList.remove("search-active"),i.setKeyword(t.target.value),y()}),s==null||s.addEventListener("click",()=>{i.keyword&&(s==null||s.classList.remove("search-active"),e.value="",i.setKeyword(""),y())})}function J(){document.querySelector(".exercises-search").value=""}function B(){const e=document.querySelector(".exercises-search-container");e&&(i.selectedCategory?e.classList.remove("visually-hidden"):e.classList.add("visually-hidden"),J())}function V(e,s){const t=document.querySelector("#exercise-category-template").content.cloneNode(!0);return t.querySelector("h3").textContent=e.name,t.querySelector("p").textContent=e.filter,t.querySelector(".exercise-category").style.backgroundImage=`url(${e.imgURL})`,s&&t.querySelector(".exercise-category").addEventListener("click",()=>s(e)),t}function k(){if(!i.selectedCategory){document.querySelector(".exercises-header-selected-category").classList.add("visually-hidden"),document.querySelector(".exercises-header-category-name").textContent="";return}document.querySelector(".exercises-header-category-name").textContent=i.selectedCategory.name,document.querySelector(".exercises-header-selected-category").classList.remove("visually-hidden")}async function L(e=1){i.currentPage=e;const s=await i.getCategories(),t=document.querySelector(".exercises-categories, .exercises-list-container");if(!t){console.log("Container not found");return}t.classList.add("exercises-categories"),t.classList.remove("exercises-list-container"),t.innerHTML="";const r=document.createElement("ul");r.classList.add("categories-cards"),s.forEach(o=>{const n=V(o,d=>{i.selectCategory(d),k(),B(),y()}),a=document.createElement("li");a.appendChild(n),r.appendChild(a)}),t.appendChild(r),w(o=>L(o))}function _(){const e=document.querySelector(".exercises-filter-list");e&&i.filters.forEach(s=>{const t=document.createElement("li");t.classList.add("exercises-filter-item"),s.value===i.selectedFilter.value&&t.classList.add("exercises-filter-item-active");const r=document.createElement("button");r.setAttribute("type","button"),r.classList.add("exercises-filter-button"),r.textContent=s.name,r.addEventListener("click",async o=>{o.preventDefault(),e.querySelectorAll(".exercises-filter-item").forEach(a=>{a.classList.remove("exercises-filter-item-active")}),t.classList.add("exercises-filter-item-active"),i.selectFilter(s),k(),B(),await L()}),t.appendChild(r),e&&e.appendChild(t)})}document.addEventListener("DOMContentLoaded",async()=>{document.querySelector(".exercises-filters")&&(i.selectFilter(i.filters[0]),_(),j(),await L())});const E="blockquote_cache",P="YYYY-MM-DD";function z(){return C().utc().format(P)}function Q(e,s){return C(e).utc().isSame(C(s,P).utc(),"day")}async function H(){const e=z(),s=localStorage.getItem(E);if(s&&Q(e,s.date))return JSON.parse(s).data;const t=await f.get("https://your-energy.b.goit.study/api/quote"),{data:r}=t;return console.log("dagetBlockQuoteDatata: ",r),r&&localStorage.setItem(E,JSON.stringify({data:r,date:e})),r}(async()=>{const e=await H();(!e||!e.author||!e.quote)&&console.log("Can't retrieve fresh quote of the day data from provider's API");const s=document.querySelector(".quote-block"),t=s.querySelector(".quote-desc"),r=s.querySelector(".quote-author");t.textContent=e.quote,r.textContent=e.author})();const p=document.getElementById("subscribtionForm"),l=p.querySelector('input[name="email"]'),q=document.getElementById("subscribtionFormBtn"),W=e=>/^\w+(\.\w+)?@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(e),N=()=>{const e=l.value.trim();W(e)?(l.style.borderColor="",q.disabled=!1):(e===""?l.style.borderColor="":l.style.borderColor="red",q.disabled=!0)};document.addEventListener("DOMContentLoaded",N);l.addEventListener("input",N);const Z=async e=>{e.preventDefault();try{q.disabled=!0,S(),await f.post("https://your-energy.b.goit.study/api/subscription",JSON.stringify({email:l.value.trim()}),{headers:{"Content-Type":"application/json"}}),p.reset(),u.success({title:"OK",message:"You have subscribed!",position:"topRight"})}catch(s){s.response?s.response.status===409?(p.reset(),u.warning({title:"OK",message:"Subscription already exists.",position:"topRight"})):u.error({title:"Oops",message:s.response.statusText,position:"topRight"}):u.error({title:"Oops",message:s.message,position:"topRight"})}finally{x()}};p.addEventListener("submit",Z);const D=document.querySelector(".js-menu-backdrop"),G=document.querySelector(".js-open-menu"),X=document.querySelector(".js-close-menu"),ee=document.querySelector(".js-menu-link");function v(){D.classList.toggle("is-hidden")}function te(e){if(window.location.href===e.target.href){e.preventDefault();return}v()}function se({target:e}){e.closest("#mob-menu")||v()}G.addEventListener("click",v);X.addEventListener("click",v);ee.addEventListener("click",te);D.addEventListener("click",se);const g=document.getElementById("scrollBtn");g.addEventListener("click",e=>{e.preventDefault(),window.scrollTo({top:0,behavior:"smooth"}),g.blur()});window.addEventListener("scroll",()=>{window.scrollY>50?g.style.display="flex":g.style.display="none"});async function re(e){return(await f.get(`https://your-energy.b.goit.study/api/exercises/${e}`)).data}function oe(e){const s="#excercise-card-detail-template",t=[],r=document.querySelector(s).content.cloneNode(!0);r.querySelector(".card-details-title").textContent="Burned Calories:",r.querySelector(".card-details-value").textContent=`${e.burnedCalories} / ${e.time} min`,t.push(r);const o=document.querySelector(s).content.cloneNode(!0);o.querySelector(".card-details-title").textContent="Body Part:",o.querySelector(".card-details-value").textContent=e.bodyPart[0].toUpperCase()+e.bodyPart.slice(1),t.push(o);const n=document.querySelector(s).content.cloneNode(!0);return n.querySelector(".card-details-title").textContent="Target:",n.querySelector(".card-details-value").textContent=e.target[0].toUpperCase()+e.target.slice(1),t.push(n),t}function ne(e){const t=document.querySelector("#excercise-card-template").content.cloneNode(!0),r="_id";t.children[0].dataset.id=e[r],t.querySelector(".card-category").textContent=e.bodyPart,t.querySelector(".rating-value").textContent=e.rating.toFixed(1),t.querySelector(".start-button").addEventListener("click",a=>{a.preventDefault(),h(e[r])}),t.querySelector(".card-title").textContent=e.name[0].toUpperCase()+e.name.slice(1);const n=t.querySelector(".card-details-list");return oe(e).forEach(a=>{n.append(a)}),t}function ae(){const e=document.getElementById("exerciseList"),s=document.getElementById("exerciseListEmpty");e&&(e.innerHTML="");const t=JSON.parse(localStorage.getItem("favorites"))||[],r=document.createDocumentFragment();if(t.length===0&&s)s.classList.remove("visually-hidden");else if(e){S();const o=t.map(n=>re(n).then(a=>ne(a)));Promise.all(o).then(n=>{n.forEach(a=>{r.appendChild(a)}),x(),e.appendChild(r)})}}window.onload=()=>{ae()};console.log("Working ✨");
//# sourceMappingURL=main-B1W-eMUk.js.map
