# Custom App: Knowledge Base & RAG Summary

This document summarizes the Knowledge Base (KB) and Retrieval-Augmented Generation (RAG) architecture and features relevant to the custom BizzyPerson application, drawing from `Knowledge-FMC` and custom app approach files.

## Core Knowledge Base System (from custom-app-architecture.md)

The KB system handles document processing, storage, and retrieval. Key components include:
*   **Document Processor**: Manages the ingestion pipeline.
*   **Document Type Detection**: Identifies document types (PDF, CSV, DOCX, images, etc.).
*   **Chunking Strategy**: Implements intelligent document chunking for optimal retrieval (potentially domain-specific strategies via extensions).
*   **Metadata Extraction**: Extracts and stores document metadata, including agricultural context.
*   **Embedding Generation**: Creates vector embeddings for document chunks.
*   **Vector Database (ChromaDB)**: Stores and indexes document embeddings.
*   **Metadata Database (SQLite/PostgreSQL)**: Stores document metadata.
*   **Query Planner**: Optimizes retrieval based on query type.
*   **Retriever**: Combines vector search with metadata filtering.

## Document Processing Pipeline (from custom-app-architecture.md, bp-Efficient-RAG-Architecture.md)

1.  Document Upload
2.  Type Detection
3.  Content Extraction (including OCR if needed)
4.  Metadata Extraction (including agricultural context)
5.  (Optional) Extension-Specific Processing
6.  Chunking
7.  Vectorization (potentially with added context)
8.  Storage (Vector DB + Metadata DB)

## RAG Enhancements & Features (from bp-RAG-Enhancements.md, bp-Efficient-RAG-Architecture.md, custom-app-feature-comparison.md)

*   **Enhanced Metadata System**:
    *   Extends basic metadata to include agricultural specifics: `field_id`, `season`, `crop_type`, `equipment_id`, `observation_date`.
    *   Supports custom tags and document relationships.
    *   Stores table schemas (`schema` field) for tabular documents.
*   **Tabular Data Processing**:
    *   Stores individual rows of tabular data (`document_rows` model) linked to the main document.
    *   Enables querying directly against structured data within documents.
*   **Specialized Vectorization**:
    *   Adds agricultural context (doc type, field, season, crop) to text chunks *before* embedding to improve semantic relevance for farming queries.
*   **Contextual Retrieval System**:
    *   Employs multi-stage retrieval: potentially combining metadata filtering, semantic (vector) search, and relationship traversal.
    *   Allows extensions to register custom query planners and result ranking strategies for domain-specific relevance.
*   **API Enhancements**:
    *   Endpoints specifically for querying documents by agricultural metadata (`/api/documents/ag-metadata`).
    *   Endpoint for querying structured data within tabular documents (`/api/documents/:documentId/query-table`).
*   **Preserved AnythingLLM Features**: Document processing, vectorization, KB management, RAG, workspaces, document collections are core concepts being implemented/enhanced in the custom app.
