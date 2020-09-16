const classNames = {
  TODO_ITEM: 'todo-container',
  TODO_CHECKBOX: 'todo-checkbox',
  TODO_TEXT: 'todo-text',
  TODO_DELETE: 'todo-delete',
}

const list = document.querySelector('#todo-list')
const itemCountSpan = document.getElementById('item-count')
const uncheckedCountSpan = document.getElementById('unchecked-count')

let uuid = 0

let itemcount = 0
let uncheckedcount = 0

let todolist = []
class todo{
  checked = false
  constructor(task){
    this.task = task
    this.num=uuid
    uuid++
  }
}

function newTodo() {
  let tasktext = document.getElementById("newtaskinput").value
  if (tasktext===""){
    alert("Fill out todo field")
    return
  }
  let newtask = new todo(tasktext)
  document.getElementById("newtaskinput").value = ""
  todolist.push(newtask)
  console.log(todolist)
  rendertodolist()
  return
}



function rendertodolist() {
  let todos = document.querySelectorAll(".todo-container")
  if (todos!==null){
    todos.forEach(element => {
      element.remove()
    });
  }
itemcount = 0
uncheckedcount =0
  todolist.forEach(element => {

    let container = document.createElement("div")
    container.classList.add("todo-container")

    let box = document.createElement("div")
    box.classList.add("todo-checkbox")

    let checkbox = document.createElement("input")
    checkbox.checked=element.checked
    checkbox.type="checkbox"
    checkbox.addEventListener(
      'change',
      function(){
        updatecompletion(element.num)
      }
    );

    let text = document.createElement("div")
    text.classList.add("todo-text")
    text.innerText=element.task

    let deletebutton = document.createElement("button")
    deletebutton.classList.add("todo-delete")
    deletebutton.innerText="Delete"
    deletebutton.onclick=(()=>{removetodo(element.num)})

    container.appendChild(checkbox)
    container.appendChild(text)
    container.appendChild(deletebutton)

    list.appendChild(container)

    itemcount++

    if(element.checked===false){
      uncheckedcount++
    }
  });

  itemCountSpan.innerHTML=itemcount
  uncheckedCountSpan.innerHTML=uncheckedcount
}

function updatecompletion(id){
  let i = 0
  todolist.forEach(element => {
    if(element.num===id){
      todolist[i].checked=!todolist[i].checked
      rendertodolist()
      return
    }
    i++
  })
}



function removetodo(id){
  todolist=todolist.filter(item => item.num!==id)
  rendertodolist()
}