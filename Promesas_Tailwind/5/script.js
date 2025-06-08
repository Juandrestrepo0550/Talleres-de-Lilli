function cargarImagen(url) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => reject("Error al cargar la imagen");
    image.src = url;
  });
}

document.getElementById("loadImgBtn").addEventListener("click", () => {
  const url = document.getElementById("imgUrl").value;
  const msg = document.getElementById("msg");
  const preview = document.getElementById("preview");
  const resultImg = document.getElementById("resultImg");

  msg.classList.add("hidden");
  preview.classList.add("hidden");

  cargarImagen(url)
    .then(img => {
      msg.textContent = "Imagen cargada correctamente.";
      msg.className = "mt-4 font-semibold p-3 rounded border-l-4 border-green-600 bg-green-800 text-green-300 w-full text-center";
      msg.classList.remove("hidden");

      resultImg.src = img.src;
      preview.classList.remove("hidden");
    })
    .catch(error => {
      msg.textContent = error;
      msg.className = "mt-4 font-semibold p-3 rounded border-l-4 border-red-600 bg-red-800 text-red-300 w-full text-center";
      msg.classList.remove("hidden");
    });
});
