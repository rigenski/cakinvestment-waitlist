# Frontpage Base Template

A modern Next.js 16 application template with authentication, state management, and a well-structured architecture. This template serves as a foundation for building scalable web applications with TypeScript, Tailwind CSS, and modern React patterns.

## 🚀 Tech Stack

- **Framework**: Next.js 16.0.1 with App Router (Turbopack enabled)
- **Language**: TypeScript 5.9.3
- **React**: React 19.2.0 with React DOM 19.2.0
- **Styling**: Tailwind CSS 4.1.16
- **State Management**: Zustand 5.0.8
- **Data Fetching**: TanStack Query 5.90.6
- **Forms**: React Hook Form 7.66.0
- **HTTP Client**: Axios 1.13.1
- **UI Components**: Custom components with Motion 12.23.24 animations
- **Icons**: Iconify React 6.0.2
- **Notifications**: Sonner 2.0.7
- **Progress Bar**: BProgress Core 1.3.4
- **Fonts**: Inter & Poppins (Google Fonts)
- **Validation**: Zod 4.1.12
- **Environment**: T3 Env 0.13.8

## 📁 Project Structure

```
src/
├── app/                          # Next.js App Router
│   ├── (auth)/                   # Authentication route group
│   │   ├── _components/          # Auth-specific components
│   │   │   └── providers.tsx     # Auth context providers
│   │   ├── layout.tsx            # Auth layout with redirect logic
│   │   └── login/                # Login page
│   │       ├── _components/      # Login-specific components
│   │       │   └── container.tsx # Login container component
│   │       └── page.tsx          # Login page component
│   ├── (protected)/              # Protected route group
│   │   ├── _components/          # Protected-specific components
│   │   │   └── providers.tsx     # Protected context providers
│   │   ├── layout.tsx            # Protected layout with auth guard
│   │   └── dashboard/            # Dashboard page
│   │       ├── _components/      # Dashboard-specific components
│   │       │   └── container.tsx # Dashboard container component
│   │       └── page.tsx          # Dashboard page component
│   ├── (public)/                 # Public route group
│   │   ├── _components/          # Public-specific components
│   │   │   └── container.tsx     # Public container component
│   │   └── page.tsx              # Public homepage
│   ├── api/                      # API routes
│   │   └── logout/               # Logout API endpoint
│   │       └── route.ts          # Logout route handler
│   └── layout.tsx                # Root layout with global providers
├── components/                   # Shared UI components
│   ├── progress-bar.tsx          # Global progress bar component
│   └── providers.tsx             # Global context providers
├── constants/                    # Application constants
│   ├── env.ts                    # Environment variable definitions
│   └── session.ts                # Session-related constants
├── services/                     # API service layer
│   ├── auth/                     # Authentication services
│   │   ├── index.ts              # Auth service functions
│   │   └── types.ts              # Auth type definitions
│   └── user/                     # User services
│       ├── index.ts              # User service functions
│       └── types.ts              # User type definitions
├── stores/                       # State management
│   ├── auth.tsx                  # Authentication store (Zustand)
│   └── config.tsx                # Configuration store
├── styles/                       # Global styles
│   └── globals.css               # Global CSS with Tailwind imports
├── types/                        # TypeScript type definitions
│   ├── request.ts                # Request type definitions
│   └── response.ts               # Response type definitions
└── utils/                        # Utility functions
    ├── api.ts                    # API utility functions
    ├── classname.ts              # CSS class name utilities
    └── session.ts                # Session management utilities
```

## 🏗️ Architecture Overview

### Route Groups

- **`(auth)`**: Routes for unauthenticated users (login, register)
- **`(protected)`**: Routes requiring authentication (dashboard, profile)
- **`(public)`**: Publicly accessible routes (landing page)

### Authentication Flow

1. **Token Verification**: Server-side token validation in layout components
2. **Redirect Logic**: Automatic redirects based on authentication status
3. **State Management**: Zustand store for client-side auth state
4. **Session Persistence**: JWT tokens stored in secure HTTP-only cookies

### API Architecture

