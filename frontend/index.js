var texts = [
  "AMAZING DEAL $25 COTTON COMFORT WIRELESS BRA! | Details | View All Deals",
  "SAVE $10, SIGN UP FOR CATHERINES REWARDS TODAY | Details | View All Deals",
  "THE BEST DRESSED EVENT UP TO 50% OFF! | Details | View All Deals",
  "AMAZING DEAL $20 SUPREMA ULTRA SOFT SCOOPNECK TEE! | Details | View All Deals"
];

var index = 0;
function showText() {
  document.getElementById("text-container").innerHTML = texts[index];
  index++;
  if (index >= texts.length) {
    index = 0;
  }
}
let logout = document.getElementById("logout")
let data = JSON.parse(localStorage.getItem("user")) || []
console.log(data);
setInterval(showText, 2500); // Change text every 3 seconds

//////regbtn/////
let regbtn = document.getElementById("Regbtn")
regbtn.addEventListener("click", () => {
  window.location.href = "signup.html"
})

let showptag = document.getElementById("show-ptag")
if (data.name) {
  showptag.innerText = `Mr. ${data.name}`
} else {
  showptag.innerText = `Login First`
  logout.style.display = "none"

}


let carttocart = document.getElementById("carttocart")
carttocart.addEventListener("click", () => {
  window.location.href = "./products/cart.html"
})



logout.addEventListener("click", () => {
  localStorage.clear()
  window.location.href = "index.html"
})
window.addEventListener('scroll', function() {
  var menuIcon = document.querySelector('.header .menu-icon');
  var headerHeight = document.querySelector('.header').offsetHeight;
  
  if (window.scrollY > headerHeight) {
    menuIcon.classList.add('hidden');
  } else {
    menuIcon.classList.remove('hidden');
  }
});
