// script.js

document.addEventListener('DOMContentLoaded', function() {
  const taskForm = document.getElementById('task-form');
  const taskInput = document.getElementById('task-input');
  const taskList = document.getElementById('task-list');

  loadTasks();

  taskForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const taskText = taskInput.value.trim();
      if (taskText !== '') {
          addTask(taskText);
          saveTask(taskText);
          taskInput.value = '';
      } else {
          alert('Please enter a task!');
      }
  });

  taskList.addEventListener('click', function(e) {
      if (e.target.classList.contains('delete-btn')) {
          const task = e.target.parentElement.textContent.replace('Delete', '').trim();
          removeTask(task);
          e.target.parentElement.remove();
      }
  });

  function addTask(task) {
      const li = document.createElement('li');
      li.innerHTML = `
          ${task}
          <button class="delete-btn">Delete</button>
      `;
      taskList.appendChild(li);
  }

  function saveTask(task) {
      let tasks = localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : [];
      tasks.push(task);
      localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  function loadTasks() {
      let tasks = localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : [];
      tasks.forEach(function(task) {
          addTask(task);
      });
  }

  function removeTask(task) {
      let tasks = localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : [];
      tasks = tasks.filter(t => t !== task);
      localStorage.setItem('tasks', JSON.stringify(tasks));
  }
});
