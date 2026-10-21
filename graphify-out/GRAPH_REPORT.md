# Graph Report - pizza-shop  (2026-10-21)

## Corpus Check
- 178 files · ~40,867 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 6 file(s) not represented in the graph (top: .example 2, (none) 2, .ico 1)

## Summary
- 1472 nodes · 3123 edges · 125 communities (53 shown, 72 thin omitted)
- Extraction: 96% EXTRACTED · 4% INFERRED · 0% AMBIGUOUS · INFERRED: 132 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `6beb0795`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- Pizza Shop POS README
- web/package.json
- react
- compilerOptions
- OrderActions.tsx
- package.json
- http
- postgres service (postgres:18-alpine, pizzashop-db)
- PizzaShop.Api.csproj
- Globe Icon (world/web, 16x16 gray)
- orders/page.tsx
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
- problem.ts
- .Create
- OrderDto.cs
- .GetAll
- .Update
- OrderType
- .Update
- .BuildModel
- .TransformAsync
- OrderItem
- OrderItemRequest
- orders/[id]/page.tsx
- CartView.tsx
- Ingredient
- UserMenu.tsx
- .Update
- system_net
- PizzaBuilder.tsx
- OrderIngredientUsage
- OrderStatus
- .NameTakenAsync
- ComingSoon
- .NewUserAsync
- api/menu.ts
- auth/actions.ts
- schemas/orders.ts
- PizzaShop.Api.Dtos
- orders/actions.ts
- CartButton.tsx
- next
- PizzaShop.Api.Auth
- proxy.ts
- dependencies
- ToppingCoverage
- CartView
- .FromPriced
- OrderItemTopping
- devDependencies
- OrdersEndpoints.cs
- scripts
- eslint.config.mjs

## God Nodes (most connected - your core abstractions)
1. `PizzaShopContext` - 32 edges
2. `Order` - 30 edges
3. `next` - 30 edges
4. `PizzaShop.Api.Models` - 29 edges
5. `Ingredient` - 28 edges
6. `react` - 26 edges
7. `TestApi` - 24 edges
8. `Recipe` - 23 edges
9. `PizzaShop.Api.Requests` - 20 edges
10. `ApiFactory` - 19 edges

## Surprising Connections (you probably didn't know these)
- `Next.js Agent Rules (breaking-change docs warning)` --conceptually_related_to--> `Frontend Conventions (Server Components, Zod, feature hooks)`  [INFERRED]
  web/AGENTS.md → CLAUDE.md
- `OrderCalculatorTests` --references--> `PizzaSize`  [EXTRACTED]
  Tests/PizzaShop.Api.Tests/OrderCalculatorTests.cs → api/Models/PizzaSize.cs
- `Pizza Shop POS README` --semantically_similar_to--> `Pizza Shop POS`  [INFERRED] [semantically similar]
  README.md → CLAUDE.md
- `Pizza Shop POS README` --references--> `30-minute Session Timeout (production)`  [INFERRED]
  README.md → CLAUDE.md
- `pnpm workspace (packages: web)` --conceptually_related_to--> `Tech Stack (pnpm, Next.js 16, ASP.NET 10, PostgreSQL, Azure)`  [AMBIGUOUS]
  pnpm-workspace.yaml → CLAUDE.md

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Order creation inventory deduction flow** — claude_inventory_deduction, claude_orderitems, claude_orderitemtoppings, claude_recipeitems, claude_ingredients [EXTRACTED 1.00]
- **Local dev database setup** — readme_pnpm_scripts, readme_env_example, readme_podman_compose, docker_compose_postgres, docker_compose_postgres_data [INFERRED 0.85]
- **Price snapshot pattern for historical stability** — claude_price_stability, claude_orderitems, claude_orderitemtoppings, claude_orders [INFERRED 0.85]
- **create-next-app Default Boilerplate Assets (currently unused)** — web_public_file_file_icon, web_public_globe_globe_icon, web_public_next_next_js_wordmark, web_public_vercel_vercel_logo, web_public_window_window_icon [INFERRED 0.85]

## Communities (125 total, 72 thin omitted)

### Community 0 - "Pizza Shop POS README"
Cohesion: 0.12
Nodes (19): Ingredients table, OrderItems table, OrderItemToppings table, Orders table, Pizza Customizer (size, crust, fractional toppings), Pizza Shop POS, PizzaSizes table, RecipeItems table (+11 more)

### Community 1 - "web/package.json"
Cohesion: 0.11
Nodes (17): class-variance-authority, cn, next-themes, radix-ui, react-dom, shadcn, sonner, tailwindcss (+9 more)

### Community 2 - "react"
Cohesion: 0.06
Nodes (48): react, AppLayout(), AuthLayout(), geistMono, geistSans, metadata, AppShell(), AppShellProps (+40 more)

### Community 3 - "compilerOptions"
Cohesion: 0.11
Nodes (18): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+10 more)

