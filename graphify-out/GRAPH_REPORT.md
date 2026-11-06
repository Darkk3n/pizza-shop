# Graph Report - pizza-shop  (2026-11-05)

## Corpus Check
- 282 files · ~114,089 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 7 file(s) not represented in the graph (top: (none) 3, .example 2, .ico 1)

## Summary
- 2280 nodes · 5907 edges · 179 communities (74 shown, 105 thin omitted)
- Extraction: 96% EXTRACTED · 4% INFERRED · 0% AMBIGUOUS · INFERRED: 213 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `a15c5150`
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
- microsoft_entityframeworkcore
- MigrationBuilder
- client.ts
- web_components_ui_button
- PizzaShopContext
- Order
- PizzaShop.Api.Migrations
- .Update
- .Update
- my-orders/page.tsx
- .Create
- welcome/page.tsx
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
- apiJson
- PizzaShop.Api.Email
- PizzaShop.Api.Dtos
- (app)/layout.tsx
- OrderIngredientUsage
- StatisticsCalculatorTests
- EmailTests
- PizzaBuilder.tsx
- Recipe
- OrderItemTopping
- .ReadProblemAsync
- OrderFeed.tsx
- TestApi
- AppShell.tsx
- OrdersEndpoints.cs
- .Update
- EmailOptions
- recipes/actions.ts
- currentUser.ts
- .NewUserAsync
- schemas/ingredients.ts
- .NameTakenAsync
- CustomerHome.tsx
- Ingredient
- NavLinks.tsx
- AddIngredientToppingFields
- .GetMenu
- AddOrderIdempotencyKey
- AccountEmails
- IngredientFormDialog.tsx
- dependencies
- problem.ts
- IngredientAdminActions.tsx
- app/layout.tsx
- format.ts
- InventoryTable.tsx
- .Price
- MenuSections.tsx
- privacy/page.tsx
- devDependencies
- (app)/page.tsx
- OrderStatus
- IEmailDelivery
- .OrderCreation_IsLimitedPerUser_ReadsAreNot
- siteUrl
- scripts
- UserDto
- eslint.config.mjs
- next
- .Anonymous_SeesActiveItemsOnly_WithoutAmountsOrStock
- IdentityEmailSender
- recipes/[id]/page.tsx
- RecordingEmailDelivery
- .AdminAsync
- analytics/page.tsx
- .UpdateRoles
- ForwardedHeadersExtensions.cs
- react

## God Nodes (most connected - your core abstractions)
1. `next` - 72 edges
2. `react` - 64 edges
3. `formatMoney()` - 37 edges
4. `requireAdmin()` - 34 edges
5. `apiJson()` - 32 edges
6. `PizzaShopContext` - 31 edges
7. `FormAlert()` - 31 edges
8. `Order` - 30 edges
9. `invalidInput()` - 29 edges
10. `Ingredient` - 27 edges

## Surprising Connections (you probably didn't know these)
- `FailingDelivery` --implements--> `IEmailDelivery`  [EXTRACTED]
  Tests/PizzaShop.Api.Tests/AccountEmailsTests.cs → api/Email/EmailMessage.cs
- `RecordingEmailDelivery` --implements--> `IEmailDelivery`  [EXTRACTED]
  Tests/PizzaShop.Api.Tests/Infrastructure/RecordingEmailDelivery.cs → api/Email/EmailMessage.cs
- `OrderCalculatorTests` --references--> `PizzaSize`  [EXTRACTED]
  Tests/PizzaShop.Api.Tests/OrderCalculatorTests.cs → api/Models/PizzaSize.cs
- `Next.js Agent Rules (breaking-change docs warning)` --conceptually_related_to--> `Frontend Conventions (Server Components, Zod, feature hooks)`  [INFERRED]
  web/AGENTS.md → CLAUDE.md
