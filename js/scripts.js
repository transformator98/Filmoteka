"use strict";var renderFilms,genres,videoYou,IMG_URL="https://image.tmdb.org/t/p/w500/",API_KEY="dac085ebfb43a8420c2afb30acca851a",IMAGE_NOT_FOUND="https://c4.wallpaperflare.com/wallpaper/198/872/888/numbers-404-not-found-simple-background-minimalism-wallpaper-preview.jpg",Version={REGULAR:"regular",PRO:"pro"},options={method:"GET",headers:{Authorization:"Bearer ".concat(API_KEY),"Content-Type":"application/json","Accept-Charset":"utf-8"}},$moviesList=document.querySelector("ul.movies"),$searchFormError=document.querySelector("p.search-form__error"),$prevBtn=document.querySelector('[data-action="previous"]'),popularMoviesActive=!1,pageNumber=1,createCard=function(e,t,r){var n=document.createElement("li"),a=document.createElement("p"),o=document.createElement("img");return n.className="movies__item",a.className="movies__title",o.className="movies__image",o.setAttribute("src",e),a.textContent=t,n.append(a),n.append(o),n.addEventListener("click",function(){activeDetailsPage(r,!1)}),n},renderMoviesList=function(e){var t=e.results,o=document.createDocumentFragment();t.forEach(function(e){var t=e.poster_path?IMG_URL+e.poster_path:IMAGE_NOT_FOUND,r=e.release_date.substring(0,4).trim(),n="".concat(e.original_title," (").concat(r,")"),a=createCard(t,n,e.id);o.appendChild(a)}),$moviesList.append(o),renderFilms=e},fetchGenres=function(){fetch("https://api.themoviedb.org/3/genre/movie/list?api_key=".concat(API_KEY,"&language=en-US"),options).then(function(e){return e.json()}).then(function(e){genres=e.genres}).catch(console.log)},fetchPopularMovies=function(){var e=0<arguments.length&&void 0!==arguments[0]?arguments[0]:1;$searchFormError.classList.replace("search-form__error--visibale","search-form__error--hidden"),$prevBtn.classList.remove("btn_prev_hidden"),1===e&&$prevBtn.classList.add("btn_prev_hidden"),fetch("https://api.themoviedb.org/3/movie/popular?api_key=".concat(API_KEY,"&language=en-US&page=").concat(e),options).then(function(e){return e.json()}).then(renderMoviesList).catch(console.log),popularMoviesActive=!0};fetchGenres(),fetchPopularMovies();var inputValue=" ",searchForm=document.querySelector(".search-form"),$input=document.querySelector(".search-form__input"),$btnsWrapper=document.querySelector(".page-counter__wrapper"),$nextBtn=($prevBtn=document.querySelector('[data-action="previous"]'),document.querySelector('[data-action="next"]')),$numberOfPage=document.querySelector(".btn_page-number"),versionAtLocalStorage=localStorage.getItem("version");function searchFilms(e){e.preventDefault(),inputValue=$input.value.trim(),searchForm.reset(),$searchFormError.classList.replace("search-form__error--visibale","search-form__error--hidden"),""!==inputValue?($moviesList.innerHTML="",fetchFilms(inputValue)):fetchPopularMovies()}function fetchFilms(e){var t=1<arguments.length&&void 0!==arguments[1]?arguments[1]:1;if(popularMoviesActive=!1,$prevBtn.classList.remove("btn_prev_hidden"),1===t&&($numberOfPage.textContent=t,pageNumber=t),!(pageNumber<1))return 1===pageNumber&&$prevBtn.classList.add("btn_prev_hidden"),fetch("https://api.themoviedb.org/3/search/movie/?api_key=".concat(API_KEY,"&query=").concat(e,"&page=").concat(pageNumber)).then(function(e){return e.json()}).then(function(e){if(0===e.results.length)return $searchFormError.classList.replace("search-form__error--hidden","search-form__error--visibale"),void fetchPopularMovies();renderMoviesList(e),"pro"===versionAtLocalStorage&&(pageNumber=1,lazyLoadingFilms())}).catch(function(e){return console.log(e)});$numberOfPage.textContent=1}function plaginationNavigation(e){if($moviesList.innerHTML="","page-counter__btn-previous"===e.target.id){if(1===pageNumber)return;pageNumber-=1,$numberOfPage.textContent=pageNumber,popularMoviesActive?fetchPopularMovies(pageNumber):fetchFilms(inputValue,pageNumber)}else if("page-counter__btn-next"===e.target.id){if(pageNumber>=renderFilms.total_pages)return;++pageNumber,$numberOfPage.textContent=pageNumber,popularMoviesActive?fetchPopularMovies(pageNumber):fetchFilms(inputValue,pageNumber)}}function lazyLoadingFilms(){$btnsWrapper.classList.add("hidden");new IntersectionObserver(function(t,r){t.forEach(function(e){e.isIntersecting&&(fetchFilms(inputValue,++pageNumber),t.length<20&&r.disconnect())})},{root:null,rootMargin:"0px",threshold:.5}).observe($moviesList.lastChild)}function _toConsumableArray(e){return _arrayWithoutHoles(e)||_iterableToArray(e)||_nonIterableSpread()}function _nonIterableSpread(){throw new TypeError("Invalid attempt to spread non-iterable instance")}function _iterableToArray(e){if(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e))return Array.from(e)}function _arrayWithoutHoles(e){if(Array.isArray(e)){for(var t=0,r=new Array(e.length);t<e.length;t++)r[t]=e[t];return r}}searchForm.addEventListener("submit",searchFilms),$btnsWrapper.addEventListener("click",plaginationNavigation);var selectFilm={},refs={logoRef:document.querySelector(".js-logo"),homeBtn:document.querySelector('button[data-action="btn-home"]'),libraryBtn:document.querySelector('button[data-action="btn-library"]'),detailsPage:document.querySelector(".js-details-page"),detailsPageVideoId:document.querySelector(".js-video"),homePage:document.querySelector(".js-home-page"),libraryPage:document.querySelector(".js-library-page"),addBtnWatched:document.querySelector('button[data-add="btn-watched"]'),addBtnQueue:document.querySelector('button[data-add="btn-queue"]'),prevBtn:document.querySelector('button[data-action="previous"]'),nextBtn:document.querySelector('button[data-action="next"]'),watchedBtn:document.querySelector('button[data-action="btn-watched"]'),queueBtn:document.querySelector('button[data-action="btn-queue"]')};function activeHomePage(){window.scrollBy(0,-window.innerHeight),refs.homeBtn.classList.add("onClick"),refs.libraryBtn.classList.remove("onClick"),refs.homePage.classList.remove("visually-hidden"),refs.detailsPage.classList.add("visually-hidden"),refs.libraryPage.classList.add("visually-hidden"),refs.prevBtn.addEventListener("click",plaginationNavigation),refs.nextBtn.addEventListener("click",plaginationNavigation),refs.watchedBtn.removeEventListener("click",drawWatchedFilmList),refs.queueBtn.removeEventListener("click",drawQueueFilmList),refs.addBtnWatched.removeEventListener("click",drawWatchedFilmList),refs.addBtnQueue.removeEventListener("click",drawQueueFilmList)}function activeLibraryPage(){window.scrollBy(0,-window.innerHeight),refs.homeBtn.classList.remove("onClick"),refs.libraryBtn.classList.add("onClick"),refs.libraryPage.classList.remove("visually-hidden"),refs.detailsPage.classList.add("visually-hidden"),refs.homePage.classList.add("visually-hidden"),refs.watchedBtn.addEventListener("click",drawWatchedFilmList),refs.queueBtn.addEventListener("click",drawQueueFilmList),drawWatchedFilmList(),$btnsWrapper.removeEventListener("click",plaginationNavigation),refs.addBtnWatched.removeEventListener("click",toggleToWatched),refs.addBtnQueue.removeEventListener("click",toggleToQueue)}function activeDetailsPage(e,t){if(window.scrollBy(0,-window.innerHeight),refs.homeBtn.classList.remove("onClick"),refs.libraryBtn.classList.remove("onClick"),"IMG"===event.target.nodeName){var r,n=e,a=renderFilms.results;if(t){var o=[].concat(_toConsumableArray(JSON.parse(localStorage.getItem("filmQueue"))),_toConsumableArray(JSON.parse(localStorage.getItem("filmWatched"))));selectFilm=o.find(function(e){return e.id===n})}else selectFilm=a.find(function(e){return e.id===n});showDetails(selectFilm),refs.detailsPage.classList.remove("visually-hidden"),refs.libraryPage.classList.add("visually-hidden"),refs.homePage.classList.add("visually-hidden"),refs.addBtnWatched.addEventListener("click",toggleToWatched),refs.addBtnQueue.addEventListener("click",toggleToQueue),$btnsWrapper.removeEventListener("click",plaginationNavigation),refs.watchedBtn.removeEventListener("click",drawWatchedFilmList),refs.queueBtn.removeEventListener("click",drawQueueFilmList),versionAtLocalStorage===Version.PRO&&(refs.detailsPageVideoId.innerHTML="",fetch("https://api.themoviedb.org/3/movie/".concat(e,"/videos?api_key=").concat(API_KEY,"&language=en-US"),options).then(function(e){return e.json()}).then(function(e){var t=e.results;videoYou=t.map(function(e){return e.key}),r=createElement("iframe",{class:"js-video__iframe",id:"ytplayer",type:"text/html",width:"450",height:"300",src:"https://www.youtube.com/embed/".concat(videoYou,"?autoplay=0&origin=http://example.com"),frameborder:"0"}),refs.detailsPageVideoId.appendChild(r)}).catch(function(e){return console.log(e)}))}}function createElement(e){var t=1<arguments.length&&void 0!==arguments[1]?arguments[1]:{},r=document.createElement(e);for(var n in t)r.setAttribute(n,t[n]);return r}refs.logoRef.addEventListener("click",activeHomePage),refs.homeBtn.addEventListener("click",activeHomePage),refs.libraryBtn.addEventListener("click",activeLibraryPage);var watchedBtnRef=document.querySelector(".add-btn_watched"),queueBtnRef=document.querySelector(".add-btn_queue"),posterRef=document.querySelector(".details-page__image"),titleRef=document.querySelector(".title_original"),votesRef=document.querySelector(".about-list__descr_votes"),popularityRef=document.querySelector(".about-list__descr_popularity"),originalTitleRef=document.querySelector(".about-list__descr_title"),genreRef=document.querySelector(".about-list__descr_genre"),plotRef=document.querySelector(".plot__descr");function monitorButtonStatusText(){var e=(JSON.parse(localStorage.getItem("filmQueue"))||[]).map(function(e){return e.id}),t=(JSON.parse(localStorage.getItem("filmWatched"))||[]).map(function(e){return e.id});e.includes(selectFilm.id)?queueBtnRef.textContent="Delete from queue":queueBtnRef.textContent="Add to queue",localStorage.setItem("filmQueueBtnStatus",queueBtnRef.textContent),t.includes(selectFilm.id)?watchedBtnRef.textContent="Delete from watched":watchedBtnRef.textContent="Add to watched",localStorage.setItem("filmWatchedBtnStatus",watchedBtnRef.textContent)}function toggleToQueue(){var e=JSON.parse(localStorage.getItem("filmQueue"))||[];e.map(function(e){return e.id}).includes(selectFilm.id)?e=e.filter(function(e){return e.id!==selectFilm.id}):e.push(selectFilm),localStorage.setItem("filmQueue",JSON.stringify(e)),monitorButtonStatusText()}function toggleToWatched(){var e=JSON.parse(localStorage.getItem("filmWatched"))||[];e.map(function(e){return e.id}).includes(selectFilm.id)?e=e.filter(function(e){return e.id!==selectFilm.id}):e.push(selectFilm),localStorage.setItem("filmWatched",JSON.stringify(e)),monitorButtonStatusText()}function showDetails(e){var t=e.poster_path?"https://image.tmdb.org/t/p/w500/".concat(e.poster_path):IMAGE_NOT_FOUND;posterRef.src=t,titleRef.textContent=e.title,votesRef.textContent="".concat(e.vote_average," / ").concat(e.vote_count),popularityRef.textContent=e.popularity,originalTitleRef.textContent=e.title,plotRef.textContent=e.overview;var r=[];e.genre_ids.filter(function(t){return genres.filter(function(e){return e.id===t}).forEach(function(e){return r.push(e.name)})}),genreRef.textContent=r.join(", "),monitorButtonStatusText()}var $libraryList=document.querySelector("ul.library-list"),createLibraryCardFunc=function(e,t,r,n){var a=document.createElement("li"),o=document.createElement("p"),i=document.createElement("img"),s=document.createElement("span");return a.className="movies__item",o.className="movies__title ",s.className="movies__item-rating",i.className="movies__image",i.setAttribute("src",IMG_URL+e),o.textContent=t,s.textContent=n,a.append(o),a.append(i),a.append(s),a.addEventListener("click",function(){activeDetailsPage(r,!0)}),a};function switchActiveButtonTo(e){switch(e){case"queue":refs.watchedBtn.classList.contains("onClickLibrary")&&refs.watchedBtn.classList.remove("onClickLibrary"),refs.queueBtn.classList.add("onClickLibrary");break;case"watched":refs.queueBtn.classList.contains("onClickLibrary")&&refs.queueBtn.classList.remove("onClickLibrary"),refs.watchedBtn.classList.add("onClickLibrary")}}function drawQueueFilmList(){switchActiveButtonTo("queue"),$libraryList.innerHTML="";var r=document.createDocumentFragment(),e=JSON.parse(localStorage.getItem("filmQueue"));if(e&&0<e.length)e.forEach(function(e){var t=createLibraryCardFunc(e.poster_path,e.original_title,e.id,e.vote_average);r.appendChild(t)});else{var t=document.createElement("p");t.className="movies__not-found",t.textContent="You do not have to queue movies to watch.Add them",r.append(t)}$libraryList.append(r)}function drawWatchedFilmList(){switchActiveButtonTo("watched"),$libraryList.innerHTML="";var r=document.createDocumentFragment(),e=JSON.parse(localStorage.getItem("filmWatched"));if(e&&0<e.length)e.forEach(function(e){var t=createLibraryCardFunc(e.poster_path,e.original_title,e.id,e.vote_average);r.appendChild(t)});else{var t=document.createElement("p");t.className="movies__not-found",t.textContent="You do not have to queue movies to watch.Add them",r.append(t)}$libraryList.append(r)}var defaultVersion=Version.REGULAR,body=document.querySelector("body"),toolbar=document.querySelector("input.js-switch-input"),versionDescription=document.querySelector("ul.features"),youtubeTrailer=document.querySelector(".js-video");body.classList.add(versionAtLocalStorage||defaultVersion),versionDescription.classList.add(versionAtLocalStorage||defaultVersion),versionAtLocalStorage===Version.REGULAR&&toolbar.setAttribute("checked",!0);var changeVersion=function(){return location.reload(),body.classList.contains(Version.REGULAR)?(body.classList.replace(Version.REGULAR,Version.PRO),youtubeTrailer.classList.remove("visually-hidden"),versionDescription.classList.replace(Version.REGULAR,Version.PRO),localStorage.setItem("version",Version.PRO),void(versionAtLocalStorage=Version.PRO)):body.classList.contains(Version.PRO)?(body.classList.replace(Version.PRO,Version.REGULAR),youtubeTrailer.classList.add("visually-hidden"),versionDescription.classList.replace(Version.PRO,Version.REGULAR),localStorage.setItem("version",Version.REGULAR),void(versionAtLocalStorage=Version.REGULAR)):void 0};toolbar.addEventListener("change",changeVersion);