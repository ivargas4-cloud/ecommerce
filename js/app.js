/* =====================================================================
   E-COMMERCE DE MAQUILLAJE | JAVASCRIPT DOCUMENTADO
   =====================================================================
   Proyecto: solo frontend.

   CASOS DE USO IMPLEMENTADOS
   CU-01 Buscar y filtrar productos
   CU-02 Consultar detalle de producto
   CU-03 Comparar productos
   CU-04 Gestionar carrito de compras

   REGLA DEL PROYECTO
   Cada función de este archivo corresponde a un paso, rama o excepción
   de los casos de uso definidos. No se implementan favoritos, cuenta,
   ordenamiento, pagos, cupones, reseñas u otras funciones no definidas.
   ===================================================================== */

/* =====================================================================
   DATOS SIMULADOS DEL CATÁLOGO
   ---------------------------------------------------------------------
   El stock es local porque el proyecto es exclusivamente frontend.
   No representa una gestión real de inventario.
   ===================================================================== */
const products = [
  {
    id: "base-natural",
    name: "Base Natural",
    type: "Base",
    color: "claro",
    formula: "Líquida",
    skin: "Normal",
    tone: "Claro",
    price: 45000,
    stock: 8,
    category: "Maquillaje",
    description: "Base líquida de cobertura natural, pensada para un acabado uniforme y ligero.",
    images: ["img/productos/base-natural/1.jpg", "img/productos/base-natural/2.jpg", "img/productos/base-natural/3.jpg"],
    specs: {
      "Contenido": "30 ml",
      "Tipo de piel": "Normal y mixta",
      "Acabado": "Natural",
      "Fórmula cosmética": "Líquida",
      "Ingredientes": "Base acuosa, glicerina y pigmentos cosméticos",
      "Modo de uso": "Aplicar una pequeña cantidad y difuminar sobre el rostro",
      "Cuidados": "Cerrar después de usar y conservar en un lugar fresco",
      "Beneficios": "Cobertura uniforme y acabado natural"
    },
    tones: [
      { name: "Claro", available: true },
      { name: "Medio", available: true },
      { name: "Beige", available: true },
      { name: "Miel", available: false }
    ]
  },
  {
    id: "polvo-compacto",
    name: "Polvo Compacto",
    type: "Polvo",
    color: "beige",
    formula: "Polvo",
    skin: "Mixta",
    tone: "Beige",
    price: 38000,
    stock: 6,
    category: "Maquillaje",
    description: "Polvo compacto de textura fina para complementar el maquillaje con un acabado uniforme.",
    images: ["img/productos/polvo-compacto/1.jpg", "img/productos/polvo-compacto/2.jpg", "img/productos/polvo-compacto/3.jpg"],
    specs: {
      "Contenido": "10 g",
      "Tipo de piel": "Mixta y grasa",
      "Acabado": "Suave",
      "Fórmula cosmética": "Polvo",
      "Ingredientes": "Polvos minerales y pigmentos cosméticos",
      "Modo de uso": "Aplicar con brocha o esponja sobre el rostro",
      "Cuidados": "Mantener cerrado y protegido de la humedad",
      "Beneficios": "Ayuda a uniformar la apariencia del rostro"
    },
    tones: [
      { name: "Claro", available: true },
      { name: "Beige", available: true },
      { name: "Medio", available: false }
    ]
  },
  {
    id: "paleta-sombras",
    name: "Paleta de Sombras",
    type: "Sombras",
    color: "medio",
    formula: "Polvo",
    skin: "Normal",
    tone: "Medio",
    price: 62000,
    stock: 5,
    category: "Maquillaje",
    description: "Paleta de sombras en tonos neutros para crear diferentes combinaciones de maquillaje de ojos.",
    images: ["img/productos/sombras/1.jpg", "img/productos/sombras/2.jpg", "img/productos/sombras/3.jpg"],
    specs: {
      "Contenido": "9 tonos",
      "Tipo de piel": "Todo tipo de piel",
      "Acabado": "Mate y satinado",
      "Fórmula cosmética": "Polvo",
      "Ingredientes": "Pigmentos y componentes cosméticos",
      "Modo de uso": "Aplicar sobre los párpados con brocha o aplicador",
      "Cuidados": "Mantener la paleta cerrada y seca",
      "Beneficios": "Variedad de tonos para diferentes looks"
    },
    tones: [
      { name: "Claro", available: true },
      { name: "Medio", available: true },
      { name: "Oscuro", available: true }
    ]
  },
  {
    id: "mascara-pestanas",
    name: "Máscara de Pestañas",
    type: "Máscara",
    color: "profundo",
    formula: "Crema",
    skin: "Normal",
    tone: "Oscuro",
    price: 42000,
    stock: 7,
    category: "Maquillaje",
    description: "Máscara de pestañas de tono intenso para aportar definición y volumen a la mirada.",
    images: ["img/productos/mascara/1.jpg", "img/productos/mascara/2.jpg", "img/productos/mascara/3.jpg"],
    specs: {
      "Contenido": "10 ml",
      "Tipo de piel": "Todo tipo de piel",
      "Acabado": "Definido",
      "Fórmula cosmética": "Crema",
      "Ingredientes": "Pigmentos y componentes cosméticos",
      "Modo de uso": "Aplicar desde la raíz hacia las puntas de las pestañas",
      "Cuidados": "Cerrar bien después de cada uso",
      "Beneficios": "Definición y volumen visual"
    },
    tones: [
      { name: "Oscuro", available: true },
      { name: "Marrón", available: false }
    ]
  },
  {
    id: "labial-cremoso",
    name: "Labial Cremoso",
    type: "Labial",
    color: "profundo",
    formula: "Crema",
    skin: "Normal",
    tone: "Oscuro",
    price: 35000,
    stock: 9,
    category: "Maquillaje",
    description: "Labial cremoso de color intenso y textura uniforme para los labios.",
    images: ["img/productos/labial/1.jpg", "img/productos/labial/2.jpg", "img/productos/labial/3.jpg"],
    specs: {
      "Contenido": "4 g",
      "Tipo de piel": "Todo tipo de piel",
      "Acabado": "Cremoso",
      "Fórmula cosmética": "Crema",
      "Ingredientes": "Ceras, aceites y pigmentos cosméticos",
      "Modo de uso": "Aplicar directamente sobre los labios",
      "Cuidados": "Mantener cerrado y protegido del calor",
      "Beneficios": "Color uniforme y textura cremosa"
    },
    tones: [
      { name: "Claro", available: true },
      { name: "Medio", available: true },
      { name: "Oscuro", available: true }
    ]
  },
  {
    id: "blush-liquido",
    name: "Blush Líquido",
    type: "Blush",
    color: "miel",
    formula: "Líquida",
    skin: "Seca",
    tone: "Miel",
    price: 39000,
    stock: 4,
    category: "Maquillaje",
    description: "Blush líquido de textura ligera para aportar color al rostro y facilitar la difuminación.",
    images: ["img/productos/blush/1.jpg", "img/productos/blush/2.jpg", "img/productos/blush/3.jpg"],
    specs: {
      "Contenido": "8 ml",
      "Tipo de piel": "Seca y normal",
      "Acabado": "Natural",
      "Fórmula cosmética": "Líquida",
      "Ingredientes": "Agua, emolientes y pigmentos cosméticos",
      "Modo de uso": "Aplicar una pequeña cantidad y difuminar sobre las mejillas",
      "Cuidados": "Cerrar después de usar",
      "Beneficios": "Color modulable y acabado natural"
    },
    tones: [
      { name: "Claro", available: true },
      { name: "Miel", available: true },
      { name: "Oscuro", available: false }
    ]
  }
];

