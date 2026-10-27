# Graph Report - pizza-shop  (2026-10-26)

## Corpus Check
- 235 files · ~64,085 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 7 file(s) not represented in the graph (top: (none) 3, .example 2, .ico 1)

## Summary
- 1979 nodes · 4869 edges · 174 communities (66 shown, 108 thin omitted)
- Extraction: 96% EXTRACTED · 4% INFERRED · 0% AMBIGUOUS · INFERRED: 182 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `5b1802bf`
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
- PizzaShop.Api.Requests
- MigrationBuilder
- format.ts
- RecipeItem
- PizzaShopContext
- Order
- PizzaShop.Api.Migrations
- .UpdateRoles
- .Update
- AuthExtensions.cs
- .Create
- OrderDto.cs
- .GetAll
- .Update
- auth/actions.ts
- .NewUserAsync
- .BuildModel
- AuthExtensions
- .TransformAsync
- OrderItem
- PizzaShop.Api.Dtos
- react
- .PlaceAsync
- InventoryTable.tsx
- .Price
- inventory/actions.ts
- pizzashop_api_dtos
- NavLinks.tsx
- OrderIngredientUsage
- .ResolveRange
- .ReadProblemAsync
- analytics/page.tsx
- Recipe
- api/menu.ts
- PizzaSize
- PizzaShop.Api.Models
- RegisterForm.tsx
- EmailOptions
- .Update
- TestApi
- usePizzaBuilder.ts
- .NameTakenAsync
- EmailTests
- Ingredient
- dependencies
- AddIngredientToppingFields
- .AdminAsync
- AddOrderIdempotencyKey
- proxy.ts
- EmailMessage
- .CreateIngredientAsync
- orders/[id]/page.tsx
- schemas/orders.ts
- OrderItemTopping
- devDependencies
- PizzaShop.Api.Db
- scripts
- eslint.config.mjs
- DevelopmentApiFactory
- .AddPizzaShopRateLimiting
- IEmailDelivery
- OrderType
- users/page.tsx
- next
- OrderStatus
- .FromPriced
- .DeliveryFailure_IsLogged_NotThrown
- IdentityEmailSender
- TestDatabase
- recipes/[id]/page.tsx
- RecordingEmailDelivery
- ForwardedHeadersExtensions.cs
- currentUser.ts
- AddIdentity
- AddOrdersCreatedAtIndex
- RecipeItemRequest
- problem.ts
- SmtpOptions
- .RoleChange_AppliesAfterRefresh_NotBefore
- recipes/page.tsx
- AddOrdersStatusIndex
- ElapsedTime.tsx
- HealthTests
- ToppingCoverage
- AppUser

## God Nodes (most connected - your core abstractions)
1. `react` - 51 edges
2. `next` - 50 edges
3. `Order` - 32 edges
4. `PizzaShopContext` - 32 edges
5. `PizzaShop.Api.Models` - 31 edges
6. `TestApi` - 29 edges
7. `apiJson()` - 29 edges
8. `Ingredient` - 28 edges
9. `formatMoney()` - 25 edges
10. `FormAlert()` - 25 edges

## Surprising Connections (you probably didn't know these)
- `FailingDelivery` --implements--> `IEmailDelivery`  [EXTRACTED]
  Tests/PizzaShop.Api.Tests/AccountEmailsTests.cs → api/Email/EmailMessage.cs
- `RecordingEmailDelivery` --implements--> `IEmailDelivery`  [EXTRACTED]
  Tests/PizzaShop.Api.Tests/Infrastructure/RecordingEmailDelivery.cs → api/Email/EmailMessage.cs
- `RecordingEmailDelivery` --references--> `EmailMessage`  [EXTRACTED]
  Tests/PizzaShop.Api.Tests/Infrastructure/RecordingEmailDelivery.cs → api/Email/EmailMessage.cs
- `OrderCalculatorTests` --references--> `PizzaSize`  [EXTRACTED]
  Tests/PizzaShop.Api.Tests/OrderCalculatorTests.cs → api/Models/PizzaSize.cs
