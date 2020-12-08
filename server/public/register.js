const registerForm = document.getElementById("register-form");

function canSubmit() {
    return registerForm.username.value.length > 0 && registerForm.password.value.length > 0 && registerForm.password.value === registerForm.value.confirmPassword;
}

function onRegister() {
    if (!canSubmit()) {
        return;
    }

    const user = {
        username: registerForm.username.value,
        password: registerForm.password.value
    }

    const xhr = new XMLHttpRequest();
    xhr.open("post", "/register", true);
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