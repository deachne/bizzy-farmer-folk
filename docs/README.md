# BizzyPerson Documentation

This directory contains the official documentation for the BizzyPerson Knowledge Management System.

## Documentation Structure

```
docs/
├── planning/               # Project planning documents
│   ├── project-approach.md             # Overall approach and philosophy
│   ├── component-glossary.md           # Glossary of system components
│   ├── adr-template.md                 # Template for Architecture Decision Records
│   ├── adr-001-code-pattern-integration.md  # First ADR on our integration approach
│   └── custom-app-project-checklist.md # Implementation checklist
├── architecture/           # Technical architecture documents
│   └── [To be added]
├── api/                    # API documentation
│   └── [To be added]
└── README.md               # This file
```

## Key Documents

### Planning

- [Project Approach](planning/project-approach.md) - Our two-phase approach: Core PKM first, then agricultural extensions
- [Component Glossary](planning/component-glossary.md) - Reference of key system components and their relationships
- [Project Checklist](planning/custom-app-project-checklist.md) - Implementation tasks and their status

### Architecture Decisions

- [ADR-001: Code Pattern Integration](planning/adr-001-code-pattern-integration.md) - Our approach to integrating code patterns from existing projects

## Documentation Guidelines

1. **Keep it current**: Update documentation as the project evolves
2. **Code-doc traceability**: Link between code and docs using task IDs and comments
3. **Reference sources**: When adapting patterns from other projects, cite the source
4. **Prioritize clarity**: Use simple language and examples
5. **Document decisions**: Use ADRs for significant technical decisions

## Development Workflow

1. **Start with the checklist**: Begin each development session by reviewing the [Project Checklist](planning/custom-app-project-checklist.md)
2. **Update component status**: Keep the Component Glossary status up to date
3. **Create ADRs**: For significant technical decisions, create a new ADR using the template
4. **Reference documentation in code**: Add links to relevant documentation in code comments

## Repository Organization

The BizzyPerson codebase follows a feature-based organization, with clear separation between core functionality and extensions:

```
src/
├── core/                   # Core PKM functionality (Phase 1)
│   ├── knowledge-base/     # Document processing and storage
│   ├── chat/               # Chat interface and LLM integration
│   └── extension-api/      # Extension framework
└── extensions/             # Domain-specific extensions (Phase 2)
    └── farmer/             # BizzyFarmer extension
```

This structure ensures clean separation between the universal PKM functionality and the agricultural-specific features. 