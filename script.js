const todoInput = document.getElementById("todowork");
const todoList = document.querySelector(".list");
const clearCompletedBtn = document.getElementById("clear");
const allBtn = document.getElementById("all");
const activeBtn = document.getElementById("active");
const completeBtn = document.getElementById("complete");
const themeButton = document.getElementById("theme");

// THEME CHANGER

themeButton.addEventListener("click", function () {
  const body = document.body;
  const isDarkMode = body.classList.contains("dark");
  if (isDarkMode) {
    body.classList.remove("dark");
    themeButton.src = "./images/icon-moon.svg";
  } else {
    body.classList.add("dark");
    themeButton.src = "./images/icon-sun.svg";
  }
});

// LIST TODO

todoInput.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    const todoItemText = todoInput.value.trim();
    if (todoItemText !== "") {
      createTodoItem(todoItemText);
      todoInput.value = "";
    }
  }
});

// Add event listener to handle cross button visibility
todoList.addEventListener("mouseover", function (event) {
  const todoItem = event.target.closest(".work");
  if (todoItem) {
    const crossButton = todoItem.querySelector("#cross");
    crossButton.style.visibility = "visible";
  }
  
});

// Add event listener to handle cross button hiding
todoList.addEventListener("mouseout", function (event) {
  const todoItem = event.target.closest(".work");
  if (todoItem) {
    const crossButton = todoItem.querySelector("#cross");
    crossButton.style.visibility = "hidden";
  }
});

// Add event listener to handle check button click
todoList.addEventListener("click", function (event) {
  const checkButton = event.target.closest(".check");
  if (checkButton) {
    const todoItem = checkButton.closest(".work");
    todoItem.classList.toggle("finished");
    updateItemsLeft();
  }
});

// Add event listener to handle cross button click
todoList.addEventListener("click", function (event) {
  const crossButton = event.target.closest("#cross");
  if (crossButton) {
    const todoItem = crossButton.closest(".work");
    todoItem.remove();
    updateItemsLeft();
  }
});

// Add event listener to handle clear completed button click
clearCompletedBtn.addEventListener("click", function () {
  const completedItems = document.querySelectorAll(".work.finished");
  completedItems.forEach(function (item) {
    item.remove();
  });
  updateItemsLeft();
});

// Add event listener to handle filter buttons
allBtn.addEventListener("click", function () {
  showAllItems();
  allBtn.style.color = "hsl(220, 98%, 61%)";
  activeBtn.style.color = "hsl(236, 9%, 61%)";
  completeBtn.style.color = "hsl(236, 9%, 61%)";
});

activeBtn.addEventListener("click", function () {
  showActiveItems();
  activeBtn.style.color = "hsl(220, 98%, 61%)";
  allBtn.style.color = "hsl(236, 9%, 61%)";
  completeBtn.style.color = "hsl(236, 9%, 61%)";
});

completeBtn.addEventListener("click", function () {
  showCompletedItems();
  completeBtn.style.color = "hsl(220, 98%, 61%)";
  allBtn.style.color = "hsl(236, 9%, 61%)";
  activeBtn.style.color = "hsl(236, 9%, 61%)";

});

// Function to create a new Todo item
function createTodoItem(todoItemText) {
  const todoItem = document.createElement("div");
  todoItem.classList.add("work");

  const checkInput = document.createElement("input");
  checkInput.type = "checkbox";
  checkInput.classList.add("check");
  todoItem.appendChild(checkInput);

  const todoText = document.createElement("p");
  todoText.textContent = todoItemText;
  todoText.id = "todo";
  todoItem.appendChild(todoText);

  const crossButton = document.createElement("img");
  crossButton.src = "./images/icon-cross.svg";
  crossButton.alt = "Cross";
  crossButton.id = "cross";
  crossButton.style.visibility = "hidden";
  todoItem.appendChild(crossButton);

  todoList.appendChild(todoItem);

  updateItemsLeft();
}

// Function to update the number of items left
function updateItemsLeft() {
  const numItemsLeft = document.getElementById("num");
  const unfinishedItems = document.querySelectorAll(".work:not(.finished)");
  numItemsLeft.textContent = unfinishedItems.length;
}

// Function to show all Todo items
function showAllItems() {
  const todoItems = document.querySelectorAll(".work");
  todoItems.forEach(function (item) {
    item.style.display = "flex";
  });
}

// Function to show active Todo items
function showActiveItems() {
  const completedItems = document.querySelectorAll(".work.finished");
  completedItems.forEach(function (item) {
    item.style.display = "none";
  });

  const activeItems = document.querySelectorAll(".work:not(.finished)");
  activeItems.forEach(function (item) {
    item.style.display = "flex";
  });
}

// Function to show completed Todo items
function showCompletedItems() {
  const activeItems = document.querySelectorAll(".work:not(.finished)");
  activeItems.forEach(function (item) {
    item.style.display = "none";
  });

  const completedItems = document.querySelectorAll(".work.finished");
  completedItems.forEach(function (item) {
    item.style.display = "flex";
  });
}

allBtn.click();