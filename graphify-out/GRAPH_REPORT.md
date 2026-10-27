# Graph Report - pizza-shop  (2026-10-26)

## Corpus Check
- 239 files · ~66,708 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 7 file(s) not represented in the graph (top: (none) 3, .example 2, .ico 1)

## Summary
- 2007 nodes · 4967 edges · 160 communities (58 shown, 102 thin omitted)
- Extraction: 96% EXTRACTED · 4% INFERRED · 0% AMBIGUOUS · INFERRED: 187 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `f79e5f72`
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
- schemas/orders.ts
- Next.js Wordmark Logo (black)
- ApiFactory
- system_componentmodel_dataannotations
- MigrationBuilder
- .Update
- RecipeItem
- PizzaShopContext
- Order
- PizzaShop.Api.Migrations
- .UpdateRoles
- .Update
- AuthExtensions.cs
- .Create
- OrderMapper
- .GetAll
- .Update
- auth/actions.ts
- .NewUserAsync
- .BuildModel
- .AddPizzaShopAuth
- .TransformAsync
- OrderItem
- IngredientMapper
- RecipeForm.tsx
- .PlaceAsync
- InventoryTable.tsx
- .Price
- RecipeDto.cs
- pizzashop_api_dtos
- NavLinks.tsx
- OrderIngredientUsage
- .ResolveRange
- SecurityTests
- analytics/page.tsx
- Recipe
- api/menu.ts
- AddOrdersCancelledAtIndex
- OrderActions.tsx
- microsoft_entityframeworkcore
- RegisterForm.tsx
- EmailOptions
- .Update
- .ReadProblemAsync
- OrdersEndpoints.cs
- PizzaBuilder.tsx
- .NameTakenAsync
- EmailTests
- Ingredient
- dependencies
- AddIngredientToppingFields
- .AdminAsync
- AddOrderIdempotencyKey
- AccountEmails
- .CreateIngredientAsync
- orders/[id]/page.tsx
- format.ts
- OrderItemTopping
- devDependencies
- PizzaShop.Api.Db
- scripts
- eslint.config.mjs
- .AddPizzaShopRateLimiting
- users/page.tsx
- next
- OrderStatus
- IdentityEmailSender
- schemas/ingredients.ts
- EmailMessage
- ForwardedHeadersExtensions.cs
- apiJson
- AddIdentity
- AddMenuActiveAndOrderCancellation
- AddOrdersStatusIndex
- AddRecipeItemUniqueIndex

## God Nodes (most connected - your core abstractions)
1. `next` - 52 edges
2. `react` - 52 edges
3. `Order` - 32 edges
4. `PizzaShopContext` - 32 edges
5. `PizzaShop.Api.Models` - 31 edges
6. `apiJson()` - 30 edges
7. `TestApi` - 29 edges
8. `Ingredient` - 28 edges
9. `formatMoney()` - 27 edges
10. `FormAlert()` - 25 edges

## Surprising Connections (you probably didn't know these)
- `FailingDelivery` --implements--> `IEmailDelivery`  [EXTRACTED]
  Tests/PizzaShop.Api.Tests/AccountEmailsTests.cs → api/Email/EmailMessage.cs
- `OrderCalculatorTests` --references--> `PizzaSize`  [EXTRACTED]
  Tests/PizzaShop.Api.Tests/OrderCalculatorTests.cs → api/Models/PizzaSize.cs
- `Next.js Agent Rules (breaking-change docs warning)` --conceptually_related_to--> `Frontend Conventions (Server Components, Zod, feature hooks)`  [INFERRED]
  web/AGENTS.md → CLAUDE.md
- `RecordingEmailDelivery` --implements--> `IEmailDelivery`  [EXTRACTED]
  Tests/PizzaShop.Api.Tests/Infrastructure/RecordingEmailDelivery.cs → api/Email/EmailMessage.cs
