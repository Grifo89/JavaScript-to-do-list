const project = (name) => {
  const getName = () => name
  return {
    getName
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
  const changeStatus = () => getTodo().completed = !getTodo().completed
  return {
    getTodo,
    changeStatus
  }
}

export default {
  project,
  todos
};