- **Service Layer**: Organized by domain (auth, user)
- **Type Safety**: Full TypeScript coverage for requests/responses
- **Error Handling**: Centralized error handling with custom error types
- **Interceptors**: Automatic token attachment and error handling

### State Management

- **Zustand**: Lightweight state management for client state
- **React Query**: Server state management and caching
- **Context Providers**: Component-specific state providers

## 🚀 Getting Started

### Prerequisites

- **Node.js**: 20.9.0 or higher (required for Next.js 16)
- **pnpm**: Recommended package manager (npm/yarn also supported)
- **TypeScript**: 5.1.0 or higher (included in dependencies)

### Installation

```bash
# Install dependencies
pnpm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your configuration
```

### Environment Variables

The project uses T3 Env for type-safe environment variable validation. Create a `.env.local` file with the following variables:

```env
NEXT_PUBLIC_FE_URL=http://localhost:3000
NEXT_PUBLIC_BE_URL=your_backend_url
```

All environment variables are validated at build time using Zod schemas. See `src/constants/env.ts` for the complete schema definition.

### Development

```bash
# Start development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start

# Run linting
pnpm lint
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## 🔧 Key Features

### Authentication System

- JWT-based authentication with server-side verification
- Automatic token refresh and session management
- Route protection with layout-based guards
- Secure logout with token invalidation

### UI/UX

- Responsive design with Tailwind CSS 4
- Custom progress bar for page transitions
- Smooth animations with Motion library
- Toast notifications with Sonner
- Modern typography with Inter and Poppins fonts
- Optimized font loading with font-display: swap

### Developer Experience

- Full TypeScript support with strict type checking
- ESLint configuration for code quality (ESLint 9.39.1)
- Prettier integration with Tailwind CSS plugin
- Hot reload with Turbopack (default in Next.js 16)
- Environment variable validation with T3 Env
- Type-safe API layer with Zod validation

## 📝 Usage Guidelines

### Adding New Pages

1. Create page component in appropriate route group
2. Add container component for business logic
3. Implement proper TypeScript types
4. Add authentication guards if needed

### Adding New Services

1. Create service directory in `src/services/`
2. Define types in `types.ts`
3. Implement API functions in `index.ts`
4. Export functions for use in components

### State Management

1. Use Zustand for client-side state
2. Use React Query for server state
3. Create context providers for component-specific state
4. Follow the established patterns in existing stores

### Styling

1. Use Tailwind CSS 4 utility classes
2. Create custom components for reusable UI elements
3. Follow the established design system
4. Use the `cn` utility (from `clsx` and `tailwind-merge`) for conditional classes
5. Fonts are available via CSS variables:
   - `--font-inter`: Default body font (Inter)
   - `--font-poppins`: Heading and emphasis font (Poppins)
   - Use `font-inter` or `font-poppins` classes in components

## 🤖 AI Context

This README serves as a comprehensive reference for AI assistants working with this codebase. The project follows modern React/Next.js 16 patterns with:

- **Clear separation of concerns** with dedicated folders for different responsibilities
- **Type-safe architecture** with comprehensive TypeScript coverage
- **Authentication-first design** with proper security patterns
- **Scalable structure** that can accommodate growth
- **Modern tooling** with the latest versions of popular libraries
- **Next.js 16 compatibility** with async cookies, headers, and params
- **React 19** with latest features and optimizations

### Key Migration Notes (Next.js 16)

- All `cookies()`, `headers()`, `params`, and `searchParams` calls must use `await`
- Turbopack is the default bundler in dev mode
- `metadataBase` is required for proper Open Graph image resolution
- Image optimization defaults have been updated (4-hour cache TTL, 3 max redirects)

When working with this codebase, AI should:

- Follow the established folder structure and naming conventions
- Maintain type safety across all new code
- Respect the authentication flow and security patterns
- Use the existing service layer for API interactions
- Follow the component composition patterns established in the codebase
- Ensure all Next.js API calls (cookies, headers, etc.) are properly awaited
- Use Inter font for body text and Poppins for headings
- Follow React 19 best practices and patterns
