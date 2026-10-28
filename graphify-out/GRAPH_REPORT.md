# Graph Report - pizza-shop  (2026-10-27)

## Corpus Check
- 279 files · ~112,982 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 7 file(s) not represented in the graph (top: (none) 3, .example 2, .ico 1)

## Summary
- 2249 nodes · 5861 edges · 192 communities (70 shown, 122 thin omitted)
- Extraction: 96% EXTRACTED · 4% INFERRED · 0% AMBIGUOUS · INFERRED: 220 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `3f09af53`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- Pizza Shop POS README
- web/package.json
- PizzaSizeFormDialog.tsx
- compilerOptions
- PizzaSizesTable.tsx
- package.json
- http
- postgres service (postgres:18-alpine, pizzashop-db)
- PizzaShop.Api.csproj
- Globe Icon (world/web, 16x16 gray)
- schemas/orders.ts
- Next.js Wordmark Logo (black)
- ApiFactory
- QuoteOrderRequest
- MigrationBuilder
- users/page.tsx
- RecipeDto.cs
- PizzaShopContext
- Order
- PizzaShop.Api.Migrations
- .UpdateRoles
- .Update
- orders/page.tsx
- .Create
- welcome/page.tsx
- .GetAll
- PizzaSize
- requireAdmin
- react
- .BuildModel
- .AddPizzaShopAuth
- .TransformAsync
- OrderItem
- proxy.ts
- .CreateRecipeAsync
- .PlaceAsync
- next
- AuthExtensions.cs
- TestApi.cs
- NavLinks.tsx
- OrderIngredientUsage
- StatisticsCalculatorTests
- Fact
- PizzaBuilder.tsx
- Recipe
- OrderItemTopping
- .ReadProblemAsync
- TestApi
- .GetCancellations
- microsoft_entityframeworkcore
- .Update
- EmailOptions
- .Update
- .NewUserAsync
- schemas/ingredients.ts
- .ResolveRange
- .NameTakenAsync
- StatisticsDtos.cs
- Ingredient
- dependencies
- AddIngredientToppingFields
- .GetMenu
- AddOrderIdempotencyKey
- AccountEmails
- IngredientFormDialog.tsx
- CustomerHome.tsx
- currentUser.ts
- IngredientAdminActions.tsx
- InventoryTable.tsx
- orders/actions.ts
- .SeedDevelopmentDataAsync
- OrderDto.cs
- OrderStatus
- .Price
- devDependencies
- scripts
- eslint.config.mjs
- .AddPizzaShopRateLimiting
- MenuSections.tsx
- web_components_ui_button
- .Anonymous_SeesActiveItemsOnly_WithoutAmountsOrStock
- IdentityEmailSender
- client.ts
- apiJson
- RecordingEmailDelivery
- .AdminAsync
- analytics/page.tsx
- RecipeItem
- .FromPriced
- CurrentUserDto.cs
- ForwardedHeadersExtensions.cs
- format.ts
- .DeliveryFailure_IsLogged_NotThrown
- ComingSoon.tsx
- OrderMapper
- system_linq_expressions

## God Nodes (most connected - your core abstractions)
1. `next` - 72 edges
2. `react` - 63 edges
3. `formatMoney()` - 37 edges
4. `requireAdmin()` - 34 edges
5. `PizzaShopContext` - 32 edges
6. `apiJson()` - 32 edges
7. `FormAlert()` - 31 edges
8. `Order` - 30 edges
9. `PizzaShop.Api.Models` - 30 edges
10. `TestApi` - 29 edges

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

## Communities (192 total, 122 thin omitted)

### Community 0 - "Pizza Shop POS README"
Cohesion: 0.12
Nodes (19): Ingredients table, OrderItems table, OrderItemToppings table, Orders table, Pizza Customizer (size, crust, fractional toppings), Pizza Shop POS, PizzaSizes table, RecipeItems table (+11 more)

### Community 1 - "web/package.json"
Cohesion: 0.12
Nodes (16): class-variance-authority, cn, next-themes, radix-ui, react-dom, shadcn, tailwindcss, @tailwindcss/turbopack (+8 more)

