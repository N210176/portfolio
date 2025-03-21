// Sample project data
let projects = [];

// Add Project
function addProject() {
    const title = document.getElementById('projectTitle').value;
    const desc = document.getElementById('projectDesc').value;

    if (title && desc) {
        const project = { id: Date.now(), title, desc };
        projects.push(project);
        displayProjects();
        clearForm();
    }
}

// Display Projects
function displayProjects() {
    let projectList = document.getElementById('projectList');
    projectList.innerHTML = '';

    projects.forEach((project) => {
        projectList.innerHTML += `
            <div class="card mb-2">
                <div class="card-body">
                    <h5>${project.title}</h5>
                    <p>${project.desc}</p>
                    <button class="btn btn-warning" onclick="editProject(${project.id})">Edit</button>
                    <button class="btn btn-danger" onclick="deleteProject(${project.id})">Delete</button>
                </div>
            </div>
        `;
    });
}

// Edit Project
function editProject(id) {
    const project = projects.find((p) => p.id === id);
    document.getElementById('projectTitle').value = project.title;
    document.getElementById('projectDesc').value = project.desc;
    deleteProject(id);
}

// Delete Project
function deleteProject(id) {
    projects = projects.filter((p) => p.id !== id);
    displayProjects();
}

// Clear Form
function clearForm() {
    document.getElementById('projectForm').reset();
}
