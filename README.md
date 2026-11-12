# JDI Beauty — frontend documentado

Tienda de maquillaje de demostración con React, Vite, Bootstrap 5, JavaScript y CSS personalizado. El motor funcional original se conserva mediante un puente de compatibilidad para reducir el riesgo de cambiar el comportamiento existente.

## Alcance

- **Solo frontend.** No contiene backend, API propia ni base de datos.
- **Compra y pago simulados.** No se procesa dinero ni se debe introducir información bancaria real.
- **Persistencia local.** El estado de productos, carrito y pedidos se serializa en `localStorage` bajo la clave `jdi2`. No se sincroniza entre dispositivos.
- **Catálogo inicial.** Los productos de demostración están definidos como `SEED` dentro de `public/app.js`.

## Tecnologías

- **React 18:** monta la aplicación y el puente de compatibilidad.
- **Vite:** servidor de desarrollo y compilación del frontend.
- **Bootstrap 5:** utilidades y estilos base disponibles para la interfaz.
- **JavaScript ES6+:** lógica del catálogo, filtros, detalle, comparación, carrito, checkout simulado y administración local.
- **CSS:** diseño original y microinteracciones.
- **JSON:** formato usado para serializar el estado en `localStorage`; no es una base de datos ni un archivo del proyecto que el navegador reescriba.

## Estructura

```text
JDI_Beauty_React_Vite_Bootstrap_Documentado/
├── index.html
├── package.json
├── vite.config.js
├── README.md
├── DOCUMENTACION_CODIGO.md
├── public/
│   ├── app.js                 # Motor funcional original con comentarios
│   ├── styles.css             # Estilos visuales conservados
│   └── img/                   # Imágenes locales
└── src/
    ├── main.jsx               # Entrada de React y carga de Bootstrap
    ├── App.jsx                # Montaje compatible con el motor original
    └── styles/
        └── microinteractions.css
```

## Instalación y ejecución

Requisitos: Node.js LTS y npm.

1. Descomprime el ZIP.
2. Abre la carpeta raíz del proyecto en Visual Studio Code.
3. Abre la terminal en esa carpeta.
4. Instala las dependencias:

   ```bash
   npm install
   ```

5. Inicia el servidor de desarrollo:

   ```bash
   npm run dev
   ```

6. Abre la URL que indique Vite, normalmente `http://localhost:5173`.
7. Para comprobar la compilación:

   ```bash
   npm run build
   npm run preview
   ```

## Documentación del código

Consulta **`DOCUMENTACION_CODIGO.md`** para conocer:
- responsabilidades de cada archivo;
- funciones y grupos de lógica de `public/app.js`;
- estado, almacenamiento, filtros, detalle, comparación, carrito, compra y administración;
- CSS y microinteracciones;
- límites de seguridad y persistencia;
- lista de pruebas de regresión.

Los comentarios dentro de los archivos explican la intención de las funciones y los bloques principales. Los comentarios no cambian el comportamiento del programa.

## Microinteracciones

`src/styles/microinteractions.css` añade transiciones discretas, estados hover/active, realce de foco, animación de aparición para tarjetas/notificaciones/modales y soporte para `prefers-reduced-motion`. Las acciones y reglas de negocio siguen a cargo de `public/app.js`.

## Nota de arquitectura

`src/App.jsx` mantiene los IDs que espera el motor original (`topbar`, `header`, `app`, `cmpbar`, `modal`, `toast`). No se deben renombrar sin adaptar el motor. Esta entrega organiza el proyecto con React + Vite, pero conserva la lógica heredada mediante un puente; no es una reescritura completa de cada vista como componente React nativo.

## Verificación antes de entregar

Ejecuta `npm install`, `npm run build` y la lista de pruebas de `DOCUMENTACION_CODIGO.md`. La documentación por sí sola no demuestra que todos los flujos hayan pasado pruebas de navegador.


## Corrección de edición administrativa

Se añadió una regla CSS de compatibilidad para el contenedor `#modal`: Bootstrap 5 define una clase global `.modal` con `display: none`, que puede ocultar el formulario legado de edición aunque JavaScript retire el atributo `hidden`. La regla `.modal:not([hidden]) { display: block; }` permite que el formulario se muestre como en la versión original. La lógica `prodForm(...)` y `saveProd(...)` de `public/app.js` se conserva.


## Ajustes visuales de esta versión

- El botón **Descubrir productos** tiene un acercamiento más visible al pasar el cursor y una respuesta de pulsación.
- Las flechas de la galería de producto son más grandes, contrastadas y muestran estados hover/active/focus.
- Las flechas del menú se muestran solo en **Maquillaje**, que sí tiene un menú desplegable. Labios, Ojos y Rostro son enlaces directos, por lo que ya no muestran un indicador engañoso.
- El menú de Maquillaje ahora aparece con transición y también se puede abrir mediante foco de teclado.
- La galería de producto permanece visible en pantallas grandes mientras se consulta la ficha, reduciendo la sensación de columna vacía debajo de la imagen.
- Se añadieron estados visibles de foco a los campos y una regla para respetar `prefers-reduced-motion`.

Estos cambios son de presentación. No modifican las reglas del catálogo, carrito, comparación, inventario, pedidos ni edición administrativa.


La escena final del carrusel usa una fotografía sin titular promocional; el texto de campaña se superpone mediante HTML/CSS para mantener nitidez y adaptación responsiva.


El carrusel conserva el texto de la escena 2 reubicado en el espacio central-derecho. La escena final muestra el mensaje de marca como HTML/CSS sobre la fotografía limpia.


## Galerías fotográficas de productos (integración HD)

Se incorporaron 45 fotografías HD en `public/img/productos/`, organizadas en galerías de cinco imágenes para los productos con material disponible. La selección se configura en `PRODUCT_GALLERIES` dentro de `public/app.js`, asociada al ID del producto; así se mantiene aunque el navegador tenga datos antiguos guardados en `localStorage`.

Productos con galería integrada: Base de Maquillaje Luminosa, Rubor Compacto, Máscara de Pestañas Volume, Paleta de Sombras Nude, Polvo Compacto Traslúcido, Labial Satinado Rose, Máscara de Pestañas Lengthening, Paleta de Sombras Cobre y Base de Maquillaje Cobertura Total.

Pendiente de fotografías: Labial Mate Velvet. No se asignaron imágenes por aproximación para evitar mostrar fotografías de otro acabado o producto.
