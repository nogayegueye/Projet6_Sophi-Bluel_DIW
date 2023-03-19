// var submitButton = document.querySelector("input[type='submit']");
// submitButton.addEventListener("click", (e) => {
//   e.preventDefault();
// });

document.getElementById("formulaire").addEventListener("submit", function(e){
    e.preventDefault();
    alert('formulaire envoyé');
})