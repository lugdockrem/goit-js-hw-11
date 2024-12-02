/* empty css                      */import{i as a}from"./assets/vendor-I1I71QQ2.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const i of r.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&s(i)}).observe(document,{childList:!0,subtree:!0});function n(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function s(e){if(e.ep)return;e.ep=!0;const r=n(e);fetch(e.href,r)}})();const m="47381991-217f0392cb987e93da3bacc78",p="https://pixabay.com/api/";async function g(o){const t=`${p}?key=${m}&q=${encodeURIComponent(o)}&image_type=photo&orientation=horizontal&safesearch=true`,n=await fetch(t);if(!n.ok)throw new Error("Failed to fetch images");return(await n.json()).hits}function y(o){const t=document.querySelector("#gallery");t.innerHTML="";const n=o.map(({webformatURL:s,largeImageURL:e,tags:r,likes:i,views:u,comments:f,downloads:d})=>`
      <li class="gallery-item">
        <a href="${e}" class="gallery-link">
          <img src="${s}" alt="${r}" loading="lazy" class="gallery-image"/>
        </a>
        <div class="info">
          <p class="info-item"><b>Likes:</b> ${i}</p>
          <p class="info-item"><b>Views:</b> ${u}</p>
          <p class="info-item"><b>Comments:</b> ${f}</p>
          <p class="info-item"><b>Downloads:</b> ${d}</p>
        </div>
      </li>
    `).join("");t.insertAdjacentHTML("beforeend",n)}a.settings({position:"topRight",timeout:5e3,transitionIn:"fadeIn",transitionOut:"fadeOut",progressBar:!0});const c=document.querySelector("#search-input"),h=document.querySelector("#search-button");h.addEventListener("click",l);c.addEventListener("keypress",o=>{o.key==="Enter"&&l()});function l(){const o=c.value.trim();if(!o){a.error({title:"Input Error",message:"Please enter a search query.",backgroundColor:"#FF4E4E"});return}g(o).then(t=>{t.length===0?a.error({title:"No Results",message:"Sorry, there are no images matching your <br>search query. Please try again!",backgroundColor:"#FF4E4E"}):y(t)}).catch(t=>{a.error({title:"Error",message:"Something went wrong. Please try again later!"}),console.error("Error fetching images:",t)}).finally(()=>{c.value=""})}
//# sourceMappingURL=index.js.map
