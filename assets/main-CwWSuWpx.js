import{a as f,h as y,i as d}from"./vendor-CtRQQMrb.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))r(o);new MutationObserver(o=>{for(const n of o)if(n.type==="childList")for(const i of n.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&r(i)}).observe(document,{childList:!0,subtree:!0});function s(o){const n={};return o.integrity&&(n.integrity=o.integrity),o.referrerPolicy&&(n.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?n.credentials="include":o.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function r(o){if(o.ep)return;o.ep=!0;const n=s(o);fetch(o.href,n)}})();const B=9,I=12,v="blockquote_cache",q="YYYY-MM-DD";function O(e,t){const s=document.querySelector("#exercise-category-template").content.cloneNode(!0);return s.querySelector("h3").textContent=e.name,s.querySelector("p").textContent=e.filter,s.querySelector(".exercise-category").style.backgroundImage=`url(${e.imgURL})`,t&&s.querySelector(".exercise-category").addEventListener("click",()=>t(e)),s}async function S(e,t=1,s=12){const r={params:{filter:e,page:t,limit:s}},o=JSON.stringify(r),n=sessionStorage.getItem(o);if(n)return JSON.parse(n);const i=await f.get("https://your-energy.b.goit.study/api/filters",r),{data:a}=i;return a&&sessionStorage.setItem(o,JSON.stringify(a)),a}async function M(e,t=1,s=12){const r={params:{limit:s,page:t}};r.params[e.filter]=e.name;const o=JSON.stringify(r),n=sessionStorage.getItem(o);if(n)return JSON.parse(n);const i=await f.get("https://your-energy.b.goit.study/api/exercises",r),{data:a}=i;return a&&sessionStorage.setItem(o,JSON.stringify(a)),a}function b(){return window.innerWidth<=375?B:I}function E(e,t){const s=document.querySelector(e);if(!s){console.log("Container not found");return}s.innerHTML="";const r=document.createElement("ul");t.forEach(o=>{const n=O(o,async a=>{const u=await M(a);console.log(u.results)}),i=document.createElement("li");i.appendChild(n),r.appendChild(i)}),s.appendChild(r)}document.addEventListener("DOMContentLoaded",async()=>{const e=document.querySelectorAll(".exercises-filter-list li"),t=e[0].querySelector(".exercises-filter-button").textContent.trim(),s=await S(t,1,b());E(".exercises-categories",s.results),e.forEach(r=>{r.addEventListener("click",async()=>{e.forEach(u=>{u.classList.remove("exercises-filter-item-active")}),r.classList.add("exercises-filter-item-active");const o=r.querySelector(".exercises-filter-button").textContent.trim(),n=Number(document.querySelector(".exercises-filter-current-page")||1),i=b(),a=await S(o,n,i);E(".exercises-categories",a.results)})})});function T(){return y().utc().format(q)}function D(e,t){return y(e).utc().isSame(y(t,q).utc(),"day")}async function N(){const e=T(),t=localStorage.getItem(v);if(t&&D(e,t.date))return JSON.parse(t).data;const s=await f.get("https://your-energy.b.goit.study/api/quote"),{data:r}=s;return console.log("dagetBlockQuoteDatata: ",r),r&&localStorage.setItem(v,JSON.stringify({data:r,date:e})),r}(async()=>{const e=await N();(!e||!e.author||!e.quote)&&console.log("Can't retrieve fresh quote of the day data from provider's API");const t=document.querySelector(".quote-block"),s=t.querySelector(".quote-desc"),r=t.querySelector(".quote-author");s.textContent=e.quote,r.textContent=e.author})();const g=document.getElementById("subscribtionForm"),l=g.querySelector('input[name="email"]'),h=document.getElementById("subscribtionFormBtn"),$=e=>/^\w+(\.\w+)?@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(e),x=()=>{const e=l.value.trim();$(e)?(l.style.borderColor="",h.disabled=!1):(e===""?l.style.borderColor="":l.style.borderColor="red",h.disabled=!0)};document.addEventListener("DOMContentLoaded",x);l.addEventListener("input",x);const P=async e=>{e.preventDefault();try{h.disabled=!0,await f.post("https://your-energy.b.goit.study/api/subscription",JSON.stringify({email:l.value.trim()}),{headers:{"Content-Type":"application/json"}}),g.reset(),d.success({title:"OK",message:"You have subscribed!",position:"topRight"})}catch(t){t.response?t.response.status===409?(g.reset(),d.warning({title:"OK",message:"Subscription already exists.",position:"topRight"})):d.error({title:"Oops",message:t.response.statusText,position:"topRight"}):d.error({title:"Oops",message:t.message,position:"topRight"})}};g.addEventListener("submit",P);const C=document.querySelector(".js-menu-backdrop"),R=document.querySelector(".js-open-menu"),F=document.querySelector(".js-close-menu"),_=document.querySelector(".js-menu-link");function p(){C.classList.toggle("is-hidden")}function A(e){if(window.location.href===e.target.href){e.preventDefault();return}p()}function J({target:e}){e.closest("#mob-menu")||p()}R.addEventListener("click",p);F.addEventListener("click",p);_.addEventListener("click",A);C.addEventListener("click",J);const L=document.getElementById("scrollBtn");L.addEventListener("click",e=>{e.preventDefault(),window.scrollTo({top:0,behavior:"smooth"}),L.blur()});function m(e){const s=e.charAt(0).toUpperCase(),r=e.slice(1);return s+r}const c={dialog:document.querySelector('[data-modal="exercise"]'),closeBtn:document.querySelector("[data-modal-close]"),favouritesBtn:document.querySelector("[data-add-favourites]"),ratingBtn:document.querySelector("[data-rating-open]"),exercisesLayout:document.querySelector("[data-exercise]")},Y=()=>c.dialog.showModal(),V=()=>c.dialog.close(),j=e=>{const s=e.currentTarget.dataset.addFavourites;console.log(`Click on favourites btn ${s}`)},K=()=>{console.log("Click on rating btn")},Q=async e=>(await fetch(`https://your-energy.b.goit.study/api/exercises/${e}`)).json(),z=e=>{const{bodyPart:t,equipment:s,gifUrl:r,name:o,target:n,description:i,rating:a,burnedCalories:u,time:k,popularity:w}=e;return`<div class="modal-ill">
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
        <p class="modal-meta-info">${m(n)}</p>
      </li>
      <li>
        <h3 class="modal-meta-caption">Body Part</h3>
        <p class="modal-meta-info">${m(t)}</p>
      </li>
      <li>
        <h3 class="modal-meta-caption">Equipment</h3>
        <p class="modal-meta-info">${m(s)}</p>
      </li>
      <li>
        <h3 class="modal-meta-caption">Popular</h3>
        <p class="modal-meta-info">${w}</p>
      </li>
      <li>
        <h3 class="modal-meta-caption">Burned Calories</h3>
        <p class="modal-meta-info">${u}/${k} min</p>
      </li>
    </ul>
    <p class="modal-desc">${i}</p>`},U=async e=>{let{target:t}=e,s;if(t===e.currentTarget)return;for(;t&&t!==void 0;){if(t.classList.contains("js-exercise-category")){s=t.dataset.id;break}t=t.parentElement}const r=await Q(s),o=z(r),n=c.dialog.querySelector(".modal-body"),i=c.dialog.querySelector(".modal-btn[data-add-favourites]");i.dataset.addFavourites=s,n.innerHTML=o,Y()};c.closeBtn.addEventListener("click",V);c.favouritesBtn.addEventListener("click",j);c.ratingBtn.addEventListener("click",K);c.exercisesLayout.addEventListener("click",U);console.log("Working ✨");
//# sourceMappingURL=main-CwWSuWpx.js.map
