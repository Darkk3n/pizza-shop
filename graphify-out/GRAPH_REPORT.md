# Graph Report - pizza-shop  (2026-10-26)

## Corpus Check
- 241 files · ~68,903 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 7 file(s) not represented in the graph (top: (none) 3, .example 2, .ico 1)

## Summary
- 2044 nodes · 5084 edges · 165 communities (63 shown, 102 thin omitted)
- Extraction: 96% EXTRACTED · 4% INFERRED · 0% AMBIGUOUS · INFERRED: 192 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `cd8487a6`
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
- microsoft_entityframeworkcore
- MigrationBuilder
- users/page.tsx
- RecipeItem
- PizzaShopContext
- Order
- PizzaShop.Api.Migrations
- .UpdateRoles
- .Update
- AuthExtensions.cs
- .Create
- auth/actions.ts
- .GetAll
- .Update
- currentUser.ts
- TestApi
- .BuildModel
- .AddPizzaShopAuth
- .TransformAsync
- OrderItem
- react
- .ReadAsync
- .PlaceAsync
- .Price
- PizzaShop.Api.Dtos
- TestApi.cs
- NavLinks.tsx
- OrderIngredientUsage
- StatisticsCalculatorTests
- proxy.ts
- SalesChart.tsx
- Recipe
- apiJson
- .ReadProblemAsync
- .FromPriced
- OrdersEndpoints.cs
- RegisterForm.tsx
- EmailOptions
- .Update
- .NewUserAsync
- schemas/ingredients.ts
- PizzaBuilder.tsx
- .NameTakenAsync
- EmailTests
- Ingredient
- dependencies
- AddIngredientToppingFields
- OrderItemTopping
- AddOrderIdempotencyKey
- AccountEmails
- (app)/page.tsx
- my-orders/page.tsx
- format.ts
- OrderStatus
- devDependencies
- web_components_ui_button
- scripts
- eslint.config.mjs
- .AddPizzaShopRateLimiting
- schemas/users.ts
- next
- IdentityEmailSender
- problem.ts
- recipes/[id]/page.tsx
- EmailMessage
- .AdminAsync
- ForwardedHeadersExtensions.cs
- analytics/page.tsx

## God Nodes (most connected - your core abstractions)
1. `react` - 53 edges
2. `next` - 52 edges
3. `PizzaShopContext` - 32 edges
4. `Order` - 32 edges
5. `TestApi` - 31 edges
6. `apiJson()` - 31 edges
7. `PizzaShop.Api.Models` - 31 edges
8. `Ingredient` - 28 edges
9. `formatMoney()` - 27 edges
10. `requireAdmin()` - 25 edges

## Surprising Connections (you probably didn't know these)
- `FailingDelivery` --implements--> `IEmailDelivery`  [EXTRACTED]
  Tests/PizzaShop.Api.Tests/AccountEmailsTests.cs → api/Email/EmailMessage.cs
- `OrderCalculatorTests` --references--> `PizzaSize`  [EXTRACTED]
  Tests/PizzaShop.Api.Tests/OrderCalculatorTests.cs → api/Models/PizzaSize.cs
- `Next.js Agent Rules (breaking-change docs warning)` --conceptually_related_to--> `Frontend Conventions (Server Components, Zod, feature hooks)`  [INFERRED]
  web/AGENTS.md → CLAUDE.md
- `RecordingEmailDelivery` --references--> `EmailMessage`  [EXTRACTED]
  Tests/PizzaShop.Api.Tests/Infrastructure/RecordingEmailDelivery.cs → api/Email/EmailMessage.cs
- `RecordingEmailDelivery` --implements--> `IEmailDelivery`  [EXTRACTED]
  Tests/PizzaShop.Api.Tests/Infrastructure/RecordingEmailDelivery.cs → api/Email/EmailMessage.cs

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Order creation inventory deduction flow** — claude_inventory_deduction, claude_orderitems, claude_orderitemtoppings, claude_recipeitems, claude_ingredients [EXTRACTED 1.00]
- **Local dev database setup** — readme_pnpm_scripts, readme_env_example, readme_podman_compose, docker_compose_postgres, docker_compose_postgres_data [INFERRED 0.85]
- **Price snapshot pattern for historical stability** — claude_price_stability, claude_orderitems, claude_orderitemtoppings, claude_orders [INFERRED 0.85]
- **create-next-app Default Boilerplate Assets (currently unused)** — web_public_file_file_icon, web_public_globe_globe_icon, web_public_next_next_js_wordmark, web_public_vercel_vercel_logo, web_public_window_window_icon [INFERRED 0.85]

