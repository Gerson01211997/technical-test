# Technical Test Application

Aplicación React con TypeScript que implementa autenticación, lista virtualizada de 2000 elementos, y arquitectura escalable con patrón Repository.

## 🚩 Aclaraciones Importantes

- Para el login se podría haber usado un proveedor como **Auth0** (no implementado por simplicidad, pero es lo recomendado para entornos productivos o reales).
- El correo y contraseña de prueba aparecen explícitamente en la pantalla de login para dar contexto y facilitar el acceso (test@test.com / 1234).
- No se implementó la totalidad de los test, por lo que la cobertura no es del 100%.
- La generación de token es manual y se realizó "a mano" sin usar librerías externas, para evitar cargas adicionales al proyecto (solo con fines de prueba técnica).
- Se crearon APIs internas para manejo de autenticación y datos, simulando endpoints reales.
- Se aplicó patrón **Repository** para los servicios de acceso a datos y lógica negocio.
- La arquitectura del frontend es **modular** para grandes bloques/módulos, y se usó **arquitectura atómica** (atomic design) para componentes pequeños y reutilizables.
- Para las traducciones utilicé un hook personalizado para no cargar la aplicación pero lo ideal sería utilizar i18n en routes pages o next-intl en app pages de nextjs

## 🚀 Características Implementadas

- ✅ **Autenticación con fake-login** (test@test.com / 1234)
- ✅ **Generación de token manual** (sin librería externa)
- ✅ **APIs internas** para autenticación y manejo de datos
- ✅ **Lista virtualizada** de 2000 elementos con @tanstack/react-virtual
- ✅ **Axios** configurado con interceptores para envío automático de tokens
- ✅ **Patrón Repository** para gestión de datos
- ✅ **Protección de rutas** con middleware y componentes protegidos
- ✅ **Zustand** para estado global con persistencia
- ✅ **Responsive Design** con Tailwind CSS
- ✅ **Tests** con Jest y React Testing Library
- ✅ **Pre-commit hooks** con Husky, Biome y coverage

## 📦 Instalación y Ejecución

```bash
# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev

# Abrir en navegador
http://localhost:3000
```

## 🔐 Credenciales de Acceso

- **Email:** test@test.com
- **Contraseña:** 1234

## 🧪 Testing

```bash
# Ejecutar todos los tests
npm test

# Ejecutar tests con coverage (requiere 80%)
npm run test:coverage

# Ejecutar tests en modo watch
npm run test:watch
```

**Nota:** No se implementó el 100% de los tests requeridos. Existen áreas sin cobertura total, por enfoque en funcionalidades principales.

## 🎨 Linting y Formateo

```bash
# Ejecutar linter
npm run lint

# Formatear código
npm run format

# Verificar y aplicar correcciones
npm run check
```

## 🏗️ Arquitectura

### Estructura del Proyecto

```
src/
├── app/
│   ├── api/
│   │   ├── list/           # Endpoint interno para la lista
│   │   ├── login/          # Endpoint interno para login
│   │   ├── logout/         # Endpoint interno para logout
│   │   └── user/           # Endpoint usuario
│   ├── globals.css
│   ├── home/               # Página Home (ruta protegida)
│   ├── layout.tsx          # Layout con Providers
│   └── login/              # Página Login (ruta pública)
├── components/
│   ├── atoms/              # Componentes atómicos (Button, Input, Modal)
│   └── Header/             # Header principal
├── hooks/                  # Hooks generales
├── middleware.ts           # Middleware para protección de rutas
├── modules/
│   ├── home/               # Módulo de Home
│   │   └── listView/       # Vistas y componentes de lista
│   └── login/              # Módulo de Login
├── providers/              # Providers de contexto
├── services/
│   ├── config/             # Configuraciones de entorno
│   ├── hooks/              # Hooks de servicios (API)
│   ├── mocks/              # Mocks para tests y desarrollo
│   ├── repository/
│   │   ├── hooks/          # Hooks de acceso a datos (auth, list)
│   │   └── repositories/   # Repositorios de dominio (Auth, List, Base)
│   └── services/           # Tipos y utilidades de servicios
├── setupTests.ts           # Configuración de testing
├── types/                  # Tipos globales TS
└── utils/                  # Utilidades universales
```

