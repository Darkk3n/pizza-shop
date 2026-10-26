# Graph Report - pizza-shop  (2026-10-25)

## Corpus Check
- 185 files · ~43,271 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 6 file(s) not represented in the graph (top: .example 2, (none) 2, .ico 1)

## Summary
- 1511 nodes · 3312 edges · 140 communities (60 shown, 80 thin omitted)
- Extraction: 96% EXTRACTED · 4% INFERRED · 0% AMBIGUOUS · INFERRED: 133 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `e84ab90c`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- Pizza Shop POS README
- web/package.json
- SessionSlots.tsx
- compilerOptions
- AdjustStockDialog.tsx
- package.json
- http
- postgres service (postgres:18-alpine, pizzashop-db)
- PizzaShop.Api.csproj
- Globe Icon (world/web, 16x16 gray)
- orders/page.tsx
- Next.js Wordmark Logo (black)
- ApiFactory
- system_componentmodel_dataannotations
- MigrationBuilder
- .AdminAsync
- RecipeItem
- PizzaShopContext
- Order
- PizzaShop.Api.Migrations
- .UpdateRoles
- .Update
- RateLimitingExtensions.cs
- .Create
- OrderDto.cs
- .GetAll
- .Update
- ToppingAmount
- .Update
- .BuildModel
- .TransformAsync
- OrderItem
- PizzaShop.Api.Models
- OrderType
- orders/[id]/page.tsx
- CartView.tsx
- Ingredient
- orders/actions.ts
- TestApi
- TestApi.cs
- NavLinks.tsx
- OrderIngredientUsage
- OrderStatus
- .PlaceAsync
- RoleGuard.tsx
- .NewUserAsync
- api/menu.ts
- LoginForm.tsx
- schemas/orders.ts
- PizzaShop.Api.Dtos
- problem.ts
- AddMenuActiveAndOrderCancellation
- .ReadProblemAsync
- client.ts
- PizzaBuilder.tsx
- auth/actions.ts
- dependencies
- AddIngredientToppingFields
- AddOrderIdempotencyKey
- .FromPriced
- OrderItemTopping
- devDependencies
- OrdersEndpoints.cs
- scripts
- eslint.config.mjs
- AppShell.tsx
- app/layout.tsx
- react
- useSidebar.ts
- UserMenu.tsx
- next
- CartProvider.tsx
- TestDatabase
- RecipeDto.cs
- inventory/page.tsx
- HealthTests
- UpdateRecipeRequest

## God Nodes (most connected - your core abstractions)
1. `next` - 34 edges
2. `PizzaShopContext` - 32 edges
3. `react` - 31 edges
4. `Order` - 30 edges
5. `PizzaShop.Api.Models` - 29 edges
6. `Ingredient` - 28 edges
7. `TestApi` - 24 edges
8. `Recipe` - 23 edges
9. `PizzaShop.Api.Requests` - 20 edges
10. `ApiFactory` - 19 edges

## Surprising Connections (you probably didn't know these)
- `Next.js Agent Rules (breaking-change docs warning)` --conceptually_related_to--> `Frontend Conventions (Server Components, Zod, feature hooks)`  [INFERRED]
  web/AGENTS.md → CLAUDE.md
- `OrderCalculatorTests` --references--> `PizzaSize`  [EXTRACTED]
  Tests/PizzaShop.Api.Tests/OrderCalculatorTests.cs → api/Models/PizzaSize.cs
- `LoginPage()` --calls--> `LoginForm()`  [EXTRACTED]
  web/app/(auth)/login/page.tsx → web/app/(auth)/login/LoginForm.tsx
- `RegisterPage()` --calls--> `RegisterForm()`  [EXTRACTED]
  web/app/(auth)/register/page.tsx → web/app/(auth)/register/RegisterForm.tsx
- `StaffOnly()` --calls--> `requireStaff()`  [EXTRACTED]
  web/components/RoleGuard.tsx → web/lib/auth/currentUser.ts

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Order creation inventory deduction flow** — claude_inventory_deduction, claude_orderitems, claude_orderitemtoppings, claude_recipeitems, claude_ingredients [EXTRACTED 1.00]
- **Local dev database setup** — readme_pnpm_scripts, readme_env_example, readme_podman_compose, docker_compose_postgres, docker_compose_postgres_data [INFERRED 0.85]
- **Price snapshot pattern for historical stability** — claude_price_stability, claude_orderitems, claude_orderitemtoppings, claude_orders [INFERRED 0.85]
- **create-next-app Default Boilerplate Assets (currently unused)** — web_public_file_file_icon, web_public_globe_globe_icon, web_public_next_next_js_wordmark, web_public_vercel_vercel_logo, web_public_window_window_icon [INFERRED 0.85]

