# Graph Report - pizza-shop  (2026-10-27)

## Corpus Check
- 278 files · ~80,494 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 7 file(s) not represented in the graph (top: (none) 3, .example 2, .ico 1)

## Summary
- 2187 nodes · 5675 edges · 187 communities (70 shown, 117 thin omitted)
- Extraction: 96% EXTRACTED · 4% INFERRED · 0% AMBIGUOUS · INFERRED: 220 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `974f63d2`
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
- orders/page.tsx
- RecipeDto
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
- invalidInput
- FormAlert
- .BuildModel
- AuthExtensions
- .TransformAsync
- OrderItem
- proxy.ts
- .CreateIngredientAsync
- .PlaceAsync
- RecipeForm.tsx
- NavLinks.tsx
- TestApi.cs
- OrderFeed.tsx
- OrderIngredientUsage
- StatisticsCalculatorTests
- (app)/layout.tsx
- PizzaBuilder.tsx
- Recipe
- AppShell.tsx
- .ReadProblemAsync
- TestApi
- .GetCancellations
- microsoft_entityframeworkcore
- app/layout.tsx
- SmtpEmailDelivery
- PizzaSize
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
- .DeliveryFailure_IsLogged_NotThrown
- requireAdmin
- ForwardedHeadersExtensions.cs
- CustomerHome.tsx
- useSidebar.ts
- UnitOfMeasureFormDialog.tsx
- navigation.ts
- ChoiceGroup
- .SeedDevelopmentDataAsync
- OrderItemTopping
- .Price
- devDependencies
- EmailOptions
- scripts
- eslint.config.mjs
- .AddPizzaShopRateLimiting
- users/actions.ts
- react
- .Anonymous_SeesActiveItemsOnly_WithoutAmountsOrStock
- IdentityEmailSender
- currentUser.ts
- apiJson
- EmailMessage
- .AdminAsync
- analytics/page.tsx
- RecipeItem
- ToppingDto.cs
- IEmailDelivery
- ActiveOrdersBoard.tsx
- format.ts
- OrderItemRequest
- ComingSoon.tsx
- InitialCreate

## God Nodes (most connected - your core abstractions)
1. `react` - 61 edges
2. `next` - 59 edges
3. `formatMoney()` - 35 edges
4. `requireAdmin()` - 34 edges
5. `PizzaShopContext` - 32 edges
6. `apiJson()` - 32 edges
7. `FormAlert()` - 31 edges
8. `Order` - 30 edges
9. `TestApi` - 30 edges
10. `PizzaShop.Api.Models` - 30 edges

## Surprising Connections (you probably didn't know these)
- `RecordingEmailDelivery` --references--> `EmailMessage`  [EXTRACTED]
  Tests/PizzaShop.Api.Tests/Infrastructure/RecordingEmailDelivery.cs → api/Email/EmailMessage.cs
- `FailingDelivery` --implements--> `IEmailDelivery`  [EXTRACTED]
  Tests/PizzaShop.Api.Tests/AccountEmailsTests.cs → api/Email/EmailMessage.cs
- `RecordingEmailDelivery` --implements--> `IEmailDelivery`  [EXTRACTED]
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

## Communities (187 total, 117 thin omitted)

### Community 0 - "Pizza Shop POS README"
Cohesion: 0.12
Nodes (19): Ingredients table, OrderItems table, OrderItemToppings table, Orders table, Pizza Customizer (size, crust, fractional toppings), Pizza Shop POS, PizzaSizes table, RecipeItems table (+11 more)

### Community 1 - "web/package.json"
Cohesion: 0.12
Nodes (16): class-variance-authority, cn, next-themes, radix-ui, react-dom, shadcn, tailwindcss, @tailwindcss/turbopack (+8 more)

### Community 2 - "IngredientFormDialog.tsx"
Cohesion: 0.12
Nodes (14): PRESET_LABELS, EXAMPLE_SMALL_PRICE, FIELDS, PizzaSizeFormDialogProps, STATUS_CHOICES, MODE_CHOICES, MODE_COPY, FIELDS (+6 more)

### Community 3 - "compilerOptions"
Cohesion: 0.11
Nodes (18): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+10 more)

