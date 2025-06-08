function validarStock(productoNombre) {
  return fetch("productos.json")
    .then(res => {
      if (!res.ok) throw new Error("Error al leer el inventario");
      return res.json();
    })
    .then(productos => {
      const producto = productos.find(p =>
        p.nombre.toLowerCase() === productoNombre.toLowerCase()
      );

      if (!producto) {
        throw "Producto no encontrado";
      }

      if (producto.stock > 0) {
        return "Stock disponible";
      } else {
        throw "Producto agotado";
      }
    });
}

function procesarPago(tarjeta) {
  return new Promise((resolve, reject) => {
    if (tarjeta.trim().length >= 8) {
      setTimeout(() => resolve("Pago aprobado"), 1000);
    } else {
      reject("Tarjeta inválida");
    }
  });
}

document.getElementById("comprarBtn").addEventListener("click", () => {
  const producto = document.getElementById("producto").value;
  const tarjeta = document.getElementById("tarjeta").value;
  const resultado = document.getElementById("resultado");

  resultado.classList.add("hidden");

  if (!producto.trim() || !tarjeta.trim()) {
    resultado.textContent = "❌ Por favor, completa todos los campos";
    resultado.className =
      "mt-4 font-semibold p-3 rounded border-l-4 border-yellow-600 bg-yellow-800 text-yellow-300 w-full text-center";
    resultado.classList.remove("hidden");
    return;
  }

  validarStock(producto)
    .then(() => procesarPago(tarjeta))
    .then(() => {
      resultado.textContent = "✅ Compra exitosa";
      resultado.className =
        "mt-4 font-semibold p-3 rounded border-l-4 border-green-600 bg-green-800 text-green-300 w-full text-center";
      resultado.classList.remove("hidden");
    })
    .catch(error => {
      resultado.textContent = `❌ Error: ${error}`;
      resultado.className =
        "mt-4 font-semibold p-3 rounded border-l-4 border-red-600 bg-red-800 text-red-300 w-full text-center";
      resultado.classList.remove("hidden");
    });
});
