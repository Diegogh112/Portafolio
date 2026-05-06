// ============================================================
// DATOS DEL PORTAFOLIO — Edita este archivo con tu información
// ============================================================

export const personalInfo = {
  name: 'Diego Gutierrez',
  title: 'Ingeniero de Sistemas de Información',
  subtitle: 'Backend · Data & BI · Automatización',
  description:
    'Estudiante de 10mo ciclo de Ingeniería de Sistemas de Información (décimo superior), con experiencia en programación, análisis de datos, automatización de procesos y desarrollo de soluciones tecnológicas en entornos bancarios y del Estado.',
  email: 'diegoarmandogh10@gmail.com',
  github: 'https://github.com/Diegogh112',
  linkedin: 'https://www.linkedin.com/in/diego-armando-gutierrez-herrera-507a332a3/',
  location: 'Lima, Perú',
  available: true,
}

export const aboutDescription = [
  'Soy estudiante de 10mo ciclo de Ingeniería de Sistemas de Información en la UPC (décimo superior), con experiencia práctica en entornos bancarios y del Estado peruano.',
  'Me especializo en la transformación digital de operaciones mediante Python, Power BI, VBA e inteligencia artificial, aplicando análisis de datos y mejora continua de procesos.',
  'He trabajado en el Banco de la Nación y en SUNAT, donde desarrollé dashboards, automaticé reportes, implementé APIs y ejecuté pruebas de rendimiento bajo metodologías ágiles.',
]

export const skills = {
  Backend: [
    { name: 'Java', level: 82, icon: '☕' },
    { name: 'Spring Boot', level: 78, icon: '🍃' },
    { name: 'Python', level: 85, icon: '🐍' },
    { name: 'C++ / C', level: 70, icon: '⚙️' },
    { name: 'VBA', level: 80, icon: '📋' },
  ],
  Frontend: [
    { name: 'JavaScript', level: 82, icon: '🟨' },
    { name: 'TypeScript', level: 78, icon: '🔷' },
    { name: 'React', level: 75, icon: '⚛️' },
    { name: 'Angular', level: 70, icon: '🔺' },
    { name: 'HTML / CSS', level: 85, icon: '🎨' },
  ],
  'Data & BI': [
    { name: 'Power BI', level: 88, icon: '📊' },
    { name: 'Power Apps', level: 78, icon: '📱' },
    { name: 'Power Automate', level: 75, icon: '⚡' },
    { name: 'Excel Avanzado', level: 90, icon: '📗' },
    { name: 'SQL Server', level: 82, icon: '🗄️' },
  ],
  Tools: [
    { name: 'Git / GitHub', level: 85, icon: '🐙' },
    { name: 'PostgreSQL / MongoDB', level: 78, icon: '🐘' },
    { name: 'Figma / Bizagi', level: 72, icon: '🎨' },
    { name: 'Scrum / ITIL', level: 80, icon: '🔄' },
    { name: 'IA (OpenAI / Gemini)', level: 75, icon: '🤖' },
  ],
}

