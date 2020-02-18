const project = (name, todo) => {
  let todos = []
  const pushTodo = () => {
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

const todos = (title, description, dueDate, priority) => {
  const getTodo = () => ({title, description, dueDate, priority})
  return {
    getTodo
  }
}

export default {
  project,
  todos
};