- `Next.js Agent Rules (breaking-change docs warning)` --conceptually_related_to--> `Frontend Conventions (Server Components, Zod, feature hooks)`  [INFERRED]
  web/AGENTS.md → CLAUDE.md

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Order creation inventory deduction flow** — claude_inventory_deduction, claude_orderitems, claude_orderitemtoppings, claude_recipeitems, claude_ingredients [EXTRACTED 1.00]
- **Local dev database setup** — readme_pnpm_scripts, readme_env_example, readme_podman_compose, docker_compose_postgres, docker_compose_postgres_data [INFERRED 0.85]
- **Price snapshot pattern for historical stability** — claude_price_stability, claude_orderitems, claude_orderitemtoppings, claude_orders [INFERRED 0.85]
- **create-next-app Default Boilerplate Assets (currently unused)** — web_public_file_file_icon, web_public_globe_globe_icon, web_public_next_next_js_wordmark, web_public_vercel_vercel_logo, web_public_window_window_icon [INFERRED 0.85]

## Communities (174 total, 108 thin omitted)

### Community 0 - "Pizza Shop POS README"
Cohesion: 0.12
Nodes (19): Ingredients table, OrderItems table, OrderItemToppings table, Orders table, Pizza Customizer (size, crust, fractional toppings), Pizza Shop POS, PizzaSizes table, RecipeItems table (+11 more)

### Community 1 - "web/package.json"
Cohesion: 0.12
Nodes (16): class-variance-authority, cn, next-themes, radix-ui, react-dom, shadcn, tailwindcss, @tailwindcss/turbopack (+8 more)

### Community 2 - "IngredientFormDialog.tsx"
Cohesion: 0.08
Nodes (24): sonner, PRESET_LABELS, MODE_CHOICES, MODE_COPY, FIELDS, IngredientFormDialogProps, STATUS_CHOICES, TOPPING_CHOICES (+16 more)

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

### Community 11 - "orders/page.tsx"
Cohesion: 0.13
Nodes (19): hrefForPage(), metadata, MyOrdersPage(), MyOrdersSkeleton(), MyOrdersTable(), FILTERS, hrefFor(), metadata (+11 more)

### Community 13 - "ApiFactory"
Cohesion: 0.12
Nodes (7): ApiCollection, ApiFactory, Emails, Environment, Settings, RateLimitedApiFactory, Settings

### Community 14 - "PizzaShop.Api.Requests"
Cohesion: 0.06
Nodes (12): AdjustIngredientStockRequest, CreateIngredientRequest, CreateOrderRequest, CreatePizzaSizeRequest, CreateUnitOfMeasureRequest, OrderItemRequest, QuoteOrderRequest, UpdateIngredientRequest (+4 more)

### Community 15 - "MigrationBuilder"
Cohesion: 0.14
Nodes (4): InitialCreate, AddRecipeItemUniqueIndex, AddMenuActiveAndOrderCancellation, ConfirmExistingUserEmails

### Community 16 - "format.ts"
Cohesion: 0.17
Nodes (21): columnPath(), DaysTable(), describe(), niceMax(), SalesChart(), OrderType, compactMoney, currency (+13 more)

### Community 19 - "RecipeItem"
Cohesion: 0.15
Nodes (8): DevelopmentSeeder, RecipeItem, Amount, Ingredient, IngredientId, Recipe, RecipeId, RecipeItemId

### Community 20 - "PizzaShopContext"
Cohesion: 0.10
Nodes (11): PizzaShopContext, DataProtectionKeys, Ingredients, OrderIngredientUsages, OrderItems, OrderItemToppings, Orders, PizzaSizes (+3 more)

### Community 21 - "Order"
Cohesion: 0.07
Nodes (20): Order, CancellationReason, CancelledAt, CancelledBy, CancelledByUserId, CreatedAt, IdempotencyKey, IngredientUsages (+12 more)

### Community 26 - "AuthExtensions.cs"
Cohesion: 0.08
Nodes (7): RateLimitPolicies, OrderOptions, TaxRate, StatisticsOptions, TimeZone, PizzaShop.Api.Email, PizzaShop.Api.Options

