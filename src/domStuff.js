let renderTodoList = null;
let removeTodo = null;
let completeTodo = null;
let domComponents = null;

domComponents = () => {
  const newProject = document.getElementById('new-project');
  const newTodo = document.getElementById('new-todo');
  const projects = document.getElementById('projects');
  const todos = document.getElementById('todos');
  const projectTitle = document.querySelector('input[name="project-title"]');
  const title = document.querySelector('input[name="title"]');
  const description = document.querySelector('textarea[name="description"]');
  const dueDate = document.querySelector('input[name="due-date"]');
  const select = document.querySelector('select[name="priority"]');
  const modal = document.querySelector('.modal');
  const editTitle = document.querySelector('input[name="title-edit"]');
  const editDescription = document.querySelector(' input[name="description-edit"]');
  const editDueDate = document.querySelector('input[name="due-date-edit"]');
  const editSelect = document.querySelector('select[name="priority-edit"]');
  const save = document.querySelector('#save-edit');
  const cancel = document.querySelector('#cancel-edit');
  return {
    newProject,
    newTodo,
    projects,
    todos,
    title,
    description,
    dueDate,
    select,
    projectTitle,
    modal,
    editTitle,
    editDescription,
    editDueDate,
    editSelect,
    save,
    cancel,
  };
};

const clearList = () => {
  if (domComponents().todos.childNodes) {
    let child = domComponents().todos.lastElementChild;
    while (child) {
      domComponents().todos.removeChild(child);
      child = domComponents().todos.lastElementChild;
    }
  }
};


function renderTodos(todo) {
  const projectKey = domComponents().newTodo.rel ? domComponents().newTodo.rel : 'defaultProject';
  const todosParent = domComponents().todos;
  const li = document.createElement('li');
  const div = document.createElement('div');
  const remove = document.createElement('button');
  const edit = document.createElement('button');
  const completed = document.createElement('span');
  if (todo.completed) {
    completed.classList.add('done');
  }
  remove.addEventListener('click', (e) => {
    const todos = JSON.parse(localStorage.getItem(projectKey));
    const todosUpdated = removeTodo(e, todos);
    localStorage.setItem(projectKey, JSON.stringify(todosUpdated));
    e.preventDefault();
  });
  remove.classList.add('remove');
  remove.textContent = 'Delete';
  const h2 = document.createElement('h2');
  h2.classList.add('todo-title');
  h2.classList.add(`${todo.priority}`);
  h2.textContent = todo.title;
  const p = document.createElement('p');
  p.classList.add('todo-description');
  p.textContent = todo.description;
  const status = document.createElement('button');
  status.addEventListener('click', (e) => {
    const todos = JSON.parse(localStorage.getItem(projectKey));
    const todosUpdated = completeTodo(e, todos);
    localStorage.setItem(projectKey, JSON.stringify(todosUpdated));
    e.preventDefault();
  });
  status.classList.add('status');
  status.textContent = 'Done';
  edit.classList.add('edit');
  edit.textContent = 'Edit';
  edit.addEventListener('click', () => {
    domComponents().modal.style.display = 'block';
    domComponents().save.rel = projectKey;
    domComponents().save.classList.add(todo.title.replace(/\s/g, ''));
    domComponents().editTitle.value = '';
    domComponents().editDescription.value = '';
    domComponents().editDueDate.value = '';
  });
  const details = document.createElement('div');
  details.classList.add('todo-details');
  const date = document.createElement('span');
  date.classList.add('due-date');
  date.textContent = todo.dueDate;
  const priority = document.createElement('span');
  completed.classList.add('completed');
  priority.classList.add('priority');
  priority.textContent = todo.priority;
  details.appendChild(date);
  details.appendChild(priority);
  if (todo.completed) {
    completed.textContent = 'Done';
  } else {
    completed.textContent = 'Missing';
  }
  details.appendChild(completed);
  div.appendChild(remove);
  div.appendChild(status);
  div.appendChild(edit);
  li.appendChild(h2);
  li.appendChild(p);
  li.appendChild(details);
  li.appendChild(div).classList.add('todo-item');
  todosParent.appendChild(li);
}

const removeSiblingsClass = (siblings) => {
  siblings.forEach(sibling => {
    sibling.classList.remove('selected');
  });
};

function renderObject(objectName) {
  const node = document.createElement('li');
  node.classList.add('project-title');
  const objectParent = domComponents().projects;
  node.textContent = objectName;
  node.addEventListener('click', (e) => {
    const siblings = Array.from(document.getElementsByClassName('project-title'));
    removeSiblingsClass(siblings);
    e.target.classList.add('selected');
    const projectKeyObject = e.target.textContent;
    domComponents().newTodo.rel = projectKeyObject;
    const todos = JSON.parse(localStorage.getItem(projectKeyObject));
    clearList();
    renderTodoList(todos);
    e.preventDefault();
  });
  objectParent.appendChild(node).classList.add('project-item');
}

renderTodoList = (todos) => {
  todos.forEach((item) => {
    if (item) {
      renderTodos(item);
    }
  });
};

removeTodo = (e, todos) => {
  const parent = e.target.parentNode;
  const previousSibling = parent.previousElementSibling;
  const title = previousSibling.previousElementSibling.previousElementSibling.textContent;
  const todosUpdated = todos.filter(todo => todo.title !== title);
  clearList();
  renderTodoList(todosUpdated);
  return todosUpdated;
};

completeTodo = (e, todos) => {
  let index;
  const parent = e.target.parentNode;
  const previousSibling = parent.previousElementSibling;
  const title = previousSibling.previousElementSibling.previousElementSibling.textContent;
  todos.forEach((todo, i) => {
    if (todo.title === title) {
      index = i;
    }
  });
  todos[index].completed = true;
  clearList();
  renderTodoList(todos);
  return todos;
};

const customAlert = () => {
  const alertContainer = document.querySelector('.alert');
  alertContainer.classList.add('red-alert');
  const alert = document.createElement('p');
  alert.textContent = 'You should provide a project title';
  alertContainer.appendChild(alert);
};


export default {
  domComponents,
  renderObject,
  renderTodos,
  clearList,
  renderTodoList,
  customAlert,
};
