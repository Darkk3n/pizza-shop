# Graph Report - pizza-shop  (2026-10-17)

## Corpus Check
- 38 files · ~6,805 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 5 file(s) not represented in the graph (top: (none) 2, .example 1, .ico 1)

## Summary
- 377 nodes · 511 edges · 26 communities (16 shown, 10 thin omitted)
- Extraction: 94% EXTRACTED · 6% INFERRED · 0% AMBIGUOUS · INFERRED: 32 edges (avg confidence: 0.87)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `b9a5d8d9`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- Pizza Shop POS README
- web/package.json
- AppShell.tsx
- compilerOptions
- microsoft_entityframeworkcore
- package.json
- http
- postgres service (postgres:18-alpine, pizzashop-db)
- PizzaShop.Api.csproj
- Globe Icon (world/web, 16x16 gray)
- Next.js Wordmark Logo (black)
- Ingredient
- OrderItem
- 20261012162801_InitialCreate.Designer.cs
- Order
- PizzaShopContext
- .AddFrontendCors
- .Update
- PizzaSize

## God Nodes (most connected - your core abstractions)
1. `PizzaShopContext` - 22 edges
2. `OrderItem` - 17 edges
3. `compilerOptions` - 16 edges
4. `Order` - 14 edges
5. `OrderItemTopping` - 14 edges
6. `Ingredient` - 10 edges
7. `RecipeItem` - 10 edges
8. `UnitsOfMeasureEndpoints` - 9 edges
9. `AppShell()` - 9 edges
10. `PizzaShop.Api.Models` - 9 edges

## Surprising Connections (you probably didn't know these)
- `Next.js Agent Rules (breaking-change docs warning)` --conceptually_related_to--> `Frontend Conventions (Server Components, Zod, feature hooks)`  [INFERRED]
  web/AGENTS.md → CLAUDE.md
- `Pizza Shop POS README` --semantically_similar_to--> `Pizza Shop POS`  [INFERRED] [semantically similar]
  README.md → CLAUDE.md
- `Pizza Shop POS README` --references--> `30-minute Session Timeout (production)`  [INFERRED]
  README.md → CLAUDE.md
- `pnpm workspace (packages: web)` --conceptually_related_to--> `Tech Stack (pnpm, Next.js 16, ASP.NET 10, PostgreSQL, Azure)`  [AMBIGUOUS]
  pnpm-workspace.yaml → CLAUDE.md
- `Recipe and Cost Management` --shares_data_with--> `RecipeItems table`  [INFERRED]
  README.md → CLAUDE.md

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Order creation inventory deduction flow** — claude_inventory_deduction, claude_orderitems, claude_orderitemtoppings, claude_recipeitems, claude_ingredients [EXTRACTED 1.00]
- **Local dev database setup** — readme_pnpm_scripts, readme_env_example, readme_podman_compose, docker_compose_postgres, docker_compose_postgres_data [INFERRED 0.85]
- **Price snapshot pattern for historical stability** — claude_price_stability, claude_orderitems, claude_orderitemtoppings, claude_orders [INFERRED 0.85]
- **create-next-app Default Boilerplate Assets (currently unused)** — web_public_file_file_icon, web_public_globe_globe_icon, web_public_next_next_js_wordmark, web_public_vercel_vercel_logo, web_public_window_window_icon [INFERRED 0.85]

## Communities (26 total, 10 thin omitted)

### Community 0 - "Pizza Shop POS README"
Cohesion: 0.12
Nodes (19): Ingredients table, OrderItems table, OrderItemToppings table, Orders table, Pizza Customizer (size, crust, fractional toppings), Pizza Shop POS, PizzaSizes table, RecipeItems table (+11 more)

### Community 1 - "web/package.json"
Cohesion: 0.06
Nodes (31): eslint, eslint-config-next, react-dom, tailwindcss, @tailwindcss/turbopack, @types/node, @types/react, @types/react-dom (+23 more)

### Community 2 - "AppShell.tsx"
Cohesion: 0.10
Nodes (32): next, react, geistMono, geistSans, metadata, RootLayout(), AppShell(), Brand() (+24 more)

### Community 3 - "compilerOptions"
Cohesion: 0.11
Nodes (18): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+10 more)

### Community 4 - "microsoft_entityframeworkcore"
Cohesion: 0.10
Nodes (12): CreateUnitOfMeasureRequest, UpdateUnitOfMeasureRequest, Recipe, BasePrice, Name, RecipeId, UnitOfMeasure, Name (+4 more)

