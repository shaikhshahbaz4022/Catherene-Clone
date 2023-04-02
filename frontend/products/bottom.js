

//////////URL/////////////
const BaseServerUrl = `https://worrisome-hospital-gown-bull.cyclic.app`
//////////URL/////////////

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

let inp1 = document.getElementsByClassName("inp-1")
let inp2 = document.getElementsByClassName("inp-2")




////////////////////globall data access///////////////////

let LSdata = JSON.parse(localStorage.getItem("Localdata")) || [];
let token = localStorage.getItem("token")

////////////////////globall data access///////////////////

let regbtn = document.getElementById("Regbtn")
regbtn.addEventListener("click", () => {
    if (!token) {

        ////note
        window.location.href = "../login.html"

    } else {
        alert("you have logged in !!")
    }
})
//////////////

let cartbtn = document.getElementById("cartbtn")
cartbtn.addEventListener("click", () => {
    window.location.href = "./cart.html"
})





///////////////totalcount///////////////
function temp(data) {
    let result = document.getElementById("result")
    result.textContent = ` Results :- ${data.length} items`
}
///////////////totalcount///////////////

let tops = document.getElementById("topsAppend")



let newdata = []

fetch(`${BaseServerUrl}/jeans/`)
    .then((res) => {
        return res.json()
    })
    .then((data) => {
        console.log(data)
        ///
        searchbar(data)
        filterfun(data)
        displayData(data)
        sortvalue(data)
        temp(data)
        //filetring(data)

        newdata = data
        // console.log(newdata);

    })
    .catch((err) => {
        console.log(err);
    })





function displayData(data) {
    tops.innerHTML = ""
    data.forEach((ele, ind) => {
        let main = document.createElement("div")



        let title = document.createElement("h3")
        title.innerText = `Title : ${ele.title}`

        let image = document.createElement("img")
        image.src = ele.image

        let category = document.createElement("p")
        category.innerText = `Category : ${ele.category}`

        let color = document.createElement("p")
        color.textContent = `Color : ${ele.color}`

        let description = document.createElement("p")
        description.innerText = `Description : ${ele.description}`

        let price = document.createElement("p")
        price.innerText = `₹ ${ele.price}`

        let imgdiv = document.createElement("div")
        imgdiv.classList.add("imgdiv")
        imgdiv.append(image)

        let button = document.createElement("button")
        button.classList.add("Addtocartbtn")
        button.textContent = `  Add to Cart`
        button.addEventListener("click", () => {
            let token = localStorage.getItem("token")
            if (token) {
                fetch("https://worrisome-hospital-gown-bull.cyclic.app/cart/post", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${localStorage.getItem("token")}`
                    },
                    body: JSON.stringify(ele)
                })

                    .then((res) => {
                        return res.json()
                    })
                    .then((data) => {
                        // console.log(data);
                        // data.push({ ...ele, quantity: 1 });
                        if (data.msg == "Data already present") {
                            alert("Product Already in cart")
                        } else {
                            alert("Product added to cart")

                        }

                    })
                    .catch((err) => {
                        console.log(err);
                        // console.log(err.message);
                    })
            } else {
                alert("Login First To Add to Cart")
            }
        })



        main.append(imgdiv, title, description, price, button)
        tops.append(main)
    });
}
let datauser = JSON.parse(localStorage.getItem("user")) || []
let showptag = document.getElementById("show-ptag")

showptag.innerText = `Mr. ${datauser.name}`
///////////////
// let logoutbtn = document.getElementById("lgtbtn")
// logoutbtn.addEventListener("click",()=>{
//     console.log("btn");
//     localStorage.clear()
//     setTimeout(() => {
//         window.location.href = "../index.html"
//     }, 2000);

// })


function filterfun(data) {
    let colorselect = document.getElementById("color-select")
    let Categoryselect = document.getElementById("Category-select")
    let Sizeselect = document.getElementById("Size-select")

    colorselect.addEventListener("change", () => {

        if (colorselect.value == "") {
            displayData(data)
        } else {
            let filtered = data.filter((ele) => {
                return ele.color == colorselect.value
            })
            displayData(filtered)
        }
    })

    Categoryselect.addEventListener("change", () => {
        if (Categoryselect.value == "") {
            displayData(data)
        } else {
            let filtered = data.filter((ele) => {
                return ele.category == Categoryselect.value
            })
            displayData(filtered)
        }
    })
    Sizeselect.addEventListener("change", () => {
        if (Sizeselect.value == "") {
            displayData(data)
        } else {
            let filtered = data.filter((ele) => {
                return ele.size == Sizeselect.value
            })
            displayData(filtered)
        }
    })


}

function sortvalue(data) {

    const ascinp = document.getElementById("asc")
    const descinp = document.getElementById("desc")
    let sortprice = data
    ascinp.addEventListener("change", () => {
        let x = sortprice.sort((a, b) => { return b.price - a.price })

        displayData(x)
    })
    descinp.addEventListener("change", () => {
        let x = sortprice.sort((a, b) => { return a.price - b.price })

        displayData(x)
    })


}
function searchbar(data) {
    let search = document.getElementById("search-bar");
    search.addEventListener("input", (e) => {
        e.preventDefault();
        const value = e.target.value;

        let newArr = data.filter(element => {

            return element.title.toLowerCase().includes(value) || element.description.toLowerCase().includes(value);

        })
        displayData(newArr)

    })

}