- `ActiveOrderCard()` --indirect_call--> `describeTopping()`  [INFERRED]
  web/components/dashboard/ActiveOrderCard.tsx → web/lib/helpers/format.ts

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Order creation inventory deduction flow** — claude_inventory_deduction, claude_orderitems, claude_orderitemtoppings, claude_recipeitems, claude_ingredients [EXTRACTED 1.00]
- **Local dev database setup** — readme_pnpm_scripts, readme_env_example, readme_podman_compose, docker_compose_postgres, docker_compose_postgres_data [INFERRED 0.85]
- **Price snapshot pattern for historical stability** — claude_price_stability, claude_orderitems, claude_orderitemtoppings, claude_orders [INFERRED 0.85]
- **create-next-app Default Boilerplate Assets (currently unused)** — web_public_file_file_icon, web_public_globe_globe_icon, web_public_next_next_js_wordmark, web_public_vercel_vercel_logo, web_public_window_window_icon [INFERRED 0.85]

## Communities (179 total, 105 thin omitted)

### Community 0 - "Pizza Shop POS README"
Cohesion: 0.12
Nodes (19): Ingredients table, OrderItems table, OrderItemToppings table, Orders table, Pizza Customizer (size, crust, fractional toppings), Pizza Shop POS, PizzaSizes table, RecipeItems table (+11 more)

### Community 1 - "web/package.json"
Cohesion: 0.12
Nodes (15): class-variance-authority, cn, radix-ui, react-dom, shadcn, tailwindcss, @tailwindcss/turbopack, tw-animate-css (+7 more)

### Community 2 - "PizzaSizeFormDialog.tsx"
Cohesion: 0.12
Nodes (15): PRESET_LABELS, FieldMessage(), defaultsFor(), FIELDS, PizzaSizeFormDialog(), PizzaSizeFormDialogProps, STATUS_CHOICES, FIELDS (+7 more)

### Community 3 - "compilerOptions"
Cohesion: 0.11
Nodes (18): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+10 more)

### Community 4 - "PizzaSizesTable.tsx"
Cohesion: 0.09
Nodes (17): CatalogTabsProps, DeleteCatalogItemDialog(), EXAMPLE_SMALL_PRICE, multiplier, PizzaSizeActions(), PizzaSizesTable(), CATALOG_TABS, CatalogTab (+9 more)

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
Nodes (36): GET(), problemJson(), GET(), problemJson(), FILTERS, hrefFor(), metadata, OrdersPage() (+28 more)

### Community 13 - "ApiFactory"
Cohesion: 0.06
Nodes (13): HealthTests, ApiCollection, ApiFactory, Emails, Environment, Settings, DevelopmentApiFactory, Environment (+5 more)

### Community 14 - "microsoft_entityframeworkcore"
Cohesion: 0.07
Nodes (11): AppUser, AdjustIngredientStockRequest, CancelOrderRequest, CreateIngredientRequest, CreatePizzaSizeRequest, QuoteOrderRequest, UpdateIngredientRequest, UpdateUnitOfMeasureRequest (+3 more)

### Community 15 - "MigrationBuilder"
Cohesion: 0.04
Nodes (9): InitialCreate, AddRecipeItemUniqueIndex, AddIdentity, AddMenuActiveAndOrderCancellation, AddOrdersCreatedAtIndex, ConfirmExistingUserEmails, AddOrdersStatusIndex, AddOrdersCancelledAtIndex (+1 more)

### Community 16 - "client.ts"
Cohesion: 0.14
Nodes (19): server-only, ApiFetchOptions, getClientIp(), withSession(), apiBaseUrl(), callApi(), callApiJson(), CallApiOptions (+11 more)

### Community 19 - "web_components_ui_button"
Cohesion: 0.19
Nodes (20): @hookform/resolvers, react-hook-form, DeleteIngredientDialog(), FIELDS, ForgotPasswordForm(), ForgotPasswordPage(), FIELDS, LoginForm() (+12 more)

### Community 20 - "PizzaShopContext"
Cohesion: 0.09
Nodes (11): PizzaShopContext, DataProtectionKeys, Ingredients, OrderIngredientUsages, OrderItems, OrderItemToppings, Orders, PizzaSizes (+3 more)

