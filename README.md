# Carta para Xime — sitio estático

Esta es una página web estática: no requiere Node.js, base de datos, backend ni servidor propio. Al publicarla en GitHub Pages, Cloudflare Pages o Netlify se abre desde una URL en cualquier navegador moderno, incluido Safari en iPhone.

## Antes de publicar: revisión rápida

1. Abre `index.html` con doble clic para una revisión visual rápida. También puedes usar un servidor local si lo prefieres: desde esta carpeta ejecuta `python -m http.server 8080` y visita `http://localhost:8080`.
2. Copia la canción que usarás a `assets/audio/song.mp3`.
3. Abre `assets/site-config.js` y cambia `audioUrl: ""` por `audioUrl: "./assets/audio/song.mp3"`.
4. Vuelve a abrir la página, pulsa **ABRIR** y confirma que la canción inicia. iPhone y otros navegadores solo permiten iniciar audio tras ese toque, por eso el botón está diseñado así.

El archivo MP3 no fue incluido porque no había uno en la carpeta original. No publiques música que no tengas derecho a compartir.

## Fotografías

Las fotografías que usa el sitio ya están dentro de `assets/images/` como `memory-01.jpg` a `memory-13.jpg`. Todas son JPG para que carguen en iPhone, Android, Windows y Mac.

Para sustituir una, conserva el mismo nombre y usa JPG o JPEG optimizado. Por ejemplo, reemplaza `assets/images/memory-01.jpg`. Si una foto viene de iPhone en formato HEIC, expórtala o conviértela a JPG antes de usarla: los HEIC no son una opción segura para todos los navegadores y servicios de vista previa.

Las copias originales que estaban en la raíz se mantienen intactas y `.gitignore` evita que se suban por accidente al usar Git. El sitio solo publica las versiones de `assets/images/`.

## Cambiar el texto y la portada

- El contenido de la carta, los títulos y las frases están en `index.html`.
- El estilo, los girasoles, las gerberas, animaciones y diseño móvil están en `assets/styles.css`.
- `assets/og-cover.jpg` es la imagen de portada para WhatsApp y otras aplicaciones. Ya mide 1200 × 630 px.
- Antes de compartir el enlace definitivo, añade esta línea en el `<head>` de `index.html`, sustituyendo el ejemplo por tu URL real:

```html
<meta property="og:url" content="https://TU-USUARIO.github.io/carta-para-xime/" />
```

También cambia `og:image` y `twitter:image` por la URL absoluta de la imagen si quieres la máxima compatibilidad con las vistas previas:

```html
<meta property="og:image" content="https://TU-USUARIO.github.io/carta-para-xime/assets/og-cover.jpg" />
<meta name="twitter:image" content="https://TU-USUARIO.github.io/carta-para-xime/assets/og-cover.jpg" />
```

## Publicar gratis en GitHub Pages — ruta recomendada

La URL final tendrá este formato: `https://TU-USUARIO.github.io/carta-para-xime/`.