### Community 2 - "PizzaSizeFormDialog.tsx"
Cohesion: 0.11
Nodes (17): react-hook-form, PRESET_LABELS, FieldMessage(), FIELDS, PizzaSizeFormDialogProps, STATUS_CHOICES, FIELDS, UnitOfMeasureFormDialog() (+9 more)

### Community 3 - "compilerOptions"
Cohesion: 0.11
Nodes (18): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+10 more)

### Community 4 - "PizzaSizesTable.tsx"
Cohesion: 0.09
Nodes (19): lucide-react, CatalogTabs(), CatalogTabsProps, DeleteCatalogItemDialog(), defaultsFor(), EXAMPLE_SMALL_PRICE, PizzaSizeFormDialog(), multiplier (+11 more)

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
Cohesion: 0.12
Nodes (23): GET(), problemJson(), GET(), problemJson(), findOrder(), getOrderFeed(), listActiveOrders(), ApiError (+15 more)

### Community 13 - "ApiFactory"
Cohesion: 0.06
Nodes (13): HealthTests, ApiCollection, ApiFactory, Emails, Environment, Settings, DevelopmentApiFactory, Environment (+5 more)

### Community 15 - "MigrationBuilder"
Cohesion: 0.04
Nodes (9): InitialCreate, AddRecipeItemUniqueIndex, AddIdentity, AddMenuActiveAndOrderCancellation, AddOrdersCreatedAtIndex, ConfirmExistingUserEmails, AddOrdersStatusIndex, AddOrdersCancelledAtIndex (+1 more)

### Community 16 - "users/page.tsx"
Cohesion: 0.16
Nodes (18): hrefFor(), metadata, ROLE_BADGE_CLASSES, SearchForm(), UsersPage(), UsersTable(), UsersTableSkeleton(), pagedSchema() (+10 more)

### Community 19 - "RecipeDto.cs"
Cohesion: 0.36
Nodes (3): RecipeDto, RecipeItemDto, RecipeMapper

### Community 20 - "PizzaShopContext"
Cohesion: 0.09
Nodes (11): PizzaShopContext, DataProtectionKeys, Ingredients, OrderIngredientUsages, OrderItems, OrderItemToppings, Orders, PizzaSizes (+3 more)

### Community 21 - "Order"
Cohesion: 0.07
Nodes (20): Order, CancellationReason, CancelledAt, CancelledBy, CancelledByUserId, CreatedAt, IdempotencyKey, IngredientUsages (+12 more)

### Community 23 - ".UpdateRoles"
Cohesion: 0.10
Nodes (4): PagedResult, UserDto, UsersEndpoints, AppUser

### Community 26 - "orders/page.tsx"
Cohesion: 0.12
Nodes (30): metadata, MyOrder(), MyOrderPage(), MyOrderSkeleton(), hrefForPage(), metadata, MyOrdersPage(), MyOrdersSkeleton() (+22 more)

### Community 28 - "welcome/page.tsx"
Cohesion: 0.09
Nodes (28): AuthLayout(), AboutPage(), FAQ, metadata, metadata, PublicLayout(), metadata, PrivacyPage() (+20 more)

### Community 31 - "PizzaSize"
Cohesion: 0.12
Nodes (8): PizzaSizeDto, PizzaSizeMapper, PizzaSizesEndpoints, PizzaSize, IsActive, Name, PizzaSizeId, PriceMultiplier

### Community 32 - "requireAdmin"
Cohesion: 0.18
Nodes (29): zod, createPizzaSize(), createUnitOfMeasure(), deletePizzaSize(), deleteUnitOfMeasure(), idSchema, send(), updatePizzaSize() (+21 more)

### Community 38 - "react"
Cohesion: 0.10
Nodes (40): @hookform/resolvers, react, FIELDS, FIELDS, LoginForm(), LoginPage(), RegisterPage(), CheckInbox() (+32 more)

### Community 42 - "OrderItem"
Cohesion: 0.12
Nodes (13): OrderItem, ItemNameSnapshot, LineTotal, Order, OrderId, OrderItemId, PizzaSize, PizzaSizeId (+5 more)

### Community 44 - "proxy.ts"
Cohesion: 0.20
Nodes (15): LoginResponse, ACCESS_COOKIE, ACCESS_EXPIRES_COOKIE, cookieOptions, REFRESH_COOKIE, SESSION_COOKIES, sessionCookieValues(), clientIp() (+7 more)

