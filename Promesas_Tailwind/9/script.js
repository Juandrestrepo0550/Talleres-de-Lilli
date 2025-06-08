function leerArchivo(path) {
  return fetch(path)
    .then(res => {
      if (!res.ok) {
        throw new Error(`Error al leer ${path}: ${res.status}`);
      }
      return res.text();
    });
}

document.getElementById("leerArchivosBtn").addEventListener("click", () => {
  const resultado = document.getElementById("resultado");
  resultado.classList.remove("hidden");
  resultado.innerHTML = "<p class='text-blue-400'>Leyendo archivos...</p>";

  Promise.all([leerArchivo("a.txt"), leerArchivo("b.txt")])
    .then(resultados => {
      resultado.innerHTML = resultados.map((contenido, i) =>
        `<p><strong>Archivo ${i + 1}:</strong><br><pre class="whitespace-pre-wrap">${contenido}</pre></p>`
      ).join('');
    })
    .catch(error => {
      resultado.innerHTML = `<p class="text-red-400">Error: ${error.message}</p>`;
    });
});