### Community 4 - "IngredientAdminActions.tsx"
Cohesion: 0.16
Nodes (4): sonner, DeleteCatalogItemDialogProps, DeleteIngredientDialogProps, UserMenuProps

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
Nodes (29): GET(), problemJson(), GET(), problemJson(), findOrder(), getOrderFeed(), listActiveOrders(), ORDERS_PAGE_SIZE (+21 more)

### Community 13 - "ApiFactory"
Cohesion: 0.05
Nodes (16): Roles, EmailTests, HealthTests, ApiCollection, ApiFactory, Emails, Environment, Settings (+8 more)

### Community 14 - "system_componentmodel_dataannotations"
Cohesion: 0.10
Nodes (4): QuoteOrderRequest, UpdateUnitOfMeasureRequest, PizzaShop.Api.Models, PizzaShop.Api.Requests

### Community 15 - "MigrationBuilder"
Cohesion: 0.04
Nodes (8): AddRecipeItemUniqueIndex, AddIdentity, AddMenuActiveAndOrderCancellation, AddOrdersCreatedAtIndex, ConfirmExistingUserEmails, AddOrdersStatusIndex, AddOrdersCancelledAtIndex, AddPizzaSizeIsActive

### Community 16 - "orders/page.tsx"
Cohesion: 0.07
Nodes (37): CatalogTabsProps, multiplier, PizzaSizeActions(), PizzaSizesTable(), CATALOG_TABS, CatalogTab, InventoryTableProps, View (+29 more)

### Community 19 - "RecipeDto"
Cohesion: 0.33
Nodes (3): RecipeDto, RecipeItemDto, RecipeMapper

### Community 20 - "PizzaShopContext"
Cohesion: 0.09
Nodes (11): PizzaShopContext, DataProtectionKeys, Ingredients, OrderIngredientUsages, OrderItems, OrderItemToppings, Orders, PizzaSizes (+3 more)

### Community 21 - "Order"
Cohesion: 0.07
Nodes (20): Order, CancellationReason, CancelledAt, CancelledBy, CancelledByUserId, CreatedAt, IdempotencyKey, IngredientUsages (+12 more)

### Community 23 - ".UpdateRoles"
Cohesion: 0.06
Nodes (16): CancelledOrderFeedItemDto, OrderDto, OrderFeedDto, OrderFeedItemDto, OrderItemDto, OrderItemToppingDto, OrderMapper, OrderSummaryDto (+8 more)

### Community 26 - "PizzaShop.Api.Options"
Cohesion: 0.09
Nodes (7): RateLimitPolicies, OrderOptions, TaxRate, StatisticsOptions, TimeZone, PizzaShop.Api.Email, PizzaShop.Api.Options

### Community 28 - "auth/actions.ts"
Cohesion: 0.14
Nodes (23): getClientIp(), Credentials, credentialsSchema, EmailOnlyInput, emailOnlySchema, emailSchema, loginResponseSchema, mismatch (+15 more)

### Community 31 - ".Update"
Cohesion: 0.13
Nodes (3): IngredientDto, IngredientMapper, IngredientsEndpoints

### Community 32 - "invalidInput"
Cohesion: 0.20
Nodes (25): zod, idempotencyKeySchema, placeOrder(), adjustStock(), createIngredient(), deleteIngredient(), ingredientIdSchema, updateIngredient() (+17 more)

### Community 38 - "FormAlert"
Cohesion: 0.17
Nodes (22): @hookform/resolvers, react-hook-form, FIELDS, ForgotPasswordForm(), ForgotPasswordPage(), FIELDS, LoginForm(), LoginPage() (+14 more)

### Community 42 - "OrderItem"
Cohesion: 0.12
Nodes (13): OrderItem, ItemNameSnapshot, LineTotal, Order, OrderId, OrderItemId, PizzaSize, PizzaSizeId (+5 more)

### Community 44 - "proxy.ts"
Cohesion: 0.23
Nodes (14): LoginResponse, ACCESS_COOKIE, ACCESS_EXPIRES_COOKIE, cookieOptions, REFRESH_COOKIE, SESSION_COOKIES, sessionCookieValues(), setSessionCookies() (+6 more)

