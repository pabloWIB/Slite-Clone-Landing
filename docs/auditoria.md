# Auditoría — Slite Clone Landing

Estado del proyecto **antes** de la reorganización. Documento de trabajo interno.

Fecha de auditoría: 2026-07-30

---

## 1. Resumen del proyecto

Landing page de una sola vista que reproduce la página de marketing de Slite (producto de
base de conocimiento). Sitio estático: un `index.html`, tres hojas CSS, un script y cinco
carpetas de imágenes. Sin build, sin `package.json`, sin dependencias npm.

---

## 2. Archivos HTML

| Archivo | `<title>` | `<h1>` | Propósito real | Estado |
|---|---|---|---|---|
| `index.html` | `Slite` | `Your company knowledge base, on autopilot.` | Landing única: hero + índice numerado + tabs de contenido + bloque de features de IA | 597 líneas, sin `<meta description>`, sin Open Graph, sin canonical |

No existía `404.html`.

---

## 3. Archivos CSS

| Archivo | Líneas | ¿Se carga? | Observaciones |
|---|---|---|---|
| `CSS/normalize.css` | 8 | Sí | Normalize minificado en 1 línea + `*{transition:.3s}` global |
| `CSS/styles.css` | 1613 | Sí | Salida compilada de Sass. 1007 apariciones de `:nth-child`, 22 `all: unset` |
| `CSS/fonts.css` | 0 | Sí | **Archivo vacío**. Petición HTTP que no devuelve nada |
| `CSS/styles.scss` | 0 | No | **Archivo vacío**. La fuente Sass del CSS compilado se perdió |
| `CSS/prepros.config` | — | No | Configuración de Prepros (herramienta de compilación local) |

**Consecuencia crítica:** `styles.scss` está vacío, así que el único CSS mantenible era el
compilado, con selectores de hasta 8 niveles de `:nth-child` encadenados. Cualquier cambio
de orden en el HTML rompía el diseño en silencio.

### Tipografía declarada sin cargar

`styles.css` declara `font-family: Garnett, sans-serif` en dos sitios. Garnett es una fuente
comercial que **no está en el proyecto**: no hay `@font-face`, no hay carpeta de fuentes,
`fonts.css` está vacío. El sitio siempre renderizó con el `sans-serif` del sistema.

---

## 4. Archivos JS

| Archivo | Líneas | ¿Se carga? | Contenido |
|---|---|---|---|
| `JS/script.js` | 111 | Sí | 4 bloques: scroll del header, scroll del main, dropdowns, burger, cambio de imagen |

### Dependencias externas

| Dependencia | Origen | Uso real |
|---|---|---|
| jQuery 1.11.1 | `cdnjs.cloudflare.com` | **Solo el menú burger**: un `click` y cuatro `toggleClass` |

jQuery 1.11.1 es de 2014. Se cargaban ~95 KB para cinco líneas que `classList.toggle` resuelve.

---

## 5. Imágenes

### Carpeta `IMG/`

| Archivo | Dimensiones | Peso | Referencias |
|---|---|---|---|
| `logo.svg` | 61×24 | 3,8 KB | 2 |
| `arrow.svg` | 13×12 | 520 B | 6 |
| `icon.png` | 32×32 | 923 B | 1 (favicon) |
| `App-Store.png` | 135×41 | 2,9 KB | **0 — huérfana** |
| `Play-Store.png` | 120×41 | 2,6 KB | **0 — huérfana** |

### Carpeta `IMG-ICONS/`

| Archivo | Peso | Referencias |
|---|---|---|
| `img1.svg` … `img6.svg` | 772 B – 2,4 KB | 1 cada uno |
| `Image.svg`, `Image1.svg` … `Image5.svg` | 6,4 – 9,5 KB | **0 — 6 huérfanas, 43,8 KB** |

### Carpeta `IMG-PAPERS/` (collage del hero)

| Archivo | Dimensiones | Peso | Referencias |
|---|---|---|---|
| `img1.png` | 200×256 | 37,6 KB | 1 |
| `img2.png` | 161×87 | 12,3 KB | 1 |
| `img3.png` | 141×62 | 7,7 KB | 1 |
| `img3.5.png` | 120×86 | 6,7 KB | 1 (nombre con punto decimal) |
| `img4.png` | 121×100 | 5,3 KB | 1 |
| `img5.png` | 76×77 | 2,9 KB | 1 |
| `img6.png` | 69×53 | 3,1 KB | 1 |
| `img7.png` | 242×114 | 25,6 KB | 1 |
| `img8.png` | 78×46 | 3,0 KB | 1 |
| `img9.png` | 87×69 | 4,1 KB | 1 |
| `img10.png` | 129×111 | 7,3 KB | 1 |
| `img11.png` | 144×129 | 12,0 KB | 1 |
| `img12.png` | 244×324 | 44,6 KB | 1 |
| `img13.png` | 219×371 | 10,6 KB | **2 — la misma imagen colocada dos veces** |