- `RecordingEmailDelivery` --references--> `EmailMessage`  [EXTRACTED]
  Tests/PizzaShop.Api.Tests/Infrastructure/RecordingEmailDelivery.cs → api/Email/EmailMessage.cs

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Order creation inventory deduction flow** — claude_inventory_deduction, claude_orderitems, claude_orderitemtoppings, claude_recipeitems, claude_ingredients [EXTRACTED 1.00]
- **Local dev database setup** — readme_pnpm_scripts, readme_env_example, readme_podman_compose, docker_compose_postgres, docker_compose_postgres_data [INFERRED 0.85]
- **Price snapshot pattern for historical stability** — claude_price_stability, claude_orderitems, claude_orderitemtoppings, claude_orders [INFERRED 0.85]
- **create-next-app Default Boilerplate Assets (currently unused)** — web_public_file_file_icon, web_public_globe_globe_icon, web_public_next_next_js_wordmark, web_public_vercel_vercel_logo, web_public_window_window_icon [INFERRED 0.85]

## Communities (160 total, 102 thin omitted)

### Community 0 - "Pizza Shop POS README"
Cohesion: 0.12
Nodes (19): Ingredients table, OrderItems table, OrderItemToppings table, Orders table, Pizza Customizer (size, crust, fractional toppings), Pizza Shop POS, PizzaSizes table, RecipeItems table (+11 more)

### Community 1 - "web/package.json"
Cohesion: 0.12
Nodes (16): class-variance-authority, cn, next-themes, radix-ui, react-dom, shadcn, tailwindcss, @tailwindcss/turbopack (+8 more)

### Community 2 - "IngredientFormDialog.tsx"
Cohesion: 0.14
Nodes (10): sonner, PRESET_LABELS, MODE_CHOICES, MODE_COPY, FIELDS, IngredientFormDialogProps, STATUS_CHOICES, TOPPING_CHOICES (+2 more)

### Community 3 - "compilerOptions"
Cohesion: 0.11
Nodes (18): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+10 more)

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
Cohesion: 0.10
Nodes (18): net10.0, coverlet.collector (6.0.4), MailKit (4.18.1), Microsoft.AspNetCore.DataProtection.EntityFrameworkCore (10.0.12), Microsoft.AspNetCore.Identity.EntityFrameworkCore (10.0.12), Microsoft.AspNetCore.Mvc.Testing (10.0.12), Microsoft.AspNetCore.OpenApi (10.0.12), Microsoft.EntityFrameworkCore.Design (10.0.12) (+10 more)

### Community 10 - "Globe Icon (world/web, 16x16 gray)"
Cohesion: 0.67
Nodes (3): File Icon (document outline, 16x16 gray), Globe Icon (world/web, 16x16 gray), Browser Window Icon (16x16 gray)

### Community 11 - "schemas/orders.ts"
Cohesion: 0.07
Nodes (40): GET(), problemJson(), hrefForPage(), metadata, MyOrdersPage(), MyOrdersSkeleton(), MyOrdersTable(), FILTERS (+32 more)

### Community 13 - "ApiFactory"
Cohesion: 0.06
Nodes (13): HealthTests, ApiCollection, ApiFactory, Emails, Environment, Settings, DevelopmentApiFactory, Environment (+5 more)

### Community 14 - "system_componentmodel_dataannotations"
Cohesion: 0.09
Nodes (9): AdjustIngredientStockRequest, CreateIngredientRequest, CreatePizzaSizeRequest, CreateUnitOfMeasureRequest, QuoteOrderRequest, UpdateIngredientRequest, UpdatePizzaSizeRequest, UpdateUnitOfMeasureRequest (+1 more)

### Community 15 - "MigrationBuilder"
Cohesion: 0.11
Nodes (3): InitialCreate, AddOrdersCreatedAtIndex, ConfirmExistingUserEmails

### Community 19 - "RecipeItem"
Cohesion: 0.15
Nodes (8): DevelopmentSeeder, RecipeItem, Amount, Ingredient, IngredientId, Recipe, RecipeId, RecipeItemId

### Community 20 - "PizzaShopContext"
Cohesion: 0.09
Nodes (11): PizzaShopContext, DataProtectionKeys, Ingredients, OrderIngredientUsages, OrderItems, OrderItemToppings, Orders, PizzaSizes (+3 more)

