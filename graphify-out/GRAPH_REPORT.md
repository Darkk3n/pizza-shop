# Graph Report - pizza-shop  (2026-10-26)

## Corpus Check
- 229 files · ~62,016 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 7 file(s) not represented in the graph (top: (none) 3, .example 2, .ico 1)

## Summary
- 1942 nodes · 4741 edges · 159 communities (62 shown, 97 thin omitted)
- Extraction: 96% EXTRACTED · 4% INFERRED · 0% AMBIGUOUS · INFERRED: 176 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `999abdc7`
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
- next
- Next.js Wordmark Logo (black)
- ApiFactory
- system_componentmodel_dataannotations
- MigrationBuilder
- analytics/page.tsx
- RecipeItem
- PizzaShopContext
- Order
- PizzaShop.Api.Migrations
- .UpdateRoles
- .Update
- PizzaShop.Api.Options
- .Create
- OrderDto.cs
- .GetAll
- .Update
- auth/actions.ts
- .NewUserAsync
- .BuildModel
- .AddPizzaShopAuth
- .TransformAsync
- OrderItem
- PizzaShop.Api.Dtos
- RecipeForm.tsx
- .PlaceAsync
- PizzaBuilder.tsx
- .Price
- inventory/actions.ts
- PizzaShop.Api.Tests
- NavLinks.tsx
- OrderIngredientUsage
- .ResolveRange
- SecurityTests
- schemas/statistics.ts
- Recipe
- api/menu.ts
- PizzaSize
- react
- EmailOptions
- .Update
- .ReadProblemAsync
- OrdersEndpoints.cs
- schemas/orders.ts
- .NameTakenAsync
- EmailTests
- Ingredient
- dependencies
- AddIngredientToppingFields
- .AdminAsync
- AddOrderIdempotencyKey
- proxy.ts
- AccountEmails
- OrderActions.tsx
- OrderItemTopping
- devDependencies
- AuthExtensions.cs
- scripts
- eslint.config.mjs
- ApiFactory.cs
- .AddPizzaShopRateLimiting
- IEmailDelivery
- ToppingAmount
- schemas/users.ts
- menu/page.tsx
- OrderStatus
- .FromPriced
- OrderType
- IdentityEmailSender
- TestDatabase
- apiJson
- EmailMessage
- ForwardedHeadersExtensions.cs
- currentUser.ts
- InitialCreate
- AddIdentity
- RecipeItemRequest
- OrderCalculator.cs

## God Nodes (most connected - your core abstractions)
1. `next` - 49 edges
2. `react` - 49 edges
3. `PizzaShopContext` - 32 edges
4. `Order` - 30 edges
5. `TestApi` - 29 edges
6. `PizzaShop.Api.Models` - 29 edges
7. `Ingredient` - 28 edges
8. `apiJson()` - 28 edges
9. `formatMoney()` - 25 edges
10. `FormAlert()` - 25 edges

## Surprising Connections (you probably didn't know these)
- `RecordingEmailDelivery` --implements--> `IEmailDelivery`  [EXTRACTED]
  Tests/PizzaShop.Api.Tests/Infrastructure/RecordingEmailDelivery.cs → api/Email/EmailMessage.cs
- `OrderCalculatorTests` --references--> `PizzaSize`  [EXTRACTED]
  Tests/PizzaShop.Api.Tests/OrderCalculatorTests.cs → api/Models/PizzaSize.cs
- `Next.js Agent Rules (breaking-change docs warning)` --conceptually_related_to--> `Frontend Conventions (Server Components, Zod, feature hooks)`  [INFERRED]
  web/AGENTS.md → CLAUDE.md
- `FailingDelivery` --implements--> `IEmailDelivery`  [EXTRACTED]
  Tests/PizzaShop.Api.Tests/AccountEmailsTests.cs → api/Email/EmailMessage.cs