### Community 45 - ".CreateRecipeAsync"
Cohesion: 0.16
Nodes (6): CreateIngredientRequest, CreateRecipeRequest, CreateUnitOfMeasureRequest, RecipeItemRequest, UpdateRecipeRequest, CatalogTests

### Community 46 - ".PlaceAsync"
Cohesion: 0.33
Nodes (3): CancelOrderRequest, UpdateOrderStatusRequest, CancellationTests

### Community 47 - "next"
Cohesion: 0.14
Nodes (18): next, POST(), problemJson(), Builder(), BuilderPage(), BuilderSkeleton(), metadata, listToppings() (+10 more)

### Community 48 - "AuthExtensions.cs"
Cohesion: 0.06
Nodes (9): Policies, RateLimitPolicies, OrderOptions, TaxRate, StatisticsOptions, TimeZone, PizzaShop.Api.Auth, PizzaShop.Api.Email (+1 more)

### Community 50 - "TestApi.cs"
Cohesion: 0.14
Nodes (3): PizzaShop.Api.Tests, PizzaShop.Api.Orders, PizzaShop.Api.Tests.Infrastructure

### Community 51 - "NavLinks.tsx"
Cohesion: 0.05
Nodes (62): AppLayout(), geistMono, geistSans, metadata, AppShell(), AppShellProps, Brand(), AnalyticsIcon() (+54 more)

### Community 52 - "OrderIngredientUsage"
Cohesion: 0.25
Nodes (7): OrderIngredientUsage, Amount, Ingredient, IngredientId, Order, OrderId, OrderIngredientUsageId

### Community 55 - "PizzaBuilder.tsx"
Cohesion: 0.11
Nodes (25): AMOUNT_CHOICES, COVERAGE_CHOICES, PizzaBuilder(), PizzaBuilderProps, CartContext, CartLine, CartProvider(), CartState (+17 more)

### Community 57 - "Recipe"
Cohesion: 0.15
Nodes (8): Recipe, BasePrice, IsActive, Name, RecipeId, RecipeItems, OrderItemToppingRequest, OrderCalculatorTests

### Community 58 - "OrderItemTopping"
Cohesion: 0.14
Nodes (13): ToppingAmount, Extra, Light, Standard, OrderItemTopping, Coverage, ExtraAmount, Ingredient (+5 more)

### Community 62 - "TestApi"
Cohesion: 0.13
Nodes (6): UpdateUserRolesRequest, LoginResponse, TestApi, Emails, RateLimitingTests, UsersTests

### Community 64 - "microsoft_entityframeworkcore"
Cohesion: 0.09
Nodes (5): UpdateUnitOfMeasureRequest, PizzaShop.Api.Models, PizzaShop.Api.Dtos, PizzaShop.Api.Requests, PizzaShop.Api.Endpoints

### Community 68 - ".Update"
Cohesion: 0.15
Nodes (3): IngredientDto, IngredientMapper, IngredientsEndpoints

### Community 69 - "EmailOptions"
Cohesion: 0.10
Nodes (16): SmtpEmailDelivery, EmailOptions, FromAddress, FromName, Smtp, WebBaseUrl, SmtpOptions, Host (+8 more)

### Community 73 - "schemas/ingredients.ts"
Cohesion: 0.12
Nodes (19): checkTopping(), hasTwoDecimals, IngredientForm, ingredientFormShape, ingredientSchema, newIngredientFormSchema, optionalNumber, quantity (+11 more)

### Community 74 - ".ResolveRange"
Cohesion: 0.30
Nodes (6): OrderSnapshot, RangeResult, StatisticsCalculator, StatisticsRange, Days, PizzaShop.Api.Statistics

### Community 76 - "StatisticsDtos.cs"
Cohesion: 0.19
Nodes (14): CancellationsByRoleDto, CancellationStatisticsDto, CancelledOrderDto, CancelledSummaryDto, IngredientUsageDto, IngredientUsageStatisticsDto, ItemStatisticsDto, RestockProjectionDto (+6 more)

### Community 77 - "Ingredient"
Cohesion: 0.12
Nodes (14): INamedEntity, Name, Ingredient, CurrentStock, IngredientId, IsActive, Name, ToppingPortion (+6 more)