### Community 27 - ".Create"
Cohesion: 0.07
Nodes (15): CancellationsByRoleDto, CancellationStatisticsDto, CancelledOrderDto, CancelledSummaryDto, IngredientUsageDto, IngredientUsageStatisticsDto, ItemStatisticsDto, SalesDayDto (+7 more)

### Community 28 - "OrderDto.cs"
Cohesion: 0.32
Nodes (6): OrderDto, OrderItemDto, OrderItemToppingDto, OrderMapper, OrderSummaryDto, PagedResult

### Community 32 - "auth/actions.ts"
Cohesion: 0.10
Nodes (34): getClientIp(), apiBaseUrl(), callApi(), callApiJson(), CallApiOptions, readApiError(), confirmLinkSchema, Credentials (+26 more)

### Community 42 - "OrderItem"
Cohesion: 0.12
Nodes (13): OrderItem, ItemNameSnapshot, LineTotal, Order, OrderId, OrderItemId, PizzaSize, PizzaSizeId (+5 more)

### Community 43 - "PizzaShop.Api.Dtos"
Cohesion: 0.12
Nodes (7): CurrentUserDto, RecipeDto, RecipeItemDto, RecipeMapper, ToppingDto, ToppingMapper, PizzaShop.Api.Dtos

### Community 44 - "react"
Cohesion: 0.12
Nodes (20): react, metadata, NewRecipe(), NewRecipePage(), blankItem(), FieldMessage(), RecipeForm(), RecipeFormProps (+12 more)

### Community 45 - ".PlaceAsync"
Cohesion: 0.30
Nodes (3): CancelOrderRequest, UpdateOrderStatusRequest, CancellationTests

### Community 46 - "InventoryTable.tsx"
Cohesion: 0.16
Nodes (18): AdjustStockDialog(), DeleteIngredientDialog(), IngredientAdminActions(), NewIngredientButton(), defaultsFor(), FieldMessage(), IngredientFormDialog(), InventoryTable() (+10 more)

### Community 48 - "inventory/actions.ts"
Cohesion: 0.18
Nodes (27): adjustStock(), createIngredient(), deleteIngredient(), ingredientIdSchema, updateIngredient(), createRecipe(), deleteRecipe(), recipeIdSchema (+19 more)

### Community 50 - "pizzashop_api_dtos"
Cohesion: 0.24
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
Cohesion: 0.09
Nodes (37): AnalyticsPage(), CancellationsSection(), Empty(), Filters(), ItemsSection(), metadata, readQuery(), SalesSection() (+29 more)

### Community 57 - "Recipe"
Cohesion: 0.15
Nodes (8): Recipe, BasePrice, IsActive, Name, RecipeId, RecipeItems, OrderItemToppingRequest, OrderCalculatorTests

### Community 58 - "api/menu.ts"
Cohesion: 0.18
Nodes (17): zod, POST(), problemJson(), Builder(), BuilderPage(), BuilderSkeleton(), metadata, getRecipe() (+9 more)

### Community 59 - "PizzaSize"
Cohesion: 0.17
Nodes (9): INamedEntity, Name, PizzaSize, Name, PizzaSizeId, PriceMultiplier, UnitOfMeasure, Name (+1 more)

### Community 68 - "RegisterForm.tsx"
Cohesion: 0.19
Nodes (20): @hookform/resolvers, react-hook-form, FIELDS, ForgotPasswordForm(), ForgotPasswordPage(), FIELDS, LoginForm(), LoginPage() (+12 more)

### Community 69 - "EmailOptions"
Cohesion: 0.18
Nodes (6): SmtpEmailDelivery, EmailOptions, FromAddress, FromName, Smtp, WebBaseUrl

### Community 71 - ".Update"
Cohesion: 0.07
Nodes (6): PizzaSizeDto, PizzaSizeMapper, UnitOfMeasureDto, UnitOfMeasureMapper, PizzaSizesEndpoints, UnitsOfMeasureEndpoints

