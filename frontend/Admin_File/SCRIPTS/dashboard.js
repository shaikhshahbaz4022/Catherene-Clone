const Base_Server_url = `http://localhost:8080`
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI2NDk1ZWRkNzNiZjVjZjc5OWM0MzBlN2MiLCJyb2xlIjoiVXNlciIsImlhdCI6MTY4NzU0NzM1NiwiZXhwIjoxNjg4MTUyMTU2fQ.OQ6NPb3OIIWBQ9YSy92WwEswn3g1ms3QnWKsASxh318"

let getusers = document.getElementById("get-users")
const productBtn = document.getElementById("get-products")

const cartContainer = document.getElementById("cartContainer");
const productCart = document.getElementById('cart-container');

getusers.addEventListener("click", () => {
    productCart.style.display = "none";
//   cartContainer.style.display = "block";
    Fetch();
  });
  
  productBtn.addEventListener("click", () => {
    cartContainer.style.display = "none";
    // productCart.style.display = "block";
    ProductFetch();
  });
function Fetch() {
    fetch(`http://localhost:8080/admin/api/users`, {
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



function displayData(cartData) {
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

const ProductFetch = () => {
    const optionss = {
        method: "GET",
        headers: {
            "content-type": "application/json",
            "Authorization": `Berear ${token}`
        }
    }
    fetch(`${Base_Server_url}/admin/api/products`, optionss)
        .then((res) => res.json())
        .then((data) => {
            DisplayProducts(data)
        })
        .catch((err) => {
            console.log(err);
        })
}


function DisplayProducts(data){
productCart.innerHTML=""

    data.forEach(item => {
        const card = document.createElement('div');
        card.classList.add('cart-card');

        const image = document.createElement('img');
        image.src = item.image;
        image.classList.add("cart-image")
        card.appendChild(image);

        const title = document.createElement('h3');
        title.classList.add('card-title');
        title.textContent = item.title;
        card.appendChild(title);

        const price = document.createElement('div');
        price.classList.add('card-price');
        price.textContent = 'Price: ' + item.price;
        card.appendChild(price);

        const size = document.createElement('div');
        size.classList.add('card-details');
        size.textContent = 'Size: ' + item.size;
        card.appendChild(size);

        const color = document.createElement('div');
        color.classList.add('card-details');
        color.textContent = 'Color: ' + item.color;
        card.appendChild(color);

        const category = document.createElement('div');
        category.classList.add('card-details');
        category.textContent = 'Category: ' + item.category;
        card.appendChild(category);

        const quantity = document.createElement('div');
        quantity.classList.add('card-quantity');
        quantity.textContent = 'Quantity: ' + item.quantity;
        card.appendChild(quantity);

        productCart.appendChild(card);
    });
}