import { ref, get, child } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-database.js";

const db = window.db;

// ✅ تحميل المشاريع في الصفحة الرئيسية
if (document.getElementById('projects-container')) {
  const dbRef = ref(db);
  get(child(dbRef, 'projects')).then((snapshot) => {
    if (snapshot.exists()) {
      const projects = snapshot.val();
      const container = document.getElementById('projects-container');
      Object.keys(projects).forEach((key) => {
        const project = projects[key];
        const card = document.createElement('div');
        card.className = 'project-card';
        card.innerHTML = `
          <img src="${project.imageURL}" alt="${project.name}">
          <h3>${project.name}</h3>
          <p>${project.description}</p>
          <a href="project.html?id=${key}"><button>عرض التفاصيل</button></a>
        `;
        container.appendChild(card);
      });
    } else {
      console.log("لا توجد مشاريع.");
    }
  }).catch((error) => {
    console.error(error);
  });
}

// ✅ عرض تفاصيل المشروع في project.html
if (document.getElementById('project-details')) {
  const params = new URLSearchParams(window.location.search);
  const projectId = params.get('id');

  const dbRef = ref(db);
  get(child(dbRef, `projects/${projectId}`)).then((snapshot) => {
    if (snapshot.exists()) {
      const project = snapshot.val();
      const details = document.getElementById('project-details');
      details.innerHTML = `
        <h2>${project.name}</h2>
        <img src="${project.imageURL}" alt="${project.name}">
        <p>${project.description}</p>
        <a href="${project.fileLink}" target="_blank"><button>تحميل المشروع</button></a>
      `;
    } else {
      console.log("المشروع غير موجود.");
    }
  }).catch((error) => {
    console.error(error);
  });
}
