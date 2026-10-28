# Graph Report - pizza-shop  (2026-10-27)

## Corpus Check
- 278 files · ~80,494 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 7 file(s) not represented in the graph (top: (none) 3, .example 2, .ico 1)

## Summary
- 2246 nodes · 5851 edges · 185 communities (60 shown, 125 thin omitted)
- Extraction: 96% EXTRACTED · 4% INFERRED · 0% AMBIGUOUS · INFERRED: 220 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `caef8942`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- Pizza Shop POS README
- web/package.json
- IngredientFormDialog.tsx
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
- system_componentmodel_dataannotations
- MigrationBuilder
- orders/page.tsx
- RecipeDto.cs
- PizzaShopContext
- Order
- PizzaShop.Api.Migrations
- .UpdateRoles
- .Update
- PizzaShop.Api.Options
- .Create
- MenuSections.tsx
- .GetAll
- .Update
- requireAdmin
- auth/actions.ts
- .BuildModel
- .AddPizzaShopAuth
- .TransformAsync
- OrderItem
- proxy.ts
- .CreateIngredientAsync
- .PlaceAsync
- api/menu.ts
- AuthExtensions.cs
- TestApi.cs
- NavLinks.tsx
- OrderIngredientUsage
- StatisticsCalculatorTests
- EmailTests
- web_components_ui_button
- Recipe
- OrderItemTopping
- .ReadProblemAsync
- TestApi
- .GetCancellations
- PizzaShop.Api.Dtos
- microsoft_entityframeworkcore
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
- TestDatabase
- AddIdentity
- (app)/menu/page.tsx
- AddMenuActiveAndOrderCancellation
- ConfirmExistingUserEmails
- AddOrdersCancelledAtIndex
- HealthTests
- .SeedDevelopmentDataAsync
- OrderStatus
- .Price
- devDependencies
- scripts
- eslint.config.mjs
- .AddPizzaShopRateLimiting
- next
- .Anonymous_SeesActiveItemsOnly_WithoutAmountsOrStock
- IdentityEmailSender
- currentUser.ts
- apiJson
- EmailMessage
- .AdminAsync
- analytics/page.tsx
- RecipeItem
- CurrentUserDto.cs
- format.ts
- ComingSoon.tsx

## God Nodes (most connected - your core abstractions)
1. `next` - 71 edges
2. `react` - 63 edges
3. `formatMoney()` - 37 edges
4. `requireAdmin()` - 34 edges
5. `PizzaShopContext` - 32 edges
6. `apiJson()` - 32 edges
7. `FormAlert()` - 31 edges
8. `Order` - 30 edges
9. `TestApi` - 30 edges
10. `PizzaShop.Api.Models` - 30 edges

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

## Communities (185 total, 125 thin omitted)

### Community 0 - "Pizza Shop POS README"
Cohesion: 0.12
Nodes (19): Ingredients table, OrderItems table, OrderItemToppings table, Orders table, Pizza Customizer (size, crust, fractional toppings), Pizza Shop POS, PizzaSizes table, RecipeItems table (+11 more)

### Community 1 - "web/package.json"
Cohesion: 0.12
Nodes (16): class-variance-authority, cn, next-themes, radix-ui, react-dom, shadcn, tailwindcss, @tailwindcss/turbopack (+8 more)

### Community 2 - "IngredientFormDialog.tsx"
Cohesion: 0.07
Nodes (43): @hookform/resolvers, sonner, PRESET_LABELS, DeleteCatalogItemDialogProps, FieldMessage(), FIELDS, PizzaSizeFormDialogProps, STATUS_CHOICES (+35 more)

### Community 3 - "compilerOptions"
Cohesion: 0.11
Nodes (18): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+10 more)

