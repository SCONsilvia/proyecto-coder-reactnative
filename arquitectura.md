# Arquitectura del Proyecto — DrawApp

## Resumen General

DrawApp es una app mobile para **registrar dibujos personales** y hacer seguimiento del progreso diario. Está construida con React Native / Expo y sigue una arquitectura **offline-first**: todo se guarda primero en SQLite local, y después se sincroniza en segundo plano con Firebase.

| Dato | Valor |
|---|---|
| Framework | React Native + Expo SDK 54 |
| Auth & Backend | Firebase (Auth + Firestore + Storage) |
| Base de datos local | SQLite (`expo-sqlite`) |
| Estado global | Redux Toolkit + redux-persist |
| Plataformas | Android, iOS, Web |

---

## Diagrama de Flujo de Pantallas

```
┌─────────────────────────────────────────────────────────────────┐
│                         RootNavigator                           │
│                                                                 │
│   ┌─────────────────┐    authChecked = false                    │
│   │  SplashScreen   │ ◄──────────────────────────               │
│   └─────────────────┘                                           │
│                                                                 │
│   ┌──────────────────────┐    uid = null                        │
│   │      AuthStack       │ ◄──────────────────                  │
│   │  ┌───────────────┐   │                                      │
│   │  │  LoginScreen  │   │                                      │
│   │  └───────┬───────┘   │                                      │
│   │          │ sin cuenta │                                     │
│   │  ┌───────▼──────────┐│                                      │
│   │  │ RegisterScreen   ││                                      │
│   │  └──────────────────┘│                                      │
│   └──────────────────────┘                                      │
│                                                                 │
│   ┌──────────────────────────┐  uid ok, email NO verificado     │
│   │ EmailVerificationScreen  │ ◄──────────────────────────      │
│   └──────────────────────────┘                                  │
│                                                                 │
│   ┌──────────────────────────────────────────────────────────┐  │
│   │                  AppStack (autenticado)                  │  │
│   │                                                          │  │
│   │   ┌───────────────────────────────────────────────────┐  │  │
│   │   │              TabNavigator (3 tabs)                │  │  │
│   │   │                                                   │  │  │
│   │   │  ┌──────────────┐  ┌───────────────┐  ┌──────────┐│  │  │
│   │   │  │  HomeStack   │  │ GalleryStack  │  │Settings  ││  │  │
│   │   │  │              │  │               │  │  Stack   ││  │  │
│   │   │  │ HomeScreen   │  │GalleryScreen  │  │Settings  ││  │  │
│   │   │  │    │         │  │    │   │      │  │Screen    ││  │  │
│   │   │  │    │ tap día │  │    │   │      │  └──────────┘│  │  │
│   │   │  │    ▼         │  │GalleryDay  ImageDetail       │  │  │
│   │   │  │GalleryDay    │  │Screen  │  Screen             │  │  │
│   │   │  │Screen        │  └────────┘                     │  │  │
│   │   │  └──────────────┘                                 │  │  │
│   │   └───────────────────────────────────────────────────┘  │  │ 
│   │                                                          │  │
│   │   ┌────────────────────────────────────┐                 │  │
│   │   │  UploadStack (modal sobre todo)    │                 │  │
│   │   │  UploadImageScreen → UploadDetails │                 │  │
│   │   └────────────────────────────────────┘                 │  │
│   └──────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
```

---

## Pantallas

| Pantalla | Qué hace |
|---|---|
| `SplashScreen` | Muestra un spinner mientras Firebase resuelve la sesión |
| `LoginScreen` | Formulario de email y contraseña con Formik + Yup |
| `RegisterScreen` | Registro de usuario + envío automático del email de verificación |
| `EmailVerificationScreen` | Espera a que el usuario verifique su email; permite reenviar el correo |
| `HomeScreen` | Pantalla principal: calendario de progreso, challenge del día, botón para subir |
| `GalleryScreen` | Grilla de dibujos con toggle entre activos y archivados |
| `GalleryDayScreen` | Dibujos de un día específico (se accede desde el calendario) |
| `ImageDetailScreen` | Detalle de un dibujo: imagen, título, descripción, editar, archivar |
| `UploadImageScreen` | Selección de imagen desde la cámara o la galería del dispositivo |
| `UploadDetailsScreen` | Formulario para título, descripción y asignación de challenge |
| `SettingsScreen` | Toggle de dark mode y opción para cerrar sesión |

