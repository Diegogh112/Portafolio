// ============================================================
// DATOS DEL PORTAFOLIO — Edita este archivo con tu información
// ============================================================

export const personalInfo = {
  name: 'Tu Nombre Completo',
  title: 'Software Developer | Data & AI',
  subtitle: 'Ingeniería de Sistemas de Información',
  description:
    'Desarrollador de software en último ciclo universitario, especializado en backend, análisis de datos e inteligencia artificial. Apasionado por construir soluciones escalables que resuelven problemas reales.',
  email: 'tuemail@gmail.com',
  github: 'https://github.com/tu-usuario',
  linkedin: 'https://linkedin.com/in/tu-usuario',
  location: 'Lima, Perú',
  available: true,
}

export const aboutDescription = [
  'Soy estudiante de Ingeniería de Sistemas de Información en último ciclo, con experiencia práctica en desarrollo de software, análisis de datos y automatización de procesos.',
  'Me especializo en construir APIs robustas con Spring Boot, aplicaciones web modernas con React y soluciones de datos con Python y Power BI. Disfruto resolver problemas complejos con código limpio y arquitecturas bien diseñadas.',
  'Actualmente busco oportunidades donde pueda aplicar mis habilidades en proyectos de impacto real, especialmente en el área de Backend, Data Engineering o AI.',
]

export const skills = {
  Backend: [
    { name: 'Java', level: 85, icon: '☕' },
    { name: 'Spring Boot', level: 80, icon: '🍃' },
    { name: 'Python', level: 82, icon: '🐍' },
    { name: 'REST APIs', level: 88, icon: '🔌' },
    { name: 'SQL', level: 85, icon: '🗄️' },
  ],
  Frontend: [
    { name: 'React', level: 78, icon: '⚛️' },
    { name: 'JavaScript', level: 80, icon: '🟨' },
    { name: 'Angular', level: 65, icon: '🔺' },
    { name: 'HTML/CSS', level: 85, icon: '🎨' },
    { name: 'Tailwind CSS', level: 75, icon: '💨' },
  ],
  'Data & AI': [
    { name: 'Power BI', level: 80, icon: '📊' },
    { name: 'Pandas / NumPy', level: 78, icon: '🐼' },
    { name: 'Machine Learning', level: 70, icon: '🤖' },
    { name: 'SQL Analytics', level: 82, icon: '📈' },
    { name: 'Data Viz', level: 75, icon: '📉' },
  ],
  Tools: [
    { name: 'Git / GitHub', level: 88, icon: '🐙' },
    { name: 'Docker', level: 65, icon: '🐳' },
    { name: 'PostgreSQL', level: 80, icon: '🐘' },
    { name: 'Postman', level: 85, icon: '📮' },
    { name: 'Linux', level: 70, icon: '🐧' },
  ],
}

