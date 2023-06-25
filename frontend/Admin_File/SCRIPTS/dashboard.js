let user = document.getElementById("user")
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
            user.textContent = data.data.length

        })
        .catch((err) => {
            console.log(err);
        });
}

Fetch()

let prod = document.getElementById("prod")
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
            prod.textContent = data.length

        })
        .catch((err) => {
            console.log(err);
        })
}

ProductFetch()
let jean = document.getElementById("jean")
const JeansGet = () => {
    const optionss = {
        method: "GET",
        headers: {
            "content-type": "application/json",
            "Authorization": `Berear ${token}`
        }
    }
    fetch(`${Base_Server_url}/jeans`, optionss)
        .then((res) => res.json())
        .then((data) => {
            jean.textContent = data.length

        })
        .catch((err) => {
            console.log(err);
        })
}
JeansGet()

