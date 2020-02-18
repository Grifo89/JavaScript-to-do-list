import './style.css'
import objects from './objects.js'
import logic from './logic.js'
import domComponents from './domStuff.js'

console.log(objects.project('addsads',[]).getName())
console.log(objects.todos('ciencias','','','').getTodo())
const dom = domComponents()
console.log(dom.newProject)
console.log(dom.newTodo)
console.log(dom.description)
console.log(dom.dueDate)
console.log(dom.projects)
console.log(dom.select)
console.log(dom.title)
console.log(dom.todos)