## Communities (140 total, 80 thin omitted)

### Community 0 - "Pizza Shop POS README"
Cohesion: 0.12
Nodes (19): Ingredients table, OrderItems table, OrderItemToppings table, Orders table, Pizza Customizer (size, crust, fractional toppings), Pizza Shop POS, PizzaSizes table, RecipeItems table (+11 more)

### Community 1 - "web/package.json"
Cohesion: 0.12
Nodes (16): class-variance-authority, cn, next-themes, radix-ui, react-dom, shadcn, tailwindcss, @tailwindcss/turbopack (+8 more)

### Community 2 - "SessionSlots.tsx"
Cohesion: 0.24
Nodes (8): SessionUserMenu(), UserMenu(), CurrentUser, ADMIN, CUSTOMER, NavKey, navKeysFor(), STAFF

### Community 3 - "compilerOptions"
Cohesion: 0.11
Nodes (18): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+10 more)

### Community 4 - "AdjustStockDialog.tsx"
Cohesion: 0.10
Nodes (14): @hookform/resolvers, sonner, MODE_CHOICES, MODE_COPY, CancelOrderDialogProps, Ingredient, ingredientSchema, quantity (+6 more)

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
Nodes (19): hrefForPage(), metadata, MyOrdersPage(), MyOrdersSkeleton(), MyOrdersTable(), FILTERS, hrefFor(), metadata (+11 more)

### Community 13 - "ApiFactory"
Cohesion: 0.09
Nodes (10): ApiCollection, ApiFactory, Environment, Settings, DevelopmentApiFactory, Environment, RateLimitedApiFactory, Settings (+2 more)

### Community 14 - "system_componentmodel_dataannotations"
Cohesion: 0.11
Nodes (8): AdjustIngredientStockRequest, CreateIngredientRequest, CreatePizzaSizeRequest, CreateUnitOfMeasureRequest, UpdateIngredientRequest, UpdatePizzaSizeRequest, UpdateUnitOfMeasureRequest, PizzaShop.Api.Requests

### Community 15 - "MigrationBuilder"
Cohesion: 0.17
Nodes (3): InitialCreate, AddRecipeItemUniqueIndex, AddIdentity

### Community 16 - ".AdminAsync"
Cohesion: 0.18
Nodes (3): CreateRecipeRequest, RecipeItemRequest, CatalogTests

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

### Community 26 - "RateLimitingExtensions.cs"
Cohesion: 0.06
Nodes (12): CorsExtensions, ForwardedHeadersExtensions, RateLimitingExtensions, RateLimitPolicies, OrderOptions, TaxRate, RateLimitingOptions, AuthPerMinute (+4 more)

### Community 28 - "OrderDto.cs"
Cohesion: 0.32
Nodes (6): OrderDto, OrderItemDto, OrderItemToppingDto, OrderMapper, OrderSummaryDto, PagedResult

### Community 31 - ".Update"
Cohesion: 0.15
Nodes (3): IngredientDto, IngredientMapper, IngredientsEndpoints

### Community 32 - "ToppingAmount"
Cohesion: 0.22
Nodes (8): ToppingAmount, Extra, Light, Standard, ToppingCoverage, LeftHalf, RightHalf, Whole

### Community 38 - ".Update"
Cohesion: 0.06
Nodes (7): PizzaSizeDto, PizzaSizeMapper, UnitOfMeasureDto, UnitOfMeasureMapper, PizzaSizesEndpoints, UniqueNames, UnitsOfMeasureEndpoints

### Community 42 - "OrderItem"
Cohesion: 0.12
Nodes (13): OrderItem, ItemNameSnapshot, LineTotal, Order, OrderId, OrderItemId, PizzaSize, PizzaSizeId (+5 more)

### Community 44 - "OrderType"
Cohesion: 0.22
Nodes (6): OrderType, Delivery, DineIn, Takeout, CreateOrderRequest, OrderItemRequest

### Community 45 - "orders/[id]/page.tsx"
Cohesion: 0.14
Nodes (21): metadata, MyOrder(), MyOrderPage(), MyOrderSkeleton(), Detail(), metadata, OrderDetail(), OrderDetailSkeleton() (+13 more)

