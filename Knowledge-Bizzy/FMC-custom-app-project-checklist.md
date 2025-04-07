# Custom App Project Checklist

This checklist tracks the implementation progress for the new custom BizzyPerson application.

**Status Legend:**
*   `Not Started`
*   `In Progress`
*   `Blocked`
*   `Needs Review`
*   `Done`

---

## Phase 1: Project Setup & Core Architecture (Day 1)

| ID        | Task Description                     | Priority | Status      | Depends On | Reference                               | Notes                                             |
| :-------- | :----------------------------------- | :------- | :---------- | :--------- | :-------------------------------------- | :------------------------------------------------ |
| **CORE-01** | Initialize Vite + React + TS project | Critical | Not Started | -          | [Starter Template](custom-app-starter-template.md) |                                                   |
| **CORE-02** | Setup Tailwind CSS & UI deps       | Critical | Not Started | CORE-01    | [Starter Template](custom-app-starter-template.md) | Radix UI, clsx, tailwind-merge, etc.              |
| **CORE-03** | Configure ESLint, Prettier, Husky  | High     | Not Started | CORE-01    | [Starter Template](custom-app-starter-template.md) | Includes pre-commit hooks                         |
| **CORE-04** | Setup project structure (features) | High     | Not Started | CORE-01    | [Starter Template](custom-app-starter-template.md) | Based on feature-based organization               |
| **CORE-05** | Implement Routing (React Router)   | Critical | Not Started | CORE-01    | [Architecture](custom-app-architecture.md)     | Setup basic page routes (App.tsx)                 |
| **CORE-06** | Setup State Management (Zustand)   | Critical | Not Started | CORE-01    | [Architecture](custom-app-architecture.md)     | Create initial stores (e.g., auth)                |
| **CORE-07** | Implement basic Auth system        | High     | Not Started | CORE-06    | [Starter Template](custom-app-starter-template.md) | Mock implementation initially (authStore.ts)      |
| **CORE-08** | Port existing UI layout components | Medium   | Not Started | CORE-02    | [Starter Template](custom-app-starter-template.md) | MainLayout, Sidebar, Header                       |
| **CORE-09** | Setup basic testing (Vitest)       | Medium   | Not Started | CORE-01    | [Starter Template](custom-app-starter-template.md) | Configure Vitest, add simple test                 |

## Phase 2: Knowledge Base Features (Day 2)

| ID      | Task Description                  | Priority | Status      | Depends On | Reference                               | Notes                                             |
| :------ | :-------------------------------- | :------- | :---------- | :--------- | :-------------------------------------- | :------------------------------------------------ |
| **KB-01** | Implement Doc Upload UI           | High     | Not Started | CORE-08    | [Architecture](custom-app-architecture.md)     | Frontend component                                |
| **KB-02** | Design Doc Processing Pipeline API | High     | Not Started | -          | [Architecture](custom-app-architecture.md)     | Backend API definition                            |
| **KB-03** | Implement basic Doc Processor     | High     | Not Started | KB-02      | [Architecture](custom-app-architecture.md)     | Type detection, basic text extraction             |
| **KB-04** | Implement Chunking Strategy       | High     | Not Started | KB-03      | [Architecture](custom-app-architecture.md)     | Start with simple fixed-size chunking             |
| **KB-05** | Implement Metadata Extraction     | Medium   | Not Started | KB-03      | [Architecture](custom-app-architecture.md)     | Basic metadata + **Ag-specific (field, crop, season)** |
| **KB-06** | Setup Vector DB Integration       | Critical | Not Started | -          | [Architecture](custom-app-architecture.md)     | Choose DB (Chroma?), setup connection             |
| **KB-07** | Implement Embedding Generation    | Critical | Not Started | KB-04, KB-06 | [Architecture](custom-app-architecture.md)     | Choose model, implement API call, **add ag-context pre-embedding** |
| **KB-08** | Implement Vector Storage          | Critical | Not Started | KB-07      | [Architecture](custom-app-architecture.md)     | Store embeddings & metadata references          |
| **KB-09** | Implement basic Retrieval API     | High     | Not Started | KB-08      | [Architecture](custom-app-architecture.md)     | Simple vector search initially                    |
| **KB-10** | Implement basic Document List UI  | Medium   | Not Started | CORE-08    | [Architecture](custom-app-architecture.md)     | Display uploaded documents                        |
| **[NEW]** | **KB-11** | Implement Tabular Data Handling   | Medium   | Not Started | KB-03, KB-05 | [Knowledge-FMC/ca-knowledge-base-rag.md](Knowledge-FMC/ca-knowledge-base-rag.md) | Store/query rows from tables within docs        |
| **[NEW]** | **KB-12** | Implement Contextual Retrieval    | High     | Not Started | KB-09      | [Knowledge-FMC/ca-knowledge-base-rag.md](Knowledge-FMC/ca-knowledge-base-rag.md) | Multi-stage retrieval (metadata + vector)       |

## Phase 3: Chat & Multi-modal Features (Day 3)

