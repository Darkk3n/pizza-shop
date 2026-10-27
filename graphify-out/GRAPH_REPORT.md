# Graph Report - pizza-shop  (2026-10-26)

## Corpus Check
- 241 files · ~67,381 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 7 file(s) not represented in the graph (top: (none) 3, .example 2, .ico 1)

## Summary
- 2021 nodes · 5009 edges · 165 communities (62 shown, 103 thin omitted)
- Extraction: 96% EXTRACTED · 4% INFERRED · 0% AMBIGUOUS · INFERRED: 190 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `2d8829fc`
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
- PizzaShop.Api.Models
- MigrationBuilder
- orders/page.tsx
- RecipeItem
- PizzaShopContext
- Order
- microsoft_entityframeworkcore
- .UpdateRoles
- .Update
- AuthExtensions.cs
- .Create
- auth/actions.ts
- .GetAll
- .Update
- inventory/actions.ts
- OrderDto
- .BuildModel
- .AddPizzaShopAuth
- .TransformAsync
- OrderItem
- .GetCancellations
- RecipeForm.tsx
- StatisticsDtos.cs
- InventoryTable.tsx
- .Price
- client.ts
- PizzaShop.Api.Tests
- NavLinks.tsx
- OrderIngredientUsage
- .ResolveRange
- proxy.ts
- SalesChart.tsx
- Recipe
- apiJson
- .FromPriced
- PizzaShop.Api.Dtos
- RegisterForm.tsx
- EmailOptions
- .Update
- .NewUserAsync
- react
- .NameTakenAsync
- EmailTests
- Ingredient
- dependencies
- AddIngredientToppingFields
- .Quote
- AddOrderIdempotencyKey
- AccountEmails
- currentUser.ts
- orders/[id]/page.tsx
- format.ts
- OrderItemTopping
- devDependencies
- PizzaShopContext.cs
- scripts
- eslint.config.mjs
- .AddPizzaShopRateLimiting
- users/page.tsx
- next
- OrderItemRequest
- IdentityEmailSender
- problem.ts
- recipes/[id]/page.tsx
- EmailMessage
- ForwardedHeadersExtensions.cs
- analytics/page.tsx
- AddIdentity
- AddOrdersCreatedAtIndex
- AddMenuActiveAndOrderCancellation
- AddRecipeItemUniqueIndex

## God Nodes (most connected - your core abstractions)
1. `react` - 53 edges
2. `next` - 52 edges
3. `PizzaShopContext` - 32 edges
4. `Order` - 32 edges
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

## Communities (165 total, 103 thin omitted)

### Community 0 - "Pizza Shop POS README"
Cohesion: 0.12
Nodes (19): Ingredients table, OrderItems table, OrderItemToppings table, Orders table, Pizza Customizer (size, crust, fractional toppings), Pizza Shop POS, PizzaSizes table, RecipeItems table (+11 more)

### Community 1 - "web/package.json"
Cohesion: 0.12
Nodes (16): class-variance-authority, cn, next-themes, radix-ui, react-dom, shadcn, tailwindcss, @tailwindcss/turbopack (+8 more)

### Community 2 - "IngredientFormDialog.tsx"
Cohesion: 0.08
Nodes (27): sonner, PRESET_LABELS, MODE_CHOICES, MODE_COPY, FIELDS, IngredientFormDialogProps, STATUS_CHOICES, TOPPING_CHOICES (+19 more)

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
Cohesion: 0.10
Nodes (18): net10.0, coverlet.collector (6.0.4), MailKit (4.18.1), Microsoft.AspNetCore.DataProtection.EntityFrameworkCore (10.0.12), Microsoft.AspNetCore.Identity.EntityFrameworkCore (10.0.12), Microsoft.AspNetCore.Mvc.Testing (10.0.12), Microsoft.AspNetCore.OpenApi (10.0.12), Microsoft.EntityFrameworkCore.Design (10.0.12) (+10 more)

### Community 10 - "Globe Icon (world/web, 16x16 gray)"
Cohesion: 0.67
Nodes (3): File Icon (document outline, 16x16 gray), Globe Icon (world/web, 16x16 gray), Browser Window Icon (16x16 gray)

