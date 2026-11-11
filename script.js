console.log("Hí chào cậu nhé!");
//Hãy đặt tên biến theo taskInput,addButton, taskList
const taskInput = document.getElementById("task-input");
const addButton = document.getElementById("btn-add");
const taskList = document.getElementById("task-list");
const filterButton = document.querySelectorAll(".filters button");
const summary = document.getElementById("summary");

addButton.addEventListener("click", function () {
  const taskText = taskInput.value.trim();

  if (taskText === "") {
    taskInput.classList.add("error");
  } else {
    taskInput.classList.remove("error");
  }
  const taskItem = document.createElement("li");
  taskItem.className = "task";
  taskItem.innerHTML = `
   <input class="checkbox" aria-hidden="true" type="checkbox" onchange="toggleTask(this)" />
    <span class="task-title">${taskText}</span>
    <button class="delete" type="button" onclick="deleteTask(this)">Xóa</button>
  `;
  taskList.appendChild(taskItem);
  taskInput.value = "";
  taskInput.classList.remove("error");
  updateCount();
});

function toggleTask(checkbox) {
  checkbox.parentElement.classList.toggle("completed");
  updateCount();
}

function deleteTask(button) {
  button.parentElement.remove();
  updateCount();
}

function updateCount() {
  const uncompletedTasks = taskList.querySelectorAll(".task:not(.completed)");
  const count = uncompletedTasks.length;
  summary.textContent = `Còn ${count} việc chưa xong`;
}

filterButton.forEach(function (btn) {
  btn.addEventListener("click", function () {
    filterButton.forEach(function (button) {
      button.classList.remove("active");
    });
    btn.classList.add("active");
    const filterType = btn.textContent.trim();
    const tasks = taskList.querySelectorAll(".task");
    tasks.forEach(function (task) {
      const isCompleted = task.classList.contains("completed");
      if (filterType === "Tất cả") {
        task.style.display = "flex";
      } else if (filterType === "Chưa xong") {
        task.style.display = isCompleted ? "none" : "flex";
      } else if (filterType === "Đã xong") {
        task.style.display = isCompleted ? "flex" : "none";
      }
    });
  });
});