### Community 45 - ".CreateIngredientAsync"
Cohesion: 0.16
Nodes (7): AdjustIngredientStockRequest, CreateIngredientRequest, CreateRecipeRequest, CreateUnitOfMeasureRequest, RecipeItemRequest, UpdateRecipeRequest, CatalogTests

### Community 46 - ".PlaceAsync"
Cohesion: 0.32
Nodes (4): CancelOrderRequest, UpdateOrderStatusRequest, CancellationTests, TestUser

### Community 47 - "RecipeForm.tsx"
Cohesion: 0.19
Nodes (12): blankItem(), FieldMessage(), RecipeForm(), RecipeFormProps, STATUS_CHOICES, NativeSelect(), NativeSelectOption(), NativeSelectProps (+4 more)

### Community 48 - "NavLinks.tsx"
Cohesion: 0.26
Nodes (13): AnalyticsIcon(), DashboardIcon(), Icon(), IconProps, InventoryIcon(), MenuIcon(), OrdersIcon(), RecipesIcon() (+5 more)

### Community 50 - "TestApi.cs"
Cohesion: 0.13
Nodes (3): PizzaShop.Api.Tests, PizzaShop.Api.Orders, PizzaShop.Api.Tests.Infrastructure

### Community 51 - "OrderFeed.tsx"
Cohesion: 0.27
Nodes (15): OrderFeed(), enableAndPreview(), getContext(), isSoundEnabled(), isSoundEnabledOnServer(), listeners, NOTES, OrderSound (+7 more)

### Community 52 - "OrderIngredientUsage"
Cohesion: 0.25
Nodes (7): OrderIngredientUsage, Amount, Ingredient, IngredientId, Order, OrderId, OrderIngredientUsageId

### Community 54 - "(app)/layout.tsx"
Cohesion: 0.30
Nodes (12): AppLayout(), NavLinksSkeleton(), RoleNav(), SessionUserMenu(), StaffOrderFeed(), UserMenu(), CartButton(), CartContext (+4 more)

### Community 55 - "PizzaBuilder.tsx"
Cohesion: 0.10
Nodes (26): CartView(), CartPage(), metadata, AMOUNT_CHOICES, COVERAGE_CHOICES, PizzaBuilderProps, CartLine, CartState (+18 more)

### Community 57 - "Recipe"
Cohesion: 0.15
Nodes (8): Recipe, BasePrice, IsActive, Name, RecipeId, RecipeItems, OrderItemToppingRequest, OrderCalculatorTests

### Community 58 - "AppShell.tsx"
Cohesion: 0.29
Nodes (8): AuthLayout(), AppShell(), AppShellProps, Brand(), BrandLogo(), CloseIcon(), ShellContext, ShellState

### Community 62 - "TestApi"
Cohesion: 0.12
Nodes (6): UpdateUserRolesRequest, LoginResponse, TestApi, Emails, RateLimitingTests, UsersTests

### Community 64 - "microsoft_entityframeworkcore"
Cohesion: 0.11
Nodes (5): Policies, CurrentUserDto, PizzaShop.Api.Auth, PizzaShop.Api.Dtos, PizzaShop.Api.Endpoints

### Community 68 - "app/layout.tsx"
Cohesion: 0.20
Nodes (5): geistMono, geistSans, metadata, SIDEBAR_STORAGE_KEY, sidebarInitScript

### Community 69 - "SmtpEmailDelivery"
Cohesion: 0.20
Nodes (5): SmtpEmailDelivery, SmtpSecurity, None, SslOnConnect, StartTls

### Community 71 - "PizzaSize"
Cohesion: 0.06
Nodes (11): PizzaSizeDto, PizzaSizeMapper, UnitOfMeasureDto, UnitOfMeasureMapper, PizzaSizesEndpoints, UnitsOfMeasureEndpoints, PizzaSize, IsActive (+3 more)

### Community 73 - "schemas/ingredients.ts"
Cohesion: 0.14
Nodes (16): checkTopping(), hasTwoDecimals, IngredientForm, ingredientFormSchema, ingredientFormShape, newIngredientFormSchema, optionalNumber, quantity (+8 more)

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

