import './style.css'
import logic from './logic.js'
import dom from './domStuff.js'
import objects from './objects.js'

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
