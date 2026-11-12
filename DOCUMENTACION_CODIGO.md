# Documentación técnica del código — JDI Beauty

## 1. Alcance y advertencia de arquitectura

Este proyecto es una aplicación de demostración exclusivamente frontend. React + Vite montan la página; Bootstrap 5 aporta utilidades de diseño; el motor funcional `public/app.js` conserva las reglas y eventos existentes; `public/styles.css` conserva el diseño original; y `src/styles/microinteractions.css` añade animaciones visuales.

**No existe backend, API propia ni base de datos.** El estado persistente se serializa como JSON en `localStorage`. Eso no modifica un archivo `.json` del proyecto y no sincroniza datos entre navegadores o dispositivos. La compra y el pago son simulados.

## 2. Punto de entrada y configuración

### `index.html`
- Declara el documento HTML en español, la codificación UTF-8 y la adaptación a pantallas móviles.
- Define el título, la descripción y la paleta del navegador.
- Incluye las fuentes web y un único nodo `#root` donde React monta la aplicación.
- Carga `src/main.jsx` como módulo.

### `package.json`
- `dev`: inicia el servidor de desarrollo de Vite.
- `build`: genera los archivos estáticos para producción.
- `preview`: permite revisar localmente la compilación.
- Dependencias de ejecución: React, React DOM y Bootstrap 5.
- Dependencias de desarrollo: Vite y el complemento de React.

### `vite.config.js`
Configura Vite para reconocer JSX mediante el complemento oficial de React.

### `src/main.jsx`
- Importa React y `createRoot`.
- Carga primero el CSS de Bootstrap 5.
- Carga el CSS de microinteracciones y el componente `App`.
- Monta la aplicación dentro del nodo `#root`.

### `src/App.jsx`
Es un puente de compatibilidad. Crea los puntos de montaje `#topbar`, `#header`, `#app`, `#cmpbar`, `#modal` y `#toast` y carga `public/styles.css` y `public/app.js`. Los identificadores son parte del contrato con el motor original: no se deben cambiar sin adaptar y probar ese motor.

## 3. Motor de la tienda: `public/app.js`

El archivo se mantiene para minimizar cambios funcionales. Las secciones y funciones principales son:

### Utilidades y formato
- `$ (selector, raíz)`: busca un elemento DOM por selector CSS.
- `money(n)`: formatea importes con convención regional colombiana.
- `esc(texto)`: escapa caracteres HTML especiales antes de incluir textos dinámicos en plantillas.
- `toast(mensaje)`: muestra una notificación temporal.
- `go(ruta)`: cambia el fragmento de la URL para navegar sin recarga completa.

### Datos y estado
- `T(...)`: construye objetos de tonos y su disponibilidad.
- `SEED`: catálogo inicial de productos de demostración, incluyendo precio, existencias, atributos cosméticos, imágenes y tonos.
- `SEED_ORD`: pedidos de demostración usados en la administración.
- `load(clave, alternativa)`: lee e interpreta un valor de `localStorage`; usa la alternativa si no existe o está corrupto.
- `save()`: serializa productos, carrito y pedidos en la clave `jdi2`.
- `S`: objeto de estado en memoria. Contiene los datos persistentes cargados y estado temporal de navegación, filtros, comparación, formularios y selección de tonos.
- `P(id)`: busca un producto por identificador.
- `avail(producto)`: comprueba si existe stock.

### Imágenes y tonos
- `art(...)`: genera una ilustración SVG de respaldo para tipos de producto.
- `photosOf(producto)`: determina la galería que debe utilizarse.
- `pic(producto, índice)`: crea la etiqueta de imagen para una tarjeta o ficha.
- `curTone(producto)`: recupera el tono seleccionado o escoge el primer tono disponible.
- `dots(producto)`: crea los indicadores visuales de tonos.
- `stars(producto)`: representa la puntuación de demostración del catálogo.
- `toneOk(producto, tono)` y `firstTone(producto)`: validan y seleccionan tonos.