### Community 87 - "requireAdmin"
Cohesion: 0.32
Nodes (11): createPizzaSize(), createUnitOfMeasure(), deletePizzaSize(), deleteUnitOfMeasure(), idSchema, send(), updatePizzaSize(), updateUnitOfMeasure() (+3 more)

### Community 90 - "ForwardedHeadersExtensions.cs"
Cohesion: 0.20
Nodes (3): CorsExtensions, ForwardedHeadersExtensions, PizzaShop.Api.Extensions

### Community 91 - "CustomerHome.tsx"
Cohesion: 0.23
Nodes (15): MenuPage(), metadata, RecipeGrid(), RecipeGridSkeleton(), Available, CustomerHome(), Highlights(), InProgress() (+7 more)

### Community 92 - "useSidebar.ts"
Cohesion: 0.36
Nodes (9): getCollapsed(), getIsDesktop(), getServerFalse(), listeners, setCollapsed(), subscribeCollapsed(), subscribeDesktop(), useIsDesktop() (+1 more)

### Community 95 - "UnitOfMeasureFormDialog.tsx"
Cohesion: 0.27
Nodes (10): DeleteCatalogItemDialog(), FieldMessage(), FIELDS, UnitOfMeasureFormDialog(), UnitOfMeasureFormDialogProps, ingredientsLabel(), UnitOfMeasureActions(), UnitsOfMeasureTable() (+2 more)

### Community 96 - "navigation.ts"
Cohesion: 0.33
Nodes (5): CurrentUser, ADMIN, CUSTOMER, NavKey, STAFF

### Community 98 - "ChoiceGroup"
Cohesion: 0.19
Nodes (13): defaultsFor(), PizzaSizeFormDialog(), AdjustStockDialog(), DeleteIngredientDialog(), IngredientAdminActions(), NewIngredientButton(), defaultsFor(), FieldMessage() (+5 more)

### Community 105 - "OrderItemTopping"
Cohesion: 0.07
Nodes (27): OrderStatus, Cancelled, Completed, Pending, Preparing, Ready, OrderType, Delivery (+19 more)

### Community 112 - "devDependencies"
Cohesion: 0.20
Nodes (10): devDependencies, eslint, eslint-config-next, shadcn, tailwindcss, @tailwindcss/turbopack, @types/node, @types/react (+2 more)

### Community 113 - "EmailOptions"
Cohesion: 0.18
Nodes (11): EmailOptions, FromAddress, FromName, Smtp, WebBaseUrl, SmtpOptions, Host, Password (+3 more)

### Community 115 - "scripts"
Cohesion: 0.40
Nodes (5): scripts, build, dev, lint, start

### Community 116 - "eslint.config.mjs"
Cohesion: 0.50
Nodes (3): eslint, eslint-config-next, eslintConfig

### Community 119 - ".AddPizzaShopRateLimiting"
Cohesion: 0.19
Nodes (5): RateLimitingExtensions, RateLimitingOptions, AuthPerMinute, OrderCreatePerMinute, UserPerMinute

### Community 126 - "users/actions.ts"
Cohesion: 0.13
Nodes (20): updateUserRole(), userIdSchema, hrefFor(), SearchForm(), UsersPage(), UsersTable(), UsersTableSkeleton(), ROLE_LABELS (+12 more)

### Community 127 - "react"
Cohesion: 0.12
Nodes (22): lucide-react, next, react, ORDER_TYPE_CHOICES, Confirmation(), ConfirmEmailPage(), metadata, metadata (+14 more)

### Community 129 - ".Anonymous_SeesActiveItemsOnly_WithoutAmountsOrStock"
Cohesion: 0.18
Nodes (4): CreatePizzaSizeRequest, UpdateIngredientRequest, UpdatePizzaSizeRequest, PublicMenuTests

### Community 132 - "currentUser.ts"
Cohesion: 0.14
Nodes (20): RFC-9457, server-only, ApiFetchOptions, withSession(), apiBaseUrl(), callApi(), callApiJson(), CallApiOptions (+12 more)

