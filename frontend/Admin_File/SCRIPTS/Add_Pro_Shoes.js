

let nameinp = document.getElementById("title");
let imageinp = document.getElementById("image");
let descriptioninp = document.getElementById("description");
let priceinp = document.getElementById("price");
let sizeinp = document.getElementById("size");
let colorinp = document.getElementById("color");
let categoryinp = document.getElementById("category");
let quantityinp = document.getElementById("quantity");

let formele = document.getElementById("productForm")

formele.addEventListener("submit", (e) => {
    e.preventDefault()
    FetchAndAdd()
})

function FetchAndAdd() {

    let newBody = {
        title: nameinp.value,
        image: imageinp.value,
        description: descriptioninp.value,
        price: priceinp.value,
        size: sizeinp.value,
        color: colorinp.value,
        category: categoryinp.value,
        quantity: quantityinp.value,
    }
    console.log(newBody);
    const options = {
        method: "POST",
        headers: {
            "content-type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(newBody)
    }
    fetch(`${Base_Server_url}/admin/api/shoes`, options)
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
                    title: `Error While Adding Jeans`,
                    showConfirmButton: false,
                    timer: 1500,
                })
            }
            setTimeout(() => {
                window.location.href = "../HTML/allproducts.html"
            }, 2500);
        })
        .catch((err) => {
            console.log(err);
        })
}