### Community 21 - "Order"
Cohesion: 0.07
Nodes (20): Order, CancellationReason, CancelledAt, CancelledBy, CancelledByUserId, CreatedAt, IdempotencyKey, IngredientUsages (+12 more)

### Community 23 - ".Update"
Cohesion: 0.05
Nodes (21): CancelledOrderFeedItemDto, OrderDto, OrderFeedDto, OrderFeedItemDto, OrderItemDto, OrderItemToppingDto, OrderMapper, OrderSummaryDto (+13 more)

### Community 24 - ".Update"
Cohesion: 0.08
Nodes (9): DevelopmentSeeder, RecipesEndpoints, RecipeItem, Amount, Ingredient, IngredientId, Recipe, RecipeId (+1 more)

### Community 26 - "my-orders/page.tsx"
Cohesion: 0.14
Nodes (23): lucide-react, metadata, MyOrder(), MyOrderPage(), MyOrderSkeleton(), hrefForPage(), metadata, MyOrdersPage() (+15 more)

### Community 27 - ".Create"
Cohesion: 0.10
Nodes (3): OrderCatalog, OrdersEndpoints, OrderStatusNames

### Community 28 - "welcome/page.tsx"
Cohesion: 0.13
Nodes (23): AuthLayout(), Forbidden(), AboutPage(), FAQ, metadata, metadata, PublicLayout(), metadata (+15 more)

### Community 31 - ".Update"
Cohesion: 0.10
Nodes (8): PizzaSizeDto, PizzaSizeMapper, PizzaSizesEndpoints, PizzaSize, IsActive, Name, PizzaSizeId, PriceMultiplier

### Community 32 - "requireAdmin"
Cohesion: 0.27
Nodes (22): createPizzaSize(), createUnitOfMeasure(), deletePizzaSize(), deleteUnitOfMeasure(), idSchema, send(), updatePizzaSize(), updateUnitOfMeasure() (+14 more)

### Community 38 - "auth/actions.ts"
Cohesion: 0.11
Nodes (27): Credentials, credentialsSchema, EmailOnlyInput, emailOnlySchema, emailSchema, loginResponseSchema, mismatch, newPasswordSchema (+19 more)

### Community 42 - "OrderItem"
Cohesion: 0.12
Nodes (13): OrderItem, ItemNameSnapshot, LineTotal, Order, OrderId, OrderItemId, PizzaSize, PizzaSizeId (+5 more)

### Community 44 - "proxy.ts"
Cohesion: 0.19
Nodes (16): LoginResponse, ACCESS_COOKIE, ACCESS_EXPIRES_COOKIE, cookieOptions, REFRESH_COOKIE, SESSION_COOKIES, sessionCookieValues(), setSessionCookies() (+8 more)

### Community 45 - ".CreateIngredientAsync"
Cohesion: 0.18
Nodes (5): CreateRecipeRequest, CreateUnitOfMeasureRequest, RecipeItemRequest, UpdateRecipeRequest, CatalogTests

### Community 46 - ".PlaceAsync"
Cohesion: 0.34
Nodes (3): UpdateOrderStatusRequest, CancellationTests, TestUser

### Community 47 - "apiJson"
Cohesion: 0.24
Nodes (14): POST(), problemJson(), Builder(), BuilderPage(), BuilderSkeleton(), metadata, apiJson(), getRecipe() (+6 more)

### Community 48 - "PizzaShop.Api.Email"
Cohesion: 0.09
Nodes (10): OrderOptions, TaxRate, RateLimitingOptions, AuthPerMinute, OrderCreatePerMinute, UserPerMinute, StatisticsOptions, TimeZone (+2 more)

### Community 50 - "PizzaShop.Api.Dtos"
Cohesion: 0.12
Nodes (6): CurrentUserDto, PizzaShop.Api.Dtos, PizzaShop.Api.Tests, PizzaShop.Api.Orders, PizzaShop.Api.Tests.Infrastructure, LoginResponse

### Community 51 - "(app)/layout.tsx"
Cohesion: 0.21
Nodes (14): AppLayout(), NavLinks(), NavLinksSkeleton(), RoleNav(), SessionUserMenu(), StaffOrderFeed(), UserMenu(), CartButton() (+6 more)

