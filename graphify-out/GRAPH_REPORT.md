# Graph Report - pizza-shop  (2026-10-11)

## Corpus Check
- 28 files · ~4,295 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 5 file(s) not represented in the graph (top: (none) 2, .example 1, .ico 1)

## Summary
- 259 nodes · 334 edges · 18 communities (15 shown, 3 thin omitted)
- Extraction: 90% EXTRACTED · 10% INFERRED · 0% AMBIGUOUS · INFERRED: 32 edges (avg confidence: 0.87)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `28cc771e`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- Pizza Shop POS README
- web/package.json
- AppShell.tsx
- compilerOptions
- OrderItemTopping.cs
- package.json
- http
- devDependencies
- postgres service (postgres:18-alpine, pizzashop-db)
- PizzaShop.Api.csproj
- Globe Icon (world/web, 16x16 gray)
- Next.js Wordmark Logo (black)
- PizzaShopContext
- OrderItem
- RecipeItem
- Order
- OrderItemTopping

## God Nodes (most connected - your core abstractions)
1. `OrderItem` - 17 edges
2. `compilerOptions` - 16 edges
3. `Order` - 13 edges
4. `OrderItemTopping` - 12 edges
5. `RecipeItem` - 10 edges
6. `PizzaShop.Api.Models` - 9 edges
7. `PizzaShopContext` - 9 edges
8. `Ingredient` - 9 edges
9. `AppShell()` - 9 edges
10. `Icon()` - 8 edges

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

## Communities (18 total, 3 thin omitted)

### Community 0 - "Pizza Shop POS README"
Cohesion: 0.12
Nodes (19): Ingredients table, OrderItems table, OrderItemToppings table, Orders table, Pizza Customizer (size, crust, fractional toppings), Pizza Shop POS, PizzaSizes table, RecipeItems table (+11 more)

### Community 1 - "web/package.json"
Cohesion: 0.09
Nodes (22): eslint, eslint-config-next, react-dom, tailwindcss, @tailwindcss/turbopack, @types/node, @types/react, @types/react-dom (+14 more)

### Community 2 - "AppShell.tsx"
Cohesion: 0.10
Nodes (32): next, react, geistMono, geistSans, metadata, RootLayout(), AppShell(), Brand() (+24 more)

### Community 3 - "compilerOptions"
Cohesion: 0.11
Nodes (18): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+10 more)

### Community 5 - "package.json"
Cohesion: 0.12
Nodes (16): devDependencies, concurrently, open-cli, wait-on, name, packageManager, private, scripts (+8 more)

### Community 6 - "http"
Cohesion: 0.13
Nodes (15): ASPNETCORE_ENVIRONMENT, applicationUrl, commandName, dotnetRunMessages, environmentVariables, launchBrowser, applicationUrl, commandName (+7 more)

### Community 7 - "devDependencies"
Cohesion: 0.22
Nodes (9): devDependencies, eslint, eslint-config-next, tailwindcss, @tailwindcss/turbopack, @types/node, @types/react, @types/react-dom (+1 more)

### Community 8 - "postgres service (postgres:18-alpine, pizzashop-db)"
Cohesion: 0.33
Nodes (6): postgres service (postgres:18-alpine, pizzashop-db), postgres_data volume, EF Core Migrations workflow, .env.example database credentials template, Root pnpm scripts (dev, dev:web, dev:api, db:up, db:down), Podman compose (db scripts runtime)

### Community 9 - "PizzaShop.Api.csproj"
Cohesion: 0.40
Nodes (4): net10.0, Microsoft.EntityFrameworkCore.Design (10.0.12), Npgsql.EntityFrameworkCore.PostgreSQL (10.0.3), Microsoft.NET.Sdk.Web

### Community 10 - "Globe Icon (world/web, 16x16 gray)"
Cohesion: 0.67
Nodes (3): File Icon (document outline, 16x16 gray), Globe Icon (world/web, 16x16 gray), Browser Window Icon (16x16 gray)

### Community 13 - "PizzaShopContext"
Cohesion: 0.12
Nodes (13): PizzaShopContext, Ingredients, Orders, UnitsOfMeasure, Ingredient, CurrentStock, IngredientId, Name (+5 more)

### Community 14 - "OrderItem"
Cohesion: 0.11
Nodes (16): OrderItem, ItemNameSnapshot, LineTotal, Order, OrderId, OrderItemId, PizzaSize, PizzaSizeId (+8 more)

### Community 15 - "RecipeItem"
Cohesion: 0.14
Nodes (11): Recipe, BasePrice, Name, RecipeId, RecipeItem, Amount, Ingredient, IngredientId (+3 more)

### Community 16 - "Order"
Cohesion: 0.18
Nodes (9): Order, CreatedAt, OrderId, OrderNumber, OrderType, Status, SubTotal, Tax (+1 more)

### Community 17 - "OrderItemTopping"
Cohesion: 0.18
Nodes (9): OrderItemTopping, Coverage, ExtraAmount, Ingredient, IngredientId, OrderItem, OrderItemId, OrderItemToppingId (+1 more)

## Ambiguous Edges - Review These
- `pnpm workspace (packages: web)` → `Tech Stack (pnpm, Next.js 16, ASP.NET 10, PostgreSQL, Azure)`  [AMBIGUOUS]
  pnpm-workspace.yaml · relation: conceptually_related_to

## Knowledge Gaps
- **74 isolated node(s):** `OrderId`, `OrderNumber`, `Status`, `OrderType`, `SubTotal` (+69 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 158 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **3 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `OrderItem` connect `OrderItem` to `Order`, `OrderItemTopping`, `OrderItemTopping.cs`, `RecipeItem`?**
  _High betweenness centrality (0.057) - this node is a cross-community bridge._
- **What connects `OrderId`, `OrderNumber`, `Status` to the rest of the system?**
  _74 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Pizza Shop POS README` be split into smaller, more focused modules?**
  _Cohesion score 0.1164021164021164 - nodes in this community are weakly interconnected._
- **Why does `Order` connect `Order` to `OrderItemTopping.cs`, `PizzaShopContext`, `OrderItem`?**
  _High betweenness centrality (0.039) - this node is a cross-community bridge._
- **Should `web/package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.08695652173913043 - nodes in this community are weakly interconnected._
- **Why does `OrderItemTopping` connect `OrderItemTopping` to `OrderItemTopping.cs`, `OrderItem`?**
  _High betweenness centrality (0.028) - this node is a cross-community bridge._

### Low-confidence Hints
_AMBIGUOUS edges — the extractor was unsure. Verify before acting on these._

- **What is the exact relationship between `pnpm workspace (packages: web)` and `Tech Stack (pnpm, Next.js 16, ASP.NET 10, PostgreSQL, Azure)`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._