### Community 11 - "schemas/orders.ts"
Cohesion: 0.10
Nodes (23): GET(), problemJson(), getOrderFeed(), ORDERS_PAGE_SIZE, CancelOrderInput, cancelOrderSchema, CreateOrderInput, createOrderSchema (+15 more)

### Community 13 - "ApiFactory"
Cohesion: 0.06
Nodes (13): HealthTests, ApiCollection, ApiFactory, Emails, Environment, Settings, DevelopmentApiFactory, Environment (+5 more)

### Community 14 - "PizzaShop.Api.Models"
Cohesion: 0.07
Nodes (13): AdjustIngredientStockRequest, CreateIngredientRequest, CreatePizzaSizeRequest, CreateRecipeRequest, CreateUnitOfMeasureRequest, QuoteOrderRequest, RecipeItemRequest, UpdateIngredientRequest (+5 more)

### Community 15 - "MigrationBuilder"
Cohesion: 0.15
Nodes (4): InitialCreate, ConfirmExistingUserEmails, AddOrdersStatusIndex, AddOrdersCancelledAtIndex

### Community 16 - "orders/page.tsx"
Cohesion: 0.10
Nodes (27): MenuPage(), metadata, RecipeGrid(), RecipeGridSkeleton(), hrefForPage(), metadata, MyOrdersPage(), MyOrdersSkeleton() (+19 more)

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

### Community 28 - "auth/actions.ts"
Cohesion: 0.13
Nodes (22): confirmLinkSchema, Credentials, credentialsSchema, currentUserSchema, EmailOnlyInput, emailOnlySchema, emailSchema, loginResponseSchema (+14 more)

### Community 31 - ".Update"
Cohesion: 0.08
Nodes (8): IngredientDto, IngredientMapper, RecipeDto, RecipeItemDto, RecipeMapper, ToppingDto, ToppingMapper, IngredientsEndpoints

### Community 32 - "inventory/actions.ts"
Cohesion: 0.21
Nodes (25): zod, idempotencyKeySchema, placeOrder(), adjustStock(), createIngredient(), deleteIngredient(), ingredientIdSchema, updateIngredient() (+17 more)

### Community 38 - "OrderDto"
Cohesion: 0.34
Nodes (8): CancelledOrderFeedItemDto, OrderDto, OrderFeedDto, OrderFeedItemDto, OrderItemDto, OrderItemToppingDto, OrderMapper, OrderSummaryDto

### Community 42 - "OrderItem"
Cohesion: 0.12
Nodes (13): OrderItem, ItemNameSnapshot, LineTotal, Order, OrderId, OrderItemId, PizzaSize, PizzaSizeId (+5 more)

### Community 44 - "RecipeForm.tsx"
Cohesion: 0.13
Nodes (19): defaultsFor(), FieldMessage(), IngredientFormDialog(), blankItem(), FieldMessage(), RecipeForm(), RecipeFormProps, STATUS_CHOICES (+11 more)

### Community 45 - "StatisticsDtos.cs"
Cohesion: 0.26
Nodes (12): CancellationsByRoleDto, CancellationStatisticsDto, CancelledOrderDto, CancelledSummaryDto, IngredientUsageDto, IngredientUsageStatisticsDto, ItemStatisticsDto, SalesDayDto (+4 more)

### Community 46 - "InventoryTable.tsx"
Cohesion: 0.33
Nodes (10): AdjustStockDialog(), IngredientAdminActions(), NewIngredientButton(), InventoryTable(), InventoryTableProps, isOut(), View, VIEWS (+2 more)

### Community 47 - ".Price"
Cohesion: 0.15
Nodes (5): PizzaSize, Name, PizzaSizeId, PriceMultiplier, OrderCalculator

### Community 48 - "client.ts"
Cohesion: 0.24
Nodes (14): server-only, ApiFetchOptions, getClientIp(), withSession(), apiBaseUrl(), callApi(), callApiJson(), CallApiOptions (+6 more)

### Community 50 - "PizzaShop.Api.Tests"
Cohesion: 0.24
Nodes (3): PizzaShop.Api.Tests, PizzaShop.Api.Orders, PizzaShop.Api.Tests.Infrastructure

### Community 51 - "NavLinks.tsx"
Cohesion: 0.05
Nodes (62): AppLayout(), AuthLayout(), geistMono, geistSans, metadata, AppShell(), AppShellProps, Brand() (+54 more)

