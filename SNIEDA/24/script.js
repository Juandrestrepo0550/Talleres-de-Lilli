function leerSensor() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("35°C");
    }, 1000);
  });
}

function mostrarResultado(mensaje) {
  const div = document.getElementById("resultado");
  div.textContent = mensaje;
  div.classList.remove("hidden");
  div.className = "mt-4 font-semibold p-3 rounded border-l-4 w-full text-center whitespace-pre-wrap border-yellow-500 bg-yellow-100 text-yellow-700";
}

document.getElementById("leerSensorBtn").addEventListener("click", () => {
  mostrarResultado("⏳ Leyendo sensor...");
  leerSensor()
    .then(dato => mostrarResultado(`📡 Datos del sensor: ${dato}`));
});