| ID       | Task Description                  | Priority | Status      | Depends On | Reference                               | Notes                                             |
| :------- | :-------------------------------- | :------- | :---------- | :--------- | :-------------------------------------- | :------------------------------------------------ |
| **CHAT-01** | Implement Chat UI Components      | Critical | Not Started | CORE-08    | [Architecture](custom-app-architecture.md)     | Message bubbles, input field                      |
| **CHAT-02** | Implement Message Streaming (FE)  | High     | Not Started | CHAT-01    | [Architecture](custom-app-architecture.md)     | Handle streaming response in UI                   |
| **CHAT-03** | Implement Conversation History    | High     | Not Started | CHAT-01    | [Architecture](custom-app-architecture.md)     | Store and display past messages                   |
| **CHAT-04** | Implement basic LLM Interface     | Critical | Not Started | -          | [Architecture](custom-app-architecture.md)     | Backend service to call LLM API                   |
| **CHAT-05** | Implement basic Context Builder   | High     | Not Started | CHAT-04, KB-09 | [Architecture](custom-app-architecture.md)     | Assemble prompt with basic context                |
| **CHAT-06** | Implement Image Processing (FE)   | Medium   | Not Started | CHAT-01    | [Architecture](custom-app-architecture.md)     | Allow image upload in chat input                  |
| **CHAT-07** | Implement basic Artifact Gen (BE) | Medium   | Not Started | CHAT-04    | [Architecture](custom-app-architecture.md)     | Simple table/list generation                      |
| **CHAT-08** | Implement basic Artifact Render   | Medium   | Not Started | CHAT-01, CHAT-07 | [Architecture](custom-app-architecture.md)     | Display basic artifacts in chat                   |
| **[NEW]** | **CHAT-09** | Implement Artifact Storage Service| High     | Not Started | CHAT-07, KB-08 | [Knowledge-FMC/ca-chat-multimodal-artifacts.md](Knowledge-FMC/ca-chat-multimodal-artifacts.md) | Save artifacts to vector store w/ metadata/tags |
| **[NEW]** | **CHAT-10** | Implement Artifact Browser UI     | Medium   | Not Started | CHAT-09    | [Knowledge-FMC/ca-chat-multimodal-artifacts.md](Knowledge-FMC/ca-chat-multimodal-artifacts.md) | Search/filter saved artifacts                   |

## Phase 4: Extension Framework & MCP Integration (Day 4)

| ID      | Task Description                  | Priority | Status      | Depends On | Reference                               | Notes                                             |
| :------ | :-------------------------------- | :------- | :---------- | :--------- | :-------------------------------------- | :------------------------------------------------ |
| **EXT-01** | Design Extension API              | High     | Not Started | -          | [Architecture](custom-app-architecture.md)     | Define hooks, registration interface              |
| **EXT-02** | Implement Extension Loader        | High     | Not Started | EXT-01     | [Architecture](custom-app-architecture.md)     | Load extensions from `src/extensions`             |
| **EXT-03** | Implement basic Extension Registry| High     | Not Started | EXT-02     | [Architecture](custom-app-architecture.md)     | Keep track of loaded extensions                   |
| **EXT-04** | Implement basic Lifecycle Mgmt    | Medium   | Not Started | EXT-03     | [Architecture](custom-app-architecture.md)     | Init/destroy hooks, basic states                  |
| **[NEW]** | **EXT-05** | Implement Extension Permissions | High     | Not Started | EXT-01     | [Knowledge-FMC/ca-extensions-mcp.md](Knowledge-FMC/ca-extensions-mcp.md) | Capability-based permission system              |
| **[NEW]** | **EXT-06** | Implement Extension Configuration | High     | Not Started | EXT-01     | [Knowledge-FMC/ca-extensions-mcp.md](Knowledge-FMC/ca-extensions-mcp.md) | Schema-based config system                      |
| **MCP-01** | Implement MCP Client              | Medium   | Not Started | -          | [Architecture](custom-app-architecture.md), [Knowledge-FMC/ca-extensions-mcp.md](Knowledge-FMC/ca-extensions-mcp.md) | Leverage LibreChat client, add Plugin Registry |
| **MCP-02** | Implement basic Tool Registry     | Medium   | Not Started | MCP-01     | [Architecture](custom-app-architecture.md)     | List available tools                              |
| **MCP-03** | Implement basic Tool Executor     | Medium   | Not Started | MCP-02     | [Architecture](custom-app-architecture.md)     | Call a tool and get response                      |
| **[NEW]** | **MCP-04** | Implement Ag-Specific MCP Tools   | Medium   | Not Started | MCP-03, BF-01 | [Knowledge-FMC/ca-extensions-mcp.md](Knowledge-FMC/ca-extensions-mcp.md) | Field Analyzer, Crop Planner examples           |

## Phase 5: BizzyFarmer Extension & Integration (Day 5)

