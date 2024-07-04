import{a as y,i as u}from"./vendor-BxImpeud.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const n of r.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&i(n)}).observe(document,{childList:!0,subtree:!0});function o(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(s){if(s.ep)return;s.ep=!0;const r=o(s);fetch(s.href,r)}})();const w=9,q=12;function B(e,t){const o=document.querySelector("#exercise-category-template").content.cloneNode(!0);return o.querySelector("h3").textContent=e.name,o.querySelector("p").textContent=e.filter,o.querySelector(".exercise-category").style.backgroundImage=`url(${e.imgURL})`,t&&o.querySelector(".exercise-category").addEventListener("click",()=>t(e)),o}async function h(e,t=1,o=12){const i={params:{filter:e,page:t,limit:o}},s=JSON.stringify(i),r=sessionStorage.getItem(s);if(r)return JSON.parse(r);const n=await y.get("https://your-energy.b.goit.study/api/filters",i),{data:a}=n;return a&&sessionStorage.setItem(s,JSON.stringify(a)),a}async function k(e,t=1,o=12){const i={params:{limit:o,page:t}};i.params[e.filter]=e.name;const s=JSON.stringify(i),r=sessionStorage.getItem(s);if(r)return JSON.parse(r);const n=await y.get("https://your-energy.b.goit.study/api/exercises",i),{data:a}=n;return a&&sessionStorage.setItem(s,JSON.stringify(a)),a}function v(){return window.innerWidth<=375?w:q}function b(e,t){const o=document.querySelector(e);if(!o){console.log("Container not found");return}o.innerHTML="";const i=document.createElement("ul");t.forEach(s=>{const r=B(s,async a=>{const d=await k(a);console.log(d.results)}),n=document.createElement("li");n.appendChild(r),i.appendChild(n)}),o.appendChild(i)}document.addEventListener("DOMContentLoaded",async()=>{const e=document.querySelectorAll(".exercises-filter-list li"),t=e[0].querySelector(".exercises-filter-button").textContent.trim(),o=await h(t,1,v());b(".exercises-categories",o.results),e.forEach(i=>{i.addEventListener("click",async()=>{e.forEach(d=>{d.classList.remove("exercises-filter-item-active")}),i.classList.add("exercises-filter-item-active");const s=i.querySelector(".exercises-filter-button").textContent.trim(),r=Number(document.querySelector(".exercises-filter-current-page")||1),n=v(),a=await h(s,r,n);b(".exercises-categories",a.results)})})});const g=document.getElementById("subscribtionForm"),l=g.querySelector('input[name="email"]'),p=document.getElementById("subscribtionFormBtn"),I=e=>/^\w+(\.\w+)?@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(e),S=()=>{const e=l.value.trim();I(e)?(l.style.borderColor="",p.disabled=!1):(e===""?l.style.borderColor="":l.style.borderColor="red",p.disabled=!0)};document.addEventListener("DOMContentLoaded",S);l.addEventListener("input",S);const O=async e=>{e.preventDefault();try{p.disabled=!0,await y.post("https://your-energy.b.goit.study/api/subscription",JSON.stringify({email:l.value.trim()}),{headers:{"Content-Type":"application/json"}}),g.reset(),u.success({title:"OK",message:"You have subscribed!",position:"topRight"})}catch(t){t.response?t.response.status===409?(g.reset(),u.warning({title:"OK",message:"Subscription already exists.",position:"topRight"})):u.error({title:"Oops",message:t.response.statusText,position:"topRight"}):u.error({title:"Oops",message:t.message,position:"topRight"})}};g.addEventListener("submit",O);const E=document.querySelector(".js-menu-backdrop"),M=document.querySelector(".js-open-menu"),T=document.querySelector(".js-close-menu"),N=document.querySelector(".js-menu-link");function f(){E.classList.toggle("is-hidden")}function $(e){if(window.location.href===e.target.href){e.preventDefault();return}f()}function P({target:e}){e.closest("#mob-menu")||f()}M.addEventListener("click",f);T.addEventListener("click",f);N.addEventListener("click",$);E.addEventListener("click",P);const L=document.getElementById("scrollBtn");L.addEventListener("click",e=>{e.preventDefault(),window.scrollTo({top:0,behavior:"smooth"}),L.blur()});function m(e){const o=e.charAt(0).toUpperCase(),i=e.slice(1);return o+i}const c={dialog:document.querySelector('[data-modal="exercise"]'),closeBtn:document.querySelector("[data-modal-close]"),favouritesBtn:document.querySelector("[data-add-favourites]"),ratingBtn:document.querySelector("[data-rating-open]"),exercisesLayout:document.querySelector("[data-exercise]")},R=()=>c.dialog.showModal(),F=()=>c.dialog.close(),D=e=>{const o=e.currentTarget.dataset.addFavourites;console.log(`Click on favourites btn ${o}`)},_=()=>{console.log("Click on rating btn")},j=async e=>(await fetch(`https://your-energy.b.goit.study/api/exercises/${e}`)).json(),J=e=>{const{bodyPart:t,equipment:o,gifUrl:i,name:s,target:r,description:n,rating:a,burnedCalories:d,time:x,popularity:C}=e;return`<div class="modal-ill">
      <img
        src="${i}"
        alt="${s}"
        width="295"
        height="258"
        loading="lazy"
      />
    </div>
    <h2 class="modal-caption">${m(s)}</h2>
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
        <p class="modal-meta-info">${m(r)}</p>
      </li>
      <li>
        <h3 class="modal-meta-caption">Body Part</h3>
        <p class="modal-meta-info">${m(t)}</p>
      </li>
      <li>
        <h3 class="modal-meta-caption">Equipment</h3>
        <p class="modal-meta-info">${m(o)}</p>
      </li>
      <li>
        <h3 class="modal-meta-caption">Popular</h3>
        <p class="modal-meta-info">${C}</p>
      </li>
      <li>
        <h3 class="modal-meta-caption">Burned Calories</h3>
        <p class="modal-meta-info">${d}/${x} min</p>
      </li>
    </ul>
    <p class="modal-desc">${n}</p>`},V=async e=>{let{target:t}=e,o;if(t===e.currentTarget)return;for(;t&&t!==void 0;){if(t.classList.contains("js-exercise-category")){o=t.dataset.id;break}t=t.parentElement}const i=await j(o),s=J(i),r=c.dialog.querySelector(".modal-body"),n=c.dialog.querySelector(".modal-btn[data-add-favourites]");n.dataset.addFavourites=o,r.innerHTML=s,R()};c.closeBtn.addEventListener("click",F);c.favouritesBtn.addEventListener("click",D);c.ratingBtn.addEventListener("click",_);c.exercisesLayout.addEventListener("click",V);console.log("Working ✨");
//# sourceMappingURL=main-5_omqp6p.js.map
