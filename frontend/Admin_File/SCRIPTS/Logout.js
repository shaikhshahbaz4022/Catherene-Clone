const Base_Server_url = `https://crazy-eel-top-hat.cyclic.app`
let token = localStorage.getItem("token")

let logoutbtn = document.getElementById('logout')

if (!token) {
    logoutbtn.innerText = "Login"
    logoutbtn.addEventListener("click", () => {
        window.location.href = "../../login.html"
    })
} else {
    logoutbtn.addEventListener("click", () => {
        LogoutFunc()
    })
}

function LogoutFunc() {

    let options = {
        method: "POST",
        headers: {
            "content-type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    }
    fetch(`${Base_Server_url}/users/logout`, options)
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            if (data.ok) {
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: `${data.msg}`,
                    showConfirmButton: false,
                    timer: 1500,
                })

                localStorage.clear()
                setTimeout(() => {
                    window.location.href = "../../login.html"
                }, 2500);
            } else {
                Swal.fire({
                    position: "center",
                    icon: "error",
                    title: `${data.msg}`,
                    showConfirmButton: false,
                    timer: 1500,
                })
            }
        })
        .catch((err) => {
            console.log(err)
        })
}