### Community 52 - "OrderIngredientUsage"
Cohesion: 0.25
Nodes (7): OrderIngredientUsage, Amount, Ingredient, IngredientId, Order, OrderId, OrderIngredientUsageId

### Community 53 - "StatisticsCalculatorTests"
Cohesion: 0.06
Nodes (23): CancellationsByRoleDto, CancellationStatisticsDto, CancelledOrderDto, CancelledSummaryDto, IngredientUsageDto, IngredientUsageStatisticsDto, ItemStatisticsDto, RestockProjectionDto (+15 more)

### Community 55 - "PizzaBuilder.tsx"
Cohesion: 0.10
Nodes (32): CartView(), ORDER_TYPE_CHOICES, CartPage(), metadata, AMOUNT_CHOICES, COVERAGE_CHOICES, PizzaBuilder(), PizzaBuilderProps (+24 more)

### Community 57 - "Recipe"
Cohesion: 0.15
Nodes (8): Recipe, BasePrice, IsActive, Name, RecipeId, RecipeItems, OrderItemToppingRequest, OrderCalculatorTests

### Community 58 - "OrderItemTopping"
Cohesion: 0.14
Nodes (13): ToppingAmount, Extra, Light, Standard, OrderItemTopping, Coverage, ExtraAmount, Ingredient (+5 more)

### Community 61 - "OrderFeed.tsx"
Cohesion: 0.27
Nodes (15): OrderFeed(), enableAndPreview(), getContext(), isSoundEnabled(), isSoundEnabledOnServer(), listeners, NOTES, OrderSound (+7 more)

### Community 62 - "TestApi"
Cohesion: 0.13
Nodes (3): TestApi, Emails, UsersTests

### Community 63 - "AppShell.tsx"
Cohesion: 0.23
Nodes (15): AppShell(), AppShellProps, Brand(), CloseIcon(), MenuIcon(), ShellContext, getCollapsed(), getIsDesktop() (+7 more)

### Community 64 - "OrdersEndpoints.cs"
Cohesion: 0.12
Nodes (5): Policies, RateLimitPolicies, PizzaShop.Api.Auth, PizzaShop.Api.Db, PizzaShop.Api.Endpoints

### Community 68 - ".Update"
Cohesion: 0.13
Nodes (3): IngredientDto, IngredientMapper, IngredientsEndpoints

### Community 69 - "EmailOptions"
Cohesion: 0.10
Nodes (16): SmtpEmailDelivery, EmailOptions, FromAddress, FromName, Smtp, WebBaseUrl, SmtpOptions, Host (+8 more)

### Community 70 - "recipes/actions.ts"
Cohesion: 0.17
Nodes (12): recipeIdSchema, PizzaSizeForm, pizzaSizeFormSchema, pizzaSizeSchema, Recipe, recipeSchema, Topping, toppingSchema (+4 more)

### Community 71 - "currentUser.ts"
Cohesion: 0.24
Nodes (12): placeOrder(), advanceStatus(), cancelOrder(), orderFailure(), orderIdSchema, AdminOnly(), StaffOnly(), currentUserSchema (+4 more)

### Community 73 - "schemas/ingredients.ts"
Cohesion: 0.14
Nodes (16): checkTopping(), hasTwoDecimals, IngredientForm, ingredientFormSchema, ingredientFormShape, ingredientSchema, newIngredientFormSchema, optionalNumber (+8 more)

### Community 76 - "CustomerHome.tsx"
Cohesion: 0.26
Nodes (13): MenuPage(), metadata, RecipeGrid(), RecipeGridSkeleton(), Available, CustomerHome(), Highlights(), InProgress() (+5 more)

### Community 77 - "Ingredient"
Cohesion: 0.12
Nodes (14): INamedEntity, Name, Ingredient, CurrentStock, IngredientId, IsActive, Name, ToppingPortion (+6 more)

### Community 78 - "NavLinks.tsx"
Cohesion: 0.24
Nodes (12): AnalyticsIcon(), DashboardIcon(), Icon(), IconProps, InventoryIcon(), OrdersIcon(), RecipesIcon(), isActive() (+4 more)

