import './style.css'
import logic from './logic.js'
import dom from './domStuff.js'

const domElements = dom.domComponents()
domElements.newProject.addEventListener('click', (e) => {
  let title = domElements.projectTitle.value
  logic.createProject(title)
  domElements.projectTitle.value = ""
  e.preventDefault()
})
