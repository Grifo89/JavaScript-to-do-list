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
 return {
   newProject,
   newTodo,
   projects,
   todos,
   title,
   description,
   dueDate,
   select,
   projectTitle
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

const _addListenerToFormChild = (inputElement, targetElement) => {
  inputElement.addEventListener('click', (e) => {
    targetElement.disabled = false
    e.preventDefault() 
  })
}

function renderTodos(todo) {
  const projectKey = domComponents().newTodo.rel? domComponents().newTodo.rel : "defaultProject"
  const todosParent = domComponents().todos
  const li = document.createElement('li')
  const form = document.createElement('form')
  form.classList.add('todo-form')
  const titleDiv = document.createElement('div')
  titleDiv.classList.add('todo-title')
  const inputTitle = document.createElement('input');
  inputTitle.type = 'text'
  inputTitle.value = todo.title
  inputTitle.disabled = true
  titleDiv.appendChild(inputTitle)
  _addListenerToFormChild(titleDiv, inputTitle)
  const descriptionDiv = document.createElement('div')
  const inputDescription = document.createElement('textarea')
  inputDescription.disabled = true
  inputDescription.value = todo.description
  descriptionDiv.appendChild(inputDescription)
  _addListenerToFormChild(descriptionDiv, inputDescription)
  const inputDate = document.createElement('input')
  inputDate.disabled = true
  inputDate.value = todo.dueDate
  inputDate.type = 'date'
  const dateDiv = document.createElement('div')
  dateDiv.appendChild(inputDate)
  _addListenerToFormChild(dateDiv, inputDate)
  const inputPriority = document.createElement('select')
  inputPriority.disabled = true
  const optionHigh = document.createElement('option')
  const optionMedium = document.createElement('option')
  const optionLow = document.createElement('option')
  optionHigh.value = 'high'
  optionHigh.textContent = 'High'
  optionMedium.value = 'medium'
  optionMedium.textContent = 'Medium'
  optionLow.value = 'low'
  optionLow.textContent = 'Low'
  switch (todo.priority) {
    case 'high':
      optionHigh.selected = true
      break;
    case 'medium':
      optionMedium.selected = true
      break
    default:
      optionLow.selected = true
      break;
  }
  inputPriority.appendChild(optionHigh)
  inputPriority.appendChild(optionMedium)
  inputPriority.appendChild(optionLow)
 
  form.appendChild(titleDiv)
  form.appendChild(descriptionDiv)
  form.appendChild(dateDiv)
  const div = document.createElement('div')
  const remove = document.createElement('button')
  const completed = document.createElement('span')
  remove.addEventListener('click', (e) =>  {
    let todos = JSON.parse(localStorage.getItem(projectKey))
    const inputTitle = e.target.parentNode.previousElementSibling.previousElementSibling.childNodes[0].childNodes[0].value
    let todosP = todos.filter(todo =>  todo.title !== inputTitle)
    clearList()
    renderTodoList(todosP)
    localStorage.setItem(projectKey, JSON.stringify(todosP))
    e.preventDefault()
  })
  remove.classList.add('remove')
  remove.textContent = 'Delete'
  const status = document.createElement('button')
  status.addEventListener('click', (e)=>{
    let todos = JSON.parse(localStorage.getItem(projectKey))
    let index
    todos.forEach((todo, i) =>  {
      console.log(e.target.parentNode.previousElementSibling.previousElementSibling.childNodes[0].childNodes[0].value);
      const inputTitle = e.target.parentNode.previousElementSibling.previousElementSibling.childNodes[0].childNodes[0].value
      console.log(e.target.parentNode.previousElementSibling.previousElementSibling.previousElementSibling)
      if (todo.title === inputTitle) {
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
  status.textContent = 'done'
  const details = document.createElement('div')
  details.classList.add('todo-details')
  if (todo.completed) {
    completed.textContent = "Done"
  } else {
    completed.textContent = "Missing"
  }
  details.appendChild(inputPriority)
  details.appendChild(completed)
  _addListenerToFormChild(details, inputPriority)
  form.appendChild(details)
  div.appendChild(remove)
  div.appendChild(status)
  li.appendChild(form)
  li.appendChild(details)
  li.appendChild(div).classList.add('todo-actions')
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