### Community 21 - "Order"
Cohesion: 0.07
Nodes (20): Order, CancellationReason, CancelledAt, CancelledBy, CancelledByUserId, CreatedAt, IdempotencyKey, IngredientUsages (+12 more)

### Community 26 - "AuthExtensions.cs"
Cohesion: 0.09
Nodes (7): RateLimitPolicies, OrderOptions, TaxRate, StatisticsOptions, TimeZone, PizzaShop.Api.Email, PizzaShop.Api.Options

### Community 27 - ".Create"
Cohesion: 0.05
Nodes (24): CancelledOrderFeedItemDto, OrderDto, OrderFeedItemDto, OrderItemDto, OrderItemToppingDto, OrderQuoteDto, OrderQuoteItemDto, OrderQuoteMapper (+16 more)

### Community 28 - "OrderMapper"
Cohesion: 0.21
Nodes (5): OrderMapper, PizzaSizeDto, PizzaSizeMapper, UnitOfMeasureDto, UnitOfMeasureMapper

### Community 32 - "auth/actions.ts"
Cohesion: 0.05
Nodes (89): RFC-9457, server-only, zod, idempotencyKeySchema, placeOrder(), adjustStock(), createIngredient(), deleteIngredient() (+81 more)

### Community 38 - ".NewUserAsync"
Cohesion: 0.20
Nodes (4): OrderFeedDto, OrderSummaryDto, PagedResult, OrdersTests

### Community 42 - "OrderItem"
Cohesion: 0.12
Nodes (13): OrderItem, ItemNameSnapshot, LineTotal, Order, OrderId, OrderItemId, PizzaSize, PizzaSizeId (+5 more)

### Community 43 - "IngredientMapper"
Cohesion: 0.16
Nodes (4): IngredientDto, IngredientMapper, ToppingDto, ToppingMapper

### Community 44 - "RecipeForm.tsx"
Cohesion: 0.21
Nodes (11): blankItem(), FieldMessage(), RecipeForm(), RecipeFormProps, STATUS_CHOICES, NativeSelect(), NativeSelectOption(), NativeSelectProps (+3 more)

### Community 45 - ".PlaceAsync"
Cohesion: 0.26
Nodes (5): CancelOrderRequest, UpdateOrderStatusRequest, UpdateRecipeRequest, CancellationTests, TestUser

### Community 46 - "InventoryTable.tsx"
Cohesion: 0.15
Nodes (18): AdjustStockDialog(), DeleteIngredientDialog(), IngredientAdminActions(), NewIngredientButton(), defaultsFor(), FieldMessage(), IngredientFormDialog(), InventoryTable() (+10 more)

### Community 47 - ".Price"
Cohesion: 0.15
Nodes (5): PizzaSize, Name, PizzaSizeId, PriceMultiplier, OrderCalculator

### Community 48 - "RecipeDto.cs"
Cohesion: 0.36
Nodes (3): RecipeDto, RecipeItemDto, RecipeMapper

### Community 50 - "pizzashop_api_dtos"
Cohesion: 0.24
Nodes (3): PizzaShop.Api.Tests, PizzaShop.Api.Orders, PizzaShop.Api.Tests.Infrastructure

### Community 51 - "NavLinks.tsx"
Cohesion: 0.06
Nodes (50): AppLayout(), AuthLayout(), geistMono, geistSans, metadata, AppShell(), AppShellProps, Brand() (+42 more)

### Community 52 - "OrderIngredientUsage"
Cohesion: 0.25
Nodes (7): OrderIngredientUsage, Amount, Ingredient, IngredientId, Order, OrderId, OrderIngredientUsageId

### Community 53 - ".ResolveRange"
Cohesion: 0.13
Nodes (7): OrderSnapshot, RangeResult, StatisticsCalculator, StatisticsRange, Days, PizzaShop.Api.Statistics, StatisticsCalculatorTests

### Community 55 - "analytics/page.tsx"
Cohesion: 0.10
Nodes (34): AnalyticsPage(), CancellationsSection(), Empty(), Filters(), ItemsSection(), metadata, readQuery(), SalesSection() (+26 more)