- `RecordingEmailDelivery` --references--> `EmailMessage`  [EXTRACTED]
  Tests/PizzaShop.Api.Tests/Infrastructure/RecordingEmailDelivery.cs → api/Email/EmailMessage.cs

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Order creation inventory deduction flow** — claude_inventory_deduction, claude_orderitems, claude_orderitemtoppings, claude_recipeitems, claude_ingredients [EXTRACTED 1.00]
- **Local dev database setup** — readme_pnpm_scripts, readme_env_example, readme_podman_compose, docker_compose_postgres, docker_compose_postgres_data [INFERRED 0.85]
- **Price snapshot pattern for historical stability** — claude_price_stability, claude_orderitems, claude_orderitemtoppings, claude_orders [INFERRED 0.85]
- **create-next-app Default Boilerplate Assets (currently unused)** — web_public_file_file_icon, web_public_globe_globe_icon, web_public_next_next_js_wordmark, web_public_vercel_vercel_logo, web_public_window_window_icon [INFERRED 0.85]

## Communities (159 total, 97 thin omitted)

### Community 0 - "Pizza Shop POS README"
Cohesion: 0.12
Nodes (19): Ingredients table, OrderItems table, OrderItemToppings table, Orders table, Pizza Customizer (size, crust, fractional toppings), Pizza Shop POS, PizzaSizes table, RecipeItems table (+11 more)

### Community 1 - "web/package.json"
Cohesion: 0.12
Nodes (15): class-variance-authority, next-themes, radix-ui, react-dom, shadcn, tailwindcss, @tailwindcss/turbopack, tw-animate-css (+7 more)

### Community 2 - "IngredientFormDialog.tsx"
Cohesion: 0.06
Nodes (39): PRESET_LABELS, AdjustStockDialog(), MODE_CHOICES, MODE_COPY, NewIngredientButton(), defaultsFor(), FieldMessage(), FIELDS (+31 more)

### Community 3 - "compilerOptions"
Cohesion: 0.11
Nodes (18): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+10 more)

### Community 4 - "IngredientAdminActions.tsx"
Cohesion: 0.13
Nodes (5): sonner, DeleteIngredientDialog(), DeleteIngredientDialogProps, IngredientAdminActions(), UserMenuProps

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

### Community 11 - "next"
Cohesion: 0.07
Nodes (48): next, metadata, MyOrder(), MyOrderPage(), MyOrderSkeleton(), hrefForPage(), metadata, MyOrdersPage() (+40 more)

### Community 13 - "ApiFactory"
Cohesion: 0.16
Nodes (7): HealthTests, ApiFactory, Emails, Environment, Settings, RateLimitedApiFactory, Settings

### Community 14 - "system_componentmodel_dataannotations"
Cohesion: 0.10
Nodes (9): AdjustIngredientStockRequest, CreateIngredientRequest, CreatePizzaSizeRequest, CreateUnitOfMeasureRequest, UpdateIngredientRequest, UpdatePizzaSizeRequest, UpdateUnitOfMeasureRequest, PizzaShop.Api.Models (+1 more)

### Community 15 - "MigrationBuilder"
Cohesion: 0.18
Nodes (4): AddRecipeItemUniqueIndex, AddMenuActiveAndOrderCancellation, AddOrdersCreatedAtIndex, ConfirmExistingUserEmails

### Community 16 - "analytics/page.tsx"
Cohesion: 0.12
Nodes (37): AnalyticsPage(), CancellationsSection(), Empty(), Filters(), ItemsSection(), metadata, readQuery(), SalesSection() (+29 more)

### Community 19 - "RecipeItem"
Cohesion: 0.14
Nodes (8): DevelopmentSeeder, RecipeItem, Amount, Ingredient, IngredientId, Recipe, RecipeId, RecipeItemId

### Community 20 - "PizzaShopContext"
Cohesion: 0.09
Nodes (11): PizzaShopContext, DataProtectionKeys, Ingredients, OrderIngredientUsages, OrderItems, OrderItemToppings, Orders, PizzaSizes (+3 more)

### Community 21 - "Order"
Cohesion: 0.07
Nodes (20): Order, CancellationReason, CancelledAt, CancelledBy, CancelledByUserId, CreatedAt, IdempotencyKey, IngredientUsages (+12 more)