export const projects = [
  {
    id: 1,
    title: 'Pasarela de Ventas',
    description:
      'Sistema completo de pasarela de ventas y pagos con catálogo de productos, carrito de compras, checkout y gestión de pedidos.',
    problem:
      'Necesidad de un sistema de ventas online con flujo completo desde catálogo hasta confirmación de pedido.',
    solution:
      'Desarrollé una aplicación web con Spring Boot y Thymeleaf con arquitectura MVC, carrito en sesión, filtros por categoría y proceso de checkout completo.',
    technologies: ['Java 17', 'Spring Boot', 'Thymeleaf', 'Maven', 'HTML/CSS'],
    category: 'Backend',
    github: 'https://github.com/Diegogh112/Apps',
    demo: null,
    featured: true,
    color: 'from-blue-500 to-cyan-500',
    icon: '🛒',
  },
  {
    id: 2,
    title: 'VitalityFront',
    description:
      'Aplicación frontend desarrollada con TypeScript orientada a la gestión de salud y bienestar.',
    problem:
      'Interfaz moderna y tipada para una plataforma de salud que requería componentes reutilizables y mantenibles.',
    solution:
      'Construí el frontend con TypeScript garantizando tipado estático, mejor mantenibilidad y reducción de errores en tiempo de ejecución.',
    technologies: ['TypeScript', 'HTML/CSS'],
    category: 'Frontend',
    github: 'https://github.com/Diegogh112/VitalityFront',
    demo: null,
    featured: true,
    color: 'from-violet-500 to-purple-500',
    icon: '💪',
  },
  {
    id: 3,
    title: 'Dashboard',
    description:
      'Dashboard interactivo de monitoreo y control del portafolio de proyectos TI del Banco de la Nación, con KPIs en tiempo real, filtros por cartera y estado, y visualización por gerencia.',
    problem:
      'El equipo necesitaba visibilidad centralizada del avance de requerimientos y proyectos TI sin depender de reportes manuales.',
    solution:
      'Desarrollé un dashboard dinámico en JavaScript con gráficos interactivos, filtros en tiempo real y múltiples vistas (Demanda Estratégica, P&D, Transformación Digital, Seguimiento Semanal).',
    technologies: ['JavaScript', 'HTML', 'CSS'],
    category: 'Frontend',
    github: 'https://github.com/Diegogh112/Dashboard',
    demo: 'https://bnde-dashboard.vercel.app/',
    image: '/Portafolio/images/dashboard-preview.jpg',
    featured: true,
    color: 'from-amber-500 to-orange-500',
    icon: '📊',
  },
  {
    id: 4,
    title: 'Cronograma',
    description:
      'Aplicación de visualización de avance de proyectos mediante cronogramas Gantt interactivos, con comparación entre avance planificado y real.',
    problem:
      'Organizar y visualizar el avance de proyectos con múltiples entregables y fases de forma clara y accesible para el equipo.',
    solution:
      'Desarrollé una herramienta que genera cronogramas Gantt a partir de datos pegados por el usuario, mostrando % avance planificado vs real con indicadores visuales.',
    technologies: ['JavaScript', 'HTML', 'CSS'],
    category: 'Frontend',
    github: 'https://github.com/Diegogh112/Cronograma',
    demo: 'https://bnavanceproyectos.vercel.app/',
    image: '/Portafolio/images/cronograma-preview.jpg',
    featured: true,
    color: 'from-emerald-500 to-teal-500',
    icon: '📅',
  },
  {
    id: 5,
    title: 'ft',
    description:
      'Repositorio de desarrollo frontend con experimentos y componentes web.',
    problem:
      'Necesidad de un espacio para prototipar y probar componentes e interfaces de forma rápida.',
    solution:
      'Colección de prototipos y componentes frontend desarrollados para explorar nuevas técnicas y patrones de UI.',
    technologies: ['HTML', 'CSS', 'JavaScript'],
    category: 'Frontend',
    github: 'https://github.com/Diegogh112/ft',
    demo: null,
    featured: false,
    color: 'from-sky-500 to-blue-500',
    icon: '🧪',
  },
]

export const experience = [
  {
    role: 'Practicante de Demanda y Proyectos de TI',
    company: 'Banco de la Nación del Perú',
    period: 'Enero 2025 — Actualidad',
    description: 'Desarrollo de dashboards en Power BI para seguimiento de demanda, modelado de procesos AS-IS/TO-BE, seguimiento de proyectos con SharePoint y ClearQuest, automatización de reportes con VBA y Power Query, e implementación de scripts Python para análisis de datos.',
    technologies: ['Power BI', 'Python', 'VBA', 'SharePoint', 'ClearQuest'],
  },
  {
    role: 'Practicante — Desarrollo de Sistemas Tributarios',
    company: 'SUNAT',
    period: 'Marzo 2025 — Diciembre 2025',
    description: 'Pruebas de rendimiento con Apache JMeter, scripts JavaScript para análisis de resultados, implementación de servicios OpenAPI (YAML), desarrollo de macros XML para automatizar pruebas y apoyo en control de calidad bajo metodologías ágiles.',
    technologies: ['JavaScript', 'JMeter', 'OpenAPI', 'XML', 'Scrum'],
  },
]

export const education = [
  {
    degree: 'Ingeniería de Sistemas de Información',
    institution: 'Universidad Peruana de Ciencias Aplicadas (UPC)',
    period: 'Marzo 2022 — Actualidad',
    description: 'Décimo ciclo — Décimo Superior. Idiomas: Español (nativo), Inglés (B2).',
  },
]

export const certifications = [
  { name: 'Cybersecurity Analyst', issuer: 'IBM', year: '2024' },
  { name: 'Power BI & Business Intelligence', issuer: 'Cámara de Comercio Exterior', year: '2024' },
  { name: 'Análisis de Datos con Power BI', issuer: 'Fundación Romero', year: '2023' },
  { name: 'SQL Server Programación Avanzada', issuer: 'Udemy', year: '2024' },
  { name: 'Scrum Fundamentals Certified (SFC)', issuer: 'SCRUMstudy', year: '2023' },
  { name: 'Power Apps & Power Automate', issuer: 'IDAT', year: '2023' },
  { name: 'Microsoft Excel Expert 2016', issuer: 'Cibertec', year: '2022' },
]
