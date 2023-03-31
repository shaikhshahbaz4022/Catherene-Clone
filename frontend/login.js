const BaseServerUrl = `http://localhost:8000`

let formel = document.querySelector("form")

let emailel = document.getElementById("email")
let passwordel = document.getElementById("password")
let showname = document.getElementById("showname")
console.log("object");
formel.addEventListener("submit", (e) => {
    e.preventDefault()

    let obj = {

        email: emailel.value,
        password: passwordel.value,

    }

    fetch(`${BaseServerUrl}/users/login`, {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(obj)

    })
        .then((res) => {
            return res.json()
        })
        .then((data) => {
            alert("Login succesfull")
            showname.innerHTML = `Mr. ${emailel.value} Login Succesfull`
            localStorage.setItem("token", data.token)
            console.log(data.token);
            console.log(localStorage);
            // setTimeout(() => {
            //     window.location.href = "product.html"
            // }, 3000)
            // console.log(data);
        }).catch((err) => {
            console.log(err);
        })
})