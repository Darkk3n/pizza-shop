# Graph Report - pizza-shop  (2026-10-26)

## Corpus Check
- 246 files · ~71,409 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 7 file(s) not represented in the graph (top: (none) 3, .example 2, .ico 1)

## Summary
- 2081 nodes · 5237 edges · 159 communities (61 shown, 98 thin omitted)
- Extraction: 96% EXTRACTED · 4% INFERRED · 0% AMBIGUOUS · INFERRED: 197 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `a44f4fc9`
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
- inventory/actions.ts
- TestApi
- .BuildModel
- .AddPizzaShopAuth
- .TransformAsync
- OrderItem
- RecipeForm.tsx
- .CreateIngredientAsync
- .PlaceAsync
- .Price
- CurrentUserDto.cs
- pizzashop_api_models
- NavLinks.tsx
- OrderIngredientUsage
- StatisticsCalculatorTests
- PizzaShopContext.cs
- IngredientFormDialog
- Recipe
- api/menu.ts
- .ReadProblemAsync
- .RoleChange_AppliesAfterRefresh_NotBefore
- AddMenuActiveAndOrderCancellation
- microsoft_entityframeworkcore
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
- AddRecipeItemUniqueIndex
- AddOrdersCreatedAtIndex
- CustomerHome.tsx
- AddOrdersCancelledAtIndex
- orders/[id]/page.tsx
- TestDatabase
- format.ts
- OrderStatus
- devDependencies
- scripts
- eslint.config.mjs
- .AddPizzaShopRateLimiting
- users/page.tsx
- next
- IdentityEmailSender
- callApi
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
7. `Order` - 30 edges
8. `Ingredient` - 28 edges
9. `PizzaShop.Api.Models` - 27 edges
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

## Communities (159 total, 98 thin omitted)

### Community 0 - "Pizza Shop POS README"
Cohesion: 0.12
Nodes (19): Ingredients table, OrderItems table, OrderItemToppings table, Orders table, Pizza Customizer (size, crust, fractional toppings), Pizza Shop POS, PizzaSizes table, RecipeItems table (+11 more)

### Community 1 - "web/package.json"
Cohesion: 0.12
Nodes (16): class-variance-authority, cn, next-themes, radix-ui, react-dom, shadcn, tailwindcss, @tailwindcss/turbopack (+8 more)

### Community 2 - "IngredientFormDialog.tsx"
Cohesion: 0.14
Nodes (10): sonner, PRESET_LABELS, MODE_CHOICES, MODE_COPY, FIELDS, IngredientFormDialogProps, STATUS_CHOICES, TOPPING_CHOICES (+2 more)

### Community 3 - "compilerOptions"
Cohesion: 0.11
Nodes (18): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+10 more)

### Community 4 - "IngredientAdminActions.tsx"
Cohesion: 0.14
Nodes (3): DeleteIngredientDialogProps, UserMenu(), UserMenuProps

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
Nodes (27): GET(), problemJson(), GET(), problemJson(), findOrder(), getOrderFeed(), listActiveOrders(), ORDERS_PAGE_SIZE (+19 more)

### Community 13 - "ApiFactory"
Cohesion: 0.08
Nodes (11): HealthTests, ApiCollection, ApiFactory, Emails, Environment, Settings, DevelopmentApiFactory, Environment (+3 more)

### Community 14 - "system_componentmodel_dataannotations"
Cohesion: 0.09
Nodes (11): AdjustIngredientStockRequest, CreatePizzaSizeRequest, CreateRecipeRequest, CreateUnitOfMeasureRequest, QuoteOrderRequest, RecipeItemRequest, UpdateIngredientRequest, UpdatePizzaSizeRequest (+3 more)

### Community 15 - "MigrationBuilder"
Cohesion: 0.11
Nodes (4): InitialCreate, AddIdentity, ConfirmExistingUserEmails, AddOrdersStatusIndex

### Community 16 - "orders/page.tsx"
Cohesion: 0.11
Nodes (27): InventoryTableProps, View, VIEWS, hrefForPage(), metadata, MyOrdersPage(), MyOrdersSkeleton(), MyOrdersTable() (+19 more)

