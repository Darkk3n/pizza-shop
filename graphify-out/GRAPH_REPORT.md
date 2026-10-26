# Graph Report - pizza-shop  (2026-10-26)

## Corpus Check
- 212 files · ~56,277 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 6 file(s) not represented in the graph (top: .example 2, (none) 2, .ico 1)

## Summary
- 1772 nodes · 4286 edges · 139 communities (62 shown, 77 thin omitted)
- Extraction: 96% EXTRACTED · 4% INFERRED · 0% AMBIGUOUS · INFERRED: 158 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `cd53e95f`
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
- SalesChart.tsx
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
- auth/actions.ts
- .NewUserAsync
- .BuildModel
- .TransformAsync
- OrderItem
- format.ts
- react
- .PlaceAsync
- CartView.tsx
- .Price
- inventory/actions.ts
- .CreateIngredientAsync
- TestApi.cs
- NavLinks.tsx
- OrderIngredientUsage
- .ResolveRange
- .ReadProblemAsync
- analytics/page.tsx
- Recipe
- apiJson
- PizzaSize
- FormAlert
- PizzaBuilder.tsx
- .Update
- TestApi
- OrdersEndpoints.cs
- schemas/orders.ts
- .NameTakenAsync
- schemas/ingredients.ts
- Ingredient
- dependencies
- AddIngredientToppingFields
- .AdminAsync
- AddOrderIdempotencyKey
- orders/[id]/page.tsx
- OrderItemTopping
- devDependencies
- scripts
- eslint.config.mjs
- .AddPizzaShopRateLimiting
- OrderType
- users/page.tsx
- menu/page.tsx
- OrderStatus
- .FromPriced
- OrderItemRequest
- ToppingCoverage
- InventoryTable.tsx
- next
- Roles.cs
- currentUser.ts

## God Nodes (most connected - your core abstractions)
1. `react` - 44 edges
2. `next` - 44 edges
3. `PizzaShopContext` - 32 edges
4. `Order` - 30 edges
5. `PizzaShop.Api.Models` - 29 edges
6. `Ingredient` - 28 edges
7. `apiJson()` - 28 edges
8. `formatMoney()` - 25 edges
9. `TestApi` - 24 edges
10. `requireAdmin()` - 24 edges

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

## Communities (139 total, 77 thin omitted)

### Community 0 - "Pizza Shop POS README"
Cohesion: 0.12
Nodes (19): Ingredients table, OrderItems table, OrderItemToppings table, Orders table, Pizza Customizer (size, crust, fractional toppings), Pizza Shop POS, PizzaSizes table, RecipeItems table (+11 more)

### Community 1 - "web/package.json"
Cohesion: 0.12
Nodes (16): class-variance-authority, cn, next-themes, radix-ui, react-dom, shadcn, tailwindcss, @tailwindcss/turbopack (+8 more)

### Community 2 - "IngredientFormDialog.tsx"
Cohesion: 0.13
Nodes (11): @hookform/resolvers, sonner, PRESET_LABELS, MODE_CHOICES, MODE_COPY, FIELDS, IngredientFormDialogProps, STATUS_CHOICES (+3 more)

### Community 3 - "compilerOptions"
Cohesion: 0.11
Nodes (18): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+10 more)

### Community 4 - "IngredientAdminActions.tsx"
Cohesion: 0.14
Nodes (3): DeleteIngredientDialog(), DeleteIngredientDialogProps, UserMenuProps

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
Nodes (25): hrefForPage(), metadata, MyOrdersPage(), MyOrdersSkeleton(), MyOrdersTable(), FILTERS, hrefFor(), metadata (+17 more)

### Community 13 - "ApiFactory"
Cohesion: 0.07
Nodes (12): HealthTests, ApiCollection, ApiFactory, Environment, Settings, DevelopmentApiFactory, Environment, RateLimitedApiFactory (+4 more)

### Community 14 - "system_componentmodel_dataannotations"
Cohesion: 0.10
Nodes (9): AdjustIngredientStockRequest, CreateIngredientRequest, CreatePizzaSizeRequest, CreateUnitOfMeasureRequest, UpdateIngredientRequest, UpdatePizzaSizeRequest, UpdateUnitOfMeasureRequest, PizzaShop.Api.Models (+1 more)

### Community 15 - "MigrationBuilder"
Cohesion: 0.06
Nodes (5): InitialCreate, AddRecipeItemUniqueIndex, AddIdentity, AddMenuActiveAndOrderCancellation, AddOrdersCreatedAtIndex

