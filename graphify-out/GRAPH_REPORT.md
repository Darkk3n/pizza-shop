# Graph Report - pizza-shop  (2026-10-27)

## Corpus Check
- 258 files · ~75,791 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 7 file(s) not represented in the graph (top: (none) 3, .example 2, .ico 1)

## Summary
- 2101 nodes · 5317 edges · 168 communities (64 shown, 104 thin omitted)
- Extraction: 96% EXTRACTED · 4% INFERRED · 0% AMBIGUOUS · INFERRED: 210 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `1ce2c013`
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
- RecipeDto.cs
- PizzaShopContext
- Order
- PizzaShop.Api.Migrations
- .UpdateRoles
- .Update
- PizzaShop.Api.Options
- .Create
- auth/actions.ts
- .GetAll
- .Update
- inventory/actions.ts
- schemas/statistics.ts
- .BuildModel
- .AddPizzaShopAuth
- .TransformAsync
- OrderItem
- proxy.ts
- TestApi
- .PlaceAsync
- .Price
- NavLinks.tsx
- TestApi.cs
- OrderFeed.tsx
- OrderIngredientUsage
- StatisticsCalculatorTests
- (app)/layout.tsx
- .SeedDevelopmentDataAsync
- Recipe
- AppShell.tsx
- .ReadProblemAsync
- .RoleChange_AppliesAfterRefresh_NotBefore
- OrdersEndpoints.cs
- app/layout.tsx
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
- ForwardedHeadersExtensions.cs
- CustomerHome.tsx
- useSidebar.ts
- orders/page.tsx
- navigation.ts
- CartView
- OrderStatus
- devDependencies
- scripts
- eslint.config.mjs
- .AddPizzaShopRateLimiting
- UserRoleControl.tsx
- next
- IdentityEmailSender
- client.ts
- currentUser.ts
- EmailMessage
- .AdminAsync
- analytics/page.tsx

## God Nodes (most connected - your core abstractions)
1. `next` - 57 edges
2. `react` - 55 edges
3. `PizzaShopContext` - 32 edges
4. `apiJson()` - 32 edges
5. `TestApi` - 31 edges
6. `formatMoney()` - 31 edges
7. `PizzaShop.Api.Models` - 30 edges
8. `Order` - 30 edges
9. `Ingredient` - 28 edges
10. `requireAdmin()` - 25 edges

## Surprising Connections (you probably didn't know these)
- `OrderCalculatorTests` --references--> `PizzaSize`  [EXTRACTED]
  Tests/PizzaShop.Api.Tests/OrderCalculatorTests.cs → api/Models/PizzaSize.cs
- `FailingDelivery` --implements--> `IEmailDelivery`  [EXTRACTED]
  Tests/PizzaShop.Api.Tests/AccountEmailsTests.cs → api/Email/EmailMessage.cs
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

## Communities (168 total, 104 thin omitted)

### Community 0 - "Pizza Shop POS README"
Cohesion: 0.12
Nodes (19): Ingredients table, OrderItems table, OrderItemToppings table, Orders table, Pizza Customizer (size, crust, fractional toppings), Pizza Shop POS, PizzaSizes table, RecipeItems table (+11 more)

### Community 1 - "web/package.json"
Cohesion: 0.12
Nodes (16): class-variance-authority, cn, next-themes, radix-ui, react-dom, shadcn, tailwindcss, @tailwindcss/turbopack (+8 more)

### Community 2 - "IngredientFormDialog.tsx"
Cohesion: 0.08
Nodes (32): @hookform/resolvers, react-hook-form, PRESET_LABELS, AdjustStockDialog(), MODE_CHOICES, MODE_COPY, defaultsFor(), FieldMessage() (+24 more)

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

### Community 11 - "schemas/orders.ts"
Cohesion: 0.08
Nodes (32): GET(), problemJson(), GET(), problemJson(), AdvanceOrderButton(), AdvanceOrderButtonProps, LABELS, findOrder() (+24 more)

### Community 13 - "ApiFactory"
Cohesion: 0.06
Nodes (13): HealthTests, ApiCollection, ApiFactory, Emails, Environment, Settings, DevelopmentApiFactory, Environment (+5 more)

### Community 14 - "microsoft_entityframeworkcore"
Cohesion: 0.09
Nodes (6): CreatePizzaSizeRequest, QuoteOrderRequest, UpdateIngredientRequest, UpdateUnitOfMeasureRequest, PizzaShop.Api.Models, PizzaShop.Api.Requests

### Community 15 - "MigrationBuilder"
Cohesion: 0.04
Nodes (9): InitialCreate, AddRecipeItemUniqueIndex, AddIdentity, AddMenuActiveAndOrderCancellation, AddOrdersCreatedAtIndex, ConfirmExistingUserEmails, AddOrdersStatusIndex, AddOrdersCancelledAtIndex (+1 more)

