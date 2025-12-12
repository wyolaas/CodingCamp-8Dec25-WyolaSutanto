const todoInput = document.getElementById("todo-input");
const dateInput = document.getElementById("date-input");
const addBtn = document.getElementById("add-btn");
const todolist = document.getElementById("todo-list");
const filter = document.getElementById("filter");
const filterdate = document.getElementById("filter-date");
const errorMsg =  document.getElementById("error-msg");

let todos = [];

addBtn.addEventListener("click", addTask);
filter.addEventListener("change", updateFilterUI);
filterdate.addEventListener("change", displayTasks);

todoInput.addEventListener("input", clearError);
dateInput.addEventListener("input", clearError);

//menampilkan pesan error
function showError(message) {
    errorMsg.textContent = message;
}

//menghapus pesan error
function clearError() {
    errorMsg.textContent = "";
    todoInput.classList.remove("error");
    dateInput.classList.remove("error");
}

// tambah tugas dan memanggil error
function addTask() {
    const taskName = todoInput.value.trim();
    const taskDate = dateInput.value;

    //jika keduanya kosong
    if (taskName === "" && taskDate === "") {
        showError("Nama Kegiatan dan Tanggal tidak boleh kosong!");
        todoInput.classList.add("error");
        dateInput.classList.add("error");
        todoInput.focus();
        return;
    }

    //jika nama kegiatan kosong
    if (taskName === "") {
        showError("Nama Kegiatan tidak boleh kosong!");
        todoInput.classList.add("error");
        todoInput.focus();
        return;
    }

    //jika tanggal kosong
    if (taskDate === "") {
        showError("Tanggal tidak boleh kosong!");
        dateInput.classList.add("error");
        dateInput.focus();
        return;
    }

    //jika lolos validasi, simpan tugas
    todos.push ({
        name: taskName,
        date: taskDate
    });

    //reset input
    todoInput.value = "";
    dateInput.value = "";
}

displayTasks();


function updateFilterUI() {
    if (filter.value === "date") {
        filterdate.style.display = "block";
    } else {
        filterdate.style.display = "none";
    }
    displayTasks();
}

function displayTasks() {
    const tableBody = document.getElementById("todo-body");
    const nodata = document.getElementById("no-data");

    tableBody.innerHTML = "";

    const today = new Date().toISOString().split("T")[0];
    let filteredTodos = todos;

    if (filter.value === "today") {
        filteredTodos = todos.filter(t => t.date === today);
    } else if (filter.value === "date") {
        const selectedDate = filterdate.value;
        filteredTodos = selectedDate 
            ? todos.filter(t => t.date === selectedDate) 
            : [];
    }

    if (filteredTodos.length === 0) {
        nodata.style.display = "block";
        return;
    } else {
        nodata.style.display = "none";
    }

    filteredTodos.forEach((task, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${task.name}</td>
            <td>${task.date}</td>
            <td>
                <button class="delete-btn" onclick="deleteTask(${index})">
                    Hapus
                </button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

function deleteTask(index) {
    todos.splice(index, 1);
    displayTasks();
}
