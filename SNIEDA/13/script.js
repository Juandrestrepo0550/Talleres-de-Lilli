function cargarImagen(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = url;
    img.onload = () => resolve(img);
    img.onerror = () => reject(`Error al cargar ${url}`);
  });
}

function mostrarImagenes(imagenes) {
  const galeria = document.getElementById("galeria");
  galeria.innerHTML = ""; // limpiar

  imagenes.forEach(img => {
    img.classList.add("w-full", "h-auto", "rounded", "shadow");
    galeria.appendChild(img);
  });
}

document.getElementById("cargarBtn").addEventListener("click", () => {
  const urls = ["imagen1.png", "imagen2.png", "imagen3.png"]; // reemplaza por tus rutas reales

  Promise.all(urls.map(url => cargarImagen(url)))
    .then(imagenes => mostrarImagenes(imagenes))
    .catch(error => {
      alert(error);
    });
});