---

## Arquitectura de Capas

```
┌─────────────────────────────────────────────────┐
│                   UI Layer                      │
│  screens/  ·  components/  ·  layouts/          │
└──────────────────────┬──────────────────────────┘
                       │ hooks (useXxx)
┌──────────────────────▼──────────────────────────┐
│                 Logic Layer                     │
│  hooks/  ·  features/ (Redux slices + thunks)   │
└────────────┬──────────────────────┬─────────────┘
             │                      │
┌────────────▼──────────┐  ┌───────▼───────────────┐
│   Local Data Layer    │  │  Remote Data Layer    │
│  services/database/   │  │  services/firebase/   │
│  SQLite               │  │  Firestore + Storage  │
└───────────────────────┘  └───────────────────────┘
             │                      │
┌────────────▼──────────────────────▼──────────────┐
│               Sync Engine (core/sync/)           │
│  Orquesta escrituras locales → subidas remotas   │
└──────────────────────────────────────────────────┘
```

### 1. UI Layer

- **`screens/`** — Las pantallas de la app. Cada una gestiona su propio estado de carga a través de hooks.
- **`components/`** — Piezas reutilizables: formularios, galería, calendario, botones, inputs.
- **`layouts/MainLayout`** — Wrapper con `SafeAreaView` y fondo adaptado al tema. Lo usan todas las pantallas.

### 2. Logic Layer

- **`hooks/`** — Encapsulan operaciones asíncronas (leer la base de datos, crear un dibujo, refrescar). Escuchan el `version` de Redux para saber cuándo tienen que actualizar los datos.
- **`features/auth/authThunks`** — Operaciones de Firebase Auth como thunks de Redux: login, register, logout, verificación de email.
- **`features/theme/themeSlice`** — Estado dark/light, persistido con redux-persist.

### 3. Local Data Layer (`services/database/`)

Tres tablas en SQLite:

| Tabla | Para qué sirve |
|---|---|
| `drawings` | Los dibujos del usuario con su estado de sincronización |
| `challenges` | Los challenges diarios descargados de Firestore |
| `sync_metadata` | Marcas de tiempo del último sync |

Se usa el patrón **Repository + Service**:
- `drawingRepository.js` — queries SQL directas
- `drawingService.js` — lógica de negocio por encima del repositorio

### 4. Remote Data Layer (`services/firebase/`)

| Archivo | Responsabilidad |
|---|---|
| `firebaseApp.js` | Inicialización del SDK con las variables de entorno |
| `firestoreService.js` | Leer y escribir metadata de dibujos |
| `storageService.js` | Subir imágenes a Firebase Storage |
| `downloadImage.js` | Bajar una imagen remota y guardarla localmente |

---

## Sistema de Sincronización (Offline-First)

Este es el núcleo diferencial del proyecto. Toda escritura pasa primero por SQLite y después se sincroniza con Firebase.

```
Usuario crea dibujo
       │
       ▼
Guarda en SQLite  ──────►  status = "pending"
       │                   pendingAction = "create"
       │
       ▼
drawingChanged() ──► Redux version++
       │
       ▼
syncTrigger (debounce 2s)
       │
       ▼
┌──────────────────────────────────────────┐
│           Sync Engine                    │
│                                          │
│  1. ¿Hay internet?  NO → salir           │
│  2. ¿Sync en curso? SÍ → encolar         │
│  3. uploadPending()                      │
│     ├─ Por cada drawing status=pending   │
│     │   ├─ "create" → subir imagen       │
│     │   │             → subir metadata   │
│     │   └─ "update" → actualizar         │
│     │                 metadata           │
│     └─ Marcar synced / failed            │
│  4. downloadRemote()                     │
│     ├─ Query Firestore desde lastSyncAt  │
│     ├─ Comparar timestamps               │
│     └─ Upsert cambios remotos en SQLite  │
│  5. syncChallengesIfNeeded() (semanal)   │
└──────────────────────────────────────────┘
```

