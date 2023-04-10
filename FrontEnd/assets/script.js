const gallery = document.querySelector(".gallery");
const modalGallery = document.querySelector(".modal-gallery");

fetch("http://localhost:5678/api/works")
  .then((response) => response.json())
  .then((data) => {
    let html = "";

    data.forEach((item) => {
      html += `
        <figure data-id="${item.id}" class="image-container">
          <img src="${item.imageUrl}" alt="${item.title}">
          <i class="fa-solid fa-trash-can"></i>
          <figcaption>éditer</figcaption>
        </figure>
      `;
    });

    console.log("bonsoir");
    modalGallery.innerHTML = html;
    const deleteIcons = document.querySelectorAll(".fa-trash-can");
    console.log("bonjour");

    deleteIcons.forEach((icon) => {
      icon.addEventListener("click", (event) => {
        const projectId = icon.parentElement.dataset.id;
        console.log(icon.parentElement);
        console.log(projectId);
        deleteProject(projectId);
      });
    });
  })
  .catch((error) => {
    console.error(error);
  });
// window.addEventListener('load', genererHTMLImagesAvecIcone);

//recupération des projets
async function displayProjects() {
  const response = await fetch("http://localhost:5678/api/works");
  const responseJson = await response.json();
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
// Les filtres
displayProjects().then((projects) => {
  console.log(projects);
  const liItem = document.querySelectorAll("div.filtre ul li");

  liItem.forEach((li) => {
    li.addEventListener("click", () => {
      const category = li.getAttribute("data-category");
      console.log(category);
      filterProjects(category, projects);
      liItem.forEach((li) => li.classList.remove("active"));
      li.classList.add("active");
    });
  });
});

function filterProjects(category, projects) {
  const filteredProjects = projects.filter((project) => {
    if (category === "Objets") {
      return project.category.name === "Objets";
    } else if (category === "Appartements") {
      return project.category.name === "Appartements";
    } else if (category === "Hotels & restaurants") {
      return project.category.name === "Hotels & restaurants";
    } else {
      return category === "all";
    }
  });

  gallery.innerHTML = filteredProjects
    .map((project) => {
      return `
    <figure data-category="${project.categoryId}">
      <img src="${project.imageUrl}" alt="${project.title}">
      <figcaption>${project.title}</figcaption>
    </figure>
  `;
    })
    .join("");
}

//Supprimer les filtres lors de la connexion
const token = localStorage.getItem("token");

// Récupérer les boutons par leur ID
const button1 = document.getElementById("button1");
const button2 = document.getElementById("button2");
const button3 = document.getElementById("button3");
const button4 = document.getElementById("button4");

// Masquer les boutons si un token est stocké
if (token) {
  button1.style.display = "none";
  button2.style.display = "none";
  button3.style.display = "none";
  button4.style.display = "none";
}

//Ajouter les boutons modifier lorque l'utilisateur est connecté.
function addButtons() {
  // créer les buttons de façon dynamique lorsque le token est valide
  if (localStorage.getItem("token")) {
    // Créer les liens "modifier" avec une icône en avant
    var modifierLink1 = document.createElement("a");
    modifierLink1.href = "#modal1";
    modifierLink1.innerHTML = '<span class="fas fa-edit"></span> Modifier';

    var modifierLink2 = document.createElement("a");
    modifierLink2.href = "#modal1";
    modifierLink2.innerHTML = '<span class="fas fa-edit"></span> Modifier';

    var modifierLink3 = document.createElement("a");
    modifierLink3.href = "#modal1";
    modifierLink3.innerHTML = '<span class="fas fa-edit"></span> Modifier';

    // Cibler les éléments où les liens doivent apparaître
    var linkContainer1 = document.querySelector(".modifier1");
    var linkContainer2 = document.querySelector(".modifier2");
    var linkContainer3 = document.querySelector(".js-modal");

    // Ajouter les liens aux éléments ciblés
    linkContainer1.appendChild(modifierLink1);
    linkContainer2.appendChild(modifierLink2);
    linkContainer3.appendChild(modifierLink3);
  } else {
    // Masquer les liens "modifier"
    var modifierLinks = document.getElementsByTagName("a");
    for (var i = 0; i < modifierLinks.length; i++) {
      var link = modifierLinks[i];
      if (
        link.innerHTML.includes('<span class="fas fa-edit"></span> Modifier')
      ) {
        link.style.display = "none";
      }
    }
  }
}
addButtons();

//les modales

//modal1
let modal = null;

const openModal = function (e) {
  e.preventDefault();
  const target = document.querySelector(e.target.getAttribute("href"));
  target.style.display = null;
  target.removeAttribute("aria-hidden");
  target.setAttribute("aria-modal", "true");
  modal = target;
  modal.addEventListener("click", closeModal);
  modal.querySelector(".js-modal-close").addEventListener("click", closeModal);
  modal
    .querySelector(".js-modal-stop")
    .addEventListener("click", stopPropagation);
};

const closeModal = function (e) {
  if (modal === null) return;
  e.preventDefault();
  modal.style.display = "none";
  modal.setAttribute("aria-hidden", "true");
  modal.removetAttribute("aria-modal");
  modal.removeEventListener("click", closeModal);
  modal
    .querySelector(".js-modal-close")
    .removeEventListener("click", closeModal);
  modal
    .querySelector(".js-modal-stop")
    .removeEventListener("click", stopPropagation);
  modal = null;
};
const stopPropagation = function (e) {
  e.stopPropagation();
};
document.querySelectorAll(".modifier1").forEach((a) => {
  a.addEventListener("click", openModal);
});
document.querySelectorAll(".modifier2").forEach((a) => {
  a.addEventListener("click", openModal);
});
document.querySelectorAll(".js-modal").forEach((a) => {
  a.addEventListener("click", openModal);
});
//modal2
var addPhotoBtn = document.getElementById("add-photo");
addPhotoBtn.addEventListener("click", function () {
  //Masquer la galerie
  var modalgallery = document.querySelector("#modal1");
  modalgallery.style.display = "none";

  // Afficher la page d'ajout de photo
  var addPhotoModal = document.querySelector("#addPhotoModal");
  addPhotoModal.style.display = "flex";
});

var backToGalleryBtn = document.getElementById("back-to-gallery");
backToGalleryBtn.addEventListener("click", function () {
  // Masquer la page d'ajout de photo
  var addPhotoModal = document.querySelector("#addPhotoModal");
  addPhotoModal.style.display = "none";

  // Afficher le premier modal
  var modal = document.querySelector("#modal1");
  modal.style.display = "flex";
});

// pour suprimer les projets
function deleteProject(projectId) {
  const authorizationKey = localStorage.getItem("token");
  console.log(authorizationKey);
  // const target = document.querySelector(e.target.getAttribute("href"));
  // target.style.display = flex;
  fetch(`http://localhost:5678/api/works/${projectId}`, {
    //console.log(projectId)
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authorizationKey}`,
    },
  })
    .then((response) => {
      if (response.ok) {
        //Mettre à jour le HTML ici
        const projectList = document.querySelector(".gallery");
        const deletedProject = document.querySelector(`[data-id='${projectId}']`);
        projectList.removeChild(deletedProject);

        console.log("Le projet a été supprimé avec succès!");
      } else {
        console.error("La suppression du projet a échoué.");
      }
    })
    .catch((error) => {
      console.error(
        "Une erreur s'est produite lors de la suppression du projet :",
        error
      );
    });
}

// function deleteProject(projectId) {
//   const authorizationKey = localStorage.getItem("token");
//   console.log(authorizationKey);

//   fetch(`http://localhost:5678/api/works/${projectId}`, {
//     method: "DELETE",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${authorizationKey}`,
//     },
//   })
//     .then((response) => {
//       if (response.ok) {
//         //mettre à jour le html ici
//         console.log("Le projet a été supprimé avec succès!");
//       } else {
//         console.error("La suppression du projet a échoué.");
//       }
//     })
//     .catch((error) => {
//       console.error(
//         "Une erreur est survenue lors de la suppression du projet:",
//         error
//       );
//     });
// }

//login en logout
if (localStorage.getItem("token")) {
  document.getElementById("myLink").innerHTML = "Logout";
}
//ajouter un projet

const photoUploadInput = document.getElementById("photo-upload");
const photoPreviewContainer = document.querySelector(".add-image");

photoUploadInput.addEventListener("change", (event) => {
  const photoFile = event.target.files[0];
  const photoPreview = document.createElement("img");
  photoPreview.src = URL.createObjectURL(photoFile);
  photoPreview.style.width = "100px";
  photoPreview.style.height = "100px";
  photoPreviewContainer.innerHTML = "";
  photoPreviewContainer.appendChild(photoPreview);
});

const form = document.getElementById("addform");
const button = document.getElementById("bnt-valider");
const inputPhoto = document.getElementById("photo-upload");

// Evénement pour récupérer le fichier sélectionné par l'utilisateur
inputPhoto.addEventListener("change", () => {
  const file = inputPhoto.files[0];
  console.log(file);
});

//changer la couleur du btn valider en vert

const submitButton = document.getElementById("bnt-valider");

form.addEventListener("input", (event) => {
  console.log(inputPhoto.files);
  event.preventDefault(); // évite l'envoi du formulaire
  //const photoUploadInputValue = document.getElementById("photo-upload").value;
  const categoryValue = document.getElementById("category").value;
  const titrePhotoAddValue = document.getElementById("titre-photo-add").value;

  if (
    inputPhoto.files.length > 0 &&
    titrePhotoAddValue &&
    categoryValue !== "option0"
  ) {
    submitButton.disabled = false;
  }
});
// Evénement pour envoyer le formulaire

button.addEventListener("click", (event) => {
  const authorizationKey = localStorage.getItem("token");
  event.preventDefault();
  const formData = new FormData(form);
  formData.append(
    "image",
    inputPhoto.files[0],
    inputPhoto.files[0].name + ";type=image/png"
  );

  const headers = new Headers();

  for (let pair of formData.entries()) {
    console.log(pair[0] + ": " + pair[1]);
  }
  //headers.set("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY4MDY0ODU2MiwiZXhwIjoxNjgwNzM0OTYyfQ.gC7Ae2uAfAR5qIPrNHxDGSXGQyEYGPMJOCLMZikCdME");
  headers.set("Authorization", `Bearer ${authorizationKey}`);
  headers.set("accept", "application/json");

  fetch("http://localhost:5678/api/works", {
    method: "POST",
    body: formData,
    headers: headers,
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      // //   Récupérer le conteneur HTML pour afficher les projets
      // const projectContainer = document.querySelector("gallery");

      // // Créer un nouvel élément div pour le nouveau projet
      // const newProjectDiv = document.createElement("div");
      // newProjectDiv.classList.add("project");

      // // Créer un élément image pour la miniature du projet
      // const newProjectImage = document.createElement("img");
      // newProjectImage.src = data.imageUrl;
      // newProjectImage.alt = data.title;
      // newProjectDiv.appendChild(newProjectImage);

      // // Créer un élément h3 pour le titre du projet
      // const newProjectTitle = document.createElement("h3");
      // newProjectTitle.textContent = data.title;
      // newProjectDiv.appendChild(newProjectTitle);

      // // Créer un élément p pour la description du projet
      // const newProjectDescription = document.createElement("p");
      // newProjectDescription.textContent = data.description;
      // newProjectDiv.appendChild(newProjectDescription);

      // // Ajouter le nouveau projet au conteneur
      // projectContainer.appendChild(newProjectDiv);
      console.log("DATA CALL", JSON.stringify(data));
    })
    .catch((error) => console.error("ERROR CALL", JSON.stringify(error)));
});

//   }
// });

// button.addEventListener("click", (event) => {
//   const authorizationKey = localStorage.getItem("token");
//   event.preventDefault();
//   const formData = new FormData(form);
//   formData.append(
//     "image",
//     inputPhoto.files[0],
//     inputPhoto.files[0].name + ";type=image/png"
//   );

//   const headers = new Headers();

// ...

//   fetch("http://localhost:5678/api/works", {
//     method: "POST",
//     body: formData,
//     headers: headers,
//   })
//     .then((response) => response.json())
//     .then((data) => {
//       console.log(data);

//       // Récupérer le conteneur HTML pour afficher les projets
//       const projectContainer = document.querySelector("gallery");

//       // Créer un nouvel élément div pour le nouveau projet
//       const newProjectDiv = document.createElement("div");
//       newProjectDiv.classList.add("project");

//       // Créer un élément image pour la miniature du projet
//       const newProjectImage = document.createElement("img");
//       newProjectImage.src = data.imageUrl;
//       newProjectImage.alt = data.title;
//       newProjectDiv.appendChild(newProjectImage);

//       // Créer un élément h3 pour le titre du projet
//       const newProjectTitle = document.createElement("h3");
//       newProjectTitle.textContent = data.title;
//       newProjectDiv.appendChild(newProjectTitle);

//       // Créer un élément p pour la description du projet
//       const newProjectDescription = document.createElement("p");
//       newProjectDescription.textContent = data.description;
//       newProjectDiv.appendChild(newProjectDescription);

//       // Ajouter le nouveau projet au conteneur
//       projectContainer.appendChild(newProjectDiv);

//       console.log("DATA CALL", JSON.stringify(data));
//     })
//     .catch((error) => console.error("ERROR CALL", JSON.stringify(error)));
// });
