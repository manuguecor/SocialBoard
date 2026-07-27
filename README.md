# SocialBoard

SocialBoard es una aplicación web desarrollada como Trabajo Fin de Máster cuyo objetivo es combinar las funcionalidades de una red social con un editor de pizarras tácticas para facilitar el intercambio de conocimiento futbolístico entre entrenadores, jugadores y aficionados.

---

## Características principales

- Registro e inicio de sesión mediante Firebase Authentication.
- Gestión de perfiles de usuario.
- Edición del perfil.
- Creación de publicaciones.
- Asociación opcional de una pizarra táctica a cada publicación.
- Editor gráfico interactivo de pizarras tácticas.
- Comentarios y respuestas anidadas.
- Persistencia de datos mediante Cloud Firestore.
- Interfaz responsive desarrollada con Tailwind CSS.

---

## Tecnologías utilizadas

| Tecnología | Versión |
|------------|----------|
| Node.js | >= 20.20.2 |
| Next.js | 16.2.4 |
| React | 19.2.4 |
| TypeScript | >= 5 |
| Firebase | >= 12.12.1 |
| React Konva | 19.2.3 |
| Tailwind CSS | 4.2.4 |
| Zustand | 5.0.12 |
| React Hook Form | 19.2.4 |

---

## Requisitos

- Node.js 20 o superior
- npm 10 o superior
- Proyecto Firebase configurado

---

## Instalación

Clonar el repositorio:

```bash
git clone https://github.com/manuguecor/SocialBoard.git

cd socialboard
```

Instalar dependencias:

```bash
npm install
```

Iniciar el proyecto:

```bash
npm run dev
```

Abrir:

```
http://localhost:3000
```

---

## Scripts disponibles

```bash
npm run dev
```

Inicia el servidor de desarrollo.

```bash
npm run build
```

Genera la versión de producción.

```bash
npm run start
```

Ejecuta la aplicación en producción.

---

## Estructura del proyecto

```
src/
│
├── app/
├── components/
├── features/
│   ├── auth/
│   ├── boards/
│   ├── comments/
│   ├── posts/
│   └── users/
├── lib/
├── store/
└── types/
```

---

## Funcionalidades

### Autenticación

- Registro de usuarios.
- Inicio de sesión.
- Cierre de sesión.
- Gestión de sesión mediante Firebase Authentication.

### Gestión de usuarios

- Consulta del perfil.
- Edición del perfil.
- Cambio de avatar.
- Actualización automática de publicaciones y comentarios tras modificar el perfil.

### Publicaciones

- Crear publicaciones.
- Asociar una pizarra táctica.
- Visualizar publicaciones.
- Visualizar detalle.

### Comentarios

- Crear comentarios.
- Responder comentarios.
- Comentarios anidados.

### Pizarras tácticas

- Campo completo.
- Medio campo.
- Área.

Elementos disponibles:

- Jugadores azules.
- Jugadores rojos.
- Balón.
- Flechas.
- Líneas.

---

## Base de datos

La aplicación utiliza Cloud Firestore.

Colecciones principales:

- users
- posts
- comments
- boards

---

## Autor

Manuel Guerra Cordón

Trabajo Fin de Máster

Máster Universitario en Diseño y Desarrollo de Interfaz de Usuario Web (Front-End Design and Development)

Universidad Internacional de La Rioja (UNIR)

Curso 2025-2026

---

## Licencia

Este proyecto ha sido desarrollado con fines académicos como Trabajo Fin de Máster.
