# JDI Beauty 💄
### Tienda virtual de maquillaje | Proyecto académico de desarrollo frontend

JDI Beauty es una tienda virtual de demostración especializada en productos de maquillaje. Su interfaz permite explorar un catálogo, consultar productos, aplicar filtros, comparar referencias, gestionar un carrito de compras y simular el proceso de compra.

El proyecto está desarrollado con React, Vite, Bootstrap 5, JavaScript y CSS personalizado. Su arquitectura conserva el motor funcional original mediante un puente de compatibilidad, integrándolo con la estructura de React y Vite.

---

## 📌 Características principales

- **Catálogo de productos:** visualización de productos organizados por categorías.
- **Búsqueda y filtros:** herramientas para localizar productos y explorar el catálogo.
- **Detalle de productos:** consulta de información y galerías fotográficas.
- **Comparación:** comparación de diferentes productos.
- **Carrito de compras:** administración de productos y cantidades.
- **Compra simulada:** flujo de checkout de demostración.
- **Administración local:** gestión de productos desde la interfaz administrativa.
- **Persistencia local:** conservación del estado de la aplicación mediante `localStorage`.
- **Diseño responsive:** adaptación de la interfaz a diferentes tamaños de pantalla.
- **Microinteracciones:** transiciones, efectos visuales y estados de interacción.

## 🛠️ Tecnologías utilizadas

| Tecnología | Uso en el proyecto |
|---|---|
| React 18 | Montaje de la aplicación y compatibilidad con el motor original. |
| Vite | Entorno de desarrollo y compilación. |
| Bootstrap 5 | Utilidades y estilos base de la interfaz. |
| JavaScript ES6+ | Lógica funcional de la tienda. |
| HTML5 | Estructura de la aplicación. |
| CSS3 | Diseño visual, responsive y microinteracciones. |
| JSON | Serialización de información para el almacenamiento local. |
| localStorage | Persistencia de datos en el navegador. |

## 📁 Estructura del proyecto

```text
JDI_Beauty/
├── index.html
├── package.json
├── vite.config.js
├── README.md
├── DOCUMENTACION_CODIGO.md
│
├── public/
│   ├── app.js
│   ├── styles.css
│   └── img/
│       ├── banners/
│       └── productos/
│
└── src/
    ├── main.jsx
    ├── App.jsx
    └── styles/
        └── microinteractions.css
```

### Descripción de los archivos principales

| Archivo o carpeta | Responsabilidad |
|---|---|
| `index.html` | Documento HTML principal. |
| `package.json` | Dependencias y comandos del proyecto. |
| `vite.config.js` | Configuración de Vite. |
| `src/main.jsx` | Punto de entrada de React y carga de estilos. |
| `src/App.jsx` | Montaje de la interfaz y puente de compatibilidad. |
| `public/app.js` | Motor funcional de la tienda. |
| `public/styles.css` | Estilos principales de la interfaz. |
| `src/styles/microinteractions.css` | Animaciones y microinteracciones. |
| `public/img/` | Recursos gráficos e imágenes locales. |
| `DOCUMENTACION_CODIGO.md` | Documentación técnica detallada del código. |

## 🚀 Instalación y ejecución

### Requisitos previos

