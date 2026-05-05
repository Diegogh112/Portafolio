# 🚀 Portafolio Personal — React + Vite + Tailwind CSS

Portafolio web profesional construido con React, Vite y Tailwind CSS. Diseño minimalista con fondo oscuro, acentos en azul/morado y animaciones suaves.

## ✨ Características

- ⚛️ React 18 + Vite (build ultrarrápido)
- 🎨 Tailwind CSS (diseño responsive mobile-first)
- 🌙 Tema oscuro con acentos en azul y violeta
- 🎞️ Animaciones de scroll (IntersectionObserver)
- 📱 100% responsive
- ♿ Accesible (ARIA labels, roles semánticos)
- 🚀 Listo para GitHub Pages

## 📁 Estructura del proyecto

```
portfolio/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── ui/
│   │   │   ├── AnimatedSection.jsx   # Wrapper de animaciones de scroll
│   │   │   ├── Badge.jsx             # Badge de tecnología reutilizable
│   │   │   └── SectionHeader.jsx     # Encabezado de sección reutilizable
│   │   ├── Navbar.jsx                # Navegación fija con menú mobile
│   │   ├── Hero.jsx                  # Sección principal / landing
│   │   ├── About.jsx                 # Sobre mí, educación, certificaciones
│   │   ├── Projects.jsx              # Proyectos con filtros por categoría
│   │   ├── Skills.jsx                # Habilidades con barras de progreso
│   │   ├── Contact.jsx               # Formulario de contacto
│   │   └── Footer.jsx                # Pie de página
│   ├── data/
│   │   └── portfolio.js              # ⭐ TODOS TUS DATOS AQUÍ
│   ├── hooks/
│   │   └── useScrollAnimation.js     # Hooks de scroll personalizados
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── package.json
```

## 🛠️ Instalación y uso local

### Prerrequisitos
- Node.js 18+ 
- npm o yarn

### Pasos

```bash
# 1. Instalar dependencias
npm install

# 2. Iniciar servidor de desarrollo
npm run dev

# 3. Abrir en el navegador
# http://localhost:5173
```

## ✏️ Personalización

**Todo tu contenido está en un solo archivo:**

```
src/data/portfolio.js
```

Edita los siguientes objetos:

| Objeto | Descripción |
|--------|-------------|
| `personalInfo` | Nombre, título, email, GitHub, LinkedIn |
| `aboutDescription` | Párrafos de la sección "Sobre mí" |
| `skills` | Tecnologías organizadas por categoría con nivel |
| `projects` | Lista de proyectos con descripción, problema, solución |
| `experience` | Experiencia laboral |
| `education` | Educación |
| `certifications` | Certificaciones |

### Cambiar el nombre del repositorio en el deploy

En `vite.config.js`, cambia `base`:
```js
base: '/nombre-de-tu-repo/',
```

En `package.json`, cambia `homepage`:
```json
"homepage": "https://tu-usuario.github.io/nombre-de-tu-repo"
```

En `index.html`, actualiza el favicon:
```html
<link rel="icon" href="/nombre-de-tu-repo/favicon.svg" />
```

## 🚀 Deploy en GitHub Pages

### Opción 1: Automático con gh-pages (recomendado)

```bash
# 1. Instalar gh-pages (ya está en devDependencies)
npm install

# 2. Asegúrate de que tu repo de GitHub esté configurado como remote
git remote add origin https://github.com/tu-usuario/portfolio.git

# 3. Hacer deploy
npm run deploy
```

Esto construye el proyecto y sube la carpeta `dist` a la rama `gh-pages`.

### Opción 2: GitHub Actions (CI/CD automático)

Crea el archivo `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Build
        run: npm run build
      
      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

### Configurar GitHub Pages

1. Ve a tu repositorio en GitHub
2. Settings → Pages
3. Source: selecciona la rama `gh-pages`
4. Guarda y espera ~2 minutos
5. Tu portafolio estará en: `https://tu-usuario.github.io/portfolio`

## 📦 Scripts disponibles

```bash
npm run dev        # Servidor de desarrollo
npm run build      # Build de producción
npm run preview    # Preview del build local
npm run deploy     # Deploy a GitHub Pages
```

## 🎨 Personalizar colores

En `tailwind.config.js` puedes cambiar los colores de acento:

```js
colors: {
  primary: { /* azules */ },
  accent:  { /* violetas */ },
  dark:    { /* fondos oscuros */ },
}
```

## 📄 Licencia

MIT — Úsalo libremente para tu portafolio personal.
