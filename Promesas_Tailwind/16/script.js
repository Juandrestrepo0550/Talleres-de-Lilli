function leerArchivoConTimeout(archivo, tiempoMaximo) {
  return Promise.race([
    new Promise((resolve, reject) => {
      const lector = new FileReader();

      lector.onload = () => resolve(lector.result);
      lector.onerror = () => reject(new Error("Error al leer el archivo"));

      lector.readAsText(archivo);
    }),
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error("⏱️ Tiempo excedido")), tiempoMaximo)
    )
  ]);
}

function mostrarResultado(mensaje, exito = true) {
  const div = document.getElementById("resultado");
  div.innerHTML = mensaje;
  div.classList.remove("hidden");
  div.className = "mt-4 font-semibold p-3 rounded border-l-4 w-full text-center";

  if (exito) {
    div.classList.add("border-green-500", "bg-green-100", "text-green-700");
  } else {
    div.classList.add("border-red-500", "bg-red-100", "text-red-700");
  }
}

document.getElementById("startBtn").addEventListener("click", () => {
  const archivo = document.getElementById("archivoInput").files[0];

  if (!archivo) {
    mostrarResultado("⚠️ Debes seleccionar un archivo .txt", false);
    return;
  }

  mostrarResultado("⏳ Leyendo archivo...", true);

  leerArchivoConTimeout(archivo, 3000) // 3 segundos de tiempo máximo
    .then(texto => {
      mostrarResultado(`✅ Archivo leído con éxito:<br><pre class="whitespace-pre-wrap">${texto}</pre>`, true);
    })
    .catch(error => {
      mostrarResultado(`❌ Error: ${error.message}`, false);
    });
});

document.getElementById("startBtn").addEventListener("click", () => {
  mostrarResultado("⏳ Enviando solicitud...");
  fetchConTimeout("https://jsonplaceholder.typicode.com/posts/1", 1000)
    .then(data => {
      mostrarResultado("✅ Datos recibidos: " + JSON.stringify(data));
    })
    .catch(err => {
      mostrarResultado("❌ " + err.message, false);
    });
});
