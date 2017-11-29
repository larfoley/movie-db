var navToggler = document.querySelector(".nav-toggler");
var navList = document.querySelector(".nav-list");

navToggler.addEventListener("click", function(){
  if(!navList.classList.contains("nav-collapse")) {
    navList.classList.add("nav-collapse");
  } else {
    navList.classList.remove("nav-collapse");
  }
});