### Community 16 - "users/page.tsx"
Cohesion: 0.11
Nodes (21): NewIngredientButton(), InventoryTable(), InventoryTableProps, isOut(), View, VIEWS, metadata, RecipesPage() (+13 more)

### Community 19 - "RecipeDto.cs"
Cohesion: 0.14
Nodes (5): RecipeDto, RecipeItemDto, RecipeMapper, ToppingDto, ToppingMapper

### Community 20 - "PizzaShopContext"
Cohesion: 0.09
Nodes (11): PizzaShopContext, DataProtectionKeys, Ingredients, OrderIngredientUsages, OrderItems, OrderItemToppings, Orders, PizzaSizes (+3 more)

### Community 21 - "Order"
Cohesion: 0.07
Nodes (20): Order, CancellationReason, CancelledAt, CancelledBy, CancelledByUserId, CreatedAt, IdempotencyKey, IngredientUsages (+12 more)

### Community 23 - ".UpdateRoles"
Cohesion: 0.10
Nodes (3): UserDto, UsersEndpoints, AppUser

### Community 24 - ".Update"
Cohesion: 0.06
Nodes (15): PizzaSizesEndpoints, RecipesEndpoints, PizzaSize, IsActive, Name, PizzaSizeId, PriceMultiplier, RecipeItem (+7 more)

### Community 26 - "PizzaShop.Api.Options"
Cohesion: 0.09
Nodes (7): RateLimitPolicies, OrderOptions, TaxRate, StatisticsOptions, TimeZone, PizzaShop.Api.Email, PizzaShop.Api.Options

### Community 28 - "auth/actions.ts"
Cohesion: 0.10
Nodes (37): ForgotPasswordForm(), FIELDS, LoginForm(), CheckInbox(), FIELDS, FIELDS, ResetPasswordForm(), ResendConfirmation() (+29 more)

### Community 31 - ".Update"
Cohesion: 0.15
Nodes (3): IngredientDto, IngredientMapper, IngredientsEndpoints

### Community 32 - "inventory/actions.ts"
Cohesion: 0.15
Nodes (31): zod, idempotencyKeySchema, placeOrder(), adjustStock(), createIngredient(), deleteIngredient(), ingredientIdSchema, updateIngredient() (+23 more)

### Community 38 - "schemas/statistics.ts"
Cohesion: 0.16
Nodes (16): cancellationStatisticsSchema, cancelledSummarySchema, customRangeError(), dayNumber(), ingredientUsageStatisticsSchema, isoDate, itemStatisticsSchema, MAX_RANGE_DAYS (+8 more)

### Community 42 - "OrderItem"
Cohesion: 0.12
Nodes (13): OrderItem, ItemNameSnapshot, LineTotal, Order, OrderId, OrderItemId, PizzaSize, PizzaSizeId (+5 more)

### Community 44 - "proxy.ts"
Cohesion: 0.23
Nodes (14): LoginResponse, ACCESS_COOKIE, ACCESS_EXPIRES_COOKIE, cookieOptions, REFRESH_COOKIE, SESSION_COOKIES, sessionCookieValues(), setSessionCookies() (+6 more)

### Community 45 - "TestApi"
Cohesion: 0.11
Nodes (10): PizzaSizeDto, AdjustIngredientStockRequest, CreateIngredientRequest, CreateRecipeRequest, CreateUnitOfMeasureRequest, RecipeItemRequest, UpdateRecipeRequest, CatalogTests (+2 more)

### Community 46 - ".PlaceAsync"
Cohesion: 0.32
Nodes (4): CancelOrderRequest, UpdateOrderStatusRequest, CancellationTests, TestUser

### Community 48 - "NavLinks.tsx"
Cohesion: 0.26
Nodes (13): AnalyticsIcon(), DashboardIcon(), Icon(), IconProps, InventoryIcon(), MenuIcon(), OrdersIcon(), RecipesIcon() (+5 more)

### Community 50 - "TestApi.cs"
Cohesion: 0.15
Nodes (3): PizzaShop.Api.Tests, PizzaShop.Api.Orders, PizzaShop.Api.Tests.Infrastructure

### Community 51 - "OrderFeed.tsx"
Cohesion: 0.27
Nodes (15): OrderFeed(), enableAndPreview(), getContext(), isSoundEnabled(), isSoundEnabledOnServer(), listeners, NOTES, OrderSound (+7 more)

### Community 52 - "OrderIngredientUsage"
Cohesion: 0.25
Nodes (7): OrderIngredientUsage, Amount, Ingredient, IngredientId, Order, OrderId, OrderIngredientUsageId

