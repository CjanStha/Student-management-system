let students = JSON.parse(localStorage.getItem('students')) || [];
let currentEditId = null;

const studentForm = document.getElementById('studentForm');
const searchInput = document.getElementById('searchInput');
const studentList = document.getElementById('studentList');

studentForm.addEventListener('submit', handleFormSubmit);
searchInput.addEventListener('input', renderStudents);

function handleFormSubmit(e) {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const year = document.getElementById('year').value;

    if (!name || !email || !year) return;

    const student = {
        id: Date.now(),
        name,
        email,
        year: parseInt(year)
    };

    if (currentEditId) {
        const index = students.findIndex(s => s.id === currentEditId);
        students[index] = {...student, id: currentEditId};
        currentEditId = null;
        document.querySelector('.add-button').textContent = 'Add Student';
    } else {
        students.push(student);
    }

    saveToLocalStorage();
    studentForm.reset();
    renderStudents();
}

function searchStudents(query) {
    return students.filter(student => 
        student.name.toLowerCase().includes(query.toLowerCase()) ||
        student.email.toLowerCase().includes(query.toLowerCase()) ||
        student.year.toString().includes(query)
    );
}

function renderStudents() {
    const searchQuery = searchInput.value;
    const filteredStudents = searchQuery ? searchStudents(searchQuery) : [...students];
    
    studentList.innerHTML = filteredStudents.map(student => `
        <div class="student-item">
            <span>${student.name}</span>
            <button class="edit-btn" onclick="editStudent(${student.id})">Edit</button>
        </div>
    `).join('');
}

function editStudent(id) {
    const student = students.find(s => s.id === id);
    document.getElementById('name').value = student.name;
    document.getElementById('email').value = student.email;
    document.getElementById('year').value = student.year;
    currentEditId = id;
    document.querySelector('.add-button').textContent = 'Update Student';
}

function saveToLocalStorage() {
    localStorage.setItem('students', JSON.stringify(students));
}

// Initial render
renderStudents();
