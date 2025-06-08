function mostrarResultado(mensaje) {
  const div = document.getElementById("resultado");
  div.classList.remove("hidden");
  // Añadimos cada mensaje como un párrafo para ver todos los pasos
  div.innerHTML += `<p>${mensaje}</p>`;
  div.className = "mt-4 font-semibold p-3 rounded border-l-4 w-full text-center whitespace-pre-wrap border-blue-500 bg-blue-100 text-blue-700";
}

document.getElementById("iniciarBtn").addEventListener("click", () => {
  const valorStr = document.getElementById("valorInicial").value;
  const valor = Number(valorStr);

  const div = document.getElementById("resultado");
  div.innerHTML = ""; // limpiar resultados anteriores

  if (isNaN(valor)) {
    mostrarResultado("❌ Por favor, ingresa un número válido.", false);
    return;
  }

  Promise.resolve(valor)
    .then(v => {
      mostrarResultado(`Valor inicial: ${v}`);
      return v * 2;
    })
    .then(v => {
      mostrarResultado(`Valor multiplicado por 2: ${v}`);
      return v + 3;
    })
    .then(v => {
      mostrarResultado(`Valor sumado 3: ${v}`);
      return v / 5;
    })
    .then(v => {
      mostrarResultado(`Valor dividido por 5: ${v}`);
    });
});
