const init = () => {
    document.querySelector('#btnNovaTarefa').addEventListener('click', novaTarefa)
    document.querySelector('#inputNovaTarefa').addEventListener('keypress', (e) => {
        if(e.which == 13){
            document.querySelector('#btnNovaTarefa').click()
        }
    })
    
}

const novaTarefa = (e) => {
    e.preventDefault();

    const data = acessData()
    console.log(data)

    const url = "https://lista-de-tarefas-tera.herokuapp.com/tasks"

    if(!data) {
        return
    }

    fetch(`${url}`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "same-origin"
    })
    .then((response) => {
        window.location.href = "/tarefas"
    })
    .catch((e) => {
        return console.error(e)
    })

}

const acessData = () => {
    return {
        "content": document.querySelector('#inputNovaTarefa').value
    }
}

init()

const acessData2 = (message) => {
    return {
        "content": message
    }
}

const mostrarTarefas = () => {
    fetch("https://lista-de-tarefas-tera.herokuapp.com/tasks")
    .then((response) => {
        return response.json()
        .then((data) => {
            
            for(content of data) {
                let elementoTarefa = document.createElement("li")
                console.log(content)
                
                let contentTarefa = document.createTextNode(content)

                let divTarefa = document.createElement('div')

                let e = `'${content}'`

                acessData2(e)

                // let btnCheck = document.createElement('input')
                // btnCheck.setAttribute('type', 'button')
                // btnCheck.setAttribute('class', 'button-check')
                // btnCheck.setAttribute('onclick', `concluirTarefa(${e})`)
                // divTarefa.appendChild(btnCheck)

                let btnLixeira = document.createElement("input")
                btnLixeira.setAttribute('type', 'button')
                btnLixeira.setAttribute('class', 'button')
                btnLixeira.setAttribute('onclick', `deletarTarefa(${e})`)

                elementoTarefa.appendChild(contentTarefa)
                document.querySelector('ul').appendChild(elementoTarefa)
                divTarefa.appendChild(btnLixeira)
                elementoTarefa.appendChild(divTarefa)

            }
           
        })
    })
    .catch((error) => {
        return console.error(error)
    })
}

const deletarTarefa = (e) => {

    const data = acessData2(e)
    console.log(data)

    const url = "https://lista-de-tarefas-tera.herokuapp.com/tasks"

    if(!data) {
        return
    }

    fetch(`${url}`, {
        method: 'DELETE',
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "same-origin"
    })
    .then((response) => {
        window.location.href = "/tarefas"
    })
    .catch((e) => {
        return console.error(e)
    })
}

const concluirTarefa = (e) => {

    const data = acessData2(e)
    console.log(data)

    const url = "https://lista-de-tarefas-tera.herokuapp.com/tasks"

    if(!data) {
        return
    }

    fetch(`${url}`, {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "same-origin"
    })
    .then((response) => {
        window.location.href = "/tarefas"
    })
    .catch((e) => {
        return console.error(e)
    })
}

mostrarTarefas()