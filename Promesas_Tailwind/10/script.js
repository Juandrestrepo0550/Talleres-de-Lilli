function leerArchivo(nombre) {
  return fetch(nombre)
    .then(res => {
      if (!res.ok) throw new Error(`Error al leer ${nombre}: ${res.status}`);
      return res.text();
    });
}

document.getElementById("leerSecuenciaBtn").addEventListener("click", () => {
  const resultado = document.getElementById("resultado");
  resultado.classList.remove("hidden");
  resultado.innerHTML = "<p class='text-blue-400'>Leyendo archivos en orden...</p>";

  leerArchivo("a.txt")
    .then(resA => {
      resultado.innerHTML = `<p><strong>Archivo A:</strong><br><pre class="whitespace-pre-wrap">${resA}</pre></p>`;
      return leerArchivo("b.txt");
    })
    .then(resB => {
      resultado.innerHTML += `<p><strong>Archivo B:</strong><br><pre class="whitespace-pre-wrap">${resB}</pre></p>`;
      return leerArchivo("c.txt");
    })
    .then(resC => {
      resultado.innerHTML += `<p><strong>Archivo C:</strong><br><pre class="whitespace-pre-wrap">${resC}</pre></p>`;
    })
    .catch(err => {
      resultado.innerHTML = `<p class="text-red-400">Error: ${err.message}</p>`;
    });
});
