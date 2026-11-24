// Cambia TU-API por la dirección real que Render te entregue.
// Ejemplo: https://mi-api-productos.onrender.com/api/productos
const API_URL = "https://p3-productos-seguridad.onrender.com/api/productos";

const mensaje = document.getElementById("mensaje");
const resultados = document.getElementById("resultados");
const formulario = document.getElementById("formProducto");
const tokenInput = document.getElementById("txtToken");

function mostrarMensaje(texto, tipo = "") {
  mensaje.textContent = texto;
  mensaje.className = tipo;
}

async function listar() {
  mostrarMensaje("Cargando productos...");
  try {
    const respuesta = await fetch(API_URL);
    if (!respuesta.ok) throw new Error(`HTTP ${respuesta.status}`);
    const productos = await respuesta.json();
    resultados.replaceChildren();
    for (const p of productos) {
      const tarjeta = document.createElement("article");
      tarjeta.className = "tarjeta";
      const nombre = document.createElement("h3");
      nombre.textContent = p.nombre;
      const detalles = document.createElement("p");
      detalles.textContent = `Precio: $${p.precio} · Stock: ${p.stock}`;
      const boton = document.createElement("button");
      boton.type = "button";
      boton.className = "peligro";
      boton.dataset.id = p.id;
      boton.textContent = "Eliminar";
      tarjeta.append(nombre, detalles, boton);
      resultados.append(tarjeta);
    }
    mostrarMensaje(`${productos.length} producto(s) encontrado(s).`, "exito");
  } catch (error) {
    mostrarMensaje(`No se pudo conectar con la API: ${error.message}. Revisa Render y CORS.`, "error");
  }
}

async function peticionProtegida(url, metodo, datos) {
  const API_KEY = tokenInput.value.trim();
  if (!API_KEY) throw new Error("Escribe primero la clave API del equipo.");
  const opciones = {
    method: metodo,
    headers: { "x-api-key": API_KEY }
  };
  if (datos) {
    opciones.headers["Content-Type"] = "application/json";
    opciones.body = JSON.stringify(datos);
  }
  const respuesta = await fetch(url, opciones);
  if (!respuesta.ok) {
    const error = await respuesta.json().catch(() => ({}));
    throw new Error(error.errores ? error.errores.join(", ") : (error.error || `HTTP ${respuesta.status}`));
  }
  return respuesta;
}

formulario.addEventListener("submit", async (evento) => {
  evento.preventDefault();
  const datos = {
    nombre: document.getElementById("txtNombre").value.trim(),
    precio: Number(document.getElementById("txtPrecio").value),
    stock: Number(document.getElementById("txtStock").value)
  };
  try {
    await peticionProtegida(API_URL, "POST", datos);
    formulario.reset(); // también borra la clave introducida
    mostrarMensaje("Producto creado correctamente.", "exito");
    await listar();
  } catch (error) {
    mostrarMensaje(`No se pudo guardar: ${error.message}`, "error");
  }
});

resultados.addEventListener("click", async (evento) => {
  if (!evento.target.matches("button[data-id]")) return;
  const id = evento.target.dataset.id;
  try {
    await peticionProtegida(`${API_URL}/${encodeURIComponent(id)}`, "DELETE");
    await listar();
  } catch (error) {
    mostrarMensaje(`No se pudo eliminar: ${error.message}`, "error");
  }
});

document.getElementById("btnActualizar").addEventListener("click", listar);
listar();