## Communities (165 total, 102 thin omitted)

### Community 0 - "Pizza Shop POS README"
Cohesion: 0.12
Nodes (19): Ingredients table, OrderItems table, OrderItemToppings table, Orders table, Pizza Customizer (size, crust, fractional toppings), Pizza Shop POS, PizzaSizes table, RecipeItems table (+11 more)

### Community 1 - "web/package.json"
Cohesion: 0.12
Nodes (15): class-variance-authority, next-themes, radix-ui, react-dom, shadcn, tailwindcss, @tailwindcss/turbopack, tw-animate-css (+7 more)

### Community 2 - "IngredientFormDialog.tsx"
Cohesion: 0.12
Nodes (11): PRESET_LABELS, AdjustStockDialog(), MODE_CHOICES, MODE_COPY, FIELDS, IngredientFormDialogProps, STATUS_CHOICES, TOPPING_CHOICES (+3 more)

### Community 3 - "compilerOptions"
Cohesion: 0.11
Nodes (18): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+10 more)

### Community 4 - "IngredientAdminActions.tsx"
Cohesion: 0.10
Nodes (11): sonner, DeleteIngredientDialog(), DeleteIngredientDialogProps, IngredientAdminActions(), NewIngredientButton(), defaultsFor(), FieldMessage(), IngredientFormDialog() (+3 more)

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
Cohesion: 0.09
Nodes (30): GET(), problemJson(), FILTERS, hrefFor(), metadata, OrdersPage(), OrdersTable(), OrdersTableSkeleton() (+22 more)

### Community 13 - "ApiFactory"
Cohesion: 0.06
Nodes (13): HealthTests, ApiCollection, ApiFactory, Emails, Environment, Settings, DevelopmentApiFactory, Environment (+5 more)

### Community 14 - "microsoft_entityframeworkcore"
Cohesion: 0.07
Nodes (13): AdjustIngredientStockRequest, CreateIngredientRequest, CreatePizzaSizeRequest, CreateRecipeRequest, CreateUnitOfMeasureRequest, QuoteOrderRequest, RecipeItemRequest, UpdateIngredientRequest (+5 more)

### Community 15 - "MigrationBuilder"
Cohesion: 0.04
Nodes (8): InitialCreate, AddRecipeItemUniqueIndex, AddIdentity, AddMenuActiveAndOrderCancellation, AddOrdersCreatedAtIndex, ConfirmExistingUserEmails, AddOrdersStatusIndex, AddOrdersCancelledAtIndex

### Community 16 - "users/page.tsx"
Cohesion: 0.10
Nodes (21): InventoryTableProps, View, VIEWS, metadata, RecipesPage(), RecipesTable(), RecipesTableSkeleton(), hrefFor() (+13 more)

### Community 19 - "RecipeItem"
Cohesion: 0.15
Nodes (8): DevelopmentSeeder, RecipeItem, Amount, Ingredient, IngredientId, Recipe, RecipeId, RecipeItemId

### Community 20 - "PizzaShopContext"
Cohesion: 0.09
Nodes (11): PizzaShopContext, DataProtectionKeys, Ingredients, OrderIngredientUsages, OrderItems, OrderItemToppings, Orders, PizzaSizes (+3 more)

### Community 21 - "Order"
Cohesion: 0.07
Nodes (20): Order, CancellationReason, CancelledAt, CancelledBy, CancelledByUserId, CreatedAt, IdempotencyKey, IngredientUsages (+12 more)

### Community 23 - ".UpdateRoles"
Cohesion: 0.10
Nodes (3): UserDto, UsersEndpoints, AppUser

