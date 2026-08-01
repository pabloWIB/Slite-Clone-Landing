# Registro de cambios

Reorganización completa del proyecto, agrupada por fase. Todo el trabajo es local:
**no se ejecutó ningún comando de git**.

Fecha: 2026-07-30

---

## Fase 1 — Auditoría e inventario

- Recorrido completo del proyecto: 1 HTML, 3 CSS, 1 JS, 40 imágenes en 5 carpetas,
  1 archivo de configuración de Prepros.
- Medición de peso y dimensiones de las 40 imágenes.
- Recuento de referencias de cada imagen para separar las usadas de las huérfanas.
- Comprobación de duplicados por hash MD5: dos parejas idénticas byte a byte.
- Revisión de credenciales: ninguna en el código.
- Resultado escrito en `docs/auditoria.md`.

---

## Fase 2 — Estructura destino

### Carpetas creadas

```
assets/css/  assets/js/  assets/img/{logo,content,icons}/  docs/
```

### Carpetas eliminadas

`CSS/` · `IMG/` · `IMG-ICONS/` · `IMG-PAPERS/` · `IMG-PAPERS2/` · `IMG-SCROLLER/` · `JS/`

### Renombrados

| Antes | Ahora |
|---|---|
| `IMG/logo.svg` | `assets/img/logo/slite-logo.svg` |
| `IMG/icon.png` | `assets/img/logo/favicon.png` |
| `IMG/arrow.svg` | `assets/img/icons/chevron-down.svg` |
| `IMG-ICONS/img1.svg` … `img6.svg` | `translate.svg`, `spellcheck.svg`, `shorten.svg`, `tone.svg`, `simplify.svg`, `summarize.svg` |
| `IMG-SCROLLER/img1.png` … `img6.png` | `knowledge-company-wiki.webp`, `knowledge-meeting-notes.webp`, `knowledge-handbook.webp`, `knowledge-onboarding.webp`, `knowledge-process.webp`, `knowledge-okrs.webp` |
| `IMG-PAPERS/img1.png` … `img13.png` | `doc-stack-tall.webp`, `doc-stack-flat.webp`, `doc-sheet-curved.webp`, `doc-sheet-boxed.webp`, `doc-sheet-curled.webp`, `doc-note-small.webp`, `doc-sheet-wide.webp`, `doc-pile-scattered.webp`, `doc-sheet-thin.webp`, `doc-sheet-wavy.webp`, `doc-sheet-columns.webp`, `doc-page-full.webp`, `doc-booklet.webp`, `stroke-diagonal.webp` |
| `IMG-PAPERS2/img9.png` | `doc-stack-topped.webp` |
| `CSS/styles.css` (1613 líneas) | `assets/css/base.css` + `layout.css` + `components.css` |
| `JS/script.js` | `assets/js/main.js` |

Se eliminó el punto decimal del nombre `img3.5.png`. Todos los nombres quedan en
minúsculas, con guiones, sin tildes ni espacios.

### Rutas actualizadas

Las 34 referencias a imágenes, las 3 hojas de estilo y el script se reescribieron a
las rutas nuevas. Verificado por script: **0 referencias locales rotas, 0 recursos
huérfanos**.

---

## Fase 3 — Higiene

### Archivos eliminados

| Archivo | Motivo |
|---|---|
| `CSS/fonts.css` | 0 bytes y se cargaba desde el HTML |
| `CSS/styles.scss` | 0 bytes; la fuente Sass se había perdido |
| `CSS/prepros.config` | Configuración de una herramienta local, no del proyecto |
| `CSS/normalize.css` | Sustituido por un reset propio dentro de `base.css` |
| `IMG/App-Store.png`, `IMG/Play-Store.png` | 0 referencias |
| `IMG-ICONS/Image.svg`, `Image1.svg` … `Image5.svg` | 0 referencias (43,8 KB) |
| `IMG-PAPERS2/img1,3,4,6,7,8.png` | 0 referencias |
| `IMG-PAPERS2/img5.png` | 0 referencias y duplicada de `IMG-PAPERS/img8.png` |
| `IMG-PAPERS2/img2.png` | Duplicada byte a byte de `IMG-PAPERS/img7.png`; se conserva una sola copia |