| ID     | Task Description                  | Priority | Status      | Depends On | Reference                               | Notes                                             |
| :----- | :-------------------------------- | :------- | :---------- | :--------- | :-------------------------------------- | :------------------------------------------------ |
| **BF-01** | Create BizzyFarmer Ext Structure  | High     | Not Started | EXT-02     | [Architecture](custom-app-architecture.md)     | Setup folder `src/extensions/farmer`              |
| **BF-02** | Implement basic Field Data Model  | High     | Not Started | BF-01      | [Architecture](custom-app-architecture.md)     | Define basic field properties                     |
| **BF-03** | Implement basic Field Mgmt UI     | Medium   | Not Started | BF-01, CORE-08 | [Architecture](custom-app-architecture.md)     | List/Add basic fields                             |
| **BF-04** | Implement basic Crop Data Model   | Medium   | Not Started | BF-01      | [Architecture](custom-app-architecture.md)     | Define basic crop properties                      |
| **BF-05** | Integrate KB Search in Chat       | High     | Not Started | CHAT-05, KB-09 | [Architecture](custom-app-architecture.md)     | Use KB results in context builder                 |
| **BF-06** | Integrate MCP Tools in Chat       | Medium   | Not Started | CHAT-05, MCP-03 | [Architecture](custom-app-architecture.md)     | Allow LLM to call MCP tools                       |
| **BF-07** | Setup basic E2E Testing           | Medium   | Not Started | CORE-09    |                                         | Configure Playwright or Cypress                   |
| **BF-08** | Write initial E2E tests           | Medium   | Not Started | BF-07      |                                         | Login, basic navigation, chat message             |

## Phase 6: Advanced Features & Polish (Day 6)

| ID       | Task Description                  | Priority | Status      | Depends On | Reference                               | Notes                                             |
| :------- | :-------------------------------- | :------- | :---------- | :--------- | :-------------------------------------- | :------------------------------------------------ |
| **ADV-01** | Implement basic Offline Support   | Low      | Not Started | -          | [Feature Comparison](custom-app-feature-comparison.md) | Service worker, basic caching                     |
| **ADV-02** | Implement basic Mobile Responsiveness | Medium   | Not Started | CORE-08    | [Feature Comparison](custom-app-feature-comparison.md) | Check layouts on smaller screens                  |
| **ADV-03** | Implement basic User Management UI| Medium   | Not Started | CORE-08    | [Feature Comparison](custom-app-feature-comparison.md) | List users (mock data)                            |
| **ADV-04** | Refine Chat UI                    | Medium   | Not Started | CHAT-01    |                                         | Improve styling, add user feedback                |
| **ADV-05** | Refine Document UI                | Medium   | Not Started | KB-10      |                                         | Improve list view, add sorting/filtering          |
| **ADV-06** | Implement basic Error Handling    | High     | Not Started | CORE-05    |                                         | Add ErrorBoundary, basic API error display        |
| **ADV-07** | Implement basic Loading States    | Medium   | Not Started | CORE-08    |                                         | Add spinners/skeletons during load                |
| **[NEW]** | **PKM-01** | Implement Core Notes System UI    | High     | Not Started | CORE-08    | [Knowledge-FMC/ca-ui-ux.md](Knowledge-FMC/ca-ui-ux.md)           | Create/Edit/View Notes (List, Calendar, Tag views) |
| **[NEW]** | **PKM-02** | Implement Notes Backend/Storage   | High     | Not Started | PKM-01     | [Knowledge-FMC/ca-architecture-technical.md](Knowledge-FMC/ca-architecture-technical.md) | Persistence for notes                             |
| **[NEW]** | **PKM-03** | Implement AI Note Tagging         | Medium   | Not Started | PKM-02     | [Knowledge-FMC/ca-knowledge-base-rag.md](Knowledge-FMC/ca-knowledge-base-rag.md) | Auto-tagging based on content                   |

## Phase 7: Deployment & Documentation (Day 7)

| ID      | Task Description                  | Priority | Status      | Depends On | Reference                               | Notes                                             |
| :------ | :-------------------------------- | :------- | :---------- | :--------- | :-------------------------------------- | :------------------------------------------------ |
| **DEP-01** | Create basic Dockerfile (Prod)    | High     | Not Started | -          | [Architecture](custom-app-architecture.md)     | Multi-stage build                                 |
| **DEP-02** | Create basic docker-compose (Prod)| High     | Not Started | DEP-01     | [Architecture](custom-app-architecture.md)     | App, DB, Vector DB                                |
| **DEP-03** | Setup basic CI (GitHub Actions)   | Medium   | Not Started | CORE-09    | [Architecture](custom-app-architecture.md)     | Lint, Test, Build on push                         |
| **DOC-01** | Write README.md                   | High     | Not Started | -          |                                         | Project overview, setup instructions              |
| **DOC-02** | Document Core Architecture        | Medium   | Not Started | -          | [Architecture](custom-app-architecture.md)     | Refine existing architecture doc                  |
| **DOC-03** | Document API Endpoints (Basic)    | Low      | Not Started | -          |                                         | Use Swagger/OpenAPI if backend exists             |
| **DOC-04** | Prepare Demo Script               | High     | Not Started | -          |                                         | Outline key features to showcase                  |
