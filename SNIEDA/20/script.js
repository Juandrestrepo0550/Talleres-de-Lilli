function paso1() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve("Paso 1 completado");
    }, 1000);
  });
}

function paso2() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve("Paso 2 completado");
    }, 1000);
  });
}

function paso3() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve("Paso 3 completado");
    }, 1000);
  });
}

function mostrarResultado(mensaje, append = false) {
  const div = document.getElementById("resultado");
  if (append && !div.classList.contains("hidden")) {
    div.textContent += `\n${mensaje}`;
  } else {
    div.textContent = mensaje;
    div.classList.remove("hidden");
  }
  div.className = "mt-4 font-semibold p-3 rounded border-l-4 w-full text-center whitespace-pre-wrap";
}

document.getElementById("iniciarBtn").addEventListener("click", () => {
  mostrarResultado("⏳ Iniciando secuencia...");
  paso1()
    .then(res1 => {
      mostrarResultado(res1);
      return paso2();
    })
    .then(res2 => {
      mostrarResultado(res2, true);
      return paso3();
    })
    .then(res3 => {
      mostrarResultado(res3, true);
      mostrarResultado("✅ Secuencia completada!", true);
    })
    .catch(error => {
      mostrarResultado(`❌ Error: ${error.message}`, false);
    });
});
