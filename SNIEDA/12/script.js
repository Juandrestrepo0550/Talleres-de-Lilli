function verificarSesion(token) {
  return new Promise((resolve, reject) => {
    // Lógica de validación simulada
    if (token === "tokenValido123") {
      resolve("Sesión activa");
    } else {
      reject("Token caducado o inválido");
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const boton = document.getElementById("verificarBtn");
  const mensajeDiv = document.getElementById("mensaje");

  boton.addEventListener("click", () => {
    const token = document.getElementById("token").value.trim();

    verificarSesion(token)
      .then((mensaje) => {
        mensajeDiv.textContent = mensaje;
        mensajeDiv.classList.remove("hidden", "border-red-500", "text-red-700", "bg-red-100");
        mensajeDiv.classList.add("border-green-500", "text-green-700", "bg-green-100");
      })
      .catch((error) => {
        mensajeDiv.textContent = error;
        mensajeDiv.classList.remove("hidden", "border-green-500", "text-green-700", "bg-green-100");
        mensajeDiv.classList.add("border-red-500", "text-red-700", "bg-red-100");
      });
  });
});
