const project = (name) => {
  const getName = () => name;
  return {
    getName,
  };
};

const todos = (title, description, dueDate, priority, completed = false) => {
  const getTodo = () => ({
    title,
    description,
    dueDate,
    priority,
    completed,
  });
  return {
    getTodo,
  };
};

export default {
  project,
  todos,
};
