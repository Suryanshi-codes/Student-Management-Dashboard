let students = JSON.parse(localStorage.getItem("students")) || [];

function saveData() {
  localStorage.setItem("students", JSON.stringify(students));
}

function renderTable(data = students) {
  const table = document.getElementById("studentTable");
  table.innerHTML = "";

  data.forEach((student, index) => {
    table.innerHTML += `
      <tr>
        <td>${student.name}</td>
        <td>${student.course}</td>
        <td>${student.age}</td>
        <td>
          <button class="action-btn edit" onclick="editStudent(${index})">Edit</button>
          <button class="action-btn delete" onclick="deleteStudent(${index})">Delete</button>
        </td>
      </tr>
    `;
  });
}

function addStudent() {
  const name = document.getElementById("name").value;
  const course = document.getElementById("course").value;
  const age = document.getElementById("age").value;

  if (!name || !course || !age) {
    alert("Please fill all fields");
    return;
  }

  students.push({ name, course, age });

  saveData();
  renderTable();

  document.getElementById("name").value = "";
  document.getElementById("course").value = "";
  document.getElementById("age").value = "";
}

function deleteStudent(index) {
  students.splice(index, 1);
  saveData();
  renderTable();
}

function editStudent(index) {
  const student = students[index];

  const newName = prompt("Enter new name", student.name);
  const newCourse = prompt("Enter new course", student.course);
  const newAge = prompt("Enter new age", student.age);

  if (newName && newCourse && newAge) {
    students[index] = {
      name: newName,
      course: newCourse,
      age: newAge
    };
  }

  saveData();
  renderTable();
}

function searchStudent() {
  const query = document.getElementById("search").value.toLowerCase();

  const filtered = students.filter(student =>
    student.name.toLowerCase().includes(query) ||
    student.course.toLowerCase().includes(query)
  );

  renderTable(filtered);
}

renderTable();