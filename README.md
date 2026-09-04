# SprechenAI

SprechenAI is a responsive, OpenAI-powered German conversation coach for practical, real-life situations. The learner can discuss any topic in German and receives a natural reply, Turkish translation, corrected sentence, and concise grammar rules. Login and persisted learning data are not implemented yet.

## Easiest start on Windows

After configuring the OpenAI key once, double-click `Start-SprechenAI.cmd` in the project root. It opens the backend and frontend in separate terminal windows, waits until the frontend is ready, and then opens `http://localhost:3000` automatically. Keep both terminal windows open while using the app.

## What is included

- Next.js 15, React 19, TypeScript, and Tailwind CSS frontend
- Home, Scenario Selection, Conversation, and Progress pages
- Ten selectable scenarios, including a custom scenario option
- Interactive A1–B2 level and Quick/Normal/Deep explanation controls
- Free-form AI conversation with topic and level controls
- Per-message German correction and Turkish grammar explanations
- Web app manifest, responsive shell, mobile navigation, and metadata as a base for a later PWA
- ASP.NET Core 9 controller-based API with an OpenAI Responses API client
- EF Core/PostgreSQL entities for users, conversations, messages, grammar analyses, mistakes, and progress
- Docker Compose PostgreSQL service with a persistent volume and health check

## Repository layout

```text
SprechenAI/
├─ frontend/                 Next.js App Router application
│  ├─ app/                   Pages and global styles
│  ├─ components/            Reusable UI and feature components
│  ├─ data/                  Typed scenario/progress content
│  ├─ services/              Typed backend API client
│  ├─ public/                Web app manifest
│  └─ types/                 Shared frontend types
├─ backend/
│  ├─ SprechenAI.sln          Classic Visual Studio solution
│  ├─ SprechenAI.slnx
│  └─ SprechenAI.Api/
│     ├─ Contracts/          API request/response contracts
│     ├─ Controllers/        HTTP endpoints
│     ├─ Data/               EF Core DbContext and mappings
│     ├─ Domain/Entities/    PostgreSQL-ready entities
│     └─ Services/           Application services and OpenAI client
├─ .env.example
└─ docker-compose.yml
```

## Prerequisites

- [Node.js](https://nodejs.org/) 20.9 or newer (Node.js 24 LTS works)
- [.NET 9 SDK](https://dotnet.microsoft.com/download/dotnet/9.0)
- [Docker Desktop](https://www.docker.com/products/docker-desktop/) for the provided PostgreSQL setup, or PostgreSQL 16 installed separately
- An OpenAI API key with access to the configured model

## Start PostgreSQL

From the repository root:

```bash
docker compose up -d postgres
```

The defaults are safe for local development and are defined in `docker-compose.yml`. To override them, copy `.env.example` to `.env` and edit the PostgreSQL values. The default connection is:

```text
Host=localhost;Port=5432;Database=sprechenai;Username=sprechenai;Password=sprechenai_dev_password
```

Check container status with `docker compose ps`. Stop it with `docker compose down`; add `-v` only when you intentionally want to remove the local database volume.

## Run the frontend

```bash
cd frontend
npm install
npm run dev
```

Open <http://localhost:3000>. To point the UI at another API URL, copy `frontend/.env.example` to `frontend/.env.local` and change `NEXT_PUBLIC_API_URL`.

Production verification:

```bash
npm run typecheck
npm run build
npm start
```

## Run the backend

First, store your OpenAI API key in .NET User Secrets. This keeps the key outside source control:

```bash
cd backend
dotnet user-secrets set "OpenAI:ApiKey" "YOUR_OPENAI_API_KEY" --project SprechenAI.Api
```

The default model is `gpt-5.4-mini`. You can override it if needed:

```bash
dotnet user-secrets set "OpenAI:Model" "gpt-5.4-mini" --project SprechenAI.Api
```

Then start the API:

```bash
cd backend
dotnet restore SprechenAI.sln
dotnet run --project SprechenAI.Api/SprechenAI.Api.csproj --launch-profile http
```

The API runs at <http://localhost:5080>. Verify it with:

```bash
curl http://localhost:5080/health
curl http://localhost:5080/health/database
curl http://localhost:5080/api/config/status
```

`/health` checks the API process without requiring PostgreSQL. `/health/database` also checks the configured PostgreSQL connection.

To override the database connection without editing tracked settings, set the standard ASP.NET Core environment variable `ConnectionStrings__Postgres` before starting the API.

## API surface

| Method | Route | Purpose |
| --- | --- | --- |
| `GET` | `/health` | API liveness |
| `GET` | `/health/database` | PostgreSQL connectivity |
| `GET` | `/api/config/status` | AI configuration status (never returns the key) |
| `POST` | `/api/conversations` | Start an in-memory conversation |
| `GET` | `/api/conversations/{id}` | Read an in-memory conversation |
| `POST` | `/api/messages` | Receive an AI coach reply and correction |
| `POST` | `/api/grammar/analyze` | Receive AI-powered grammar analysis |
| `GET` | `/api/progress` | Read mock grammar progress |
| `GET` | `/api/mistakes` | Read mock common mistakes |

Conversation messages are held in memory for this milestone and are lost when the backend restarts. The AI response uses a strict JSON schema so the frontend reliably receives separate reply, translation, correction, and grammar-rule fields. Never place an API key in frontend code or a tracked settings file.

## Database schema workflow

The DbContext and entity mappings are ready for migrations. When persistence work begins, install the matching EF tool and create the initial migration:

```bash
dotnet tool install --global dotnet-ef --version 9.*
dotnet ef migrations add InitialCreate --project backend/SprechenAI.Api
dotnet ef database update --project backend/SprechenAI.Api
```

No migration is applied automatically at startup, which keeps the liveness endpoint available even when PostgreSQL is offline.

## Verified in this workspace

- `npm run typecheck`
- `npm run build`
- `dotnet build backend/SprechenAI.Api/SprechenAI.Api.csproj`
