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
  let html = '';
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
}

displayProjects();

// pour les filtres
const liItem = document.querySelectorAll('ul li');

liItem.forEach(li => {
  li.onclik = function(){
    //active
    liItem.forEach(li => {
      li.className = "";
    })
    li.className = "active";
  }
//filter
console.log(li.textcontent);
const value = li.textContent;
imageUrl.forEach(img =>{
  img.style.display = `none`;
  if(img.getAttribute(`data-filter` == value.toLocaleLowerCase())){
    img.style.display = `block`;
  }
})
})
