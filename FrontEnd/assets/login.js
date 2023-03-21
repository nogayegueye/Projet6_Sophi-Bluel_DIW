// var submitButton = document.querySelector("input[type='submit']");
// submitButton.addEventListener("click", (e) => {
//   e.preventDefault();
// });
//email == "admin@example.com" && password == "12345"

document.getElementById("form").addEventListener("submit", function (e) {
  e.preventDefault();
  var email = document.forms["form"]["email"].value;
  var alamat = document.forms["form"]["password"].value;
  console.log (email);
  if (
    (async () => {
      const rawResponse = await fetch("http://localhost:5678/api/users/login", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email, password: alamat
         }),
      }).then(result => {
        
        console.log(result);
      });
    })()
  ) {
    alert("Login Successful!");
  } else {
    alert("The email or password you entered is wrong!");
    e.preventDefault();
  }
});
