// DishDrip Cute To-Do App

const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const totalCount = document.getElementById("totalCount");
const remainingCount = document.getElementById("remainingCount");
const filters = document.querySelectorAll(".filter");

let tasks = [];  
let filterMode = "all";

// Unique ID
const uid = () => Date.now() + "-" + Math.random().toString(36).slice(2);

// Render tasks
function render(){
  taskList.innerHTML = "";

  const filtered = tasks.filter(t => {
    if(filterMode === "all") return true;
    if(filterMode === "active") return !t.done;
    if(filterMode === "done") return t.done;
  });

  filtered.forEach(task => {
    const li = document.createElement("li");
    li.className = "task-item";
    li.innerHTML = `
      <div class="task-left">
        <button class="checkbox ${task.done?"done":""}">
          ${task.done?"✅":"◻️"}
        </button>
        <div class="task-text ${task.done?"done":""}">${escapeHtml(task.text)}</div>
      </div>
      <button class="btn-del">❌</button>
    `;

    // toggle
    li.querySelector(".checkbox").onclick = () => toggle(task.id);

    // delete
    li.querySelector(".btn-del").onclick = () => del(task.id);

    taskList.appendChild(li);
  });

  totalCount.textContent = tasks.length;
  remainingCount.textContent = tasks.filter(t=>!t.done).length;
}

// escape html
function escapeHtml(txt){
  return txt.replace(/[&<>"']/g, m => ({
    "&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#39;"
  }[m]));
}

// Add task
function addTask(){
  const txt = taskInput.value.trim();
  if(!txt) return;
  tasks.unshift({ id: uid(), text: txt, done: false });
  taskInput.value = "";
  render();
}

// Toggle done
function toggle(id){
  tasks = tasks.map(t => t.id === id ? {...t, done: !t.done} : t);
  render();
}

// Delete
function del(id){
  tasks = tasks.filter(t => t.id !== id);
  render();
}

// filter buttons
filters.forEach(btn => {
  btn.onclick = () => {
    filters.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    filterMode = btn.dataset.filter;
    render();
  };
});

// Add button
addBtn.onclick = addTask;

// Enter key
taskInput.onkeypress = e => {
  if(e.key === "Enter") addTask();
};

// Initial render
render();
