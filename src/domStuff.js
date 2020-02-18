const domComponents = () => {
 const newProject = document.getElementById('new-project')
 const newTodo = document.getElementById('new-todo')
 const projects = document.getElementById('projects')
 const todos = document.getElementById('todos')
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
   select
 }
};

// Renders

function renderObject(objectName) {
  const objectParent = domComponents().projects
  objectParent.appendChild("li").addClass("project-item").textContent = objectName
}

function renderTodos(todos) {
  todos.forEach((todo) => {

  });

}

export default domComponents
