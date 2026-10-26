# Graph Report - pizza-shop  (2026-10-26)

## Corpus Check
- 199 files · ~48,881 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 6 file(s) not represented in the graph (top: .example 2, (none) 2, .ico 1)

## Summary
- 1608 nodes · 3729 edges · 133 communities (54 shown, 79 thin omitted)
- Extraction: 96% EXTRACTED · 4% INFERRED · 0% AMBIGUOUS · INFERRED: 133 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `b9d04181`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- Pizza Shop POS README
- web/package.json
- IngredientFormDialog.tsx
- compilerOptions
- IngredientAdminActions.tsx
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
- users/page.tsx
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
- client.ts
- .NewUserAsync
- .BuildModel
- .TransformAsync
- OrderItem
- PizzaShop.Api.Models
- RecipeForm.tsx
- .PlaceAsync
- react
- .Price
- inventory/actions.ts
- .ReadProblemAsync
- TestApi.cs
- NavLinks.tsx
- OrderIngredientUsage
- OrderStatus
- SecurityTests
- RoleGuard.tsx
- .Price
- api/menu.ts
- auth/actions.ts
- schemas/orders.ts
- .Update
- .RoleChange_AppliesAfterRefresh_NotBefore
- orders/actions.ts
- .NameTakenAsync
- PizzaSize
- Ingredient
- dependencies
- AddIngredientToppingFields
- AddOrderIdempotencyKey
- TestDatabase
- OrderItemTopping
- devDependencies
- AuthExtensions.cs
- scripts
- eslint.config.mjs
- OrderType
- Recipe
- ToppingAmount
- CurrentUserDto.cs
- RecipeDto.cs
- RecipeItemRequest
- UpdateRecipeRequest
- next

## God Nodes (most connected - your core abstractions)
1. `next` - 42 edges
2. `react` - 41 edges
3. `PizzaShopContext` - 32 edges
4. `Order` - 30 edges
5. `PizzaShop.Api.Models` - 29 edges
6. `Ingredient` - 28 edges
7. `TestApi` - 24 edges
8. `Recipe` - 23 edges
9. `apiJson()` - 23 edges
10. `requireAdmin()` - 22 edges

## Surprising Connections (you probably didn't know these)
- `OrderCalculatorTests` --references--> `PizzaSize`  [EXTRACTED]
  Tests/PizzaShop.Api.Tests/OrderCalculatorTests.cs → api/Models/PizzaSize.cs
- `Next.js Agent Rules (breaking-change docs warning)` --conceptually_related_to--> `Frontend Conventions (Server Components, Zod, feature hooks)`  [INFERRED]
  web/AGENTS.md → CLAUDE.md
- `StaffOnly()` --calls--> `requireStaff()`  [EXTRACTED]
  web/components/RoleGuard.tsx → web/lib/auth/currentUser.ts
- `Pizza Shop POS README` --semantically_similar_to--> `Pizza Shop POS`  [INFERRED] [semantically similar]
  README.md → CLAUDE.md
- `Pizza Shop POS README` --references--> `30-minute Session Timeout (production)`  [INFERRED]
  README.md → CLAUDE.md

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Order creation inventory deduction flow** — claude_inventory_deduction, claude_orderitems, claude_orderitemtoppings, claude_recipeitems, claude_ingredients [EXTRACTED 1.00]
- **Local dev database setup** — readme_pnpm_scripts, readme_env_example, readme_podman_compose, docker_compose_postgres, docker_compose_postgres_data [INFERRED 0.85]
- **Price snapshot pattern for historical stability** — claude_price_stability, claude_orderitems, claude_orderitemtoppings, claude_orders [INFERRED 0.85]
- **create-next-app Default Boilerplate Assets (currently unused)** — web_public_file_file_icon, web_public_globe_globe_icon, web_public_next_next_js_wordmark, web_public_vercel_vercel_logo, web_public_window_window_icon [INFERRED 0.85]

## Communities (133 total, 79 thin omitted)

