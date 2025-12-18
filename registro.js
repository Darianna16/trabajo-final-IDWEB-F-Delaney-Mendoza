const form = document.getElementById("registroForm");
const mensaje = document.getElementById("mensaje");

const shakeInput = (input) => {
  let pos = 0;
  let direction = 1;
  let count = 0;

  const interval = setInterval(() => {
    pos += 4 * direction;
    input.style.transform = `translateX(${pos}px)`;
    direction *= -1;
    count++;

    if (count === 8) {
      clearInterval(interval);
      input.style.transform = "translateX(0)";
    }
  }, 35);
};

const mostrarErrorInput = (input, texto) => {
  mensaje.textContent = texto;
  mensaje.style.color = "red";
  input.style.border = "2px solid rgba(255, 0, 0, 0.6)";
  shakeInput(input);
};

const limpiarErrorInput = (input) => {
  input.style.border = "";
  input.style.transform = "translateX(0)";
};

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const apellidoInput = document.getElementById("apellido");
  const dniInput = document.getElementById("documento");
  const telefonoInput = document.getElementById("telefono");
  const passwordInput = document.getElementById("password");

  [apellidoInput, dniInput, telefonoInput, passwordInput].forEach(limpiarErrorInput);

  if (apellidoInput.value.trim().split(" ").length < 2) {
    mostrarErrorInput(apellidoInput, "Ingresa ambos apellidos.");
    return;
  }

  if (!/^\d{8}$/.test(dniInput.value.trim())) {
    mostrarErrorInput(dniInput, "El DNI debe tener exactamente 8 dígitos.");
    return;
  }

  if (!/^9\d{8}$/.test(telefonoInput.value.trim())) {
    mostrarErrorInput(telefonoInput, "El celular debe empezar con 9 y tener 9 dígitos.");
    return;
  }

  if (!/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(passwordInput.value)) {
    mostrarErrorInput(passwordInput, "Contraseña insegura (debe contener al menos 8 caracteres con una mayuscula, minuscula y caracter especial");
    return;
  }

  mensaje.textContent = "Registro correcto.";
  mensaje.style.color = "green";
});