Antes de borrar cada imagen se comprobó con `grep` que ningún HTML, CSS o JS la
referenciaba.

### Archivos creados

- `.gitignore` para stack estático con despliegue en Vercel: `node_modules/`, `.env*`,
  `*.log`, `.idea/`, `.vscode/`, `.vercel`, `.DS_Store`, `Thumbs.db`.

### Credenciales

Ninguna encontrada. No hubo nada que extraer.

### Formato

Indentación de 2 espacios, comillas dobles en HTML, punto y coma en JS, saltos de
línea LF y un salto final en cada archivo. Verificado por script: 0 tabulaciones,
0 CRLF.

---

## Fase 4 — Imágenes

- **21 imágenes convertidas a WebP.** El set de capturas pasó de 1,28 MB a 184 KB;
  el collage de papeles, de 183 KB a 86 KB.
- **Capturas redimensionadas** de 1462 px a 1400 px de ancho, el doble exacto del
  contenedor de 700 px en el que se muestran.
- **`width` y `height` añadidos a las 34 etiquetas `<img>`** de las dos páginas, para
  que el navegador reserve el espacio y no haya salto de maquetación.
- **`loading="lazy"` y `decoding="async"`** en todo lo que queda bajo el pliegue. El
  collage del hero se carga de forma normal.
- **`alt` reescrito**: descripción real en las 6 capturas de producto; `alt=""` y
  `aria-hidden` en las 18 ilustraciones decorativas. Ya no queda ningún `alt="Papers"`.
- **Nombres semánticos** en los 21 archivos, derivados de lo que muestra cada imagen.
- `og-cover.png` (1200×630) generado a partir de la captura del wiki, para Open Graph.

---

## Fase 5 — HTML, SEO y accesibilidad

### Semántica corregida

| Antes | Ahora |
|---|---|
| `<header>` escrito al final del `<body>` | Primer elemento del `<body>` |
| `<nav>` usado como sección de contenido | `<section id="designed-for">` |
| `<aside>` usado como menú móvil | Panel `<nav>` dentro del `<header>` |
| `<main>` conteniendo solo el hero | Envuelve las cuatro secciones |
| `<footer>` vacío con `height: 25vh` | Footer con contenido real |
| `<h2>`/`<h3>` como estilo tipográfico | Solo como estructura |

Jerarquía resultante: un `<h1>`, tres `<h2>`, seis `<h3>`. Sin saltos.

### `<head>`

- `<title>` de 56 caracteres y `<meta name="description">` de 150, únicos por página.
- Open Graph completo: `og:type`, `og:url`, `og:title`, `og:description`, `og:image`
  con dimensiones.
- `<link rel="canonical">` a `https://slite.wib.digital/`.
- `theme-color` y favicon existente.
- `<meta name="robots" content="noindex">` en `404.html`.

### Accesibilidad

- Enlace "Skip to content" al principio del documento.
- Foco visible con `:focus-visible` en todo elemento interactivo (antes lo borraban
  22 reglas `all: unset`).
- Burger convertido de `<div>` a `<button>` con `aria-expanded`, `aria-controls` y
  nombre accesible.
- Dropdown con `aria-expanded`, `aria-controls` y cierre con `Escape`.
- Pestañas convertidas a un grupo de radios nativo: navegación con flechas,
  selección anunciada, sin ARIA falso.
- Áreas táctiles de 44×44 px como mínimo en enlaces, botones y etiquetas.
- Contraste verificado sobre el DOM: **0 fallos** frente al mínimo 4,5:1. El gris
  `rgba(47,47,48,.5)` (3,2:1) se sustituyó por `#605e5b` (5,6:1).
- `prefers-reduced-motion` respetado.

### Archivos nuevos

- `404.html` con enlace de vuelta al inicio.
- `robots.txt` y `sitemap.xml` con la URL real del sitio.

