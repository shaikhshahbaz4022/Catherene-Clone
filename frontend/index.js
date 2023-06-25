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

const urlParams = new URLSearchParams(window.location.search);
let tokenurl = urlParams.get('token');
let username = urlParams.get("username")
let image = urlParams.get("image")
let log = document.getElementById("log")
if (tokenurl) {

  localStorage.setItem("token", tokenurl)
  localStorage.setItem("username", username)
  localStorage.setItem("image", image)
}

// Use the token as needed in your frontend application
let user = JSON.parse(localStorage.getItem("user")) || []

let displayname = document.getElementById("display-name")
if (!tokenurl) {
  displayname.style.display = "none"
} else {
  log.style.display="none"
  let h2c = document.createElement("h2")
  let imgc = document.createElement("img")
  h2c.innerText = username;
  imgc.src = image;
  displayname.append(h2c, imgc)
}



let token = localStorage.getItem("token")
console.log(user);
if(user){
  // displayname.style.display = "block"
  let h2s = document.createElement("h2")
  if(!user.name){
    h2s.style.display="none"
  }
  h2s.textContent = ` Mr .${user.name}`
  log.append(h2s)
}
console.log(token);

let logout = document.getElementById("logout")

setInterval(showText, 2500); // Change text every 3 seconds

const BaseServerUrl = `https://crazy-eel-top-hat.cyclic.app`
//////regbtn/////

let regbtn = document.getElementById("Regbtn")



if (token) {
  regbtn.textContent = `Logout`
  regbtn.addEventListener("click", () => {
    fetch(`${BaseServerUrl}/users/logout`, {
      method: "POST",
      headers: {
        "content-type": "Application/json",
        "Authorization": `Berear ${token}`
      }
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.ok == true) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: `${data.msg}`,
            showConfirmButton: false,
            timer: 1500,
          });
          localStorage.clear()
          setTimeout(() => {
            window.location.href = "index.html"
          }, 2500);
        } else {
          Swal.fire({
            position: "center",
            icon: "error",
            title: `${data.msg}`,
            showConfirmButton: true,
            // timer: 1500,
          });
        }

      })
      .catch((err) => {
        console.log(err);
      })
  })
} else {
  regbtn.addEventListener("click", () => {
    window.location.href = "signup.html"
  })
}



// let carttocart = document.getElementById("carttocart")
// carttocart.addEventListener("click", () => {
//   window.location.href = "./products/cart.html"
// })



// logout.addEventListener("click", () => {
//   localStorage.clear()
//   window.location.href = "index.html"
// })
window.addEventListener('scroll', function () {
  var menuIcon = document.querySelector('.header .menu-icon');
  var headerHeight = document.querySelector('.header').offsetHeight;

  if (window.scrollY > headerHeight) {
    menuIcon.classList.add('hidden');
  } else {
    menuIcon.classList.remove('hidden');
  }
});


let carttocart = document.getElementById("carttocart")
carttocart.addEventListener("click", () => {
  if (token) {
    window.location.href = "./products/cart.html"
  } else {
    Swal.fire({
      position: "center",
      icon: "error",
      title: `Login First`,
      showConfirmButton: false,
      timer: 1500,
    });
  }

})