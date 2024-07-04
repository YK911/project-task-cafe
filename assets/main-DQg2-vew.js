import{a as g,h,i as d}from"./vendor-CtRQQMrb.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))o(n);new MutationObserver(n=>{for(const r of n)if(r.type==="childList")for(const i of r.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&o(i)}).observe(document,{childList:!0,subtree:!0});function t(n){const r={};return n.integrity&&(r.integrity=n.integrity),n.referrerPolicy&&(r.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?r.credentials="include":n.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function o(n){if(n.ep)return;n.ep=!0;const r=t(n);fetch(n.href,r)}})();const P=9,D=12,L="blockquote_cache",q="YYYY-MM-DD";function $(e,s){const t=document.querySelector("#exercise-category-template").content.cloneNode(!0);return t.querySelector("h3").textContent=e.name,t.querySelector("p").textContent=e.filter,t.querySelector(".exercise-category").style.backgroundImage=`url(${e.imgURL})`,s&&t.querySelector(".exercise-category").addEventListener("click",()=>s(e)),t}function u(e){const t=e.charAt(0).toUpperCase(),o=e.slice(1);return t+o}function b(){const e=document.getElementById("exerciseList"),s=document.getElementById("exerciseListEmpty");e&&(e.innerHTML="");const t=JSON.parse(localStorage.getItem("exercises"))||[];t.length===0&&s?s.classList.remove("visually-hidden"):t.forEach(o=>{const n=document.createElement("li");n.textContent=o,e.appendChild(n)})}function R(e){const s=e.trim();if(s){const t=JSON.parse(localStorage.getItem("exercises"))||[];t.push(s),localStorage.setItem("exercises",JSON.stringify(t)),b()}}window.onload=()=>{b()};const c={dialog:document.querySelector('[data-modal="exercise"]'),closeBtn:document.querySelector("[data-modal-close]"),favouritesBtn:document.querySelector("[data-add-favourites]"),ratingBtn:document.querySelector("[data-rating-open]"),exercisesLayout:document.querySelector("[data-exercise]")},F=()=>c.dialog.showModal(),_=()=>c.dialog.close(),A=e=>{const t=e.currentTarget.dataset.addFavourites;R(t),console.log(`Click on favourites btn ${t}`)},Y=()=>{console.log("Click on rating btn")},J=async e=>(await fetch(`https://your-energy.b.goit.study/api/exercises/${e}`)).json(),W=e=>{const{bodyPart:s,equipment:t,gifUrl:o,name:n,target:r,description:i,rating:a,burnedCalories:y,time:N,popularity:M}=e;return`<div class="modal-ill">
      <img
        src="${o}"
        alt="${n}"
        width="295"
        height="258"
        loading="lazy"
      />
    </div>
    <h2 class="modal-caption">${u(n)}</h2>
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
        <p class="modal-meta-info">${u(r)}</p>
      </li>
      <li>
        <h3 class="modal-meta-caption">Body Part</h3>
        <p class="modal-meta-info">${u(s)}</p>
      </li>
      <li>
        <h3 class="modal-meta-caption">Equipment</h3>
        <p class="modal-meta-info">${u(t)}</p>
      </li>
      <li>
        <h3 class="modal-meta-caption">Popular</h3>
        <p class="modal-meta-info">${M}</p>
      </li>
      <li>
        <h3 class="modal-meta-caption">Burned Calories</h3>
        <p class="modal-meta-info">${y}/${N} min</p>
      </li>
    </ul>
    <p class="modal-desc">${i}</p>`};async function S(e){const s=await J(e),t=W(s),o=c.dialog.querySelector(".modal-body"),n=c.dialog.querySelector(".modal-btn[data-add-favourites]");n.dataset.addFavourites=e,o.innerHTML=t,F()}c.closeBtn&&c.closeBtn.addEventListener("click",_);c.favouritesBtn&&c.favouritesBtn.addEventListener("click",A);c.ratingBtn&&c.ratingBtn.addEventListener("click",Y);c.exercisesLayout&&c.exercisesLayout.addEventListener("click",S);let w;function U(){document.querySelector(".loader-overlay").style.display="flex"}function B(){w=setTimeout(U,500)}function I(){clearTimeout(w),document.querySelector(".loader-overlay").style.display="none"}function V(e){const s="#excercise-card-detail-template",t=[],o=document.querySelector(s).content.cloneNode(!0);o.querySelector(".card-details-title").textContent="Burned Calories:",o.querySelector(".card-details-value").textContent=`${e.burnedCalories} / ${e.time} min`,t.push(o);const n=document.querySelector(s).content.cloneNode(!0);n.querySelector(".card-details-title").textContent="Body Part:",n.querySelector(".card-details-value").textContent=e.bodyPart[0].toUpperCase()+e.bodyPart.slice(1),t.push(n);const r=document.querySelector(s).content.cloneNode(!0);return r.querySelector(".card-details-title").textContent="Target:",r.querySelector(".card-details-value").textContent=e.target[0].toUpperCase()+e.target.slice(1),t.push(r),t}function j(e){const t=document.querySelector("#excercise-card-template").content.cloneNode(!0),o="_id";t.children[0].dataset.id=e[o],t.querySelector(".card-category").textContent=e.bodyPart,t.querySelector(".rating-value").textContent=e.rating.toFixed(1),t.querySelector(".start-button").addEventListener("click",i=>{i.preventDefault(),S(e[o])}),t.querySelector(".card-title").textContent=e.name[0].toUpperCase()+e.name.slice(1);const r=t.querySelector(".card-details-list");return V(e).forEach(i=>{r.append(i)}),t}function K(){return window.innerWidth<768?8:10}async function Q(e,s=1){const t={page:s,limit:K()};return t[e.filter.toLowerCase()]=e.name,(await g.get("https://your-energy.b.goit.study/api/exercises",{params:t})).data}async function k(e,s=1){B();const t=await Q(e,s);I();const o=document.querySelector(".exercises-categories,.exercises-list-container");o.classList.remove("exercises-categories"),o.classList.add("exercises-list-container"),o.innerHTML="";const n=document.createElement("ul");if(n.classList.add("exercises-cards"),t.results.forEach(r=>{const i=j(r);i.addEventListener("click",()=>{S(i)}),n.appendChild(i)}),o.appendChild(n),t.totalPages>1){const r=document.createElement("ul");r.classList.add("pagination");for(let i=1;i<=t.totalPages;i+=1){const a=document.createElement("li");a.classList.add("pagination-item"),a.textContent=i,i===t.page?a.classList.add("pagination-item-current"):a.addEventListener("click",()=>{k(e,i)}),r.appendChild(a),o.appendChild(r)}}}async function x(e,s=1,t=12){const o={params:{filter:e,page:s,limit:t}},n=JSON.stringify(o),r=sessionStorage.getItem(n);if(r)return JSON.parse(r);const i=await g.get("https://your-energy.b.goit.study/api/filters",o),{data:a}=i;return a&&sessionStorage.setItem(n,JSON.stringify(a)),a}function E(){return window.innerWidth<=375?P:D}function C(e,s){const t=document.querySelector(e);if(!t){console.log("Container not found");return}t.classList.add("exercises-categories"),t.classList.remove("exercises-list-container"),t.innerHTML="";const o=document.createElement("ul");s.forEach(n=>{const r=$(n,a=>k(a)),i=document.createElement("li");i.appendChild(r),o.appendChild(i)}),t.appendChild(o)}document.addEventListener("DOMContentLoaded",async()=>{const e=document.querySelectorAll(".exercises-filter-list li"),s=e[0].querySelector(".exercises-filter-button").textContent.trim(),t=await x(s,1,E());C(".exercises-categories, .exercises-list-container",t.results),e.forEach(o=>{o.addEventListener("click",async()=>{e.forEach(y=>{y.classList.remove("exercises-filter-item-active")}),o.classList.add("exercises-filter-item-active");const n=o.querySelector(".exercises-filter-button").textContent.trim(),r=Number(document.querySelector(".exercises-filter-current-page")||1),i=E(),a=await x(n,r,i);C(".exercises-categories, .exercises-list-container",a.results)})})});function z(){return h().utc().format(q)}function H(e,s){return h(e).utc().isSame(h(s,q).utc(),"day")}async function Z(){const e=z(),s=localStorage.getItem(L);if(s&&H(e,s.date))return JSON.parse(s).data;const t=await g.get("https://your-energy.b.goit.study/api/quote"),{data:o}=t;return console.log("dagetBlockQuoteDatata: ",o),o&&localStorage.setItem(L,JSON.stringify({data:o,date:e})),o}(async()=>{const e=await Z();(!e||!e.author||!e.quote)&&console.log("Can't retrieve fresh quote of the day data from provider's API");const s=document.querySelector(".quote-block"),t=s.querySelector(".quote-desc"),o=s.querySelector(".quote-author");t.textContent=e.quote,o.textContent=e.author})();const m=document.getElementById("subscribtionForm"),l=m.querySelector('input[name="email"]'),v=document.getElementById("subscribtionFormBtn"),G=e=>/^\w+(\.\w+)?@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(e),T=()=>{const e=l.value.trim();G(e)?(l.style.borderColor="",v.disabled=!1):(e===""?l.style.borderColor="":l.style.borderColor="red",v.disabled=!0)};document.addEventListener("DOMContentLoaded",T);l.addEventListener("input",T);const X=async e=>{e.preventDefault();try{v.disabled=!0,B(),await g.post("https://your-energy.b.goit.study/api/subscription",JSON.stringify({email:l.value.trim()}),{headers:{"Content-Type":"application/json"}}),I(),m.reset(),d.success({title:"OK",message:"You have subscribed!",position:"topRight"})}catch(s){s.response?s.response.status===409?(m.reset(),d.warning({title:"OK",message:"Subscription already exists.",position:"topRight"})):d.error({title:"Oops",message:s.response.statusText,position:"topRight"}):d.error({title:"Oops",message:s.message,position:"topRight"})}};m.addEventListener("submit",X);const O=document.querySelector(".js-menu-backdrop"),ee=document.querySelector(".js-open-menu"),te=document.querySelector(".js-close-menu"),se=document.querySelector(".js-menu-link");function f(){O.classList.toggle("is-hidden")}function oe(e){if(window.location.href===e.target.href){e.preventDefault();return}f()}function ne({target:e}){e.closest("#mob-menu")||f()}ee.addEventListener("click",f);te.addEventListener("click",f);se.addEventListener("click",oe);O.addEventListener("click",ne);const p=document.getElementById("scrollBtn");p.addEventListener("click",e=>{e.preventDefault(),window.scrollTo({top:0,behavior:"smooth"}),p.blur()});window.addEventListener("scroll",()=>{window.scrollY>50?p.style.display="flex":p.style.display="none"});console.log("Working ✨");
//# sourceMappingURL=main-DQg2-vew.js.map
