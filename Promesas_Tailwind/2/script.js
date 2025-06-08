function esperar(ms) {
  return new Promise((resolve) => {
    setTimeout(() => resolve("¡Listo! Se ha esperado " + ms + "ms."), ms);
  });
}

document.getElementById("esperarBtn").addEventListener("click", () => {
  const tiempo = parseInt(document.getElementById("tiempo").value);
  const output = document.getElementById("output");
  const progressBar = document.getElementById("progressBar");

  if (isNaN(tiempo) || tiempo <= 0) {
    output.textContent = "Por favor, ingresa un tiempo válido en milisegundos.";
    output.className = "mt-4 font-semibold p-3 rounded border-l-4 border-yellow-600 bg-yellow-800 text-yellow-300";
    output.classList.remove("hidden");
    progressBar.style.width = "0%";
    return;
  }

  output.textContent = "Esperando...";
  output.className = "mt-4 font-semibold p-3 rounded border-l-4 border-blue-600 bg-blue-800 text-blue-300";
  output.classList.remove("hidden");

  // Resetear barra de progreso
  progressBar.style.transition = "none";
  progressBar.style.width = "0%";

  // Activar animación suave
  setTimeout(() => {
    progressBar.style.transition = `width ${tiempo}ms linear`;
    progressBar.style.width = "100%";
  }, 20);

  esperar(tiempo).then((mensaje) => {
    output.textContent = mensaje;
    output.className = "mt-4 font-semibold p-3 rounded border-l-4 border-green-600 bg-green-800 text-green-300";
    progressBar.style.transition = "none";
    progressBar.style.width = "0%"; // Reiniciar la barra después de completar
  });
});
