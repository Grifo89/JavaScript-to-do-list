const project = (name) => {
  let todos = []
  const pushTodo = (todo) => {
    todos.push(todo)
  }
  const removeTodo = (index) => {
    todos = todos.filter(todo =>  todo != todos[index]);
  }
  const getName = () => name
  const getTodos = () => todos

  return {
    pushTodo,
    getName,
    getTodos,
    removeTodo
  }
}

const todos = (title, description, dueDate, priority, completed=false) => {
  const getTodo = () => ({
    title: title,
    description: description,
    dueDate: dueDate,
    priority: priority,
    completed: completed,
  })
  const changeStatus = (completed) => getTodo().completed = completed
  return {
    getTodo,
    changeStatus
  }
}

export default {
  project,
  todos
};
