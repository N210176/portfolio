// Check authentication
document.addEventListener('DOMContentLoaded', function() {
    if (!localStorage.getItem('adminLoggedIn')) {
        window.location.href = 'index.html';
        return;
    }

    // Load initial data
    loadProjects();
    loadSkills();
    loadBlogPosts();
    loadSettings();

    // Setup event listeners
    setupNavigation();
    setupForms();
});

// Navigation
function setupNavigation() {
    // Section navigation
    document.querySelectorAll('.nav-link[data-section]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const section = this.getAttribute('data-section');
            showSection(section);
            
            // Update active state
            document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Logout button
    document.getElementById('logoutBtn').addEventListener('click', function(e) {
        e.preventDefault();
        localStorage.removeItem('adminLoggedIn');
        window.location.href = 'index.html';
    });
}

function showSection(sectionId) {
    document.querySelectorAll('.section-content').forEach(section => {
        section.classList.add('d-none');
    });
    document.getElementById(`${sectionId}-section`).classList.remove('d-none');
}

// Projects Management
function loadProjects() {
    const projects = JSON.parse(localStorage.getItem('projects') || '[]');
    const tbody = document.getElementById('projectsTableBody');
    tbody.innerHTML = '';

    projects.forEach((project, index) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${project.title}</td>
            <td>${project.category}</td>
            <td>${project.dateAdded}</td>
            <td>
                <button class="btn btn-sm btn-primary me-2" onclick="editProject(${index})">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn btn-sm btn-danger" onclick="deleteProject(${index})">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

function setupForms() {
    // Project Form
    document.getElementById('saveProjectBtn').addEventListener('click', function() {
        const form = document.getElementById('addProjectForm');
        const formData = new FormData(form);
        
        const project = {
            title: formData.get('title'),
            category: formData.get('category'),
            description: formData.get('description'),
            technologies: formData.get('technologies').split(',').map(t => t.trim()),
            url: formData.get('url'),
            dateAdded: new Date().toLocaleDateString(),
            image: formData.get('image').name
        };

        const projects = JSON.parse(localStorage.getItem('projects') || '[]');
        projects.push(project);
        localStorage.setItem('projects', JSON.stringify(projects));

        // Close modal and reload projects
        bootstrap.Modal.getInstance(document.getElementById('addProjectModal')).hide();
        form.reset();
        loadProjects();
    });

    // Skill Form
    document.getElementById('saveSkillBtn').addEventListener('click', function() {
        const form = document.getElementById('addSkillForm');
        const formData = new FormData(form);
        
        const skill = {
            name: formData.get('name'),
            category: formData.get('category'),
            level: formData.get('level')
        };

        const skills = JSON.parse(localStorage.getItem('skills') || '[]');
        skills.push(skill);
        localStorage.setItem('skills', JSON.stringify(skills));

        // Close modal and reload skills
        bootstrap.Modal.getInstance(document.getElementById('addSkillModal')).hide();
        form.reset();
        loadSkills();
    });

    // Blog Form
    document.getElementById('saveBlogBtn').addEventListener('click', function() {
        const form = document.getElementById('addBlogForm');
        const formData = new FormData(form);
        
        const post = {
            title: formData.get('title'),
            content: formData.get('content'),
            status: formData.get('status'),
            date: new Date().toLocaleDateString(),
            image: formData.get('image').name
        };

        const posts = JSON.parse(localStorage.getItem('blogPosts') || '[]');
        posts.push(post);
        localStorage.setItem('blogPosts', JSON.stringify(posts));

        // Close modal and reload posts
        bootstrap.Modal.getInstance(document.getElementById('addBlogModal')).hide();
        form.reset();
        loadBlogPosts();
    });

    // Settings Form
    document.getElementById('settingsForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const formData = new FormData(this);
        const settings = Object.fromEntries(formData.entries());
        localStorage.setItem('portfolioSettings', JSON.stringify(settings));
        alert('Settings saved successfully!');
    });
}

// Skills Management
function loadSkills() {
    const skills = JSON.parse(localStorage.getItem('skills') || '[]');
    const frontendSkills = document.getElementById('frontendSkills');
    const backendSkills = document.getElementById('backendSkills');
    
    frontendSkills.innerHTML = '';
    backendSkills.innerHTML = '';

    skills.forEach((skill, index) => {
        const skillElement = document.createElement('div');
        skillElement.className = 'mb-3';
        skillElement.innerHTML = `
            <div class="d-flex justify-content-between align-items-center">
                <span>${skill.name}</span>
                <div>
                    <button class="btn btn-sm btn-primary me-2" onclick="editSkill(${index})">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn btn-sm btn-danger" onclick="deleteSkill(${index})">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
            <div class="progress">
                <div class="progress-bar" role="progressbar" style="width: ${skill.level}%">
                    ${skill.level}%
                </div>
            </div>
        `;

        if (skill.category === 'frontend') {
            frontendSkills.appendChild(skillElement);
        } else {
            backendSkills.appendChild(skillElement);
        }
    });
}

// Blog Posts Management
function loadBlogPosts() {
    const posts = JSON.parse(localStorage.getItem('blogPosts') || '[]');
    const tbody = document.getElementById('blogTableBody');
    tbody.innerHTML = '';

    posts.forEach((post, index) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${post.title}</td>
            <td>${post.date}</td>
            <td><span class="badge bg-${post.status === 'published' ? 'success' : 'warning'}">${post.status}</span></td>
            <td>
                <button class="btn btn-sm btn-primary me-2" onclick="editBlogPost(${index})">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn btn-sm btn-danger" onclick="deleteBlogPost(${index})">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

// Settings Management
function loadSettings() {
    const settings = JSON.parse(localStorage.getItem('portfolioSettings') || '{}');
    const form = document.getElementById('settingsForm');
    
    // Populate form fields
    Object.keys(settings).forEach(key => {
        const input = form.elements[key];
        if (input) {
            input.value = settings[key];
        }
    });
}

// CRUD Operations
function editProject(index) {
    const projects = JSON.parse(localStorage.getItem('projects') || '[]');
    const project = projects[index];
    
    // Populate form with project data
    const form = document.getElementById('addProjectForm');
    form.elements['title'].value = project.title;
    form.elements['category'].value = project.category;
    form.elements['description'].value = project.description;
    form.elements['technologies'].value = project.technologies.join(', ');
    form.elements['url'].value = project.url;

    // Show modal
    const modal = new bootstrap.Modal(document.getElementById('addProjectModal'));
    modal.show();

    // Update save button to handle edit
    const saveBtn = document.getElementById('saveProjectBtn');
    saveBtn.onclick = function() {
        const formData = new FormData(form);
        projects[index] = {
            ...project,
            title: formData.get('title'),
            category: formData.get('category'),
            description: formData.get('description'),
            technologies: formData.get('technologies').split(',').map(t => t.trim()),
            url: formData.get('url')
        };
        
        localStorage.setItem('projects', JSON.stringify(projects));
        modal.hide();
        form.reset();
        loadProjects();
    };
}

function deleteProject(index) {
    if (confirm('Are you sure you want to delete this project?')) {
        const projects = JSON.parse(localStorage.getItem('projects') || '[]');
        projects.splice(index, 1);
        localStorage.setItem('projects', JSON.stringify(projects));
        loadProjects();
    }
}

function editSkill(index) {
    const skills = JSON.parse(localStorage.getItem('skills') || '[]');
    const skill = skills[index];
    
    // Populate form with skill data
    const form = document.getElementById('addSkillForm');
    form.elements['name'].value = skill.name;
    form.elements['category'].value = skill.category;
    form.elements['level'].value = skill.level;

    // Show modal
    const modal = new bootstrap.Modal(document.getElementById('addSkillModal'));
    modal.show();

    // Update save button to handle edit
    const saveBtn = document.getElementById('saveSkillBtn');
    saveBtn.onclick = function() {
        const formData = new FormData(form);
        skills[index] = {
            name: formData.get('name'),
            category: formData.get('category'),
            level: formData.get('level')
        };
        
        localStorage.setItem('skills', JSON.stringify(skills));
        modal.hide();
        form.reset();
        loadSkills();
    };
}

function deleteSkill(index) {
    if (confirm('Are you sure you want to delete this skill?')) {
        const skills = JSON.parse(localStorage.getItem('skills') || '[]');
        skills.splice(index, 1);
        localStorage.setItem('skills', JSON.stringify(skills));
        loadSkills();
    }
}

function editBlogPost(index) {
    const posts = JSON.parse(localStorage.getItem('blogPosts') || '[]');
    const post = posts[index];
    
    // Populate form with post data
    const form = document.getElementById('addBlogForm');
    form.elements['title'].value = post.title;
    form.elements['content'].value = post.content;
    form.elements['status'].value = post.status;

    // Show modal
    const modal = new bootstrap.Modal(document.getElementById('addBlogModal'));
    modal.show();

    // Update save button to handle edit
    const saveBtn = document.getElementById('saveBlogBtn');
    saveBtn.onclick = function() {
        const formData = new FormData(form);
        posts[index] = {
            ...post,
            title: formData.get('title'),
            content: formData.get('content'),
            status: formData.get('status')
        };
        
        localStorage.setItem('blogPosts', JSON.stringify(posts));
        modal.hide();
        form.reset();
        loadBlogPosts();
    };
}

function deleteBlogPost(index) {
    if (confirm('Are you sure you want to delete this blog post?')) {
        const posts = JSON.parse(localStorage.getItem('blogPosts') || '[]');
        posts.splice(index, 1);
        localStorage.setItem('blogPosts', JSON.stringify(posts));
        loadBlogPosts();
    }
} 