### Community 4 - "OrderActions.tsx"
Cohesion: 0.11
Nodes (7): CancelOrderDialog(), OrderActions(), OrderActionsProps, reportFailure(), FormAlert(), isCancellable(), nextStatuses()

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

### Community 11 - "orders/page.tsx"
Cohesion: 0.11
Nodes (18): FILTERS, hrefFor(), metadata, OrdersPage(), OrdersTable(), OrdersTableSkeleton(), StatusFilters(), STATUS_CLASSES (+10 more)

### Community 13 - "ApiFactory"
Cohesion: 0.07
Nodes (12): HealthTests, ApiCollection, ApiFactory, Environment, Settings, DevelopmentApiFactory, Environment, RateLimitedApiFactory (+4 more)

### Community 14 - "PizzaShop.Api.Models"
Cohesion: 0.07
Nodes (14): AdjustIngredientStockRequest, CancelOrderRequest, CreateIngredientRequest, CreatePizzaSizeRequest, CreateRecipeRequest, CreateUnitOfMeasureRequest, QuoteOrderRequest, RecipeItemRequest (+6 more)

### Community 15 - "MigrationBuilder"
Cohesion: 0.05
Nodes (5): InitialCreate, AddRecipeItemUniqueIndex, AddIngredientToppingFields, AddOrderIdempotencyKey, AddIdentity

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

### Community 22 - "PizzaShop.Api.Migrations"
Cohesion: 0.30
Nodes (3): AddMenuActiveAndOrderCancellation, PizzaShop.Api.Migrations, PizzaShop.Api.Db

### Community 23 - ".UpdateRoles"
Cohesion: 0.10
Nodes (3): UserDto, UsersEndpoints, AppUser

### Community 26 - "problem.ts"
Cohesion: 0.27
Nodes (8): RFC-9457, describeApiError(), lowerFirst(), Problem, problemSchema, toFieldErrors(), toFieldPath(), ActionFailure

### Community 28 - "OrderDto.cs"
Cohesion: 0.32
Nodes (6): OrderDto, OrderItemDto, OrderItemToppingDto, OrderMapper, OrderSummaryDto, PagedResult

### Community 31 - ".Update"
Cohesion: 0.13
Nodes (3): IngredientDto, IngredientMapper, IngredientsEndpoints

### Community 32 - "OrderType"
Cohesion: 0.22
Nodes (8): OrderType, Delivery, DineIn, Takeout, ToppingAmount, Extra, Light, Standard

### Community 38 - ".Update"
Cohesion: 0.15
Nodes (3): UnitOfMeasureDto, UnitOfMeasureMapper, UnitsOfMeasureEndpoints

### Community 42 - "OrderItem"
Cohesion: 0.12
Nodes (13): OrderItem, ItemNameSnapshot, LineTotal, Order, OrderId, OrderItemId, PizzaSize, PizzaSizeId (+5 more)

### Community 45 - "orders/[id]/page.tsx"
Cohesion: 0.25
Nodes (13): metadata, MyOrder(), MyOrderPage(), MyOrderSkeleton(), Detail(), metadata, OrderDetail(), OrderDetailSkeleton() (+5 more)

### Community 46 - "CartView.tsx"
Cohesion: 0.20
Nodes (9): lucide-react, ORDER_TYPE_CHOICES, MenuPage(), metadata, RecipeGrid(), RecipeGridSkeleton(), metadata, metadata (+1 more)

### Community 47 - "Ingredient"
Cohesion: 0.05
Nodes (28): INamedEntity, Name, Ingredient, CurrentStock, IngredientId, IsActive, Name, ToppingPortion (+20 more)

### Community 48 - "UserMenu.tsx"
Cohesion: 0.17
Nodes (3): UserMenuProps, logout(), clearSessionCookies()

### Community 49 - ".Update"
Cohesion: 0.14
Nodes (3): PizzaSizeDto, PizzaSizeMapper, PizzaSizesEndpoints

### Community 51 - "PizzaBuilder.tsx"
Cohesion: 0.10
Nodes (27): AMOUNT_CHOICES, COVERAGE_CHOICES, PizzaBuilder(), PizzaBuilderProps, CartContext, CartLine, CartProvider(), CartState (+19 more)

### Community 52 - "OrderIngredientUsage"
Cohesion: 0.25
Nodes (7): OrderIngredientUsage, Amount, Ingredient, IngredientId, Order, OrderId, OrderIngredientUsageId

### Community 53 - "OrderStatus"
Cohesion: 0.33
Nodes (6): OrderStatus, Cancelled, Completed, Pending, Preparing, Ready

### Community 55 - "ComingSoon"
Cohesion: 0.28
Nodes (10): AnalyticsPage(), InventoryPage(), MyOrdersPage(), RecipesPage(), UsersPage(), ComingSoon(), ComingSoonProps, AdminOnly() (+2 more)

### Community 57 - ".NewUserAsync"
Cohesion: 0.06
Nodes (11): UpdateOrderStatusRequest, UpdateUserRolesRequest, CancellationTests, CatalogTests, LoginResponse, TestApi, TestUser, OrdersTests (+3 more)