### Community 57 - "Recipe"
Cohesion: 0.15
Nodes (8): Recipe, BasePrice, IsActive, Name, RecipeId, RecipeItems, OrderItemToppingRequest, OrderCalculatorTests

### Community 58 - "api/menu.ts"
Cohesion: 0.13
Nodes (23): lucide-react, POST(), problemJson(), Builder(), BuilderPage(), BuilderSkeleton(), metadata, DeleteRecipeDialog() (+15 more)

### Community 62 - "OrderActions.tsx"
Cohesion: 0.43
Nodes (6): OrderActions(), OrderActionsProps, reportFailure(), CancelOrderDialog(), isCancellable(), ActionFailure

### Community 68 - "RegisterForm.tsx"
Cohesion: 0.16
Nodes (24): @hookform/resolvers, react-hook-form, FIELDS, ForgotPasswordForm(), ForgotPasswordPage(), FIELDS, LoginForm(), LoginPage() (+16 more)

### Community 69 - "EmailOptions"
Cohesion: 0.10
Nodes (16): SmtpEmailDelivery, EmailOptions, FromAddress, FromName, Smtp, WebBaseUrl, SmtpOptions, Host (+8 more)

### Community 72 - ".ReadProblemAsync"
Cohesion: 0.12
Nodes (6): UpdateUserRolesRequest, LoginResponse, TestApi, Emails, RateLimitingTests, UsersTests

### Community 74 - "PizzaBuilder.tsx"
Cohesion: 0.12
Nodes (25): AMOUNT_CHOICES, COVERAGE_CHOICES, PizzaBuilder(), PizzaBuilderProps, CartContext, CartLine, CartProvider(), CartState (+17 more)

### Community 77 - "Ingredient"
Cohesion: 0.12
Nodes (14): INamedEntity, Name, Ingredient, CurrentStock, IngredientId, IsActive, Name, ToppingPortion (+6 more)

### Community 78 - "dependencies"
Cohesion: 0.13
Nodes (15): dependencies, class-variance-authority, cn, @hookform/resolvers, lucide-react, next, next-themes, radix-ui (+7 more)

### Community 91 - ".CreateIngredientAsync"
Cohesion: 0.18
Nodes (3): CreateRecipeRequest, RecipeItemRequest, CatalogTests

### Community 95 - "orders/[id]/page.tsx"
Cohesion: 0.29
Nodes (12): metadata, MyOrder(), MyOrderPage(), MyOrderSkeleton(), Detail(), metadata, OrderDetail(), OrderDetailSkeleton() (+4 more)

### Community 103 - "format.ts"
Cohesion: 0.09
Nodes (31): ActiveOrderCard(), ActiveOrdersBoard(), Column(), COLUMNS, AdvanceOrderButton(), AdvanceOrderButtonProps, LABELS, ElapsedTime() (+23 more)

### Community 105 - "OrderItemTopping"
Cohesion: 0.11
Nodes (17): ToppingAmount, Extra, Light, Standard, ToppingCoverage, LeftHalf, RightHalf, Whole (+9 more)

### Community 112 - "devDependencies"
Cohesion: 0.20
Nodes (10): devDependencies, eslint, eslint-config-next, shadcn, tailwindcss, @tailwindcss/turbopack, @types/node, @types/react (+2 more)

### Community 114 - "PizzaShop.Api.Db"
Cohesion: 0.12
Nodes (4): Policies, AppUser, PizzaShop.Api.Auth, PizzaShop.Api.Db

### Community 115 - "scripts"
Cohesion: 0.40
Nodes (5): scripts, build, dev, lint, start

### Community 116 - "eslint.config.mjs"
Cohesion: 0.50
Nodes (3): eslint, eslint-config-next, eslintConfig

### Community 119 - ".AddPizzaShopRateLimiting"
Cohesion: 0.17
Nodes (5): RateLimitingExtensions, RateLimitingOptions, AuthPerMinute, OrderCreatePerMinute, UserPerMinute

