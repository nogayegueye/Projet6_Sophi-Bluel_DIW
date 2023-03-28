const gallery = document.querySelector(".gallery");
const modalGallery = document.querySelector(".modal-gallery");

fetch("http://localhost:5678/api/works")
  .then((response) => response.json())
  .then((data) => {
    let html = "";

    data.forEach((item) => {
      html += `
        <figure class="image-container">
          <img src="${item.imageUrl}" alt="${item.title}">
          <i class="fa-solid fa-trash-can"></i>
          <figcaption>éditer</figcaption>
        </figure>
      `;
    });
    console.log("bonsoir");
    modalGallery.innerHTML = html;
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
  const liItem = document.querySelectorAll("ul li");

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
const token = localStorage.getItem('token');

// Récupérer les boutons par leur ID
const button1 = document.getElementById('button1');
const button2 = document.getElementById('button2');
const button3 = document.getElementById('button3');
const button4 = document.getElementById('button4');

// Masquer les boutons si un token est stocké
if (token) {
  button1.style.display = 'none';
  button2.style.display = 'none';
  button3.style.display = 'none';
  button4.style.display = 'none';
}




//Ajouter les boutons modifier lorque l'utilisateur est connecté.
function addButtons() {
// créer les buttons de façon dynamique lorsque le token est valide
if (localStorage.getItem('token')) {

  // Créer les liens "modifier" avec une icône en avant
  var modifierLink1 = document.createElement('a');
  modifierLink1.href = '#';
  modifierLink1.innerHTML = '<span class="fas fa-edit"></span> Modifier';
  
  var modifierLink2 = document.createElement('a');
  modifierLink2.href = '#';
  modifierLink2.innerHTML = '<span class="fas fa-edit"></span> Modifier';
  
  var modifierLink3 = document.createElement('a');
  modifierLink3.href = '#modal1';
  modifierLink3.innerHTML = '<span class="fas fa-edit"></span> Modifier';

  // Cibler les éléments où les liens doivent apparaître
  var linkContainer1 = document.querySelector('.modifier1');
  var linkContainer2 = document.querySelector('.modifier2');
  var linkContainer3 = document.querySelector('.js-modal');

  // Ajouter les liens aux éléments ciblés
  linkContainer1.appendChild(modifierLink1);
  linkContainer2.appendChild(modifierLink2);
  linkContainer3.appendChild(modifierLink3);

} else {

  // Masquer les liens "modifier"
  var modifierLinks = document.getElementsByTagName('a');
  for (var i = 0; i < modifierLinks.length; i++) {
    var link = modifierLinks[i];
    if (link.innerHTML.includes('<span class="fas fa-edit"></span> Modifier')) {
      link.style.display = 'none';
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
document.querySelectorAll(".js-modal").forEach((a) => {
  a.addEventListener("click", openModal);
});
//modal2
var addPhotoBtn = document.getElementById("add-photo");
addPhotoBtn.addEventListener("click", function() {
  //Masquer la galerie
  var modalgallery = document.querySelector("#modal1");
  modalgallery.style.display = "none";
  
  // Afficher la page d'ajout de photo
  var addPhotoModal = document.querySelector("#addPhotoModal");
  addPhotoModal.style.display = "flex";
});

var backToGalleryBtn = document.getElementById("back-to-gallery");
backToGalleryBtn.addEventListener("click", function() {
  // Masquer la page d'ajout de photo
  var addPhotoModal = document.querySelector("#addPhotoModal");
  addPhotoModal.style.display = "none";
  
  // Afficher le premier modal
  var modal = document.querySelector("#modal1");
  modal.style.display = "flex";
  
  // Afficher la galerie
  // var gallery = modal.querySelector(".modal-gallery");
  // gallery.style.display = "flex";
});


// // pour suprimer les projets
// Récupérer tous les ID des éléments à partir de l'API
fetch('http://localhost:5678/api/works')
  .then(response => response.json())
  .then(data => {
    // Parcourir tous les ID des éléments et envoyer une requête DELETE pour supprimer chaque élément
    data.forEach(element => {
      fetch('http://localhost:5678/api/works' + element.id, {
        method: 'DELETE'
      })
        .then(response => {
          if (response.ok) {
            // L'élément a été supprimé avec succès
          } else {
            throw new Error('Impossible de supprimer l\'élément');
          }
        })
        .catch(error => {
          console.error(error);
        });
    });
  })
  .catch(error => {
    console.error(error);
  });


//login en logout
if (localStorage.getItem("token")) {
  document.getElementById("myLink").innerHTML = "Logout";
  document.getElementById("myLink").addEventListener("click", function () {
    localStorage.removeItem("token");
  });
} else {
  
}