### Community 20 - "PizzaShopContext"
Cohesion: 0.09
Nodes (11): PizzaShopContext, DataProtectionKeys, Ingredients, OrderIngredientUsages, OrderItems, OrderItemToppings, Orders, PizzaSizes (+3 more)

### Community 21 - "Order"
Cohesion: 0.07
Nodes (20): Order, CancellationReason, CancelledAt, CancelledBy, CancelledByUserId, CreatedAt, IdempotencyKey, IngredientUsages (+12 more)

### Community 23 - ".UpdateRoles"
Cohesion: 0.07
Nodes (15): CancelledOrderFeedItemDto, OrderDto, OrderFeedDto, OrderFeedItemDto, OrderItemDto, OrderItemToppingDto, OrderMapper, OrderSummaryDto (+7 more)

### Community 24 - ".Update"
Cohesion: 0.08
Nodes (9): DevelopmentSeeder, RecipesEndpoints, RecipeItem, Amount, Ingredient, IngredientId, Recipe, RecipeId (+1 more)

### Community 26 - "AuthExtensions.cs"
Cohesion: 0.09
Nodes (7): RateLimitPolicies, OrderOptions, TaxRate, StatisticsOptions, TimeZone, PizzaShop.Api.Email, PizzaShop.Api.Options

### Community 28 - "auth/actions.ts"
Cohesion: 0.11
Nodes (32): Credentials, credentialsSchema, EmailOnlyInput, emailOnlySchema, emailSchema, LoginResponse, loginResponseSchema, mismatch (+24 more)

### Community 31 - ".Update"
Cohesion: 0.14
Nodes (3): IngredientDto, IngredientMapper, IngredientsEndpoints

### Community 32 - "inventory/actions.ts"
Cohesion: 0.17
Nodes (30): zod, idempotencyKeySchema, placeOrder(), adjustStock(), createIngredient(), deleteIngredient(), ingredientIdSchema, updateIngredient() (+22 more)

### Community 38 - "TestApi"
Cohesion: 0.14
Nodes (4): TestApi, Emails, TestUser, RateLimitingTests

### Community 40 - ".AddPizzaShopAuth"
Cohesion: 0.06
Nodes (4): AuthExtensions, CorsExtensions, ForwardedHeadersExtensions, PizzaShop.Api.Extensions

### Community 42 - "OrderItem"
Cohesion: 0.12
Nodes (13): OrderItem, ItemNameSnapshot, LineTotal, Order, OrderId, OrderItemId, PizzaSize, PizzaSizeId (+5 more)

### Community 44 - "RecipeForm.tsx"
Cohesion: 0.21
Nodes (11): blankItem(), FieldMessage(), RecipeForm(), RecipeFormProps, STATUS_CHOICES, NativeSelect(), NativeSelectOption(), NativeSelectProps (+3 more)

### Community 46 - ".PlaceAsync"
Cohesion: 0.33
Nodes (3): CancelOrderRequest, UpdateOrderStatusRequest, CancellationTests

### Community 47 - ".Price"
Cohesion: 0.15
Nodes (5): PizzaSize, Name, PizzaSizeId, PriceMultiplier, OrderCalculator

### Community 50 - "pizzashop_api_models"
Cohesion: 0.21
Nodes (3): PizzaShop.Api.Tests, PizzaShop.Api.Orders, PizzaShop.Api.Tests.Infrastructure

### Community 51 - "NavLinks.tsx"
Cohesion: 0.05
Nodes (62): AppLayout(), AuthLayout(), geistMono, geistSans, metadata, AppShell(), AppShellProps, Brand() (+54 more)

### Community 52 - "OrderIngredientUsage"
Cohesion: 0.25
Nodes (7): OrderIngredientUsage, Amount, Ingredient, IngredientId, Order, OrderId, OrderIngredientUsageId

### Community 53 - "StatisticsCalculatorTests"
Cohesion: 0.07
Nodes (23): CancellationsByRoleDto, CancellationStatisticsDto, CancelledOrderDto, CancelledSummaryDto, IngredientUsageDto, IngredientUsageStatisticsDto, ItemStatisticsDto, RestockProjectionDto (+15 more)

