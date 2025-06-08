function validarNombre(nombre) {
  return new Promise((resolve, reject) => {
    if (!nombre || nombre.trim().length < 3) {
      reject("El nombre debe tener al menos 3 caracteres.");
    } else if (/\d/.test(nombre)) {
      reject("El nombre no debe contener números.");
    } else {
      resolve("Nombre válido");
    }
  });
}

function validarCorreo(correo) {
  return new Promise((resolve, reject) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(correo)) {
      reject("Correo electrónico no válido.");
    } else {
      resolve("Correo válido");
    }
  });
}

function enviar() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve("✅ Formulario enviado correctamente.");
    }, 1000);
  });
}

function mostrarResultado(mensaje, exito = true) {
  const div = document.getElementById("resultado");
  div.textContent = mensaje;
  div.classList.remove("hidden");
  div.className = "mt-4 font-semibold p-3 rounded border-l-4 w-full text-center whitespace-pre-wrap";

  if (exito) {
    div.classList.add("border-green-500", "bg-green-100", "text-green-700");
  } else {
    div.classList.add("border-red-500", "bg-red-100", "text-red-700");
  }
}

document.getElementById("enviarBtn").addEventListener("click", () => {
  const nombre = document.getElementById("nombre").value;
  const correo = document.getElementById("correo").value;

  mostrarResultado("⏳ Validando datos...");

  Promise.all([validarNombre(nombre), validarCorreo(correo)])
    .then(() => {
      return enviar();
    })
    .then(mensaje => {
      mostrarResultado(mensaje);
    })
    .catch(error => {
      mostrarResultado(`❌ Error: ${error}`, false);
    });
});
