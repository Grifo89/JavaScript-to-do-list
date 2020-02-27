import objects from './objects';
import dom from './domStuff';

const projectExists = (title) => {
  const data = localStorage;
  let exists = true;
  if (!data[title]) {
    exists = false;
  }
  return exists;
};

const createProject = (title) => {
  objects.project(title);
  const exists = projectExists(title);
  if (!exists) {
    dom.renderObject(title);
    localStorage.setItem(title, JSON.stringify([]));
  }
};


const createTodo = () => {
  const document = dom.domComponents();
  if (document.title.value !== '') {
    const projectKey = document.newTodo.rel;
    const todos = JSON.parse(localStorage.getItem(projectKey));
    const title = document.title.value;
    const description = document.description.value;
    const dueDate = document.dueDate.value;
    const priority = document.select.options[document.select.options.selectedIndex].value;
    const todo = objects.todos(title, description, dueDate, priority).getTodo();
    todos.push(todo);
    localStorage.setItem(projectKey, JSON.stringify(todos));
    dom.renderTodos(todo);
    document.title.value = '';
    document.description.value = '';
    document.dueDate.value = '';
  } else {
    alert('You must provide a To Do title ');
  }
};

const deleteProject = (e) => {
  const grantParent = e.parentNode.parentNode;
  const parent = e.parentNode;
  const title = e.target.previousSibling.value;
  grantParent.removeChild(parent);
  localStorage.removeItem(title);
};

export default {
  createProject,
  createTodo,
  deleteProject,
};
