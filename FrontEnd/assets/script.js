const gallery = document.querySelector('.gallery');

fetch('http://localhost:5678/api/works')
    .then(response => response.json())
    .then(data => {
        let html = '';

        data.forEach(item => {
            html += `
        <figure>
          <img src="${item.imageUrl}" alt="${item.title}">
          <figcaption>${item.title}</figcaption>
        </figure>
      `;
        });

        gallery.innerHTML = html;
    })
    .catch(error => console.error(error));
 