### Community 0 - "Pizza Shop POS README"
Cohesion: 0.12
Nodes (19): Ingredients table, OrderItems table, OrderItemToppings table, Orders table, Pizza Customizer (size, crust, fractional toppings), Pizza Shop POS, PizzaSizes table, RecipeItems table (+11 more)

### Community 1 - "web/package.json"
Cohesion: 0.12
Nodes (15): class-variance-authority, next-themes, radix-ui, react-dom, shadcn, tailwindcss, @tailwindcss/turbopack, tw-animate-css (+7 more)

### Community 2 - "IngredientFormDialog.tsx"
Cohesion: 0.09
Nodes (25): @hookform/resolvers, sonner, MODE_CHOICES, MODE_COPY, FIELDS, IngredientFormDialogProps, STATUS_CHOICES, TOPPING_CHOICES (+17 more)

### Community 3 - "compilerOptions"
Cohesion: 0.11
Nodes (18): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+10 more)

### Community 4 - "IngredientAdminActions.tsx"
Cohesion: 0.10
Nodes (9): DeleteIngredientDialog(), DeleteIngredientDialogProps, IngredientAdminActions(), NewIngredientButton(), defaultsFor(), FieldMessage(), IngredientFormDialog(), UserMenuProps (+1 more)

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
Cohesion: 0.09
Nodes (41): metadata, MyOrder(), MyOrderPage(), MyOrderSkeleton(), hrefForPage(), metadata, MyOrdersPage(), MyOrdersSkeleton() (+33 more)

### Community 13 - "ApiFactory"
Cohesion: 0.09
Nodes (11): HealthTests, ApiCollection, ApiFactory, Environment, Settings, DevelopmentApiFactory, Environment, RateLimitedApiFactory (+3 more)

### Community 14 - "system_componentmodel_dataannotations"
Cohesion: 0.10
Nodes (9): AdjustIngredientStockRequest, CancelOrderRequest, CreateIngredientRequest, CreatePizzaSizeRequest, CreateUnitOfMeasureRequest, UpdateIngredientRequest, UpdatePizzaSizeRequest, UpdateUnitOfMeasureRequest (+1 more)

### Community 15 - "MigrationBuilder"
Cohesion: 0.07
Nodes (4): InitialCreate, AddRecipeItemUniqueIndex, AddIdentity, AddMenuActiveAndOrderCancellation

### Community 16 - "users/page.tsx"
Cohesion: 0.09
Nodes (28): server-only, AdjustStockDialog(), InventoryTable(), InventoryTableProps, isOut(), View, VIEWS, metadata (+20 more)

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

### Community 27 - ".Create"
Cohesion: 0.08
Nodes (6): OrderQuoteDto, OrderQuoteItemDto, OrderQuoteMapper, OrderQuoteToppingDto, OrderCatalog, OrdersEndpoints

### Community 28 - "OrderDto.cs"
Cohesion: 0.32
Nodes (6): OrderDto, OrderItemDto, OrderItemToppingDto, OrderMapper, OrderSummaryDto, PagedResult

### Community 31 - ".Update"
Cohesion: 0.13
Nodes (3): IngredientDto, IngredientMapper, IngredientsEndpoints

### Community 32 - "client.ts"
Cohesion: 0.11
Nodes (28): RFC-9457, ApiFetchOptions, withSession(), apiBaseUrl(), callApi(), callApiJson(), CallApiOptions, ApiError (+20 more)

### Community 42 - "OrderItem"
Cohesion: 0.12
Nodes (13): OrderItem, ItemNameSnapshot, LineTotal, Order, OrderId, OrderItemId, PizzaSize, PizzaSizeId (+5 more)

### Community 43 - "PizzaShop.Api.Models"
Cohesion: 0.16
Nodes (3): PizzaShop.Api.Models, PizzaShop.Api.Dtos, PizzaShop.Api.Endpoints

### Community 44 - "RecipeForm.tsx"
Cohesion: 0.11
Nodes (21): cn, blankItem(), FieldMessage(), RecipeForm(), RecipeFormProps, STATUS_CHOICES, ROLE_LABELS, UserRoleControl() (+13 more)

