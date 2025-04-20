# Catálogo de Productos

Este es un proyecto de [Next.js](https://nextjs.org) para mostrar y gestionar un catálogo de productos con carrito de compras.

## Características

- 🛍️ Catálogo de productos
- 🛒 Carrito de compras
- 💳 Proceso de checkout
- 📱 Diseño responsivo
- 🎨 Tema personalizable con Tailwind CSS

## Requisitos Previos

- Node.js 18.0 o superior
- npm o pnpm

## Instalación

```bash
# Clonar el repositorio
git clone <url-del-repositorio>

# Instalar dependencias
npm install
# o
pnpm install
```

## Desarrollo

Inicia el servidor de desarrollo:

```bash
npm run dev
# o
pnpm dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador para ver la aplicación.

## Estructura del Proyecto

```
catalogo-productos/
├── app/                    # Directorio principal de la aplicación
│   ├── components/        # Componentes reutilizables
│   │   ├── cart/         # Componentes relacionados al carrito
│   │   └── ui/           # Componentes de interfaz común
│   ├── lib/              # Utilidades y funciones auxiliares
│   ├── api/              # Rutas de API
│   └── page.tsx          # Página principal
├── context/              # Contextos de React (ej: CartContext)
├── public/               # Archivos estáticos
│   └── images/          # Imágenes del proyecto
├── styles/              # Estilos globales y módulos CSS
├── types/               # Definiciones de tipos TypeScript
└── package.json         # Dependencias y scripts del proyecto
```

## Scripts Disponibles

- `npm run dev` - Inicia el servidor de desarrollo
- `npm run build` - Construye la aplicación para producción
- `npm run start` - Inicia el servidor de producción
- `npm run lint` - Ejecuta el linter
- `npm run test` - Ejecuta las pruebas

## Tecnologías Principales

- [Next.js](https://nextjs.org/) - Framework de React
- [TypeScript](https://www.typescriptlang.org/) - Superset de JavaScript
- [Tailwind CSS](https://tailwindcss.com/) - Framework de CSS
- [Shadcn UI](https://ui.shadcn.com/) - Componentes de UI

## Deploy

La forma más sencilla de desplegar la aplicación es usando la [Plataforma Vercel](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).

Para más detalles, consulta la [documentación de despliegue de Next.js](https://nextjs.org/docs/app/building-your-application/deploying).

## Licencia

MIT
