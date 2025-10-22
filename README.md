# Ludix App UI

A modern React application built with TypeScript, Vite, and Chakra UI for the Ludix app.

## Tech Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Chakra UI** - Component library
- **Axios** - HTTP client
- **React Router DOM** - Routing

## Project Structure

```
ludix-app-ui-sever/
├── src/
│   ├── api/
│   │   └── AuthService.ts       # Authentication API service
│   ├── components/
│   │   └── PetAvatar.tsx        # Pet avatar component
│   ├── pages/
│   │   └── LoginPage.tsx        # Login page with email/password
│   ├── types/
│   │   └── User.ts              # User interface definition
│   └── main.tsx                 # App entry point with ChakraProvider
├── public/                      # Static assets
├── index.html                   # HTML entry point
├── vite.config.ts              # Vite configuration
├── tsconfig.json               # TypeScript configuration
└── package.json                # Dependencies and scripts
```

## Getting Started

### Prerequisites

- Node.js 20.x or higher
- npm 10.x or higher

### Installation

```bash
npm install
```

### Development

Start the development server:

```bash
npm run dev
```

The app will be available at `http://localhost:3000`

### Build

Build for production:

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

### Linting

Run ESLint:

```bash
npm run lint
```

## Backend Configuration

The app is configured to connect to a backend API at `http://localhost:8000`. This can be modified in `src/api/AuthService.ts`.

## Features

- ✅ Modern React with TypeScript and TSX
- ✅ Vite for fast development and optimized builds
- ✅ Chakra UI for consistent, accessible components
- ✅ Authentication service with Axios
- ✅ Type-safe user interface
- ✅ Responsive login page
- ✅ ESLint for code quality

## Security Notes

- Axios has been updated to version 1.12.0+ to address known vulnerabilities
- CodeQL security scanning: No vulnerabilities detected
- Development server (esbuild) has a moderate CORS-related vulnerability that only affects development, not production builds