### Community 26 - "AuthExtensions.cs"
Cohesion: 0.06
Nodes (9): Policies, RateLimitPolicies, OrderOptions, TaxRate, StatisticsOptions, TimeZone, PizzaShop.Api.Auth, PizzaShop.Api.Email (+1 more)

### Community 27 - ".Create"
Cohesion: 0.06
Nodes (25): CancelledOrderFeedItemDto, OrderDto, OrderFeedDto, OrderFeedItemDto, OrderItemDto, OrderItemToppingDto, OrderMapper, OrderSummaryDto (+17 more)

### Community 28 - "auth/actions.ts"
Cohesion: 0.09
Nodes (37): ApiFetchOptions, getClientIp(), withSession(), apiBaseUrl(), callApi(), callApiJson(), CallApiOptions, confirmLinkSchema (+29 more)

### Community 31 - ".Update"
Cohesion: 0.13
Nodes (3): IngredientDto, IngredientMapper, IngredientsEndpoints

### Community 32 - "currentUser.ts"
Cohesion: 0.15
Nodes (34): zod, idempotencyKeySchema, placeOrder(), adjustStock(), createIngredient(), deleteIngredient(), ingredientIdSchema, updateIngredient() (+26 more)

### Community 38 - "TestApi"
Cohesion: 0.12
Nodes (6): UpdateUserRolesRequest, LoginResponse, TestApi, Emails, RateLimitingTests, UsersTests

### Community 42 - "OrderItem"
Cohesion: 0.12
Nodes (13): OrderItem, ItemNameSnapshot, LineTotal, Order, OrderId, OrderItemId, PizzaSize, PizzaSizeId (+5 more)

### Community 44 - "react"
Cohesion: 0.15
Nodes (14): cn, lucide-react, react, RecipeFormProps, STATUS_CHOICES, ROLE_LABELS, UserRoleControl(), UserRoleControlProps (+6 more)

### Community 46 - ".PlaceAsync"
Cohesion: 0.30
Nodes (3): CancelOrderRequest, UpdateOrderStatusRequest, CancellationTests

### Community 47 - ".Price"
Cohesion: 0.15
Nodes (5): PizzaSize, Name, PizzaSizeId, PriceMultiplier, OrderCalculator

### Community 48 - "PizzaShop.Api.Dtos"
Cohesion: 0.12
Nodes (7): CurrentUserDto, RecipeDto, RecipeItemDto, RecipeMapper, ToppingDto, ToppingMapper, PizzaShop.Api.Dtos

### Community 50 - "TestApi.cs"
Cohesion: 0.13
Nodes (3): PizzaShop.Api.Tests, PizzaShop.Api.Orders, PizzaShop.Api.Tests.Infrastructure

### Community 51 - "NavLinks.tsx"
Cohesion: 0.05
Nodes (64): AppLayout(), AuthLayout(), geistMono, geistSans, metadata, AppShell(), AppShellProps, Brand() (+56 more)

### Community 52 - "OrderIngredientUsage"
Cohesion: 0.25
Nodes (7): OrderIngredientUsage, Amount, Ingredient, IngredientId, Order, OrderId, OrderIngredientUsageId

### Community 53 - "StatisticsCalculatorTests"
Cohesion: 0.11
Nodes (8): IngredientStockSnapshot, OrderSnapshot, RangeResult, StatisticsCalculator, StatisticsRange, Days, PizzaShop.Api.Statistics, StatisticsCalculatorTests

### Community 54 - "proxy.ts"
Cohesion: 0.27
Nodes (12): LoginResponse, ACCESS_COOKIE, ACCESS_EXPIRES_COOKIE, cookieOptions, REFRESH_COOKIE, SESSION_COOKIES, sessionCookieValues(), clientIp() (+4 more)

### Community 55 - "SalesChart.tsx"
Cohesion: 0.32
Nodes (14): CancellationsSection(), columnPath(), DaysTable(), describe(), niceMax(), SalesChart(), ScrollTable(), StickyTableHeader() (+6 more)

### Community 57 - "Recipe"
Cohesion: 0.15
Nodes (8): Recipe, BasePrice, IsActive, Name, RecipeId, RecipeItems, OrderItemToppingRequest, OrderCalculatorTests

