const noteInput = document.getElementById("noteInput");
const addBtn = document.getElementById("addBtn");
const notesList = document.getElementById("notesList");
const themeBtn = document.getElementById("themeBtn");

let notes = JSON.parse(localStorage.getItem("notes")) || [];

// Add note
addBtn.addEventListener("click", addNote);
function addNote() {
  const text = noteInput.value.trim();
  if (!text) return;

  notes.push(text);
  noteInput.value = "";
  updateUI();
  saveNotes();
}

// Render notes safely (no innerHTML injection)
function updateUI() {
  notesList.innerHTML = "";

  notes.forEach((note, index) => {
    const li = document.createElement("li");
    li.textContent = note;

    const actions = document.createElement("span");
    actions.classList.add("actions");

    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.addEventListener("click", () => editNote(index));

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", () => deleteNote(index));

    actions.appendChild(editBtn);
    actions.appendChild(deleteBtn);
    li.appendChild(actions);
    notesList.appendChild(li);
  });
}

// Edit note
function editNote(index) {
  const updated = prompt("Edit note:", notes[index]);
  if (!updated || !updated.trim()) return;

  notes[index] = updated.trim();
  updateUI();
  saveNotes();
}

// Delete note
function deleteNote(index) {
  notes.splice(index, 1);
  updateUI();
  saveNotes();
}

// Save to localStorage
function saveNotes() {
  localStorage.setItem("notes", JSON.stringify(notes));
}

// Theme toggle
themeBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");
});

updateUI();
