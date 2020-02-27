import logic from './logic';
import dom from './domStuff';
import './seed';

const domElements = dom.domComponents();

const alertExists = () => {
  let exists = false;
  const alert = document.querySelector('.red-alert p');
  if (alert) {
    exists = true;
  }
  return exists;
};

domElements.newProject.addEventListener('click', (e) => {
  const title = domElements.projectTitle.value;
  if (title) {
    const exists = alertExists();
    if (exists) {
      const alertContainer = document.querySelector('.red-alert');
      alertContainer.className.remove('.red-alert');
    }
    logic.createProject(title);
    domElements.projectTitle.value = '';
    domElements.newTodo.rel = title;
    dom.clearList();
    e.preventDefault();
  } else {
    const exists = alertExists();
    if (!exists) dom.customAlert();
  }
  e.preventDefault();
});

domElements.newTodo.addEventListener('click', (e) => {
  logic.createTodo();
  e.preventDefault();
});

domElements.cancel.addEventListener('click', (e) => {
  domElements.modal.style.display = 'none';
  e.preventDefault();
});

domElements.save.addEventListener('click', (e) => {
  const key = e.target.rel;
  const todos = JSON.parse(localStorage.getItem(key));
  let index = null;
  todos.forEach((item, i) => {
    if (e.target.classList[0] === item.title.replace(/\s/g, '')) {
      index = i;
      domElements.save.classList.remove(item.title.replace(/\s/g, ''));
    }
  });
  todos[index].title = domElements.editTitle.value === '' ? todos[index].title : domElements.editTitle.value;
  todos[index].description = domElements.editDescription.value === '' ? todos[index].description : domElements.editDescription.value;
  todos[index].dueDate = domElements.editDueDate.value === '' ? todos[index].dueDate : domElements.editDueDate.value;
  const priorityOption = domElements.editSelect.options;
  const priority = priorityOption[priorityOption.selectedIndex].value;
  todos[index].priority = priority === todos[index].priority ? todos[index].priority : priority;
  dom.clearList();
  dom.renderTodoList(todos);
  localStorage.setItem(key, JSON.stringify(todos));
  domElements.modal.style.display = 'none';
  e.preventDefault();
});