### Community 5 - "package.json"
Cohesion: 0.12
Nodes (16): devDependencies, concurrently, open-cli, wait-on, name, packageManager, private, scripts (+8 more)

### Community 6 - "http"
Cohesion: 0.13
Nodes (15): ASPNETCORE_ENVIRONMENT, applicationUrl, commandName, dotnetRunMessages, environmentVariables, launchBrowser, applicationUrl, commandName (+7 more)

### Community 8 - "postgres service (postgres:18-alpine, pizzashop-db)"
Cohesion: 0.33
Nodes (6): postgres service (postgres:18-alpine, pizzashop-db), postgres_data volume, EF Core Migrations workflow, .env.example database credentials template, Root pnpm scripts (dev, dev:web, dev:api, db:up, db:down), Podman compose (db scripts runtime)

### Community 9 - "PizzaShop.Api.csproj"
Cohesion: 0.29
Nodes (6): net10.0, Microsoft.AspNetCore.OpenApi (10.0.12), Microsoft.EntityFrameworkCore.Design (10.0.12), Npgsql.EntityFrameworkCore.PostgreSQL (10.0.3), Scalar.AspNetCore (2.18.0), Microsoft.NET.Sdk.Web

### Community 10 - "Globe Icon (world/web, 16x16 gray)"
Cohesion: 0.67
Nodes (3): File Icon (document outline, 16x16 gray), Globe Icon (world/web, 16x16 gray), Browser Window Icon (16x16 gray)

### Community 13 - "Ingredient"
Cohesion: 0.12
Nodes (13): Ingredient, CurrentStock, IngredientId, Name, UnitOfMeasure, UnitOfMeasureId, RecipeItem, Amount (+5 more)

### Community 14 - "OrderItem"
Cohesion: 0.13
Nodes (12): OrderItem, ItemNameSnapshot, LineTotal, Order, OrderId, OrderItemId, PizzaSize, PizzaSizeId (+4 more)

### Community 15 - "20261012162801_InitialCreate.Designer.cs"
Cohesion: 0.10
Nodes (3): InitialCreate, PizzaShopContextModelSnapshot, PizzaShop.Api.Migrations

### Community 16 - "Order"
Cohesion: 0.05
Nodes (35): OrderStatus, Completed, Pending, Preparing, Ready, OrderType, Delivery, DineIn (+27 more)

### Community 17 - "PizzaShopContext"
Cohesion: 0.08
Nodes (12): PizzaShopContext, Ingredients, OrderItems, OrderItemToppings, Orders, PizzaSizes, RecipeItems, Recipes (+4 more)

### Community 21 - "PizzaSize"
Cohesion: 0.40
Nodes (4): PizzaSize, Name, PizzaSizeId, PriceMultiplier

## Ambiguous Edges - Review These
- `pnpm workspace (packages: web)` → `Tech Stack (pnpm, Next.js 16, ASP.NET 10, PostgreSQL, Azure)`  [AMBIGUOUS]
  pnpm-workspace.yaml · relation: conceptually_related_to

## Knowledge Gaps
- **94 isolated node(s):** `react-dom`, `tailwindcss`, `@tailwindcss/turbopack`, `@types/node`, `@types/react` (+89 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 212 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **10 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `OrderItemTopping` connect `Order` to `microsoft_entityframeworkcore`, `Ingredient`, `OrderItem`?**
  _High betweenness centrality (0.046) - this node is a cross-community bridge._
- **What connects `react-dom`, `tailwindcss`, `@tailwindcss/turbopack` to the rest of the system?**
  _94 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Pizza Shop POS README` be split into smaller, more focused modules?**
  _Cohesion score 0.1164021164021164 - nodes in this community are weakly interconnected._
- **Why does `Order` connect `Order` to `microsoft_entityframeworkcore`, `OrderItem`?**
  _High betweenness centrality (0.042) - this node is a cross-community bridge._
- **Should `web/package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.0625 - nodes in this community are weakly interconnected._
- **Should `AppShell.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.1039136302294197 - nodes in this community are weakly interconnected._

### Low-confidence Hints
_AMBIGUOUS edges — the extractor was unsure. Verify before acting on these._

- **What is the exact relationship between `pnpm workspace (packages: web)` and `Tech Stack (pnpm, Next.js 16, ASP.NET 10, PostgreSQL, Azure)`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._