import{a as m}from"./vendor-ZJedTZfi.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))a(t);new MutationObserver(t=>{for(const o of t)if(o.type==="childList")for(const l of o.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&a(l)}).observe(document,{childList:!0,subtree:!0});function n(t){const o={};return t.integrity&&(o.integrity=t.integrity),t.referrerPolicy&&(o.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?o.credentials="include":t.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function a(t){if(t.ep)return;t.ep=!0;const o=n(t);fetch(t.href,o)}})();const i=document.getElementById("subscribtionForm"),r=i.querySelector('input[name="email"]'),c=document.getElementById("subscribtionFormBtn"),p=s=>/^\w+(\.\w+)?@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(s),d=()=>{const s=r.value.trim(),e=p(s),n=getComputedStyle(document.documentElement).getPropertyValue("--color-white");e?(r.style.borderColor=n,c.disabled=!1):(s===""?r.style.borderColor=n:r.style.borderColor="red",c.disabled=!0)};document.addEventListener("DOMContentLoaded",d);r.addEventListener("input",d);const f=async s=>{s.preventDefault();try{c.disabled=!0;const e=await m.post("https://your-energy.b.goit.study/api/subscription",JSON.stringify({email:r.value.trim()}),{headers:{"Content-Type":"application/json"}});i.reset(),console.log("Successful operation:",e.status,e.statusText)}catch(e){e.response?e.response.status===409?(i.reset(),console.log("Subscription already exists:",e.response.status,e.response.statusText)):console.log("Server Error:",e.response.status,e.response.statusText):console.log("Error:",e.message)}};i.addEventListener("submit",f);const u=document.getElementById("scrollBtn");u.addEventListener("click",s=>{s.preventDefault(),window.scrollTo({top:0,behavior:"smooth"}),u.blur()});console.log("Working ✨");
//# sourceMappingURL=main-ehxEXm1a.js.map