### Community 58 - "apiJson"
Cohesion: 0.14
Nodes (20): POST(), problemJson(), Builder(), BuilderPage(), BuilderSkeleton(), metadata, apiJson(), listPizzaSizes() (+12 more)

### Community 62 - ".FromPriced"
Cohesion: 0.23
Nodes (4): OrderQuoteDto, OrderQuoteItemDto, OrderQuoteMapper, OrderQuoteToppingDto

### Community 68 - "RegisterForm.tsx"
Cohesion: 0.23
Nodes (17): @hookform/resolvers, react-hook-form, FIELDS, ForgotPasswordForm(), FIELDS, LoginForm(), CheckInbox(), FIELDS (+9 more)

### Community 69 - "EmailOptions"
Cohesion: 0.10
Nodes (16): SmtpEmailDelivery, EmailOptions, FromAddress, FromName, Smtp, WebBaseUrl, SmtpOptions, Host (+8 more)

### Community 71 - ".Update"
Cohesion: 0.07
Nodes (6): PizzaSizeDto, PizzaSizeMapper, UnitOfMeasureDto, UnitOfMeasureMapper, PizzaSizesEndpoints, UnitsOfMeasureEndpoints

### Community 73 - "schemas/ingredients.ts"
Cohesion: 0.17
Nodes (14): checkTopping(), hasTwoDecimals, IngredientForm, ingredientFormSchema, ingredientFormShape, newIngredientFormSchema, optionalNumber, quantity (+6 more)

### Community 74 - "PizzaBuilder.tsx"
Cohesion: 0.10
Nodes (30): CartView(), ORDER_TYPE_CHOICES, CartPage(), metadata, AMOUNT_CHOICES, COVERAGE_CHOICES, PizzaBuilder(), PizzaBuilderProps (+22 more)

### Community 77 - "Ingredient"
Cohesion: 0.12
Nodes (14): INamedEntity, Name, Ingredient, CurrentStock, IngredientId, IsActive, Name, ToppingPortion (+6 more)

### Community 78 - "dependencies"
Cohesion: 0.13
Nodes (15): dependencies, class-variance-authority, cn, @hookform/resolvers, lucide-react, next, next-themes, radix-ui (+7 more)

### Community 80 - "OrderItemTopping"
Cohesion: 0.14
Nodes (13): ToppingAmount, Extra, Light, Standard, OrderItemTopping, Coverage, ExtraAmount, Ingredient (+5 more)

### Community 91 - "(app)/page.tsx"
Cohesion: 0.70
Nodes (4): Home(), metadata, StaffDashboard(), ActiveOrdersBoardSkeleton()

### Community 95 - "my-orders/page.tsx"
Cohesion: 0.16
Nodes (20): MyOrder(), hrefForPage(), metadata, MyOrdersPage(), MyOrdersSkeleton(), MyOrdersTable(), Detail(), metadata (+12 more)

### Community 103 - "format.ts"
Cohesion: 0.12
Nodes (19): OrderActions(), OrderActionsProps, reportFailure(), isCancellable(), nextStatuses(), OrderStatus, OrderType, ActionFailure (+11 more)

### Community 105 - "OrderStatus"
Cohesion: 0.10
Nodes (16): OrderStatus, Cancelled, Completed, Pending, Preparing, Ready, OrderType, Delivery (+8 more)

### Community 112 - "devDependencies"
Cohesion: 0.20
Nodes (10): devDependencies, eslint, eslint-config-next, shadcn, tailwindcss, @tailwindcss/turbopack, @types/node, @types/react (+2 more)

### Community 114 - "web_components_ui_button"
Cohesion: 0.24
Nodes (10): ActiveOrderCard(), AdvanceOrderButton(), AdvanceOrderButtonProps, LABELS, ElapsedTime(), getMinute(), getServerMinute(), subscribe() (+2 more)

### Community 115 - "scripts"
Cohesion: 0.40
Nodes (5): scripts, build, dev, lint, start

### Community 116 - "eslint.config.mjs"
Cohesion: 0.50
Nodes (3): eslint, eslint-config-next, eslintConfig