### Community 46 - "CartView.tsx"
Cohesion: 0.13
Nodes (18): lucide-react, CartView(), ORDER_TYPE_CHOICES, CartPage(), metadata, MenuPage(), metadata, RecipeGrid() (+10 more)

### Community 47 - "Ingredient"
Cohesion: 0.05
Nodes (28): INamedEntity, Name, Ingredient, CurrentStock, IngredientId, IsActive, Name, ToppingPortion (+20 more)

### Community 48 - "orders/actions.ts"
Cohesion: 0.27
Nodes (16): zod, idempotencyKeySchema, placeOrder(), adjustStock(), ingredientIdSchema, advanceStatus(), cancelOrder(), orderFailure() (+8 more)

### Community 49 - "TestApi"
Cohesion: 0.15
Nodes (5): UpdateUserRolesRequest, LoginResponse, TestApi, TestUser, UsersTests

### Community 50 - "TestApi.cs"
Cohesion: 0.14
Nodes (3): PizzaShop.Api.Tests, PizzaShop.Api.Orders, PizzaShop.Api.Tests.Infrastructure

### Community 51 - "NavLinks.tsx"
Cohesion: 0.23
Nodes (13): AnalyticsIcon(), DashboardIcon(), Icon(), IconProps, InventoryIcon(), OrdersIcon(), RecipesIcon(), isActive() (+5 more)

### Community 52 - "OrderIngredientUsage"
Cohesion: 0.25
Nodes (7): OrderIngredientUsage, Amount, Ingredient, IngredientId, Order, OrderId, OrderIngredientUsageId

### Community 53 - "OrderStatus"
Cohesion: 0.33
Nodes (6): OrderStatus, Cancelled, Completed, Pending, Preparing, Ready

### Community 54 - ".PlaceAsync"
Cohesion: 0.33
Nodes (3): CancelOrderRequest, UpdateOrderStatusRequest, CancellationTests

### Community 55 - "RoleGuard.tsx"
Cohesion: 0.35
Nodes (8): AnalyticsPage(), RecipesPage(), UsersPage(), ComingSoon(), ComingSoonProps, AdminOnly(), StaffOnly(), requireAdmin()

### Community 58 - "api/menu.ts"
Cohesion: 0.24
Nodes (14): POST(), problemJson(), Builder(), BuilderPage(), BuilderSkeleton(), metadata, PizzaBuilder(), apiJson() (+6 more)

### Community 68 - "LoginForm.tsx"
Cohesion: 0.18
Nodes (12): react-hook-form, FIELDS, LoginForm(), FIELDS, RegisterForm(), FormAlert(), FormInput(), FormInputProps (+4 more)

### Community 69 - "schemas/orders.ts"
Cohesion: 0.09
Nodes (26): OrderActions(), OrderActionsProps, reportFailure(), CancelOrderDialog(), CancelOrderInput, cancelOrderSchema, CreateOrderInput, createOrderSchema (+18 more)

### Community 71 - "PizzaShop.Api.Dtos"
Cohesion: 0.15
Nodes (4): CurrentUserDto, ToppingDto, ToppingMapper, PizzaShop.Api.Dtos

### Community 72 - "problem.ts"
Cohesion: 0.38
Nodes (6): RFC-9457, lowerFirst(), Problem, problemSchema, toFieldErrors(), toFieldPath()

### Community 75 - "client.ts"
Cohesion: 0.27
Nodes (10): server-only, ApiFetchOptions, getClientIp(), withSession(), apiBaseUrl(), callApi(), callApiJson(), CallApiOptions (+2 more)

### Community 76 - "PizzaBuilder.tsx"
Cohesion: 0.13
Nodes (18): AMOUNT_CHOICES, COVERAGE_CHOICES, PizzaBuilderProps, BuilderAction, BuilderState, MAX_QUANTITY, reducer(), ToppingChoice (+10 more)

### Community 77 - "auth/actions.ts"
Cohesion: 0.16
Nodes (23): Credentials, credentialsSchema, currentUserSchema, LoginResponse, loginResponseSchema, RegisterInput, registerSchema, logout() (+15 more)

### Community 78 - "dependencies"
Cohesion: 0.13
Nodes (15): dependencies, class-variance-authority, cn, @hookform/resolvers, lucide-react, next, next-themes, radix-ui (+7 more)

### Community 103 - ".FromPriced"
Cohesion: 0.26
Nodes (4): OrderQuoteDto, OrderQuoteItemDto, OrderQuoteMapper, OrderQuoteToppingDto

