# BizzyPerson Component Glossary

This document provides a centralized reference of key components in the BizzyPerson system, organized by subsystem, with links to implementation tasks.

## Core PKM Components

### Knowledge Base System

| Component | Description | Task ID | Status |
|-----------|-------------|---------|--------|
| **DocumentProcessor** | Processes uploaded documents into analyzable chunks | KB-03 | Not Started |
| **ChunkingStrategy** | Handles intelligent document segmentation | KB-04 | Not Started |
| **MetadataExtractor** | Extracts and stores metadata from documents | KB-05 | Not Started |
| **EmbeddingGenerator** | Creates vector embeddings for document chunks | KB-07 | Not Started |
| **VectorStorage** | Manages vector database operations | KB-08 | Not Started |
| **KnowledgeRetriever** | Retrieves relevant context based on queries | KB-09 | Not Started |

### Chat System

| Component | Description | Task ID | Status |
|-----------|-------------|---------|--------|
| **ChatInterface** | UI components for the conversation experience | CHAT-01 | Not Started |
| **MessageStream** | Handles real-time streaming of AI responses | CHAT-02 | Not Started |
| **ConversationManager** | Stores and manages chat history | CHAT-03 | Not Started |
| **LLMInterface** | Standardized API for interacting with language models | CHAT-04 | Not Started |
| **ContextBuilder** | Assembles context from knowledge base for LLM prompts | CHAT-05 | Not Started |
| **ArtifactGenerator** | Creates rich artifacts from AI responses | CHAT-07 | Not Started |

### Core Extension Framework

| Component | Description | Task ID | Status |
|-----------|-------------|---------|--------|
| **ExtensionAPI** | Core interface for extension integration | EXT-01 | Not Started |
| **ExtensionLoader** | Discovers and loads available extensions | EXT-02 | Not Started |
| **ExtensionRegistry** | Tracks and manages loaded extensions | EXT-03 | Not Started |
| **LifecycleManager** | Handles extension initialization and cleanup | EXT-04 | Not Started |

### MCP System

| Component | Description | Task ID | Status |
|-----------|-------------|---------|--------|
| **MCPClient** | Communicates with Model Context Protocol services | MCP-01 | Not Started |
| **ToolRegistry** | Manages available AI tools | MCP-02 | Not Started |
| **ToolExecutor** | Executes tools and processes results | MCP-03 | Not Started |

## Extension Components (BizzyFarmer)

| Component | Description | Task ID | Status |
|-----------|-------------|---------|--------|
| **FieldManager** | Manages agricultural field data | BF-02, BF-03 | Not Started |
| **CropTracker** | Tracks crop information and history | BF-04 | Not Started |
| **FarmingKnowledgeAdapter** | Adapts core knowledge retrieval for farming context | BF-05 | Not Started |
| **AgriTools** | Specialized tools for agriculture | BF-06 | Not Started |

## Integration Points with Existing Projects

### AnythingLLM Inspirations
- **Document Processing Pipeline**: Adapting their chunking and processing approach for our DocumentProcessor
- **Vector Storage**: Borrowing patterns for embedding storage and retrieval
- **Workspace Concept**: Adapting their container model for knowledge organization

### LibreChat Inspirations
- **Chat Interface**: Borrowing UI patterns for message display and input
- **Streaming Implementation**: Adapting their approach to real-time message streaming
- **Agent Framework**: Learning from their tool integration patterns

## Component Relationships

- **DocumentProcessor → VectorStorage**: Documents are processed, chunked, embedded, and stored
- **KnowledgeRetriever → ContextBuilder**: Retrieved knowledge becomes context for the LLM
- **LLMInterface → MessageStream**: LLM responses are streamed to the user interface
- **ToolRegistry → ToolExecutor → LLMInterface**: Tools are registered, executed by the LLM, and results returned

## Development Priority

1. Knowledge Base System - Core components for storing and retrieving knowledge
2. Chat System - Core components for interacting with the knowledge
3. Extension Framework - System for extending functionality
4. BizzyFarmer Extension - Agricultural-specific features 