### Community 119 - ".AddPizzaShopRateLimiting"
Cohesion: 0.19
Nodes (5): RateLimitingExtensions, RateLimitingOptions, AuthPerMinute, OrderCreatePerMinute, UserPerMinute

### Community 126 - "schemas/users.ts"
Cohesion: 0.25
Nodes (7): pagedSchema(), User, userListQuerySchema, userPageSchema, UserRole, userRoleSchema, userSchema

### Community 127 - "next"
Cohesion: 0.10
Nodes (22): next, MenuPage(), metadata, RecipeGrid(), RecipeGridSkeleton(), metadata, MyOrderPage(), MyOrderSkeleton() (+14 more)

### Community 132 - "problem.ts"
Cohesion: 0.24
Nodes (11): RFC-9457, quoteKey(), useQuote(), describeApiError(), lowerFirst(), Problem, problemSchema, readApiError() (+3 more)

### Community 133 - "recipes/[id]/page.tsx"
Cohesion: 0.14
Nodes (21): server-only, Inventory(), InventoryPage(), InventorySkeleton(), metadata, DeleteRecipeDialog(), EditRecipe(), EditRecipePage() (+13 more)

### Community 134 - "EmailMessage"
Cohesion: 0.11
Nodes (4): Roles, EmailMessage, IEmailDelivery, RecordingEmailDelivery

### Community 136 - "ForwardedHeadersExtensions.cs"
Cohesion: 0.20
Nodes (3): CorsExtensions, ForwardedHeadersExtensions, PizzaShop.Api.Extensions

### Community 137 - "analytics/page.tsx"
Cohesion: 0.09
Nodes (38): AnalyticsPage(), Empty(), Filters(), ItemsSection(), metadata, readQuery(), RestockSection(), SalesSection() (+30 more)

## Ambiguous Edges - Review These
- `pnpm workspace (packages: web)` → `Tech Stack (pnpm, Next.js 16, ASP.NET 10, PostgreSQL, Azure)`  [AMBIGUOUS]
  pnpm-workspace.yaml · relation: conceptually_related_to

## Knowledge Gaps
- **163 isolated node(s):** `Emails`, `Days`, `class-variance-authority`, `next-themes`, `radix-ui` (+158 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 736 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **102 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `PizzaShop.Api.Dtos` connect `PizzaShop.Api.Dtos` to `OrdersEndpoints.cs`, `microsoft_entityframeworkcore`, `TestApi.cs`, `StatisticsCalculatorTests`, `.UpdateRoles`, `.Create`, `.FromPriced`?**
  _High betweenness centrality (0.028) - this node is a cross-community bridge._
- **What connects `Emails`, `Days`, `class-variance-authority` to the rest of the system?**
  _163 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Pizza Shop POS README` be split into smaller, more focused modules?**
  _Cohesion score 0.1164021164021164 - nodes in this community are weakly interconnected._
- **Why does `TestApi` connect `TestApi` to `.AdminAsync`, `.NewUserAsync`, `EmailTests`, `ApiFactory`, `.PlaceAsync`, `.ReadAsync`, `TestApi.cs`, `.ReadProblemAsync`?**
  _High betweenness centrality (0.026) - this node is a cross-community bridge._
- **Should `web/package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.125 - nodes in this community are weakly interconnected._
- **Why does `react` connect `react` to `web/package.json`, `IngredientFormDialog.tsx`, `IngredientAdminActions.tsx`, `recipes/[id]/page.tsx`, `problem.ts`, `analytics/page.tsx`, `schemas/orders.ts`, `users/page.tsx`, `currentUser.ts`, `NavLinks.tsx`, `SalesChart.tsx`, `apiJson`, `RegisterForm.tsx`, `PizzaBuilder.tsx`, `(app)/page.tsx`, `my-orders/page.tsx`, `format.ts`, `web_components_ui_button`, `next`?**
  _High betweenness centrality (0.026) - this node is a cross-community bridge._

### Low-confidence Hints
_AMBIGUOUS edges — the extractor was unsure. Verify before acting on these._

- **What is the exact relationship between `pnpm workspace (packages: web)` and `Tech Stack (pnpm, Next.js 16, ASP.NET 10, PostgreSQL, Azure)`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._