### Community 78 - "dependencies"
Cohesion: 0.13
Nodes (15): dependencies, class-variance-authority, cn, @hookform/resolvers, lucide-react, next, next-themes, radix-ui (+7 more)

### Community 80 - ".GetMenu"
Cohesion: 0.21
Nodes (5): PublicMenuDto, PublicRecipeDto, PublicSizeDto, PublicToppingDto, PublicEndpoints

### Community 87 - "IngredientFormDialog.tsx"
Cohesion: 0.13
Nodes (23): defaultsFor(), FieldMessage(), FIELDS, IngredientFormDialog(), IngredientFormDialogProps, STATUS_CHOICES, TOPPING_CHOICES, blankItem() (+15 more)

### Community 90 - "CustomerHome.tsx"
Cohesion: 0.13
Nodes (25): Home(), HomeForRole(), metadata, StaffDashboard(), ActiveOrderCard(), ActiveOrdersBoard(), ActiveOrdersBoardSkeleton(), Column() (+17 more)

### Community 91 - "currentUser.ts"
Cohesion: 0.18
Nodes (14): idempotencyKeySchema, placeOrder(), MenuPage(), metadata, RecipeGrid(), RecipeGridSkeleton(), AdminOnly(), StaffOnly() (+6 more)

### Community 92 - "IngredientAdminActions.tsx"
Cohesion: 0.19
Nodes (9): sonner, DeleteCatalogItemDialogProps, DeleteIngredientDialog(), DeleteIngredientDialogProps, IngredientAdminActions(), NewIngredientButton(), InventoryTable(), isOut() (+1 more)

### Community 96 - "InventoryTable.tsx"
Cohesion: 0.14
Nodes (10): InventoryTableProps, View, VIEWS, metadata, RecipesPage(), RecipesTable(), RecipesTableSkeleton(), PagerProps (+2 more)

### Community 98 - "orders/actions.ts"
Cohesion: 0.16
Nodes (19): OrderActions(), OrderActionsProps, reportFailure(), AdvanceOrderButton(), AdvanceOrderButtonProps, LABELS, advanceStatus(), cancelOrder() (+11 more)

### Community 104 - "OrderDto.cs"
Cohesion: 0.29
Nodes (7): CancelledOrderFeedItemDto, OrderDto, OrderFeedDto, OrderFeedItemDto, OrderItemDto, OrderItemToppingDto, OrderSummaryDto

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

### Community 126 - "MenuSections.tsx"
Cohesion: 0.32
Nodes (11): metadata, PublicMenuPage(), RecipeCard(), fromPrice(), FullMenu(), loadMenu(), PopularPizzas(), RecipeGrid() (+3 more)

### Community 127 - "web_components_ui_button"
Cohesion: 0.12
Nodes (18): CartView(), ORDER_TYPE_CHOICES, CartPage(), metadata, Confirmation(), ConfirmEmailPage(), metadata, ForgotPasswordForm() (+10 more)

### Community 129 - ".Anonymous_SeesActiveItemsOnly_WithoutAmountsOrStock"
Cohesion: 0.18
Nodes (4): CreatePizzaSizeRequest, UpdateIngredientRequest, UpdatePizzaSizeRequest, PublicMenuTests

### Community 132 - "client.ts"
Cohesion: 0.13
Nodes (22): RFC-9457, server-only, quoteKey(), useQuote(), ApiFetchOptions, withSession(), apiBaseUrl(), callApi() (+14 more)

### Community 133 - "apiJson"
Cohesion: 0.15
Nodes (22): Catalog(), CatalogPage(), CatalogSkeleton(), metadata, isCatalogTab(), Inventory(), InventoryPage(), InventorySkeleton() (+14 more)

### Community 134 - "RecordingEmailDelivery"
Cohesion: 0.12
Nodes (4): Roles, EmailMessage, IEmailDelivery, RecordingEmailDelivery

### Community 135 - ".AdminAsync"
Cohesion: 0.20
Nodes (3): AdjustIngredientStockRequest, TestUser, StatisticsTests

