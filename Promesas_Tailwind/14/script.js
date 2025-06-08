let controller;

function delay(ms, signal) {
    return new Promise((resolve, reject) => {
        const id = setTimeout(resolve, ms);
        signal.addEventListener("abort", () => {
            clearTimeout(id);
            reject(new DOMException("Abortado", "AbortError"));
        });
    });
}

function leerArchivoTexto(archivo, signal) {
    return new Promise((resolve, reject) => {
        const lector = new FileReader();

        signal.addEventListener("abort", () => {
            lector.abort();
            reject(new DOMException("Abortado", "AbortError"));
        });

        lector.onload = () => resolve(lector.result);
        lector.onerror = () => reject("Error al leer el archivo");

        lector.readAsText(archivo);
    });
}

async function realizarLecturaConCancelacion() {
    controller = new AbortController();
    const signal = controller.signal;

    const input = document.getElementById("archivoInput");
    const archivo = input.files[0];

    if (!archivo) {
        mostrarResultado("⚠️ Selecciona un archivo .txt primero");
        return;
    }

    try {
        mostrarResultado("⏳ Leyendo archivo...");
        const texto = await leerArchivoTexto(archivo, signal);

        mostrarResultado("⏳ Procesando archivo...");
        await delay(3000, signal);

        mostrarResultado(`✅ Archivo leído correctamente:<br><pre class="whitespace-pre-wrap">${texto}</pre>`);
    } catch (err) {
        if (err.name === "AbortError") {
            mostrarResultado("❌ Operación cancelada por el usuario");
        } else {
            mostrarResultado("⚠️ Error durante la lectura o proceso");
        }
    }
}

function mostrarResultado(mensajeHTML) {
    const div = document.getElementById("resultado");
    div.innerHTML = mensajeHTML;
    div.classList.remove("hidden");
    div.className = "mt-4 font-semibold p-3 rounded border-l-4 w-full text-center";

    if (mensajeHTML.startsWith("✅")) {
        div.classList.add("border-green-500", "bg-green-100", "text-green-700");
    } else if (mensajeHTML.startsWith("❌")) {
        div.classList.add("border-red-500", "bg-red-100", "text-red-700");
    } else {
        div.classList.add("border-yellow-500", "bg-yellow-100", "text-yellow-700");
    }
}

document.getElementById("iniciarBtn").addEventListener("click", () => {
    realizarLecturaConCancelacion();
});

document.getElementById("cancelarBtn").addEventListener("click", () => {
    if (controller) controller.abort();
});
