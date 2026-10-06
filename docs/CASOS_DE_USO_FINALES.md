# Casos de uso finales — Ecommerce de maquillaje

> Esta versión conserva el contenido original y aplica únicamente los cambios acordados para eliminar contradicciones y alinear la futura implementación frontend.

## CU-01 — Buscar y filtrar productos

**Summary:** Permite al Cliente encontrar productos de maquillaje navegando por categorías y aplicando filtros como tipo de producto, color, fórmula cosmética, tipo de piel, tonos y rango de precio, para reducir rápidamente los resultados mostrados.

**Actor:** Cliente.

**Precondition:** El Cliente ha ingresado al sitio web del ecommerce.

**Postcondition:** El Cliente visualiza un listado de productos que coincide con la categoría, búsqueda y filtros seleccionados.

**Base Sequence — FILTRAR PRODUCTOS**
1. El Cliente selecciona una categoría desde el menú principal.
2. El sistema muestra los productos disponibles dentro de esa categoría.
3. El Cliente puede seleccionar la opción de filtros, donde tendrá diferentes opciones como: tipo de producto, color, fórmula cosmética, tipo de piel, tonos y rango de precio.
4. Una vez aplicados los filtros, el sistema muestra los productos con las características solicitadas.
5. El Cliente revisa las opciones disponibles en el listado resultante.
6. El Cliente puede agregar un producto al carrito si lo desea.

**Base Sequence — BUSCAR PRODUCTOS**
1. El Cliente ubica la barra de búsqueda en la parte superior del sitio web.
2. El Cliente ingresa el nombre del producto.
3. El sistema muestra los productos que coinciden con la búsqueda realizada, si existen en el sitio web.
4. El Cliente puede agregar un producto al carrito si lo desea.

**Branch Sequence**
- 3.1 (FILTRAR): El Cliente puede combinar varios filtros al mismo tiempo.
- 3.2 (FILTRAR): El Cliente puede quitar uno o varios filtros para ampliar nuevamente los resultados.

**Exception Sequence**
- 4.1 (FILTRAR): Si ningún producto coincide con los filtros seleccionados, el sistema muestra un mensaje indicando que no se encontraron resultados.

**Sub UseCase:** —

**Nota:** La disponibilidad de los productos mostrados depende de la información de inventario disponible para cada producto.

---

## CU-02 — Consultar detalle de producto

**Summary:** Permite al Cliente consultar la información completa de un producto específico, incluyendo precio, descripción, tonos disponibles, características y disponibilidad.

**Actor:** Cliente.

**Precondition:** El Cliente se encuentra viendo un listado de productos, resultado de una búsqueda, filtro o categoría, y ha seleccionado un producto del listado.

**Postcondition:** El Cliente conoce la información necesaria del producto para decidir si lo agrega al carrito.

**Base Sequence**
1. El sistema muestra la página del producto con sus fotos en un carrusel, precio, descripción, contenido, tonos disponibles, tipo de piel, acabados, fórmula cosmética, ingredientes, modo de uso, cuidados y beneficios.
2. El Cliente selecciona el tono que desea, si aplica para el producto escogido.
3. El sistema muestra el contador de cantidad, con valor por defecto de 1 unidad.
4. El Cliente ajusta la cantidad de unidades mediante el contador, si lo desea.
5. El Cliente selecciona el botón de agregar al carrito, si lo desea.
6. El sistema agrega el producto al carrito con el tono y la cantidad seleccionados y actualiza el indicador del ícono del carrito con la cantidad de productos agregados.

**Branch Sequence**
- 2.1: Si el producto no maneja variantes de tono, el Cliente pasa directamente al paso 3.
- 5.1: El Cliente puede regresar al listado de productos en cualquier momento sin agregar el producto al carrito.

**Exception Sequence**
- 2.2: Si el tono seleccionado por el Cliente no está disponible, el sistema lo muestra deshabilitado y no permite seleccionarlo.
- 4.1: Si el Cliente intenta seleccionar una cantidad mayor a las unidades disponibles en inventario, el sistema limita el contador al máximo disponible y muestra un mensaje indicando el stock restante.

**Sub UseCase:** —

**Nota:** La disponibilidad de los productos y de sus tonos depende de la información de inventario disponible.

---

## CU-03 — Comparar productos

**Summary:** Permite al Cliente seleccionar varios productos y visualizarlos en una misma pantalla, comparando precio, características, tonos disponibles y disponibilidad, para facilitar su decisión de compra.

**Actor:** Cliente.

**Precondition:** El Cliente se encuentra viendo un listado de productos y ha identificado más de una opción de su interés.

**Postcondition:** El Cliente visualiza un cuadro comparativo con la información relevante de los productos seleccionados.

