function esperar(ms, barra) {
  return new Promise(resolve => {
    const total = ms;
    let tiempoTranscurrido = 0;
    const intervalo = 50; // ms
    const progreso = barra.querySelector("div");

    const timer = setInterval(() => {
      tiempoTranscurrido += intervalo;
      const porcentaje = Math.min(100, (tiempoTranscurrido / total) * 100);
      progreso.style.width = porcentaje + "%";

      if (tiempoTranscurrido >= total) {
        clearInterval(timer);
        resolve();
      }
    }, intervalo);
  });
}

function crearBarra(ms, index) {
  const container = document.createElement("div");
  container.className = "w-full";

  const label = document.createElement("p");
  label.textContent = `Esperando ${ms} ms (barra ${index + 1})`;
  label.className = "text-sm text-orange-900 mb-1";

  const outer = document.createElement("div");
  outer.className = "w-full bg-orange-100 rounded-full h-4 overflow-hidden";

  const inner = document.createElement("div");
  inner.className = "bg-orange-500 h-4 transition-all duration-75";
  inner.style.width = "0%";

  outer.appendChild(inner);
  container.appendChild(label);
  container.appendChild(outer);
  return container;
}

function mostrarResultado(mensaje, ok = true) {
  const div = document.getElementById("resultado");
  div.textContent = mensaje;
  div.className = "mt-4 font-semibold p-3 rounded border-l-4 w-full text-center";
  div.classList.remove("hidden");

  if (ok) {
    div.classList.add("bg-green-100", "text-green-700", "border-green-500");
  } else {
    div.classList.add("bg-red-100", "text-red-700", "border-red-500");
  }
}

document.getElementById("esperarBtn").addEventListener("click", () => {
  mostrarResultado("⏳ Iniciando esperas...");
  const tiempos = [1000, 2000, 1500];
  const contenedor = document.getElementById("barras");
  contenedor.innerHTML = "";

  const promesas = tiempos.map((tiempo, i) => {
    const barra = crearBarra(tiempo, i);
    contenedor.appendChild(barra);
    return esperar(tiempo, barra);
  });

  Promise.all(promesas).then(() => {
    mostrarResultado("✅ Todos los tiempos han finalizado.");
  });
});
