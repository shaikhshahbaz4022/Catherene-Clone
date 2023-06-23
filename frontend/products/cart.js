// const BaseServerUrl = `https://worrisome-hospital-gown-bull.cyclic.app`,
const BaseServerUrl = `http://localhost:8080`

//slider top

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



setInterval(showText, 2500); // Change text every 3 seconds
//slider top
var main = document.getElementById('append')

fetchAndRender()
function fetchAndRender(){
  fetch(`${BaseServerUrl}/cart`, {
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem("token")}`
    }
  })
    .then((res) => {
      return res.json()
    })
    .then((data) => {
      // appendata(data)
   let arr = []
   arr = [...data.jeans , ...data.tops , ...data.shoes]
   
      console.log(arr);
      getAllDataofdata(arr)
  
    })
    .catch((err) => {
      console.log(err);
    })
}


let newArray = []
function getAllDataofdata(data) {
  // console.log(data);
 
  appendata(data)

}








function appendata(data) {

  let total = document.getElementById("amount")
  let total2 = document.getElementById("amount2")
  main.innerHTML = ""

  data.forEach((ele) => {

    let imgbox = document.createElement("div")
    imgbox.setAttribute("class", "imgbox")

    let img = document.createElement("img")
    img.src = ele.data.image

    imgbox.append(img)

    let main222 = document.createElement("div")
    main222.setAttribute("class", "main222")

    let card = document.createElement("div")



    let title = document.createElement("h3")
    title.innerText = `${ele.data.title}`

    let cateogry = document.createElement("p")
    cateogry.innerText = `Category : ${ele.data.category}`

    let price = document.createElement("h3")
    // console.log(typeof ele.price);
    // ele.price = Number(ele.price)
    // console.log(typeof ele.price);
    price.innerText = `Price : ${ele.data.price}`

    let description = document.createElement("p")
    description.textContent = `Description  : ${ele.data.description}`

    hr = document.createElement("hr")



    //  ********image append *****

    // if (data.length == 0) {
    //   // let imgurl = "https://www.linkpicture.com/q/3516854.jpg"
    //   // let imagecart = document.createElement("img")
    //   // img.src = imgurl
    //   // main.append(imagecart)
    //   console.log("hello")
    // }

    // ***Remove Succesfully Text****
    let removediv = document.createElement("div")

    let removesuc = document.createElement("span")


    removediv.append(removesuc)


    // ***Remove Succesfully Text****

    // .buttons
    let quantity = document.createElement("span");
    quantity.textContent = `Qty : ${ele.Quantity}`;
    console.log(ele.Quantity);




    let Increment = document.createElement("button");
    Increment.setAttribute("class", "inc")

    let decrement = document.createElement("button");
    let remove = document.createElement("button");

    remove.innerText = "Remove";
    Increment.innerText = "+";
    decrement.textContent = "-";

    remove.addEventListener("click", () => {
      // console.log("object");
      fetch(`${BaseServerUrl}/cart/delete/${ele._id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
      })
        .then((res) => {
          return res.json()
        })
        .then((res) => {
          alert("deleted succesfully")
          quantity.innerText = res.quantity
          // console.log(data)
          window.location.reload()
          // appendata(data)
        })
        .catch((err) => {
          console.log(err.message)
        })

    });
    Increment.addEventListener("click", () => {
      fetch(`${BaseServerUrl}/cart/inc/${ele._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
      })
        .then((res) => {
          return res.json()
        })
        .then((res) => {
        
          fetchAndRender()
          
        })
        .catch((err) => {
          console.log(err.message)
        })



    });
    decrement.addEventListener("click", () => {

      fetch(`${BaseServerUrl}/cart/decr/${ele._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
      })
        .then((res) => {
          return res.json()
        })
        .then((res) => {
        fetchAndRender()
        })
        .catch((err) => {
          console.log(err.message)
        })

    });

    // // ***Remove Succesfully Text****
    // let removediv = document.createElement("div")

    // let removesuc = document.createElement("span")
    // removesuc.textContent = "Removed Succesfully"
    // removediv.style.marginTop ="8px"

    // removediv.append(removesuc)


    // // ***Remove Succesfully Text****

    let buttondiv = document.createElement("div")
    buttondiv.append(Increment, decrement, remove)



    card.append(title, cateogry, price, description, quantity, buttondiv, removediv)
    main222.append(imgbox, card)
    main.append(main222, hr)
    document.querySelector("#total-items").innerText = data.length;


    let sum = 0;
    for (let i = 0; i < data.length; i++) {
      sum += data[i].data.price * data[i].Quantity
    }
    total.textContent = sum.toFixed(2)
    total2.innerText = sum.toFixed(2)


    localStorage.setItem("sum", JSON.stringify(sum))
  });


let sum = localStorage.getItem("sum")
console.log(sum);
  let couponbtn = document.getElementById("coupon-btn")

  couponbtn.addEventListener("click", () => {
    let couponinput = document.getElementById("coupon-input")

    if (couponinput.value == "MASAI30") {
      let x = sum * 0.7;
      total2.innerText = x.toFixed(2)
      sum=x
      localStorage.setItem("sum",sum)
      couponbtn.disabled = true;
    }
    console.log(sum);



  })

  if (data.length == 0) {
    let imgurl = "https://www.linkpicture.com/q/3516854.jpg"
    let imagecart = document.createElement("img")
    imagecart.src = imgurl
    imagecart.style.width = "50%"

    main.append(imagecart)

    console.log("hello")
  }




}


let regbtn = document.getElementById("Regbtn")
let token = localStorage.getItem("token")
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
            window.location.href="../index.html"
          }, 2500);
        }else{
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
    window.location.href = "../signup.html"
  })
}