### Patrón Repository

El proyecto implementa el patrón Repository siguiendo programación funcional:

1. **useCallbackApi**: Cliente Axios configurado con interceptores
2. **ListRepository**: Repository para gestión de datos de la lista
3. **Custom Hooks**: useGetAllList para consumir datos con React Query

```typescript
// Ejemplo de uso
const { data, isLoading, isError } = useGetAllList();
```

### Sistema de Autenticación

#### Arquitectura Público/Privado

**Rutas Públicas:**
- `/login` - Accesible sin autenticación
- `/` - Redirige según estado de autenticación

**Rutas Privadas:**
- `/home` - Requiere autenticación válida

#### Flujo de Autenticación

1. Usuario ingresa credenciales en `/login`
2. Validación con credenciales específicas (test@test.com / 1234)
3. Generación de token fake
4. Almacenamiento en Zustand con persistencia en localStorage
5. Redirección automática a `/home`
6. Token incluido automáticamente en todas las requests HTTP via Axios interceptors

#### Protección de Rutas

**Nivel 1 - Middleware (Server-side)**
```typescript
// middleware.ts
- Protege rutas antes de renderizar
- Redirige automáticamente según estado de autenticación
```

**Nivel 2 - ProtectedRoute Component (Client-side)**
```typescript
// ProtectedRoute.tsx
- Verifica autenticación en cliente
- Maneja estados de carga
- Redirige si no hay sesión válida
```

### Gestión de Estado

**Zustand Store:**
- Estado global ligero y eficiente
- Persistencia automática en localStorage
- Sin boilerplate innecesario

**React Query:**
- Cache inteligente de datos
- Sincronización automática
- Estados de loading/error manejados

## 🎯 Virtualización de Lista

### ¿Por qué virtualización?

La lista de 2000 elementos está virtualizada usando **@tanstack/react-virtual** por las siguientes razones:

#### Ventajas

1. **Rendimiento Optimizado**
   - Solo renderiza elementos visibles en viewport (~10-20 elementos)
   - Reduce renderizados de 2000 a ~20 elementos
   - Mejora significativa en FPS y tiempo de carga

2. **Uso Eficiente de Memoria**
   - Reduce uso de memoria en ~80%
   - No mantiene 2000 elementos en el DOM
   - Mejor para dispositivos con recursos limitados

3. **Escalabilidad**
   - Soporta listas de miles o millones de elementos
   - Performance consistente independiente del tamaño
   - No degrada con el tiempo

4. **Experiencia de Usuario**
   - Scroll suave y fluido
   - Sin lag o congelamiento
   - Responsive en todos los dispositivos

#### Implementación

```typescript
const virtualizer = useVirtualizer({
  count: items.length,
  getScrollElement: () => parentRef.current,
  estimateSize: () => 110, // Altura estimada
  overscan: 5, // Renderiza 5 items extra
});
```

## 🔧 Configuración de Axios

### Interceptores Configurados

**Request Interceptor:**
```typescript
- Obtiene token del localStorage
- Agrega automáticamente header Authorization
- Se aplica a todas las requests
```

**Response Interceptor:**
```typescript
- Maneja errores 401 (token inválido)
- Limpia sesión automáticamente
- Redirige a login en caso de error de autenticación
```

### Uso

```typescript
// Automáticamente incluye el token
const data = await useCallbackApi('/endpoint', {
  method: 'GET',
  params: { page: 1 }
});
```

## 🔒 Pre-commit Hooks

El proyecto incluye hooks de pre-commit que se ejecutan automáticamente:

1. **Biome Linter**
   - Verifica código antes de commit
   - Aplica correcciones automáticas
   - Falla si hay errores que no se pueden auto-corregir

2. **Coverage Tests**
   - Ejecuta tests con coverage
   - Requiere mínimo 80% de cobertura
   - Falla el commit si no se cumple el threshold

