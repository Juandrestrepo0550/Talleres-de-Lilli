function obtenerUbicacion() {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject("La geolocalización no es compatible con este navegador.");
    } else {
      navigator.geolocation.getCurrentPosition(
        (success) => resolve(success.coords),
        (error) => reject(error.message)
      );
    }
  });
}

document.getElementById("ubicacionBtn").addEventListener("click", () => {
  const resultado = document.getElementById("resultado");
  resultado.classList.add("hidden");

  obtenerUbicacion()
    .then(coords => {
      resultado.textContent = `Lat: ${coords.latitude.toFixed(4)}, Lng: ${coords.longitude.toFixed(4)}`;
      resultado.className = "mt-4 font-semibold p-3 rounded border-l-4 border-green-600 bg-green-800 text-green-300 w-full text-center";
      resultado.classList.remove("hidden");
    })
    .catch(err => {
      resultado.textContent = `Error: ${err}`;
      resultado.className = "mt-4 font-semibold p-3 rounded border-l-4 border-red-600 bg-red-800 text-red-300 w-full text-center";
      resultado.classList.remove("hidden");
    });
});
