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
  return {
    getTodo,
  }
}

export default {
  project,
  todos
};
