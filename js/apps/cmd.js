/**
 * Interactive Windows XP Command Prompt (cmd.exe)
 * Features command history, auto-scroll, formatted system outputs and easter eggs.
 */
class XPTerminal {
  constructor() {
    this.container = document.getElementById('cmd-output-area');
    this.input = document.getElementById('cmd-input-field');
    this.history = [];
    this.historyIndex = -1;
    this.init();
  }

  init() {
    if (!this.input) return;

    this.input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const cmd = this.input.value.trim();
        this.input.value = '';
        if (cmd) {
          this.history.push(cmd);
          this.historyIndex = this.history.length;
          this.execute(cmd);
        } else {
          this.appendOutput('C:\\Documents and Settings\\Amaru> \n');
        }
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (this.historyIndex > 0) {
          this.historyIndex--;
          this.input.value = this.history[this.historyIndex] || '';
        }
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (this.historyIndex < this.history.length - 1) {
          this.historyIndex++;
          this.input.value = this.history[this.historyIndex] || '';
        } else {
          this.historyIndex = this.history.length;
          this.input.value = '';
        }
      }
    });

    // Keep focus inside terminal when clicking anywhere in cmd window
    const cmdWin = document.getElementById('win-cmd');
    if (cmdWin) {
      cmdWin.addEventListener('click', () => {
        this.input.focus();
      });
    }
  }

  appendOutput(text, isError = false) {
    const p = document.createElement('div');
    p.className = 'cmd-output';
    if (isError) p.style.color = '#FF5555';
    p.textContent = text;
    this.container.appendChild(p);
    this.container.scrollTop = this.container.scrollHeight;
  }

  execute(cmdLine) {
    const parts = cmdLine.split(' ');
    const command = parts[0].toLowerCase();
    const args = parts.slice(1);

    this.appendOutput(`C:\\Documents and Settings\\Amaru> ${cmdLine}`);

    switch (command) {
      case 'help':
        this.appendOutput(`
Comandos disponibles en AmaruOS XP [Versión 5.1.2600]:

  whoami         Muestra información del desarrollador
  skills         Lista aptitudes técnicas y lenguajes
  exp            Detalle de experiencia laboral y proyectos
  edu            Información de educación académica
  cert           Certificaciones profesionales (AWS, ISO 27001)
  contact        Datos de contacto, LinkedIn y GitHub
  cat cv.txt     Muestra el curriculum vitae completo
  theme <name>   Cambia el tema (bliss | royale | dark | matrix)
  matrix         Activa/desactiva lluvia de código Matrix
  clear / cls    Limpia la pantalla
  calc           Abre la calculadora
  exit           Cierra la terminal
  sudo           Ejecuta con privilegios de administrador
        `);
        break;

      case 'whoami':
        this.appendOutput(`
Amaru Ríos Figueroa
Título: Software Engineer / Desarrollador Full-Stack
Universidad: Universidad Tecnológica Metropolitana (UTEM) - Ingeniería en Informática
Especialidad: Construcción de APIs robustas (Python/FastAPI/Flask), optimización de bases de datos y frontend reactivo.
        `);
        break;

      case 'skills':
        this.appendOutput(`
Aptitudes Técnicas:
  [Frontend] : React, JavaScript, TypeScript, HTML5, CSS3, Bootstrap
  [Backend]  : Python, Flask, FastAPI, RESTful APIs, Postman
  [Databases]: MongoDB, MySQL, PostgreSQL
  [Cloud]    : AWS (Certificado), GCP, Docker
  [Otros]    : C/C++, Dart, Flutter, Git/GitHub, Scrum/Agile, ISO 27001
        `);
        break;

      case 'exp':
        this.appendOutput(`
Experiencia Profesional:

1. Desarrollo e Innovación - Eniax Care
   Rol: Desarrollador Full-Stack (Agosto/2025 – Julio/2026)
   - Construcción de herramientas internas y atención digital de pacientes.
   - APIs y servicios con Python y Flask.
   - Frontend web con JavaScript, HTML, CSS y Bootstrap.
   - Modelado de bases de datos MongoDB y MySQL (ETL, limpieza y análisis).
   - Implementación de mejoras de seguridad y validaciones internas.

2. Departamento de Pregrado - Universidad de Chile
   Rol: Analista Programador (Noviembre/2024 – Enero/2025)
   - Sistema de Ingresos Especiales (SIE): Automatización de selección de estudiantes admitidos.
   - Sistema AFE (Actividades Finales de Egreso): Backend con Python, FastAPI y MongoDB.
   - Despliegue de API REST para integración fluida con Front-End.
        `);
        break;

      case 'edu':
        this.appendOutput(`
Educación:
  Universidad Tecnológica Metropolitana (UTEM)
  Carrera: Ingeniería en Informática
  Periodo: Mar 2020 - Ene 2025
        `);
        break;

      case 'cert':
        this.appendOutput(`
Certificaciones y Capacitaciones:
  ✔ AWS Academy Graduate - Introducción a la nube (Conceptos de AWS para entornos escalables)
  ✔ ISO 27001 - Versión 2022
  ✔ Taller Introducción a la ISO 27001
  ✔ Concientización de seguridad #2
  ✔ Gestión de Riesgos 2
        `);
        break;

      case 'contact':
        this.appendOutput(`
Información de Contacto:
  Teléfono: (+56) 9 49254442
  Email   : amaruriosfigueroa@gmail.com
  LinkedIn: https://www.linkedin.com/in/amaru-rios-figueroa-02a391319/
  GitHub  : https://github.com/Am4rv
        `);
        break;

      case 'cat':
        if (args[0] && args[0].toLowerCase() === 'cv.txt') {
          this.appendOutput(`Abriendo Bloc de notas con CV...`);
          window.windowManager.openWindow('win-notepad');
        } else {
          this.appendOutput(`Archivo no encontrado. Prueba: cat cv.txt`);
        }
        break;

      case 'theme':
        if (args[0] && ['bliss', 'royale', 'dark', 'matrix'].includes(args[0].toLowerCase())) {
          const t = args[0].toLowerCase();
          document.body.dataset.theme = t === 'bliss' ? '' : t;
          this.appendOutput(`Tema cambiado exitosamente a '${t}'.`);
        } else {
          this.appendOutput(`Uso: theme <bliss | royale | dark | matrix>`, true);
        }
        break;

      case 'matrix':
        const currentTheme = document.body.dataset.theme;
        document.body.dataset.theme = currentTheme === 'matrix' ? '' : 'matrix';
        this.appendOutput(`Modo Matrix: ${document.body.dataset.theme === 'matrix' ? 'ACTIVADO' : 'DESACTIVADO'}`);
        break;

      case 'clear':
      case 'cls':
        this.container.innerHTML = '';
        break;

      case 'exit':
        window.windowManager.closeWindow('win-cmd');
        break;

      case 'sudo':
        this.appendOutput(`¡Acceso concedido como Administrador! Amaru Ríos es Full-Stack Engineer con superpoderes.`);
        break;

      case 'date':
      case 'time':
        this.appendOutput(new Date().toString());
        break;

      case 'echo':
        this.appendOutput(args.join(' '));
        break;

      default:
        this.appendOutput(`'${command}' no se reconoce como un comando interno o externo.\nEscribe 'help' para ver la lista de comandos disponibles.`, true);
        window.xpSound.playError();
        break;
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.xpTerminal = new XPTerminal();
});