### Carrito y cálculos
- `cartCount()`: suma unidades del carrito.
- `lineTotal(línea)`: calcula precio por cantidad.
- `subtotal()`: suma los subtotales.
- `addToCart(id, tono, cantidad)`: valida stock, combina líneas del mismo producto y tono, persiste el estado y actualiza el encabezado. Si no hay disponibilidad, informa al usuario.

### Navegación y catálogo
- `renderHeader()`: construye encabezado, navegación, búsqueda e indicador del carrito.
- `home()`: crea el inicio con banner, beneficios, destacados y categorías.
- `card(producto, modoComparación)`: genera la tarjeta de producto y sus acciones.
- `filtered()`: combina los criterios activos de búsqueda, categoría y filtros.
- `uniq(...)` y `sel(...)`: preparan valores y controles de selección de filtros.
- `list()`: genera el listado, filtros y resultados.
- `route()`: interpreta `location.hash`, prepara el estado temporal de la vista y llama al renderizador.
- `render()`: actualiza encabezado, contenido principal y barra de comparación.

### Detalle y comparación
- `detail()`: muestra galería, descripción, precio, atributos, tonos, cantidad y botón de agregar.
- `renderCmpBar()`: mantiene visible la selección de productos a comparar.
- `openCompare()`: abre la tabla comparativa y sus controles de producto.
- `closeModal()`: cierra y limpia el modal actual.
- La selección de comparación limita la selección a cuatro productos y permite operar con los productos seleccionados.

### Carrito y compra simulada
- `cart()`: presenta líneas, tonos, cantidades, subtotales, total y acciones de eliminación.
- `co()`: accede al objeto temporal de datos de compra.
- `fld(...)`: genera un campo y su mensaje de validación.
- `formDone()`: verifica que estén diligenciados los campos obligatorios definidos.
- `summary()` y `sumInner()`: generan el resumen y sus importes.
- `checkout()`: construye las etapas del checkout. El envío es fijo en $12.000. El pago es una simulación; no se contacta ninguna pasarela.
- Cuando se completa la compra simulada, se registra un pedido local con estado inicial `Recibido`, se vacía el carrito y se guarda el estado.

### Administración local
- `isAdmin()` y `login()`: controlan el acceso demostrativo al panel. No es autenticación segura.
- `adminShell(...)`: estructura común de las vistas administrativas.
- `stockBadge(...)`: presenta la disponibilidad.
- `adminCat()`, `prodForm(...)` y `saveProd(...)`: consulta, captura y guarda cambios locales del catálogo.
- `toneRow(...)`: construye filas de edición de tonos.
- `adminInv()`: muestra el inventario y sus controles de actualización.
- `adminPed()` y `adminOrd()`: muestran pedidos, detalle y estados.

### Eventos
Los listeners de `click`, `change`, `input`, `submit` y `hashchange` usan delegación de eventos. Esto permite manejar elementos que se generan dinámicamente con las plantillas. Los atributos `data-*` identifican las acciones. Al cambiar una plantilla, hay que conservar esos atributos o actualizar los listeners de forma coordinada.

## 4. Estilos y microinteracciones

### `public/styles.css`
Conserva la apariencia base del proyecto. Agrupa reglas visuales del encabezado, navegación, banner, tarjetas, catálogo, detalle, carrito, formularios, modales y administración. Los nombres de clases se utilizan en plantillas de `app.js`; deben tratarse como parte de la interfaz entre JavaScript y CSS.

### `src/styles/microinteractions.css`
- Define variables de color de JDI Beauty.
- Anima de forma discreta botones, enlaces, campos y tarjetas.
- Ofrece realce visual al pasar el cursor y al presionar controles.
- Marca el foco de teclado con `:focus-visible`.
- Aplica entrada suave a tarjetas, notificaciones y modal.
- Respeta `prefers-reduced-motion` para personas que solicitan movimiento reducido en el sistema operativo.

Las microinteracciones son exclusivamente visuales: no deben alterar el stock, los importes, la selección, el flujo de compra ni el estado administrativo.

## 5. Paleta de marca

- Principal: `#B8637A`
- Suave: `#E3AFA0`
- Malva: `#8C5468`
- Fondo crema: `#F7EDE9`
- Texto: `#3A2C2E`