### Community 52 - "OrderIngredientUsage"
Cohesion: 0.25
Nodes (7): OrderIngredientUsage, Amount, Ingredient, IngredientId, Order, OrderId, OrderIngredientUsageId

### Community 53 - ".ResolveRange"
Cohesion: 0.13
Nodes (7): OrderSnapshot, RangeResult, StatisticsCalculator, StatisticsRange, Days, PizzaShop.Api.Statistics, StatisticsCalculatorTests

### Community 54 - "proxy.ts"
Cohesion: 0.25
Nodes (13): LoginResponse, ACCESS_COOKIE, ACCESS_EXPIRES_COOKIE, cookieOptions, REFRESH_COOKIE, SESSION_COOKIES, sessionCookieValues(), setSessionCookies() (+5 more)

### Community 55 - "SalesChart.tsx"
Cohesion: 0.30
Nodes (13): columnPath(), DaysTable(), describe(), niceMax(), SalesChart(), ScrollTable(), StickyTableHeader(), dayDate() (+5 more)

### Community 57 - "Recipe"
Cohesion: 0.15
Nodes (8): Recipe, BasePrice, IsActive, Name, RecipeId, RecipeItems, OrderItemToppingRequest, OrderCalculatorTests

### Community 58 - "apiJson"
Cohesion: 0.17
Nodes (18): POST(), problemJson(), Builder(), BuilderPage(), BuilderSkeleton(), metadata, apiJson(), getRecipe() (+10 more)

### Community 62 - ".FromPriced"
Cohesion: 0.23
Nodes (4): OrderQuoteDto, OrderQuoteItemDto, OrderQuoteMapper, OrderQuoteToppingDto

### Community 64 - "PizzaShop.Api.Dtos"
Cohesion: 0.24
Nodes (4): CurrentUserDto, PizzaShop.Api.Db, PizzaShop.Api.Dtos, PizzaShop.Api.Endpoints

### Community 68 - "RegisterForm.tsx"
Cohesion: 0.17
Nodes (23): @hookform/resolvers, react-hook-form, FIELDS, ForgotPasswordForm(), ForgotPasswordPage(), FIELDS, LoginForm(), LoginPage() (+15 more)

### Community 69 - "EmailOptions"
Cohesion: 0.10
Nodes (16): SmtpEmailDelivery, EmailOptions, FromAddress, FromName, Smtp, WebBaseUrl, SmtpOptions, Host (+8 more)

### Community 71 - ".Update"
Cohesion: 0.07
Nodes (6): PizzaSizeDto, PizzaSizeMapper, UnitOfMeasureDto, UnitOfMeasureMapper, PizzaSizesEndpoints, UnitsOfMeasureEndpoints

### Community 72 - ".NewUserAsync"
Cohesion: 0.05
Nodes (15): PagedResult, CancelOrderRequest, UpdateOrderStatusRequest, UpdateUserRolesRequest, CancellationTests, CatalogTests, LoginResponse, TestApi (+7 more)

### Community 74 - "react"
Cohesion: 0.12
Nodes (21): react, CartContext, CartLine, CartProvider(), CartState, sameConfiguration(), ComingSoonProps, BuilderAction (+13 more)

### Community 77 - "Ingredient"
Cohesion: 0.12
Nodes (14): INamedEntity, Name, Ingredient, CurrentStock, IngredientId, IsActive, Name, ToppingPortion (+6 more)

### Community 78 - "dependencies"
Cohesion: 0.13
Nodes (15): dependencies, class-variance-authority, cn, @hookform/resolvers, lucide-react, next, next-themes, radix-ui (+7 more)

### Community 91 - "currentUser.ts"
Cohesion: 0.32
Nodes (9): Home(), metadata, StaffDashboard(), ActiveOrdersBoardSkeleton(), AdminOnly(), StaffOnly(), homePathFor(), requireStaff() (+1 more)

### Community 95 - "orders/[id]/page.tsx"
Cohesion: 0.15
Nodes (19): metadata, MyOrder(), MyOrderPage(), MyOrderSkeleton(), Detail(), metadata, OrderDetail(), OrderDetailSkeleton() (+11 more)

### Community 103 - "format.ts"
Cohesion: 0.09
Nodes (29): OrderActions(), OrderActionsProps, reportFailure(), ActiveOrderCard(), AdvanceOrderButton(), AdvanceOrderButtonProps, LABELS, ElapsedTime() (+21 more)

