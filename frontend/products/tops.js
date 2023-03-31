//////////URL/////////////
const BaseServerUrl = `http://localhost:8000`
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




////////////////////globall data access///////////////////


////////////////////globall data access///////////////////




///////////////totalcount///////////////
function temp(data) {
    let result = document.getElementById("result")
    result.textContent = ` Results :- ${data.length} items`
}
///////////////totalcount///////////////

let tops = document.getElementById("topsAppend")


fetch("http://localhost:8000/tops/")
    .then((res) => {
        return res.json()
    })
    .then((data) => {
        newdata = data
        // console.log(data);
          sortPrice(data)
        displayData(data)
        temp(data)
    })
    .catch((err) => {
        console.log(err);
    })


function displayData(data) {
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

        main.append(image, title, category, color, description, price)
        tops.append(main)
    });
}

let inp1 = document.getElementsByClassName("inp-1")
let inp2 = document.getElementsByClassName("inp-2")


          
