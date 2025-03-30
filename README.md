# BizzyPerson Knowledge Management System

A frictionless knowledge management system with universal capture and AI-powered organization, focused on agricultural use cases.

## Project Vision

BizzyPerson transforms knowledge management by creating a frictionless system where capturing and retrieving information becomes effortless. Starting with a powerful personal core and expanding to specialized domains like farming, our AI-powered platform eliminates the cognitive burden of organizing information, allowing users to focus on ideas and insights rather than managing their digital knowledge.

## Core Objectives
- Build a personal knowledge core with seamless capture and retrieval
- Implement universal capture for collecting thoughts, references, and observations
- Use AI to automatically organize, tag, and connect information
- Create an extensible foundation for specialized domain modules, starting with farming

## Documentation

This repository includes detailed planning and architecture documentation in the `docs` folder:

- **Planning**: `/docs/planning` - Technical architecture, implementation plans, and feature comparisons
- **Knowledge**: `/docs/knowledge` - Domain-specific knowledge and research

For detailed information about the project architecture and implementation plan, check the planning documents.

## Development and Tools

### Project info

**URL**: https://lovable.dev/projects/8f2b89ea-e6b0-4a7a-af76-a2120cbd1a1b

### How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/8f2b89ea-e6b0-4a7a-af76-a2120cbd1a1b) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## Tech Stack

This project is built with:

- **Frontend**: Vite, React, TypeScript, shadcn-ui, Tailwind CSS
- **Backend**: Node.js, Fastify, Prisma
- **Databases**: Supabase PostgreSQL, LanceDB
- **Authentication**: Supabase Auth
- **AI/ML**: OpenAI APIs, Anthropic APIs, vector embeddings

See the complete tech stack in `docs/planning/Tech-Stack.md`.

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/8f2b89ea-e6b0-4a7a-af76-a2120cbd1a1b) and click on Share -> Publish.

## I want to use a custom domain - is that possible?

We don't support custom domains (yet). If you want to deploy your project under your own domain then we recommend using Netlify. Visit our docs for more details: [Custom domains](https://docs.lovable.dev/tips-tricks/custom-domain/)
