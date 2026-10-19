# Graph Report - pizza-shop  (2026-10-18)

## Corpus Check
- 100 files · ~24,894 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 5 file(s) not represented in the graph (top: (none) 2, .example 1, .ico 1)

## Summary
- 1052 nodes · 2018 edges · 107 communities (32 shown, 75 thin omitted)
- Extraction: 94% EXTRACTED · 6% INFERRED · 0% AMBIGUOUS · INFERRED: 122 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `4e4409b7`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- Pizza Shop POS README
- web/package.json
- AppShell.tsx
- compilerOptions
- PizzaShop.Api.Db
- package.json
- http
- postgres service (postgres:18-alpine, pizzashop-db)
- PizzaShop.Api.csproj
- Globe Icon (world/web, 16x16 gray)
- Next.js Wordmark Logo (black)
- ApiFactory
- system_componentmodel_dataannotations
- MigrationBuilder
- .AddPizzaShopRateLimiting
- RecipeItem
- PizzaShopContext
- Order
- PizzaShop.Api.Migrations
- .UpdateRoles
- .Update
- .Update
- .Create
- OrderDto.cs
- .GetAll
- Ingredient
- ToppingAmount
- .PlaceAsync
- .BuildModel
- .TransformAsync
- OrderItem
- OrderType
- AddOrderIdempotencyKey
- AddIdentity
- PizzaSize
- AddMenuActiveAndOrderCancellation
- UnitOfMeasure
- TestApi.cs
- OrdersEndpoints.cs
- OrderStatus
- .NewUserAsync
- .AddFrontendCors
- AddIngredientToppingFields
- RecipeDto.cs
- microsoft_entityframeworkcore
- OrderItemTopping

## God Nodes (most connected - your core abstractions)
1. `PizzaShopContext` - 60 edges
2. `Order` - 30 edges
3. `TestApi` - 26 edges
4. `PizzaShop.Api.Models` - 24 edges
5. `ApiFactory` - 21 edges
6. `PizzaShop.Api.Requests` - 21 edges
7. `OrderItem` - 19 edges
8. `OrdersEndpoints` - 18 edges
9. `Ingredient` - 18 edges
10. `TestUser` - 16 edges

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

## Communities (107 total, 75 thin omitted)

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

### Community 4 - "PizzaShop.Api.Db"
Cohesion: 0.24
Nodes (7): Policies, Roles, CurrentUserDto, PizzaShop.Api.Auth, PizzaShop.Api.Db, PizzaShop.Api.Dtos, PizzaShop.Api.Endpoints

### Community 5 - "package.json"
Cohesion: 0.11
Nodes (17): devDependencies, concurrently, open-cli, wait-on, name, packageManager, private, scripts (+9 more)

### Community 6 - "http"
Cohesion: 0.13
Nodes (15): ASPNETCORE_ENVIRONMENT, applicationUrl, commandName, dotnetRunMessages, environmentVariables, launchBrowser, applicationUrl, commandName (+7 more)

### Community 8 - "postgres service (postgres:18-alpine, pizzashop-db)"
Cohesion: 0.33
Nodes (6): postgres service (postgres:18-alpine, pizzashop-db), postgres_data volume, EF Core Migrations workflow, .env.example database credentials template, Root pnpm scripts (dev, dev:web, dev:api, db:up, db:down), Podman compose (db scripts runtime)

### Community 9 - "PizzaShop.Api.csproj"
Cohesion: 0.11
Nodes (16): net10.0, coverlet.collector (6.0.4), Microsoft.AspNetCore.DataProtection.EntityFrameworkCore (10.0.12), Microsoft.AspNetCore.Identity.EntityFrameworkCore (10.0.12), Microsoft.AspNetCore.Mvc.Testing (10.0.12), Microsoft.AspNetCore.OpenApi (10.0.12), Microsoft.EntityFrameworkCore.Design (10.0.12), Microsoft.Extensions.Diagnostics.HealthChecks.EntityFrameworkCore (10.0.12) (+8 more)

### Community 10 - "Globe Icon (world/web, 16x16 gray)"
Cohesion: 0.67
Nodes (3): File Icon (document outline, 16x16 gray), Globe Icon (world/web, 16x16 gray), Browser Window Icon (16x16 gray)

### Community 13 - "ApiFactory"
Cohesion: 0.06
Nodes (12): HealthTests, ApiCollection, ApiFactory, Environment, Settings, DevelopmentApiFactory, Environment, RateLimitedApiFactory (+4 more)

### Community 14 - "system_componentmodel_dataannotations"
Cohesion: 0.16
Nodes (6): AdjustIngredientStockRequest, CreatePizzaSizeRequest, CreateUnitOfMeasureRequest, UpdatePizzaSizeRequest, UpdateUnitOfMeasureRequest, PizzaShop.Api.Requests

### Community 16 - ".AddPizzaShopRateLimiting"
Cohesion: 0.19
Nodes (5): RateLimitingExtensions, RateLimitingOptions, AuthPerMinute, OrderCreatePerMinute, UserPerMinute

### Community 19 - "RecipeItem"
Cohesion: 0.07
Nodes (9): AuthExtensions, DevelopmentSeeder, RecipeItem, Amount, Ingredient, IngredientId, Recipe, RecipeId (+1 more)

### Community 20 - "PizzaShopContext"
Cohesion: 0.06
Nodes (19): PizzaShopContext, DataProtectionKeys, Ingredients, OrderIngredientUsages, OrderItems, OrderItemToppings, Orders, PizzaSizes (+11 more)