### Community 72 - "TestApi"
Cohesion: 0.18
Nodes (4): TestApi, Emails, TestUser, RateLimitingTests

### Community 74 - "usePizzaBuilder.ts"
Cohesion: 0.14
Nodes (19): CartContext, CartLine, CartProvider(), CartState, sameConfiguration(), BuilderAction, BuilderState, clampQuantity() (+11 more)

### Community 77 - "Ingredient"
Cohesion: 0.13
Nodes (11): IngredientDto, IngredientMapper, Ingredient, CurrentStock, IngredientId, IsActive, Name, ToppingPortion (+3 more)

### Community 78 - "dependencies"
Cohesion: 0.13
Nodes (15): dependencies, class-variance-authority, cn, @hookform/resolvers, lucide-react, next, next-themes, radix-ui (+7 more)

### Community 82 - "proxy.ts"
Cohesion: 0.25
Nodes (13): LoginResponse, ACCESS_COOKIE, ACCESS_EXPIRES_COOKIE, cookieOptions, REFRESH_COOKIE, SESSION_COOKIES, sessionCookieValues(), setSessionCookies() (+5 more)

### Community 95 - "orders/[id]/page.tsx"
Cohesion: 0.24
Nodes (14): metadata, MyOrder(), MyOrderPage(), MyOrderSkeleton(), Detail(), metadata, OrderDetail(), OrderDetailSkeleton() (+6 more)

### Community 103 - "schemas/orders.ts"
Cohesion: 0.08
Nodes (34): OrderActions(), OrderActionsProps, reportFailure(), ActiveOrderCard(), ActiveOrdersBoard(), Column(), COLUMNS, AdvanceOrderButton() (+26 more)

### Community 105 - "OrderItemTopping"
Cohesion: 0.20
Nodes (9): OrderItemTopping, Coverage, ExtraAmount, Ingredient, IngredientId, OrderItem, OrderItemId, OrderItemToppingId (+1 more)

### Community 112 - "devDependencies"
Cohesion: 0.20
Nodes (10): devDependencies, eslint, eslint-config-next, shadcn, tailwindcss, @tailwindcss/turbopack, @types/node, @types/react (+2 more)

### Community 114 - "PizzaShop.Api.Db"
Cohesion: 0.15
Nodes (3): Policies, PizzaShop.Api.Auth, PizzaShop.Api.Db

### Community 115 - "scripts"
Cohesion: 0.40
Nodes (5): scripts, build, dev, lint, start

### Community 116 - "eslint.config.mjs"
Cohesion: 0.50
Nodes (3): eslint, eslint-config-next, eslintConfig

### Community 118 - "DevelopmentApiFactory"
Cohesion: 0.29
Nodes (3): DevelopmentApiFactory, Environment, OpenApiTests

### Community 119 - ".AddPizzaShopRateLimiting"
Cohesion: 0.19
Nodes (5): RateLimitingExtensions, RateLimitingOptions, AuthPerMinute, OrderCreatePerMinute, UserPerMinute

### Community 125 - "OrderType"
Cohesion: 0.22
Nodes (8): OrderType, Delivery, DineIn, Takeout, ToppingAmount, Extra, Light, Standard

### Community 126 - "users/page.tsx"
Cohesion: 0.16
Nodes (18): hrefFor(), metadata, ROLE_BADGE_CLASSES, SearchForm(), UsersPage(), UsersTable(), UsersTableSkeleton(), Pager() (+10 more)

### Community 127 - "next"
Cohesion: 0.10
Nodes (27): lucide-react, next, CartView(), ORDER_TYPE_CHOICES, CartPage(), metadata, MenuPage(), metadata (+19 more)

### Community 128 - "OrderStatus"
Cohesion: 0.33
Nodes (6): OrderStatus, Cancelled, Completed, Pending, Preparing, Ready

### Community 129 - ".FromPriced"
Cohesion: 0.23
Nodes (4): OrderQuoteDto, OrderQuoteItemDto, OrderQuoteMapper, OrderQuoteToppingDto