## 6. Persistencia y límites

- Clave persistente: `jdi2` en `localStorage`.
- La persistencia se limita al navegador y origen actuales.
- Borrar los datos del sitio elimina los cambios locales.
- Los datos pueden modificarse desde las herramientas del navegador; no hay control de acceso seguro.
- No se almacenan datos en una base de datos ni se sincronizan entre usuarios.
- No introducir datos bancarios reales: el checkout es demostrativo.

## 7. Cómo documentar un cambio futuro

1. Identificar el caso de uso afectado.
2. Localizar la plantilla que genera el control.
3. Localizar el listener que responde al atributo `data-*`.
4. Mantener las validaciones de stock, cantidades y estados.
5. Actualizar comentarios si cambia el comportamiento.
6. Probar el flujo completo y volver a cargar la página para comprobar persistencia.

## 8. Lista de pruebas de regresión

- [ ] Abrir inicio y navegar por categorías.
- [ ] Buscar un producto por nombre.
- [ ] Combinar y limpiar filtros.
- [ ] Mostrar el mensaje de cero resultados.
- [ ] Abrir detalle y recorrer imágenes.
- [ ] Seleccionar tonos disponibles y comprobar tonos agotados.
- [ ] Cambiar cantidad y comprobar límite de stock.
- [ ] Comparar entre dos y cuatro productos y bloquear el quinto.
- [ ] Agregar desde el listado, detalle y comparación.
- [ ] Cambiar cantidades, eliminar líneas y comprobar subtotales/total.
- [ ] Completar los datos de compra y revisar validaciones.
- [ ] Completar la compra simulada y comprobar el pedido y el carrito vacío.
- [ ] Registrar/editar producto y comprobar persistencia.
- [ ] Cambiar inventario, impedir cantidades inválidas y comprobar stock cero.
- [ ] Cambiar estado de pedido y comprobar persistencia.
- [ ] Revisar versión móvil, teclado y movimiento reducido.

> La documentación describe la estructura del código. No sustituye la ejecución de estas pruebas en navegador; cualquier afirmación de funcionamiento debe basarse en pruebas realizadas.


## Microinteracciones añadidas (public/styles.css)

El bloque `MICROINTERACCIONES VISIBLES — AJUSTES SOLICITADOS` documenta los efectos visuales nuevos:
- Botones con elevación, acercamiento y estado de pulsación.
- CTA principal de portada con zoom más visible.
- Navegación con subrayado animado y desplegable con transición.
- Flechas de galería con mayor tamaño, contraste y feedback de hover/foco.
- Miniaturas con respuesta visual.
- Enfoque visible para campos de formulario.
- Respeto por la preferencia de movimiento reducido del sistema.

Estas reglas no reemplazan los manejadores de eventos de `app.js`; solo cambian presentación.


### Escena final del carrusel
La fotografía `public/img/banner-jdi-final.png` no contiene el titular promocional. El nombre de marca, el mensaje «Más que maquillaje, es confianza» y los cuatro beneficios se renderizan como HTML accesible y se posicionan mediante CSS responsivo en el espacio libre superior derecho.


### Ajustes de escenas del carrusel
En la escena 2, el texto se ubica en la zona central-derecha entre la composición de productos y el retrato, sin panel de fondo. En la escena final, el titular y los beneficios se muestran como HTML/CSS en el espacio superior derecho; se fuerza su visualización para evitar que reglas heredadas lo oculten.


## Integración de galerías HD

Las galerías se definen en `PRODUCT_GALLERIES` dentro de `public/app.js`. Cada clave corresponde al ID estable del producto del catálogo y contiene cinco rutas de imagen relativas a `public/`. `photosOf(p)` prioriza las imágenes personalizadas del producto y, en su ausencia, utiliza la galería asociada a su ID antes de recurrir a las imágenes de respaldo por tipo. Esta estrategia permite que las galerías se muestren también cuando el navegador ya conserva productos anteriores en `localStorage`.

Las miniaturas y flechas de la ficha continúan usando el estado `S.img`; por tanto, no se reemplazó la interacción existente, solo se amplió la fuente de imágenes.
