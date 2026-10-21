# Graph Report - pizza-shop  (2026-10-21)

## Corpus Check
- 161 files · ~35,544 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 6 file(s) not represented in the graph (top: .example 2, (none) 2, .ico 1)

## Summary
- 1365 nodes · 2731 edges · 117 communities (45 shown, 72 thin omitted)
- Extraction: 95% EXTRACTED · 5% INFERRED · 0% AMBIGUOUS · INFERRED: 130 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `14224fdb`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- Pizza Shop POS README
- web/package.json
- NavLinks.tsx
- compilerOptions
- OrderActions.tsx
- package.json
- http
- postgres service (postgres:18-alpine, pizzashop-db)
- PizzaShop.Api.csproj
- Globe Icon (world/web, 16x16 gray)
- [id]/page.tsx
- Next.js Wordmark Logo (black)
- ApiFactory
- PizzaShop.Api.Models
- MigrationBuilder
- RateLimitingExtensions.cs
- RecipeItem
- PizzaShopContext
- Order
- PizzaShop.Api.Migrations
- .UpdateRoles
- .Update
- client.ts
- .Create
- OrderDto.cs
- .GetAll
- .Update
- ToppingAmount
- auth/actions.ts
- .BuildModel
- .TransformAsync
- OrderItem
- PizzaShop.Api.Dtos
- OrderType
- AddOrderIdempotencyKey
- currentUser.ts
- .Price
- UserMenu.tsx
- .Update
- OrdersEndpoints.cs
- OrderIngredientUsage
- OrderStatus
- .NameTakenAsync
- ComingSoon
- .NewUserAsync
- .Price
- AddIngredientToppingFields
- RecipeDto.cs
- proxy.ts
- dependencies
- OrderItemTopping
- Ingredient
- Recipe
- PizzaSize
- devDependencies
- UnitOfMeasure
- PizzaShop.Api.Auth
- scripts
- eslint.config.mjs

## God Nodes (most connected - your core abstractions)
1. `PizzaShopContext` - 32 edges
2. `Order` - 30 edges
3. `PizzaShop.Api.Models` - 30 edges
4. `Ingredient` - 29 edges
5. `TestApi` - 25 edges
6. `Recipe` - 24 edges
7. `next` - 21 edges
8. `ApiFactory` - 20 edges
9. `OrderItem` - 19 edges
10. `react` - 18 edges

## Surprising Connections (you probably didn't know these)
- `OrderCalculatorTests` --references--> `PizzaSize`  [EXTRACTED]
  Tests/PizzaShop.Api.Tests/OrderCalculatorTests.cs → api/Models/PizzaSize.cs
- `Next.js Agent Rules (breaking-change docs warning)` --conceptually_related_to--> `Frontend Conventions (Server Components, Zod, feature hooks)`  [INFERRED]
  web/AGENTS.md → CLAUDE.md
- `LoginPage()` --calls--> `LoginForm()`  [EXTRACTED]
  web/app/(auth)/login/page.tsx → web/app/(auth)/login/LoginForm.tsx
- `RegisterPage()` --calls--> `RegisterForm()`  [EXTRACTED]
  web/app/(auth)/register/page.tsx → web/app/(auth)/register/RegisterForm.tsx
- `Pizza Shop POS README` --semantically_similar_to--> `Pizza Shop POS`  [INFERRED] [semantically similar]
  README.md → CLAUDE.md

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Order creation inventory deduction flow** — claude_inventory_deduction, claude_orderitems, claude_orderitemtoppings, claude_recipeitems, claude_ingredients [EXTRACTED 1.00]
- **Local dev database setup** — readme_pnpm_scripts, readme_env_example, readme_podman_compose, docker_compose_postgres, docker_compose_postgres_data [INFERRED 0.85]
- **Price snapshot pattern for historical stability** — claude_price_stability, claude_orderitems, claude_orderitemtoppings, claude_orders [INFERRED 0.85]
- **create-next-app Default Boilerplate Assets (currently unused)** — web_public_file_file_icon, web_public_globe_globe_icon, web_public_next_next_js_wordmark, web_public_vercel_vercel_logo, web_public_window_window_icon [INFERRED 0.85]

## Communities (117 total, 72 thin omitted)

### Community 0 - "Pizza Shop POS README"
Cohesion: 0.12
Nodes (19): Ingredients table, OrderItems table, OrderItemToppings table, Orders table, Pizza Customizer (size, crust, fractional toppings), Pizza Shop POS, PizzaSizes table, RecipeItems table (+11 more)

### Community 1 - "web/package.json"
Cohesion: 0.11
Nodes (17): class-variance-authority, cn, next-themes, radix-ui, react-dom, shadcn, sonner, tailwindcss (+9 more)

### Community 2 - "NavLinks.tsx"
Cohesion: 0.06
Nodes (46): AppLayout(), AuthLayout(), geistMono, geistSans, metadata, AppShell(), AppShellProps, Brand() (+38 more)

### Community 3 - "compilerOptions"
Cohesion: 0.11
Nodes (18): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+10 more)