**Resolución de conflictos:** Last-edit-wins (LEOW) por `updatedAtClient`.

**Cuándo se dispara el sync:**
- Al abrir la app (si hay sesión activa)
- Al recuperar la conexión a internet (listener de NetInfo)
- Al guardar o editar un dibujo (con debounce)

---

## Estado Global Redux

```
Redux Store
├── user (NO persistido)
│   ├── uid: string | null
│   ├── photoURL: string | null
│   ├── authChecked: boolean      ← controla qué stack mostrar
│   ├── emailVerified: boolean    ← controla EmailVerification screen
│   ├── loading: boolean
│   └── error: string | null
│
├── drawings (NO persistido)
│   └── version: number          ← se incrementa al mutar datos → invalida los hooks
│
└── theme (PERSISTIDO en AsyncStorage)
    └── isDark: boolean
```

El campo `version` en el slice `drawings` funciona como un **mecanismo de cache-busting**: cada vez que cambia, todos los hooks que usan `useSelector((s) => s.drawings.version)` se vuelven a ejecutar y leen los datos frescos desde la base de datos.

---

## Flujo de Autenticación Detallado

```
Inicio de la app
      │
      ▼
sessionManager.js  (onAuthStateChanged)
      │
      ├── Sin usuario ────────────► setUser({ uid: null, authChecked: true })
      │                                    → AuthStack
      │
      └── Con usuario
                │
                ├── emailVerified = false ──► setUser({ ..., authChecked: true })
                │                                  → EmailVerificationScreen
                │
                └── emailVerified = true ───► setUser({ ..., authChecked: true })
                                                    → AppStack + iniciar sync
```

---

## Árbol de Componentes Principales

```
App
└── SafeAreaProvider
    └── Redux Provider
        └── PersistGate
            └── AppContent (inicializa DB, Firebase, NetInfo, sync)
                └── NavigationContainer
                    └── RootNavigator
                        └── AppStack
                            └── TabNavigator
                                ├── HomeScreen
                                │   ├── ProgressCalendar   ← react-native-calendars
                                │   ├── TodayChallenge     ← challenge del día
                                │   └── AppButton (→ UploadStack)
                                │
                                ├── GalleryScreen
                                │   ├── Tabs toggle activos/archivados
                                │   └── Galeria (FlatList optimizada)
                                │       └── RenderItem (React.memo)
                                │
                                └── SettingsScreen
                                    ├── Switch dark mode
                                    └── AppButton logout
```

---

## Componentes UI Reutilizables

| Componente | Props clave | Descripción |
|---|---|---|
| `AppButton` | `title`, `onPress`, `variant` | Botón con variantes: `primary`, `outline`, `danger` |
| `AppInput` | `label`, `value`, `onChangeText`, `error` | Input con label y mensaje de error integrado |
| `RenderItem` | `item`, `onPress` | Celda de galería con badge de challenge y estado de sync |
| `DrawingForm` | `formik`, `challenge` | Formulario de título, descripción y toggle de challenge |
| `ProgressCalendar` | `uid` | Calendario con los días marcados; navega a GalleryDay al tocar |
| `TodayChallenge` | — | Muestra el challenge del día o un mensaje vacío |
| `ItemDetail` | `item`, `onEdit`, `onArchive` | Vista de detalle con acciones sobre el dibujo |
| `Camera` | `onCapture` | Botón para capturar una foto |
| `Galeria` | `items`, `onPress` | FlatList responsiva con memoización |

---

## Sistema de Temas

Todos los colores, espaciados y tipografías están centralizados en `constants/theme/`. En los componentes nunca se usan valores de color hardcodeados.

