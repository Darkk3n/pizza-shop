# Graph Report - pizza-shop  (2026-10-18)

## Corpus Check
- 77 files · ~16,454 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 5 file(s) not represented in the graph (top: (none) 2, .example 1, .ico 1)

## Summary
- 754 nodes · 1242 edges · 73 communities (27 shown, 46 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 33 edges (avg confidence: 0.87)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `14dd8ce2`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- Pizza Shop POS README
- web/package.json
- AppShell.tsx
- compilerOptions
- OrdersEndpoints.cs
- package.json
- http
- postgres service (postgres:18-alpine, pizzashop-db)
- PizzaShop.Api.csproj
- Globe Icon (world/web, 16x16 gray)
- Next.js Wordmark Logo (black)
- RecipeItem
- OrderItem
- InitialCreate
- Order
- PizzaShopContext
- PizzaShop.Api.Requests
- .UpdateRoles
- Ingredient
- .Create
- PizzaShop.Api.Migrations
- .GetAll
- .Update
- .Update
- .Update
- .BuildModel
- PizzaShop.Api.Models
- .TransformAsync
- OrderItemTopping
- ToppingAmount
- PizzaShopContext.cs
- OrderStatus
- ToppingCoverage
- PizzaSize
- OrderItemRequest
- UnitOfMeasure
- OrderOptions.cs

## God Nodes (most connected - your core abstractions)
1. `PizzaShopContext` - 65 edges
2. `Order` - 26 edges
3. `PizzaShop.Api.Models` - 25 edges
4. `PizzaShop.Api.Requests` - 21 edges
5. `OrderItem` - 19 edges
6. `compilerOptions` - 16 edges
7. `OrdersEndpoints` - 15 edges
8. `OrderItemTopping` - 14 edges
9. `OrderDto` - 13 edges
10. `Ingredient` - 13 edges

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

## Communities (73 total, 46 thin omitted)

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

### Community 4 - "OrdersEndpoints.cs"
Cohesion: 0.13
Nodes (5): Policies, PizzaShop.Api.Auth, PizzaShop.Api.Db, PizzaShop.Api.Dtos, PizzaShop.Api.Endpoints

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
Cohesion: 0.22
Nodes (8): net10.0, Microsoft.AspNetCore.DataProtection.EntityFrameworkCore (10.0.12), Microsoft.AspNetCore.Identity.EntityFrameworkCore (10.0.12), Microsoft.AspNetCore.OpenApi (10.0.12), Microsoft.EntityFrameworkCore.Design (10.0.12), Npgsql.EntityFrameworkCore.PostgreSQL (10.0.3), Scalar.AspNetCore (2.18.0), Microsoft.NET.Sdk.Web

### Community 10 - "Globe Icon (world/web, 16x16 gray)"
Cohesion: 0.67
Nodes (3): File Icon (document outline, 16x16 gray), Globe Icon (world/web, 16x16 gray), Browser Window Icon (16x16 gray)

### Community 13 - "RecipeItem"
Cohesion: 0.12
Nodes (12): Recipe, BasePrice, Name, RecipeId, RecipeItems, RecipeItem, Amount, Ingredient (+4 more)

### Community 14 - "OrderItem"
Cohesion: 0.12
Nodes (13): OrderItem, ItemNameSnapshot, LineTotal, Order, OrderId, OrderItemId, PizzaSize, PizzaSizeId (+5 more)

### Community 15 - "InitialCreate"
Cohesion: 0.05
Nodes (5): InitialCreate, AddRecipeItemUniqueIndex, AddIngredientToppingFields, AddOrderIdempotencyKey, AddIdentity

### Community 19 - "Order"
Cohesion: 0.05
Nodes (18): AuthExtensions, CorsExtensions, AppUser, Order, CreatedAt, IdempotencyKey, Items, OrderId (+10 more)

### Community 20 - "PizzaShopContext"
Cohesion: 0.07
Nodes (11): PizzaShopContext, DataProtectionKeys, Ingredients, OrderItems, OrderItemToppings, Orders, PizzaSizes, RecipeItems (+3 more)

### Community 22 - "PizzaShop.Api.Requests"
Cohesion: 0.07
Nodes (11): AdjustIngredientStockRequest, CreateIngredientRequest, CreatePizzaSizeRequest, CreateRecipeRequest, CreateUnitOfMeasureRequest, RecipeItemRequest, UpdateIngredientRequest, UpdatePizzaSizeRequest (+3 more)

### Community 23 - ".UpdateRoles"
Cohesion: 0.11
Nodes (3): UserDto, UsersEndpoints, UpdateUserRolesRequest

### Community 26 - "Ingredient"
Cohesion: 0.08
Nodes (17): IngredientDto, IngredientMapper, PizzaSizeDto, PizzaSizeMapper, RecipeDto, RecipeItemDto, RecipeMapper, UnitOfMeasureDto (+9 more)

### Community 27 - ".Create"
Cohesion: 0.07
Nodes (7): OrderDto, OrderItemDto, OrderItemToppingDto, OrderMapper, OrderSummaryDto, PagedResult, OrdersEndpoints

### Community 29 - ".GetAll"
Cohesion: 0.14
Nodes (3): ToppingDto, ToppingMapper, ToppingsEndpoints

### Community 42 - "OrderItemTopping"
Cohesion: 0.20
Nodes (9): OrderItemTopping, Coverage, ExtraAmount, Ingredient, IngredientId, OrderItem, OrderItemId, OrderItemToppingId (+1 more)

### Community 43 - "ToppingAmount"
Cohesion: 0.22
Nodes (8): OrderType, Delivery, DineIn, Takeout, ToppingAmount, Extra, Light, Standard

### Community 45 - "OrderStatus"
Cohesion: 0.33
Nodes (6): OrderStatus, Completed, Pending, Preparing, Ready, UpdateOrderStatusRequest

### Community 46 - "ToppingCoverage"
Cohesion: 0.33
Nodes (5): ToppingCoverage, LeftHalf, RightHalf, Whole, OrderItemToppingRequest

### Community 47 - "PizzaSize"
Cohesion: 0.40
Nodes (4): PizzaSize, Name, PizzaSizeId, PriceMultiplier

### Community 49 - "UnitOfMeasure"
Cohesion: 0.50
Nodes (3): UnitOfMeasure, Name, UnitOfMeasureId

### Community 51 - "OrderOptions.cs"
Cohesion: 0.50
Nodes (3): OrderOptions, TaxRate, PizzaShop.Api.Options

## Ambiguous Edges - Review These
- `pnpm workspace (packages: web)` → `Tech Stack (pnpm, Next.js 16, ASP.NET 10, PostgreSQL, Azure)`  [AMBIGUOUS]
  pnpm-workspace.yaml · relation: conceptually_related_to

## Knowledge Gaps
- **107 isolated node(s):** `DataProtectionKeys`, `Ingredients`, `UnitsOfMeasure`, `Orders`, `OrderItems` (+102 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 377 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **46 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `PizzaShopContext` connect `PizzaShopContext` to `.Update`, `.Update`, `PizzaShopContext.cs`, `Order`, `.UpdateRoles`, `Ingredient`, `.Create`, `.GetAll`, `.Update`?**
  _High betweenness centrality (0.202) - this node is a cross-community bridge._
- **What connects `DataProtectionKeys`, `Ingredients`, `UnitsOfMeasure` to the rest of the system?**
  _107 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Pizza Shop POS README` be split into smaller, more focused modules?**
  _Cohesion score 0.1164021164021164 - nodes in this community are weakly interconnected._
- **Why does `PizzaShop.Api.Models` connect `PizzaShop.Api.Models` to `OrdersEndpoints.cs`, `ToppingAmount`, `PizzaShopContext.cs`, `PizzaShop.Api.Requests`, `Ingredient`, `.Create`?**
  _High betweenness centrality (0.091) - this node is a cross-community bridge._
- **Should `web/package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.0625 - nodes in this community are weakly interconnected._
- **Why does `Order` connect `Order` to `PizzaShop.Api.Models`, `.Create`, `PizzaShopContext`?**
  _High betweenness centrality (0.052) - this node is a cross-community bridge._

### Low-confidence Hints
_AMBIGUOUS edges — the extractor was unsure. Verify before acting on these._

- **What is the exact relationship between `pnpm workspace (packages: web)` and `Tech Stack (pnpm, Next.js 16, ASP.NET 10, PostgreSQL, Azure)`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._