### Community 4 - "OrderActions.tsx"
Cohesion: 0.06
Nodes (26): @hookform/resolvers, advanceStatus(), cancelOrder(), orderFailure(), orderIdSchema, CancelOrderDialog(), OrderActions(), OrderActionsProps (+18 more)

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

### Community 11 - "[id]/page.tsx"
Cohesion: 0.09
Nodes (25): Detail(), ItemsTable(), metadata, OrderDetail(), OrderDetailSkeleton(), OrderPage(), FILTERS, hrefFor() (+17 more)

### Community 13 - "ApiFactory"
Cohesion: 0.06
Nodes (12): HealthTests, ApiCollection, ApiFactory, Environment, Settings, DevelopmentApiFactory, Environment, RateLimitedApiFactory (+4 more)

### Community 14 - "PizzaShop.Api.Models"
Cohesion: 0.08
Nodes (13): AdjustIngredientStockRequest, CancelOrderRequest, CreateIngredientRequest, CreatePizzaSizeRequest, CreateRecipeRequest, CreateUnitOfMeasureRequest, RecipeItemRequest, UpdateIngredientRequest (+5 more)

### Community 15 - "MigrationBuilder"
Cohesion: 0.07
Nodes (4): InitialCreate, AddRecipeItemUniqueIndex, AddIdentity, AddMenuActiveAndOrderCancellation

### Community 16 - "RateLimitingExtensions.cs"
Cohesion: 0.06
Nodes (12): CorsExtensions, ForwardedHeadersExtensions, RateLimitingExtensions, RateLimitPolicies, OrderOptions, TaxRate, RateLimitingOptions, AuthPerMinute (+4 more)

### Community 19 - "RecipeItem"
Cohesion: 0.07
Nodes (9): AuthExtensions, DevelopmentSeeder, RecipeItem, Amount, Ingredient, IngredientId, Recipe, RecipeId (+1 more)

### Community 20 - "PizzaShopContext"
Cohesion: 0.10
Nodes (11): PizzaShopContext, DataProtectionKeys, Ingredients, OrderIngredientUsages, OrderItems, OrderItemToppings, Orders, PizzaSizes (+3 more)

### Community 21 - "Order"
Cohesion: 0.08
Nodes (19): Order, CancellationReason, CancelledAt, CancelledBy, CancelledByUserId, CreatedAt, IdempotencyKey, IngredientUsages (+11 more)

### Community 23 - ".UpdateRoles"
Cohesion: 0.10
Nodes (3): UserDto, UsersEndpoints, AppUser

### Community 26 - "client.ts"
Cohesion: 0.12
Nodes (26): RFC-9457, server-only, zod, apiFetch(), ApiFetchOptions, apiJson(), withSession(), apiBaseUrl() (+18 more)

### Community 28 - "OrderDto.cs"
Cohesion: 0.32
Nodes (6): OrderDto, OrderItemDto, OrderItemToppingDto, OrderMapper, OrderSummaryDto, PagedResult

### Community 31 - ".Update"
Cohesion: 0.15
Nodes (3): IngredientDto, IngredientMapper, IngredientsEndpoints

### Community 32 - "ToppingAmount"
Cohesion: 0.22
Nodes (8): ToppingAmount, Extra, Light, Standard, ToppingCoverage, LeftHalf, RightHalf, Whole

### Community 38 - "auth/actions.ts"
Cohesion: 0.17
Nodes (24): react-hook-form, FIELDS, LoginForm(), FIELDS, RegisterForm(), FormAlert(), FormInput(), getClientIp() (+16 more)

### Community 42 - "OrderItem"
Cohesion: 0.12
Nodes (13): OrderItem, ItemNameSnapshot, LineTotal, Order, OrderId, OrderItemId, PizzaSize, PizzaSizeId (+5 more)

### Community 44 - "OrderType"
Cohesion: 0.33
Nodes (5): OrderType, Delivery, DineIn, Takeout, CreateOrderRequest

### Community 46 - "currentUser.ts"
Cohesion: 0.14
Nodes (12): next, react, CustomerRedirect(), Home(), LoginPage(), metadata, metadata, RegisterPage() (+4 more)

### Community 49 - ".Update"
Cohesion: 0.06
Nodes (8): PizzaSizeDto, PizzaSizeMapper, ToppingDto, ToppingMapper, UnitOfMeasureDto, UnitOfMeasureMapper, PizzaSizesEndpoints, UnitsOfMeasureEndpoints

### Community 50 - "OrdersEndpoints.cs"
Cohesion: 0.11
Nodes (4): PizzaShop.Api.Endpoints, PizzaShop.Api.Tests, PizzaShop.Api.Orders, PizzaShop.Api.Tests.Infrastructure

### Community 52 - "OrderIngredientUsage"
Cohesion: 0.25
Nodes (7): OrderIngredientUsage, Amount, Ingredient, IngredientId, Order, OrderId, OrderIngredientUsageId

### Community 53 - "OrderStatus"
Cohesion: 0.33
Nodes (6): OrderStatus, Cancelled, Completed, Pending, Preparing, Ready