### Community 80 - ".GetMenu"
Cohesion: 0.21
Nodes (5): PublicMenuDto, PublicRecipeDto, PublicSizeDto, PublicToppingDto, PublicEndpoints

### Community 83 - "AccountEmails"
Cohesion: 0.16
Nodes (3): AccountEmails, AccountEmailsTests, FailingDelivery

### Community 87 - "IngredientFormDialog.tsx"
Cohesion: 0.14
Nodes (19): defaultsFor(), FieldMessage(), FIELDS, IngredientFormDialog(), IngredientFormDialogProps, STATUS_CHOICES, TOPPING_CHOICES, blankItem() (+11 more)

### Community 90 - "dependencies"
Cohesion: 0.13
Nodes (15): dependencies, class-variance-authority, cn, @hookform/resolvers, lucide-react, next, next-themes, radix-ui (+7 more)

### Community 91 - "problem.ts"
Cohesion: 0.14
Nodes (17): RFC-9457, zod, idempotencyKeySchema, userIdSchema, describeApiError(), lowerFirst(), Problem, problemSchema (+9 more)

### Community 92 - "IngredientAdminActions.tsx"
Cohesion: 0.28
Nodes (3): sonner, DeleteCatalogItemDialogProps, DeleteIngredientDialogProps

### Community 95 - "app/layout.tsx"
Cohesion: 0.18
Nodes (8): next-themes, geistMono, geistSans, metadata, RootLayout(), ThemeProvider(), SIDEBAR_STORAGE_KEY, sidebarInitScript

### Community 96 - "format.ts"
Cohesion: 0.08
Nodes (29): metadata, RecipesPage(), RecipesTable(), RecipesTableSkeleton(), hrefFor(), metadata, ROLE_BADGE_CLASSES, SearchForm() (+21 more)

### Community 98 - "InventoryTable.tsx"
Cohesion: 0.24
Nodes (12): AdjustStockDialog(), IngredientAdminActions(), NewIngredientButton(), InventoryTable(), InventoryTableProps, isOut(), View, VIEWS (+4 more)

### Community 100 - "MenuSections.tsx"
Cohesion: 0.38
Nodes (9): metadata, PublicMenuPage(), fromPrice(), FullMenu(), loadMenu(), PopularPizzas(), RecipeGrid(), RecipeGridSkeleton() (+1 more)

### Community 101 - "privacy/page.tsx"
Cohesion: 0.24
Nodes (4): metadata, PrivacyPage(), TermsPage(), PlaceholderNotice()

### Community 103 - "devDependencies"
Cohesion: 0.20
Nodes (10): devDependencies, eslint, eslint-config-next, shadcn, tailwindcss, @tailwindcss/turbopack, @types/node, @types/react (+2 more)

### Community 104 - "(app)/page.tsx"
Cohesion: 0.19
Nodes (15): Home(), HomeForRole(), metadata, StaffDashboard(), ActiveOrderCard(), ActiveOrdersBoard(), ActiveOrdersBoardSkeleton(), Column() (+7 more)

### Community 105 - "OrderStatus"
Cohesion: 0.10
Nodes (16): OrderStatus, Cancelled, Completed, Pending, Preparing, Ready, OrderType, Delivery (+8 more)

### Community 112 - "siteUrl"
Cohesion: 0.60
Nodes (3): robots(), sitemap(), siteUrl()

### Community 113 - "scripts"
Cohesion: 0.40
Nodes (5): scripts, build, dev, lint, start

### Community 120 - "eslint.config.mjs"
Cohesion: 0.50
Nodes (3): eslint, eslint-config-next, eslintConfig

### Community 127 - "next"
Cohesion: 0.14
Nodes (18): next, Confirmation(), ConfirmEmailPage(), metadata, metadata, metadata, metadata, metadata (+10 more)

### Community 133 - "recipes/[id]/page.tsx"
Cohesion: 0.15
Nodes (20): CatalogTabs(), Catalog(), CatalogPage(), CatalogSkeleton(), metadata, isCatalogTab(), Inventory(), InventoryPage() (+12 more)

