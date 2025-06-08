function leerArchivo(nombreArchivo) {
  return fetch(nombreArchivo)
    .then(res => {
      if (!res.ok) {
        throw new Error("Archivo no encontrado");
      }
      return res.text();
    });
}

function mostrarResultado(mensaje, error = false) {
  const div = document.getElementById("resultado");
  div.textContent = mensaje;
  div.classList.remove("hidden");
  if (error) {
    div.className = "mt-4 font-semibold p-3 rounded border-l-4 w-full text-center whitespace-pre-wrap border-red-500 bg-red-100 text-red-700";
  } else {
    div.className = "mt-4 font-semibold p-3 rounded border-l-4 w-full text-center whitespace-pre-wrap border-green-500 bg-green-100 text-green-700";
  }
}

document.getElementById("leerArchivoBtn").addEventListener("click", () => {
  mostrarResultado("⏳ Leyendo archivo...");
  
  leerArchivo("hola.txt")
    .then(contenido => mostrarResultado(`📄 Contenido:\n${contenido}`))
    .catch(err => mostrarResultado(`❌ Error: ${err.message}`, true));
});
