# Graph Report - pizza-shop  (2026-11-05)

## Corpus Check
- 282 files · ~114,176 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 7 file(s) not represented in the graph (top: (none) 3, .example 2, .ico 1)

## Summary
- 2280 nodes · 5906 edges · 188 communities (66 shown, 122 thin omitted)
- Extraction: 96% EXTRACTED · 4% INFERRED · 0% AMBIGUOUS · INFERRED: 212 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `de85cf6f`
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
- OrderDto.cs
- .FromPriced
- PizzaShopContext
- Order
- PizzaShop.Api.Migrations
- .Update
- .Update
- web_components_ui_button
- .Create
- next
- .GetAll
- .Update
- requireAdmin
- auth/actions.ts
- .BuildModel
- .AddPizzaShopAuth
- .TransformAsync
- OrderItem
- PizzaSizeMapper
- .ReadProblemAsync
- .PlaceAsync
- RecipeDto.cs
- PizzaShop.Api.Email
- PizzaShop.Api.Dtos
- (app)/layout.tsx
- OrderIngredientUsage
- StatisticsCalculatorTests
- EmailTests
- PizzaBuilder.tsx
- Ingredient
- OrderItemTopping
- SecurityTests
- OrderFeed.tsx
- TestApi
- AppShell.tsx
- microsoft_entityframeworkcore
- .Update
- EmailOptions
- CatalogTabs.tsx
- ToppingDto.cs
- .NewUserAsync
- schemas/ingredients.ts
- OrderOptions.cs
- CustomerHome.tsx
- UnitOfMeasure
- NavLinks.tsx
- AddIngredientToppingFields
- RateLimitingOptions
- AddOrderIdempotencyKey
- AccountEmails
- RecipeForm.tsx
- dependencies
- users/page.tsx
- InventoryTable.tsx
- app/layout.tsx
- format.ts
- .Price
- MenuSections.tsx
- devDependencies
- OrderStatus
- .OrderCreation_IsLimitedPerUser_ReadsAreNot
- scripts
- UserDto
- eslint.config.mjs
- AppUser.cs
- CartView.tsx
- .Anonymous_SeesActiveItemsOnly_WithoutAmountsOrStock
- IdentityEmailSender
- catalogs/page.tsx
- RecordingEmailDelivery
- .AdminAsync
- analytics/page.tsx
- .UpdateRoles
- RateLimitingExtensions.cs
- react

## God Nodes (most connected - your core abstractions)
1. `next` - 72 edges
2. `react` - 64 edges
3. `formatMoney()` - 37 edges
4. `requireAdmin()` - 34 edges
5. `PizzaShopContext` - 33 edges
6. `apiJson()` - 32 edges
7. `FormAlert()` - 31 edges
8. `invalidInput()` - 29 edges
9. `Order` - 28 edges
10. `TestApi` - 26 edges

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

## Communities (188 total, 122 thin omitted)

### Community 0 - "Pizza Shop POS README"
Cohesion: 0.12
Nodes (19): Ingredients table, OrderItems table, OrderItemToppings table, Orders table, Pizza Customizer (size, crust, fractional toppings), Pizza Shop POS, PizzaSizes table, RecipeItems table (+11 more)

### Community 1 - "web/package.json"
Cohesion: 0.12
Nodes (15): class-variance-authority, cn, radix-ui, react-dom, shadcn, tailwindcss, @tailwindcss/turbopack, tw-animate-css (+7 more)

### Community 2 - "IngredientFormDialog.tsx"
Cohesion: 0.12
Nodes (20): react-hook-form, sonner, PRESET_LABELS, FieldMessage(), FIELDS, PizzaSizeFormDialogProps, STATUS_CHOICES, FIELDS (+12 more)

### Community 3 - "compilerOptions"
Cohesion: 0.11
Nodes (18): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+10 more)