- [Node.js](https://nodejs.org/) — versión LTS recomendada.
- npm, incluido con Node.js.
- Visual Studio Code (recomendado).

### 1. Clonar el repositorio

```bash
git clone https://github.com/ivargas4-cloud/ecommerce.git
```

### 2. Ingresar a la carpeta del proyecto

```bash
cd ecommerce
```

### 3. Instalar las dependencias

```bash
npm install
```

### 4. Ejecutar el servidor de desarrollo

```bash
npm run dev
```

Vite mostrará en la terminal la dirección local para abrir la aplicación, normalmente:

```text
http://localhost:5173
```

### 5. Compilar para producción

Para comprobar que el proyecto puede compilarse:

```bash
npm run build
```

Para visualizar la compilación localmente:

```bash
npm run preview
```

## 🏗️ Arquitectura y funcionamiento

JDI Beauty utiliza React y Vite como estructura de ejecución y desarrollo, mientras conserva el motor funcional original en `public/app.js`.

`src/App.jsx` mantiene los elementos e identificadores que necesita el motor heredado para operar correctamente. Este enfoque permite integrar la aplicación en la estructura de React sin reescribir completamente sus vistas y funcionalidades.

**Importante:** esta arquitectura utiliza un puente de compatibilidad. No corresponde a una reescritura completa de la tienda mediante componentes React independientes.

## 💾 Almacenamiento de información

La aplicación utiliza `localStorage` para conservar información en el navegador.

- La información se serializa en formato JSON.
- La clave de almacenamiento utilizada es `jdi2`.
- Los datos permanecen asociados al navegador y dispositivo donde se utiliza la aplicación.
- No existe sincronización entre dispositivos ni almacenamiento centralizado.

El catálogo inicial de demostración se encuentra definido mediante la constante `SEED` en `public/app.js`.

## 🖼️ Recursos gráficos

El proyecto incorpora recursos visuales locales para las categorías, banners y productos.

Se integraron **50 fotografías de productos**, organizadas en galerías de cinco imágenes para cada uno de los diez productos del catálogo.

La configuración de las galerías se encuentra en `PRODUCT_GALLERIES`, dentro de `public/app.js`, asociada al identificador de cada producto.

## 🎨 Diseño y experiencia de usuario

La interfaz utiliza una identidad visual basada en tonos rosados, nude y neutros, con una presentación orientada al sector de la belleza y el maquillaje.

Se incorporan:

- Diseño adaptable a dispositivos móviles, tabletas y computadores.
- Efectos de interacción en botones y elementos de navegación.
- Transiciones en menús, tarjetas y notificaciones.
- Estados visibles de foco para mejorar la navegación mediante teclado.
- Compatibilidad con la preferencia de movimiento reducido mediante `prefers-reduced-motion`.

## ⚠️ Alcance y limitaciones

Este proyecto corresponde a una demostración académica de frontend.

- No cuenta con backend ni API propia.
- No utiliza una base de datos.
- El proceso de compra es simulado.
- No procesa pagos reales ni transacciones financieras.
- Los datos se almacenan únicamente en el navegador mediante `localStorage`.
- La información de administración y los pedidos no se sincronizan con un servidor.
- No debe introducirse información bancaria, contraseñas reales ni datos personales sensibles.

## 📚 Documentación técnica

Para profundizar en la implementación, consulta el archivo **[DOCUMENTACION_CODIGO.md](./DOCUMENTACION_CODIGO.md)**.

Allí se documentan:

- Responsabilidades de los archivos.
- Organización del motor funcional.
- Gestión del estado y almacenamiento local.
- Catálogo, filtros y detalle de productos.
- Comparación y carrito de compras.
- Flujo de compra simulado.
- Administración local.
- Estilos y microinteracciones.
- Consideraciones de seguridad y persistencia.
- Pruebas de regresión recomendadas.

## 🧪 Verificación del proyecto

Antes de considerar una modificación como lista para entrega, se recomienda ejecutar:

```bash
npm install
npm run build
```

También se recomienda probar manualmente los principales flujos de navegación, búsqueda, filtros, comparación, carrito, compra simulada y administración.

Una compilación exitosa confirma que Vite pudo generar la versión de producción, pero no garantiza por sí sola que todas las funcionalidades hayan superado pruebas de navegador.

## 👥 Autores

Proyecto desarrollado por:

- Jesús Ruiz
- Dianys Ramirez
- Isabella Vargas

## 📄 Derechos de autor

© 2026 JDI Beauty. Todos los derechos reservados sobre los elementos originales desarrollados para este proyecto, de acuerdo con la titularidad y las condiciones legales aplicables.

---

**JDI Beauty — Belleza, estilo y experiencia digital.**