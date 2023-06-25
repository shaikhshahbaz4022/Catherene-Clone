// const BaseServerUrl = `https://worrisome-hospital-gown-bull.cyclic.app`

const BaseServerUrl = `https://crazy-eel-top-hat.cyclic.app`


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
            console.log(data);
            showname.innerHTML = `Mr. ${nameel.value} Registration Succesfull`
            Swal.fire({
                position: "center",
                icon: "success",
                title: `${data.msg}`,
                showConfirmButton: false,
                timer: 1500,
            })
            setTimeout(() => {
                window.location.href = "login.html"
            }, 3000)
            console.log(data);
        }).catch((err) => {
            console.log(err);
        })
})

// let click_google = document.getElementById("click-google")
// click_google.addEventListener("click",()=>{
//     window.location.href=""
// })
// function getCookie(name) {
//     const value = `; ${document.cookie}`;
//     const parts = value.split(`; ${name}=`);
    
//     if (parts.length === 2) {
//       return parts.pop().split(';').shift();
//     }
//   }

//   const token = getCookie('token');
//   localStorage.setItem("google",token)
//   let g = document.cookie
//   console.log(g);
//   console.log(token);