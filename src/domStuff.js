const domComponents = () => {
 let newProject = document.getElementById('new-project')
 let newTodo = document.getElementById('new-todo')
 let projects = document.getElementById('projects')
 let todos = document.getElementById('todos')
 let projectTitle = document.querySelector('input[name="project-title"]')
 let title = document.querySelector('input[name="title"]')
 let description = document.querySelector('input[name="description"]')
 let dueDate = document.querySelector('input[name="due-date"]')
 let select = document.querySelector('select[name="priority"]')
 let modal = document.querySelector('.modal')
 let editTitle = document.querySelector('input[name="title-edit"]')
 let editDescription = document.querySelector(' input[name="description-edit"]')
 let editDueDate = document.querySelector('input[name="due-date-edit"]')
 let editSelect = document.querySelector('select[name="priority-edit"]')
 let save = document.querySelector('#save-edit')
 let cancel = document.querySelector('#cancel-edit')
 return {
   newProject,
   newTodo,
   projects,
   todos,
   title,
   description,
   dueDate,
   select,
   projectTitle,
   modal,
   editTitle,
   editDescription,
   editDueDate,
   editSelect,
   save,
   cancel
 }
};


function renderObject(objectName) {
  const node = document.createElement("li");
  node.classList.add('project-title')
  const objectParent = domComponents().projects
  node.textContent = objectName
  node.addEventListener('click', (e) => {
    console.log(e.target.textContent);
    let projectKeyObject = e.target.textContent
    domComponents().newTodo.rel = projectKeyObject
    let todos = JSON.parse(localStorage.getItem(projectKeyObject))
    clearList()
    renderTodoList(todos)
    e.preventDefault()
  })
  objectParent.appendChild(node).classList.add("project-item")
}

function renderTodos(todo) {
  const projectKey = domComponents().newTodo.rel? domComponents().newTodo.rel : "defaultProject"
  const todosParent = domComponents().todos
  const li = document.createElement('li')
  const div = document.createElement('div')
  const remove = document.createElement('button')
  const edit = document.createElement('button')
  const completed = document.createElement('span')
  remove.addEventListener('click', (e) =>  {
    let todos = JSON.parse(localStorage.getItem(projectKey))
    let todosP = todos.filter(todo =>  todo.title !== e.target.parentNode.previousElementSibling.previousElementSibling.previousElementSibling.textContent)
    clearList()
    renderTodoList(todosP)
    localStorage.setItem(projectKey, JSON.stringify(todosP))
    e.preventDefault()
  })
  remove.classList.add('remove')
  remove.textContent = 'Delete'
  const h2 = document.createElement('h2')
  h2.classList.add('todo-title')
  h2.textContent = todo.title
  const p = document.createElement('p')
  p.classList.add('todo-description')
  p.textContent = todo.description
  const status = document.createElement('button')
  status.addEventListener('click', (e)=>{
    let todos = JSON.parse(localStorage.getItem(projectKey))
    let index
    todos.forEach((todo, i) =>  {
      if (todo.title === e.target.parentNode.previousElementSibling.previousElementSibling.previousElementSibling.textContent) {
        index = i
      }
    })
    todos[index].completed = true
    clearList()
    renderTodoList(todos)
    localStorage.setItem(projectKey, JSON.stringify(todos))
    e.preventDefault()
  })
  status.classList.add('status')
  status.textContent = 'Done'
  edit.classList.add('edit')
  edit.textContent = 'Edit'
  edit.addEventListener('click', () => {
    domComponents().modal.style.display = 'block'
    domComponents().save.rel = projectKey
    domComponents().save.classList.add(todo.title.replace(/\s/g, ''))
    domComponents().editTitle.value === ""
    domComponents().editDescription.value === ""
    domComponents().editDueDate.value === ""

  })
  const details = document.createElement('div')
  details.classList.add('todo-details')
  const date = document.createElement('span')
  date.classList.add('due-date')
  date.textContent = todo.dueDate
  const priority = document.createElement('span')
  completed.classList.add('completed')
  priority.classList.add('priority')
  priority.textContent = todo.priority
  details.appendChild(date)
  details.appendChild(priority)
  if (todo.completed) {
    completed.textContent = "Done"
  } else {
    completed.textContent = "Missing"
  }
  details.appendChild(completed)
  div.appendChild(remove)
  div.appendChild(status)
  div.appendChild(edit)
  li.appendChild(h2)
  li.appendChild(p)
  li.appendChild(details)
  li.appendChild(div).classList.add('todo-item')
  todosParent.appendChild(li)
}

const clearList = () => {
  if (domComponents().todos.childNodes) {
    let child = domComponents().todos.lastElementChild
    while (child) {
      domComponents().todos.removeChild(child)
      child = domComponents().todos.lastElementChild
    }
  }
}

const renderTodoList = (todos) =>{
  todos.forEach((item) => {
    if (item) {
      renderTodos(item)
    }
  });
}

export default {
  domComponents,
  renderObject,
  renderTodos,
  clearList,
  renderTodoList
}