export const projects = [
  {
    id: 1,
    title: 'API REST de Gestión de Inventario',
    description:
      'API RESTful completa para gestión de inventario empresarial con autenticación JWT, roles de usuario y documentación Swagger.',
    problem:
      'Las empresas pequeñas carecen de sistemas de inventario accesibles y bien documentados que puedan integrarse fácilmente con otros servicios.',
    solution:
      'Desarrollé una API con Spring Boot siguiendo principios SOLID, con endpoints bien definidos, validaciones robustas y documentación automática con OpenAPI.',
    technologies: ['Java', 'Spring Boot', 'PostgreSQL', 'JWT', 'Swagger', 'Docker'],
    category: 'Backend',
    github: 'https://github.com/tu-usuario/inventory-api',
    demo: null,
    featured: true,
    color: 'from-blue-500 to-cyan-500',
    icon: '🔧',
  },
  {
    id: 2,
    title: 'Task Manager App',
    description:
      'Aplicación web de gestión de tareas con interfaz moderna, drag & drop, filtros avanzados y sincronización en tiempo real.',
    problem:
      'Los equipos necesitan herramientas de gestión de tareas simples pero potentes, sin la complejidad de soluciones enterprise.',
    solution:
      'Construí una SPA con React y Context API para manejo de estado, con diseño responsive y UX intuitiva que reduce la curva de aprendizaje.',
    technologies: ['React', 'JavaScript', 'Tailwind CSS', 'Context API', 'LocalStorage'],
    category: 'Frontend',
    github: 'https://github.com/tu-usuario/task-manager',
    demo: 'https://tu-usuario.github.io/task-manager',
    featured: true,
    color: 'from-violet-500 to-purple-500',
    icon: '✅',
  },
  {
    id: 3,
    title: 'Dashboard de Ventas con Power BI',
    description:
      'Dashboard interactivo de análisis de ventas con KPIs en tiempo real, segmentación por región y proyecciones mensuales.',
    problem:
      'El equipo comercial tomaba decisiones basadas en reportes estáticos de Excel, sin visibilidad en tiempo real del rendimiento.',
    solution:
      'Diseñé un dashboard en Power BI conectado a SQL Server con DAX avanzado, reduciendo el tiempo de generación de reportes de 4 horas a minutos.',
    technologies: ['Power BI', 'SQL Server', 'DAX', 'Excel', 'ETL'],
    category: 'Data',
    github: 'https://github.com/tu-usuario/sales-dashboard',
    demo: null,
    featured: true,
    color: 'from-amber-500 to-orange-500',
    icon: '📊',
  },
  {
    id: 4,
    title: 'Clasificador de Sentimientos con NLP',
    description:
      'Modelo de machine learning para análisis de sentimientos en reseñas de productos, con API de inferencia y visualización de resultados.',
    problem:
      'Analizar manualmente miles de reseñas de clientes es inviable. Se necesitaba automatizar la clasificación para detectar tendencias rápidamente.',
    solution:
      'Entrené un modelo de clasificación con scikit-learn y transformers, expuesto como API con FastAPI, logrando 89% de accuracy en el conjunto de prueba.',
    technologies: ['Python', 'scikit-learn', 'NLTK', 'FastAPI', 'Pandas', 'Matplotlib'],
    category: 'AI',
    github: 'https://github.com/tu-usuario/sentiment-classifier',
    demo: null,
    featured: true,
    color: 'from-emerald-500 to-teal-500',
    icon: '🤖',
  },
  {
    id: 5,
    title: 'Sistema de Autenticación Segura',
    description:
      'Microservicio de autenticación con OAuth2, refresh tokens, rate limiting y auditoría de accesos.',
    problem:
      'Implementar autenticación segura desde cero en cada proyecto consume tiempo y genera vulnerabilidades por implementaciones incorrectas.',
    solution:
      'Desarrollé un microservicio reutilizable con Spring Security y OAuth2, con pruebas unitarias e integración completas.',
    technologies: ['Java', 'Spring Security', 'OAuth2', 'Redis', 'JUnit'],
    category: 'Backend',
    github: 'https://github.com/tu-usuario/auth-service',
    demo: null,
    featured: false,
    color: 'from-rose-500 to-pink-500',
    icon: '🔐',
  },
  {
    id: 6,
    title: 'Pipeline de Datos Automatizado',
    description:
      'Pipeline ETL automatizado para procesamiento de datos de múltiples fuentes con validación, transformación y carga a data warehouse.',
    problem:
      'El proceso manual de consolidación de datos de distintas fuentes tomaba días y era propenso a errores humanos.',
    solution:
      'Automaticé el pipeline con Python y Apache Airflow, reduciendo el tiempo de procesamiento de 2 días a 30 minutos con validaciones automáticas.',
    technologies: ['Python', 'Apache Airflow', 'PostgreSQL', 'Pandas', 'Docker'],
    category: 'Data',
    github: 'https://github.com/tu-usuario/etl-pipeline',
    demo: null,
    featured: false,
    color: 'from-sky-500 to-blue-500',
    icon: '⚙️',
  },
]

export const experience = [
  {
    role: 'Desarrollador de Software (Prácticas)',
    company: 'Empresa XYZ',
    period: '2024 — Presente',
    description: 'Desarrollo de APIs REST con Spring Boot, integración con bases de datos PostgreSQL y participación en sprints ágiles.',
    technologies: ['Java', 'Spring Boot', 'PostgreSQL', 'Git'],
  },
  {
    role: 'Analista de Datos (Freelance)',
    company: 'Proyectos Independientes',
    period: '2023 — 2024',
    description: 'Creación de dashboards en Power BI, automatización de reportes con Python y análisis de datos para toma de decisiones.',
    technologies: ['Power BI', 'Python', 'SQL', 'Excel'],
  },
]

export const education = [
  {
    degree: 'Ingeniería de Sistemas de Información',
    institution: 'Universidad XYZ',
    period: '2020 — 2025',
    description: 'Último ciclo. Especialización en desarrollo de software y análisis de datos.',
  },
]

export const certifications = [
  { name: 'Oracle Certified: Java SE', issuer: 'Oracle', year: '2024' },
  { name: 'Google Data Analytics', issuer: 'Google / Coursera', year: '2023' },
  { name: 'AWS Cloud Practitioner', issuer: 'Amazon Web Services', year: '2024' },
]