### Community 4 - "PizzaSizesTable.tsx"
Cohesion: 0.14
Nodes (14): DeleteCatalogItemDialog(), defaultsFor(), EXAMPLE_SMALL_PRICE, PizzaSizeFormDialog(), multiplier, PizzaSizeActions(), PizzaSizesTable(), UnitOfMeasureFormDialog() (+6 more)

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
Nodes (41): RFC-9457, GET(), problemJson(), GET(), problemJson(), POST(), problemJson(), idempotencyKeySchema (+33 more)

### Community 13 - "ApiFactory"
Cohesion: 0.06
Nodes (13): HealthTests, ApiCollection, ApiFactory, Emails, Environment, Settings, DevelopmentApiFactory, Environment (+5 more)

### Community 14 - "system_componentmodel_dataannotations"
Cohesion: 0.08
Nodes (10): AdjustIngredientStockRequest, CancelOrderRequest, CreatePizzaSizeRequest, QuoteOrderRequest, UpdateIngredientRequest, UpdateRecipeRequest, UpdateUnitOfMeasureRequest, UpdateUserRolesRequest (+2 more)

### Community 15 - "MigrationBuilder"
Cohesion: 0.07
Nodes (9): InitialCreate, AddRecipeItemUniqueIndex, AddIdentity, AddMenuActiveAndOrderCancellation, AddOrdersCreatedAtIndex, ConfirmExistingUserEmails, AddOrdersStatusIndex, AddOrdersCancelledAtIndex (+1 more)

### Community 16 - "OrderDto.cs"
Cohesion: 0.31
Nodes (9): CancelledOrderFeedItemDto, OrderDto, OrderFeedDto, OrderFeedItemDto, OrderItemDto, OrderItemToppingDto, OrderMapper, OrderSummaryDto (+1 more)

### Community 19 - ".FromPriced"
Cohesion: 0.23
Nodes (4): OrderQuoteDto, OrderQuoteItemDto, OrderQuoteMapper, OrderQuoteToppingDto

### Community 20 - "PizzaShopContext"
Cohesion: 0.09
Nodes (12): PizzaShopContext, DataProtectionKeys, Ingredients, OrderIngredientUsages, OrderItems, OrderItemToppings, Orders, PizzaSizes (+4 more)

### Community 21 - "Order"
Cohesion: 0.08
Nodes (19): Order, CancellationReason, CancelledAt, CancelledBy, CancelledByUserId, CreatedAt, IdempotencyKey, IngredientUsages (+11 more)

### Community 24 - ".Update"
Cohesion: 0.08
Nodes (13): PublicMenuDto, PublicRecipeDto, PublicSizeDto, PublicToppingDto, PublicEndpoints, RecipesEndpoints, RecipeItem, Amount (+5 more)

### Community 26 - "web_components_ui_button"
Cohesion: 0.12
Nodes (29): metadata, MyOrder(), MyOrderPage(), MyOrderSkeleton(), hrefForPage(), metadata, MyOrdersPage(), MyOrdersSkeleton() (+21 more)

### Community 27 - ".Create"
Cohesion: 0.10
Nodes (3): OrderCatalog, OrdersEndpoints, OrderStatusNames

### Community 28 - "next"
Cohesion: 0.08
Nodes (32): next, AuthLayout(), Forbidden(), AboutPage(), FAQ, metadata, metadata, PublicLayout() (+24 more)

### Community 32 - "requireAdmin"
Cohesion: 0.17
Nodes (30): zod, createPizzaSize(), createUnitOfMeasure(), deletePizzaSize(), deleteUnitOfMeasure(), idSchema, send(), updatePizzaSize() (+22 more)

### Community 38 - "auth/actions.ts"
Cohesion: 0.06
Nodes (69): @hookform/resolvers, server-only, FIELDS, FIELDS, LoginForm(), LoginPage(), CheckInbox(), FIELDS (+61 more)

### Community 41 - ".TransformAsync"
Cohesion: 0.12
Nodes (4): BearerSecuritySchemeTransformer, Policies, Roles, PizzaShop.Api.Auth