### Community 26 - "PizzaShop.Api.Options"
Cohesion: 0.09
Nodes (7): RateLimitPolicies, OrderOptions, TaxRate, StatisticsOptions, TimeZone, PizzaShop.Api.Email, PizzaShop.Api.Options

### Community 27 - ".Create"
Cohesion: 0.07
Nodes (15): CancellationsByRoleDto, CancellationStatisticsDto, CancelledOrderDto, CancelledSummaryDto, IngredientUsageDto, IngredientUsageStatisticsDto, ItemStatisticsDto, SalesDayDto (+7 more)

### Community 28 - "OrderDto.cs"
Cohesion: 0.32
Nodes (6): OrderDto, OrderItemDto, OrderItemToppingDto, OrderMapper, OrderSummaryDto, PagedResult

### Community 31 - ".Update"
Cohesion: 0.15
Nodes (3): IngredientDto, IngredientMapper, IngredientsEndpoints

### Community 32 - "auth/actions.ts"
Cohesion: 0.09
Nodes (39): server-only, ForgotPasswordForm(), ForgotPasswordPage(), ApiFetchOptions, getClientIp(), withSession(), apiBaseUrl(), callApi() (+31 more)

### Community 42 - "OrderItem"
Cohesion: 0.12
Nodes (13): OrderItem, ItemNameSnapshot, LineTotal, Order, OrderId, OrderItemId, PizzaSize, PizzaSizeId (+5 more)

### Community 43 - "PizzaShop.Api.Dtos"
Cohesion: 0.12
Nodes (7): CurrentUserDto, RecipeDto, RecipeItemDto, RecipeMapper, ToppingDto, ToppingMapper, PizzaShop.Api.Dtos

### Community 44 - "RecipeForm.tsx"
Cohesion: 0.16
Nodes (16): cn, lucide-react, blankItem(), FieldMessage(), RecipeForm(), RecipeFormProps, STATUS_CHOICES, ROLE_LABELS (+8 more)

### Community 45 - ".PlaceAsync"
Cohesion: 0.26
Nodes (5): CancelOrderRequest, UpdateOrderStatusRequest, UpdateRecipeRequest, CancellationTests, TestUser

### Community 46 - "PizzaBuilder.tsx"
Cohesion: 0.17
Nodes (17): CartView(), ORDER_TYPE_CHOICES, CartPage(), metadata, AMOUNT_CHOICES, COVERAGE_CHOICES, PizzaBuilder(), PizzaBuilderProps (+9 more)

### Community 48 - "inventory/actions.ts"
Cohesion: 0.15
Nodes (31): placeOrder(), adjustStock(), createIngredient(), deleteIngredient(), ingredientIdSchema, updateIngredient(), createRecipe(), deleteRecipe() (+23 more)

### Community 51 - "NavLinks.tsx"
Cohesion: 0.06
Nodes (52): AppLayout(), AuthLayout(), geistMono, geistSans, metadata, AppShell(), AppShellProps, Brand() (+44 more)

### Community 52 - "OrderIngredientUsage"
Cohesion: 0.25
Nodes (7): OrderIngredientUsage, Amount, Ingredient, IngredientId, Order, OrderId, OrderIngredientUsageId

### Community 53 - ".ResolveRange"
Cohesion: 0.13
Nodes (7): OrderSnapshot, RangeResult, StatisticsCalculator, StatisticsRange, Days, PizzaShop.Api.Statistics, StatisticsCalculatorTests

### Community 55 - "schemas/statistics.ts"
Cohesion: 0.13
Nodes (20): cancellationStatisticsSchema, cancelledSummarySchema, customRangeError(), dayNumber(), ingredientUsageStatisticsSchema, isoDate, itemStatisticsSchema, MAX_RANGE_DAYS (+12 more)

### Community 57 - "Recipe"
Cohesion: 0.15
Nodes (8): Recipe, BasePrice, IsActive, Name, RecipeId, RecipeItems, OrderItemToppingRequest, OrderCalculatorTests

