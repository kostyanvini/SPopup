(()=>{"use strict";const e={popupWrapper:!0,animate:{time:0,effect:null},on:{afterSpopupOpen:"",afterSpopupClose:"",init:""}};function t(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function n(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function r(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?n(Object(r),!0).forEach((function(t){i(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):n(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function o(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function p(e){return p="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},p(e)}var s;(s=window).SPopup?console.warn("SPopup is initialized"):s&&"object"===p(s)&&void 0===s.SPopup&&(s.SPopup=function(){function n(t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,n),i(this,"defaultParams",r({},e)),this.params=r(r({},e),t),this.refs={},this.refs.openPopup=this.getSelector(this.params.selector),this.refs.content=this.getSelector(this.params.src),this.refs.closePopup=this.getSelector(this.params.closePopup),this.init()}var p,s,u;return p=n,u=[{key:"close",value:function(e){var t=this;e?e.close():document.querySelectorAll(".spopup-container").forEach((function(e){e.style.visibility="hidden",e.style.opacity="0",t.popup.style.animation=""}))}}],(s=[{key:"getSelector",value:function(e){if(!e)return null;if(e instanceof HTMLElement)return e;var n,r=document.querySelectorAll(e);return r?1===r.length?[r[0]]:function(e){if(Array.isArray(e))return t(e)}(n=r)||function(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(n)||function(e,n){if(e){if("string"==typeof e)return t(e,n);var r=Object.prototype.toString.call(e).slice(8,-1);return"Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?t(e,n):void 0}}(n)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}():void 0}},{key:"init",value:function(){var e=this;return this.params.popupWrapper?this.createUI():this.refs.popup=this.refs.content[0],this.initEvents(),this.refs.openPopup&&this.refs.openPopup.forEach((function(t){return t.addEventListener("click",(function(){return e.show()}))})),this.closePopup&&this.closePopup.forEach((function(t){return t.addEventListener("click",(function(){return e.close()}))})),this.refs.popup?this.refs.popup.dispatchEvent(new Event("init")):new Error("SPopup is not initialized")}},{key:"initEvents",value:function(){var e=this.params.on;for(var t in e)Object.hasOwnProperty.call(e,t)&&e[t]&&this.refs.popup.addEventListener(t,e[t])}},{key:"createUI",value:function(){var e=this,t=document.createElement("div");t.classList.add("spopup-container"),t.innerHTML='\n                    <div class="spopup">\n                        <div class="spopup-content">\n                        </div>\n                        <button class="spopup-close-button">\n                        <svg version="1.0" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="20" height="20" viewBox="0 0 50 50">\n                            <g fill="currentColor">\n                                <path d="M27.948,20.878L40.291,8.536c1.953-1.953,1.953-5.119,0-7.071c-1.951-1.952-5.119-1.952-7.07,0L20.878,13.809L8.535,1.465\n                                c-1.951-1.952-5.119-1.952-7.07,0c-1.953,1.953-1.953,5.119,0,7.071l12.342,12.342L1.465,33.22c-1.953,1.953-1.953,5.119,0,7.071\n                                C2.44,41.268,3.721,41.755,5,41.755c1.278,0,2.56-0.487,3.535-1.464l12.343-12.342l12.343,12.343\n                                c0.976,0.977,2.256,1.464,3.535,1.464s2.56-0.487,3.535-1.464c1.953-1.953,1.953-5.119,0-7.071L27.948,20.878z"/>\n                            </g>\n                        </svg>\n                        </button>\n                    </div>\n                    <div class="spopup-layer"></div>\n                ',t.querySelector(".spopup-content").append(this.refs.content[0]),document.body.insertAdjacentElement("beforeend",t),this.refs.popup=t,this.refs.closePopup?this.refs.closePopup.push(this.refs.popup.querySelector(".spopup-layer"),this.refs.popup.querySelector(".spopup-close-button")):this.refs.closePopup=[this.refs.popup.querySelector(".spopup-layer"),this.refs.popup.querySelector(".spopup-close-button")],this.refs.closePopup.forEach((function(t){return t.addEventListener("click",(function(){return e.close()}))}))}},{key:"show",value:function(){return this.refs.popup.style.visibility="visible",this.refs.popup.style.opacity="1",this.params.animate.effect&&(this.refs.popup.style.animation="".concat(this.params.animate.time,"ms spopup").concat(this.params.animate.effect," ease")),this.refs.popup.dispatchEvent(new Event("afterSpopupOpen")),this}},{key:"close",value:function(){return this.refs.popup.style.visibility="hidden",this.refs.popup.style.opacity="0",this.refs.popup.style.animation="",this.refs.popup.dispatchEvent(new Event("afterSpopupClose")),this}},{key:"on",value:function(e,t){if(e&&t)return this.popup.addEventListener(e,t),this}}])&&o(p.prototype,s),u&&o(p,u),Object.defineProperty(p,"prototype",{writable:!1}),n}())})();