### Community 4 - "PizzaSizesTable.tsx"
Cohesion: 0.10
Nodes (17): CatalogTabsProps, DeleteCatalogItemDialog(), defaultsFor(), EXAMPLE_SMALL_PRICE, PizzaSizeFormDialog(), multiplier, PizzaSizeActions(), PizzaSizesTable() (+9 more)

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
Cohesion: 0.06
Nodes (47): GET(), problemJson(), GET(), problemJson(), CartContext, CartLine, CartProvider(), CartState (+39 more)

### Community 13 - "ApiFactory"
Cohesion: 0.09
Nodes (10): ApiCollection, ApiFactory, Emails, Environment, Settings, DevelopmentApiFactory, Environment, RateLimitedApiFactory (+2 more)

### Community 14 - "system_componentmodel_dataannotations"
Cohesion: 0.14
Nodes (3): QuoteOrderRequest, UpdateUnitOfMeasureRequest, PizzaShop.Api.Requests

### Community 15 - "MigrationBuilder"
Cohesion: 0.13
Nodes (5): InitialCreate, AddRecipeItemUniqueIndex, AddOrdersCreatedAtIndex, AddOrdersStatusIndex, AddPizzaSizeIsActive

### Community 16 - "orders/page.tsx"
Cohesion: 0.08
Nodes (35): InventoryTableProps, View, VIEWS, FILTERS, hrefFor(), metadata, OrdersPage(), OrdersTable() (+27 more)

### Community 19 - "RecipeDto.cs"
Cohesion: 0.15
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

### Community 26 - "PizzaShop.Api.Options"
Cohesion: 0.12
Nodes (6): RateLimitPolicies, OrderOptions, TaxRate, StatisticsOptions, TimeZone, PizzaShop.Api.Options

### Community 28 - "MenuSections.tsx"
Cohesion: 0.08
Nodes (35): AboutPage(), FAQ, metadata, metadata, PublicLayout(), metadata, PrivacyPage(), metadata (+27 more)

### Community 31 - ".Update"
Cohesion: 0.06
Nodes (11): IngredientDto, IngredientMapper, PizzaSizeDto, PizzaSizeMapper, IngredientsEndpoints, PizzaSizesEndpoints, PizzaSize, IsActive (+3 more)

### Community 32 - "requireAdmin"
Cohesion: 0.13
Nodes (39): idempotencyKeySchema, placeOrder(), createPizzaSize(), createUnitOfMeasure(), deletePizzaSize(), deleteUnitOfMeasure(), idSchema, send() (+31 more)

### Community 38 - "auth/actions.ts"
Cohesion: 0.10
Nodes (43): react-hook-form, FIELDS, ForgotPasswordForm(), ForgotPasswordPage(), FIELDS, LoginForm(), LoginPage(), RegisterPage() (+35 more)

### Community 40 - ".AddPizzaShopAuth"
Cohesion: 0.06
Nodes (4): AuthExtensions, CorsExtensions, ForwardedHeadersExtensions, PizzaShop.Api.Extensions

### Community 42 - "OrderItem"
Cohesion: 0.12
Nodes (13): OrderItem, ItemNameSnapshot, LineTotal, Order, OrderId, OrderItemId, PizzaSize, PizzaSizeId (+5 more)

### Community 44 - "proxy.ts"
Cohesion: 0.17
Nodes (17): LoginResponse, logout(), ACCESS_COOKIE, ACCESS_EXPIRES_COOKIE, cookieOptions, REFRESH_COOKIE, SESSION_COOKIES, sessionCookieValues() (+9 more)

### Community 45 - ".CreateIngredientAsync"
Cohesion: 0.16
Nodes (7): AdjustIngredientStockRequest, CreateIngredientRequest, CreateRecipeRequest, CreateUnitOfMeasureRequest, RecipeItemRequest, UpdateRecipeRequest, CatalogTests

### Community 46 - ".PlaceAsync"
Cohesion: 0.32
Nodes (4): CancelOrderRequest, UpdateOrderStatusRequest, CancellationTests, TestUser

