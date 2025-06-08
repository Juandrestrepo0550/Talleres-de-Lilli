function evaluarValor(valor) {
  return new Promise((resolve, reject) => {
    if (valor > 10) {
      resolve(`✅ El valor ${valor} es mayor que 10.`);
    } else {
      reject(`❌ El valor ${valor} NO es mayor que 10.`);
    }
  });
}

function mostrarResultado(mensaje, exito = true) {
  const div = document.getElementById("resultado");
  div.textContent = mensaje;
  div.classList.remove("hidden");
  div.className = "mt-4 font-semibold p-3 rounded border-l-4 w-full text-center whitespace-pre-wrap";

  if (exito) {
    div.classList.add("border-green-500", "bg-green-100", "text-green-700");
  } else {
    div.classList.add("border-red-500", "bg-red-100", "text-red-700");
  }
}

document.getElementById("evaluarBtn").addEventListener("click", () => {
  const valor = Number(document.getElementById("valor").value);

  mostrarResultado("⏳ Evaluando valor...");

  evaluarValor(valor)
    .then(mensaje => mostrarResultado(mensaje))
    .catch(error => mostrarResultado(error, false));
});