### Community 134 - "RecordingEmailDelivery"
Cohesion: 0.16
Nodes (3): Roles, EmailMessage, RecordingEmailDelivery

### Community 137 - "analytics/page.tsx"
Cohesion: 0.09
Nodes (51): AnalyticsPage(), CancellationsSection(), Empty(), Filters(), ItemsSection(), metadata, readQuery(), RestockSection() (+43 more)

### Community 169 - "ForwardedHeadersExtensions.cs"
Cohesion: 0.20
Nodes (3): CorsExtensions, ForwardedHeadersExtensions, PizzaShop.Api.Extensions

### Community 175 - "react"
Cohesion: 0.18
Nodes (12): react, OrderActions(), OrderActionsProps, reportFailure(), ComingSoonProps, AdvanceOrderButton(), AdvanceOrderButtonProps, CancelOrderDialog() (+4 more)

## Ambiguous Edges - Review These
- `pnpm workspace (packages: web)` → `Tech Stack (pnpm, Next.js 16, ASP.NET 10, PostgreSQL, Azure)`  [AMBIGUOUS]
  pnpm-workspace.yaml · relation: conceptually_related_to

## Knowledge Gaps
- **163 isolated node(s):** `Days`, `RFC-9457`, `class-variance-authority`, `radix-ui`, `react-dom` (+158 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 803 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **105 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `next` connect `next` to `web/package.json`, `PizzaSizeFormDialog.tsx`, `recipes/[id]/page.tsx`, `analytics/page.tsx`, `schemas/orders.ts`, `client.ts`, `web_components_ui_button`, `my-orders/page.tsx`, `welcome/page.tsx`, `requireAdmin`, `auth/actions.ts`, `proxy.ts`, `apiJson`, `PizzaBuilder.tsx`, `OrderFeed.tsx`, `AppShell.tsx`, `recipes/actions.ts`, `currentUser.ts`, `CustomerHome.tsx`, `NavLinks.tsx`, `IngredientFormDialog.tsx`, `problem.ts`, `IngredientAdminActions.tsx`, `app/layout.tsx`, `format.ts`, `MenuSections.tsx`, `privacy/page.tsx`, `(app)/page.tsx`, `siteUrl`?**
  _High betweenness centrality (0.035) - this node is a cross-community bridge._
- **What connects `Days`, `RFC-9457`, `class-variance-authority` to the rest of the system?**
  _163 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Pizza Shop POS README` be split into smaller, more focused modules?**
  _Cohesion score 0.1164021164021164 - nodes in this community are weakly interconnected._
- **Why does `react` connect `react` to `web/package.json`, `PizzaSizeFormDialog.tsx`, `PizzaSizesTable.tsx`, `recipes/[id]/page.tsx`, `analytics/page.tsx`, `schemas/orders.ts`, `web_components_ui_button`, `my-orders/page.tsx`, `welcome/page.tsx`, `apiJson`, `(app)/layout.tsx`, `PizzaBuilder.tsx`, `OrderFeed.tsx`, `AppShell.tsx`, `currentUser.ts`, `CustomerHome.tsx`, `NavLinks.tsx`, `IngredientFormDialog.tsx`, `IngredientAdminActions.tsx`, `app/layout.tsx`, `format.ts`, `InventoryTable.tsx`, `MenuSections.tsx`, `(app)/page.tsx`, `next`?**
  _High betweenness centrality (0.032) - this node is a cross-community bridge._
- **Should `web/package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.125 - nodes in this community are weakly interconnected._
- **Why does `AuthExtensions` connect `.AddPizzaShopAuth` to `OrdersEndpoints.cs`?**
  _High betweenness centrality (0.028) - this node is a cross-community bridge._

### Low-confidence Hints
_AMBIGUOUS edges — the extractor was unsure. Verify before acting on these._

- **What is the exact relationship between `pnpm workspace (packages: web)` and `Tech Stack (pnpm, Next.js 16, ASP.NET 10, PostgreSQL, Azure)`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._