### Community 47 - "api/menu.ts"
Cohesion: 0.13
Nodes (21): RFC-9457, POST(), problemJson(), Builder(), BuilderPage(), BuilderSkeleton(), metadata, listToppings() (+13 more)

### Community 48 - "AuthExtensions.cs"
Cohesion: 0.10
Nodes (4): Policies, PizzaShop.Api.Auth, PizzaShop.Api.Db, PizzaShop.Api.Email

### Community 50 - "TestApi.cs"
Cohesion: 0.15
Nodes (3): PizzaShop.Api.Tests, PizzaShop.Api.Orders, PizzaShop.Api.Tests.Infrastructure

### Community 51 - "NavLinks.tsx"
Cohesion: 0.05
Nodes (63): AppLayout(), AuthLayout(), geistMono, geistSans, metadata, AppShell(), AppShellProps, Brand() (+55 more)

### Community 52 - "OrderIngredientUsage"
Cohesion: 0.25
Nodes (7): OrderIngredientUsage, Amount, Ingredient, IngredientId, Order, OrderId, OrderIngredientUsageId

### Community 55 - "web_components_ui_button"
Cohesion: 0.10
Nodes (18): CartView(), CartPage(), metadata, AMOUNT_CHOICES, COVERAGE_CHOICES, PizzaBuilder(), PizzaBuilderProps, useCart() (+10 more)

### Community 57 - "Recipe"
Cohesion: 0.15
Nodes (8): Recipe, BasePrice, IsActive, Name, RecipeId, RecipeItems, OrderItemToppingRequest, OrderCalculatorTests

### Community 58 - "OrderItemTopping"
Cohesion: 0.14
Nodes (13): ToppingAmount, Extra, Light, Standard, OrderItemTopping, Coverage, ExtraAmount, Ingredient (+5 more)

### Community 62 - "TestApi"
Cohesion: 0.12
Nodes (6): UpdateUserRolesRequest, LoginResponse, TestApi, Emails, RateLimitingTests, UsersTests

### Community 69 - "EmailOptions"
Cohesion: 0.10
Nodes (16): SmtpEmailDelivery, EmailOptions, FromAddress, FromName, Smtp, WebBaseUrl, SmtpOptions, Host (+8 more)

### Community 71 - ".Update"
Cohesion: 0.07
Nodes (16): CancelledOrderFeedItemDto, OrderDto, OrderFeedDto, OrderFeedItemDto, OrderItemDto, OrderItemToppingDto, OrderMapper, OrderSummaryDto (+8 more)

### Community 73 - "schemas/ingredients.ts"
Cohesion: 0.13
Nodes (18): checkTopping(), hasTwoDecimals, IngredientForm, ingredientFormSchema, ingredientFormShape, ingredientSchema, newIngredientFormSchema, optionalNumber (+10 more)

### Community 74 - ".ResolveRange"
Cohesion: 0.24
Nodes (6): OrderSnapshot, RangeResult, StatisticsCalculator, StatisticsRange, Days, PizzaShop.Api.Statistics

### Community 76 - "StatisticsDtos.cs"
Cohesion: 0.24
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

### Community 91 - "(app)/menu/page.tsx"
Cohesion: 0.36
Nodes (8): MenuPage(), metadata, RecipeGrid(), RecipeGridSkeleton(), Highlights(), RecipeCard(), listPopularRecipes(), listRecipes()

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

### Community 127 - "next"
Cohesion: 0.09
Nodes (46): lucide-react, next, react, ORDER_TYPE_CHOICES, metadata, MyOrder(), MyOrderPage(), MyOrderSkeleton() (+38 more)

### Community 129 - ".Anonymous_SeesActiveItemsOnly_WithoutAmountsOrStock"
Cohesion: 0.18
Nodes (4): CreatePizzaSizeRequest, UpdateIngredientRequest, UpdatePizzaSizeRequest, PublicMenuTests

