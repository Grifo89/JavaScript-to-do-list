const domComponents = () => {
 const newProject = document.getElementById('new-project')
 const newTodo = document.getElementById('new-todo')
 const projects = document.getElementById('projects')
 const todos = document.getElementById('todos')
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

// Renders

function renderObject(objectName) {
  const objectParent = domComponents().projects
  objectParent.appendChild("li").addClass("project-item").textContent = objectName
}

function renderTodos(todos) {
  const todosParent = domComponents().todos
  todos.forEach((todo, i) => {
    const li = document.createElement('li')
    const div = document.createElement('div')
    const remove = document.createElement('button')
    const h2 = document.createElement('h2').addClass('todo-title')
    h2.textContent = todo.title
    const p = document.createElement('p')
    p.addClass('todo-description')
    p.textContent = todo.description
    remove.id = 'remove'
    remove.textContent = 'Delete'
    remove.rel = i
    const status = document.createElement('button')
    status.id = 'status'
    status.rel = i
    status.textContent = 'done'
    const details = document.createElement('div')
    details.addClass('todo-details')
    const date = document.createElement('span')
    date.addClass('due-date')
    date.textContent = todo.dueDate
    const priority = document.createElement('span')
    priority.addClass('priority')
    priority.textContent = todo.priority
    details.appendChild(date)
    details.appendChild(priority)
    div.appendChild(remove)
    div.appendChild(status)
    li.appendChild(h2)
    li.appendChild(details)
    li.appendChild(div).addClass('todo-item')
    todosParent.appendChild(li)
  });
}

export default {
  domComponents,
  renderObject,
  renderTodos
}