**Base Sequence**
1. El Cliente se encuentra en el listado de productos de una categoría.
2. El sistema muestra, sobre cada producto del listado, una casilla de selección «Comparar».
3. El Cliente selecciona la casilla de 2 a 4 productos que desea comparar.
4. El sistema muestra un mensaje indicando cuántos productos ha seleccionado el Cliente (ejemplo: «Has seleccionado 3 de 4 productos») junto con el botón «Comparar».
5. El Cliente selecciona el botón «Comparar».
6. El sistema abre una ventana de comparación con la foto de cada producto seleccionado y una tabla comparativa con las mismas características: nombre, precio, descripción, contenido, tonos disponibles, disponibilidad, tipo de piel, acabados, fórmula cosmética y beneficios.
7. Debajo de cada producto, el sistema muestra un contador de cantidad (valor por defecto 1) y un botón «Agregar al carrito».
8. El Cliente revisa el comparativo y, si lo desea, selecciona el tono disponible, si aplica, ajusta la cantidad y selecciona «Agregar al carrito» en el producto de su elección.
9. El sistema agrega el producto al carrito con el tono y la cantidad seleccionados y actualiza el indicador del ícono del carrito con la cantidad de productos agregados.

**Branch Sequence**
- 3.1: Si el Cliente ha seleccionado menos de 2 productos, el botón «Comparar» permanece deshabilitado.
- 6.1: El Cliente puede seleccionar el enlace «Volver al listado», disponible en todo momento dentro de la ventana de comparación, con lo cual el sistema cierra la ventana y regresa al listado de productos, reiniciando la selección de comparación.
- 8.1: El Cliente puede seleccionar uno de los productos dentro de la ventana de comparación para ver su detalle completo (ver Sub UseCase «Consultar detalle de producto»).
- 8.2: El Cliente puede agregar más de un producto al carrito desde la misma ventana de comparación, repitiendo el paso 8 para cada producto.

**Exception Sequence**
- 3.2: Si el Cliente intenta seleccionar un quinto producto, el sistema le impide agregarlo y muestra un mensaje indicando el límite máximo de 4 productos.
- 8.3: Si el Cliente intenta seleccionar una cantidad mayor a las unidades disponibles en inventario, el sistema limita el contador al máximo disponible y muestra un mensaje indicando el stock restante.

**Sub UseCase:** Consultar detalle de producto.

**Nota:** «Comparar» permanece disponible de forma permanente en el listado de productos.

---

## CU-04 — Gestionar carrito de compras

**Summary:** Permite al Cliente revisar y modificar el contenido de su carrito de compras antes de continuar con el proceso de compra.

**Actor:** Cliente.

**Precondition:** El Cliente ha agregado al menos un producto al carrito.

**Postcondition:** El carrito refleja los productos y cantidades que el Cliente desea comprar.

**Base Sequence — VER CARRITO**
1. El Cliente selecciona el ícono del carrito en el encabezado del sitio.
2. El sistema muestra, por cada producto agregado: foto, nombre, tono seleccionado, precio unitario, cantidad y subtotal (precio unitario × cantidad).
3. El sistema muestra el total general del carrito, sumando los subtotales de todos los productos.
4. El Cliente revisa que los productos y cantidades sean correctos.
5. El Cliente selecciona el botón «Continuar con la compra».

**Base Sequence — EDITAR CARRITO**
1. El Cliente ajusta la cantidad de un producto mediante el contador (botones «-» y «+»), igual que en el detalle de producto.
2. El sistema actualiza el subtotal del producto y el total general del carrito de forma automática.
3. El Cliente selecciona el ícono de eliminar (papelera) junto a un producto, si desea quitarlo.
4. El sistema elimina el producto del carrito de inmediato y actualiza el total general.
5. El Cliente continúa con el proceso de compra.

**Branch Sequence**
- 1.1 (EDITAR): El Cliente puede modificar la cantidad sin eliminar ningún producto.
- 1.2 (EDITAR): Si el Cliente reduce la cantidad de un producto a 0 con el botón «-», el sistema lo elimina automáticamente del carrito, igual que si hubiera usado el ícono de eliminar.
- 3.1 (EDITAR): El Cliente puede eliminar un producto sin modificar cantidades de los demás.
- 5.1 (VER): El Cliente puede seleccionar el enlace «Continuar comprando», disponible en todo momento en la vista del carrito, con lo cual el sistema lo regresa al listado de productos sin finalizar el proceso de compra.

**Exception Sequence**
- 1.3 (EDITAR): Si el Cliente intenta aumentar la cantidad por encima de las existencias disponibles, el sistema limita el contador al máximo disponible y muestra un mensaje indicando la cantidad máxima disponible.
- 4.1 (EDITAR): Si el carrito queda vacío después de eliminar productos, el sistema muestra un mensaje indicando que el carrito está vacío y no permite continuar con el proceso de compra hasta que se agregue al menos un producto.

**Sub UseCase:** —