### Carpeta `IMG-PAPERS2/`

| Archivo | Dimensiones | Peso | Referencias |
|---|---|---|---|
| `img2.png` | 242×114 | 25,6 KB | 1 — **byte a byte igual a `IMG-PAPERS/img7.png`** |
| `img9.png` | 378×370 | 81,4 KB | 2 |
| `img1.png` | 74×76 | 10,7 KB | **0 — huérfana** |
| `img3.png` | 105×104 | 11,0 KB | **0 — huérfana** |
| `img4.png` | 139×157 | 14,5 KB | **0 — huérfana** |
| `img5.png` | 78×46 | 3,0 KB | **0 — huérfana y duplicada de `IMG-PAPERS/img8.png`** |
| `img6.png` | 154×103 | 15,3 KB | **0 — huérfana** |
| `img7.png` | 279×257 | 16,7 KB | **0 — huérfana** |
| `img8.png` | 257×224 | 29,1 KB | **0 — huérfana** |

### Carpeta `IMG-SCROLLER/` (capturas del producto)

| Archivo | Dimensiones | Peso | Referencias |
|---|---|---|---|
| `img1.png` | 1462×884 | **248,1 KB** | 2 |
| `img2.png` | 1462×884 | 186,0 KB | 1 |
| `img3.png` | 1462×884 | 193,0 KB | 1 |
| `img4.png` | 1462×882 | 156,7 KB | 1 |
| `img5.png` | 1462×882 | 187,1 KB | 1 |
| `img6.png` | 1462×876 | **309,9 KB** | 1 |

**Total del set:** 1,28 MB en PNG. Ninguna imagen del proyecto llevaba `width`, `height`
ni `loading`, así que todas provocaban layout shift.

---

## 6. Enlaces y referencias rotas

| Problema | Cantidad | Detalle |
|---|---|---|
| `href=""` | 18 | Recarga la página en lugar de navegar |
| `href="#"` | 28 | Salta al inicio; ninguno tiene destino real |
| CSS referenciado y vacío | 1 | `CSS/fonts.css` (0 bytes) |
| Imágenes rotas | 0 | Todas las rutas `src` existían en disco |
| IDs duplicados | 1 par | `id="#"` aparece dos veces (líneas 151-152) |
| ID inválido | 1 | `id="#header"` — un `#` no puede abrir un identificador |

**Total: 46 enlaces sin destino real de 46 enlaces del documento.** Ni uno solo navegaba
a ninguna parte.

---

## 7. HTML duplicado

| Bloque | Dónde | Tamaño |
|---|---|---|
| Menú completo (Product / Solutions / Pricing / Resources) | Duplicado literal entre `<aside id="header2">` y `<header id="header">` | ~130 líneas |
| Enlace "Book a demo" | 3 veces | — |
| Enlace "Pricing" | 6 veces, cinco de ellas seguidas en el mismo contenedor | — |

Los cinco `<a href="">Pricing</a>` consecutivos del `<aside>` son relleno: el menú móvil
se copió del de escritorio y no se terminó de rellenar.

---

## 8. Semántica incorrecta

| Etiqueta | Uso real en el proyecto | Debería ser |
|---|---|---|
| `<main>` | Solo el hero | Envolver todo el contenido de la página |
| `<nav>` | Sección de contenido "Designed for" con 3 titulares | `<section>` |
| `<aside>` | Menú móvil desplegable | Panel dentro de `<header>` |
| `<header>` | Cabecera del sitio, **colocada al final del `<body>`** | Primer elemento del `<body>` |
| `<footer>` | `<div>` vacío con `height: 25vh` | Contenido real o eliminarlo |
| `<h2>` | Dentro de los botones del menú ("Product", "Solutions") | Texto de botón, no encabezado |
| `<h3>` | Dentro de cada enlace del dropdown | Texto de enlace, no encabezado |

La jerarquía de encabezados resultante era `h1 → h3 → h2 → h2 → h3 → h3…`, con `h2` y `h3`
usados como estilo tipográfico y no como estructura.

---

## 9. Accesibilidad

