# P3 · Página web para GitHub Pages

1. Abre `app.js` y modifica `API_URL` para que apunte a la URL **real** de tu API en Render. Ejemplo: `https://mi-servicio.onrender.com/api/productos`.
2. Sube `index.html`, `app.js`, `styles.css` y `.nojekyll` a la **raíz de un repositorio nuevo** llamado, por ejemplo, `p3-frontend`.
3. En `Settings → Pages`, selecciona `Deploy from a branch` → `main` → `/(root)` → `Save`.
4. En Render configura `ORIGEN_PERMITIDO` con el origen de tu sitio `https://TU_USUARIO.github.io` (sin `p3-frontend` y sin `/` al final), más los orígenes locales que uses.
5. La página lista los productos sin clave. Para agregar y eliminar, escribe la misma `API_KEY` que está configurada en Render en el campo **Clave API del equipo**.

Se eligió pedir la clave en pantalla para no publicarla permanentemente en el archivo JavaScript. Esto es una mejora frente al ejemplo didáctico del PDF, pero **no constituye seguridad de producción**: las credenciales enviadas por el navegador son visibles en sus herramientas de desarrollo. Nunca utilices una contraseña personal o una clave de otro servicio.

El servidor debe estar activo en Render para que la página funcione. La API conserva los datos solo en memoria; al reiniciar el servicio se restablecen los productos de ejemplo.
