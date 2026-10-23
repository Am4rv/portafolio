/**
 * ============================================================
 *  PORTFOLIO DATA — Amaru Ríos Figueroa
 * ============================================================
 *  Edita este archivo para actualizar el contenido del portafolio.
 *  No necesitas tocar index.html para añadir/modificar entradas.
 * ============================================================
 */

window.PORTFOLIO_DATA = {

  // ── PERFIL GENERAL ──────────────────────────────────────────
  profile: {
    name:       'Amaru Ríos Figueroa',
    title:      'Software Engineer / Full-Stack',
    location:   'Santiago, Chile 🇨🇱',
    university: 'UTEM (Ing. en Informática)',
    stack:      'Python (FastAPI, Flask) | React | MongoDB | AWS',
    email:      'amaruriosfigueroa@gmail.com',
    linkedin:   'https://www.linkedin.com/in/amaru-rios-figueroa-02a391319/',
    github:     'https://github.com/Am4rv',
    whatsapp:   'https://wa.me/56949254442',
    phone:      '(+56) 9 49254442',

    /** Descripción para la pestaña "Perfil Profesional" */
    bio: [
      'Software Engineer con sólida experiencia en desarrollo <strong>Full Stack</strong>. Especializado en la construcción de <strong>APIs robustas</strong> (Python/Flask, FastAPI), optimización de bases de datos (MongoDB, MySQL, PostgreSQL) y desarrollo de interfaces de usuario modernas.',
      'Orientado a la resolución técnica de problemas complejos, validación de integraciones y rendimiento de sistemas, garantizando la estabilidad del software y adaptándome rápidamente a nuevas arquitecturas y herramientas cloud.',
    ],

    /** Puntos clave para la pestaña "Perfil Profesional" */
    keyPoints: [
      'Arquitectura de APIs REST escalables y seguras con Python (Flask / FastAPI).',
      'Modelado, limpieza, transformación (ETL) y optimización de bases de datos relacionales y NoSQL.',
      'Frontend dinámico y responsivo con React, TypeScript, JavaScript y Bootstrap.',
      'Cumplimiento de estándares internacionales de seguridad (ISO 27001 / ISO 27701).',
    ],
  },

  // ── EDUCACIÓN ───────────────────────────────────────────────
  // Agrega más objetos a este array para añadir nuevos estudios.
  education: [
    {
      degree:      'Ingeniería en Informática',
      institution: 'Universidad Tecnológica Metropolitana (UTEM)',
      period:      'Marzo 2020 – Enero 2025',
      description: 'Formación integral en ciencias de la computación, desarrollo de software, algoritmos, estructuras de datos, redes, seguridad informática, gestión ágil de proyectos y bases de datos relacionales y no relacionales.',
    },
    // Ejemplo de cómo agregar otro estudio:
    // {
    //   degree:      'Diplomado en Cloud Computing',
    //   institution: 'Nombre de la institución',
    //   period:      'Año – Año',
    //   description: 'Descripción breve.',
    // },
  ],

  // ── CERTIFICACIONES ─────────────────────────────────────────
  // Agrega más objetos para nuevas certificaciones.
  certifications: [
    {
      name:        'AWS Academy Graduate - Introducción a la nube',
      description: 'Conceptos básicos de AWS para entornos escalables y arquitectura en la nube.',
    },
    {
      name:        'ISO 27001 - Versión 2022',
      description: 'Sistemas de Gestión de Seguridad de la Información (SGSI).',
    },
    {
      name:        'Taller Introducción a la ISO 27001',
      description: 'Principios fundamentales y controles de ciberseguridad.',
    },
    {
      name:        'Concientización de seguridad #2 & Gestión de Riesgos 2',
      description: 'Mitigación de vulnerabilidades y gestión integral de riesgos tecnológicos.',
    },
  ],

  // ── EXPERIENCIA PROFESIONAL ─────────────────────────────────
  // Agrega más objetos para nuevos empleos/proyectos.
  experience: [
    {
      company: 'Desarrollo e Innovación — Eniax Care',
      badge:   'Full-Stack Developer',
      role:    'Desarrollador Full-Stack',
      period:  'Agosto 2025 – Julio 2026',
      bullets: [
        'Desarrollo de nuevas herramientas internas y plataformas de software orientadas a la optimización de procesos operativos y la atención digital integral de pacientes.',
        'Diseño e implementación de soluciones <strong>Full Stack</strong> completas, participando activamente tanto en la arquitectura de backend como en el frontend interactivo.',
        'Construcción y mantenimiento continuo de <strong>APIs y microservicios</strong> de alta disponibilidad utilizando <strong>Python y Flask</strong>.',
        'Desarrollo de interfaces de usuario web dinámicas y responsivas con JavaScript, HTML5, CSS3 y Bootstrap.',
        'Gestión, modelado y optimización de bases de datos <strong>MongoDB</strong> y <strong>MySQL</strong>, incluyendo tareas de limpieza, transformación de datos (ETL) y análisis.',
        'Implementación de mejoras en seguridad, robustecimiento y validación estricta de datos en aplicaciones internas.',
      ],
      tags: ['Python', 'Flask', 'MongoDB', 'MySQL', 'JavaScript', 'HTML/CSS', 'Bootstrap', 'Seguridad'],
    },
    {
      company: 'Departamento de Pregrado — Universidad de Chile',
      badge:   'Analista Programador',
      role:    'Analista Programador',
      period:  'Noviembre 2024 – Enero 2025',
      bullets: [
        'Desarrolló el <strong>Sistema de Ingresos Especiales (SIE)</strong>, plataforma crucial que automatiza integralmente el proceso de selección y admisión de estudiantes a la universidad por vías de ingreso especiales.',
        'Implementó el backend completo del <strong>Sistema AFE</strong> (Actividades Finales de Egreso) empleando <strong>Python, FastAPI y MongoDB</strong>, optimizando la gestión de actividades para académicos, estudiantes y personal administrativo.',
        'Desplegó la API REST asegurando que el equipo de Front-End pudiera consumir endpoints de manera eficiente, garantizando una integración fluida y una mejor experiencia de usuario.',
      ],
      tags: ['Python', 'FastAPI', 'MongoDB', 'APIs REST', 'Postman', 'U. de Chile'],
    },
    {
      company:      'Proyectos de Código Abierto & GitHub',
      badge:        'github.com/Am4rv',
      role:         null,
      period:       null,
      isOpenSource: true,
      description:  'Repositorios con implementaciones de backend escalables, arquitecturas basadas en microservicios, pruebas automatizadas, contenedores Docker y prototipos con Flutter y Dart.',
      link:         'https://github.com/Am4rv',
      linkLabel:    'Explorar repositorios en GitHub ↗',
      tags: [],
    },
  ],

  // ── HABILIDADES ─────────────────────────────────────────────
  // Cada categoría tiene un título, ícono y lista de tecnologías.
  skills: [
    {
      icon:  '🎨',
      title: 'Frontend',
      items: [
        'React',
        'JavaScript (ES6+)',
        'TypeScript',
        'HTML5 & CSS3',
        'Bootstrap',
      ],
    },
    {
      icon:  '⚙️',
      title: 'Backend',
      items: [
        'Python',
        'FastAPI',
        'Flask',
        'APIs RESTful',
        'Postman / Tests',
      ],
    },
    {
      icon:  '☁️',
      title: 'Bases de Datos & Cloud',
      items: [
        'MongoDB',
        'MySQL',
        'PostgreSQL',
        'AWS Cloud',
        'Docker & GCP',
      ],
    },
    {
      icon:  '🛡️',
      title: 'Estándares & Otros',
      items: [
        'ISO 27001 / 27701',
        'Git & GitHub',
        'Scrum & Agile',
        'C / C++',
        'Dart & Flutter',
      ],
    },
  ],

};
