const form = document.querySelector(".form-sign");
const inputs = document.querySelectorAll(
  'input[type="text"],input[type="password"],input[type="date"]'
);
const btnValid = document.querySelector(".btn-submit");

// //---------------- Config Variable---------------
let surname, pseudo, years, email, city, password, confirmPass;

const errorDisplay = (tag, message, valid) => {
  console.log(tag);
  console.log(valid);
  const inputError = document.querySelector("." + tag + "-container input");
  const span = document.querySelector("." + tag + "-container > span");
  if (!valid) {
    inputError.classList.add("error");
    span.textContent = message;
  } else {
    inputError.classList.remove("error");
    span.textContent = message;
  }
};

//---------------- Config Pseudo---------------
const surnameChecker = (value) => {
  if ((value.length > 0 && value.length < 3) || value.length > 20) {
    errorDisplay(
      "surname",
      "Le nom doit être compris entre 3 et 20 caractères"
    );
    surname = null;
  } else if (!value.match(/^[a-zA-Z0-9_.-]*$/)) {
    errorDisplay(
      "surname",
      "Le nom  ne doit pas contenir de caractère spéciaux"
    );

    surname = null;
  } else {
    errorDisplay("surname", "", true);
    surname = value;
  }
};
const pseudoChecker = (value) => {
  if ((value.length > 0 && value.length < 3) || value.length > 20) {
    errorDisplay(
      "pseudo",
      "Le prénom doit être compris entre 3 et 20 caractères"
    );
    pseudo = null;
  } else if (!value.match(/^[a-zA-Z0-9_.-]*$/)) {
    errorDisplay(
      "pseudo",
      "Le prénom ne doit pas contenir de caractère spéciaux"
    );
    pseudo = null;
  } else {
    errorDisplay("pseudo", "", true);
    pseudo = value;
  }
};

//---------------- Config years---------------
const yearsChecker = (value) => {
  if (!value) {
    errorDisplay("year", "Veuillez entrer votre date de naissance !");
    years = null;
    return;
  }
  const birthDate = new Date(value);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m == 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  if (age < 18) {
    errorDisplay("years", "Vous devez avoir au moins 18 ans !");
    years = null;
  } else {
    errorDisplay("years", "", true);
    years = value;
  }
};
//---------------- Config Email---------------
const emailChecker = (value) => {
  if (!value.match(/^[\w._-]+@[\w-]+\.[a-z]{2,4}$/i)) {
    errorDisplay("email", "Le mail n'est pas valide");
    email = null;
  } else {
    errorDisplay("email", "", true);
    email = value;
  }
};
//---------------- Config address---------------
const cityChecker = (value) => {
  if (!value.match(/^[a-zA-ZÀ-ÿ0-9\s'’\-,.]*$/)) {
    errorDisplay("city", "Merci d'entrer une ville valide !");
    city = null;
  } else {
    errorDisplay("city", "", true);
    city = value;
  }
};
//---------------- Config Password---------------
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
    console.log(value);
  } else if (value.length < 12) {
    errorDisplay("password", "", true);
    password = value;
    console.log(value);
  } else {
    errorDisplay("password", "", true);
    password = value;
    console.log(value);
  }
  if (confirmPass) confirmChecker(confirmPass);
};
//---------------- Config ConfirmPassword---------------
const confirmChecker = (value) => {
  if (value !== password) {
    errorDisplay("confirmPass", "les mots de passe ne correspondent pas !");
    confirmPass = false;
    console.log(value);
  } else {
    errorDisplay("confirmPass", "", true);
    confirmPass = true;
    console.log(value);
  }
};
//---- Config EventListener Inputs > ForEach Input ----
inputs.forEach((input) => {
  input.addEventListener("input", (e) => {
    switch (e.target.id) {
      case "surname":
        surnameChecker(e.target.value);
        break;

      case "pseudo":
        pseudoChecker(e.target.value);
        break;

      case "years":
        yearsChecker(e.target.value);
        break;

      case "email":
        emailChecker(e.target.value);
        break;

      case "city":
        cityChecker(e.target.value);
        break;

      case "password":
        passwordChecker(e.target.value);
        break;

      case "confirmPass":
        confirmChecker(e.target.value);
        break;

      default:
        null;
    }
  });
});

//---- Config forEarch Save Data ----
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  if (surname && pseudo && email && city && password && confirmPass && years) {
    const data = {
      surname,
      pseudo,
      password,
      email,
      years,
      city,
    };

    try {
      // Envoyer les données au serveur
      const response = await fetch("http://localhost:3000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        console.log("Succès:", result);

        // Réinitialiser le formulaire
        inputs.forEach((input) => (input.value = ""));
        surname = null;
        pseudo = null;
        years = null;
        email = null;
        city = null;
        password = null;
        confirmPass = null;

        alert("Inscription validée");
        window.location.href = "../../public/landing-swipe/landing-swipe.html";
      } else {
        alert("Erreur lors de l'inscription");
      }
    } catch (error) {
      console.error("Erreur:", error);
      alert("Erreur de connexion au serveur");
    }
  } else {
    alert("Veuillez remplir correctement les champs!");
  }
});
