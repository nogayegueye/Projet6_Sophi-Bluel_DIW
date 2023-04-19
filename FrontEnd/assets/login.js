

document.getElementById("form").addEventListener("submit", function (e) {
  e.preventDefault();
  var email = document.forms["form"]["email"].value;
  var alamat = document.forms["form"]["password"].value;
  console.log(email);

  fetch("http://localhost:5678/api/users/login", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      password: alamat,
    }),
  })
    .then((result) => {
      if (result.status === 200) {
        result.json().then((data) => {
          const token = data.token;
          localStorage.setItem("token", token);
          window.location.replace("index.html");
        });
      } else {
        alert("The email or password you entered is wrong!");
      }
    });
});
