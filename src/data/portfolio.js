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
    title: 'Vitality — Backend',
    description:
      'API REST de la plataforma Vitality: sistema web potenciado por IA para nutrición y bienestar, con gestión de usuarios, planes nutricionales, seguimiento de objetivos y asistencia virtual.',
    problem:
      'Se necesitaba un backend robusto que soporte múltiples roles (usuario, profesional de salud, administrador) con autenticación segura y recomendaciones personalizadas.',
    solution:
      'Desarrollé el backend con Node.js y JWT, documentando los endpoints con OpenAPI/Swagger para gestión de productos, usuarios, planes nutricionales y seguimiento de progreso, desplegado en Render.',
    technologies: ['Java','Node.js', 'Express', 'JWT', 'PostgreSQL', 'OpenAPI / Swagger', 'REST API'],
    category: 'Backend',
    github: 'https://github.com/Mari1lm/Vitality---Arquitectura-web',
    demo: 'https://vitality-arquitectura-web.onrender.com/',
    image: '/Portafolio/images/VitalityBack.jpg',
    demoNote: '⚠️ El servicio puede tardar ~30s en iniciar por inactividad (Render free tier).',
    featured: true,
    color: 'from-blue-500 to-cyan-500',
    icon: '🍃',
  },
  {
    id: 2,
    title: 'Vitality — Frontend',
    description:
      'Interfaz web de la plataforma Vitality para nutrición y bienestar, con registro de usuarios, búsqueda de productos, objetivos de salud y seguimiento de progreso.',
    problem:
      'Los usuarios necesitaban una interfaz moderna e intuitiva para interactuar con las funcionalidades de IA y nutrición de la plataforma.',
    solution:
      'Construí el frontend con Angular y TypeScript conectado al backend REST, con vistas diferenciadas para usuarios, profesionales de salud y administradores, usando SQL Server como base de datos.',
    technologies: ['Angular', 'TypeScript', 'SQL Server', 'HTML', 'CSS'],
    category: 'Frontend',
    github: 'https://github.com/Diegogh112/VitalityFront',
    demo: 'https://vitalityfront.netlify.app/',
    image: '/Portafolio/images/VitalityFront.jpg',
    demoNote: '⚠️ Activa primero el backend para que funcione correctamente.',
    featured: true,
    color: 'from-violet-500 to-purple-500',
    icon: '💪',
  },
  {
    id: 3,
    title: 'Dashboard — Portafolio de Proyectos TI',
    description:
      'Dashboard interactivo de monitoreo y control del portafolio de proyectos TI del Banco de la Nación, con KPIs en tiempo real, filtros por cartera y estado, y visualización por gerencia.',
    problem:
      'El equipo necesitaba visibilidad centralizada del avance de requerimientos y proyectos TI sin depender de reportes manuales.',
    solution:
      'Desarrollé un dashboard dinámico en JavaScript con gráficos interactivos, filtros en tiempo real y múltiples vistas (Demanda Estratégica, P&D, Transformación Digital, Seguimiento Semanal).',
    technologies: ['React', 'JavaScript', 'HTML', 'CSS'],
    category: 'Frontend',
    github: 'https://github.com/Diegogh112/Dashboard',
    demo: 'https://dashboard-git-version-3-diegos-projects-1d8bb0e8.vercel.app/',
    image: '/Portafolio/images/dashboard-preview.jpg',
    downloads: [
      { label: 'Portafolio de Proyectos 2026 (ejemplo)', file: '/Portafolio/Portafolios/Portafolio_de_Proyectos_2026 ejemplo.xlsx' },
      { label: 'Portafolio Demanda TI (ejemplo)', file: '/Portafolio/Portafolios/Portafolio_Demanda_TI ejemplo.xlsm' },
    ],
    featured: true,
    color: 'from-amber-500 to-orange-500',
    icon: '📊',
  },
  {
    id: 4,
    title: 'Cronograma — Avance de Proyectos',
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
    title: 'DocAI Assistant',
    description:
      'Asistente de análisis de documentos con IA: sube un PDF o pega texto y hazle preguntas en lenguaje natural. La IA responde exclusivamente basándose en el contenido del documento.',
    problem:
      'Los usuarios necesitaban una forma rápida de extraer información y resolver dudas sobre documentos extensos sin leerlos completos.',
    solution:
      'Desarrollé un sistema full-stack con FastAPI + Google Gemini en el backend y HTML/CSS/JS puro en el frontend, con chat con historial, carga de PDF/TXT por drag & drop y respuestas ancladas al documento.',
    technologies: ['Python', 'FastAPI', 'Google Gemini', 'JavaScript', 'HTML/CSS'],
    category: 'FullStack',
    github: 'https://github.com/Diegogh112/IA',
    demo: 'https://ia-neon-eight.vercel.app/',
    image: '/Portafolio/images/ia.jpg',
    demoNote: '⚠️ El backend puede tardar ~30s en iniciar por inactividad (Render free tier).',
    featured: true,
    color: 'from-rose-500 to-pink-500',
    icon: '🤖',
  },
  {
    id: 6,
    title: 'Sistema de Gestión de Ventas',
    description:
      'Aplicación de escritorio en C# con .NET Framework 4.7.2 (Windows Forms) conectada a SQL Server. Gestión completa de clientes, productos, categorías, pedidos y reportes con arquitectura en 4 capas.',
    problem:
      'Necesidad de un sistema de escritorio que maneje el ciclo completo de ventas con múltiples entidades relacionadas, validaciones de negocio y consistencia transaccional.',
    solution:
      'Desarrollé la app con arquitectura Modelo–Datos–Negocio–Presentación, consultas parametrizadas para prevenir SQL injection, transacciones SqlTransaction en pedidos y 5 módulos CRUD independientes.',
    technologies: ['C#', '.NET Framework', 'Windows Forms', 'SQL Server', 'ADO.NET'],
    category: 'Backend',
    github: 'https://github.com/Diegogh112/GestionVentas',
    demo: null,
    download: 'https://github.com/Diegogh112/GestionVentas/archive/refs/heads/main.zip',
    image: null,
    featured: true,
    color: 'from-indigo-500 to-blue-500',
    icon: '🖥️',
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
    technologies: ['Java','JavaScript', 'JMeter', 'OpenAPI', 'XML', 'Scrum'],
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
