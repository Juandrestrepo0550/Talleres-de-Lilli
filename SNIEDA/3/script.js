document.addEventListener("DOMContentLoaded", () => {
  const tablaBody = document.getElementById("tabla-body");

  function mostrarDatos(usuarios) {
    tablaBody.innerHTML = ""; // Limpiar tabla

    if (!Array.isArray(usuarios)) {
      tablaBody.innerHTML = `<tr><td colspan="3" class="px-4 py-2 text-yellow-400">Formato no válido</td></tr>`;
      return;
    }

    usuarios.forEach(usuario => {
      const fila = document.createElement("tr");
      fila.innerHTML = `
        <td class="px-4 py-2">${usuario.id}</td>
        <td class="px-4 py-2">${usuario.nombre}</td>
        <td class="px-4 py-2">${usuario.correo}</td>
      `;
      tablaBody.appendChild(fila);
    });
  }

  function leerJson(url) {
    return fetch(url).then(respuesta => {
      if (!respuesta.ok) throw new Error(`Error: ${respuesta.status}`);
      return respuesta.json();
    });
  }

  // Mostrar automáticamente datos locales
  leerJson("dato.json")
    .then(mostrarDatos)
    .catch(err => {
      console.error("Error cargando datos.json:", err);
      tablaBody.innerHTML = `<tr><td colspan="3" class="px-4 py-2 text-red-400">Error cargando datos.json</td></tr>`;
    });

  // Leer JSON desde archivo local seleccionado
  document.getElementById("fileInput").addEventListener("change", (e) => {
    const archivo = e.target.files[0];
    if (!archivo) return;

    const lector = new FileReader();
    lector.onload = (event) => {
      try {
        const datos = JSON.parse(event.target.result);
        mostrarDatos(datos);
      } catch (error) {
        console.error("Error al leer archivo JSON:", error);
        tablaBody.innerHTML = `<tr><td colspan="3" class="px-4 py-2 text-red-400">Archivo no válido</td></tr>`;
      }
    };
    lector.readAsText(archivo);
  });
});
