function leerArchivo(file) {
  return new Promise((resolve, reject) => {
    if (!file) {
      reject("No se seleccionó ningún archivo.");
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      resolve(reader.result);
    };

    reader.onerror = () => {
      reject("Error al leer el archivo.");
    };

    reader.readAsText(file); // Leer como texto
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const fileInput = document.getElementById("fileInput");
  const output = document.getElementById("output");
  const readFileBtn = document.getElementById("readFileBtn");

  readFileBtn.addEventListener("click", () => {
    const file = fileInput.files[0];

    output.classList.remove("hidden");

    leerArchivo(file)
      .then((contenido) => {
        output.textContent = contenido;
        output.className =
          "mt-4 font-semibold p-3 rounded border-l-4 border-green-600 bg-green-800 text-green-300";
      })
      .catch((error) => {
        output.textContent = error;
        output.className =
          "mt-4 font-semibold p-3 rounded border-l-4 border-red-600 bg-red-800 text-red-300";
      });
  });
});
