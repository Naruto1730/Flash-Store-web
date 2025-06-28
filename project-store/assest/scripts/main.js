// تحميل المشاريع في الصفحة الرئيسية
if (document.getElementById('projects-container')) {
  fetch('projects.json')
    .then(response => response.json())
    .then(data => {
      const container = document.getElementById('projects-container');
      data.forEach(project => {
        const card = document.createElement('div');
        card.className = 'project-card';
        card.innerHTML = `
          <img src="${project.image}" alt="${project.name}">
          <h3>${project.name}</h3>
          <p>${project.description}</p>
          <a href="project.html?id=${project.id}"><button>عرض التفاصيل</button></a>
        `;
        container.appendChild(card);
      });
    });
}

// عرض تفاصيل المشروع في project.html
if (document.getElementById('project-details')) {
  const params = new URLSearchParams(window.location.search);
  const projectId = params.get('id');

  fetch('projects.json')
    .then(response => response.json())
    .then(data => {
      const project = data.find(p => p.id === projectId);
      if (project) {
        const details = document.getElementById('project-details');
        details.innerHTML = `
          <h2>${project.name}</h2>
          <img src="${project.image}" alt="${project.name}">
          <p>${project.description}</p>
          <a href="${project.link}" target="_blank"><button>تحميل المشروع</button></a>
        `;
      }
    });
}