### Community 58 - "api/menu.ts"
Cohesion: 0.12
Nodes (24): RFC-9457, zod, POST(), problemJson(), Builder(), BuilderPage(), BuilderSkeleton(), metadata (+16 more)

### Community 59 - "PizzaSize"
Cohesion: 0.17
Nodes (9): INamedEntity, Name, PizzaSize, Name, PizzaSizeId, PriceMultiplier, UnitOfMeasure, Name (+1 more)

### Community 68 - "react"
Cohesion: 0.18
Nodes (13): @hookform/resolvers, react, react-hook-form, FIELDS, FIELDS, CheckInbox(), FIELDS, RegisterForm() (+5 more)

### Community 69 - "EmailOptions"
Cohesion: 0.10
Nodes (16): SmtpEmailDelivery, EmailOptions, FromAddress, FromName, Smtp, WebBaseUrl, SmtpOptions, Host (+8 more)

### Community 71 - ".Update"
Cohesion: 0.07
Nodes (6): PizzaSizeDto, PizzaSizeMapper, UnitOfMeasureDto, UnitOfMeasureMapper, PizzaSizesEndpoints, UnitsOfMeasureEndpoints

### Community 72 - ".ReadProblemAsync"
Cohesion: 0.12
Nodes (6): UpdateUserRolesRequest, LoginResponse, TestApi, Emails, RateLimitingTests, UsersTests

### Community 74 - "schemas/orders.ts"
Cohesion: 0.09
Nodes (31): idempotencyKeySchema, BuilderAction, BuilderState, clampQuantity(), reducer(), ToppingChoice, usePizzaBuilder(), UsePizzaBuilderOptions (+23 more)

### Community 77 - "Ingredient"
Cohesion: 0.18
Nodes (9): Ingredient, CurrentStock, IngredientId, IsActive, Name, ToppingPortion, ToppingPrice, UnitOfMeasure (+1 more)

### Community 78 - "dependencies"
Cohesion: 0.13
Nodes (15): dependencies, class-variance-authority, cn, @hookform/resolvers, lucide-react, next, next-themes, radix-ui (+7 more)

### Community 82 - "proxy.ts"
Cohesion: 0.25
Nodes (13): LoginResponse, ACCESS_COOKIE, ACCESS_EXPIRES_COOKIE, cookieOptions, REFRESH_COOKIE, SESSION_COOKIES, sessionCookieValues(), setSessionCookies() (+5 more)

### Community 103 - "OrderActions.tsx"
Cohesion: 0.39
Nodes (7): OrderActions(), OrderActionsProps, reportFailure(), CancelOrderDialog(), isCancellable(), nextStatuses(), ActionFailure

### Community 105 - "OrderItemTopping"
Cohesion: 0.20
Nodes (9): OrderItemTopping, Coverage, ExtraAmount, Ingredient, IngredientId, OrderItem, OrderItemId, OrderItemToppingId (+1 more)

### Community 112 - "devDependencies"
Cohesion: 0.20
Nodes (10): devDependencies, eslint, eslint-config-next, shadcn, tailwindcss, @tailwindcss/turbopack, @types/node, @types/react (+2 more)

### Community 114 - "AuthExtensions.cs"
Cohesion: 0.13
Nodes (3): Policies, AppUser, PizzaShop.Api.Auth

### Community 115 - "scripts"
Cohesion: 0.40
Nodes (5): scripts, build, dev, lint, start

### Community 116 - "eslint.config.mjs"
Cohesion: 0.50
Nodes (3): eslint, eslint-config-next, eslintConfig

### Community 118 - "ApiFactory.cs"
Cohesion: 0.14
Nodes (4): ApiCollection, DevelopmentApiFactory, Environment, OpenApiTests

### Community 119 - ".AddPizzaShopRateLimiting"
Cohesion: 0.17
Nodes (5): RateLimitingExtensions, RateLimitingOptions, AuthPerMinute, OrderCreatePerMinute, UserPerMinute

### Community 125 - "ToppingAmount"
Cohesion: 0.22
Nodes (8): ToppingAmount, Extra, Light, Standard, ToppingCoverage, LeftHalf, RightHalf, Whole

