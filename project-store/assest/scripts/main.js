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

        // ✅ استخدام المفاتيح الحقيقية من القاعدة
        const name = project.title;
        const description = project.description;
        const imageURL = project.icon_url;
        const fileLink = project.project_url;

        const card = document.createElement('div');
        card.className = 'project-card';
        card.innerHTML = `
          <img src="${imageURL}" alt="${name}">
          <h3>${name}</h3>
          <p>${description}</p>
          <a href="project.html?id=${key}"><button>عرض التفاصيل</button></a>
        `;
        container.appendChild(card);
      });
    } else {
      console.log("❌ لا توجد مشاريع.");
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

      // ✅ نفس التعديل هنا كمان
      const name = project.title;
      const description = project.description;
      const imageURL = project.icon_url;
      const fileLink = project.project_url;

      const details = document.getElementById('project-details');
      details.innerHTML = `
        <h2>${name}</h2>
        <img src="${imageURL}" alt="${name}">
        <p>${description}</p>
        <a href="${fileLink}" target="_blank"><button>تحميل المشروع</button></a>
      `;
    } else {
      console.log("❌ المشروع غير موجود.");
    }
  }).catch((error) => {
    console.error(error);
  });
}
