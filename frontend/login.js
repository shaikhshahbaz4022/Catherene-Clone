const BaseServerUrl = `https://crazy-eel-top-hat.cyclic.app`

let formel = document.querySelector("form")
// let user = JSON.parse(localStorage.getItem("user")) || []
// console.log(user);

let emailel = document.getElementById("email")
let passwordel = document.getElementById("password")
let showname = document.getElementById("showname")
// console.log("object");
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
            if (data.msg == "Login successful") {


           

                showname.innerHTML = `Mr. ${emailel.value} Login Succesfull`
                localStorage.setItem("token", data.token)

                localStorage.setItem("user", JSON.stringify(data.userdetails))
                localStorage.setItem("userID", data.userdetails._id)
            


                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: `${data.msg}`,
                    showConfirmButton: false,
                    timer: 1500,
                })
                let role = data.userdetails.role
                if (role == "Admin") {
                    setTimeout(() => {
                        window.location.href = "./Admin_File/HTML/dashboard.html"
                    }, 3000);
                } else {
                    setTimeout(() => {
                        window.location.href = "index.html"
                    }, 3000)

                }

                console.log(data);
            }else{
                alert("wrong credentials")
            }



        }).catch((err) => {
            console.log(err);
        })
})
