// Simulación de base de datos (array de usuarios)
const baseDeDatos = [
  { id: "1", nombre: "Ana Pérez", email: "ana@example.com" },
  { id: "2", nombre: "Carlos Gómez", email: "carlos@example.com" },
  { id: "3", nombre: "María López", email: "maria@example.com" },
];

// Función que busca usuario por id y devuelve promesa
function buscarUsuario(id) {
  return new Promise((resolve, reject) => {
    // Simular tiempo de consulta
    setTimeout(() => {
      const usuario = baseDeDatos.find(u => u.id === id);
      if (usuario) {
        resolve(usuario);
      } else {
        reject(new Error("Usuario no encontrado"));
      }
    }, 1000); // 1 segundo de simulación
  });
}

function mostrarResultado(mensaje, exito = true) {
  const div = document.getElementById("resultado");
  div.textContent = typeof mensaje === "string" ? mensaje : JSON.stringify(mensaje, null, 2);
  div.classList.remove("hidden");
  div.className = "mt-4 font-semibold p-3 rounded border-l-4 w-full text-center whitespace-pre-wrap";

  if (exito) {
    div.classList.add("border-green-500", "bg-green-100", "text-green-700");
  } else {
    div.classList.add("border-red-500", "bg-red-100", "text-red-700");
  }
}

document.getElementById("buscarBtn").addEventListener("click", () => {
  const id = document.getElementById("userId").value.trim();
  if (!id) {
    mostrarResultado("Por favor, ingresa un ID de usuario.", false);
    return;
  }
  mostrarResultado("⏳ Buscando usuario...");
  buscarUsuario(id)
    .then(usuario => {
      mostrarResultado(`✅ Usuario encontrado:\nNombre: ${usuario.nombre}\nEmail: ${usuario.email}`);
    })
    .catch(error => {
      mostrarResultado(`❌ ${error.message}`, false);
    });
});
