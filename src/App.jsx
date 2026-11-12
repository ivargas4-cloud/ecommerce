import { useEffect } from 'react';

/**
 * Puente de compatibilidad de la migración.
 * Conserva los mismos puntos de montaje que utiliza el app.js original.
 * El JavaScript existente sigue controlando las reglas y eventos de la tienda;
 * React monta la estructura base y Vite gestiona el proyecto. Así evitamos
 * reescribir de golpe la lógica de catálogo, filtros, comparación, carrito,
 * compra simulada y administración.
 */
/**
 * Componente raíz de compatibilidad. No reimplementa la lógica de negocio:
 * monta los nodos con IDs que espera public/app.js y carga los recursos legacy.
 * Mantener esos IDs es obligatorio mientras exista el motor JavaScript original.
 */
export default function App() {
  useEffect(() => {
    // Cargar el CSS original después de Bootstrap para preservar el diseño actual.
    const existingCss = document.querySelector('link[data-jdi-legacy-css]');
    if (!existingCss) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = '/styles.css';
      link.dataset.jdiLegacyCss = 'true';
      document.head.appendChild(link);
    }

    // Evita instalar dos veces los listeners de app.js durante el ciclo de vida.
    if (!document.querySelector('script[data-jdi-legacy-app]')) {
      const script = document.createElement('script');
      script.src = '/app.js';
      script.dataset.jdiLegacyApp = 'true';
      script.async = false;
      document.body.appendChild(script);
    }
  }, []);

  return (
    <>
      {/* Los IDs son parte del contrato con app.js: no cambiarlos. */}
      <div id="topbar" className="topbar">Belleza que resalta tu esencia</div>
      <header id="header" className="header" />
      <main id="app" />
      <footer id="jdi-footer" className="jdi-footer">
        <div className="jdi-footer-brand">
          <strong>JDI BEAUTY</strong>
          <span>Belleza que resalta tu esencia</span>
        </div>
        <div className="jdi-footer-copy">
          <strong>© 2026 JDI Beauty. Todos los derechos reservados.</strong>
          <p>El contenido, diseño, textos, elementos gráficos y código original de este sitio están protegidos por las normas aplicables de propiedad intelectual.</p>
          <a href="#/derechos">Aviso legal</a><span> · </span><a href="#/derechos">Derechos de autor</a><span> · </span><a href="#/derechos">Política de privacidad</a>
        </div>
      </footer>
      <div id="cmpbar" className="cmpbar" hidden />
      <div id="modal" className="modal" hidden />
      <div id="toast" className="toast" hidden />
    </>
  );
}