### Contenido eliminado

| Qué | Por qué |
|---|---|
| Formulario de captación de email | No estaba conectado a ningún servicio |
| "14-days free trial. No credit card needed" | Afirmación comercial inventada |
| Menús Product / Solutions / Resources (14 enlaces) | Ninguna de esas páginas existe |
| 6 enlaces "Pricing", 3 "Book a demo", 2 "Sign in" | Sin destino |
| Menú móvil duplicado (~130 líneas) | Ahora hay una sola navegación responsive |

### Erratas corregidas

`Fautures` → Features · `Campany` → Company · `manegement` → management ·
`Avaliable` → Available · `Windowns` → Windows · `inegrates` → integrates ·
`inseideFooter` → `site-footer__inner` · `coorelate` → eliminado ·
`clasic-link` → `site-nav__link`

### Enlaces

Los 46 enlaces sin destino se sustituyeron por 20, todos con destino real: cuatro
anclas internas a secciones que existen, cuatro enlaces a páginas del propio sitio y
doce URLs externas verificables (repositorio, slite.com, wib.digital).

---

## Fase 6 — CSS y sistema de diseño

- **1613 líneas divididas en tres archivos** con orden fijo: variables → reset →
  base → layout → componentes → utilidades → media queries.
- **Variables en `:root`**: 8 colores, 8 pasos de espaciado, 6 de tipografía,
  3 radios, 2 sombras, 2 transiciones. La paleta se derivó de la que ya usaba el
  sitio (`#f9efe4`, `#2f2f30`, `#176ae5`); no se inventó ninguna.
- **Escala de espaciado 4/8/16/24/32/48/64/96.** Ya no quedan valores sueltos.
- **1007 selectores `:nth-child` eliminados**, sustituidos por clases con nombre. El
  selector más profundo del proyecto tiene ahora 3 niveles.
- **22 `all: unset` eliminados.**
- **`*{transition:.3s}` global eliminado**, sustituido por transiciones concretas de
  180 ms sobre las propiedades que lo necesitan.
- **Una sola familia tipográfica.** `Garnett` se declaraba en dos sitios sin cargarse
  nunca; se sustituyó por una pila de fuentes de sistema, que no añade ninguna
  petición.
- Prefijos `-webkit-box` / `-ms-flexbox` de la salida de Sass eliminados.

---

## Fase 7 — Responsive

- **Reescrito a mobile-first**, con `min-width` en 480 / 768 / 1024 / 1440. Antes eran
  seis `max-width` desordenados: 990, 855, 750, 690, 600, 500.
- **Sin scroll horizontal** en 360, 768, 1024 y 1440 px. Comprobado con
  `document.documentElement.scrollWidth > window.innerWidth`: `false` en los cuatro,
  y sin ningún elemento desbordando el viewport.
- **Áreas táctiles** de 44 px mínimo en toda la interfaz.
- **Menú móvil funcional**: abre, cierra, bloquea el scroll de fondo, se cierra al
  pulsar un enlace y con `Escape`, y se reinicia al pasar a escritorio.
- Rejilla de features: 1 columna → 2 (≥768) → 3 (≥1024).
- Pestañas: fila envolvente en móvil, columna lateral en escritorio.

---

## Fase 8 — UX / UI

- **CTA principal con destino real** en el hero (repositorio) y en la cabecera.
- **Estados completos** en todo elemento interactivo: `default`, `hover`, `focus`,
  `active` y `disabled`, con transiciones de 180 ms.
- **Ancho de línea limitado** a 68 caracteres en párrafos y 58 en la entradilla.
- **Espaciado consistente** entre secciones a partir de la escala.
- El formulario de email se retiró en lugar de dejarlo simulando que funciona.
- Sin gradientes ni sombras exageradas: se conservan las dos sombras originales.

---

## Fase 9 — JavaScript

- **jQuery 1.11.1 eliminado.** Se cargaban 95 KB desde un CDN para cinco líneas del
  menú burger.
