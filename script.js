const input = document.querySelector(".input");
const submit = document.querySelector(".add");
const tasks = document.querySelector(".tasks");

// Empty array to store the tasks
let arrayOfTasks = [];

if (localStorage.getItem("task")) {
  arrayOfTasks = JSON.parse(localStorage.getItem("task"));
}

getTaskFromLocalStorage();

submit.onclick = () => {
  if (input.value == "") {
    alert("Please Enter a task");
  } else if (input.value !== "") {
    addTaskToArray(input.value);
    // Clear the input
    input.value = "";
  }
};

tasks.addEventListener("click", function (e) {
  if (e.target.classList.contains("delete")) {
    deleteElementFromLocalStorage(
      e.target.parentElement.parentElement.getAttribute("data-id")
    );
    e.target.parentElement.parentElement.remove();
  }
  if (e.target.classList.contains("task")) {
    toggleStatus(e.target.getAttribute("data-id"));
    e.target.classList.toggle("done");
  }
  if (e.target.classList.contains("edit")) {
    editTask(
      e.target.parentElement.parentElement,
      e.target.parentElement.parentElement.getAttribute("data-id")
    );
    e.target.parentElement.parentElement.remove();
  }
});

function addTaskToArray(value) {
  const task = {
    id: Date.now(),
    title: value,
    completed: false,
  };
  // Push the task into array of tasks
  arrayOfTasks.push(task);
  // Show tasks to  page
  showTaskToPage(arrayOfTasks);
  // Add task to local storage
  addTaskToLocalStorage(arrayOfTasks);
}

function showTaskToPage(arrayOfElement) {
  tasks.innerHTML = "";
  // loop for each element
  arrayOfElement.forEach((element) => {
    tasks.innerHTML += `
    <div class="task" data-id="${element.id}">
      <p>${element.title}</p>
      <div class="icon">
        <span class="delete"><i class="fa-solid fa-trash"></i></span>
        <span class="edit"><i class="fa-solid fa-pen"></i></span>
      </div>
    </div>
    `;
  });
}
function addTaskToLocalStorage(arrayOfElement) {
  window.localStorage.setItem("task", JSON.stringify(arrayOfElement));
}
function getTaskFromLocalStorage() {
  let date = window.localStorage.getItem("task");
  if (date) {
    let tasks = JSON.parse(date);
    showTaskToPage(tasks);
  }
}

function deleteElementFromLocalStorage(taskId) {
  arrayOfTasks = arrayOfTasks.filter((task) => task.id != taskId);
  addTaskToLocalStorage(arrayOfTasks);
}

function toggleStatus(taskId) {
  for (let i = 0; i < arrayOfTasks.length; i++) {
    if (arrayOfTasks[i].id == taskId) {
      arrayOfTasks[i].completed == false
        ? (arrayOfTasks[i].completed = true)
        : (arrayOfTasks[i].completed = false);
    }
  }
  addTaskToLocalStorage(arrayOfTasks);
}

function editTask(item, taskId) {
  input.value = item.children[0].innerText;
  arrayOfTasks = arrayOfTasks.filter((task) => task.id != taskId);
  addTaskToLocalStorage(arrayOfTasks);
}
