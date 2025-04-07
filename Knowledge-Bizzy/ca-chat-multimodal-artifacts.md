# Custom App: Chat, Multi-Modal & Artifacts Summary

This document summarizes the Chat System, Multi-Modal capabilities, and Artifact System features relevant to the custom BizzyPerson application, based on `Knowledge-FMC` and custom app approach files.

## Core Chat System (from custom-app-architecture.md)

The Chat System manages conversations, LLM interactions, and multi-modal processing. Key components include:
*   **Input Processor**: Handles various input types (text, image, file).
*   **Context Builder**: Assembles context for the LLM from the knowledge base, conversation history, and potentially other sources (e.g., MCP resources).
*   **LLM Interface**: Manages communication with different language models (OpenAI, Anthropic, local).
*   **Response Handler**: Processes LLM responses, including handling streaming output and triggering artifact generation.
*   **Artifact Generator/Renderer**: Creates and displays rich artifacts (tables, charts, code, etc.) based on LLM responses.

## Preserved/Enhanced LibreChat Features (from custom-app-feature-comparison.md)

The custom app aims to incorporate and enhance key chat features inspired by LibreChat:
*   Advanced multi-modal conversation (input and output).
*   Artifact generation and viewing.
*   Streaming responses.
*   Conversation history management.
*   Prompt templates.
*   Model selection.

## Multi-Modal Integration (from bp-int--multi-modal-*, bp-ui--multi-modal-*)

*   **Goal**: Seamlessly integrate support for images, documents, audio, and potentially video within the chat interface.
*   **UI Components**: Adapted versions of LibreChat's multi-modal components (`AdaptedImage`, `AdaptedAttachFile`, `AdaptedMessageAudio`, etc.) are used, styled consistently with the app's design system (based on AnythingLLM).
*   **Functionality**:
    *   Media upload (including drag-and-drop) integrated into the chat input.
    *   Rendering of various media types within the chat message flow.
    *   Backend processing, storage, and retrieval for uploaded media.
    *   Inclusion of multi-modal content in the conversation context for the LLM.
*   **Field Optimization**: Design considers mobile use, potential offline capture, and bandwidth optimization.

## Artifact System (from bp-ui--artifact-system.md, bp-task--artifact-system-completion.md)

*   **Purpose**: Manage, display, save, and retrieve rich outputs (artifacts) generated during AI interactions.
*   **Components**:
    *   `ArtifactPanel`: Sliding panel for displaying artifacts.
    *   `ArtifactRenderer`: Renders various artifact types (image, code, table, chart, text).
    *   `ArtifactStorageService`: Manages saving artifacts, including metadata extraction and smart tagging (with agricultural context awareness). Integrates with vector storage for persistence and semantic retrieval.
    *   `ArtifactBrowser`: UI for searching, filtering (by type, tags), and browsing saved artifacts.
    *   `ArtifactManager`: Central coordinator for artifact interactions.
*   **Metadata**: Saved artifacts include rich metadata (type, title, description, tags, timestamp, source chat, farm context like field/crop/season).

## UI Adaptation (from bp-ui--librechat-adaptation.md, bp-int--librechat-ui-adaptation-summary.md)

*   LibreChat's core chat UI elements (message rendering, input form) are adapted to match the visual style and design system of the custom app (based on AnythingLLM).
*   This ensures a consistent look and feel, making the underlying source of the components (LibreChat concepts) transparent to the user.
*   Shared styling modules and CSS variable mapping facilitate this consistency.
