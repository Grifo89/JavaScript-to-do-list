const createProject = () => {
  const dom = domComponents()
  // Retrieve title from input value
  const title = dom.projectTitle.value
  const project = objects.project(title)
  console.log(project)
  dom.renderObject(title)
  localStorage.setItem(title, project)
}

const createTodo = (projectKey) => {
  const project = localStorage.getItem(projectKey)
  const dom = domComponents()
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
  let data = localStorage
  for(var key in data){
    var project = data[key]
    project.getTodos.forEach((item, i) => {
      if (item.title === title) {
        let newProject = project.removeTodo(i)
        localStorage(key, newProject)
        console.log(newProject);
      }
    });
  }
}

export default createProject