### Community 45 - ".PlaceAsync"
Cohesion: 0.34
Nodes (3): UpdateOrderStatusRequest, CancellationTests, TestUser

### Community 46 - "react"
Cohesion: 0.09
Nodes (23): lucide-react, react, CartView(), ORDER_TYPE_CHOICES, CartPage(), metadata, AMOUNT_CHOICES, COVERAGE_CHOICES (+15 more)

### Community 48 - "inventory/actions.ts"
Cohesion: 0.25
Nodes (21): zod, idempotencyKeySchema, placeOrder(), adjustStock(), createIngredient(), deleteIngredient(), ingredientIdSchema, updateIngredient() (+13 more)

### Community 50 - "TestApi.cs"
Cohesion: 0.15
Nodes (3): PizzaShop.Api.Tests, PizzaShop.Api.Orders, PizzaShop.Api.Tests.Infrastructure

### Community 51 - "NavLinks.tsx"
Cohesion: 0.06
Nodes (51): AppLayout(), CustomerRedirect(), Home(), AuthLayout(), geistMono, geistSans, metadata, AppShell() (+43 more)

### Community 52 - "OrderIngredientUsage"
Cohesion: 0.25
Nodes (7): OrderIngredientUsage, Amount, Ingredient, IngredientId, Order, OrderId, OrderIngredientUsageId

### Community 53 - "OrderStatus"
Cohesion: 0.33
Nodes (6): OrderStatus, Cancelled, Completed, Pending, Preparing, Ready

### Community 55 - "RoleGuard.tsx"
Cohesion: 0.39
Nodes (5): AnalyticsPage(), ComingSoon(), ComingSoonProps, AdminOnly(), StaffOnly()

### Community 58 - "api/menu.ts"
Cohesion: 0.20
Nodes (18): POST(), problemJson(), MenuPage(), metadata, RecipeGrid(), RecipeGridSkeleton(), Builder(), BuilderPage() (+10 more)

### Community 68 - "auth/actions.ts"
Cohesion: 0.15
Nodes (24): react-hook-form, FIELDS, LoginForm(), LoginPage(), RegisterPage(), FIELDS, RegisterForm(), FormInput() (+16 more)

### Community 69 - "schemas/orders.ts"
Cohesion: 0.08
Nodes (34): CartContext, CartLine, CartProvider(), CartState, sameConfiguration(), BuilderAction, BuilderState, clampQuantity() (+26 more)

### Community 71 - ".Update"
Cohesion: 0.06
Nodes (8): PizzaSizeDto, PizzaSizeMapper, ToppingDto, ToppingMapper, UnitOfMeasureDto, UnitOfMeasureMapper, PizzaSizesEndpoints, UnitsOfMeasureEndpoints

### Community 72 - ".RoleChange_AppliesAfterRefresh_NotBefore"
Cohesion: 0.23
Nodes (3): UpdateUserRolesRequest, LoginResponse, UsersTests

### Community 74 - "orders/actions.ts"
Cohesion: 0.27
Nodes (11): OrderActions(), OrderActionsProps, reportFailure(), advanceStatus(), cancelOrder(), orderFailure(), orderIdSchema, CancelOrderDialog() (+3 more)

### Community 76 - "PizzaSize"
Cohesion: 0.17
Nodes (9): INamedEntity, Name, PizzaSize, Name, PizzaSizeId, PriceMultiplier, UnitOfMeasure, Name (+1 more)

### Community 77 - "Ingredient"
Cohesion: 0.18
Nodes (9): Ingredient, CurrentStock, IngredientId, IsActive, Name, ToppingPortion, ToppingPrice, UnitOfMeasure (+1 more)

### Community 78 - "dependencies"
Cohesion: 0.13
Nodes (15): dependencies, class-variance-authority, cn, @hookform/resolvers, lucide-react, next, next-themes, radix-ui (+7 more)