### Community 42 - "OrderItem"
Cohesion: 0.12
Nodes (13): OrderItem, ItemNameSnapshot, LineTotal, Order, OrderId, OrderItemId, PizzaSize, PizzaSizeId (+5 more)

### Community 44 - "PizzaSizeMapper"
Cohesion: 0.31
Nodes (3): PizzaSizeMapper, UnitOfMeasureDto, UnitOfMeasureMapper

### Community 45 - ".ReadProblemAsync"
Cohesion: 0.17
Nodes (6): PizzaSizeDto, CreateIngredientRequest, CreateRecipeRequest, CreateUnitOfMeasureRequest, RecipeItemRequest, CatalogTests

### Community 46 - ".PlaceAsync"
Cohesion: 0.34
Nodes (3): UpdateOrderStatusRequest, CancellationTests, TestUser

### Community 47 - "RecipeDto.cs"
Cohesion: 0.36
Nodes (3): RecipeDto, RecipeItemDto, RecipeMapper

### Community 50 - "PizzaShop.Api.Dtos"
Cohesion: 0.14
Nodes (6): CurrentUserDto, PizzaShop.Api.Dtos, PizzaShop.Api.Tests, PizzaShop.Api.Orders, PizzaShop.Api.Tests.Infrastructure, LoginResponse

### Community 51 - "(app)/layout.tsx"
Cohesion: 0.22
Nodes (14): AppLayout(), NavLinksSkeleton(), RoleNav(), SessionUserMenu(), StaffOrderFeed(), UserMenu(), CartButton(), CurrentUser (+6 more)

### Community 52 - "OrderIngredientUsage"
Cohesion: 0.25
Nodes (7): OrderIngredientUsage, Amount, Ingredient, IngredientId, Order, OrderId, OrderIngredientUsageId

### Community 53 - "StatisticsCalculatorTests"
Cohesion: 0.06
Nodes (23): CancellationsByRoleDto, CancellationStatisticsDto, CancelledOrderDto, CancelledSummaryDto, IngredientUsageDto, IngredientUsageStatisticsDto, ItemStatisticsDto, RestockProjectionDto (+15 more)

### Community 55 - "PizzaBuilder.tsx"
Cohesion: 0.08
Nodes (35): placeOrder(), CartView(), CartPage(), metadata, AMOUNT_CHOICES, COVERAGE_CHOICES, PizzaBuilder(), PizzaBuilderProps (+27 more)

### Community 57 - "Ingredient"
Cohesion: 0.10
Nodes (17): Ingredient, CurrentStock, IngredientId, IsActive, Name, ToppingPortion, ToppingPrice, UnitOfMeasure (+9 more)

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
Cohesion: 0.20
Nodes (16): AppShell(), AppShellProps, Brand(), CloseIcon(), MenuIcon(), ShellContext, ShellState, getCollapsed() (+8 more)

### Community 68 - ".Update"
Cohesion: 0.14
Nodes (3): IngredientDto, IngredientMapper, IngredientsEndpoints

### Community 69 - "EmailOptions"
Cohesion: 0.10
Nodes (16): SmtpEmailDelivery, EmailOptions, FromAddress, FromName, Smtp, WebBaseUrl, SmtpOptions, Host (+8 more)

### Community 70 - "CatalogTabs.tsx"
Cohesion: 0.12
Nodes (11): CatalogTabsProps, CATALOG_TABS, CatalogTab, PizzaSize, PizzaSizeForm, pizzaSizeFormSchema, pizzaSizeSchema, Recipe (+3 more)

### Community 73 - "schemas/ingredients.ts"
Cohesion: 0.14
Nodes (16): checkTopping(), hasTwoDecimals, IngredientForm, ingredientFormSchema, ingredientFormShape, newIngredientFormSchema, optionalNumber, quantity (+8 more)

### Community 75 - "OrderOptions.cs"
Cohesion: 0.27
Nodes (4): OrderOptions, TaxRate, StatisticsOptions, TimeZone