### Community 133 - "apiJson"
Cohesion: 0.08
Nodes (42): POST(), problemJson(), CatalogTabs(), Catalog(), CatalogPage(), CatalogSkeleton(), metadata, isCatalogTab() (+34 more)

### Community 137 - "analytics/page.tsx"
Cohesion: 0.08
Nodes (51): AnalyticsPage(), CancellationsSection(), Empty(), Filters(), ItemsSection(), metadata, readQuery(), RestockSection() (+43 more)

### Community 166 - "RecipeItem"
Cohesion: 0.25
Nodes (7): RecipeItem, Amount, Ingredient, IngredientId, Recipe, RecipeId, RecipeItemId

### Community 169 - "ActiveOrdersBoard.tsx"
Cohesion: 0.20
Nodes (15): Home(), HomeForRole(), metadata, StaffDashboard(), ActiveOrderCard(), ActiveOrdersBoard(), ActiveOrdersBoardSkeleton(), Column() (+7 more)

### Community 170 - "format.ts"
Cohesion: 0.09
Nodes (33): metadata, MyOrder(), MyOrderPage(), MyOrderSkeleton(), OrderActions(), OrderActionsProps, reportFailure(), Detail() (+25 more)

## Ambiguous Edges - Review These
- `pnpm workspace (packages: web)` → `Tech Stack (pnpm, Next.js 16, ASP.NET 10, PostgreSQL, Azure)`  [AMBIGUOUS]
  pnpm-workspace.yaml · relation: conceptually_related_to

## Knowledge Gaps
- **164 isolated node(s):** `class-variance-authority`, `next-themes`, `radix-ui`, `react-dom`, `shadcn` (+159 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 774 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **117 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react` connect `react` to `web/package.json`, `IngredientFormDialog.tsx`, `IngredientAdminActions.tsx`, `apiJson`, `currentUser.ts`, `analytics/page.tsx`, `orders/page.tsx`, `FormAlert`, `ActiveOrdersBoard.tsx`, `format.ts`, `RecipeForm.tsx`, `NavLinks.tsx`, `ComingSoon.tsx`, `OrderFeed.tsx`, `(app)/layout.tsx`, `PizzaBuilder.tsx`, `AppShell.tsx`, `CustomerHome.tsx`, `useSidebar.ts`, `UnitOfMeasureFormDialog.tsx`, `users/actions.ts`?**
  _High betweenness centrality (0.038) - this node is a cross-community bridge._
- **What connects `class-variance-authority`, `next-themes`, `radix-ui` to the rest of the system?**
  _164 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Pizza Shop POS README` be split into smaller, more focused modules?**
  _Cohesion score 0.1164021164021164 - nodes in this community are weakly interconnected._
- **Why does `next` connect `react` to `web/package.json`, `IngredientFormDialog.tsx`, `IngredientAdminActions.tsx`, `apiJson`, `currentUser.ts`, `analytics/page.tsx`, `schemas/orders.ts`, `orders/page.tsx`, `auth/actions.ts`, `invalidInput`, `FormAlert`, `ActiveOrdersBoard.tsx`, `format.ts`, `proxy.ts`, `RecipeForm.tsx`, `NavLinks.tsx`, `OrderFeed.tsx`, `PizzaBuilder.tsx`, `AppShell.tsx`, `app/layout.tsx`, `requireAdmin`, `CustomerHome.tsx`, `users/actions.ts`?**
  _High betweenness centrality (0.023) - this node is a cross-community bridge._
- **Should `web/package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.11764705882352941 - nodes in this community are weakly interconnected._
- **Why does `TestApi` connect `TestApi` to `.AdminAsync`, `.NewUserAsync`, `.CreateIngredientAsync`, `ApiFactory`, `.PlaceAsync`, `TestApi.cs`, `.ReadProblemAsync`?**
  _High betweenness centrality (0.022) - this node is a cross-community bridge._

### Low-confidence Hints
_AMBIGUOUS edges — the extractor was unsure. Verify before acting on these._

- **What is the exact relationship between `pnpm workspace (packages: web)` and `Tech Stack (pnpm, Next.js 16, ASP.NET 10, PostgreSQL, Azure)`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._