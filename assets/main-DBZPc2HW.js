import{a as y,i as d}from"./vendor-BxImpeud.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))r(s);new MutationObserver(s=>{for(const o of s)if(o.type==="childList")for(const i of o.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&r(i)}).observe(document,{childList:!0,subtree:!0});function n(s){const o={};return s.integrity&&(o.integrity=s.integrity),s.referrerPolicy&&(o.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?o.credentials="include":s.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function r(s){if(s.ep)return;s.ep=!0;const o=n(s);fetch(s.href,o)}})();const S=9,x=12;function C(e,t,n){const r=document.querySelector("#exercise-category-template").content.cloneNode(!0);return r.querySelector("h3").textContent=e.name,r.querySelector("p").textContent=t,r.querySelector(".exercise-category").style.backgroundImage=`url(${e.imgURL})`,r}async function k(e,t=1,n=12){const r={params:{filter:e,page:t,limit:n}},s=JSON.stringify(r),o=sessionStorage.getItem(s);if(o)return JSON.parse(o);const i=await y.get("https://your-energy.b.goit.study/api/filters",r),{data:a}=i;return a&&sessionStorage.setItem(s,JSON.stringify(a)),a}function q(){return window.innerWidth<=375?S:x}function w(e,t,n){const r=document.querySelector(e);if(!r){console.log("Container not found");return}r.innerHTML="";const s=document.createElement("ul");t.forEach(o=>{const i=C(o,n),a=document.createElement("li");a.appendChild(i),s.appendChild(a)}),r.appendChild(s)}document.addEventListener("DOMContentLoaded",()=>{const e=document.querySelectorAll(".exercises-filter-list li");e.forEach(t=>{t.addEventListener("click",async()=>{e.forEach(a=>{a.classList.remove("exercises-filter-item-active")}),t.classList.add("exercises-filter-item-active");const n=t.querySelector(".exercises-filter-button").textContent.trim(),r=Number(document.querySelector(".exercises-filter-current-page")||1),s=q(),o=await k(n,r,s),{totalPages:i=0}=o;console.log("filterItemCategories: ",o),console.log("totalPages: ",i),w(".exercises-categories",o.results,n)})})});const m=document.getElementById("subscribtionForm"),l=m.querySelector('input[name="email"]'),p=document.getElementById("subscribtionFormBtn"),B=e=>/^\w+(\.\w+)?@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(e),h=()=>{const e=l.value.trim();B(e)?(l.style.borderColor="",p.disabled=!1):(e===""?l.style.borderColor="":l.style.borderColor="red",p.disabled=!0)};document.addEventListener("DOMContentLoaded",h);l.addEventListener("input",h);const I=async e=>{e.preventDefault();try{p.disabled=!0,await y.post("https://your-energy.b.goit.study/api/subscription",JSON.stringify({email:l.value.trim()}),{headers:{"Content-Type":"application/json"}}),m.reset(),d.success({title:"OK",message:"You have subscribed!",position:"topRight"})}catch(t){t.response?t.response.status===409?(m.reset(),d.warning({title:"OK",message:"Subscription already exists.",position:"topRight"})):d.error({title:"Oops",message:t.response.statusText,position:"topRight"}):d.error({title:"Oops",message:t.message,position:"topRight"})}};m.addEventListener("submit",I);const v=document.querySelector(".js-menu-backdrop"),M=document.querySelector(".js-open-menu"),O=document.querySelector(".js-close-menu"),T=document.querySelector(".js-menu-link");function g(){v.classList.toggle("is-hidden")}function P(e){if(window.location.href===e.target.href){e.preventDefault();return}g()}function $({target:e}){e.closest("#mob-menu")||g()}M.addEventListener("click",g);O.addEventListener("click",g);T.addEventListener("click",P);v.addEventListener("click",$);const f=document.getElementById("scrollBtn");f.addEventListener("click",e=>{e.preventDefault(),window.scrollTo({top:0,behavior:"smooth"}),f.blur()});function u(e){const n=e.charAt(0).toUpperCase(),r=e.slice(1);return n+r}const c={dialog:document.querySelector('[data-modal="exercise"]'),closeBtn:document.querySelector("[data-modal-close]"),favouritesBtn:document.querySelector("[data-add-favourites]"),ratingBtn:document.querySelector("[data-rating-open]"),exercisesLayout:document.querySelector("[data-exercise]")},N=()=>c.dialog.showModal(),R=()=>c.dialog.close(),D=e=>{const n=e.currentTarget.dataset.addFavourites;console.log(`Click on favourites btn ${n}`)},F=()=>{console.log("Click on rating btn")},_=async e=>(await fetch(`https://your-energy.b.goit.study/api/exercises/${e}`)).json(),j=e=>{const{bodyPart:t,equipment:n,gifUrl:r,name:s,target:o,description:i,rating:a,burnedCalories:b,time:L,popularity:E}=e;return`<div class="modal-ill">
      <img
        src="${r}"
        alt="${s}"
        width="295"
        height="258"
        loading="lazy"
      />
    </div>
    <h2 class="modal-caption">${u(s)}</h2>
    <div class="modal-rating">
      <p>${a}</p>
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
        <p class="modal-meta-info">${u(o)}</p>
      </li>
      <li>
        <h3 class="modal-meta-caption">Body Part</h3>
        <p class="modal-meta-info">${u(t)}</p>
      </li>
      <li>
        <h3 class="modal-meta-caption">Equipment</h3>
        <p class="modal-meta-info">${u(n)}</p>
      </li>
      <li>
        <h3 class="modal-meta-caption">Popular</h3>
        <p class="modal-meta-info">${E}</p>
      </li>
      <li>
        <h3 class="modal-meta-caption">Burned Calories</h3>
        <p class="modal-meta-info">${b}/${L} min</p>
      </li>
    </ul>
    <p class="modal-desc">${i}</p>`},A=async e=>{let{target:t}=e,n;if(t===e.currentTarget)return;for(;t&&t!==void 0;){if(t.classList.contains("js-exercise-category")){n=t.dataset.id;break}t=t.parentElement}const r=await _(n),s=j(r),o=c.dialog.querySelector(".modal-body"),i=c.dialog.querySelector(".modal-btn[data-add-favourites]");i.dataset.addFavourites=n,o.innerHTML=s,N()};c.closeBtn.addEventListener("click",R);c.favouritesBtn.addEventListener("click",D);c.ratingBtn.addEventListener("click",F);c.exercisesLayout.addEventListener("click",A);console.log("Working ✨");
//# sourceMappingURL=main-DBZPc2HW.js.map
