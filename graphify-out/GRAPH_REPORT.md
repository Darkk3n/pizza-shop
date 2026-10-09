# Graph Report - pizza-shop  (2026-10-09)

## Corpus Check
- Corpus is ~3,600 words - fits in a single context window. You may not need a graph.

## Summary
- 172 nodes · 220 edges · 14 communities (10 shown, 4 thin omitted)
- Extraction: 85% EXTRACTED · 15% INFERRED · 0% AMBIGUOUS · INFERRED: 33 edges (avg confidence: 0.87)
- Token cost: 106,605 input · 0 output

## Community Hubs (Navigation)
- Domain Model & Business Rules
- Web Tooling & Lint Config
- App Shell Navigation UI
- TypeScript Compiler Config
- Root Layout & Sidebar State
- Root Monorepo Scripts
- API Launch Profiles
- Web Dev Dependencies
- Local Database Setup
- API Project File
- Template UI Icons
- Brand Logos

## God Nodes (most connected - your core abstractions)
1. `compilerOptions` - 16 edges
2. `AppShell()` - 12 edges
3. `Icon()` - 8 edges
4. `useSidebarCollapsed()` - 7 edges
5. `Pizza Shop POS README` - 7 edges
6. `http` - 6 edges
7. `https` - 6 edges
8. `scripts` - 6 edges
9. `useIsDesktop()` - 6 edges
10. `Pizza Shop POS` - 6 edges

## Surprising Connections (you probably didn't know these)
- `Next.js Agent Rules (breaking-change docs warning)` --conceptually_related_to--> `Frontend Conventions (Server Components, Zod, feature hooks)`  [INFERRED]
  web/AGENTS.md → CLAUDE.md
- `Pizza Shop POS README` --semantically_similar_to--> `Pizza Shop POS`  [INFERRED] [semantically similar]
  README.md → CLAUDE.md
- `pnpm workspace (packages: web)` --conceptually_related_to--> `Tech Stack (pnpm, Next.js 16, ASP.NET 10, PostgreSQL, Azure)`  [AMBIGUOUS]
  pnpm-workspace.yaml → CLAUDE.md
- `Pizza Shop POS README` --references--> `30-minute Session Timeout (production)`  [INFERRED]
  README.md → CLAUDE.md
- `Recipe and Cost Management` --shares_data_with--> `RecipeItems table`  [INFERRED]
  README.md → CLAUDE.md

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Order creation inventory deduction flow** — claude_inventory_deduction, claude_orderitems, claude_orderitemtoppings, claude_recipeitems, claude_ingredients [EXTRACTED 1.00]
- **Price snapshot pattern for historical stability** — claude_price_stability, claude_orderitems, claude_orderitemtoppings, claude_orders [INFERRED 0.85]
- **Local dev database setup** — readme_pnpm_scripts, readme_env_example, readme_podman_compose, docker_compose_postgres, docker_compose_postgres_data [INFERRED 0.85]
- **create-next-app Default Boilerplate Assets (currently unused)** — web_public_file_file_icon, web_public_globe_globe_icon, web_public_next_next_js_wordmark, web_public_vercel_vercel_logo, web_public_window_window_icon [INFERRED 0.85]

## Communities (14 total, 4 thin omitted)

### Community 0 - "Domain Model & Business Rules"
Cohesion: 0.12
Nodes (19): Ingredients table, OrderItems table, OrderItemToppings table, Orders table, Pizza Customizer (size, crust, fractional toppings), Pizza Shop POS, PizzaSizes table, RecipeItems table (+11 more)

### Community 1 - "Web Tooling & Lint Config"
Cohesion: 0.08
Nodes (24): eslint, eslint-config-next, next, react-dom, tailwindcss, @tailwindcss/turbopack, @types/node, @types/react (+16 more)

### Community 2 - "App Shell Navigation UI"
Cohesion: 0.20
Nodes (16): react, RootLayout(), AppShell(), Brand(), isActive(), NAV_ITEMS, AnalyticsIcon(), BrandLogo() (+8 more)

### Community 3 - "TypeScript Compiler Config"
Cohesion: 0.11
Nodes (18): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+10 more)

### Community 4 - "Root Layout & Sidebar State"
Cohesion: 0.17
Nodes (14): geistMono, geistSans, metadata, getCollapsed(), getIsDesktop(), getServerFalse(), listeners, setCollapsed() (+6 more)

### Community 5 - "Root Monorepo Scripts"
Cohesion: 0.12
Nodes (16): devDependencies, concurrently, open-cli, wait-on, name, packageManager, private, scripts (+8 more)

### Community 6 - "API Launch Profiles"
Cohesion: 0.13
Nodes (15): ASPNETCORE_ENVIRONMENT, applicationUrl, commandName, dotnetRunMessages, environmentVariables, launchBrowser, applicationUrl, commandName (+7 more)

### Community 7 - "Web Dev Dependencies"
Cohesion: 0.22
Nodes (9): devDependencies, eslint, eslint-config-next, tailwindcss, @tailwindcss/turbopack, @types/node, @types/react, @types/react-dom (+1 more)

### Community 8 - "Local Database Setup"
Cohesion: 0.33
Nodes (6): postgres service (postgres:18-alpine, pizzashop-db), postgres_data volume, EF Core Migrations workflow, .env.example database credentials template, Root pnpm scripts (dev, dev:web, dev:api, db:up, db:down), Podman compose (db scripts runtime)

### Community 10 - "Template UI Icons"
Cohesion: 0.67
Nodes (3): File Icon (document outline, 16x16 gray), Globe Icon (world/web, 16x16 gray), Browser Window Icon (16x16 gray)

## Ambiguous Edges - Review These
- `Tech Stack (pnpm, Next.js 16, ASP.NET 10, PostgreSQL, Azure)` → `pnpm workspace (packages: web)`  [AMBIGUOUS]
  pnpm-workspace.yaml · relation: conceptually_related_to

## Knowledge Gaps
- **23 isolated node(s):** `net10.0`, `Microsoft.NET.Sdk.Web`, `concurrently`, `open-cli`, `wait-on` (+18 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 93 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **4 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react` connect `App Shell Navigation UI` to `Web Tooling & Lint Config`, `Root Layout & Sidebar State`?**
  _High betweenness centrality (0.052) - this node is a cross-community bridge._
- **Are the 3 inferred relationships involving `useSidebarCollapsed()` (e.g. with `getCollapsed()` and `getServerFalse()`) actually correct?**
  _`useSidebarCollapsed()` has 3 INFERRED edges - model-reasoned connections that need verification._
- **What connects `net10.0`, `Microsoft.NET.Sdk.Web`, `concurrently` to the rest of the system?**
  _23 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Domain Model & Business Rules` be split into smaller, more focused modules?**
  _Cohesion score 0.1164021164021164 - nodes in this community are weakly interconnected._
- **Why does `next` connect `Web Tooling & Lint Config` to `App Shell Navigation UI`, `Root Layout & Sidebar State`?**
  _High betweenness centrality (0.045) - this node is a cross-community bridge._
- **Should `Web Tooling & Lint Config` be split into smaller, more focused modules?**
  _Cohesion score 0.07692307692307693 - nodes in this community are weakly interconnected._

### Low-confidence Hints
_AMBIGUOUS edges — the extractor was unsure. Verify before acting on these._

- **What is the exact relationship between `Tech Stack (pnpm, Next.js 16, ASP.NET 10, PostgreSQL, Azure)` and `pnpm workspace (packages: web)`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._