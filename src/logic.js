import objects from './objects.js'
import dom from './domStuff.js'

const createProject = (title) => {
  const project = objects.project(title)
  console.log(project)
  dom.renderObject(title)
  localStorage.setItem(title, project)
}

const createTodo = (e) => {
  const dom = dom.domComponents()
  const projectKey = dom.newTodo.rel
  const project = localStorage.getItem(projectKey)
  const title = dom.title.value
  const description = dom.description.value
  const dueDate = dom.dueDate.value
  const priority = dom.select.options[select.selectedIndex].value
  const todo = todos(title, description, dueDate, priority)
  project.pushTodo(todo)
  localStorage.setItem(projectKey, project)
}

const deleteProject = (e) => {
  let grantParent = e.parentNode.parentNode
  let parent = e.parentNode
  let title = p.target.previousSibling.value
  grantParent.removeChild(parent)
  lacalStorage.removeItem(title)
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
