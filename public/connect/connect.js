const form = document.querySelector(".form-connect");
const inputs = document.querySelectorAll(
  'input[type="text"],input[type="password"]'
);

let email, password;

const errorDisplay = (tag, message, valid) => {
  console.log(tag);
  console.log(message);
  console.log(valid);

  const inputError = document.querySelector(
    `.container-connect-${tag} > input`
  );
  const span = document.querySelector(".container-connect-" + tag + " >  span");

  if (!valid) {
    inputError.classList.add("error");
    span.textContent = message;
  } else {
    inputError.classList.remove("error");
    span.textContent = message;
  }
};

const emailChecker = (value) => {
  if (!value.match(/^[\w._-]+@[\w-]+\.[a-z]{2,4}$/i)) {
    errorDisplay("email", "Vérifiez votre email");
    email = null;
  } else {
    errorDisplay("email", "", true);
    email = value;
  }
};

const passwordChecker = (value) => {
  if (
    !value.match(
      /^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$/
    )
  ) {
    errorDisplay(
      "password",
      "Minimum de 8 caractères, une majuscule, un chiffre et un caractère spéciaux"
    );
    password = null;
  } else if (value.length < 12) {
    errorDisplay("password", "", true);
    password = value;
  } else {
    errorDisplay("password", "", true);
    password = value;
  }
};
inputs.forEach((input) => {
  input.addEventListener("input", (e) => {
    switch (e.target.id) {
      case "email":
        emailChecker(e.target.value);
        break;

      case "password":
        passwordChecker(e.target.value);
        break;

      default:
        null;
    }
  });
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (email && password) {
    const data = {
      email,
      password,
    };
    console.log(data);
    inputs.forEach((input) => (input.value = ""));
    email = null;
    password = null;
    alert("Bienvenue !!");
    window.location.href = "../../public/landing-swipe/landing-swipe.html";
  } else {
    alert("Veuillez remplir correctement les champs!");
  }
});
