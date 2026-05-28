# proyectoReactNativeCoderhouse

Aplicación móvil desarrollada con React Native y Expo como proyecto del curso de Coderhouse. Permite a los usuarios registrarse, iniciar sesión y gestionar un listado de imágenes/dibujos organizados por día, con soporte para la cámara y la galería del dispositivo.

---

## Características principales

- Autenticación de usuarios con Firebase (registro, login, logout)
- Navegación por pestañas: Inicio, Galería y Configuración
- Subida y visualización de imágenes
- Galería organizada por día con calendario
- Estado global manejado con Redux Toolkit y persistencia con `redux-persist`
- Formularios con Formik y validación con Yup

---

## Requisitos previos

Antes de empezar, asegurate de tener instalado:

- [Node.js](https://nodejs.org/) v18 o superior
- [Expo CLI](https://docs.expo.dev/get-started/installation/) (`npm install -g expo-cli`)
- Una cuenta en [Firebase](https://firebase.google.com/) con un proyecto creado
- Opcionalmente: [Android Studio](https://developer.android.com/studio) para correrlo en emulador Android, o la app **Expo Go** en tu celular

---

## Instalación

1. Cloná el repositorio:

```bash
git clone <url-del-repo>
cd proyectoReactNativeCoderhouse
```

2. Instalá las dependencias:

```bash
npm install
```

---

## Configuración del `.env`

El proyecto usa variables de entorno para conectarse a Firebase. Creá un archivo `.env` en la raíz del proyecto con el siguiente contenido, reemplazando cada valor por los datos de tu proyecto de Firebase:

```env
EXPO_PUBLIC_FIREBASE_API_KEY=tu_api_key
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=tu_proyecto.firebaseapp.com
EXPO_PUBLIC_FIREBASE_PROJECT_ID=tu_proyecto_id
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=tu_proyecto.appspot.com
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=tu_sender_id
EXPO_PUBLIC_FIREBASE_APP_ID=tu_app_id
```

Podés encontrar estos valores en la consola de Firebase: **Configuración del proyecto → Tus apps → SDK de Firebase**.

> El prefijo `EXPO_PUBLIC_` es obligatorio para que Expo exponga estas variables al código de la app.

---

## Cómo correr el proyecto

```bash
npm start          # Abre el servidor de desarrollo de Expo
npm run android    # Corre en emulador o dispositivo Android
```

Una vez que corra `npm start`, podés escanear el QR con la app **Expo Go** en tu celular para verlo en el dispositivo físico.

---

## Estructura del proyecto

```
src/
├── components/     # Componentes reutilizables
├── constants/      # Colores, tipografía y espaciado (theme)
├── core/           # Lógica central (ej: sesión con Firebase)
├── features/       # Slices de Redux y thunks por funcionalidad
├── hooks/          # Custom hooks
├── layouts/        # Layouts base de pantallas
├── navigation/     # Definición de navegadores y stacks
├── permissions/    # Manejo de permisos del dispositivo
├── screens/        # Pantallas de la app
├── services/       # Firebase y otros servicios externos
└── store/          # Configuración del store de Redux
```

---

## Tecnologías usadas

| Tecnología | Uso |
|---|---|
| React Native + Expo | Base de la aplicación |
| Firebase Auth | Autenticación de usuarios |
| Firebase Firestore | Base de datos |
| Firebase Storage | Almacenamiento de imágenes |
| Redux Toolkit | Estado global |
| redux-persist | Persistencia del estado |
| React Navigation | Navegación entre pantallas |
| Formik + Yup | Formularios y validación |
| expo-camera / expo-image-picker | Acceso a cámara y galería |
