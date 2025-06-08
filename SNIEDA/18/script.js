function cargarJSON() {
  return fetch("datos.json")
    .then(response => {
      if (!response.ok) {
        throw new Error("No se pudo cargar el archivo JSON.");
      }
      return response.json();
    });
}

function mostrarResultado(datos, exito = true) {
  const div = document.getElementById("resultado");
  div.innerHTML = "";

  if (typeof datos === "string") {
    div.textContent = datos;
    div.className = "mt-4 font-semibold p-3 rounded border-l-4 w-full text-center " +
      (exito
        ? "border-green-500 bg-green-100 text-green-700"
        : "border-red-500 bg-red-100 text-red-700");
  } else {
    const tabla = document.createElement("table");
    tabla.className = "min-w-full bg-white shadow-md rounded-lg overflow-hidden";

    const thead = document.createElement("thead");
    thead.innerHTML = `
      <tr class="bg-orange-500 text-white text-left text-sm uppercase font-semibold">
        <th class="px-6 py-3">Campo</th>
        <th class="px-6 py-3">Valor</th>
      </tr>`;
    tabla.appendChild(thead);

    const tbody = document.createElement("tbody");

    let isEven = true;
    for (const [clave, valor] of Object.entries(datos)) {
      const fila = document.createElement("tr");
      fila.className = isEven ? "bg-orange-100" : "bg-orange-50";
      isEven = !isEven;

      fila.innerHTML = `
        <td class="px-6 py-3 text-orange-800 font-medium">${clave}</td>
        <td class="px-6 py-3 text-orange-900">${valor}</td>
      `;

      tbody.appendChild(fila);
    }

    tabla.appendChild(tbody);
    div.appendChild(tabla);

    div.className = "mt-4 w-full";
  }

  div.classList.remove("hidden");
}

document.getElementById("cargarBtn").addEventListener("click", () => {
  mostrarResultado("⏳ Cargando JSON...");
  cargarJSON()
    .then(data => mostrarResultado(data))
    .catch(error => mostrarResultado(`❌ Error: ${error.message}`, false));
});