### Community 76 - "CustomerHome.tsx"
Cohesion: 0.09
Nodes (42): MenuPage(), metadata, RecipeGrid(), RecipeGridSkeleton(), Builder(), BuilderPage(), BuilderSkeleton(), metadata (+34 more)

### Community 77 - "UnitOfMeasure"
Cohesion: 0.29
Nodes (5): INamedEntity, Name, UnitOfMeasure, Name, UnitOfMeasureId

### Community 78 - "NavLinks.tsx"
Cohesion: 0.27
Nodes (12): AnalyticsIcon(), DashboardIcon(), Icon(), IconProps, InventoryIcon(), OrdersIcon(), RecipesIcon(), isActive() (+4 more)

### Community 80 - "RateLimitingOptions"
Cohesion: 0.40
Nodes (4): RateLimitingOptions, AuthPerMinute, OrderCreatePerMinute, UserPerMinute

### Community 87 - "RecipeForm.tsx"
Cohesion: 0.15
Nodes (18): defaultsFor(), FieldMessage(), IngredientFormDialog(), blankItem(), FieldMessage(), RecipeForm(), RecipeFormProps, STATUS_CHOICES (+10 more)

### Community 90 - "dependencies"
Cohesion: 0.13
Nodes (15): dependencies, class-variance-authority, cn, @hookform/resolvers, lucide-react, next, next-themes, radix-ui (+7 more)

### Community 91 - "users/page.tsx"
Cohesion: 0.16
Nodes (18): hrefFor(), metadata, ROLE_BADGE_CLASSES, SearchForm(), UsersPage(), UsersTable(), UsersTableSkeleton(), pagedSchema() (+10 more)

### Community 92 - "InventoryTable.tsx"
Cohesion: 0.14
Nodes (17): lucide-react, DeleteCatalogItemDialogProps, AdjustStockDialog(), DeleteIngredientDialog(), DeleteIngredientDialogProps, IngredientAdminActions(), NewIngredientButton(), InventoryTable() (+9 more)

### Community 95 - "app/layout.tsx"
Cohesion: 0.18
Nodes (8): next-themes, geistMono, geistSans, metadata, RootLayout(), ThemeProvider(), SIDEBAR_STORAGE_KEY, sidebarInitScript

### Community 96 - "format.ts"
Cohesion: 0.08
Nodes (32): OrderActions(), OrderActionsProps, reportFailure(), AdvanceOrderButton(), AdvanceOrderButtonProps, ElapsedTime(), getMinute(), getServerMinute() (+24 more)

### Community 99 - ".Price"
Cohesion: 0.13
Nodes (6): PizzaSize, IsActive, Name, PizzaSizeId, PriceMultiplier, OrderCalculator

### Community 100 - "MenuSections.tsx"
Cohesion: 0.32
Nodes (11): metadata, PublicMenuPage(), RecipeCard(), fromPrice(), FullMenu(), loadMenu(), PopularPizzas(), RecipeGrid() (+3 more)

### Community 103 - "devDependencies"
Cohesion: 0.20
Nodes (10): devDependencies, eslint, eslint-config-next, shadcn, tailwindcss, @tailwindcss/turbopack, @types/node, @types/react (+2 more)

### Community 105 - "OrderStatus"
Cohesion: 0.10
Nodes (16): OrderStatus, Cancelled, Completed, Pending, Preparing, Ready, OrderType, Delivery (+8 more)

### Community 113 - "scripts"
Cohesion: 0.40
Nodes (5): scripts, build, dev, lint, start

### Community 120 - "eslint.config.mjs"
Cohesion: 0.50
Nodes (3): eslint, eslint-config-next, eslintConfig

### Community 127 - "CartView.tsx"
Cohesion: 0.13
Nodes (20): ORDER_TYPE_CHOICES, Confirmation(), ConfirmEmailPage(), metadata, ForgotPasswordForm(), ForgotPasswordPage(), metadata, metadata (+12 more)