### Community 55 - "ComingSoon"
Cohesion: 0.25
Nodes (11): AnalyticsPage(), InventoryPage(), MenuPage(), MyOrdersPage(), RecipesPage(), UsersPage(), ComingSoon(), ComingSoonProps (+3 more)

### Community 57 - ".NewUserAsync"
Cohesion: 0.05
Nodes (12): OrderItemRequest, UpdateOrderStatusRequest, UpdateUserRolesRequest, CancellationTests, CatalogTests, LoginResponse, TestApi, TestUser (+4 more)

### Community 76 - "RecipeDto.cs"
Cohesion: 0.36
Nodes (3): RecipeDto, RecipeItemDto, RecipeMapper

### Community 77 - "proxy.ts"
Cohesion: 0.25
Nodes (13): LoginResponse, ACCESS_COOKIE, ACCESS_EXPIRES_COOKIE, cookieOptions, REFRESH_COOKIE, SESSION_COOKIES, sessionCookieValues(), setSessionCookies() (+5 more)

### Community 78 - "dependencies"
Cohesion: 0.12
Nodes (16): dependencies, class-variance-authority, cn, @hookform/resolvers, lucide-react, next, next-themes, radix-ui (+8 more)

### Community 105 - "OrderItemTopping"
Cohesion: 0.20
Nodes (9): OrderItemTopping, Coverage, ExtraAmount, Ingredient, IngredientId, OrderItem, OrderItemId, OrderItemToppingId (+1 more)

### Community 109 - "Ingredient"
Cohesion: 0.18
Nodes (9): Ingredient, CurrentStock, IngredientId, IsActive, Name, ToppingPortion, ToppingPrice, UnitOfMeasure (+1 more)

### Community 110 - "Recipe"
Cohesion: 0.20
Nodes (6): Recipe, BasePrice, IsActive, Name, RecipeId, RecipeItems

### Community 111 - "PizzaSize"
Cohesion: 0.22
Nodes (4): PizzaSize, Name, PizzaSizeId, PriceMultiplier

### Community 112 - "devDependencies"
Cohesion: 0.22
Nodes (9): devDependencies, eslint, eslint-config-next, tailwindcss, @tailwindcss/turbopack, @types/node, @types/react, @types/react-dom (+1 more)

### Community 113 - "UnitOfMeasure"
Cohesion: 0.29
Nodes (5): INamedEntity, Name, UnitOfMeasure, Name, UnitOfMeasureId

### Community 114 - "PizzaShop.Api.Auth"
Cohesion: 0.33
Nodes (3): Policies, Roles, PizzaShop.Api.Auth

### Community 115 - "scripts"
Cohesion: 0.40
Nodes (5): scripts, build, dev, lint, start

### Community 116 - "eslint.config.mjs"
Cohesion: 0.50
Nodes (3): eslint, eslint-config-next, eslintConfig

## Ambiguous Edges - Review These
- `pnpm workspace (packages: web)` → `Tech Stack (pnpm, Next.js 16, ASP.NET 10, PostgreSQL, Azure)`  [AMBIGUOUS]
  pnpm-workspace.yaml · relation: conceptually_related_to

## Knowledge Gaps
- **146 isolated node(s):** `RFC-9457`, `class-variance-authority`, `cn`, `next-themes`, `radix-ui` (+141 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 591 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **72 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `PizzaShopContext` connect `PizzaShopContext` to `PizzaShop.Api.Dtos`, `Ingredient`, `Recipe`, `OrderIngredientUsage`, `Order`, `.NameTakenAsync`, `.UpdateRoles`, `.ConfigureConventions`, `.GetAll`?**
  _High betweenness centrality (0.048) - this node is a cross-community bridge._
- **Are the 6 inferred relationships involving `Ingredient` (e.g. with `.Create()` and `.SameIngredientAcrossItemsAndToppings_IsOneUsage()`) actually correct?**
  _`Ingredient` has 6 INFERRED edges - model-reasoned connections that need verification._
- **What connects `RFC-9457`, `class-variance-authority`, `cn` to the rest of the system?**
  _146 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Pizza Shop POS README` be split into smaller, more focused modules?**
  _Cohesion score 0.1164021164021164 - nodes in this community are weakly interconnected._
- **Why does `PizzaShop.Api.Models` connect `PizzaShop.Api.Models` to `ToppingAmount`, `PizzaShop.Api.Dtos`, `RecipeDto.cs`, `.Update`, `OrdersEndpoints.cs`, `UnitOfMeasure`, `OrderDto.cs`?**
  _High betweenness centrality (0.048) - this node is a cross-community bridge._
- **Should `web/package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.1111111111111111 - nodes in this community are weakly interconnected._

### Low-confidence Hints
_AMBIGUOUS edges — the extractor was unsure. Verify before acting on these._

- **What is the exact relationship between `pnpm workspace (packages: web)` and `Tech Stack (pnpm, Next.js 16, ASP.NET 10, PostgreSQL, Azure)`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._