### Community 54 - "PizzaShopContext.cs"
Cohesion: 0.15
Nodes (3): Policies, AppUser, PizzaShop.Api.Auth

### Community 55 - "IngredientFormDialog"
Cohesion: 0.24
Nodes (11): AdjustStockDialog(), DeleteIngredientDialog(), IngredientAdminActions(), NewIngredientButton(), defaultsFor(), FieldMessage(), IngredientFormDialog(), InventoryTable() (+3 more)

### Community 57 - "Recipe"
Cohesion: 0.15
Nodes (8): Recipe, BasePrice, IsActive, Name, RecipeId, RecipeItems, OrderItemToppingRequest, OrderCalculatorTests

### Community 58 - "api/menu.ts"
Cohesion: 0.13
Nodes (22): RFC-9457, POST(), problemJson(), Builder(), BuilderPage(), BuilderSkeleton(), metadata, listPizzaSizes() (+14 more)

### Community 62 - ".RoleChange_AppliesAfterRefresh_NotBefore"
Cohesion: 0.33
Nodes (3): UpdateUserRolesRequest, LoginResponse, UsersTests

### Community 64 - "microsoft_entityframeworkcore"
Cohesion: 0.18
Nodes (4): PizzaShop.Api.Models, PizzaShop.Api.Db, PizzaShop.Api.Dtos, PizzaShop.Api.Endpoints

### Community 68 - "RegisterForm.tsx"
Cohesion: 0.17
Nodes (22): @hookform/resolvers, react-hook-form, FIELDS, ForgotPasswordForm(), ForgotPasswordPage(), FIELDS, LoginForm(), LoginPage() (+14 more)

### Community 69 - "EmailOptions"
Cohesion: 0.10
Nodes (16): SmtpEmailDelivery, EmailOptions, FromAddress, FromName, Smtp, WebBaseUrl, SmtpOptions, Host (+8 more)

### Community 71 - ".Update"
Cohesion: 0.05
Nodes (11): PizzaSizeDto, PizzaSizeMapper, RecipeDto, RecipeItemDto, RecipeMapper, ToppingDto, ToppingMapper, UnitOfMeasureDto (+3 more)

### Community 73 - "schemas/ingredients.ts"
Cohesion: 0.14
Nodes (16): checkTopping(), hasTwoDecimals, IngredientForm, ingredientFormSchema, ingredientFormShape, newIngredientFormSchema, optionalNumber, quantity (+8 more)

### Community 74 - "PizzaBuilder.tsx"
Cohesion: 0.08
Nodes (34): CartView(), ORDER_TYPE_CHOICES, CartPage(), metadata, AMOUNT_CHOICES, COVERAGE_CHOICES, PizzaBuilder(), PizzaBuilderProps (+26 more)

### Community 77 - "Ingredient"
Cohesion: 0.12
Nodes (14): INamedEntity, Name, Ingredient, CurrentStock, IngredientId, IsActive, Name, ToppingPortion (+6 more)

### Community 78 - "dependencies"
Cohesion: 0.13
Nodes (15): dependencies, class-variance-authority, cn, @hookform/resolvers, lucide-react, next, next-themes, radix-ui (+7 more)

### Community 80 - "OrderItemTopping"
Cohesion: 0.11
Nodes (17): ToppingAmount, Extra, Light, Standard, ToppingCoverage, LeftHalf, RightHalf, Whole (+9 more)

### Community 91 - "CustomerHome.tsx"
Cohesion: 0.14
Nodes (23): MenuPage(), metadata, RecipeGrid(), RecipeGridSkeleton(), Home(), HomeForRole(), metadata, StaffDashboard() (+15 more)

### Community 95 - "orders/[id]/page.tsx"
Cohesion: 0.24
Nodes (15): lucide-react, metadata, MyOrder(), MyOrderPage(), MyOrderSkeleton(), Detail(), metadata, OrderDetail() (+7 more)