### Community 133 - "catalogs/page.tsx"
Cohesion: 0.18
Nodes (17): CatalogTabs(), Catalog(), CatalogPage(), CatalogSkeleton(), metadata, isCatalogTab(), Inventory(), InventoryPage() (+9 more)

### Community 134 - "RecordingEmailDelivery"
Cohesion: 0.15
Nodes (3): EmailMessage, IEmailDelivery, RecordingEmailDelivery

### Community 137 - "analytics/page.tsx"
Cohesion: 0.08
Nodes (54): AnalyticsPage(), CancellationsSection(), Empty(), Filters(), ItemsSection(), metadata, readQuery(), RestockSection() (+46 more)

### Community 169 - "RateLimitingExtensions.cs"
Cohesion: 0.14
Nodes (4): CorsExtensions, ForwardedHeadersExtensions, RateLimitPolicies, PizzaShop.Api.Extensions

## Ambiguous Edges - Review These
- `pnpm workspace (packages: web)` → `Tech Stack (pnpm, Next.js 16, ASP.NET 10, PostgreSQL, Azure)`  [AMBIGUOUS]
  pnpm-workspace.yaml · relation: conceptually_related_to

## Knowledge Gaps
- **163 isolated node(s):** `DataProtectionKeys`, `Ingredients`, `UnitsOfMeasure`, `Orders`, `OrderItems` (+158 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 804 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **122 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `next` connect `next` to `web/package.json`, `IngredientFormDialog.tsx`, `catalogs/page.tsx`, `analytics/page.tsx`, `schemas/orders.ts`, `web_components_ui_button`, `requireAdmin`, `auth/actions.ts`, `PizzaBuilder.tsx`, `OrderFeed.tsx`, `AppShell.tsx`, `CustomerHome.tsx`, `NavLinks.tsx`, `RecipeForm.tsx`, `users/page.tsx`, `InventoryTable.tsx`, `app/layout.tsx`, `MenuSections.tsx`, `CartView.tsx`?**
  _High betweenness centrality (0.038) - this node is a cross-community bridge._
- **What connects `DataProtectionKeys`, `Ingredients`, `UnitsOfMeasure` to the rest of the system?**
  _163 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Pizza Shop POS README` be split into smaller, more focused modules?**
  _Cohesion score 0.1164021164021164 - nodes in this community are weakly interconnected._
- **Why does `PizzaShop.Api.Dtos` connect `PizzaShop.Api.Dtos` to `microsoft_entityframeworkcore`, `.Update`, `ToppingDto.cs`, `PizzaSizeMapper`, `RecipeDto.cs`, `OrderDto.cs`, `.FromPriced`, `UserDto`, `StatisticsCalculatorTests`, `.Update`?**
  _High betweenness centrality (0.025) - this node is a cross-community bridge._
- **Should `web/package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.125 - nodes in this community are weakly interconnected._
- **Why does `react` connect `react` to `web/package.json`, `IngredientFormDialog.tsx`, `PizzaSizesTable.tsx`, `catalogs/page.tsx`, `analytics/page.tsx`, `web_components_ui_button`, `next`, `auth/actions.ts`, `(app)/layout.tsx`, `PizzaBuilder.tsx`, `OrderFeed.tsx`, `AppShell.tsx`, `CustomerHome.tsx`, `NavLinks.tsx`, `RecipeForm.tsx`, `users/page.tsx`, `InventoryTable.tsx`, `app/layout.tsx`, `format.ts`, `MenuSections.tsx`, `CartView.tsx`?**
  _High betweenness centrality (0.024) - this node is a cross-community bridge._

### Low-confidence Hints
_AMBIGUOUS edges — the extractor was unsure. Verify before acting on these._

- **What is the exact relationship between `pnpm workspace (packages: web)` and `Tech Stack (pnpm, Next.js 16, ASP.NET 10, PostgreSQL, Azure)`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._