function login(usuario, clave) {
  return new Promise((resolve, reject) => {
    if (usuario === "admin" && clave === "123") {
      resolve("Bienvenido, " + usuario + "!");
    } else {
      reject("Usuario o contraseña incorrectos");
    }
  });
}

document.getElementById("loginBtn").addEventListener("click", () => {
  const usuario = document.getElementById("usuario").value;
  const clave = document.getElementById("clave").value;
  const resultado = document.getElementById("resultado");

  resultado.className = "hidden";

  login(usuario, clave)
    .then(msg => {
      resultado.textContent = msg;
      resultado.className = "mt-4 font-semibold p-3 rounded border-l-4 border-green-600 bg-green-800 text-green-300";
      resultado.classList.remove("hidden");
    })
    .catch(err => {
      resultado.textContent = err;
      resultado.className = "mt-4 font-semibold p-3 rounded border-l-4 border-red-600 bg-red-800 text-red-300";
      resultado.classList.remove("hidden");
    });
});