### Community 16 - "SalesChart.tsx"
Cohesion: 0.29
Nodes (14): CancellationsSection(), columnPath(), DaysTable(), describe(), niceMax(), SalesChart(), ScrollTable(), StickyTableHeader() (+6 more)

### Community 19 - "RecipeItem"
Cohesion: 0.07
Nodes (9): AuthExtensions, DevelopmentSeeder, RecipeItem, Amount, Ingredient, IngredientId, Recipe, RecipeId (+1 more)

### Community 20 - "PizzaShopContext"
Cohesion: 0.09
Nodes (11): PizzaShopContext, DataProtectionKeys, Ingredients, OrderIngredientUsages, OrderItems, OrderItemToppings, Orders, PizzaSizes (+3 more)

### Community 21 - "Order"
Cohesion: 0.07
Nodes (20): Order, CancellationReason, CancelledAt, CancelledBy, CancelledByUserId, CreatedAt, IdempotencyKey, IngredientUsages (+12 more)

### Community 23 - ".UpdateRoles"
Cohesion: 0.10
Nodes (3): UserDto, UsersEndpoints, AppUser

### Community 26 - "RateLimitingExtensions.cs"
Cohesion: 0.08
Nodes (9): CorsExtensions, ForwardedHeadersExtensions, RateLimitPolicies, OrderOptions, TaxRate, StatisticsOptions, TimeZone, PizzaShop.Api.Extensions (+1 more)

### Community 27 - ".Create"
Cohesion: 0.07
Nodes (15): CancellationsByRoleDto, CancellationStatisticsDto, CancelledOrderDto, CancelledSummaryDto, IngredientUsageDto, IngredientUsageStatisticsDto, ItemStatisticsDto, SalesDayDto (+7 more)

### Community 28 - "OrderDto.cs"
Cohesion: 0.32
Nodes (6): OrderDto, OrderItemDto, OrderItemToppingDto, OrderMapper, OrderSummaryDto, PagedResult

### Community 31 - ".Update"
Cohesion: 0.13
Nodes (3): IngredientDto, IngredientMapper, IngredientsEndpoints

### Community 32 - "auth/actions.ts"
Cohesion: 0.12
Nodes (33): ApiFetchOptions, getClientIp(), apiBaseUrl(), callApi(), callApiJson(), CallApiOptions, readApiError(), Credentials (+25 more)

### Community 42 - "OrderItem"
Cohesion: 0.12
Nodes (13): OrderItem, ItemNameSnapshot, LineTotal, Order, OrderId, OrderItemId, PizzaSize, PizzaSizeId (+5 more)

### Community 43 - "format.ts"
Cohesion: 0.15
Nodes (10): STATUS_CLASSES, compactMoney, currency, dateTime, day, ORDER_STATUS_LABELS, percent, quantity (+2 more)

### Community 44 - "react"
Cohesion: 0.14
Nodes (15): react, blankItem(), FieldMessage(), RecipeForm(), RecipeFormProps, STATUS_CHOICES, ROLE_LABELS, UserRoleControlProps (+7 more)

### Community 45 - ".PlaceAsync"
Cohesion: 0.26
Nodes (5): CancelOrderRequest, UpdateOrderStatusRequest, UpdateRecipeRequest, CancellationTests, TestUser

### Community 46 - "CartView.tsx"
Cohesion: 0.17
Nodes (10): lucide-react, CartView(), ORDER_TYPE_CHOICES, CartPage(), metadata, useCart(), Choice, ChoiceGroupProps (+2 more)

### Community 48 - "inventory/actions.ts"
Cohesion: 0.18
Nodes (29): zod, idempotencyKeySchema, placeOrder(), adjustStock(), createIngredient(), deleteIngredient(), ingredientIdSchema, updateIngredient() (+21 more)

### Community 50 - "TestApi.cs"
Cohesion: 0.14
Nodes (3): PizzaShop.Api.Tests, PizzaShop.Api.Orders, PizzaShop.Api.Tests.Infrastructure

### Community 51 - "NavLinks.tsx"
Cohesion: 0.06
Nodes (47): AppLayout(), AuthLayout(), geistMono, geistSans, metadata, AppShell(), AppShellProps, Brand() (+39 more)

### Community 52 - "OrderIngredientUsage"
Cohesion: 0.25
Nodes (7): OrderIngredientUsage, Amount, Ingredient, IngredientId, Order, OrderId, OrderIngredientUsageId