### Community 132 - "currentUser.ts"
Cohesion: 0.13
Nodes (20): server-only, zod, recipeIdSchema, ApiFetchOptions, withSession(), apiBaseUrl(), callApi(), callApiJson() (+12 more)

### Community 133 - "apiJson"
Cohesion: 0.17
Nodes (20): CatalogTabs(), Catalog(), CatalogPage(), CatalogSkeleton(), metadata, isCatalogTab(), Inventory(), InventoryPage() (+12 more)

### Community 134 - "EmailMessage"
Cohesion: 0.13
Nodes (4): Roles, EmailMessage, IEmailDelivery, RecordingEmailDelivery

### Community 137 - "analytics/page.tsx"
Cohesion: 0.09
Nodes (51): AnalyticsPage(), CancellationsSection(), Empty(), Filters(), ItemsSection(), metadata, readQuery(), RestockSection() (+43 more)

### Community 166 - "RecipeItem"
Cohesion: 0.25
Nodes (7): RecipeItem, Amount, Ingredient, IngredientId, Recipe, RecipeId, RecipeItemId

### Community 170 - "format.ts"
Cohesion: 0.07
Nodes (41): OrderActions(), OrderActionsProps, reportFailure(), Home(), HomeForRole(), metadata, StaffDashboard(), ActiveOrderCard() (+33 more)

## Ambiguous Edges - Review These
- `pnpm workspace (packages: web)` → `Tech Stack (pnpm, Next.js 16, ASP.NET 10, PostgreSQL, Azure)`  [AMBIGUOUS]
  pnpm-workspace.yaml · relation: conceptually_related_to

## Knowledge Gaps
- **164 isolated node(s):** `class-variance-authority`, `next-themes`, `radix-ui`, `react-dom`, `shadcn` (+159 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 787 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **125 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `next` connect `next` to `requireAdmin`, `web/package.json`, `IngredientFormDialog.tsx`, `currentUser.ts`, `apiJson`, `auth/actions.ts`, `analytics/page.tsx`, `format.ts`, `schemas/orders.ts`, `proxy.ts`, `api/menu.ts`, `orders/page.tsx`, `NavLinks.tsx`, `web_components_ui_button`, `(app)/menu/page.tsx`, `MenuSections.tsx`?**
  _High betweenness centrality (0.038) - this node is a cross-community bridge._
- **What connects `class-variance-authority`, `next-themes`, `radix-ui` to the rest of the system?**
  _164 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Pizza Shop POS README` be split into smaller, more focused modules?**
  _Cohesion score 0.1164021164021164 - nodes in this community are weakly interconnected._
- **Why does `PizzaShop.Api.Dtos` connect `PizzaShop.Api.Dtos` to `.Update`, `CurrentUserDto.cs`, `.ResolveRange`, `StatisticsDtos.cs`, `.GetMenu`, `TestApi.cs`, `RecipeDto.cs`, `.UpdateRoles`, `.Update`?**
  _High betweenness centrality (0.037) - this node is a cross-community bridge._
- **Should `web/package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.11764705882352941 - nodes in this community are weakly interconnected._
- **Why does `react` connect `next` to `web/package.json`, `IngredientFormDialog.tsx`, `PizzaSizesTable.tsx`, `apiJson`, `auth/actions.ts`, `currentUser.ts`, `analytics/page.tsx`, `format.ts`, `schemas/orders.ts`, `api/menu.ts`, `orders/page.tsx`, `ComingSoon.tsx`, `NavLinks.tsx`, `web_components_ui_button`, `(app)/menu/page.tsx`, `MenuSections.tsx`?**
  _High betweenness centrality (0.030) - this node is a cross-community bridge._

### Low-confidence Hints
_AMBIGUOUS edges — the extractor was unsure. Verify before acting on these._

- **What is the exact relationship between `pnpm workspace (packages: web)` and `Tech Stack (pnpm, Next.js 16, ASP.NET 10, PostgreSQL, Azure)`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._