document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");
  const nombreInput = form.querySelector("input[type='text']");
  const edadInput = form.querySelector("input[type='number']");
  const tabla = document.getElementById("tablaCuerpo");
  const inputArchivo = document.getElementById("cargarExcel");
  const cargarBtn = document.getElementById("loadButton");

  let modoEdicion = false;
  let idEditando = null;

  function cargarDatos() {
    fetch("/api/datos")
      .then((res) => res.json())
      .then((datos) => {
        tabla.innerHTML = "";
        datos.forEach((d) => {
          const fila = document.createElement("tr");
          fila.innerHTML = `
            <td class="px-4 py-2">${d.id}</td>
            <td class="px-4 py-2">${d.nombre}</td>
            <td class="px-4 py-2">${d.edad}</td>
            <td class="px-4 py-2 space-x-2">
              <button class="editar bg-yellow-400 text-white px-2 py-1 rounded" data-id="${d.id}">Editar</button>
              <button class="eliminar bg-red-500 text-white px-2 py-1 rounded" data-id="${d.id}">Eliminar</button>
            </td>
          `;
          tabla.appendChild(fila);
        });

        document.querySelectorAll(".eliminar").forEach((btn) => {
          btn.addEventListener("click", () => {
            const id = parseInt(btn.dataset.id);
            fetch(`/api/datos/${id}`, { method: "DELETE" }).then(() => cargarDatos());
          });
        });

        document.querySelectorAll(".editar").forEach((btn) => {
          btn.addEventListener("click", () => {
            const id = parseInt(btn.dataset.id);
            const fila = btn.closest("tr");
            const nombre = fila.children[1].textContent;
            const edad = fila.children[2].textContent;

            nombreInput.value = nombre;
            edadInput.value = edad;
            idEditando = id;
            modoEdicion = true;
          });
        });
      });
  }

  const guardarNuevo = (e) => {
    e.preventDefault();
    const nombre = nombreInput.value.trim();
    const edad = edadInput.value.trim();

    if (!nombre || !edad) return;

    if (modoEdicion && idEditando !== null) {
      // Editar existente
      fetch(`/api/datos/${idEditando}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, edad }),
      }).then(() => {
        modoEdicion = false;
        idEditando = null;
        nombreInput.value = "";
        edadInput.value = "";
        cargarDatos();
      });
    } else {
      // Crear nuevo
      fetch("/api/datos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, edad }),
      }).then(() => {
        nombreInput.value = "";
        edadInput.value = "";
        cargarDatos();
      });
    }
  };

  form.addEventListener("submit", guardarNuevo);

  // Cargar datos desde archivo Excel
  cargarBtn.addEventListener("click", () => {
    const file = inputArchivo.files[0];
    if (!file) return alert("Selecciona un archivo Excel primero.");

    const nombreValido = /^datos_\d{4}_\d{2}_\d{2}\.xlsx$/;
    if (!nombreValido.test(file.name)) {
      return alert("El nombre del archivo debe ser del formato datos_YYYY_MM_DD.xlsx");
    }

    const reader = new FileReader();
    reader.onload = function (e) {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const json = XLSX.utils.sheet_to_json(sheet);

      json.forEach((item) => {
        const nombre = item.Nombre || item.nombre || "";
        const edad = item.Edad || item.edad || "";

        if (nombre && edad) {
          fetch("/api/datos", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ nombre, edad }),
          }).then(() => cargarDatos());
        }
      });
    };
    reader.readAsArrayBuffer(file);
  });

  // Botón exportar a Excel
  const exportarBtn = document.createElement("button");
  exportarBtn.textContent = "Exportar a Excel";
  exportarBtn.className = "bg-green-500 text-white px-4 py-2 rounded mt-4";
  exportarBtn.addEventListener("click", () => {
    window.location.href = "/api/exportar";
  });

  document.querySelector(".overflow-x-auto").appendChild(exportarBtn);

  cargarDatos();
});
