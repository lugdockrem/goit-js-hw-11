/* empty css                      */import{i,S as f}from"./assets/vendor-5ObWk2rO.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))a(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const s of o.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&a(s)}).observe(document,{childList:!0,subtree:!0});function n(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerPolicy&&(o.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?o.credentials="include":e.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function a(e){if(e.ep)return;e.ep=!0;const o=n(e);fetch(e.href,o)}})();const d="47381991-217f0392cb987e93da3bacc78",p="https://pixabay.com/api/";async function m(r){const t=`${p}?key=${d}&q=${encodeURIComponent(r)}&image_type=photo&orientation=horizontal&safesearch=true`,n=await fetch(t);if(!n.ok)throw new Error("Failed to fetch images");return(await n.json()).hits}function y(r){return r.map(({webformatURL:t,largeImageURL:n,tags:a,likes:e,views:o,comments:s,downloads:u})=>`
        <a class="gallery__item" href="${n}">
          <div class="photo-card">
            <img class="photo-card__image" src="${t}" alt="${a}" loading="lazy" />
            <div class="info">
              <p class="info-item">
                <b>Likes</b>
                ${e}
              </p>
              <p class="info-item">
                <b>Views</b>
                ${o}
              </p>
              <p class="info-item">
                <b>Comments</b>
                ${s}
              </p>
              <p class="info-item">
                <b>Downloads</b>
                ${u}
              </p>
            </div>
          </div>
        </a>
      `).join("")}function g(r){r.innerHTML=""}function h(r){const t=document.querySelector(".gallery");g(t);const n=y(r);t.insertAdjacentHTML("beforeend",n)}i.settings({position:"topRight",timeout:5e3,transitionIn:"fadeIn",transitionOut:"fadeOut",progressBar:!0});const c=document.querySelector("#search-input"),b=document.querySelector("#search-button"),E=document.querySelector(".gallery");let L=new f(".gallery a",{captionsData:"alt",captionDelay:250});b.addEventListener("click",l);c.addEventListener("keypress",r=>{r.key==="Enter"&&l()});function l(){const r=c.value.trim();if(!r){i.error({title:"Input Error",message:"Please enter a search query.",backgroundColor:"#FF4E4E"});return}m(r).then(t=>{t.length===0?i.error({title:"No Results",message:"Sorry, there are no images matching your <br>search query. Please try again!",backgroundColor:"#FF4E4E"}):(E.innerHTML="",h(t),L.refresh())}).catch(t=>{i.error({title:"Error",message:"Something went wrong. Please try again later!"}),console.error("Error fetching images:",t)}).finally(()=>{c.value=""})}
//# sourceMappingURL=index.js.map
