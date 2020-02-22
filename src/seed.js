import dom from './domStuff.js'
import logic from './logic.js'

let init = (function() {
  'use strict';


  const defaultProject = "defaultProject"

  if (!localStorage.getItem('defaultProject')) {
    let todosArray = [
      {title: "Lorem", description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.", dueDate: Date(Date.now()), priority: "low", completed: false },
      {title: "Ipsum", description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.", dueDate: Date(Date.now()), priority: "medium", completed: false },
      {title: "dolor", description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.", dueDate: Date(Date.now()), priority: "low", completed: true },
    ]


    localStorage.setItem(defaultProject, JSON.stringify(todosArray))

  }

  const data = localStorage

  for (var i = 0; i < data.length; i++) {
    let key = data.key(i)
    dom.renderObject(key)
  }
  let todos = JSON.parse(localStorage.getItem(defaultProject))
  dom.renderTodoList(todos)



}());

export default init
