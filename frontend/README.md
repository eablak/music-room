# 🚀 Expo Enterprise Boilerplate

[![Expo SDK 54](https://img.shields.io/badge/Expo-SDK%2054-000000?style=for-the-badge&logo=expo&logoColor=white)](https://expo.dev)
[![React Native 0.81](https://img.shields.io/badge/React%20Native-0.81-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactnative.dev)
[![TypeScript 5.9](https://img.shields.io/badge/TypeScript-5.9-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Redux Toolkit](https://img.shields.io/badge/Redux%20Toolkit-2.12-764ABC?style=for-the-badge&logo=redux&logoColor=white)](https://redux-toolkit.js.org)
[![Author](https://img.shields.io/badge/Author-Hüseyin%20Demirel-FF5722?style=for-the-badge&logo=github&logoColor=white)](https://github.com/HsynDmrl)

A production-ready, enterprise-grade **React Native** & **Expo** boilerplate engineered for building scalable, high-performance, and maintainable cross-platform mobile (iOS & Android) and Web applications.

Built with **Expo Router v6**, **Redux Toolkit**, **RTK Query**, **Two-Tier Storage Architecture**, **Authentication Guards**, **Theme System**, and **Comprehensive Unit Testing**.

---

## 🌟 Key Features

- **📱 Expo Router v6**: File-based routing with typed routes, tab navigation, nested layouts, and session-based authentication guards.
- **⚡ Two-Tier Storage Facade**:
  - **`fastStorage`**: Powered by `react-native-mmkv` (~30x faster than AsyncStorage) with automatic in-memory & `localStorage` fallback for Expo Go and Web compatibility.
  - **`secureStorage`**: Powered by `expo-secure-store` (iOS Keychain & Android Keystore) for hardware-encrypted sensitive data, with built-in key sanitization.
- **🔐 Enterprise Auth Architecture**: `AuthProvider` with token storage, session restoration, auto-logout on token expiration (401 interceptor), and route protection.
- **🔄 State Management & API Integration**: Redux Toolkit for global state and RTK Query for caching, tag invalidation, and automatic background refetching on network reconnect.
- **🌐 Offline Resilience & Global Error Handling**:
  - `OfflineBanner` component that triggers when network connection drops.
  - Global error handler with customizable toast notifications.
  - Request/Response interceptors configured out-of-the-box.
- **🎨 Modern Design & Theme System**: `ThemeProvider` with dark, light, and system theme preferences, custom color palettes, and micro-animations via `moti` and `react-native-reanimated`.
- **🧪 Testing & Quality Assurance**: Pre-configured Jest setup with `@testing-library/react-native`, strict TypeScript typechecking, and ESLint.

---

## 📂 Project Architecture

The codebase follows a clean, modular layer architecture separating application routes, core domain logic, state management, and UI components.

```
expo-enterprise-boilerplate/
├── app/                        # Expo Router Pages & Navigation Groups
│   ├── (auth)/                 # Unauthenticated Routes (login, register, forgot-password, terms)
│   ├── (tabs)/                 # Main Authenticated Tab Navigation (index, profile, settings)
│   ├── _layout.tsx             # Root Provider Stack & Session Gate
│   └── +not-found.tsx          # 404 Screen
├── assets/                     # Fonts, Images, and Static Assets
├── hooks/                      # Custom React Hooks
└── src/                        # Main Source Directory
    ├── components/             # UI Components (common, feedback, layouts)
    │   ├── common/             # Reusable UI (Button, Input, AuthScreenWrapper, OfflineBanner)
    │   └── feedback/           # Toast, Loading Spinners
    ├── constants/              # App Configurations & Storage Keys
    ├── core/                   # Core Logic & Infrastructure
    │   ├── auth/               # Auth Context Provider & Session Logic
    │   ├── exceptions/         # Global Error Handler & Exceptions
    │   └── network/            # Axios Setup, Base Client & Interceptors
    ├── store/                  # Redux Store Configuration
    │   ├── api/                # RTK Query Base API & Endpoints
    │   └── slices/             # Redux Slices
    ├── theme/                  # Theme Provider, Color Tokens & Typography
    ├── types/                  # TypeScript Interfaces & Type Definitions
    └── utils/                  # Utility Functions (storage facade, validators)
```

---

## 🛠️ Tech Stack

| Domain | Technology / Library |
| :--- | :--- |
| **Framework** | [Expo SDK 54](https://expo.dev) / [React Native 0.81](https://reactnative.dev) |
| **Language** | [TypeScript 5.9](https://www.typescriptlang.org) |
| **Routing** | [Expo Router 6](https://docs.expo.dev/router/introduction/) |
| **State Management** | [Redux Toolkit](https://redux-toolkit.js.org) & [RTK Query](https://redux-toolkit.js.org/rtk-query/overview) |
| **Storage** | [react-native-mmkv](https://github.com/mrousavy/react-native-mmkv) & [expo-secure-store](https://docs.expo.dev/versions/latest/sdk/securestore/) |
| **Animations** | [Moti](https://moti.fyi) & [React Native Reanimated](https://docs.swmansion.com/react-native-reanimated/) |
| **Icons** | [Lucide React Native](https://lucide.dev) & [@expo/vector-icons](https://icons.expo.fyi) |
| **Forms & Validation** | [Formik](https://formik.org) & [Yup](https://github.com/jquense/yup) |
| **HTTP Client** | [Axios](https://axios-http.com) |
| **Testing** | [Jest 29](https://jestjs.io) & [React Native Testing Library](https://callstack.github.io/react-native-testing-library/) |

---

## ⚡ Quick Start

### 1. Prerequisites
Ensure you have the following installed on your machine:
- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [Expo Go](https://expo.dev/client) app on your mobile device (for quick testing) or Android Studio / Xcode for simulators.

### 2. Clone the Repository
```bash
git clone https://github.com/HsynDmrl/Expo-enterprise-boilerplate.git
cd Expo-enterprise-boilerplate
```

### 3. Install Dependencies
```bash
npm install --legacy-peer-deps
```

### 4. Configure Environment Variables
Copy the `.env.example` file to `.env`:
```bash
cp .env.example .env
```
Default `.env` configuration:
```env
EXPO_PUBLIC_API_BASE_URL=https://jsonplaceholder.typicode.com
```

### 5. Start the Development Server
```bash
npx expo start -c
```

- Scan the generated QR code with **Expo Go** (Android) or **Camera App** (iOS).
- Press `w` to launch the Web application in your browser.
- Press `a` for Android Emulator or `i` for iOS Simulator.

---

## 📜 Available Scripts

In the project directory, you can run:

| Command | Description |
| :--- | :--- |
| `npm run dev` | Starts the Expo development bundler with telemetry disabled |
| `npm run build:web` | Exports a static production build for the Web platform |
| `npm run typecheck` | Runs the TypeScript compiler check (`tsc --noEmit`) |
| `npm test` | Runs all unit tests with Jest |
| `npm run test:watch` | Runs Jest tests in watch mode |
| `npm run test:coverage` | Generates an interactive code coverage report |
| `npm run lint` | Runs ESLint to check for code style issues |

---

## 🛡️ Enterprise Architecture Highlights

### Two-Tier Storage Architecture
The boilerplate abstracts storage into two distinct layers:
1. **`fastStorage`**: Used for UI preferences, themes, and cached state. Uses `MMKV` for high-performance synchronous access, automatically falling back to an in-memory/localStorage layer when running in Expo Go or Web environments.
2. **`secureStorage`**: Used for hardware-encrypted sensitive tokens (JWT, Refresh Tokens). Sanitizes keys to strictly comply with iOS Keychain & Android Keystore rules.

### Automatic Network Reconnect & Invalidation
When the user's connection drops, the app presents an `OfflineBanner`. Upon reconnecting, RTK Query automatically invalidates cache tags (`baseApi.util.invalidateTags`) to fetch fresh data silently in the background.

---

## 👨‍💻 Author

Developed and maintained by **Hüseyin Demirel**:
- **GitHub**: [@HsynDmrl](https://github.com/HsynDmrl)
- **Repository**: [Expo-enterprise-boilerplate](https://github.com/HsynDmrl/Expo-enterprise-boilerplate)

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
