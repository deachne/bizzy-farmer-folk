# Custom App: Architecture & Technical Foundation Summary

This document summarizes the architectural and technical decisions for the custom BizzyPerson application, based on the `Knowledge-FMC` documentation and the custom app approach files.

## Core Architecture (from custom-app-architecture.md, fmc-repo/VISION.md)

*   **Approach**: Modular, feature-based architecture within a single codebase, replacing the previous orchestration model.
*   **Core Components**:
    1.  **Knowledge Base System**: Handles document processing, storage (vector & metadata), and retrieval. Incorporates concepts from AnythingLLM.
    2.  **Chat System**: Manages conversations, LLM interactions, multi-modal processing, and artifact generation/rendering. Incorporates concepts from LibreChat.
    3.  **Extension Framework**: Enables domain-specific functionality (like BizzyFarmer) through a modular plugin system.
    4.  **MCP Integration**: Provides specialized tools and resources via the Model Context Protocol.

## Technical Stack (from custom-app-architecture.md, fmc-repo/VISION.md)

*   **Frontend Framework**: React with TypeScript.
*   **Styling**: Tailwind CSS.
*   **UI Components**: Custom library based on Shadcn/UI foundation (see below).
*   **State Management**: Zustand or Jotai (lightweight options preferred).
*   **Vector Database**: ChromaDB (embedded).
*   **Metadata Database**: SQLite/PostgreSQL (decision may vary based on deployment).
*   **LLM Integration**: OpenAI API, Anthropic API, support for local models.
*   **Build Tool / Dev Environment**: Vite.

## Component Library Approach (from bp-tech--component-library-decisions.md)

*   **Foundation**: Shadcn/UI provides accessible, customizable base components.
*   **Styling**: Tailwind CSS for consistency and theming.
*   **Implementation**: TypeScript for type safety.
*   **Documentation/Testing**: Storybook for component development, documentation, and visual testing.
*   **Strategy**: Extend existing components where feasible, ensuring compatibility and reducing rework.

## Development & Deployment (from vite-development-guide.md, bp-Docker-Compose-Setup.md)

*   **Development Server**: Vite provides fast HMR and an efficient development experience.
*   **Configuration**: Managed via environment variables (`.env` files).
*   **Containerization**: Docker is planned for consistent deployment environments (details may differ from the old `bp-Docker-Compose-Setup.md`).

## Testing Strategy (from bp-Testing-Strategy.md)

*   **Levels**: Unit Testing (Jest/Vitest), Integration Testing, End-to-End Testing (Cypress).
*   **Focus**: Testing core components, integration points between features (KB, Chat, Extensions), and key user flows.
*   **CI**: Continuous Integration (e.g., GitHub Actions) to run tests automatically.

## Code Organization (from system-integration-guide.md)

*   **Structure**: Feature-based organization within `src/`.
    *   `src/core/`: Core systems (auth, chat, kb, extension-api, mcp).
    *   `src/components/`: Shared UI components.
    *   `src/features/`: Specific application features/pages (admin, chat, documents, notes, settings).
    *   `src/extensions/`: Extension modules (core framework, farmer).
*   **Imports**: Use path aliases (e.g., `@components`, `@core`) defined in `tsconfig.json` and `vite.config.ts`.