### Community 105 - "OrderItemTopping"
Cohesion: 0.20
Nodes (9): OrderItemTopping, Coverage, ExtraAmount, Ingredient, IngredientId, OrderItem, OrderItemId, OrderItemToppingId (+1 more)

### Community 112 - "devDependencies"
Cohesion: 0.20
Nodes (10): devDependencies, eslint, eslint-config-next, shadcn, tailwindcss, @tailwindcss/turbopack, @types/node, @types/react (+2 more)

### Community 114 - "OrdersEndpoints.cs"
Cohesion: 0.14
Nodes (4): Policies, Roles, PizzaShop.Api.Auth, PizzaShop.Api.Endpoints

### Community 115 - "scripts"
Cohesion: 0.40
Nodes (5): scripts, build, dev, lint, start

### Community 116 - "eslint.config.mjs"
Cohesion: 0.50
Nodes (3): eslint, eslint-config-next, eslintConfig

### Community 128 - "AppShell.tsx"
Cohesion: 0.33
Nodes (8): AuthLayout(), AppShell(), AppShellProps, Brand(), BrandLogo(), CloseIcon(), MenuIcon(), ShellContext

### Community 129 - "app/layout.tsx"
Cohesion: 0.20
Nodes (5): geistMono, geistSans, metadata, SIDEBAR_STORAGE_KEY, sidebarInitScript

### Community 130 - "react"
Cohesion: 0.22
Nodes (11): react, AdjustStockDialog(), InventoryTable(), isOut(), View, VIEWS, Choice, ChoiceGroup() (+3 more)

### Community 131 - "useSidebar.ts"
Cohesion: 0.36
Nodes (9): getCollapsed(), getIsDesktop(), getServerFalse(), listeners, setCollapsed(), subscribeCollapsed(), subscribeDesktop(), useIsDesktop() (+1 more)

### Community 133 - "next"
Cohesion: 0.39
Nodes (6): next, CustomerRedirect(), Home(), getCurrentUser, homePathFor(), nextConfig

### Community 134 - "CartProvider.tsx"
Cohesion: 0.27
Nodes (11): AppLayout(), NavLinksSkeleton(), RoleNav(), CartButton(), CartContext, CartLine, CartProvider(), CartState (+3 more)

### Community 136 - "RecipeDto.cs"
Cohesion: 0.36
Nodes (3): RecipeDto, RecipeItemDto, RecipeMapper

### Community 137 - "inventory/page.tsx"
Cohesion: 0.36
Nodes (5): Inventory(), InventoryPage(), InventorySkeleton(), metadata, listIngredients()

## Ambiguous Edges - Review These
- `pnpm workspace (packages: web)` → `Tech Stack (pnpm, Next.js 16, ASP.NET 10, PostgreSQL, Azure)`  [AMBIGUOUS]
  pnpm-workspace.yaml · relation: conceptually_related_to

## Knowledge Gaps
- **146 isolated node(s):** `class-variance-authority`, `cn`, `next-themes`, `radix-ui`, `react-dom` (+141 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 609 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **80 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `PizzaShopContext` connect `PizzaShopContext` to `.Update`, `PizzaShop.Api.Models`, `Ingredient`, `OrderIngredientUsage`, `Order`, `.UpdateRoles`, `.ConfigureConventions`, `.GetAll`?**
  _High betweenness centrality (0.031) - this node is a cross-community bridge._
- **What connects `class-variance-authority`, `cn`, `next-themes` to the rest of the system?**
  _146 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Pizza Shop POS README` be split into smaller, more focused modules?**
  _Cohesion score 0.1164021164021164 - nodes in this community are weakly interconnected._
- **Why does `Order` connect `Order` to `PizzaShop.Api.Models`, `OrderType`, `PizzaShopContext`, `OrderStatus`, `OrderIngredientUsage`, `OrderDto.cs`?**
  _High betweenness centrality (0.030) - this node is a cross-community bridge._
- **Should `web/package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.11764705882352941 - nodes in this community are weakly interconnected._
- **Why does `Ingredient` connect `Ingredient` to `OrderItemTopping`, `PizzaShop.Api.Models`, `PizzaShopContext`, `OrderIngredientUsage`, `.Update`?**
  _High betweenness centrality (0.029) - this node is a cross-community bridge._

### Low-confidence Hints
_AMBIGUOUS edges — the extractor was unsure. Verify before acting on these._

- **What is the exact relationship between `pnpm workspace (packages: web)` and `Tech Stack (pnpm, Next.js 16, ASP.NET 10, PostgreSQL, Azure)`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._