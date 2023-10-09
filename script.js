const taskInput = document.getElementById("task-input");
const addButton = document.getElementById("add-button");
const taskList = document.getElementById("task-list");


// Enfin, l'élément de tâche est ajouté à une liste avec l'ID "taskList".

// Load tasks from local storage on page load

window.addEventListener("load", function () {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(function (task) {
        createTaskElement(task);
    });
});


// Add event listener to the "Add" button
// L'événement "click" est ajouté à un bouton avec l'ID "addButton". Cela signifie que lorsque le bouton est cliqué, la fonction associée sera exécutée.
// La fonction associée à l'événement "click" commence par récupérer le texte de la tâche à partir d'un élément d'entrée avec l'ID "taskInput". La valeur est ensuite nettoyée en supprimant les espaces vides au début et à la fin.
addButton.addEventListener("click", function () {
    const taskText = taskInput.value.trim();
    if (taskText !== "") {
        createTaskElement(taskText);
        saveTasksToLocalStorage();
        taskInput.value = "";
    }
});

// Function to create a new task element
// Ensuite, la fonction vérifie si le texte de la tâche n'est pas vide. Si ce n'est pas le cas, la fonction "createTaskElement" est appelée avec le texte de la tâche en tant qu'argument.
// La fonction "createTaskElement" crée un nouvel élément de liste (li) pour représenter la tâche. Cet élément de liste reçoit une classe CSS "task" pour le styliser.
function createTaskElement(taskText) {
    const taskElement = document.createElement("li");
    taskElement.classList.add("task");
    // Un élément div est créé pour afficher le texte de la tâche. Cet élément div reçoit une classe CSS "task-text" pour le styliser. Le texte de la tâche est défini en utilisant la propriété "textContent" de l'élément.
    const taskTextElement = document.createElement("div");
    taskTextElement.classList.add("task-text");
    taskTextElement.textContent = taskText;
    // Un bouton de suppression est créé pour permettre à l'utilisateur de supprimer la tâche. Ce bouton reçoit une classe CSS "delete-button" pour le styliser. Le texte du bouton est défini comme "Delete".
    const deleteButton = document.createElement("button");
    deleteButton.classList.add("delete-button");
    deleteButton.textContent = "Delete";
    // Un événement "click" est ajouté au bouton de suppression. Lorsque le bouton est cliqué, la fonction associée est exécutée. Cette fonction supprime l'élément de tâche de la liste et appelle la fonction "saveTasksToLocalStorage" pour mettre à jour les tâches enregistrées dans le stockage local.
    deleteButton.addEventListener("click", function () {
        taskElement.remove();
        saveTasksToLocalStorage();
    });
    // L'élément de texte de la tâche et le bouton de suppression sont ajoutés à l'élément de tâche de la liste.
    taskElement.appendChild(taskTextElement);
    taskElement.appendChild(deleteButton);
    taskList.appendChild(taskElement);
}

// Function to save tasks to local storage
// La fonction "saveTasksToLocalStorage" est appelée pour enregistrer les tâches dans le stockage local. Cette fonction récupère tous les éléments de texte de tâche de la liste et les transforme en un tableau de textes de tâche. Ce tableau est ensuite converti en une chaîne JSON et enregistré dans le stockage local avec la clé "tasks".
function saveTasksToLocalStorage() {
    const tasks = Array.from(taskList.querySelectorAll(".task-text")).map(function (taskTextElement) {
        return taskTextElement.textContent;
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}