### Community 103 - "format.ts"
Cohesion: 0.09
Nodes (30): OrderActions(), OrderActionsProps, reportFailure(), ActiveOrderCard(), AdvanceOrderButton(), AdvanceOrderButtonProps, LABELS, ElapsedTime() (+22 more)

### Community 105 - "OrderStatus"
Cohesion: 0.12
Nodes (12): OrderStatus, Cancelled, Completed, Pending, Preparing, Ready, OrderType, Delivery (+4 more)

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
Cohesion: 0.17
Nodes (5): RateLimitingExtensions, RateLimitingOptions, AuthPerMinute, OrderCreatePerMinute, UserPerMinute

### Community 126 - "users/page.tsx"
Cohesion: 0.15
Nodes (20): hrefFor(), metadata, ROLE_BADGE_CLASSES, SearchForm(), UsersPage(), UsersTable(), UsersTableSkeleton(), ROLE_LABELS (+12 more)

### Community 127 - "next"
Cohesion: 0.12
Nodes (19): next, react, Confirmation(), ConfirmEmailPage(), metadata, metadata, metadata, metadata (+11 more)

### Community 132 - "callApi"
Cohesion: 0.21
Nodes (14): getClientIp(), apiBaseUrl(), callApi(), callApiJson(), CallApiOptions, readApiError(), confirmLinkSchema, identityFailure() (+6 more)

### Community 133 - "currentUser.ts"
Cohesion: 0.15
Nodes (22): server-only, Inventory(), InventoryPage(), InventorySkeleton(), metadata, DeleteRecipeDialog(), EditRecipe(), EditRecipePage() (+14 more)

### Community 134 - "EmailMessage"
Cohesion: 0.11
Nodes (4): Roles, EmailMessage, IEmailDelivery, RecordingEmailDelivery

### Community 137 - "analytics/page.tsx"
Cohesion: 0.08
Nodes (51): AnalyticsPage(), CancellationsSection(), Empty(), Filters(), ItemsSection(), metadata, readQuery(), RestockSection() (+43 more)

## Ambiguous Edges - Review These
- `pnpm workspace (packages: web)` → `Tech Stack (pnpm, Next.js 16, ASP.NET 10, PostgreSQL, Azure)`  [AMBIGUOUS]
  pnpm-workspace.yaml · relation: conceptually_related_to

## Knowledge Gaps
- **163 isolated node(s):** `class-variance-authority`, `next-themes`, `radix-ui`, `react-dom`, `shadcn` (+158 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 737 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **98 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `PizzaShop.Api.Dtos` connect `microsoft_entityframeworkcore` to `.Update`, `CurrentUserDto.cs`, `pizzashop_api_models`, `OrdersEndpoints.cs`, `StatisticsCalculatorTests`, `.UpdateRoles`, `.Update`?**
  _High betweenness centrality (0.029) - this node is a cross-community bridge._
- **What connects `class-variance-authority`, `next-themes`, `radix-ui` to the rest of the system?**
  _163 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Pizza Shop POS README` be split into smaller, more focused modules?**
  _Cohesion score 0.1164021164021164 - nodes in this community are weakly interconnected._
- **Why does `Ingredient` connect `Ingredient` to `microsoft_entityframeworkcore`, `.Price`, `OrderItemTopping`, `PizzaShopContext`, `OrderIngredientUsage`, `Recipe`, `.Update`?**
  _High betweenness centrality (0.025) - this node is a cross-community bridge._
- **Should `web/package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.11764705882352941 - nodes in this community are weakly interconnected._
- **Why does `PizzaShop.Api.Models` connect `microsoft_entityframeworkcore` to `.Update`, `OrderStatus`, `Ingredient`, `system_componentmodel_dataannotations`, `pizzashop_api_models`, `PizzaShopContext.cs`, `.UpdateRoles`, `.Update`?**
  _High betweenness centrality (0.025) - this node is a cross-community bridge._

### Low-confidence Hints
_AMBIGUOUS edges — the extractor was unsure. Verify before acting on these._

- **What is the exact relationship between `pnpm workspace (packages: web)` and `Tech Stack (pnpm, Next.js 16, ASP.NET 10, PostgreSQL, Azure)`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._