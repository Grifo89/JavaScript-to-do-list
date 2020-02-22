// import './style.css'
import logic from './logic.js'
import dom from './domStuff.js'
import objects from './objects.js'
import init from './seed.js'

const domElements = dom.domComponents()

domElements.newProject.addEventListener('click', (e) => {
  let title = domElements.projectTitle.value
  if (title) {
    logic.createProject(title)
    domElements.projectTitle.value = ""
    domElements.newTodo.rel = title
    dom.clearList()
    e.preventDefault()
  } else {
    alert('You should provide a project title')
  }
  e.preventDefault()
})

domElements.newTodo.addEventListener('click', (e) => {
  logic.createTodo(e)
  e.preventDefault()
})

domElements.cancel.addEventListener('click', (e) => {
  domElements.modal.style.display = 'none'
  e.preventDefault()
})

domElements.save.addEventListener('click', (e) => {
  let key = e.target.rel
  let todos = JSON.parse(localStorage.getItem(key))
  let index = null
  todos.forEach((item, i) => {
    if (e.target.classList[0] === item.title) {
      index = i
      domElements.save.classList.remove(item.title)
    }
  });
  todos[index].title = domElements.editTitle.value === ""?todos[index].title:domElements.editTitle.value
  todos[index].description = domElements.editDescription.value === ""?todos[index].description:domElements.editDescription.value
  todos[index].dueDate = domElements.editDueDate.value === ""?todos[index].dueDate:domElements.editDueDate.value
  todos[index].priority = domElements.editSelect.options[domElements.editSelect.options.selectedIndex].value === todos[index].priority? todos[index].priority:domElements.editSelect.options[domElements.editSelect.options.selectedIndex].value
  dom.clearList()
  dom.renderTodoList(todos)
  localStorage.setItem(key, JSON.stringify(todos))
  domElements.modal.style.display = 'none'
  domElements.editTitle.value === ""
  domElements.editDescription.value === ""
  domElements.editDueDate.value === ""
  e.preventDefault()
})
