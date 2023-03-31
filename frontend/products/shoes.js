//////////////////////////////




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



let tops = document.getElementById("topsAppend")


fetch("http://localhost:8000/shoes")
    .then((res) => {
        return res.json()
    })
    .then((data) => {
        console.log(data);
        displayData(data)
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