### Community 105 - "OrderItemTopping"
Cohesion: 0.07
Nodes (27): OrderStatus, Cancelled, Completed, Pending, Preparing, Ready, OrderType, Delivery (+19 more)

### Community 112 - "devDependencies"
Cohesion: 0.20
Nodes (10): devDependencies, eslint, eslint-config-next, shadcn, tailwindcss, @tailwindcss/turbopack, @types/node, @types/react (+2 more)

### Community 114 - "PizzaShopContext.cs"
Cohesion: 0.15
Nodes (3): Policies, AppUser, PizzaShop.Api.Auth

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
Cohesion: 0.15
Nodes (19): hrefFor(), metadata, ROLE_BADGE_CLASSES, SearchForm(), UsersPage(), UsersTable(), UsersTableSkeleton(), Pager() (+11 more)

### Community 127 - "next"
Cohesion: 0.10
Nodes (25): lucide-react, next, CartView(), ORDER_TYPE_CHOICES, CartPage(), metadata, AMOUNT_CHOICES, COVERAGE_CHOICES (+17 more)

### Community 132 - "problem.ts"
Cohesion: 0.32
Nodes (7): RFC-9457, describeApiError(), lowerFirst(), Problem, problemSchema, toFieldErrors(), toFieldPath()

### Community 133 - "recipes/[id]/page.tsx"
Cohesion: 0.20
Nodes (14): Inventory(), InventoryPage(), InventorySkeleton(), metadata, DeleteRecipeDialog(), EditRecipe(), EditRecipePage(), EditRecipeSkeleton() (+6 more)

### Community 134 - "EmailMessage"
Cohesion: 0.13
Nodes (4): Roles, EmailMessage, IEmailDelivery, RecordingEmailDelivery

### Community 136 - "ForwardedHeadersExtensions.cs"
Cohesion: 0.20
Nodes (3): CorsExtensions, ForwardedHeadersExtensions, PizzaShop.Api.Extensions

### Community 137 - "analytics/page.tsx"
Cohesion: 0.10
Nodes (35): AnalyticsPage(), CancellationsSection(), Empty(), Filters(), ItemsSection(), metadata, readQuery(), SalesSection() (+27 more)

## Ambiguous Edges - Review These
- `pnpm workspace (packages: web)` → `Tech Stack (pnpm, Next.js 16, ASP.NET 10, PostgreSQL, Azure)`  [AMBIGUOUS]
  pnpm-workspace.yaml · relation: conceptually_related_to

## Knowledge Gaps
- **163 isolated node(s):** `class-variance-authority`, `next-themes`, `radix-ui`, `react-dom`, `shadcn` (+158 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 726 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **103 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `PizzaShop.Api.Models` connect `PizzaShop.Api.Models` to `PizzaShop.Api.Dtos`, `OrderDto`, `OrdersEndpoints.cs`, `OrderItemTopping`, `Ingredient`, `PizzaShopContext.cs`, `PizzaShop.Api.Tests`, `.Update`?**
  _High betweenness centrality (0.033) - this node is a cross-community bridge._
- **What connects `class-variance-authority`, `next-themes`, `radix-ui` to the rest of the system?**
  _163 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Pizza Shop POS README` be split into smaller, more focused modules?**
  _Cohesion score 0.1164021164021164 - nodes in this community are weakly interconnected._
- **Why does `TestApi` connect `.NewUserAsync` to `OrdersEndpoints.cs`, `EmailTests`, `ApiFactory`, `EmailMessage`?**
  _High betweenness centrality (0.028) - this node is a cross-community bridge._
- **Should `web/package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.11764705882352941 - nodes in this community are weakly interconnected._
- **Why does `Ingredient` connect `Ingredient` to `OrderItemTopping`, `PizzaShop.Api.Models`, `.Price`, `PizzaShopContext`, `OrderIngredientUsage`, `Recipe`, `.Update`?**
  _High betweenness centrality (0.026) - this node is a cross-community bridge._

### Low-confidence Hints
_AMBIGUOUS edges — the extractor was unsure. Verify before acting on these._

- **What is the exact relationship between `pnpm workspace (packages: web)` and `Tech Stack (pnpm, Next.js 16, ASP.NET 10, PostgreSQL, Azure)`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._