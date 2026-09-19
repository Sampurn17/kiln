<div align="center">

# 🔥 Kiln

**AI-powered code generation platform — describe what you want, get a working app in seconds.**

[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss)](https://tailwindcss.com/)
[![Prisma](https://img.shields.io/badge/Prisma-7-2D3748?logo=prisma)](https://www.prisma.io/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

</div>

---

## ✨ Overview

Kiln is a full-stack AI code generation platform that lets users describe an application in natural language and receive a fully functional React app — complete with live preview, code editor, and one-click export. Powered by **Google Gemini** for initial generation and **Cline AI Agent** for iterative improvement.

Think of it as your personal AI software engineer: describe what you want, watch it think, and get a working app with live preview in under 30 seconds.

---

## 🎯 Key Features

| Feature | Description |
|---|---|
| 🧠 **AI Code Generation** | Describe your app in plain English — Gemini generates a complete React project with components, styles, and dependencies |
| 🔴 **Live Preview** | Instant in-browser preview powered by [Sandpack](https://sandpack.codesandbox.io/) — see your app running as soon as it's generated |
| ✏️ **Integrated Code Editor** | Browse and read generated source files with syntax highlighting, file explorer, and tabs |
| 🤖 **AI-Powered Improvements** | Pro users can iteratively improve their app with a Cline AI agent that patches files intelligently |
| 📸 **Image Uploads** | Upload reference screenshots or mockups — the AI uses them as context for generation |
| 📦 **Export to ZIP** | Download your project as a ready-to-run `create-react-app` ZIP with `package.json`, dependencies, and all source files |
| 🔐 **Authentication** | Secure sign-in/sign-up via [Clerk](https://clerk.com/) with protected routes |
| 💳 **Credit System** | Tiered pricing (Free / Starter / Pro) with per-generation credit consumption |
| 🛡️ **Bot & Abuse Protection** | [Arcjet](https://arcjet.com/) middleware for rate limiting, bot detection, and shield protection |
| 📱 **Responsive Landing Page** | Animated hexagon background, rotating placeholders, and premium dark-mode design |

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        Client (React 19)                    │
│  ┌──────────────┐  ┌──────────────┐  ┌───────────────────┐  │
│  │  Landing Page │  │  Chat Panel  │  │   Code Panel      │  │
│  │  (page.tsx)   │  │  (messages,  │  │   (Sandpack:      │  │
│  │              │  │   streaming) │  │   preview + code) │  │
│  └──────────────┘  └──────┬───────┘  └─────────┬─────────┘  │
│                           │ SSE                 │            │
├───────────────────────────┼─────────────────────┼────────────┤
│                     API Routes (Next.js)                     │
│  ┌────────────────────────┼─────────────────────┼──────────┐ │
│  │  /api/gen-ai-code      │   /api/improve      │          │ │
│  │  (Gemini streaming)    │   (Cline AI Agent)  │          │ │
│  └────────────────────────┼─────────────────────┼──────────┘ │
├───────────────────────────┼─────────────────────┼────────────┤
│                     Middleware Layer                          │
│  ┌────────────────┐  ┌────────────────┐  ┌───────────────┐  │
│  │  Clerk Auth    │  │  Arcjet Shield │  │  Bot Detection │  │
│  └────────────────┘  └────────────────┘  └───────────────┘  │
├──────────────────────────────────────────────────────────────┤
│                     Database (PostgreSQL)                     │
│  ┌──────────────┐  ┌──────────────────────────────────────┐  │
│  │  Users        │  │  Workspaces (messages + fileData)    │  │
│  └──────────────┘  └──────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────────┘
```

---

## 🛠️ Tech Stack

### Frontend
- **[Next.js 16](https://nextjs.org/)** — App Router, Server Components, Server Actions
- **[React 19](https://react.dev/)** — Latest with concurrent features
- **[Tailwind CSS 4](https://tailwindcss.com/)** — Utility-first styling
- **[Base UI](https://base-ui.com/)** — Unstyled, accessible component primitives
- **[shadcn/ui](https://ui.shadcn.com/)** — Pre-built UI components
- **[Sandpack](https://sandpack.codesandbox.io/)** — In-browser code editor & live preview
- **[Lucide React](https://lucide.dev/)** — Icon library
- **[Framer Motion](https://www.framer.com/motion/)** — Animations (via animate-ui)
- **[Sonner](https://sonner.emilkowal.dev/)** — Toast notifications
- **[React Markdown](https://github.com/remarkjs/react-markdown)** — Markdown rendering in chat

### Backend
- **[Google Gemini AI](https://ai.google.dev/)** — Primary code generation (streaming SSE)
- **[Cline AI SDK](https://cline.bot/)** — Agentic code improvement with tool use
- **[Prisma 7](https://www.prisma.io/)** — Type-safe ORM with PostgreSQL adapter
- **[Clerk](https://clerk.com/)** — Authentication & user management
- **[Arcjet](https://arcjet.com/)** — Security middleware (rate limiting, bot detection, shield)
- **[Supabase](https://supabase.com/)** — PostgreSQL hosting (via connection pooling)

---

## 📁 Project Structure

```
kiln/
├── app/
│   ├── page.tsx                    # Landing page with hero, features, pricing
│   ├── layout.tsx                  # Root layout (Clerk, theme, fonts)
│   ├── globals.css                 # Global styles & Tailwind config
│   ├── (auth)/                     # Auth pages (sign-in, sign-up)
│   ├── (main)/
│   │   ├── projects/               # Project listing page
│   │   └── workspace/              # AI workspace (chat + code + preview)
│   └── api/
│       ├── gen-ai-code/route.ts    # Gemini streaming code generation
│       └── improve/route.ts        # Cline AI agent improvement endpoint
├── components/
│   ├── ChatPanel.tsx               # Chat interface with message history
│   ├── CodePanel.tsx               # Sandpack editor + preview + export
│   ├── WorkspaceClient.tsx         # Workspace orchestrator (state, streaming)
│   ├── ProjectCard.tsx             # Project cards grid with delete dialog
│   ├── HeaderClient.tsx            # Navigation header with credits display
│   ├── PricingModal.tsx            # Upgrade modal for paid plans
│   ├── MobileBlocker.tsx           # Mobile-unsupported notice
│   ├── ui/                         # shadcn/ui primitives (button, dialog, tabs…)
│   └── animate-ui/                 # Animated background components
├── actions/
│   ├── projects.ts                 # Server actions: list, delete projects
│   └── workspace.ts                # Server actions: get user, get workspace
├── lib/
│   ├── prisma.ts                   # Prisma client singleton
│   ├── constant.ts                 # Plans, pricing, credit costs
│   ├── arcjet.ts                   # Arcjet rate-limiting client
│   ├── checkUser.ts                # Clerk → DB user sync on sign-in
│   ├── data.ts                     # Landing page content (features, steps…)
│   └── utils.ts                    # Utility functions (cn, etc.)
├── types/
│   ├── workspace.ts                # Message, FileData, StatusStep types
│   ├── project.ts                  # ProjectSummary type
│   └── plans.ts                    # Plan type definitions
├── prisma/
│   ├── schema.prisma               # Database schema (User, Workspace)
│   └── migrations/                 # Prisma migration history
├── middleware.ts                    # Clerk auth + Arcjet protection
├── public/                         # Static assets (logo, SVGs)
└── package.json
```

---

## 🗄️ Database Schema

```prisma
model User {
  id         String      @id @default(cuid())
  clerkId    String      @unique
  name       String
  email      String      @unique
  imageUrl   String      @default("")
  plan       String      @default("free")    // free | starter | pro
  credits    Int         @default(10)
  createdAt  DateTime    @default(now())
  updatedAt  DateTime    @updatedAt
  workspaces Workspace[]
}

model Workspace {
  id        String   @id @default(cuid())
  title     String?
  userId    String
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  messages  Json     @default("[]")          // Chat history
  fileData  Json?                             // Generated files + dependencies
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@index([userId])
}
```

---

## 🔌 API Routes

### `POST /api/gen-ai-code`
Streams AI-generated code via **Server-Sent Events (SSE)**.

| Field | Type | Description |
|---|---|---|
| `userId` | `string` | Internal user ID |
| `workspaceId` | `string \| null` | Existing workspace (or null for new) |
| `messages` | `Message[]` | Full conversation history |
| `fileData` | `FileData \| null` | Existing code context |

**SSE Events:**
- `status` — Real-time thinking/progress updates
- `done` — Final response with generated `fileData`, remaining credits, workspace ID
- `error` — Error message

### `POST /api/improve`
Iteratively improves existing code using the **Cline AI Agent** (Pro users only).

| Field | Type | Description |
|---|---|---|
| `userId` | `string` | Internal user ID |
| `workspaceId` | `string` | Workspace to improve |
| `userRequest` | `string` | What the user wants changed |
| `fileData` | `FileData` | Current project files |

**SSE Events:**
- `thinking` — Streamed agent reasoning
- `file_patch` — Individual file updates
- `done` — Final patched `fileData` and summary
- `error` — Error message

---

## 💰 Pricing Tiers

| Plan | Price | Credits/Month | Features |
|---|---|---|---|
| **Free** | $0 | 10 | Live preview, Export to ZIP |
| **Starter** | $9/mo | 50 | + Image uploads |
| **Pro** | $19/mo | 150 | + AI Agent improvements, Priority AI |

Each code generation consumes **1 credit**.

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** ≥ 18
- **PostgreSQL** ≥ 15 (or a [Supabase](https://supabase.com/) project)
- **Clerk** account → [clerk.com](https://clerk.com/)
- **Google AI Studio** API key → [aistudio.google.com](https://aistudio.google.com/)
- **Arcjet** API key → [arcjet.com](https://arcjet.com/)

### 1. Clone the repository

```bash
git clone https://github.com/Sampurn17/kiln.git
cd kiln
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Copy the example and fill in your keys:

```bash
cp .env.example .env
```

Required variables in `.env`:

```env
# Database
DATABASE_URL="postgresql://user:password@host:5432/dbname"

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_...
CLERK_SECRET_KEY=sk_...
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up

# Google Gemini AI
GEMINI_API_KEY=AI...

# Arcjet Security
ARCJET_KEY=ajkey_...

# Cline AI (for Pro agent improvements)
CLINE_API_KEY=...
```

### 4. Initialize the database

```bash
npx prisma migrate dev
```

### 5. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📦 Build for Production

```bash
npm run build
npm start
```

---

## 🌐 Deployment

Kiln is optimized for deployment on **[Vercel](https://vercel.com/)**:

1. Push your code to GitHub
2. Import the repo in Vercel
3. Add all environment variables in Vercel's dashboard
4. Deploy — Vercel auto-detects Next.js and handles the rest

> **Note:** Make sure your PostgreSQL database is accessible from Vercel's edge network. Supabase with connection pooling (via PgBouncer) is recommended.

---

## 🧑‍💻 Development

### Key Commands

| Command | Description |
|---|---|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npx prisma studio` | Open Prisma database GUI |
| `npx prisma migrate dev` | Run pending migrations |

### How Generation Works

1. User types a prompt in the **ChatPanel**
2. `WorkspaceClient` sends the conversation to `/api/gen-ai-code`
3. The API streams **Gemini's thinking** as real-time status updates via SSE
4. Gemini returns structured JSON with file contents and dependencies
5. Dependencies are validated against the npm registry
6. The workspace is saved to PostgreSQL, credits are deducted
7. **CodePanel** receives the `fileData` and renders it in Sandpack
8. User sees a live preview immediately

### How Improve Works (Pro)

1. User clicks **"Improve with Agent"** and describes the change
2. `WorkspaceClient` sends the request to `/api/improve`
3. The **Cline AI Agent** analyzes the codebase and streams thinking + file patches
4. Patches are accumulated and applied atomically when the stream completes
5. The workspace is updated in the database

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

<div align="center">

**Built with ❤️ by [Sampurn](https://github.com/Sampurn17)**

</div>
