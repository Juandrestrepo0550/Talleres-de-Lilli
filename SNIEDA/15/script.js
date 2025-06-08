// Función para simular una solicitud fetch con posibilidad de error aleatorio
function solicitarDatos() {
  return new Promise((resolve, reject) => {
    // Simular retraso de 1 segundo
    setTimeout(() => {
      // Error aleatorio para probar reintentos (50% probabilidad de fallo)
      if (Math.random() < 0.5) {
        reject(new Error("Error simulado en la solicitud"));
      } else {
        resolve({ mensaje: "Datos recibidos correctamente" });
      }
    }, 1000);
  });
}

// Función para reintentar una promesa varias veces
function reintentar(fn, intentos) {
  return fn().catch(error => {
    if (intentos > 1) {
      mostrarResultado(`❌ Error: ${error.message}. Reintentando... (${intentos - 1} intentos restantes)`);
      return reintentar(fn, intentos - 1);
    } else {
      return Promise.reject(error);
    }
  });
}

function mostrarResultado(mensaje, exito = true) {
  const div = document.getElementById("resultado");
  div.textContent = mensaje;
  div.classList.remove("hidden");
  div.className = "mt-4 font-semibold p-3 rounded border-l-4 w-full text-center";

  if (exito) {
    div.classList.add("border-green-500", "bg-green-100", "text-green-700");
  } else {
    div.classList.add("border-red-500", "bg-red-100", "text-red-700");
  }
}

// Evento para el botón
document.getElementById("startBtn").addEventListener("click", () => {
  mostrarResultado("⏳ Enviando solicitud...");
  reintentar(solicitarDatos, 3)
    .then(data => {
      mostrarResultado("✅ " + data.mensaje);
    })
    .catch(error => {
      mostrarResultado("❌ " + error.message, false);
    });
});
