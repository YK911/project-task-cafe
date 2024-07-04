import{a as p,h,i as u}from"./vendor-CtRQQMrb.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))r(o);new MutationObserver(o=>{for(const i of o)if(i.type==="childList")for(const n of i.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&r(n)}).observe(document,{childList:!0,subtree:!0});function s(o){const i={};return o.integrity&&(i.integrity=o.integrity),o.referrerPolicy&&(i.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?i.credentials="include":o.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function r(o){if(o.ep)return;o.ep=!0;const i=s(o);fetch(o.href,i)}})();const k=9,O=12,v="blockquote_cache",b="YYYY-MM-DD";function M(e,t){const s=document.querySelector("#exercise-category-template").content.cloneNode(!0);return s.querySelector("h3").textContent=e.name,s.querySelector("p").textContent=e.filter,s.querySelector(".exercise-category").style.backgroundImage=`url(${e.imgURL})`,t&&s.querySelector(".exercise-category").addEventListener("click",()=>t(e)),s}async function x(e,t=1,s=12){const r={params:{filter:e,page:t,limit:s}},o=JSON.stringify(r),i=sessionStorage.getItem(o);if(i)return JSON.parse(i);const n=await p.get("https://your-energy.b.goit.study/api/filters",r),{data:a}=n;return a&&sessionStorage.setItem(o,JSON.stringify(a)),a}async function T(e,t=1,s=12){const r={params:{limit:s,page:t}};r.params[e.filter]=e.name;const o=JSON.stringify(r),i=sessionStorage.getItem(o);if(i)return JSON.parse(i);const n=await p.get("https://your-energy.b.goit.study/api/exercises",r),{data:a}=n;return a&&sessionStorage.setItem(o,JSON.stringify(a)),a}function E(){return window.innerWidth<=375?k:O}function L(e,t){const s=document.querySelector(e);if(!s){console.log("Container not found");return}s.innerHTML="";const r=document.createElement("ul");t.forEach(o=>{const i=M(o,async a=>{const d=await T(a);console.log(d.results)}),n=document.createElement("li");n.appendChild(i),r.appendChild(n)}),s.appendChild(r)}document.addEventListener("DOMContentLoaded",async()=>{const e=document.querySelectorAll(".exercises-filter-list li"),t=e[0].querySelector(".exercises-filter-button").textContent.trim(),s=await x(t,1,E());L(".exercises-categories",s.results),e.forEach(r=>{r.addEventListener("click",async()=>{e.forEach(d=>{d.classList.remove("exercises-filter-item-active")}),r.classList.add("exercises-filter-item-active");const o=r.querySelector(".exercises-filter-button").textContent.trim(),i=Number(document.querySelector(".exercises-filter-current-page")||1),n=E(),a=await x(o,i,n);L(".exercises-categories",a.results)})})});function N(){return h().utc().format(b)}function D(e,t){return h(e).utc().isSame(h(t,b).utc(),"day")}async function $(){const e=N(),t=localStorage.getItem(v);if(t&&D(e,t.date))return JSON.parse(t).data;const s=await p.get("https://your-energy.b.goit.study/api/quote"),{data:r}=s;return console.log("dagetBlockQuoteDatata: ",r),r&&localStorage.setItem(v,JSON.stringify({data:r,date:e})),r}(async()=>{const e=await $();(!e||!e.author||!e.quote)&&console.log("Can't retrieve fresh quote of the day data from provider's API");const t=document.querySelector(".quote-block"),s=t.querySelector(".quote-desc"),r=t.querySelector(".quote-author");s.textContent=e.quote,r.textContent=e.author})();const g=document.getElementById("subscribtionForm"),l=g.querySelector('input[name="email"]'),S=document.getElementById("subscribtionFormBtn"),P=e=>/^\w+(\.\w+)?@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(e),q=()=>{const e=l.value.trim();P(e)?(l.style.borderColor="",S.disabled=!1):(e===""?l.style.borderColor="":l.style.borderColor="red",S.disabled=!0)};document.addEventListener("DOMContentLoaded",q);l.addEventListener("input",q);const R=async e=>{e.preventDefault();try{S.disabled=!0,await p.post("https://your-energy.b.goit.study/api/subscription",JSON.stringify({email:l.value.trim()}),{headers:{"Content-Type":"application/json"}}),g.reset(),u.success({title:"OK",message:"You have subscribed!",position:"topRight"})}catch(t){t.response?t.response.status===409?(g.reset(),u.warning({title:"OK",message:"Subscription already exists.",position:"topRight"})):u.error({title:"Oops",message:t.response.statusText,position:"topRight"}):u.error({title:"Oops",message:t.message,position:"topRight"})}};g.addEventListener("submit",R);const C=document.querySelector(".js-menu-backdrop"),J=document.querySelector(".js-open-menu"),F=document.querySelector(".js-close-menu"),_=document.querySelector(".js-menu-link");function y(){C.classList.toggle("is-hidden")}function A(e){if(window.location.href===e.target.href){e.preventDefault();return}y()}function Y({target:e}){e.closest("#mob-menu")||y()}J.addEventListener("click",y);F.addEventListener("click",y);_.addEventListener("click",A);C.addEventListener("click",Y);const f=document.getElementById("scrollBtn");f.addEventListener("click",e=>{e.preventDefault(),window.scrollTo({top:0,behavior:"smooth"}),f.blur()});window.addEventListener("scroll",()=>{window.scrollY>50?f.style.display="flex":f.style.display="none"});function m(e){const s=e.charAt(0).toUpperCase(),r=e.slice(1);return s+r}function w(){const e=document.getElementById("exerciseList"),t=document.getElementById("exerciseListEmpty");e&&(e.innerHTML="");const s=JSON.parse(localStorage.getItem("exercises"))||[];s.length===0&&t?t.classList.remove("visually-hidden"):s.forEach(r=>{const o=document.createElement("li");o.textContent=r,e.appendChild(o)})}function V(e){const t=e.trim();if(t){const s=JSON.parse(localStorage.getItem("exercises"))||[];s.push(t),localStorage.setItem("exercises",JSON.stringify(s)),w()}}window.onload=()=>{w()};const c={dialog:document.querySelector('[data-modal="exercise"]'),closeBtn:document.querySelector("[data-modal-close]"),favouritesBtn:document.querySelector("[data-add-favourites]"),ratingBtn:document.querySelector("[data-rating-open]"),exercisesLayout:document.querySelector("[data-exercise]")},j=()=>c.dialog.showModal(),K=()=>c.dialog.close(),Q=e=>{const s=e.currentTarget.dataset.addFavourites;V(s),console.log(`Click on favourites btn ${s}`)},z=()=>{console.log("Click on rating btn")},U=async e=>(await fetch(`https://your-energy.b.goit.study/api/exercises/${e}`)).json(),W=e=>{const{bodyPart:t,equipment:s,gifUrl:r,name:o,target:i,description:n,rating:a,burnedCalories:d,time:I,popularity:B}=e;return`<div class="modal-ill">
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
        <p class="modal-meta-info">${m(i)}</p>
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
        <p class="modal-meta-info">${B}</p>
      </li>
      <li>
        <h3 class="modal-meta-caption">Burned Calories</h3>
        <p class="modal-meta-info">${d}/${I} min</p>
      </li>
    </ul>
    <p class="modal-desc">${n}</p>`},H=async e=>{let{target:t}=e,s;if(t===e.currentTarget)return;for(;t&&t!==void 0;){if(t.classList.contains("js-exercise-category")){s=t.dataset.id;break}t=t.parentElement}const r=await U(s),o=W(r),i=c.dialog.querySelector(".modal-body"),n=c.dialog.querySelector(".modal-btn[data-add-favourites]");n.dataset.addFavourites=s,i.innerHTML=o,j()};c.closeBtn&&c.closeBtn.addEventListener("click",K);c.favouritesBtn&&c.favouritesBtn.addEventListener("click",Q);c.ratingBtn&&c.ratingBtn.addEventListener("click",z);c.exercisesLayout&&c.exercisesLayout.addEventListener("click",H);console.log("Working ✨");
//# sourceMappingURL=main-CJ30YDat.js.map