### Community 53 - ".ResolveRange"
Cohesion: 0.13
Nodes (7): OrderSnapshot, RangeResult, StatisticsCalculator, StatisticsRange, Days, PizzaShop.Api.Statistics, StatisticsCalculatorTests

### Community 55 - "analytics/page.tsx"
Cohesion: 0.10
Nodes (34): AnalyticsPage(), Empty(), Filters(), ItemsSection(), metadata, readQuery(), SalesSection(), SearchParams (+26 more)

### Community 57 - "Recipe"
Cohesion: 0.15
Nodes (8): Recipe, BasePrice, IsActive, Name, RecipeId, RecipeItems, OrderItemToppingRequest, OrderCalculatorTests

### Community 58 - "apiJson"
Cohesion: 0.15
Nodes (21): RFC-9457, POST(), problemJson(), Builder(), BuilderPage(), BuilderSkeleton(), metadata, PizzaBuilder() (+13 more)

### Community 59 - "PizzaSize"
Cohesion: 0.17
Nodes (9): INamedEntity, Name, PizzaSize, Name, PizzaSizeId, PriceMultiplier, UnitOfMeasure, Name (+1 more)

### Community 68 - "FormAlert"
Cohesion: 0.33
Nodes (9): react-hook-form, FIELDS, LoginForm(), FIELDS, RegisterForm(), FormAlert(), FormInput(), FormInputProps (+1 more)

### Community 69 - "PizzaBuilder.tsx"
Cohesion: 0.11
Nodes (23): AMOUNT_CHOICES, COVERAGE_CHOICES, PizzaBuilderProps, CartContext, CartLine, CartProvider(), CartState, sameConfiguration() (+15 more)

### Community 71 - ".Update"
Cohesion: 0.05
Nodes (11): PizzaSizeDto, PizzaSizeMapper, RecipeDto, RecipeItemDto, RecipeMapper, ToppingDto, ToppingMapper, UnitOfMeasureDto (+3 more)

### Community 72 - "TestApi"
Cohesion: 0.11
Nodes (7): CreateRecipeRequest, RecipeItemRequest, UpdateUserRolesRequest, LoginResponse, TestApi, RateLimitingTests, UsersTests

### Community 73 - "OrdersEndpoints.cs"
Cohesion: 0.12
Nodes (6): Policies, CurrentUserDto, PizzaShop.Api.Auth, PizzaShop.Api.Db, PizzaShop.Api.Dtos, PizzaShop.Api.Endpoints

### Community 74 - "schemas/orders.ts"
Cohesion: 0.10
Nodes (23): quoteKey(), useQuote(), describeApiError(), CancelOrderInput, cancelOrderSchema, CreateOrderInput, createOrderSchema, ORDER_WORKFLOW (+15 more)

### Community 76 - "schemas/ingredients.ts"
Cohesion: 0.13
Nodes (18): checkTopping(), hasTwoDecimals, IngredientForm, ingredientFormSchema, ingredientFormShape, ingredientSchema, newIngredientFormSchema, optionalNumber (+10 more)

### Community 77 - "Ingredient"
Cohesion: 0.18
Nodes (9): Ingredient, CurrentStock, IngredientId, IsActive, Name, ToppingPortion, ToppingPrice, UnitOfMeasure (+1 more)

### Community 78 - "dependencies"
Cohesion: 0.13
Nodes (15): dependencies, class-variance-authority, cn, @hookform/resolvers, lucide-react, next, next-themes, radix-ui (+7 more)

### Community 103 - "orders/[id]/page.tsx"
Cohesion: 0.18
Nodes (20): metadata, MyOrder(), MyOrderPage(), MyOrderSkeleton(), OrderActions(), OrderActionsProps, reportFailure(), Detail() (+12 more)

### Community 105 - "OrderItemTopping"
Cohesion: 0.20
Nodes (9): OrderItemTopping, Coverage, ExtraAmount, Ingredient, IngredientId, OrderItem, OrderItemId, OrderItemToppingId (+1 more)

### Community 112 - "devDependencies"
Cohesion: 0.20
Nodes (10): devDependencies, eslint, eslint-config-next, shadcn, tailwindcss, @tailwindcss/turbopack, @types/node, @types/react (+2 more)

### Community 115 - "scripts"
Cohesion: 0.40
Nodes (5): scripts, build, dev, lint, start

### Community 116 - "eslint.config.mjs"
Cohesion: 0.50
Nodes (3): eslint, eslint-config-next, eslintConfig