```
constants/theme/
├── colors.js      → paletas light & dark (primary, surface, text, error…)
├── typography.js  → tamaños de fuente (title: 22, body: 16, caption: 14…)
├── sizes.js       → padding, margin, borderRadius
├── index.js       → barrel export
└── useTheme.js    → hook: const { colors, isDark } = useTheme()
```

Colores principales:

| Token | Light | Dark |
|---|---|---|
| `primary` | `#4F46E5` (Indigo) | `#818CF8` |
| `background` | `#F8F8F8` | `#121212` |
| `surface` | `#FFFFFF` | `#1E1E1E` |
| `textPrimary` | `#1C1B1F` | `#E6E1E5` |
| `error` | `#B3261E` | `#F2B8B5` |

---

## Validación de Formularios

Se usa **Formik + Yup** en todas las pantallas que tienen formularios:

- `LoginScreen` — email requerido y válido, contraseña mínimo 6 caracteres
- `RegisterScreen` — igual que login + confirmación de contraseña
- `UploadDetailsScreen` — título requerido, descripción opcional

Los errores de Firebase se mapean a campos específicos del formulario en `services/auth/firebaseErrorMapper.js`:

```
firebase/auth/invalid-credential   →  campo "password"
firebase/auth/email-already-in-use →  campo "email"
firebase/auth/too-many-requests    →  mensaje general
```

---

## Permisos del Dispositivo

Gestionados en `permissions/permissionService.js`:

| Permiso | Cuándo se pide |
|---|---|
| Cámara | Al tocar "tomar foto" en UploadImageScreen |
| Galería / MediaLibrary | Al tocar "elegir de galería" en UploadImageScreen |

Si el permiso se deniega, se muestra un mensaje de error sin que la app se cierre.

---

## Deep Linking

La app responde al scheme `miapp://`:

| URL | Pantalla |
|---|---|
| `miapp://login` | LoginScreen |
| `miapp://register` | RegisterScreen |
| `miapp://home` | HomeScreen |
| `miapp://gallery` | GalleryScreen |
| `miapp://gallery/day/2026-05-28` | GalleryDayScreen |
| `miapp://gallery/:id` | ImageDetailScreen |
| `miapp://upload` | UploadImageScreen |

---

## Variables de Entorno

Definidas en `.env` con el prefijo `EXPO_PUBLIC_` para que Expo las exponga al bundle del cliente:

```
EXPO_PUBLIC_FIREBASE_API_KEY
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN
EXPO_PUBLIC_FIREBASE_PROJECT_ID
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
EXPO_PUBLIC_FIREBASE_APP_ID
```

---

## Dependencias Clave

| Categoría | Librería |
|---|---|
| Navegación | `@react-navigation/native`, `bottom-tabs`, `native-stack` |
| Estado | `@reduxjs/toolkit`, `react-redux`, `redux-persist` |
| Firebase | `firebase` v12 |
| Base de datos local | `expo-sqlite` |
| Formularios | `formik`, `yup` |
| Media | `expo-camera`, `expo-image-picker` |
| Calendario | `react-native-calendars` |
| IDs únicos | `nanoid` |
| Red | `@react-native-community/netinfo` |

---

## Decisiones de Diseño Notables

**Offline-first:** El usuario nunca espera a Firebase para guardar un dibujo. La app funciona sin internet y sincroniza cuando puede.

**Version counter en Redux:** En lugar de refetch por eventos, un número entero en el store invalida todos los hooks que leen datos. Es simple y efectivo.

**Repository pattern en SQLite:** Separa las queries SQL de la lógica de negocio, lo que hace más fácil cambiar de base de datos en el futuro.

**Thunks solo para auth:** La sincronización y la escritura de datos no usan thunks de Redux, porque esas operaciones van directo a SQLite. Redux solo modela el estado de sesión del usuario y el tema visual.

**FlatList memoizada:** `RenderItem` está envuelto en `React.memo` y `renderItem` en `useCallback` para evitar re-renders innecesarios al hacer scroll en galerías con muchos elementos.
