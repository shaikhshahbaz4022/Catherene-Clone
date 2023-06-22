// const BaseServerUrl = `https://worrisome-hospital-gown-bull.cyclic.app`

const BaseServerUrl = `http://localhost:8080/`


let formel = document.querySelector("form")
let nameel = document.getElementById('name')
let emailel = document.getElementById("email")
let passwordel = document.getElementById("password")
let showname = document.getElementById("showname")

formel.addEventListener("submit", (e) => {
    e.preventDefault()

    let obj = {
        name: nameel.value,
        email: emailel.value,
        password: passwordel.value,

    }

    fetch(`${BaseServerUrl}/users/register`, {
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
            alert("registerd succesfull")
            showname.innerHTML = `Mr. ${nameel.value} Registration Succesfull`

            setTimeout(() => {
                window.location.href = "login.html"
            }, 3000)
            console.log(data);
        }).catch((err) => {
            console.log(err);
        })
})