### Community 126 - "schemas/users.ts"
Cohesion: 0.20
Nodes (9): pagedSchema(), User, userListQuerySchema, userPageSchema, UserRole, userRoleSchema, userSchema, listUsers() (+1 more)

### Community 127 - "menu/page.tsx"
Cohesion: 0.13
Nodes (18): MenuPage(), metadata, RecipeGrid(), RecipeGridSkeleton(), Confirmation(), ConfirmEmailPage(), metadata, metadata (+10 more)

### Community 128 - "OrderStatus"
Cohesion: 0.33
Nodes (6): OrderStatus, Cancelled, Completed, Pending, Preparing, Ready

### Community 129 - ".FromPriced"
Cohesion: 0.23
Nodes (4): OrderQuoteDto, OrderQuoteItemDto, OrderQuoteMapper, OrderQuoteToppingDto

### Community 130 - "OrderType"
Cohesion: 0.22
Nodes (6): OrderType, Delivery, DineIn, Takeout, CreateOrderRequest, OrderItemRequest

### Community 133 - "apiJson"
Cohesion: 0.19
Nodes (16): Inventory(), InventoryPage(), InventorySkeleton(), metadata, DeleteRecipeDialog(), EditRecipe(), EditRecipePage(), EditRecipeSkeleton() (+8 more)

### Community 134 - "EmailMessage"
Cohesion: 0.16
Nodes (3): Roles, EmailMessage, RecordingEmailDelivery

### Community 136 - "ForwardedHeadersExtensions.cs"
Cohesion: 0.20
Nodes (3): CorsExtensions, ForwardedHeadersExtensions, PizzaShop.Api.Extensions

### Community 137 - "currentUser.ts"
Cohesion: 0.57
Nodes (5): CustomerRedirect(), Home(), getCurrentUser, homePathFor(), getAccessToken()

## Ambiguous Edges - Review These
- `pnpm workspace (packages: web)` → `Tech Stack (pnpm, Next.js 16, ASP.NET 10, PostgreSQL, Azure)`  [AMBIGUOUS]
  pnpm-workspace.yaml · relation: conceptually_related_to

## Knowledge Gaps
- **163 isolated node(s):** `Environment`, `Emails`, `Settings`, `Settings`, `Environment` (+158 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 705 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **97 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `TestApi` connect `.ReadProblemAsync` to `EmailMessage`, `.NewUserAsync`, `OrdersEndpoints.cs`, `EmailTests`, `ApiFactory`, `.PlaceAsync`, `.AdminAsync`, `SecurityTests`?**
  _High betweenness centrality (0.030) - this node is a cross-community bridge._
- **What connects `Environment`, `Emails`, `Settings` to the rest of the system?**
  _163 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Pizza Shop POS README` be split into smaller, more focused modules?**
  _Cohesion score 0.1164021164021164 - nodes in this community are weakly interconnected._
- **Why does `PizzaShop.Api.Models` connect `system_componentmodel_dataannotations` to `OrdersEndpoints.cs`, `PizzaShop.Api.Dtos`, `OrderCalculator.cs`, `AuthExtensions.cs`, `PizzaShop.Api.Tests`, `PizzaSize`, `OrderDto.cs`, `ToppingAmount`?**
  _High betweenness centrality (0.026) - this node is a cross-community bridge._
- **Should `web/package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.125 - nodes in this community are weakly interconnected._
- **Why does `RecordingEmailDelivery` connect `EmailMessage` to `.ReadProblemAsync`, `EmailTests`, `ApiFactory`, `IEmailDelivery`, `PizzaShop.Api.Options`?**
  _High betweenness centrality (0.023) - this node is a cross-community bridge._

### Low-confidence Hints
_AMBIGUOUS edges — the extractor was unsure. Verify before acting on these._

- **What is the exact relationship between `pnpm workspace (packages: web)` and `Tech Stack (pnpm, Next.js 16, ASP.NET 10, PostgreSQL, Azure)`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._