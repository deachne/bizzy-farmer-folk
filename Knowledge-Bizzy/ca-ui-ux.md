# Custom App: UI/UX Summary

This document summarizes the User Interface (UI) and User Experience (UX) design, components, and implementation details relevant to the custom BizzyPerson application, based on `Knowledge-FMC` and custom app approach files.

## Design System (from bp-ui--design-system.md, bp-ui--unified-design-system-summary.md)

*   **Foundation**: Based on AnythingLLM's UI, ensuring visual consistency. Uses Shadcn/UI components as a base.
*   **Principles**: Clarity First, Functional Elegance, Field-Ready, Consistent Experience, Responsive by Default.
*   **Elements**: Defines color palettes (dark/light modes), typography (Inter font), spacing (4px grid), border radius, shadows.
*   **Implementation**: Uses CSS variables, Tailwind CSS utility classes. Includes CSS mapping utilities to adapt LibreChat styles. Theme integration synchronizes themes across the application.

## Navigation (from bp-ui--seamless-navigation.md, bp-ui--navigation-completion.md, bp-tech--ui-navigation.md)

*   **Goal**: Seamless navigation between all features (including those inspired by AnythingLLM and LibreChat).
*   **Implementation**:
    *   `UnifiedNavigation` component integrates navigation items from different parts of the application.
    *   `useNavigationIntegration` hook manages combined navigation state and routing (currently state-based, router planned).
    *   Responsive design with collapsible sidebar, state persisted in localStorage.

## Error Handling & Notifications (from bp-ui--error-handling.md, bp-ui--notification-*, bp-ui--unified-error-handling.md)

*   **Unified System**: Integrates notification styles from both AnythingLLM (react-toastify) and LibreChat (Shadcn UI toasts) via a `NotificationProvider` and `useNotificationContext` hook.
*   **Error Handling**: Uses `ErrorBoundary` for component errors and `ErrorHandler`/`useErrorHandler` hook for explicit error reporting (e.g., API calls). Global handlers catch unhandled errors.
*   **User Experience**: Provides clear, user-friendly messages. Mobile-responsive design. Aims to avoid notification overload.

## Component Library & Status (from bp-ui--component-library-status.md, bp-tech--component-library-decisions.md)

*   **Foundation**: Shadcn/UI with Tailwind CSS.
*   **Development**: Storybook used for documentation and isolated development/testing.
*   **Status**: Core components (Button, Input, Card, Form, Select, etc.) are largely complete. Artifact, Chat, and Agriculture-specific components are in various stages of implementation. Layout components (Sidebar, Header) are planned.

## Key UI Features & Areas

*   **Admin Interface** (from bp-admin-*, bp-ui--extension-management.md, bp-task--extension-management-completion.md, bp-ui--unified-settings-interface.md):
    *   Consistent design across Dashboard, User Management, Extension Management, System Monitoring, Configuration Management.
    *   Features card-based layouts, filtering/search, responsive design.
    *   Extension Management includes configuration panels and permission management.
    *   Unified Settings interface combines configurations from different systems into logical categories.
*   **Notes System UI** (from bp-pkm--notes-system.md, bp-tech--lovable-integration.md):
    *   Modern UI inspired by Lovable reference implementation.
    *   Features List, Calendar, and Tag views.
    *   Date-based organization and filtering.
    *   AI tag suggestions integrated into the editor.
    *   Quick capture features.
*   **Chat Interface** (from bp-int--chat-integration.md, bp-ui--librechat-adaptation.md):
    *   LibreChat components adapted to match the app's design system.
    *   Supports multi-modal content and artifact rendering.
*   **Artifact System UI** (from bp-ui--artifact-system.md):
    *   `ArtifactPanel` (sliding panel), `ArtifactRenderer` (type-specific), `ArtifactBrowser` (search/filter saved artifacts).

## Mobile & Field Experience (from BP07-Mobile-Experience.md)

*   **Design Philosophy**: Field-First principles - environmental adaptability (sunlight, gloves), contextual awareness (location, weather), simplified interaction (one-handed, voice input).
*   **UI Components**: Optimized touch targets, high contrast modes, Quick Capture Bar, Field Context Header, Field Map component examples.
*   **Offline/Sync**: Architecture designed for offline data capture (IndexedDB) and intelligent synchronization when connectivity returns.
*   **Resource Efficiency**: Focus on battery conservation (optimized location services, sensor usage) and data efficiency (compression).

## Agricultural UI Patterns (from FarmQA-Template-Images.md)

*   FarmQA templates serve as visual references for UI patterns related to:
    *   Crop Planning (templates, steps, products, crops pages).
    *   Recommendations (products, mixes, creation flow, export).
    *   Map Layers.