### Community 53 - "StatisticsCalculatorTests"
Cohesion: 0.07
Nodes (23): CancellationsByRoleDto, CancellationStatisticsDto, CancelledOrderDto, CancelledSummaryDto, IngredientUsageDto, IngredientUsageStatisticsDto, ItemStatisticsDto, RestockProjectionDto (+15 more)

### Community 54 - "(app)/layout.tsx"
Cohesion: 0.30
Nodes (12): AppLayout(), NavLinksSkeleton(), RoleNav(), SessionUserMenu(), StaffOrderFeed(), UserMenu(), CartButton(), CartContext (+4 more)

### Community 57 - "Recipe"
Cohesion: 0.15
Nodes (8): Recipe, BasePrice, IsActive, Name, RecipeId, RecipeItems, OrderItemToppingRequest, OrderCalculatorTests

### Community 58 - "AppShell.tsx"
Cohesion: 0.29
Nodes (8): AuthLayout(), AppShell(), AppShellProps, Brand(), BrandLogo(), CloseIcon(), ShellContext, ShellState

### Community 62 - ".RoleChange_AppliesAfterRefresh_NotBefore"
Cohesion: 0.29
Nodes (3): UpdateUserRolesRequest, LoginResponse, UsersTests

### Community 64 - "OrdersEndpoints.cs"
Cohesion: 0.12
Nodes (6): Policies, CurrentUserDto, PizzaShop.Api.Auth, PizzaShop.Api.Db, PizzaShop.Api.Dtos, PizzaShop.Api.Endpoints

### Community 68 - "app/layout.tsx"
Cohesion: 0.20
Nodes (5): geistMono, geistSans, metadata, SIDEBAR_STORAGE_KEY, sidebarInitScript

### Community 69 - "EmailOptions"
Cohesion: 0.10
Nodes (16): SmtpEmailDelivery, EmailOptions, FromAddress, FromName, Smtp, WebBaseUrl, SmtpOptions, Host (+8 more)

### Community 71 - ".Update"
Cohesion: 0.07
Nodes (17): CancelledOrderFeedItemDto, OrderDto, OrderFeedDto, OrderFeedItemDto, OrderItemDto, OrderItemToppingDto, OrderMapper, OrderSummaryDto (+9 more)

### Community 73 - "schemas/ingredients.ts"
Cohesion: 0.11
Nodes (21): checkTopping(), hasTwoDecimals, IngredientForm, ingredientFormSchema, ingredientFormShape, ingredientSchema, newIngredientFormSchema, optionalNumber (+13 more)

### Community 74 - "PizzaBuilder.tsx"
Cohesion: 0.07
Nodes (44): POST(), problemJson(), Builder(), BuilderPage(), BuilderSkeleton(), metadata, AMOUNT_CHOICES, COVERAGE_CHOICES (+36 more)

### Community 77 - "Ingredient"
Cohesion: 0.12
Nodes (14): INamedEntity, Name, Ingredient, CurrentStock, IngredientId, IsActive, Name, ToppingPortion (+6 more)

### Community 78 - "dependencies"
Cohesion: 0.13
Nodes (15): dependencies, class-variance-authority, cn, @hookform/resolvers, lucide-react, next, next-themes, radix-ui (+7 more)

### Community 80 - "OrderItemTopping"
Cohesion: 0.14
Nodes (13): ToppingAmount, Extra, Light, Standard, OrderItemTopping, Coverage, ExtraAmount, Ingredient (+5 more)

### Community 90 - "ForwardedHeadersExtensions.cs"
Cohesion: 0.20
Nodes (3): CorsExtensions, ForwardedHeadersExtensions, PizzaShop.Api.Extensions

### Community 91 - "CustomerHome.tsx"
Cohesion: 0.17
Nodes (20): MenuPage(), metadata, RecipeGrid(), RecipeGridSkeleton(), Home(), HomeForRole(), metadata, StaffDashboard() (+12 more)

### Community 92 - "useSidebar.ts"
Cohesion: 0.36
Nodes (9): getCollapsed(), getIsDesktop(), getServerFalse(), listeners, setCollapsed(), subscribeCollapsed(), subscribeDesktop(), useIsDesktop() (+1 more)

### Community 95 - "orders/page.tsx"
Cohesion: 0.12
Nodes (31): metadata, MyOrder(), MyOrderPage(), MyOrderSkeleton(), hrefForPage(), metadata, MyOrdersPage(), MyOrdersSkeleton() (+23 more)

### Community 96 - "navigation.ts"
Cohesion: 0.33
Nodes (5): CurrentUser, ADMIN, CUSTOMER, NavKey, STAFF