### Configuración

```json
{
  "lint-staged": {
    "src/**/*.{ts,tsx}": [
      "biome check --apply",
      "npm run test:coverage"
    ]
  }
}
```

## 📊 Coverage

El proyecto mantiene un mínimo de **80% de cobertura** en:
- Statements
- Branches
- Functions
- Lines

**Archivos excluidos del coverage:**
- `src/app/**/*` (páginas de Next.js)
- `src/**/*.d.ts` (archivos de definición de tipos)

## 🚀 Mejoras Propuestas para Backend Efficiency

### 1. Paginación Real
**Problema actual:** Cargar 2000 elementos de una vez
**Solución:** Implementar paginación server-side
```typescript
GET /api/items?page=1&limit=50
```
**Beneficios:**
- Reduce payload de respuesta
- Mejora tiempo de carga inicial
- Reduce uso de memoria en servidor

### 2. Infinite Scroll
**Implementación:** Cargar datos bajo demanda
```typescript
- Usar IntersectionObserver
- Cargar siguiente página al llegar al final
- Mantener solo páginas visibles en memoria
```

### 3. Cache Strategy Mejorada
**Implementación:**
```typescript
- Cache con TTL (Time To Live)
- Invalidación selectiva por categorías
- Background refresh de datos stale
- Service Workers para cache offline
```

### 4. Compresión de Datos
**Técnicas:**
- Gzip/Brotli en respuestas
- Minificación de JSON
- Compresión de imágenes

### 5. GraphQL o REST Optimizado
**Ventajas:**
- Solicitar solo campos necesarios
- Reducir over-fetching
- Batching de múltiples queries

### 6. Server-Side Caching
**Implementación:**
- Redis para cache de queries frecuentes
- CDN para datos estáticos
- Edge caching para usuarios geográficamente distribuidos

### 7. Optimistic Updates
**Implementación:**
- Actualizar UI inmediatamente
- Sincronizar con servidor en background
- Rollback en caso de error

## 📝 Scripts Disponibles

```bash
npm run dev          # Servidor de desarrollo
npm run build        # Build de producción
npm run start        # Servidor de producción
npm run lint         # Linter con Biome
npm run format       # Formatear código
npm run check        # Verificar y corregir
npm test            # Ejecutar tests
npm run test:coverage # Tests con coverage
npm run test:watch   # Tests en modo watch
```

## 🛠️ Tecnologías Utilizadas

- **Next.js 15** - Framework React con App Router
- **TypeScript 5** - Tipado estático
- **Tailwind CSS 4** - Estilos utilitarios
- **Zustand** - Estado global
- **Axios** - Cliente HTTP
- **@tanstack/react-query** - Data fetching y cache
- **@tanstack/react-virtual** - Virtualización de listas
- **Jest** - Testing framework
- **React Testing Library** - Testing de componentes
- **Biome** - Linter y formatter
- **Husky** - Git hooks
- **lint-staged** - Pre-commit validation
- **APIs internas**: (rutas Next.js app/api) para simular autenticación y listado

## 📱 Responsive Design

La aplicación es completamente responsive:
- **Mobile First:** Diseño optimizado para móviles
- **Tablet:** Layout adaptativo
- **Desktop:** Experiencia completa

## 🔐 Seguridad

- Middleware para protección de rutas server-side
- Verificación de autenticación client-side
- Token management seguro
- Limpieza automática de sesión en errores 401

## 📈 Escalabilidad

### Arquitectura Modular
- Separación clara de responsabilidades
- Patrón Repository para abstracción de datos
- Componentes reutilizables
- Hooks personalizados

## 👨‍💻 Desarrollo

### Convenciones de Código
- Programación funcional (no OOP)
- Componentes funcionales con hooks
- TypeScript estricto
- Naming conventions consistentes

### Git Workflow
1. Los cambios pasan por pre-commit hooks
2. Biome verifica el código
3. Tests con 80% coverage deben pasar
4. Solo entonces se permite el commit