/* =====================================================================
   ESTADO DE LA APLICACIÓN
   ===================================================================== */
const state = {
  category: "all",             // CU-01: categoría seleccionada.
  search: "",                  // CU-01: búsqueda.
  productType: [],
  color: [],
  formula: [],
  skin: [],
  tone: [],
  minPrice: "",
  maxPrice: "",
  compared: [],                 // CU-03: máximo 4 productos.
  detailProductId: null,
  detailTone: null,
  detailQuantity: 1,
  cart: []                      // CU-04: { productId, tone, quantity }.
};

/* Instancia de Bootstrap para el modal del CU-03. */
let comparisonModal;

/* =====================================================================
   UTILIDADES
   ===================================================================== */

/** CU general: formato monetario para Colombia. */
function money(value) {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0
  }).format(value);
}

/** CU-01: obtiene un producto por su identificador. */
function getProduct(productId) {
  return products.find(product => product.id === productId);
}

/** CU-01: devuelve los valores seleccionados de un grupo de filtros. */
function selectedValues(name) {
  return [...document.querySelectorAll(`input[name="${name}"]:checked`)]
    .map(input => input.value);
}

/** Representación visual de los tonos definidos en el catálogo. */
function toneClass(name) {
  const map = {
    "Claro": "claro",
    "Medio": "medio",
    "Beige": "beige",
    "Miel": "miel",
    "Oscuro": "oscuro",
    "Marrón": "marron"
  };
  return map[name] || "medio";
}

