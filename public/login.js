const init = () => {
    document.querySelector('#signUpButton').addEventListener('click', newUser)
}

const newUser = (e) => {

    const userName = document.querySelector('#inputNome').value
    const userUsername = document.querySelector('#inputUsername').value
    const userEmail = document.querySelector('#inputEmail').value
    const userPassword = document.querySelector('#inputSenha').value
    const userConfirmPassword = document.querySelector('#inputConfirmPassword').value

    if(userName && userUsername && userEmail && userPassword && userConfirmPassword) {
        e.preventDefault(e);

        const data = acessData()
    
        const url = "http://localhost:3000/user"
    
        if(!data) {
            return
        }
        if(userPassword != userConfirmPassword) {
            alert('As senhas não conferem')
        }
        if(userPassword == userConfirmPassword) {
            fetch(`${url}/signUp`, {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "same-origin"
            })
            .then((response) => {
                alert(response.statusText)
                if(response.status == 200) {
                    window.location.href = "/tarefas"
                }
            })
            .catch((e) => {
                return console.error(e)
            })
        }
    }
}

const acessData = () => {
    return {
        "name": document.querySelector('#inputNome').value,
        "username": document.querySelector('#inputUsername').value,
        "email": document.querySelector('#inputEmail').value,
        "password": document.querySelector('#inputSenha').value,
        "confirmPassword": document.querySelector('#inputConfirmPassword').value
    }
}

init()