### Community 105 - "OrderItemTopping"
Cohesion: 0.20
Nodes (9): OrderItemTopping, Coverage, ExtraAmount, Ingredient, IngredientId, OrderItem, OrderItemId, OrderItemToppingId (+1 more)

### Community 112 - "devDependencies"
Cohesion: 0.20
Nodes (10): devDependencies, eslint, eslint-config-next, shadcn, tailwindcss, @tailwindcss/turbopack, @types/node, @types/react (+2 more)

### Community 114 - "AuthExtensions.cs"
Cohesion: 0.20
Nodes (3): Policies, Roles, PizzaShop.Api.Auth

### Community 115 - "scripts"
Cohesion: 0.40
Nodes (5): scripts, build, dev, lint, start

### Community 116 - "eslint.config.mjs"
Cohesion: 0.50
Nodes (3): eslint, eslint-config-next, eslintConfig

### Community 125 - "OrderType"
Cohesion: 0.22
Nodes (6): OrderType, Delivery, DineIn, Takeout, CreateOrderRequest, OrderItemRequest

### Community 126 - "Recipe"
Cohesion: 0.20
Nodes (6): Recipe, BasePrice, IsActive, Name, RecipeId, RecipeItems

### Community 127 - "ToppingAmount"
Cohesion: 0.22
Nodes (8): ToppingAmount, Extra, Light, Standard, ToppingCoverage, LeftHalf, RightHalf, Whole

### Community 129 - "RecipeDto.cs"
Cohesion: 0.36
Nodes (3): RecipeDto, RecipeItemDto, RecipeMapper

### Community 133 - "next"
Cohesion: 0.15
Nodes (19): next, Inventory(), InventoryPage(), InventorySkeleton(), metadata, DeleteRecipeDialog(), EditRecipe(), EditRecipePage() (+11 more)

## Ambiguous Edges - Review These
- `pnpm workspace (packages: web)` → `Tech Stack (pnpm, Next.js 16, ASP.NET 10, PostgreSQL, Azure)`  [AMBIGUOUS]
  pnpm-workspace.yaml · relation: conceptually_related_to

## Knowledge Gaps
- **145 isolated node(s):** `class-variance-authority`, `next-themes`, `radix-ui`, `react-dom`, `shadcn` (+140 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 626 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **79 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `PizzaShopContext` connect `PizzaShopContext` to `PizzaShop.Api.Models`, `.NameTakenAsync`, `Ingredient`, `OrderIngredientUsage`, `Order`, `.UpdateRoles`, `.ConfigureConventions`, `.GetAll`, `Recipe`?**
  _High betweenness centrality (0.037) - this node is a cross-community bridge._
- **What connects `class-variance-authority`, `next-themes`, `radix-ui` to the rest of the system?**
  _145 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Pizza Shop POS README` be split into smaller, more focused modules?**
  _Cohesion score 0.1164021164021164 - nodes in this community are weakly interconnected._
- **Why does `react` connect `react` to `web/package.json`, `IngredientFormDialog.tsx`, `IngredientAdminActions.tsx`, `next`, `auth/actions.ts`, `schemas/orders.ts`, `orders/actions.ts`, `orders/page.tsx`, `RecipeForm.tsx`, `users/page.tsx`, `NavLinks.tsx`, `RoleGuard.tsx`, `api/menu.ts`?**
  _High betweenness centrality (0.033) - this node is a cross-community bridge._
- **Should `web/package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.125 - nodes in this community are weakly interconnected._
- **Why does `Ingredient` connect `Ingredient` to `OrderItemTopping`, `PizzaShop.Api.Models`, `PizzaSize`, `.Price`, `PizzaShopContext`, `OrderIngredientUsage`, `.Price`, `.Update`?**
  _High betweenness centrality (0.031) - this node is a cross-community bridge._

### Low-confidence Hints
_AMBIGUOUS edges — the extractor was unsure. Verify before acting on these._

- **What is the exact relationship between `pnpm workspace (packages: web)` and `Tech Stack (pnpm, Next.js 16, ASP.NET 10, PostgreSQL, Azure)`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._