### Community 58 - "api/menu.ts"
Cohesion: 0.19
Nodes (17): server-only, POST(), problemJson(), placeOrder(), Builder(), BuilderPage(), BuilderSkeleton(), metadata (+9 more)

### Community 68 - "auth/actions.ts"
Cohesion: 0.13
Nodes (24): @hookform/resolvers, react-hook-form, FIELDS, LoginForm(), LoginPage(), RegisterPage(), FIELDS, RegisterForm() (+16 more)

### Community 69 - "schemas/orders.ts"
Cohesion: 0.09
Nodes (23): quoteKey(), useQuote(), CancelOrderInput, cancelOrderSchema, CreateOrderInput, createOrderSchema, Order, ORDER_WORKFLOW (+15 more)

### Community 71 - "PizzaShop.Api.Dtos"
Cohesion: 0.12
Nodes (7): CurrentUserDto, RecipeDto, RecipeItemDto, RecipeMapper, ToppingDto, ToppingMapper, PizzaShop.Api.Dtos

### Community 72 - "orders/actions.ts"
Cohesion: 0.20
Nodes (17): zod, idempotencyKeySchema, advanceStatus(), cancelOrder(), orderFailure(), orderIdSchema, apiFetch(), ApiFetchOptions (+9 more)

### Community 74 - "CartButton.tsx"
Cohesion: 0.22
Nodes (3): Choice, ChoiceGroup(), ChoiceGroupProps

### Community 75 - "next"
Cohesion: 0.36
Nodes (7): next, CustomerRedirect(), Home(), getCurrentUser, homePathFor(), getAccessToken(), nextConfig

### Community 76 - "PizzaShop.Api.Auth"
Cohesion: 0.33
Nodes (3): Policies, Roles, PizzaShop.Api.Auth

### Community 77 - "proxy.ts"
Cohesion: 0.25
Nodes (13): LoginResponse, ACCESS_COOKIE, ACCESS_EXPIRES_COOKIE, cookieOptions, REFRESH_COOKIE, SESSION_COOKIES, sessionCookieValues(), setSessionCookies() (+5 more)

### Community 78 - "dependencies"
Cohesion: 0.12
Nodes (16): dependencies, class-variance-authority, cn, @hookform/resolvers, lucide-react, next, next-themes, radix-ui (+8 more)

### Community 79 - "ToppingCoverage"
Cohesion: 0.50
Nodes (4): ToppingCoverage, LeftHalf, RightHalf, Whole

### Community 81 - "CartView"
Cohesion: 0.67
Nodes (3): CartView(), CartPage(), metadata

### Community 103 - ".FromPriced"
Cohesion: 0.26
Nodes (4): OrderQuoteDto, OrderQuoteItemDto, OrderQuoteMapper, OrderQuoteToppingDto

### Community 105 - "OrderItemTopping"
Cohesion: 0.20
Nodes (9): OrderItemTopping, Coverage, ExtraAmount, Ingredient, IngredientId, OrderItem, OrderItemId, OrderItemToppingId (+1 more)

### Community 112 - "devDependencies"
Cohesion: 0.22
Nodes (9): devDependencies, eslint, eslint-config-next, tailwindcss, @tailwindcss/turbopack, @types/node, @types/react, @types/react-dom (+1 more)

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
- **146 isolated node(s):** `class-variance-authority`, `cn`, `next-themes`, `radix-ui`, `react-dom` (+141 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 609 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **72 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `PizzaShopContext` connect `PizzaShopContext` to `PizzaShopContext.cs`, `Ingredient`, `OrderIngredientUsage`, `Order`, `.NameTakenAsync`, `.UpdateRoles`, `.ConfigureConventions`, `.GetAll`?**
  _High betweenness centrality (0.046) - this node is a cross-community bridge._
- **Are the 6 inferred relationships involving `Ingredient` (e.g. with `.Create()` and `.SameIngredientAcrossItemsAndToppings_IsOneUsage()`) actually correct?**
  _`Ingredient` has 6 INFERRED edges - model-reasoned connections that need verification._
- **What connects `class-variance-authority`, `cn`, `next-themes` to the rest of the system?**
  _146 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Pizza Shop POS README` be split into smaller, more focused modules?**
  _Cohesion score 0.1164021164021164 - nodes in this community are weakly interconnected._
- **Why does `OrderItemTopping` connect `OrderItemTopping` to `OrderType`, `OrderItem`, `PizzaShop.Api.Models`, `Ingredient`, `ToppingCoverage`?**
  _High betweenness centrality (0.032) - this node is a cross-community bridge._
- **Should `web/package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.1111111111111111 - nodes in this community are weakly interconnected._

### Low-confidence Hints
_AMBIGUOUS edges — the extractor was unsure. Verify before acting on these._

- **What is the exact relationship between `pnpm workspace (packages: web)` and `Tech Stack (pnpm, Next.js 16, ASP.NET 10, PostgreSQL, Azure)`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._