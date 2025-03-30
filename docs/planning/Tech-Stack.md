# BizzyPerson Farm - Technology Stack

## Frontend
- **Framework**: React with TypeScript
- **Build Tool**: Vite (for fast development experience)
- **UI Components**: 
  - shadcn/ui (component library based on Radix UI)
  - Tailwind CSS (for styling)
- **State Management**: 
  - Zustand (lightweight, simple state management)
  - React Query (for server state management)
- **Routing**: React Router v6 (for navigation and route management)
- **Form Handling**: React Hook Form + Zod (for validation)

## Backend
- **Runtime**: Node.js with TypeScript
- **API Framework**: Fastify
- **ORM**: Prisma (for database access and migrations)
- **Authentication/Authorization**: 
  - Supabase Auth (for user management, OAuth, and session handling)
  - Role-based access control
- **Database**:
  - Supabase PostgreSQL (for relational data, metadata storage)
  - LanceDB (for vector embeddings and similarity search)
- **File Storage**: Supabase Storage (for document storage)

## AI/ML Integration
- **Vector Embeddings**: OpenAI Embeddings API or local models
- **LLM Integration**: 
  - OpenAI API (ChatGPT)
  - Anthropic API (Claude)
  - Local LLM support (via Ollama)
- **OCR Processing**: Tesseract.js (for document scanning)
- **Image Analysis**: OpenAI Vision API or similar

## Mobile Experience
- **Framework**: Progressive Web App (PWA) with offline capabilities
  - *Future plan*: Dedicated mobile app using Flutter
- **Offline Sync**: 
  - PouchDB or similar for local-first storage
  - Custom sync protocols for agricultural data

## Development Tools
- **Package Manager**: npm or pnpm (for dependency management)
- **Testing**: 
  - Vitest (unit and integration testing)
  - Playwright (end-to-end testing)
- **Linting/Formatting**: 
  - ESLint (for code quality)
  - Prettier (for consistent formatting)
- **CI/CD**: GitHub Actions
- **Containerization**: Docker & Docker Compose

## Infrastructure
- **Deployment Options**:
  - Option 1: Self-hosted (Docker)
  - Option 2: Cloud services (Vercel, Railway, or similar)
- **Monitoring**: OpenTelemetry + Grafana (optional)

## Additional Tools
- **API Documentation**: Swagger/OpenAPI
- **Version Control**: Git with GitHub
- **Dependency Scanning**: Dependabot