const express = require("express");
const fs = require("fs");
const XLSX = require("xlsx");
const path = require("path");

const app = express();
const PORT = 3000;

const DATA_FILE = path.join(__dirname, "data.json");

// ✅ Middleware: borrar data.json si la petición es a / o /index.html
app.use((req, res, next) => {
  if (req.path === "/" || req.path === "/index.html") {
    console.log("Recarga detectada, limpiando data.json...");
    fs.writeFileSync(DATA_FILE, JSON.stringify([]));
  }
  next();
});

app.use(express.json());
app.use(express.static("public"));

// Función para leer los datos
function leerDatos() {
  return JSON.parse(fs.readFileSync(DATA_FILE, "utf8"));
}

// Función para escribir los datos
function guardarDatos(datos) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(datos, null, 2));
}

// Obtener todos los datos
app.get("/api/datos", (req, res) => {
  const datos = leerDatos();
  res.json(datos);
});

// Guardar nuevo dato
app.post("/api/datos", (req, res) => {
  const { nombre, edad } = req.body;
  if (!nombre || !edad) return res.status(400).json({ error: "Faltan campos" });

  const datos = leerDatos();
  const nuevo = {
    id: datos.length + 1,
    nombre,
    edad,
  };

  datos.push(nuevo);
  guardarDatos(datos);
  res.json({ mensaje: "Guardado" });
});

// Exportar a Excel
app.get("/api/exportar", (req, res) => {
  const datos = leerDatos();

  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.json_to_sheet(datos);
  XLSX.utils.book_append_sheet(wb, ws, "Datos");

  const nombreArchivo = `export_${new Date().toISOString().slice(0, 10)}.xlsx`;
  const ruta = path.join(__dirname, nombreArchivo);
  XLSX.writeFile(wb, ruta);

  res.download(ruta, nombreArchivo, (err) => {
    if (!err) fs.unlinkSync(ruta); // Borrar archivo temporal después de descargar
  });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

// Eliminar por ID
app.delete("/api/datos/:id", (req, res) => {
  const id = parseInt(req.params.id);
  let datos = leerDatos();
  datos = datos.filter((d) => d.id !== id);
  guardarDatos(datos);
  res.json({ mensaje: "Eliminado" });
});

// Editar por ID
app.put("/api/datos/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { nombre, edad } = req.body;
  let datos = leerDatos();
  datos = datos.map((d) => {
    if (d.id === id) {
      return { ...d, nombre, edad };
    }
    return d;
  });
  guardarDatos(datos);
  res.json({ mensaje: "Actualizado" });
});