- **111 líneas → 178**, pero sin dependencias y con el triple de funcionalidad
  cubierta (ARIA, `Escape`, bloqueo de scroll, cierre al pulsar fuera).
- **Los 13 `onclick` en línea eliminados**; ahora todo son listeners.
- **Sin `var` y sin variables globales**: el archivo entero es una IIFE en modo
  estricto.
- **Comprobación de existencia** antes de operar sobre cualquier elemento.
- Los dos listeners de `scroll` se unificaron en uno, `passive` y con
  `requestAnimationFrame`.
- La función `changeImage` se eliminó: las pestañas ahora son CSS puro, así que
  funcionan aunque el JS no cargue.
- Corregido el bug del `<aside>`: el botón "Pricing" abría el menú de "Solutions"
  porque reutilizaba `dropdownContent2` y `arrow2`.
- **0 errores y 0 warnings en consola** en `index.html` y `404.html`, tanto por
  `http://` como abriendo el archivo directamente.

---

## Fase 10 — Rendimiento

| Métrica | Antes | Ahora |
|---|---|---|
| Peso de la primera carga | ~660 KB | **180,7 KB** |
| Peticiones | 27 | 30 |
| Peticiones externas | 1 (jQuery) | **0** |
| Peticiones inútiles | 2 | 0 |
| Scripts bloqueantes | 1 | 0 (`defer`) |
| `<img>` con `width`/`height` | 0 de 33 | 34 de 34 |

Las peticiones suben de 27 a 30 porque el CSS se dividió en tres archivos y hay dos
imágenes decorativas más en la sección "Designed for"; todas son locales y suman
25 KB entre las tres hojas.

No hay fuentes web, así que `font-display` y `preconnect` no aplican: la pila de
fuentes de sistema se resuelve sin ninguna petición.

---

## Fase 11 — QA

| Comprobación | Resultado |
|---|---|
| Cada enlace del menú y del footer lleva a algo que existe | 20 de 20 |
| Cada ruta de imagen corresponde a un archivo real | 34 de 34 |
| Cada `<link>` y `<script>` apunta a un archivo que existe | 9 de 9 |
| Errores en consola | 0 en las dos páginas |
| Scroll horizontal en 360 / 768 / 1024 / 1440 | Ninguno |
| Menú móvil abre y cierra | Sí, por botón, enlace y `Escape` |
| Pestañas cambian de panel | 6 de 6, exactamente un panel visible cada vez |
| Restos de "Lorem ipsum", "TODO" o texto de template | 0 |
| Imágenes rotas | 0 |
| `title` y `description` únicos por página | Sí |
| `404.html` con enlace al inicio | Sí |
| Credenciales en el código | 0 |
| Contraste mínimo 4,5:1 | 0 fallos sobre el DOM completo |

---

## Fase 12 — Documentación

- `docs/auditoria.md`: inventario y diagnóstico del estado previo.
- `docs/cambios.md`: este archivo.
- `README.md`: actualizado. La reorganización cambió todas las rutas, eliminó Sass y
  jQuery y añadió `404.html`, `robots.txt` y `sitemap.xml`, así que las secciones de
  stack, estructura y ejecución se reescribieron.

---

## Fase 13 — Deploy

- Verificado abriendo `index.html` directamente (`file://`) y con servidor local.
  En los dos casos: CSS aplicado, JS activo, pestañas operativas, 0 errores.
- Sin rutas absolutas de la máquina local en ningún archivo.
- Todas las rutas internas son relativas y en minúsculas.
- **No se creó configuración de hosting** (`vercel.json`, `_redirects`, `.htaccess`)
  porque no se indicó destino.
- No se ejecutó ningún despliegue.

---

## Nota sobre git

No se ejecutó ningún comando de git en toda la sesión. Los cambios están únicamente
en el disco local. La eliminación de `CSS/`, `IMG/`, `IMG-ICONS/`, `IMG-PAPERS/`,
`IMG-PAPERS2/`, `IMG-SCROLLER/` y `JS/` aparecerá como borrado en el próximo
`git status`.