### Community 119 - ".AddPizzaShopRateLimiting"
Cohesion: 0.19
Nodes (5): RateLimitingExtensions, RateLimitingOptions, AuthPerMinute, OrderCreatePerMinute, UserPerMinute

### Community 125 - "OrderType"
Cohesion: 0.22
Nodes (8): OrderType, Delivery, DineIn, Takeout, ToppingAmount, Extra, Light, Standard

### Community 126 - "users/page.tsx"
Cohesion: 0.15
Nodes (19): server-only, hrefFor(), metadata, ROLE_BADGE_CLASSES, SearchForm(), UsersPage(), UsersTable(), UsersTableSkeleton() (+11 more)

### Community 127 - "menu/page.tsx"
Cohesion: 0.18
Nodes (9): MenuPage(), metadata, RecipeGrid(), RecipeGridSkeleton(), LoginPage(), metadata, metadata, RegisterPage() (+1 more)

### Community 128 - "OrderStatus"
Cohesion: 0.33
Nodes (6): OrderStatus, Cancelled, Completed, Pending, Preparing, Ready

### Community 129 - ".FromPriced"
Cohesion: 0.23
Nodes (4): OrderQuoteDto, OrderQuoteItemDto, OrderQuoteMapper, OrderQuoteToppingDto

### Community 131 - "ToppingCoverage"
Cohesion: 0.50
Nodes (4): ToppingCoverage, LeftHalf, RightHalf, Whole

### Community 132 - "InventoryTable.tsx"
Cohesion: 0.25
Nodes (13): AdjustStockDialog(), IngredientAdminActions(), NewIngredientButton(), defaultsFor(), FieldMessage(), IngredientFormDialog(), InventoryTable(), InventoryTableProps (+5 more)

### Community 133 - "next"
Cohesion: 0.17
Nodes (16): next, Inventory(), InventoryPage(), InventorySkeleton(), metadata, DeleteRecipeDialog(), EditRecipe(), EditRecipePage() (+8 more)

### Community 137 - "currentUser.ts"
Cohesion: 0.46
Nodes (6): CustomerRedirect(), Home(), withSession(), getCurrentUser, homePathFor(), getAccessToken()

## Ambiguous Edges - Review These
- `pnpm workspace (packages: web)` → `Tech Stack (pnpm, Next.js 16, ASP.NET 10, PostgreSQL, Azure)`  [AMBIGUOUS]
  pnpm-workspace.yaml · relation: conceptually_related_to

## Knowledge Gaps
- **147 isolated node(s):** `Days`, `class-variance-authority`, `next-themes`, `radix-ui`, `react-dom` (+142 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 648 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **77 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `PizzaShop.Api.Models` connect `system_componentmodel_dataannotations` to `.Update`, `OrdersEndpoints.cs`, `PizzaShopContext.cs`, `TestApi.cs`, `.UpdateRoles`, `PizzaSize`, `OrderDto.cs`, `OrderType`, `.Update`?**
  _High betweenness centrality (0.028) - this node is a cross-community bridge._
- **What connects `Days`, `class-variance-authority`, `next-themes` to the rest of the system?**
  _147 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Pizza Shop POS README` be split into smaller, more focused modules?**
  _Cohesion score 0.1164021164021164 - nodes in this community are weakly interconnected._
- **Why does `Ingredient` connect `Ingredient` to `OrderItemTopping`, `system_componentmodel_dataannotations`, `.Price`, `PizzaShopContext`, `OrderIngredientUsage`, `Recipe`, `PizzaSize`, `.Update`?**
  _High betweenness centrality (0.027) - this node is a cross-community bridge._
- **Should `web/package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.11764705882352941 - nodes in this community are weakly interconnected._
- **Why does `next` connect `next` to `auth/actions.ts`, `web/package.json`, `IngredientFormDialog.tsx`, `IngredientAdminActions.tsx`, `PizzaBuilder.tsx`, `FormAlert`, `orders/[id]/page.tsx`, `currentUser.ts`, `schemas/orders.ts`, `orders/page.tsx`, `react`, `CartView.tsx`, `inventory/actions.ts`, `NavLinks.tsx`, `analytics/page.tsx`, `apiJson`, `users/page.tsx`, `menu/page.tsx`?**
  _High betweenness centrality (0.024) - this node is a cross-community bridge._

### Low-confidence Hints
_AMBIGUOUS edges — the extractor was unsure. Verify before acting on these._

- **What is the exact relationship between `pnpm workspace (packages: web)` and `Tech Stack (pnpm, Next.js 16, ASP.NET 10, PostgreSQL, Azure)`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._