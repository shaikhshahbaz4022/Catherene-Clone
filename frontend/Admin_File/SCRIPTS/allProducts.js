
const productCart = document.getElementById('cart-container');
// const token = localStorage.getItem("token")
let total = document.getElementById("show_total-products")

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

ProductFetch()
function DisplayProducts(data){
    total.textContent = `Total Available Products ${data.length}`
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