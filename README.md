# TP8 — Clon Móvil de Instagram con React Native y Expo

Migración del TP06 (Instagram Web en React) hacia **React Native** bajo el ecosistema de **Expo**.

---

## Inicialización del entorno

```bash
npm install
npx expo start
```

Escanear el QR con la app **Expo Go** (iOS o Android) o presionar `a` para Android emulator / `i` para iOS simulator.

---

## Referencia visual (Figma)

- Comunidad Figma: [Instagram Mobile UI Kit](https://www.figma.com/community/file/1086605269028254083)
- Capturas de referencia: interfaz oficial de Instagram en Android (feed, perfil, detalle de post)

---

## Árbol de directorios

```
app/
└── (estructura dentro de src/)

src/
├── navigation/
│   └── AppNavigator.js       # Bottom Tab + Stack navigators
├── screens/
│   ├── HomeScreen.js         # Feed principal con Stories + FlatList de posts
│   ├── PostDetailScreen.js   # Vista extendida del post con comentarios y like reactivo
│   └── ProfileScreen.js      # Perfil del usuario con grilla FlatList numColumns=3
├── components/
│   ├── PostCard.js           # Componente atómico de cada post del feed
│   └── Stories.js            # Carrusel horizontal de historias
└── data/
    └── userData.js           # Datos mock: usuario, autores, leyendas, comentarios

assets/
├── icon.png                  # Ícono nativo de la app
├── splash.png                # SplashScreen personalizada
├── adaptive-icon.png         # Ícono adaptativo para Android
└── favicon.png               # Favicon para web

App.js                        # Entry point: NavigationContainer + SplashScreen
app.json                      # Configuración Expo (nombre, ícono, splash, bundle ID)
babel.config.js               # Configuración Babel para Expo
package.json                  # Dependencias del proyecto
```

---

## Componentes atómicos y props

### `PostCard.js`
Renderiza un ítem individual del feed. Recibe:

| Prop | Tipo | Descripción |
|------|------|-------------|
| `post` | Object | Objeto completo con `autorUsername`, `autorAvatar`, `imagenUrl`, `leyenda`, `ubicacion`, `likes`, `comentarios`, `tiempo` |
| `onPress` | Function | Callback que navega a `PostDetailScreen` pasando el post completo |

### `Stories.js`
Carrusel horizontal de historias. No recibe props; consume `historias` directamente del módulo `userData.js`.

---

## Estados (Hooks)

### Estados locales (`useState`)

| Componente | Estado | Descripción |
|---|---|---|
| `PostCard` | `conLike` | Si el usuario dio like al post |
| `PostCard` | `likes` | Contador de likes (reactivo al toggle) |
| `PostCard` | `guardado` | Si el post está guardado |
| `PostDetailScreen` | `conLike` | Like en la vista de detalle (independiente del feed) |
| `PostDetailScreen` | `likes` | Contador reactivo en detalle |
| `PostDetailScreen` | `guardado` | Estado de guardado en detalle |
| `HomeScreen` | `publicaciones` | Array de posts cargados desde la API |
| `HomeScreen` | `cargando` | Boolean para mostrar spinner |
| `HomeScreen` | `error` | Mensaje de error si falla la API |
| `ProfileScreen` | `publicaciones` | Posts del perfil cargados desde la API |
| `ProfileScreen` | `cargando` | Boolean para spinner en grilla |
| `ProfileScreen` | `tabActiva` | Tab seleccionada (`publicaciones` / `etiquetados`) |

### Efectos (`useEffect`)

- **`HomeScreen`**: al montar, dispara `cargarGatos()` → `axios.get` a The Cat API (15 imágenes) → mapea y setea `publicaciones`.
- **`ProfileScreen`**: al montar, dispara `cargarPublicaciones()` → `axios.get` a The Cat API (12 imágenes) → mapea y setea `publicaciones`.

---

## Arquitectura de navegación

```
NavigationContainer
└── BottomTabNavigator
    ├── Tab: Home → HomeStack (NativeStackNavigator)
    │   ├── Screen: Feed → HomeScreen
    │   └── Screen: PostDetail → PostDetailScreen
    └── Tab: Profile → ProfileScreen
```

El flujo completo: **Feed → (tap en post) → PostDetail** y **Profile → (tap en grilla) → PostDetail**.

---

## API utilizada

**[The Cat API](https://thecatapi.com/)** — `https://api.thecatapi.com/v1/images/search`

- No requiere API key para uso básico.
- Se solicitan 15 imágenes en el feed y 12 en el perfil.
- Cada respuesta incluye `id` y `url` de la imagen.

---

## Checklist de requisitos

- [x] Barra de navegación nativa (Bottom Tab + Stack Header)
- [x] Feed dinámico exclusivamente con `FlatList`
- [x] Mínimo 10 registros asincrónicos vía Axios (se cargan 15)
- [x] Estilos con `StyleSheet.create()` en todos los componentes
- [x] Interacciones con `TouchableOpacity` y `Pressable`
- [x] Flujo Feed → Detalle → Perfil completo y funcional
- [x] Grilla de 3 columnas con `FlatList numColumns={3}` en perfil
- [x] SplashScreen personalizada (`expo-splash-screen`)
- [x] Ícono nativo configurado en `app.json`
- [x] StatusBar estilizada (`expo-status-bar`)
- [x] `SafeAreaView` en todas las pantallas
- [x] Like interactivo con `useState` en detalle (cambia color + contador en tiempo real)