### Community 103 - "CartView"
Cohesion: 0.22
Nodes (11): CartView(), CartPage(), metadata, ActiveOrderCard(), ElapsedTime(), getMinute(), getServerMinute(), subscribe() (+3 more)

### Community 105 - "OrderStatus"
Cohesion: 0.10
Nodes (16): OrderStatus, Cancelled, Completed, Pending, Preparing, Ready, OrderType, Delivery (+8 more)

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

### Community 126 - "UserRoleControl.tsx"
Cohesion: 0.24
Nodes (8): ROLE_LABELS, UserRoleControlProps, pagedSchema(), User, userListQuerySchema, UserRole, userRoleSchema, userSchema

### Community 127 - "next"
Cohesion: 0.10
Nodes (25): lucide-react, next, react, ORDER_TYPE_CHOICES, Confirmation(), ConfirmEmailPage(), metadata, ForgotPasswordPage() (+17 more)

### Community 132 - "client.ts"
Cohesion: 0.11
Nodes (25): RFC-9457, server-only, quoteKey(), useQuote(), ApiFetchOptions, withSession(), apiBaseUrl(), callApi() (+17 more)

### Community 133 - "currentUser.ts"
Cohesion: 0.17
Nodes (20): Inventory(), InventoryPage(), InventorySkeleton(), metadata, DeleteRecipeDialog(), EditRecipe(), EditRecipePage(), EditRecipeSkeleton() (+12 more)

### Community 134 - "EmailMessage"
Cohesion: 0.13
Nodes (4): Roles, EmailMessage, IEmailDelivery, RecordingEmailDelivery

### Community 137 - "analytics/page.tsx"
Cohesion: 0.11
Nodes (41): AnalyticsPage(), CancellationsSection(), Empty(), Filters(), ItemsSection(), metadata, readQuery(), RestockSection() (+33 more)

## Ambiguous Edges - Review These
- `pnpm workspace (packages: web)` → `Tech Stack (pnpm, Next.js 16, ASP.NET 10, PostgreSQL, Azure)`  [AMBIGUOUS]
  pnpm-workspace.yaml · relation: conceptually_related_to

## Knowledge Gaps
- **164 isolated node(s):** `PizzaSizeId`, `Name`, `PriceMultiplier`, `IsActive`, `class-variance-authority` (+159 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 746 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **104 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react` connect `next` to `web/package.json`, `IngredientFormDialog.tsx`, `IngredientAdminActions.tsx`, `currentUser.ts`, `client.ts`, `analytics/page.tsx`, `schemas/orders.ts`, `users/page.tsx`, `auth/actions.ts`, `inventory/actions.ts`, `NavLinks.tsx`, `OrderFeed.tsx`, `(app)/layout.tsx`, `AppShell.tsx`, `PizzaBuilder.tsx`, `CustomerHome.tsx`, `useSidebar.ts`, `orders/page.tsx`, `CartView`, `UserRoleControl.tsx`?**
  _High betweenness centrality (0.041) - this node is a cross-community bridge._
- **What connects `PizzaSizeId`, `Name`, `PriceMultiplier` to the rest of the system?**
  _164 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Pizza Shop POS README` be split into smaller, more focused modules?**
  _Cohesion score 0.1164021164021164 - nodes in this community are weakly interconnected._
- **Why does `next` connect `next` to `web/package.json`, `IngredientFormDialog.tsx`, `IngredientAdminActions.tsx`, `currentUser.ts`, `client.ts`, `analytics/page.tsx`, `schemas/orders.ts`, `users/page.tsx`, `auth/actions.ts`, `inventory/actions.ts`, `proxy.ts`, `NavLinks.tsx`, `OrderFeed.tsx`, `AppShell.tsx`, `app/layout.tsx`, `PizzaBuilder.tsx`, `CustomerHome.tsx`, `orders/page.tsx`, `CartView`?**
  _High betweenness centrality (0.036) - this node is a cross-community bridge._
- **Should `web/package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.11764705882352941 - nodes in this community are weakly interconnected._
- **Why does `PizzaShop.Api.Models` connect `microsoft_entityframeworkcore` to `OrdersEndpoints.cs`, `.Update`, `OrderStatus`, `Ingredient`, `TestApi.cs`, `RecipeDto.cs`?**
  _High betweenness centrality (0.020) - this node is a cross-community bridge._

### Low-confidence Hints
_AMBIGUOUS edges — the extractor was unsure. Verify before acting on these._

- **What is the exact relationship between `pnpm workspace (packages: web)` and `Tech Stack (pnpm, Next.js 16, ASP.NET 10, PostgreSQL, Azure)`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._