### Community 126 - "users/page.tsx"
Cohesion: 0.13
Nodes (22): hrefFor(), metadata, ROLE_BADGE_CLASSES, SearchForm(), UsersPage(), UsersTable(), UsersTableSkeleton(), ROLE_LABELS (+14 more)

### Community 127 - "next"
Cohesion: 0.11
Nodes (22): next, react, CartView(), ORDER_TYPE_CHOICES, CartPage(), metadata, MenuPage(), metadata (+14 more)

### Community 128 - "OrderStatus"
Cohesion: 0.12
Nodes (12): OrderStatus, Cancelled, Completed, Pending, Preparing, Ready, OrderType, Delivery (+4 more)

### Community 133 - "schemas/ingredients.ts"
Cohesion: 0.10
Nodes (25): Inventory(), InventoryPage(), InventorySkeleton(), metadata, metadata, NewRecipe(), NewRecipePage(), listIngredients() (+17 more)

### Community 134 - "EmailMessage"
Cohesion: 0.13
Nodes (4): Roles, EmailMessage, IEmailDelivery, RecordingEmailDelivery

### Community 136 - "ForwardedHeadersExtensions.cs"
Cohesion: 0.20
Nodes (3): CorsExtensions, ForwardedHeadersExtensions, PizzaShop.Api.Extensions

### Community 137 - "apiJson"
Cohesion: 0.14
Nodes (21): apiJson(), cancellationStatisticsSchema, cancelledSummarySchema, customRangeError(), dayNumber(), ingredientUsageStatisticsSchema, isoDate, itemStatisticsSchema (+13 more)

## Ambiguous Edges - Review These
- `pnpm workspace (packages: web)` → `Tech Stack (pnpm, Next.js 16, ASP.NET 10, PostgreSQL, Azure)`  [AMBIGUOUS]
  pnpm-workspace.yaml · relation: conceptually_related_to

## Knowledge Gaps
- **163 isolated node(s):** `OrderId`, `OrderNumber`, `Status`, `OrderType`, `SubTotal` (+158 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 723 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **102 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `PizzaShop.Api.Models` connect `microsoft_entityframeworkcore` to `OrderStatus`, `OrdersEndpoints.cs`, `IngredientMapper`, `Ingredient`, `system_componentmodel_dataannotations`, `RecipeDto.cs`, `PizzaShop.Api.Db`, `pizzashop_api_dtos`, `.Create`?**
  _High betweenness centrality (0.038) - this node is a cross-community bridge._
- **What connects `OrderId`, `OrderNumber`, `Status` to the rest of the system?**
  _163 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Pizza Shop POS README` be split into smaller, more focused modules?**
  _Cohesion score 0.1164021164021164 - nodes in this community are weakly interconnected._
- **Why does `react` connect `next` to `auth/actions.ts`, `web/package.json`, `IngredientFormDialog.tsx`, `users/page.tsx`, `IngredientAdminActions.tsx`, `schemas/ingredients.ts`, `RegisterForm.tsx`, `format.ts`, `PizzaBuilder.tsx`, `schemas/orders.ts`, `RecipeForm.tsx`, `InventoryTable.tsx`, `NavLinks.tsx`, `analytics/page.tsx`, `api/menu.ts`, `OrderActions.tsx`, `orders/[id]/page.tsx`?**
  _High betweenness centrality (0.030) - this node is a cross-community bridge._
- **Should `web/package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.11764705882352941 - nodes in this community are weakly interconnected._
- **Why does `PizzaShopContext` connect `PizzaShopContext` to `.NameTakenAsync`, `Ingredient`, `PizzaShop.Api.Db`, `OrderIngredientUsage`, `Order`, `.UpdateRoles`, `Recipe`, `.GetAll`?**
  _High betweenness centrality (0.023) - this node is a cross-community bridge._

### Low-confidence Hints
_AMBIGUOUS edges — the extractor was unsure. Verify before acting on these._

- **What is the exact relationship between `pnpm workspace (packages: web)` and `Tech Stack (pnpm, Next.js 16, ASP.NET 10, PostgreSQL, Azure)`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._