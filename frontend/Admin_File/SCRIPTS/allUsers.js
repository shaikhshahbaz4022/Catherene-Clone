const cartContainer = document.getElementById("cartContainer");
// let token = localStorage.getItem("token")

let showTotalusers = document.getElementById("show-Count-users")

function Fetch() {
    fetch(`https://crazy-eel-top-hat.cyclic.app/admin/api/users`, {
        method: "GET",
        headers: {
            "content-type": "application/json",
            "Authorization": `Berear ${token}`
        }
    })
        .then((res) => res.json())
        .then((data) => {

            displayData(data.data)
        })
        .catch((err) => {
            console.log(err);
        });
}

Fetch()

function displayData(cartData) {
    showTotalusers.textContent=`Total Active Users ${cartData.length}`
cartContainer.innerHTML=""
    cartData.forEach(item => {

        const cartItem = document.createElement("div");
        cartItem.classList.add("cart");


        const nameElement = document.createElement("p");
        nameElement.textContent = "Name: " + item.name;
        cartItem.appendChild(nameElement);


        const emailElement = document.createElement("p");
        emailElement.textContent = "Email: " + item.email;
        cartItem.appendChild(emailElement);


        const roleElement = document.createElement("p");
        roleElement.textContent = "Role: " + item.role;
        cartItem.appendChild(roleElement);


        cartContainer.appendChild(cartItem);
    });
}
