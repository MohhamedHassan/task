let i = document.querySelector(".top")
window.onscroll = function() {
   if(window.pageYOffset === 0) {
        i.style.opacity="0"
   }  else {
    i.style.opacity="1"
   }
}
i.onclick = function() {
    window.scrollTo({top: 0, behavior: 'smooth'});
}
// end scroll to Top function
let nav = document.querySelector("nav")
nav.onmouseover = function() {
   this.classList.add("open")
}
nav.onmouseout = function() {
    this.classList.remove("open")
 }