### Community 137 - "analytics/page.tsx"
Cohesion: 0.11
Nodes (39): AnalyticsPage(), CancellationsSection(), Empty(), Filters(), ItemsSection(), metadata, readQuery(), RestockSection() (+31 more)

### Community 166 - "RecipeItem"
Cohesion: 0.25
Nodes (7): RecipeItem, Amount, Ingredient, IngredientId, Recipe, RecipeId, RecipeItemId

### Community 167 - ".FromPriced"
Cohesion: 0.29
Nodes (4): OrderQuoteDto, OrderQuoteItemDto, OrderQuoteMapper, OrderQuoteToppingDto

### Community 169 - "ForwardedHeadersExtensions.cs"
Cohesion: 0.20
Nodes (3): CorsExtensions, ForwardedHeadersExtensions, PizzaShop.Api.Extensions

### Community 170 - "format.ts"
Cohesion: 0.13
Nodes (28): columnPath(), DaysTable(), describe(), niceMax(), SalesChart(), ElapsedTime(), getMinute(), getServerMinute() (+20 more)

### Community 178 - "OrderMapper"
Cohesion: 0.33
Nodes (3): OrderMapper, UnitOfMeasureDto, UnitOfMeasureMapper

## Ambiguous Edges - Review These
- `pnpm workspace (packages: web)` → `Tech Stack (pnpm, Next.js 16, ASP.NET 10, PostgreSQL, Azure)`  [AMBIGUOUS]
  pnpm-workspace.yaml · relation: conceptually_related_to

## Knowledge Gaps
- **164 isolated node(s):** `class-variance-authority`, `next-themes`, `radix-ui`, `react-dom`, `shadcn` (+159 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 788 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **122 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `next` connect `next` to `web/package.json`, `PizzaSizeFormDialog.tsx`, `client.ts`, `apiJson`, `analytics/page.tsx`, `schemas/orders.ts`, `users/page.tsx`, `orders/page.tsx`, `welcome/page.tsx`, `requireAdmin`, `react`, `proxy.ts`, `NavLinks.tsx`, `PizzaBuilder.tsx`, `IngredientFormDialog.tsx`, `CustomerHome.tsx`, `currentUser.ts`, `IngredientAdminActions.tsx`, `InventoryTable.tsx`, `orders/actions.ts`, `MenuSections.tsx`, `web_components_ui_button`?**
  _High betweenness centrality (0.053) - this node is a cross-community bridge._
- **What connects `class-variance-authority`, `next-themes`, `radix-ui` to the rest of the system?**
  _164 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Pizza Shop POS README` be split into smaller, more focused modules?**
  _Cohesion score 0.1164021164021164 - nodes in this community are weakly interconnected._
- **Why does `PizzaShop.Api.Dtos` connect `microsoft_entityframeworkcore` to `.FromPriced`, `CurrentUserDto.cs`, `OrderDto.cs`, `.ResolveRange`, `StatisticsDtos.cs`, `.GetMenu`, `TestApi.cs`, `RecipeDto.cs`, `.UpdateRoles`, `system_linq_expressions`, `PizzaSize`?**
  _High betweenness centrality (0.032) - this node is a cross-community bridge._
- **Should `web/package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.11764705882352941 - nodes in this community are weakly interconnected._
- **Why does `react` connect `react` to `web/package.json`, `PizzaSizeFormDialog.tsx`, `PizzaSizesTable.tsx`, `apiJson`, `client.ts`, `analytics/page.tsx`, `users/page.tsx`, `orders/page.tsx`, `welcome/page.tsx`, `format.ts`, `next`, `ComingSoon.tsx`, `NavLinks.tsx`, `PizzaBuilder.tsx`, `IngredientFormDialog.tsx`, `CustomerHome.tsx`, `currentUser.ts`, `IngredientAdminActions.tsx`, `InventoryTable.tsx`, `orders/actions.ts`, `MenuSections.tsx`, `web_components_ui_button`?**
  _High betweenness centrality (0.027) - this node is a cross-community bridge._

### Low-confidence Hints
_AMBIGUOUS edges — the extractor was unsure. Verify before acting on these._

- **What is the exact relationship between `pnpm workspace (packages: web)` and `Tech Stack (pnpm, Next.js 16, ASP.NET 10, PostgreSQL, Azure)`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._