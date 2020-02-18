const project = (name) => {
  let todos = []
  const pushTodo = (todo) => {
    todos.push(todo)
  }
  const getName = () => name
  const getTodos = () => todos
  
  return { 
    pushTodo,
    getName,
    getTodos
  }
}

const todos = (title, description, dueDate, priority, completed=false) => {
  const getTodo = () => ({title, description, dueDate, priority, completed})
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