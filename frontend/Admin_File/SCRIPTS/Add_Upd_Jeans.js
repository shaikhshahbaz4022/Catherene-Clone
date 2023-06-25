const BaseURL = `https://crazy-eel-top-hat.cyclic.app`
const productCart = document.getElementById('cart-container');
// const token = localStorage.getItem("token")
// let show_data = document.getElementById("show-data")
let ItemID_Selected = null

const ProductFetch = () => {
    const optionss = {
        method: "GET",
        headers: {
            "content-type": "application/json",
            "Authorization": `Berear ${token}`
        }
    }
    fetch(`${BaseURL}/admin/api/products`, optionss)
        .then((res) => res.json())
        .then((data) => {
            DisplayProducts(data)
            // show_data.textContent = `Total Products :-  ${data.length}`

        })
        .catch((err) => {
            console.log(err);
        })
}

ProductFetch()

let nameinp = document.getElementById("title");
let imageinp = document.getElementById("image");
let descriptioninp = document.getElementById("description");
let priceinp = document.getElementById("price");
let sizeinp = document.getElementById("size");
let colorinp = document.getElementById("color");
let categoryinp = document.getElementById("category");
let quantityinp = document.getElementById("quantity");

let formele = document.getElementById("productForm")

let formcontainer = document.getElementById("dashboard-section")

function DisplayProducts(data) {

    productCart.innerHTML = ""
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

        const addToCartBtn = document.createElement('button');
        addToCartBtn.classList.add('add-to-cart-button');
        addToCartBtn.textContent = 'UPDATE PRODUCT';
        card.appendChild(addToCartBtn);


        const DeletePRoducts = document.createElement('button');
        DeletePRoducts.classList.add('Delete-button');
        DeletePRoducts.textContent = 'DELETE PRODUCT';
        card.appendChild(DeletePRoducts);



        productCart.appendChild(card);



        addToCartBtn.addEventListener("click", () => {
            formcontainer.style.display = "block"

            populateFormFields(item)
            ItemID_Selected = item._id
            window.scrollTo({ top: 0, behavior: "smooth" });
        })

        DeletePRoducts.addEventListener("click",()=>{
            Swal.fire({
                position: "center",
                icon: "error",
                title: `Product Is Available You Cant Delete`,
                showConfirmButton: false,
                timer: 1500,
            })
        })

    });
}

function populateFormFields(item) {
    nameinp.value = item.title;
    imageinp.value = item.image;
    descriptioninp.value = item.description;
    priceinp.value = item.price;
    sizeinp.value = item.size;
    colorinp.value = item.color;
    categoryinp.value = item.category;
    quantityinp.value = item.quantity;
}

formele.addEventListener("submit", (e) => {
    e.preventDefault()
    let options = {
        method: "PATCH",
        headers: {
            "content-type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
            title: nameinp.value,

            image: imageinp.value,
            description: descriptioninp.value,
            price: priceinp.value,
            size: sizeinp.value,
            color: colorinp.value,
            category: categoryinp.value,

            quantity: quantityinp.value,

        })
    }
    // admin/api/product/update/6496bd71562a3865883a2c90
    fetch(`${BaseURL}/admin/api/product/update/${ItemID_Selected}`, options)
        .then((res) => res.json())
        .then((data) => {
            if (data.ok) {
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: `${data.msg}`,
                    showConfirmButton: false,
                    timer: 1500,
                })
            } else {
                Swal.fire({
                    position: "center",
                    icon: "error",
                    title: `${data.msg}`,
                    showConfirmButton: false,
                    timer: 1500,
                })
            }
            formcontainer.style.display="none"
            ProductFetch()
            ItemID_Selected = null
        })
        .catch((err) => {
            console.log(err);
        })
})