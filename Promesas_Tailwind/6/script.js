function enviarFormulario(datos) {
  return new Promise((resolve, reject) => {
    const { nombre, correo, mensaje } = datos;

    // Validaciones:
    if (!nombre.trim() || !correo.trim() || !mensaje.trim()) {
      reject("Todos los campos son obligatorios.");
    } else if (/\d/.test(nombre)) {
      reject("El nombre no debe contener números.");
    } else if (!correo.includes("@")) {
      reject("El correo debe contener un símbolo '@'.");
    } else {
      resolve("Formulario enviado correctamente.");
    }
  });
}

document.getElementById("enviarBtn").addEventListener("click", () => {
  const nombre = document.getElementById("nombre").value;
  const correo = document.getElementById("correo").value;
  const mensaje = document.getElementById("mensaje").value;
  const resultado = document.getElementById("resultado");

  resultado.classList.add("hidden");

  enviarFormulario({ nombre, correo, mensaje })
    .then(msg => {
      resultado.textContent = msg;
      resultado.className =
        "mt-4 font-semibold p-3 rounded border-l-4 border-green-600 bg-green-800 text-green-300 w-full text-center";
      resultado.classList.remove("hidden");
    })
    .catch(err => {
      resultado.textContent = err;
      resultado.className =
        "mt-4 font-semibold p-3 rounded border-l-4 border-red-600 bg-red-800 text-red-300 w-full text-center";
      resultado.classList.remove("hidden");
    });
});