/** CU-02/CU-03: devuelve solamente tonos disponibles. */
function availableTones(product) {
  return product.tones.filter(tone => tone.available);
}

/** CU-02/CU-03: stock disponible considerando lo que ya está en el carrito. */
function getCartItem(productId, tone) {
  return state.cart.find(item => item.productId === productId && item.tone === tone);
}

/** CU-04: cantidad total de unidades del carrito para el indicador. */
function getCartUnits() {
  return state.cart.reduce((total, item) => total + item.quantity, 0);
}

/* =====================================================================
   NAVEGACIÓN PRINCIPAL
   ===================================================================== */

/**
 * Muestra una de las tres vistas principales del frontend.
 * CU-01 = catálogo, CU-02 = detalle, CU-04 = carrito.
 */
function showView(view) {
  document.getElementById("catalogView").classList.toggle("hidden", view !== "catalog");
  document.getElementById("detailView").classList.toggle("hidden", view !== "detail");
  document.getElementById("cartView").classList.toggle("hidden", view !== "cart");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

/** CU-01: selecciona una categoría del menú principal. */
function selectCategory(category) {
  state.category = category;
  document.querySelectorAll(".nav-link-custom").forEach(link => {
    link.classList.toggle("active", link.dataset.category === category);
  });
  renderCatalog();
}

/* =====================================================================
   CU-01 | BUSCAR Y FILTRAR PRODUCTOS
   ===================================================================== */

/** CU-01: sincroniza los controles visuales con el estado. */
function syncFilters() {
  state.search = document.getElementById("searchInput").value.trim();
  state.productType = selectedValues("productType");
  state.color = selectedValues("color");
  state.formula = selectedValues("formula");
  state.skin = selectedValues("skin");
  state.tone = selectedValues("tone");
  state.minPrice = document.getElementById("minPrice").value;
  state.maxPrice = document.getElementById("maxPrice").value;
  renderCatalog();
}

/**
 * CU-01 Base 1-4 / Branch 3.1:
 * Aplica simultáneamente categoría, búsqueda y todos los filtros.
 */
function getFilteredProducts() {
  return products.filter(product => {
    const categoryOk = state.category === "all" || product.category === state.category;
    const searchOk = !state.search || product.name.toLowerCase().includes(state.search.toLowerCase());
    const typeOk = !state.productType.length || state.productType.includes(product.type);
    const colorOk = !state.color.length || state.color.includes(product.color);
    const formulaOk = !state.formula.length || state.formula.includes(product.formula);
    const skinOk = !state.skin.length || state.skin.includes(product.skin);
    const toneOk = !state.tone.length || state.tone.includes(product.tone) || product.tones.some(t => state.tone.includes(t.name));
    const minOk = state.minPrice === "" || product.price >= Number(state.minPrice);
    const maxOk = state.maxPrice === "" || product.price <= Number(state.maxPrice);

    return categoryOk && searchOk && typeOk && colorOk && formulaOk && skinOk && toneOk && minOk && maxOk;
  });
}

/** CU-01: dibuja el listado y sus controles de comparación. */
function renderCatalog() {
  const result = getFilteredProducts();
  const grid = document.getElementById("productGrid");
  const empty = document.getElementById("emptyState");

  document.getElementById("resultCount").textContent = `${result.length} ${result.length === 1 ? "producto" : "productos"}`;
  document.getElementById("compareSelectionCount").textContent = `${state.compared.length} de 4`;

  grid.innerHTML = result.map(product => {
    const compared = state.compared.includes(product.id);
    return `
      <article class="product-card ${compared ? "is-compared" : ""}">
        <div class="product-photo" role="img" aria-label="Fotografía de ${product.name}">
          <img src="${product.images[0]}" alt="${product.name}" loading="lazy">
          <span class="product-photo-label">${product.type}</span>
        </div>
        <div class="compare-row">
          <label class="compare-check">
            <input type="checkbox" data-compare-id="${product.id}" ${compared ? "checked" : ""}>
            Comparar
          </label>
        </div>
        <div class="product-content">
          <p class="product-type">${product.type}</p>
          <h3>${product.name}</h3>
          <p class="price">${money(product.price)}</p>
          <div class="card-tones" aria-label="Tonos disponibles">
            <span class="card-tones-title">Tonos:</span>
            ${availableTones(product).map(t => `<span class="mini-tone" title="${t.name}"><i class="tone-dot tone-${toneClass(t.name)}" aria-hidden="true"></i><span>${t.name}</span></span>`).join("")}
          </div>
          <div class="card-actions">
            <button class="secondary-button" type="button" data-detail-id="${product.id}">Ver detalle</button>
            <button class="primary-button" type="button" data-list-cart-id="${product.id}">Agregar al carrito</button>
          </div>
        </div>
      </article>
    `;
  }).join("");

  empty.classList.toggle("hidden", result.length !== 0);
  grid.classList.toggle("hidden", result.length === 0);
  renderActiveFilters();
  updateCompareButton();

  grid.querySelectorAll("[data-compare-id]").forEach(input => {
    input.addEventListener("change", event => toggleComparison(event.target.dataset.compareId));
  });

  grid.querySelectorAll("[data-detail-id]").forEach(button => {
    button.addEventListener("click", event => openProductDetail(event.currentTarget.dataset.detailId));
  });

  grid.querySelectorAll("[data-list-cart-id]").forEach(button => {
    button.addEventListener("click", event => addListProductToCart(event.currentTarget.dataset.listCartId));
  });
}

/** CU-01: muestra visualmente filtros activos. */
function renderActiveFilters() {
  const values = [
    ...state.productType.map(v => `Tipo: ${v}`),
    ...state.color.map(v => `Color: ${v}`),
    ...state.formula.map(v => `Fórmula: ${v}`),
    ...state.skin.map(v => `Piel: ${v}`),
    ...state.tone.map(v => `Tono: ${v}`),
    ...(state.minPrice !== "" ? [`Desde: ${money(Number(state.minPrice))}`] : []),
    ...(state.maxPrice !== "" ? [`Hasta: ${money(Number(state.maxPrice))}`] : [])
  ];
  document.getElementById("activeFilters").innerHTML = values.map(value => `<span class="filter-chip">${value}</span>`).join("");
}

/** CU-01 Branch 3.2: elimina uno o todos los filtros activos. */
function removeFilter(type, value) {
  if (type === "minPrice") document.getElementById("minPrice").value = "";
  else if (type === "maxPrice") document.getElementById("maxPrice").value = "";
  else {
    const input = document.querySelector(`input[name="${type}"][value="${CSS.escape(value)}"]`);
    if (input) input.checked = false;
  }
  syncFilters();
}

/** CU-01: limpia todos los filtros y la búsqueda. */
function clearFilters() {
  document.querySelectorAll(".filter-group input").forEach(input => input.checked = false);
  document.getElementById("searchInput").value = "";
  document.getElementById("minPrice").value = "";
  document.getElementById("maxPrice").value = "";
  state.search = "";
  state.productType = [];
  state.color = [];
  state.formula = [];
  state.skin = [];
  state.tone = [];
  renderCatalog();
}

/* =====================================================================
   CU-03 | COMPARAR PRODUCTOS
   ===================================================================== */

/**
 * CU-03 Base 2-4 / Exception 3.2:
 * Añade o quita productos y bloquea el quinto producto.
 */
function toggleComparison(productId) {
  const index = state.compared.indexOf(productId);
  if (index >= 0) {
    state.compared.splice(index, 1);
  } else {
    if (state.compared.length >= 4) {
      showTemporaryMessage("comparisonLimit", "Límite máximo de 4 productos para comparar.");
      renderCatalog();
      return;
    }
    state.compared.push(productId);
  }
  renderCatalog();
}

/** CU-03 Branch 3.1: compara solo cuando existen 2-4 productos. */
function updateCompareButton() {
  const button = document.getElementById("openCompare");
  button.disabled = state.compared.length < 2;
  button.textContent = state.compared.length < 2 ? "Comparar" : `Comparar (${state.compared.length})`;
}

/** CU-03: abre el modal de comparación. */
function openComparison() {
  if (state.compared.length < 2 || state.compared.length > 4) return;
  renderComparison();
  comparisonModal.show();
}

/** CU-03 Base 6-8: crea la tabla comparativa y controles de carrito. */
function renderComparison() {
  const selected = state.compared.map(getProduct).filter(Boolean);
  const content = document.getElementById("comparisonContent");
  if (!selected.length) {
    content.innerHTML = "";
    return;
  }

  const rows = [
    ["Nombre", p => p.name],
    ["Precio", p => money(p.price)],
    ["Descripción", p => p.description],
    ["Contenido", p => p.specs["Contenido"] || "No especificado"],
    ["Tonos disponibles", p => availableTones(p).map(t => t.name).join(", ")],
    ["Disponibilidad", p => `${p.stock} unidades`],
    ["Tipo de piel", p => p.specs["Tipo de piel"] || p.skin],
    ["Acabados", p => p.specs["Acabado"] || "No especificado"],
    ["Fórmula cosmética", p => p.specs["Fórmula cosmética"] || p.formula],
    ["Beneficios", p => p.specs["Beneficios"] || "No especificado"]
  ];

  content.innerHTML = `
    <div class="comparison-scroll">
      <table class="comparison-table">
        <thead>
          <tr>
            <th>Característica</th>
            ${selected.map(p => `<th><button class="product-link" data-comparison-detail="${p.id}" type="button">${p.name}</button></th>`).join("")}
          </tr>
        </thead>
        <tbody>
          <tr><th>Foto</th>${selected.map(p => `<td><div class="comparison-photo"><img src="${p.images[0]}" alt="${p.name}" loading="lazy"></div></td>`).join("")}</tr>
          ${rows.map(([label, getter]) => `<tr><th>${label}</th>${selected.map(p => `<td>${getter(p)}</td>`).join("")}</tr>`).join("")}
          <tr>
            <th>Comprar</th>
            ${selected.map(p => comparisonPurchaseCell(p)).join("")}
          </tr>
        </tbody>
      </table>
    </div>
  `;

  content.querySelectorAll("[data-comparison-detail]").forEach(button => {
    button.addEventListener("click", () => {
      comparisonModal.hide();
      openProductDetail(button.dataset.comparisonDetail);
    });
  });

  content.querySelectorAll("input[data-comparison-tone]").forEach(input => {
    input.addEventListener("change", () => {
      const label = document.getElementById(`comparison-selected-tone-${input.dataset.comparisonTone}`);
      if (label) label.textContent = `Tono seleccionado: ${input.value}`;
    });
  });

  content.querySelectorAll("[data-comparison-add]").forEach(button => {
    button.addEventListener("click", () => {
      const product = getProduct(button.dataset.comparisonAdd);
      const tone = document.querySelector(`input[data-comparison-tone="${product.id}"]:checked`)?.value;
      const quantity = Number(document.querySelector(`input[data-comparison-qty="${product.id}"]`)?.value || 1);
      addProductToCart(product.id, tone, quantity, "comparison");
      renderComparison();
    });
  });
}

/** CU-03: genera selector de tono, cantidad y botón de carrito. */
function comparisonPurchaseCell(product) {
  const tones = availableTones(product);
  return `
    <div class="comparison-purchase">
      <fieldset class="comparison-tone-group" ${tones.length ? "" : "disabled"}>
        <legend>Tono${tones.length ? "" : " (no aplica)"}</legend>
        <div class="comparison-tone-options">
          ${tones.map((t, i) => `<label class="comparison-tone-option"><input type="radio" name="comparison-tone-${product.id}" data-comparison-tone="${product.id}" value="${t.name}" ${i === 0 ? "checked" : ""}><span class="tone-dot tone-${toneClass(t.name)}" aria-hidden="true"></span><span>${t.name}</span></label>`).join("")}
        </div>
        ${tones.length ? `<small id="comparison-selected-tone-${product.id}">Tono seleccionado: ${tones[0].name}</small>` : ""}
      </fieldset>
      <label>Cantidad
        <input data-comparison-qty="${product.id}" type="number" min="1" max="${product.stock}" value="1">
      </label>
      <small>Máximo disponible: ${product.stock}</small>
      <button class="primary-button" data-comparison-add="${product.id}" type="button">Agregar al carrito</button>
    </div>
  `;
}

/** CU-03: limpia la selección y deja el listado listo para una nueva comparación. */
function clearComparison() {
  state.compared = [];
  if (comparisonModal) comparisonModal.hide();
  renderCatalog();
}

/* =====================================================================
   CU-02 | CONSULTAR DETALLE DE PRODUCTO
   ===================================================================== */

/** CU-02 Base 1: muestra toda la información definida del producto. */
function openProductDetail(productId) {
  const product = getProduct(productId);
  if (!product) return;

  state.detailProductId = productId;
  state.detailQuantity = 1;
  state.detailTone = availableTones(product)[0]?.name || null;

  document.getElementById("detailCategory").textContent = product.category;
  document.getElementById("productTitle").textContent = product.name;
  document.getElementById("detailPrice").textContent = money(product.price);
  document.getElementById("detailDescription").textContent = product.description;
  document.getElementById("detailStock").textContent = `${product.stock} unidades disponibles`;
  document.getElementById("detailQuantity").textContent = "1";
  document.getElementById("detailStockMessage").classList.add("hidden");
  document.getElementById("detailConfirmation").classList.add("hidden");

  document.getElementById("productSpecs").innerHTML = Object.entries(product.specs)
    .map(([label, value]) => `<div><dt>${label}</dt><dd>${value}</dd></div>`).join("");

  document.getElementById("detailTones").innerHTML = product.tones.map(tone => `
    <label class="tone-option ${tone.available ? "" : "disabled"}" title="${tone.available ? `Seleccionar tono ${tone.name}` : `${tone.name} no disponible`}">
      <input type="radio" name="detailTone" value="${tone.name}" ${tone.name === state.detailTone ? "checked" : ""} ${tone.available ? "" : "disabled"}>
      <span class="tone-swatch-wrap">
        <i class="tone-dot tone-${toneClass(tone.name)}" aria-hidden="true"></i>
        <span class="tone-name">${tone.name}</span>
        ${tone.available ? "" : '<small>(no disponible)</small>'}
      </span>
    </label>
  `).join("");
  document.getElementById("selectedToneLabel").textContent = state.detailTone ? `Tono seleccionado: ${state.detailTone}` : "Selecciona un tono";

  const carousel = document.getElementById("mainProductImage");
  carousel.innerHTML = `
    <div id="productImageCarousel" class="carousel slide" data-bs-interval="false">
      <div class="carousel-inner">
        ${product.images.map((image, index) => `
          <div class="carousel-item ${index === 0 ? "active" : ""}">
            <img src="${image}" class="d-block w-100" alt="${product.name} - foto ${index + 1}">
          </div>
        `).join("")}
      </div>
      <button class="carousel-control-prev" type="button" data-bs-target="#productImageCarousel" data-bs-slide="prev" aria-label="Foto anterior">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      </button>
      <button class="carousel-control-next" type="button" data-bs-target="#productImageCarousel" data-bs-slide="next" aria-label="Foto siguiente">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
      </button>
    </div>`;
  document.getElementById("thumbnailRow").innerHTML = product.images.map((image, index) => `
    <button type="button" class="thumbnail ${index === 0 ? "active" : ""}" data-bs-target="#productImageCarousel" data-bs-slide-to="${index}" aria-label="Foto ${index + 1} de ${product.name}">
      <img src="${image}" alt="">
    </button>`).join("");

  document.querySelectorAll('input[name="detailTone"]').forEach(input => {
    input.addEventListener("change", () => {
      state.detailTone = input.value;
      document.getElementById("selectedToneLabel").textContent = `Tono seleccionado: ${state.detailTone}`;
      showDetailStockMessage("");
    });
  });

  showView("detail");
}

/** CU-02: actualiza el contador. */
function updateDetailQuantity() {
  document.getElementById("detailQuantity").textContent = state.detailQuantity;
}

/**
 * CU-02 Exception 4.1:
 * Impide superar el stock y muestra el stock restante/disponible.
 */
function increaseDetailQuantity() {
  const product = getProduct(state.detailProductId);
  if (!product) return;

  if (state.detailQuantity >= product.stock) {
    showDetailStockMessage(`Stock restante: ${product.stock} unidades.`);
    return;
  }

  state.detailQuantity += 1;
  updateDetailQuantity();
  showDetailStockMessage("");
}

/** CU-02: permite reducir hasta 1 en el detalle. */
function decreaseDetailQuantity() {
  if (state.detailQuantity > 1) state.detailQuantity -= 1;
  updateDetailQuantity();
  showDetailStockMessage("");
}

/** CU-02: mensaje de validación de stock. */
function showDetailStockMessage(message) {
  const element = document.getElementById("detailStockMessage");
  element.textContent = message;
  element.classList.toggle("hidden", !message);
}

/** CU-02 Base 5-6: agrega producto con tono y cantidad seleccionados. */
function addDetailToCart() {
  if (!state.detailProductId) return;
  addProductToCart(state.detailProductId, state.detailTone, state.detailQuantity, "detail");
}

/**
 * CU-01: desde el listado se puede agregar al carrito.
 * Como el caso de uso de carrito exige tono, se utiliza el primer tono disponible.
 * El usuario puede modificarlo después en el detalle/carrito.
 */
function addListProductToCart(productId) {
  const product = getProduct(productId);
  const tone = availableTones(product)[0]?.name || null;
  addProductToCart(productId, tone, 1, "list");
}

/* =====================================================================
   CU-04 | GESTIONAR CARRITO DE COMPRAS
   ===================================================================== */

/**
 * CU-04 Base 1-4 / CU-02/CU-03: agrega o acumula un producto.
 * Validación de stock incluida.
 */
function addProductToCart(productId, tone, quantity, source) {
  const product = getProduct(productId);
  if (!product) return;

  const safeQuantity = Math.max(1, Number(quantity) || 1);
  const existing = tone ? getCartItem(productId, tone) : null;
  const current = existing ? existing.quantity : 0;

  if (current + safeQuantity > product.stock) {
    const maxAvailable = product.stock - current;
    showTemporaryMessage("global", `Cantidad máxima disponible: ${Math.max(0, maxAvailable)} unidades.`);
    return;
  }

  if (existing) {
    existing.quantity += safeQuantity;
  } else {
    state.cart.push({ productId, tone, quantity: safeQuantity });
  }

  updateCartCount();
  showTemporaryMessage("global", `${product.name} fue agregado al carrito.`);

  if (source === "detail") {
    document.getElementById("detailConfirmation").textContent = `${product.name} agregado al carrito. Cantidad: ${safeQuantity}.`;
    document.getElementById("detailConfirmation").classList.remove("hidden");
  }
}

/** CU-04: abre la vista del carrito. */
function openCart() {
  renderCart();
  showView("cart");
}

/** CU-04: actualiza el indicador del ícono del carrito. */
function updateCartCount() {
  document.getElementById("cartCount").textContent = getCartUnits();
}

/**
 * CU-04 Base 2-4 / Branch 1.1-1.2 / Exception 1.3:
 * cambia cantidad, actualiza subtotal/total y elimina si llega a cero.
 */
function changeCartQuantity(index, delta) {
  const item = state.cart[index];
  if (!item) return;
  const product = getProduct(item.productId);
  const next = item.quantity + delta;

  if (next > product.stock) {
    showTemporaryMessage("cart", `Cantidad máxima disponible: ${product.stock} unidades.`);
    renderCart();
    return;
  }

  if (next <= 0) {
    state.cart.splice(index, 1);
  } else {
    item.quantity = next;
  }

  updateCartCount();
  renderCart();
}

/** CU-04 Base 3-4 / Branch 3.1: elimina un producto sin modificar los demás. */
function removeCartItem(index) {
  state.cart.splice(index, 1);
  updateCartCount();
  renderCart();
}

/** CU-04: calcula el subtotal de un elemento. */
function getItemSubtotal(item) {
  const product = getProduct(item.productId);
  return product.price * item.quantity;
}

/** CU-04: calcula el total general del carrito. */
function getCartTotal() {
  return state.cart.reduce((total, item) => total + getItemSubtotal(item), 0);
}

/** CU-04 Base 2-5 y Exception 4.1: renderiza carrito y estado vacío. */
function renderCart() {
  const container = document.getElementById("cartContent");

  if (state.cart.length === 0) {
    container.innerHTML = `
      <div class="empty-cart">
        <i class="bi bi-bag-x" aria-hidden="true"></i>
        <h2>Tu carrito está vacío</h2>
        <p>Agrega al menos un producto para continuar con el proceso de compra.</p>
        <button id="emptyCartContinue" class="secondary-button" type="button">Continuar comprando</button>
        <button class="primary-button" type="button" disabled>Continuar con la compra</button>
      </div>
    `;
    document.getElementById("emptyCartContinue").addEventListener("click", () => showView("catalog"));
    return;
  }

  container.innerHTML = `
    <div class="cart-layout">
      <div class="cart-items">
        ${state.cart.map((item, index) => {
          const product = getProduct(item.productId);
          return `
            <article class="cart-item">
              <div class="cart-product-image"><img src="${product.images[0]}" alt="${product.name}" loading="lazy"></div>
              <div class="cart-product-main">
                <p class="product-type">${product.type}</p>
                <h2>${product.name}</h2>
                <p>Tono seleccionado: <strong>${item.tone || "No aplica"}</strong></p>
                <p>Precio unitario: <strong>${money(product.price)}</strong></p>
                <div class="cart-quantity-row">
                  <span>Cantidad</span>
                  <div class="stepper">
                    <button type="button" data-cart-minus="${index}" aria-label="Disminuir cantidad">−</button>
                    <span>${item.quantity}</span>
                    <button type="button" data-cart-plus="${index}" aria-label="Aumentar cantidad">+</button>
                  </div>
                  <button class="delete-button" type="button" data-cart-remove="${index}" aria-label="Eliminar producto">
                    <i class="bi bi-trash3" aria-hidden="true"></i>
                  </button>
                </div>
                <p class="cart-subtotal">Subtotal: <strong>${money(getItemSubtotal(item))}</strong></p>
              </div>
            </article>
          `;
        }).join("")}
      </div>

      <aside class="cart-summary">
        <h2>Total general</h2>
        <p class="cart-total">${money(getCartTotal())}</p>
        <button id="continuePurchase" class="primary-button w-100" type="button">Continuar con la compra</button>
        <button id="continueShopping" class="secondary-button w-100" type="button">Continuar comprando</button>
        <p id="cartValidationMessage" class="validation-message hidden" role="status"></p>
      </aside>
    </div>
  `;

  container.querySelectorAll("[data-cart-minus]").forEach(button => button.addEventListener("click", () => changeCartQuantity(Number(button.dataset.cartMinus), -1)));
  container.querySelectorAll("[data-cart-plus]").forEach(button => button.addEventListener("click", () => changeCartQuantity(Number(button.dataset.cartPlus), 1)));
  container.querySelectorAll("[data-cart-remove]").forEach(button => button.addEventListener("click", () => removeCartItem(Number(button.dataset.cartRemove))));
  document.getElementById("continueShopping").addEventListener("click", () => showView("catalog"));
  document.getElementById("continuePurchase").addEventListener("click", () => {
    showTemporaryMessage("cart", "El carrito está listo para continuar con el proceso de compra.");
  });
}

/* =====================================================================
   MENSAJES DE VALIDACIÓN
   ===================================================================== */

/**
 * Mensaje temporal para validaciones del frontend.
 * No representa una funcionalidad adicional; comunica las excepciones
 * definidas en los casos de uso.
 */
function showTemporaryMessage(scope, message) {
  let target;
  if (scope === "cart") target = document.getElementById("cartValidationMessage");
  else if (scope === "global") target = createGlobalMessage();
  else if (scope === "comparisonLimit") target = createGlobalMessage();

  if (!target) return;
  target.textContent = message;
  target.classList.remove("hidden");
  window.clearTimeout(target._timer);
  target._timer = window.setTimeout(() => target.classList.add("hidden"), 3500);
}

/** Crea un aviso temporal reutilizable dentro del frontend. */
function createGlobalMessage() {
  let element = document.getElementById("globalMessage");
  if (!element) {
    element = document.createElement("div");
    element.id = "globalMessage";
    element.className = "global-message hidden";
    element.setAttribute("role", "status");
    document.body.appendChild(element);
  }
  return element;
}

/* =====================================================================
   EVENTOS
   ===================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  comparisonModal = new bootstrap.Modal(document.getElementById("comparisonModal"));

  /* CU-01: navegación por categoría. */
  document.querySelectorAll(".nav-link-custom").forEach(link => {
    link.addEventListener("click", event => {
      event.preventDefault();
      showView("catalog");
      selectCategory(link.dataset.category);
    });
  });

  /* CU-01: búsqueda y filtros. */
  document.getElementById("searchInput").addEventListener("input", syncFilters);
  document.querySelectorAll(".filter-group input").forEach(input => input.addEventListener("change", syncFilters));
  document.getElementById("minPrice").addEventListener("input", syncFilters);
  document.getElementById("maxPrice").addEventListener("input", syncFilters);
  document.getElementById("clearFilters").addEventListener("click", clearFilters);
  document.getElementById("emptyClear").addEventListener("click", clearFilters);

  /* CU-03: comparación. */
  document.getElementById("openCompare").addEventListener("click", openComparison);
  document.getElementById("clearComparison").addEventListener("click", clearComparison);

  /* CU-02: detalle. */
  document.getElementById("backToCatalog").addEventListener("click", () => showView("catalog"));
  document.getElementById("detailMinus").addEventListener("click", decreaseDetailQuantity);
  document.getElementById("detailPlus").addEventListener("click", increaseDetailQuantity);
  document.getElementById("detailAddCart").addEventListener("click", addDetailToCart);

  /* CU-04: carrito. */
  document.getElementById("cartButton").addEventListener("click", openCart);
  document.getElementById("logoLink").addEventListener("click", event => {
    event.preventDefault();
    showView("catalog");
    selectCategory("all");
  });

  /* Inicialización. */
  renderCatalog();
  updateCartCount();
});
