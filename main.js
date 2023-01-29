let ul = document.querySelector(".todoList")
let input = document.querySelector("[name='task']")
let btnAdd = document.querySelector("button")

getTodoList()

btnAdd.addEventListener("click", () => {
    let task = input.value
    addToDo(task)
})


function displayTodoList(data) {
    ul.innerHTML = ""
    data.forEach((item) => {
        let li = document.createElement("li")
        li.className = "list-group-item";
        if (item.status) {
            li.classList.add("bg-success")

        } else {
            li.classList.add("bg-warning")
        }
        li.onclick = function () {
            changeStatus(item.id, !item.status)
        }
        li.innerText = item.task
        ul.appendChild(li)
    })
}

async function addToDo(task) {
    let res = await fetch("http://localhost:5000/addTask", {
        method: "POST",
        body: JSON.stringify({task: task})
    })
    let data = await res.json()
    displayTodoList(data)
}

async function getTodoList() {
    let res = await fetch("http://localhost:5000/getData")
    let data = await res.json()
    displayTodoList(data)
}

async function changeStatus(id, status) {
    let res = await fetch("http://localhost:5000/changeStatus", {
        method: "POST",
        body: JSON.stringify({
            id: id,
            status: status
        })
    })
    let data = await res.json()
    displayTodoList(data)

}