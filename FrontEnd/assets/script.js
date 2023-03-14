const gallery = document.querySelector(".gallery");

// fetch('http://localhost:5678/api/works')
//     .then(response => response.json())
//     .then(data => {
//         let html = '';

//         data.forEach(item => {
//             html += `
//         <figure>
//           <img src="${item.imageUrl}" alt="${item.title}">
//           <figcaption>${item.title}</figcaption>
//         </figure>
//       `;
//         });
//       console.log("bonsoir");
//         gallery.innerHTML = html;
//     })
//     .catch(error => console.error(error));

// console.log("bonjour");
async function displayProjects() {
  const response = await fetch("http://localhost:5678/api/works");
  console.log(response);
  const responseJson = await response.json();
  console.log(responseJson);
  let html = "";
  responseJson.forEach((item) => {
    html += `
          <figure>
            <img src="${item.imageUrl}" alt="${item.title}">
            <figcaption>${item.title}</figcaption>
          </figure>
        `;
  });
  console.log("bonsoir");
  gallery.innerHTML = html;
  return responseJson;
}

displayProjects().then((projects) => {
  console.log(projects);
  const liItem = document.querySelectorAll("ul li");

  liItem.forEach((li) => {
    li.addEventListener("click", () => {
      console.log("Bonjour");
      console.log (projects);
      const category = li.getAttribute("data-category");
      console.log (category);
    });
  });
});

function filterProjects(category, projects) {
  const filteredProjects = projects.filter(project => {
      if (category === "Objets") {
          return project.category.name === 'Objets';
      } else if (category === "Appartements") {
          return project.category.name === 'Appartements';
      } else if (category === "Hotels & restaurants") {
          return project.category.name === 'Hotels & restaurants';
      } else {
          return category === 'all';
      }
  });

  gallery.innerHTML = filteredProjects.map(project => {
      return `
    <figure data-category="${project.categoryId}">
      <img src="${project.imageUrl}" alt="${project.title}">
      <figcaption>${project.title}</figcaption>
    </figure>
  `;
  }).join('');
}