1. Crea o inicia sesión en [GitHub](https://github.com/).
2. Pulsa el signo **+** de la esquina superior derecha y elige **New repository**.
3. Escribe un nombre sencillo, por ejemplo `carta-para-xime`. Para una cuenta GitHub gratuita, selecciónalo como **Public**. La página es pública aunque el código esté en otro tipo de repositorio: no incluyas fotos ni texto que no quieras que sean accesibles desde el enlace.
4. Pulsa **Create repository**.
5. En el repositorio nuevo, pulsa **Add file → Upload files**. Arrastra los archivos y carpetas de este proyecto: `index.html`, `assets`, `site.webmanifest`, `_headers`, `netlify.toml`, `.nojekyll`, `README.md` y `.gitignore`. No hace falta subir las fotos originales que quedaron en la raíz; las fotos ya usadas están dentro de `assets/images`.
6. Al final de la página pulsa **Commit changes**.
7. Dentro del repositorio abre **Settings → Pages**. En **Build and deployment**, elige **Deploy from a branch**. Selecciona la rama `main` y la carpeta `/(root)`, luego pulsa **Save**.
8. Espera unos minutos y vuelve a esa misma pantalla. GitHub mostrará **Visit site** y la URL pública. Ábrela en el teléfono, pulsa **ABRIR** y revisa las fotos y la música.
9. Copia esa URL y pégala directamente en WhatsApp. La otra persona solo necesita tocar el enlace; no instala nada ni entra a GitHub.

GitHub Pages publica archivos estáticos y busca `index.html` en la carpeta elegida. La documentación oficial indica que el primer despliegue puede tardar hasta unos 10 minutos y que los sitios Pages son públicos. Consulta [Crear un sitio GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site) si la pantalla cambió.

### Actualizar después

Cada vez que cambies una foto, texto o canción, reemplaza el archivo correspondiente en GitHub y confirma el cambio. GitHub Pages vuelve a publicar automáticamente. Las vistas previas de WhatsApp pueden permanecer guardadas en caché un tiempo; cambia el nombre de `og-cover.jpg` y sus dos metadatos si necesitas forzar una portada nueva.

## Alternativa: Cloudflare Pages

Es igual de estático y entrega HTTPS automáticamente.

1. Sube el proyecto a un repositorio de GitHub con los pasos 1–6 anteriores.
2. Crea una cuenta en [Cloudflare](https://dash.cloudflare.com/), entra a **Workers & Pages** y selecciona **Create application → Pages → Connect to Git**.
3. Autoriza GitHub, elige el repositorio `carta-para-xime` y pulsa **Begin setup**.
4. En la configuración de build usa **Build command**: `exit 0`; y **Build output directory**: `.`. No hay framework ni compilación.
5. Elige `main` como **Production branch** y pulsa **Save and Deploy**.
6. Cloudflare te entregará una URL `https://NOMBRE.pages.dev`. Esa ya funciona por HTTPS y es la que puedes enviar.

Cloudflare también permite publicar arrastrando una carpeta o ZIP desde su panel, pero la conexión con GitHub facilita las actualizaciones. Sus instrucciones oficiales para [HTML estático](https://developers.cloudflare.com/pages/framework-guides/deploy-anything/) y [conectar Git](https://developers.cloudflare.com/pages/get-started/git-integration/) describen esos flujos.

## Alternativa: Netlify

1. Sube antes el proyecto a GitHub.
2. Entra a [Netlify](https://app.netlify.com/), elige **Add new site → Import an existing project** y conecta GitHub.
3. Selecciona el repositorio. Netlify detectará `netlify.toml`; no se necesita comando de build y la carpeta publicada es la raíz (`.`).
4. Pulsa **Deploy site**. Recibirás una URL `https://algo.netlify.app` con HTTPS.

## Usar un dominio propio después

No cambies enlaces ni rutas del proyecto: todas son relativas y funcionan bajo un subdirectorio de GitHub Pages o en un dominio propio.

- **GitHub Pages:** en **Settings → Pages → Custom domain**, escribe tu dominio y sigue la indicación DNS que muestra GitHub. Después habilita **Enforce HTTPS** cuando esté disponible.
- **Cloudflare Pages:** entra a tu proyecto, abre **Custom domains → Set up a domain** y sigue el asistente. Para un subdominio, normalmente crearás un registro CNAME apuntando a `TU-PROYECTO.pages.dev`; para el dominio raíz, Cloudflare puede pedir que gestiones sus nameservers. Consulta la [guía oficial de dominios de Cloudflare Pages](https://developers.cloudflare.com/pages/configuration/custom-domains/).
- **Netlify:** en **Domain management**, añade el dominio y sigue los registros DNS que Netlify muestre.

Cuando cambie tu URL pública, actualiza `og:url`, `og:image` y `twitter:image` en `index.html` a la nueva URL absoluta. Así WhatsApp y redes sociales mostrarán la portada correcta.

## Estructura importante

```text
index.html                 Página de entrada
assets/styles.css          Diseño, flores y adaptación móvil
assets/app.js              Apertura, audio, animaciones y accesibilidad
assets/site-config.js      Ruta de la canción
assets/images/             Fotografías publicadas
assets/audio/song.mp3      Canción que debes colocar antes de publicar
assets/og-cover.jpg        Vista previa al compartir
assets/favicon.svg         Favicon de girasol
```

No hay rutas `C:`, `file://`, servicios externos, backend ni contenido HTTP inseguro en el sitio. Todos los recursos que utiliza la página están declarados con rutas relativas.
