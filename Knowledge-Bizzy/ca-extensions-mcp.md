# Custom App: Extension Framework & MCP Integration Summary

This document summarizes the Extension Framework and Model Context Protocol (MCP) integration relevant to the custom BizzyPerson application, based on `Knowledge-FMC` and custom app approach files.

## Extension Framework (from custom-app-architecture.md, bp-ext-*, bp-task--extension-*)

*   **Purpose**: Enables the core platform to be extended with domain-specific functionality (e.g., BizzyFarmer).
*   **Core Components**:
    *   **Extension Loader**: Discovers and loads extensions dynamically, handling dependencies and TypeScript compilation.
    *   **Extension Registry**: Manages registration, tracking, capabilities, and states (Registered, Initializing, Initialized, Error) of extensions. Event-driven.
    *   **Lifecycle Manager**: Controls the full extension lifecycle (Installed, Active, Inactive, Suspended, Updatable, Updating, Uninstalling, Error) with defined state transitions and events.
    *   **Permission Manager**: Enforces a capability-based security model (Resource, Action, Context permissions) declared in the manifest, validated at runtime, and approved by the user.
    *   **Configuration Manager**: Allows extensions to define configuration schemas (JSON Schema) and provides UI/API for managing settings with validation and persistence.
    *   **Extension API**: Provides hooks for extensions to integrate with UI, data processing, chat, AnythingLLM/LibreChat features, lifecycle events, permissions, and configuration.
*   **Structure**: Extensions follow a standard structure including `manifest.json` (metadata, dependencies, permissions), an entry point (`index.js` or `index.ts`), and optional directories for specific components.
*   **Example**: `bp-ext--example-extension.md` provides a template and demonstrates hook implementation.

## MCP Integration (from custom-app-architecture.md, bp-MCP-*, bp-Extension-API.md)

*   **Approach**: Leverages LibreChat's existing robust MCP client implementation (`MCPManager`, `MCPConnection`, various `Transport` classes like SSE, WebSocket) rather than building from scratch.
*   **BizzyPerson Enhancements**:
    *   **Plugin Registry System**: Manages MCP plugins provided by extensions, handling installation, enabling/disabling, and lifecycle.
    *   **Agricultural Adapters**: Extensions (like BizzyFarmer) provide specialized adapters to interface with external agricultural data sources (e.g., Climate FieldView, Weather APIs, Soil Test Labs).
    *   **Specialized Tools**: Defines and registers agricultural-specific MCP tools (e.g., `field_analyzer`, `crop_planner`, `analyze_soil_test`, `getFieldData`) that the AI can utilize.
*   **Tool Registration**: Extensions register their MCP tools via the Extension API during initialization.
*   **Configuration**: Supports configurable timeouts for MCP connections, crucial for potentially unreliable field connectivity.
*   **Upstream Updates**: A "fork and merge" strategy is used to incorporate updates from the upstream LibreChat MCP implementation while maintaining BizzyPerson's extensions.

## Preserved/Enhanced Features (from custom-app-feature-comparison.md)

*   **Extension Framework**: Preserved concept from LibreChat, enhanced with a more robust API, lifecycle management, permissions, and configuration system.
*   **MCP Integration**: Preserved concept and client from LibreChat, enhanced with a plugin registry and agricultural-specific tools/adapters.
*   **Custom Tools**: Preserved concept from LibreChat, enhanced with a focus on agricultural tools provided via the BizzyFarmer extension.
