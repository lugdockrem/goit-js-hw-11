/* empty css                      */import{i as c,S as f}from"./assets/vendor-5ObWk2rO.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const s of o.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&i(s)}).observe(document,{childList:!0,subtree:!0});function a(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerPolicy&&(o.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?o.credentials="include":e.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function i(e){if(e.ep)return;e.ep=!0;const o=a(e);fetch(e.href,o)}})();const p="47381991-217f0392cb987e93da3bacc78",m="https://pixabay.com/api/";async function y(r){const t=`${m}?key=${p}&q=${encodeURIComponent(r)}&image_type=photo&orientation=horizontal&safesearch=true`,a=await fetch(t);if(!a.ok)throw new Error("Failed to fetch images");return(await a.json()).hits}function g(r){return r.map(({webformatURL:t,largeImageURL:a,tags:i,likes:e,views:o,comments:s,downloads:d})=>`
        <a class="gallery__item" href="${a}">
          <div class="photo-card">
            <img class="photo-card__image" src="${t}" alt="${i}" loading="lazy" />
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
                ${d}
              </p>
            </div>
          </div>
        </a>
      `).join("")}function h(r){r.innerHTML=""}function b(r){const t=document.querySelector(".gallery");h(t);const a=g(r);t.insertAdjacentHTML("beforeend",a)}c.settings({position:"topRight",timeout:5e3,transitionIn:"fadeIn",transitionOut:"fadeOut",progressBar:!0,customClass:{toast:"toast-top-right"}});const l=document.querySelector("#search-input"),E=document.querySelector("#search-button"),L=document.querySelector(".gallery");let n=document.querySelector("#loading-indicator");console.log(n);n||(n=document.createElement("div"),n.id="loading-indicator",n.className="loader loader-spinner",document.body.appendChild(n),console.log(n));let S=new f(".gallery a",{captionsData:"alt",captionDelay:250});l.addEventListener("keypress",r=>{r.key==="Enter"&&u()});E.addEventListener("click",u);function u(){const r=l.value.trim();if(!r){c.error({title:"Input Error",message:"Please enter a search query.",backgroundColor:"#FF4E4E"});return}n.style.display="block",y(r).then(t=>{t.length===0?c.error({title:"No Results",message:"Sorry, there are no images matching your <br>search query. Please try again!",backgroundColor:"#FF4E4E"}):(L.innerHTML="",b(t),S.refresh())}).catch(t=>{c.error({title:"Error",message:"Something went wrong. Please try again later!"}),console.error("Error fetching images:",t)}).finally(()=>{n.style.display="none",l.value=""})}
//# sourceMappingURL=index.js.map