| Problema | Detalle |
|---|---|
| Contraste | `rgba(47,47,48,.5)` sobre `#F9EFE4` ≈ 3,2:1 — por debajo del mínimo 4,5:1 |
| Formulario | El `<input type="email">` no tenía `<label>` asociado, solo `placeholder` |
| Foco | `all: unset` en 22 reglas elimina el `outline` de botones y enlaces |
| Botón burger | `<div>` sin `role`, sin `aria-label`, sin `aria-expanded`, no alcanzable con teclado |
| Dropdowns | Sin `aria-expanded`, sin `aria-controls`, no se cierran con `Escape` |
| Tabs | `role="tab"` suelto, sin `tablist`, sin `tabpanel`, sin `aria-selected` |
| `alt` | 15 imágenes decorativas con `alt="Papers"`; una con `alt="Main Image"` |
| Áreas táctiles | Enlaces del menú de ~19 px de alto, por debajo de los 44 px |

---

## 10. Contenido de relleno y erratas del template

| Texto | Dónde | Correcto |
|---|---|---|
| `Fautures` | 2 dropdowns | Features |
| `Campany wiki` | Primer tab | Company wiki |
| `Knowledge manegement at scale` | Índice numerado | management |
| `Knowledge manegement for startups` | 2 dropdowns | management |
| `Avaliable on Mac, Windowns, iOS, and Android` | 2 dropdowns | Available / Windows |
| `See how Slite inegrates with your existing tools` | 2 dropdowns | integrates |
| `14-days free trial. No credit card needed` | Bajo el formulario | Afirmación comercial inventada, sin producto detrás |
| `class="inseideFooter"` | Footer | inside |
| `class="coorelate-fixed-height"` | Hero | correlate |
| `class="clasic-link"` | Header (×6) | classic |

No había Lorem ipsum, pero sí una sección completa (el footer) reservada y vacía.

---

## 11. JavaScript — problemas detectados

| Línea | Problema |
|---|---|
| 8, 27, 42, 45, 46, 68 | `var` en lugar de `const`/`let` |
| 42 | `currentDropdown` como variable global suelta |
| 84-92 | jQuery cargado desde CDN únicamente para este bloque de 5 líneas |
| 104 | `event.currentTarget` usando el `window.event` implícito, no un parámetro |
| 3-4, 24 | `getElementById` sin comprobar que el elemento existe |
| 50, 70 | `previousElementSibling.querySelector('img')` sin comprobar el resultado — lanza `TypeError` si un dropdown no lleva flecha |
| 18, 35 | Dos listeners de `scroll` separados, sin `passive`, sin `requestAnimationFrame` |

Además, el HTML tenía **13 atributos `onclick` en línea**.

### Bug reproducible

En `<aside>`, el botón "Pricing" llamaba a `toggleDropdown('dropdownContent2', 'arrow2')`
— los mismos identificadores que el botón "Solutions". Pulsar "Pricing" abría el menú de
"Solutions" y giraba su flecha.

---

## 12. Rendimiento

| Métrica | Valor previo |
|---|---|
| Peso de la primera carga | ~660 KB (jQuery 95 KB + `IMG-SCROLLER/img1.png` 248 KB + collage 183 KB + iconos + CSS) |
| Peticiones HTTP | 27 (3 CSS + 1 JS externo + 1 JS local + 22 imágenes únicas de 33 etiquetas) |
| Peticiones inútiles | 2 (`fonts.css` vacío + jQuery) |
| Scripts bloqueantes | 1 (jQuery en `<head>`, sin `defer`) |
| `width`/`height` en `<img>` | 0 de 33 etiquetas |
| `loading="lazy"` | 0 de 33 etiquetas |
| `*{transition:.3s}` | Transición global aplicada a cada elemento y cada propiedad |

---

## 13. Archivos basura y de configuración

| Archivo | Motivo |
|---|---|
| `CSS/fonts.css` | 0 bytes, se cargaba desde el HTML |
| `CSS/styles.scss` | 0 bytes, fuente Sass perdida |
| `CSS/prepros.config` | Configuración de una herramienta local, no del proyecto |

No había `.bak`, `node_modules`, `.DS_Store` ni `Thumbs.db`.

---

## 14. Seguridad

Revisado `index.html`, `styles.css`, `normalize.css` y `script.js`: **no hay credenciales,
tokens, claves de API ni endpoints privados**. El proyecto no hace ninguna llamada de red
más allá del CDN de jQuery.

---

## 15. Lo más grave

1. **`styles.scss` y `fonts.css` vacíos.** La fuente del CSS se perdió y el único archivo
   mantenible era la salida compilada, con 1007 selectores `:nth-child` encadenados.
2. **46 enlaces, 0 destinos.** Ni la navegación, ni el footer, ni los CTAs llevaban a
   ninguna parte.
3. **1,28 MB de PNG** en el set de capturas, sin `width`/`height` ni carga diferida.
4. **La cabecera del sitio estaba al final del `<body>`** y `<nav>`, `<aside>`, `<main>` y
   `<footer>` estaban usados al revés de lo que significan.
5. **jQuery de 2014 desde CDN** para cinco líneas de código.