### Community 21 - "Order"
Cohesion: 0.08
Nodes (19): Order, CancellationReason, CancelledAt, CancelledBy, CancelledByUserId, CreatedAt, IdempotencyKey, IngredientUsages (+11 more)

### Community 23 - ".UpdateRoles"
Cohesion: 0.10
Nodes (3): UserDto, UsersEndpoints, AppUser

### Community 24 - ".Update"
Cohesion: 0.09
Nodes (10): RecipeDto, RecipeItemDto, RecipeMapper, RecipesEndpoints, Recipe, BasePrice, IsActive, Name (+2 more)

### Community 26 - ".Update"
Cohesion: 0.11
Nodes (5): PizzaSizeDto, PizzaSizeMapper, UnitOfMeasureDto, UnitOfMeasureMapper, UnitsOfMeasureEndpoints

### Community 28 - "OrderDto.cs"
Cohesion: 0.32
Nodes (6): OrderDto, OrderItemDto, OrderItemToppingDto, OrderMapper, OrderSummaryDto, PagedResult

### Community 31 - "Ingredient"
Cohesion: 0.10
Nodes (13): IngredientDto, IngredientMapper, IngredientsEndpoints, Ingredient, CurrentStock, IngredientId, IsActive, Name (+5 more)

### Community 32 - "ToppingAmount"
Cohesion: 0.22
Nodes (8): ToppingAmount, Extra, Light, Standard, ToppingCoverage, LeftHalf, RightHalf, Whole

### Community 38 - ".PlaceAsync"
Cohesion: 0.26
Nodes (4): CancelOrderRequest, UpdateOrderStatusRequest, UpdateRecipeRequest, CancellationTests

### Community 42 - "OrderItem"
Cohesion: 0.12
Nodes (13): OrderItem, ItemNameSnapshot, LineTotal, Order, OrderId, OrderItemId, PizzaSize, PizzaSizeId (+5 more)

### Community 44 - "OrderType"
Cohesion: 0.33
Nodes (5): OrderType, Delivery, DineIn, Takeout, CreateOrderRequest

### Community 47 - "PizzaSize"
Cohesion: 0.40
Nodes (4): PizzaSize, Name, PizzaSizeId, PriceMultiplier

### Community 49 - "UnitOfMeasure"
Cohesion: 0.40
Nodes (3): UnitOfMeasure, Name, UnitOfMeasureId

### Community 50 - "TestApi.cs"
Cohesion: 0.12
Nodes (3): ForwardedHeadersExtensions, PizzaShop.Api.Tests, PizzaShop.Api.Tests.Infrastructure

### Community 51 - "OrdersEndpoints.cs"
Cohesion: 0.15
Nodes (5): RateLimitPolicies, OrderOptions, TaxRate, PizzaShop.Api.Extensions, PizzaShop.Api.Options

### Community 53 - "OrderStatus"
Cohesion: 0.33
Nodes (6): OrderStatus, Cancelled, Completed, Pending, Preparing, Ready

### Community 57 - ".NewUserAsync"
Cohesion: 0.06
Nodes (14): CreateIngredientRequest, CreateRecipeRequest, OrderItemRequest, OrderItemToppingRequest, RecipeItemRequest, UpdateUserRolesRequest, CatalogTests, LoginResponse (+6 more)

### Community 105 - "OrderItemTopping"
Cohesion: 0.20
Nodes (9): OrderItemTopping, Coverage, ExtraAmount, Ingredient, IngredientId, OrderItem, OrderItemId, OrderItemToppingId (+1 more)

## Ambiguous Edges - Review These
- `pnpm workspace (packages: web)` → `Tech Stack (pnpm, Next.js 16, ASP.NET 10, PostgreSQL, Azure)`  [AMBIGUOUS]
  pnpm-workspace.yaml · relation: conceptually_related_to

## Knowledge Gaps
- **138 isolated node(s):** `Environment`, `Settings`, `Settings`, `Environment`, `ConnectionString` (+133 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 486 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **75 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `PizzaShopContext` connect `PizzaShopContext` to `PizzaShopContext.cs`, `Order`, `.UpdateRoles`, `.Update`, `.Update`, `.GetAll`, `Ingredient`?**
  _High betweenness centrality (0.164) - this node is a cross-community bridge._
- **What connects `Environment`, `Settings`, `Settings` to the rest of the system?**
  _138 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Pizza Shop POS README` be split into smaller, more focused modules?**
  _Cohesion score 0.1164021164021164 - nodes in this community are weakly interconnected._
- **Why does `Order` connect `Order` to `microsoft_entityframeworkcore`, `OrderType`, `PizzaShopContext`, `OrderStatus`, `OrderDto.cs`?**
  _High betweenness centrality (0.061) - this node is a cross-community bridge._
- **Should `web/package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.0625 - nodes in this community are weakly interconnected._
- **Why does `PizzaShop.Api.Models` connect `microsoft_entityframeworkcore` to `ToppingAmount`, `PizzaShop.Api.Db`, `PizzaShopContext.cs`, `RecipeDto.cs`, `system_componentmodel_dataannotations`, `UnitOfMeasure`, `OrderDto.cs`?**
  _High betweenness centrality (0.048) - this node is a cross-community bridge._

### Low-confidence Hints
_AMBIGUOUS edges — the extractor was unsure. Verify before acting on these._

- **What is the exact relationship between `pnpm workspace (packages: web)` and `Tech Stack (pnpm, Next.js 16, ASP.NET 10, PostgreSQL, Azure)`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._