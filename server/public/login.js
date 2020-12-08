function onLogin() {
    const loginForm = document.getElementById("login-form");

    const user = {
        username: loginForm.username.value,
        password: loginForm.password.value
    }

    const xhr = new XMLHttpRequest();
    xhr.open("post", "/login", true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8")
    xhr.send(JSON.stringify(user));

    xhr.onload = () => {
        switch (xhr.status) {
            case 200:
                console.log(xhr.response);
                window.location = "/";
                break;
        }
    }
}