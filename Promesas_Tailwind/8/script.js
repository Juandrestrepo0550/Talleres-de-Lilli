function login(usuario, clave) {
  return new Promise((resolve, reject) => {
    if (usuario === "admin" && clave === "123") {
      resolve();
    } else {
      reject("Credenciales incorrectas");
    }
  });
}

function obtenerPerfil(usuario) {
  return new Promise((resolve) => {
    // Simula un perfil
    const perfil = {
      usuario,
      nombre: "Administrador",
      rol: "Superusuario",
      email: "admin@example.com"
    };
    resolve(perfil);
  });
}

document.getElementById("loginBtn").addEventListener("click", () => {
  const usuario = document.getElementById("usuario").value;
  const clave = document.getElementById("clave").value;
  const resultado = document.getElementById("resultado");
  const perfilDiv = document.getElementById("perfil");

  resultado.classList.add("hidden");
  perfilDiv.classList.add("hidden");

  login(usuario, clave)
    .then(() => {
      resultado.textContent = "Inicio de sesión exitoso.";
      resultado.className = "mt-4 font-semibold p-3 rounded border-l-4 border-green-600 bg-green-800 text-green-300 w-full text-center";
      resultado.classList.remove("hidden");
      return obtenerPerfil(usuario);
    })
    .then(perfil => {
      perfilDiv.innerHTML = `
        <p><strong>Usuario:</strong> ${perfil.usuario}</p>
        <p><strong>Nombre:</strong> ${perfil.nombre}</p>
        <p><strong>Rol:</strong> ${perfil.rol}</p>
        <p><strong>Email:</strong> ${perfil.email}</p>
      `;
      perfilDiv.classList.remove("hidden");
    })
    .catch(error => {
      resultado.textContent = `Error: ${error}`;
      resultado.className = "mt-4 font-semibold p-3 rounded border-l-4 border-red-600 bg-red-800 text-red-300 w-full text-center";
      resultado.classList.remove("hidden");
    });
});