### Community 133 - "recipes/[id]/page.tsx"
Cohesion: 0.24
Nodes (12): Inventory(), InventoryPage(), InventorySkeleton(), metadata, DeleteRecipeDialog(), EditRecipe(), EditRecipePage(), EditRecipeSkeleton() (+4 more)

### Community 136 - "ForwardedHeadersExtensions.cs"
Cohesion: 0.20
Nodes (3): CorsExtensions, ForwardedHeadersExtensions, PizzaShop.Api.Extensions

### Community 137 - "currentUser.ts"
Cohesion: 0.24
Nodes (14): server-only, idempotencyKeySchema, placeOrder(), Home(), metadata, StaffDashboard(), ActiveOrdersBoardSkeleton(), ApiFetchOptions (+6 more)

### Community 145 - "problem.ts"
Cohesion: 0.27
Nodes (8): RFC-9457, ApiError, describeApiError(), lowerFirst(), Problem, problemSchema, toFieldErrors(), toFieldPath()

### Community 160 - "SmtpOptions"
Cohesion: 0.20
Nodes (10): SmtpOptions, Host, Password, Port, Security, UserName, SmtpSecurity, None (+2 more)

### Community 161 - ".RoleChange_AppliesAfterRefresh_NotBefore"
Cohesion: 0.33
Nodes (3): UpdateUserRolesRequest, LoginResponse, UsersTests

### Community 162 - "recipes/page.tsx"
Cohesion: 0.27
Nodes (6): RecipeGrid(), metadata, RecipesPage(), RecipesTable(), RecipesTableSkeleton(), listRecipes()

### Community 164 - "ElapsedTime.tsx"
Cohesion: 0.60
Nodes (5): ElapsedTime(), getMinute(), getServerMinute(), subscribe(), formatElapsed()

### Community 167 - "ToppingCoverage"
Cohesion: 0.50
Nodes (4): ToppingCoverage, LeftHalf, RightHalf, Whole

## Ambiguous Edges - Review These
- `pnpm workspace (packages: web)` → `Tech Stack (pnpm, Next.js 16, ASP.NET 10, PostgreSQL, Azure)`  [AMBIGUOUS]
  pnpm-workspace.yaml · relation: conceptually_related_to

## Knowledge Gaps
- **163 isolated node(s):** `OrderId`, `OrderNumber`, `Status`, `OrderType`, `SubTotal` (+158 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 720 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **108 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `PizzaShop.Api.Models` connect `PizzaShop.Api.Models` to `OrdersEndpoints.cs`, `PizzaShop.Api.Dtos`, `PizzaShop.Api.Requests`, `PizzaShop.Api.Db`, `pizzashop_api_dtos`, `PizzaSize`, `OrderDto.cs`, `OrderType`?**
  _High betweenness centrality (0.039) - this node is a cross-community bridge._
- **What connects `OrderId`, `OrderNumber`, `Status` to the rest of the system?**
  _163 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Pizza Shop POS README` be split into smaller, more focused modules?**
  _Cohesion score 0.1164021164021164 - nodes in this community are weakly interconnected._
- **Why does `Ingredient` connect `Ingredient` to `PizzaShop.Api.Models`, `OrderItemTopping`, `.Price`, `PizzaShopContext`, `OrderIngredientUsage`, `Recipe`, `PizzaSize`, `.Update`?**
  _High betweenness centrality (0.033) - this node is a cross-community bridge._
- **Should `web/package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.11764705882352941 - nodes in this community are weakly interconnected._
- **Why does `Recipe` connect `Recipe` to `PizzaShop.Api.Models`, `PizzaShop.Api.Dtos`, `.Price`, `PizzaShopContext`, `.Update`, `PizzaSize`?**
  _High betweenness centrality (0.027) - this node is a cross-community bridge._

### Low-confidence Hints
_AMBIGUOUS edges — the extractor was unsure. Verify before acting on these._

- **What is the exact relationship between `pnpm workspace (packages: web)` and `Tech Stack (pnpm, Next.js 16, ASP.NET 10, PostgreSQL, Azure)`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._