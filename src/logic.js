import objects from './objects.js'
import dom from './domStuff.js'

const createProject = (title) => {
  const project = objects.project(title)
  dom.renderObject(title)
  localStorage.setItem(title, JSON.stringify([]))
}

const createTodo = (e) => {
  const document = dom.domComponents()
  const projectKey = document.newTodo.rel
  const todos = JSON.parse(localStorage.getItem(projectKey))
  const title = document.title.value
  const description = document.description.value
  const dueDate = document.dueDate.value
  const priority = document.select.options[document.select.options.selectedIndex].value
  const todo = objects.todos(title, description, dueDate, priority).getTodo()
  todos.push(todo)
  localStorage.setItem(projectKey, JSON.stringify(todos))
  dom.renderTodos(todo)
}

const deleteProject = (e) => {
  let grantParent = e.parentNode.parentNode
  let parent = e.parentNode
  let title = p.target.previousSibling.value
  grantParent.removeChild(parent)
  localStorage.removeItem(title)
}

const deleteTodo = (e) =>  {
  // var title
  // ELIMINARLO DEL DOM
  // identicar el boton
  // traer al abuelo
  // trair al bisabuelo
  // borrar al abuelo
  // ELEMINARLO DE LOCAL STORAGE
  // 1. como sabemos de que projecto es
  // let data = localStorage
  // for(var key in data){
  //   var project = data[key]
  //   project.getTodos.forEach((item, i) => {
  //     if (item.title === title) {
  //       let newProject = project.removeTodo(i)
  //       localStorage(key, newProject)
  //       console.log(newProject);
  //     }
  //   });
  // }
  const dom = domComponents()
  const index = document.querySelector('#remove')
  const projectKey = dom.newTodo.rel
  const project = localStorage.getItem(projectKey)
  project.removeTodo(index.rel)
  localStorage.setItem(projectKey, project)
  const listItem = index.parentNode.parentNode
  dom.todos.removeChild(listItem)
}

const updateButtonRel = (e) => {
  const projectName = e.target.value
  const dom = domComponents()
  dom.newTodo.rel = projectName
}

const switchStatus = (e) => {
  const dom = domComponents()
  const index = e.target.rel
  const projectKey = dom.newTodo.rel
  const project = localStorage.getItem(projectKey)
  project.getTodos()[index].changeStatus()
}

export default {
  createProject,
  createTodo,
  deleteProject,
  deleteTodo,
  switchStatus,
  updateButtonRel
}
