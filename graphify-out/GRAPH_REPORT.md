# Graph Report - pizza-shop  (2026-10-26)

## Corpus Check
- 207 files · ~52,969 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 6 file(s) not represented in the graph (top: .example 2, (none) 2, .ico 1)

## Summary
- 1702 nodes · 4072 edges · 143 communities (62 shown, 81 thin omitted)
- Extraction: 96% EXTRACTED · 4% INFERRED · 0% AMBIGUOUS · INFERRED: 157 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `cb6d2e40`
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
- system_componentmodel_dataannotations
- MigrationBuilder
- users/page.tsx
- RecipeItem
- PizzaShopContext
- Order
- PizzaShop.Api.Migrations
- .UpdateRoles
- .Update
- RateLimitingExtensions.cs
- .Create
- OrderDto.cs
- .GetAll
- .Update
- auth/actions.ts
- .NewUserAsync
- .BuildModel
- .TransformAsync
- OrderItem
- PizzaShop.Api.Models
- react
- .PlaceAsync
- next
- .Price
- inventory/actions.ts
- .CreateIngredientAsync
- PizzaShop.Api.Dtos
- NavLinks.tsx
- OrderIngredientUsage
- .Sales
- .ReadProblemAsync
- RoleGuard.tsx
- Recipe
- api/menu.ts
- FormAlert
- PizzaBuilder.tsx
- .Update
- TestApi
- OrdersEndpoints.cs
- schemas/orders.ts
- .NameTakenAsync
- schemas/ingredients.ts
- Ingredient
- dependencies
- AddIngredientToppingFields
- .AdminAsync
- AddOrderIdempotencyKey
- orders/[id]/page.tsx
- OrderItemTopping
- devDependencies
- AuthExtensions.cs
- scripts
- eslint.config.mjs
- .AddPizzaShopRateLimiting
- OrderItemToppingRequest
- users/actions.ts
- my-orders/page.tsx
- CurrentUserDto.cs
- .FromPriced
- client.ts
- UpdateRecipeRequest
- IngredientFormDialog
- recipes/[id]/page.tsx
- InitialCreate
- AddMenuActiveAndOrderCancellation
- problem.ts
- currentUser.ts
- .AddClientIpForwarding

## God Nodes (most connected - your core abstractions)
1. `next` - 42 edges
2. `react` - 41 edges
3. `PizzaShopContext` - 32 edges
4. `PizzaShop.Api.Models` - 31 edges
5. `Order` - 31 edges
6. `Ingredient` - 28 edges
7. `TestApi` - 24 edges
8. `Recipe` - 23 edges
9. `apiJson()` - 23 edges
10. `requireAdmin()` - 22 edges

## Surprising Connections (you probably didn't know these)
- `OrderCalculatorTests` --references--> `PizzaSize`  [EXTRACTED]
  Tests/PizzaShop.Api.Tests/OrderCalculatorTests.cs → api/Models/PizzaSize.cs
- `Next.js Agent Rules (breaking-change docs warning)` --conceptually_related_to--> `Frontend Conventions (Server Components, Zod, feature hooks)`  [INFERRED]
  web/AGENTS.md → CLAUDE.md
- `StaffOnly()` --calls--> `requireStaff()`  [EXTRACTED]
  web/components/RoleGuard.tsx → web/lib/auth/currentUser.ts
- `Pizza Shop POS README` --semantically_similar_to--> `Pizza Shop POS`  [INFERRED] [semantically similar]
  README.md → CLAUDE.md
- `Pizza Shop POS README` --references--> `30-minute Session Timeout (production)`  [INFERRED]
  README.md → CLAUDE.md

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Order creation inventory deduction flow** — claude_inventory_deduction, claude_orderitems, claude_orderitemtoppings, claude_recipeitems, claude_ingredients [EXTRACTED 1.00]
- **Local dev database setup** — readme_pnpm_scripts, readme_env_example, readme_podman_compose, docker_compose_postgres, docker_compose_postgres_data [INFERRED 0.85]
- **Price snapshot pattern for historical stability** — claude_price_stability, claude_orderitems, claude_orderitemtoppings, claude_orders [INFERRED 0.85]
- **create-next-app Default Boilerplate Assets (currently unused)** — web_public_file_file_icon, web_public_globe_globe_icon, web_public_next_next_js_wordmark, web_public_vercel_vercel_logo, web_public_window_window_icon [INFERRED 0.85]

## Communities (143 total, 81 thin omitted)

### Community 0 - "Pizza Shop POS README"
Cohesion: 0.12
Nodes (19): Ingredients table, OrderItems table, OrderItemToppings table, Orders table, Pizza Customizer (size, crust, fractional toppings), Pizza Shop POS, PizzaSizes table, RecipeItems table (+11 more)

### Community 1 - "web/package.json"
Cohesion: 0.12
Nodes (16): class-variance-authority, cn, next-themes, radix-ui, react-dom, shadcn, tailwindcss, @tailwindcss/turbopack (+8 more)

### Community 2 - "IngredientFormDialog.tsx"
Cohesion: 0.13
Nodes (10): @hookform/resolvers, MODE_CHOICES, MODE_COPY, FIELDS, IngredientFormDialogProps, STATUS_CHOICES, TOPPING_CHOICES, FormInputProps (+2 more)

### Community 3 - "compilerOptions"
Cohesion: 0.11
Nodes (18): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+10 more)

### Community 4 - "IngredientAdminActions.tsx"
Cohesion: 0.14
Nodes (3): sonner, DeleteIngredientDialogProps, UserMenuProps

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
Cohesion: 0.11
Nodes (16): net10.0, coverlet.collector (6.0.4), Microsoft.AspNetCore.DataProtection.EntityFrameworkCore (10.0.12), Microsoft.AspNetCore.Identity.EntityFrameworkCore (10.0.12), Microsoft.AspNetCore.Mvc.Testing (10.0.12), Microsoft.AspNetCore.OpenApi (10.0.12), Microsoft.EntityFrameworkCore.Design (10.0.12), Microsoft.Extensions.Diagnostics.HealthChecks.EntityFrameworkCore (10.0.12) (+8 more)

### Community 10 - "Globe Icon (world/web, 16x16 gray)"
Cohesion: 0.67
Nodes (3): File Icon (document outline, 16x16 gray), Globe Icon (world/web, 16x16 gray), Browser Window Icon (16x16 gray)

### Community 11 - "orders/page.tsx"
Cohesion: 0.09
Nodes (24): InventoryTableProps, View, VIEWS, FILTERS, metadata, OrdersPage(), OrdersTableSkeleton(), metadata (+16 more)

### Community 13 - "ApiFactory"
Cohesion: 0.07
Nodes (12): HealthTests, ApiCollection, ApiFactory, Environment, Settings, DevelopmentApiFactory, Environment, RateLimitedApiFactory (+4 more)

### Community 14 - "system_componentmodel_dataannotations"
Cohesion: 0.12
Nodes (8): AdjustIngredientStockRequest, CreateIngredientRequest, CreatePizzaSizeRequest, CreateUnitOfMeasureRequest, UpdateIngredientRequest, UpdatePizzaSizeRequest, UpdateUnitOfMeasureRequest, PizzaShop.Api.Requests

### Community 15 - "MigrationBuilder"
Cohesion: 0.13
Nodes (3): AddRecipeItemUniqueIndex, AddIdentity, AddOrdersCreatedAtIndex

### Community 16 - "users/page.tsx"
Cohesion: 0.33
Nodes (9): hrefFor(), metadata, ROLE_BADGE_CLASSES, SearchForm(), UsersPage(), UsersTable(), UsersTableSkeleton(), Pager() (+1 more)

### Community 19 - "RecipeItem"
Cohesion: 0.07
Nodes (9): AuthExtensions, DevelopmentSeeder, RecipeItem, Amount, Ingredient, IngredientId, Recipe, RecipeId (+1 more)

### Community 20 - "PizzaShopContext"
Cohesion: 0.10
Nodes (11): PizzaShopContext, DataProtectionKeys, Ingredients, OrderIngredientUsages, OrderItems, OrderItemToppings, Orders, PizzaSizes (+3 more)

### Community 21 - "Order"
Cohesion: 0.07
Nodes (20): Order, CancellationReason, CancelledAt, CancelledBy, CancelledByUserId, CreatedAt, IdempotencyKey, IngredientUsages (+12 more)

### Community 23 - ".UpdateRoles"
Cohesion: 0.10
Nodes (3): UserDto, UsersEndpoints, AppUser

### Community 26 - "RateLimitingExtensions.cs"
Cohesion: 0.12
Nodes (6): CorsExtensions, RateLimitPolicies, OrderOptions, TaxRate, PizzaShop.Api.Extensions, PizzaShop.Api.Options

### Community 27 - ".Create"
Cohesion: 0.08
Nodes (17): CancellationsByRoleDto, CancellationStatisticsDto, CancelledOrderDto, CancelledSummaryDto, IngredientUsageDto, IngredientUsageStatisticsDto, ItemStatisticsDto, SalesDayDto (+9 more)

### Community 28 - "OrderDto.cs"
Cohesion: 0.18
Nodes (12): OrderDto, OrderItemDto, OrderItemToppingDto, OrderMapper, OrderSummaryDto, PagedResult, OrderStatus, Cancelled (+4 more)

### Community 31 - ".Update"
Cohesion: 0.15
Nodes (3): IngredientDto, IngredientMapper, IngredientsEndpoints

### Community 32 - "auth/actions.ts"
Cohesion: 0.17
Nodes (21): Credentials, credentialsSchema, currentUserSchema, LoginResponse, loginResponseSchema, RegisterInput, registerSchema, logout() (+13 more)

### Community 42 - "OrderItem"
Cohesion: 0.12
Nodes (13): OrderItem, ItemNameSnapshot, LineTotal, Order, OrderId, OrderItemId, PizzaSize, PizzaSizeId (+5 more)

### Community 44 - "react"
Cohesion: 0.15
Nodes (17): react, blankItem(), FieldMessage(), RecipeForm(), RecipeFormProps, STATUS_CHOICES, ROLE_LABELS, UserRoleControl() (+9 more)

### Community 45 - ".PlaceAsync"
Cohesion: 0.34
Nodes (3): UpdateOrderStatusRequest, CancellationTests, TestUser

### Community 46 - "next"
Cohesion: 0.15
Nodes (7): lucide-react, next, ORDER_TYPE_CHOICES, metadata, metadata, PagerProps, nextConfig

### Community 47 - ".Price"
Cohesion: 0.15
Nodes (5): PizzaSize, Name, PizzaSizeId, PriceMultiplier, OrderCalculator

### Community 48 - "inventory/actions.ts"
Cohesion: 0.21
Nodes (26): zod, idempotencyKeySchema, placeOrder(), adjustStock(), createIngredient(), deleteIngredient(), ingredientIdSchema, updateIngredient() (+18 more)

### Community 49 - ".CreateIngredientAsync"
Cohesion: 0.17
Nodes (3): CreateRecipeRequest, RecipeItemRequest, CatalogTests

### Community 50 - "PizzaShop.Api.Dtos"
Cohesion: 0.13
Nodes (4): PizzaShop.Api.Dtos, PizzaShop.Api.Tests, PizzaShop.Api.Orders, PizzaShop.Api.Tests.Infrastructure

### Community 51 - "NavLinks.tsx"
Cohesion: 0.06
Nodes (47): AppLayout(), AuthLayout(), geistMono, geistSans, metadata, AppShell(), AppShellProps, Brand() (+39 more)

### Community 52 - "OrderIngredientUsage"
Cohesion: 0.25
Nodes (7): OrderIngredientUsage, Amount, Ingredient, IngredientId, Order, OrderId, OrderIngredientUsageId

### Community 53 - ".Sales"
Cohesion: 0.14
Nodes (7): OrderSnapshot, RangeResult, StatisticsCalculator, StatisticsRange, Days, PizzaShop.Api.Statistics, StatisticsCalculatorTests

### Community 55 - "RoleGuard.tsx"
Cohesion: 0.39
Nodes (5): AnalyticsPage(), ComingSoon(), ComingSoonProps, AdminOnly(), StaffOnly()

### Community 57 - "Recipe"
Cohesion: 0.16
Nodes (7): Recipe, BasePrice, IsActive, Name, RecipeId, RecipeItems, OrderCalculatorTests

### Community 58 - "api/menu.ts"
Cohesion: 0.16
Nodes (19): POST(), problemJson(), Builder(), BuilderPage(), BuilderSkeleton(), metadata, apiJson(), getRecipe() (+11 more)

### Community 68 - "FormAlert"
Cohesion: 0.22
Nodes (10): react-hook-form, FIELDS, LoginForm(), LoginPage(), RegisterPage(), FIELDS, RegisterForm(), FormAlert() (+2 more)

### Community 69 - "PizzaBuilder.tsx"
Cohesion: 0.10
Nodes (29): CartView(), CartPage(), metadata, AMOUNT_CHOICES, COVERAGE_CHOICES, PizzaBuilder(), PizzaBuilderProps, CartContext (+21 more)

### Community 71 - ".Update"
Cohesion: 0.05
Nodes (11): PizzaSizeDto, PizzaSizeMapper, RecipeDto, RecipeItemDto, RecipeMapper, ToppingDto, ToppingMapper, UnitOfMeasureDto (+3 more)

### Community 72 - "TestApi"
Cohesion: 0.14
Nodes (5): UpdateUserRolesRequest, LoginResponse, TestApi, RateLimitingTests, UsersTests

### Community 74 - "schemas/orders.ts"
Cohesion: 0.10
Nodes (24): OrderActions(), OrderActionsProps, reportFailure(), CancelOrderDialog(), ORDERS_PAGE_SIZE, CancelOrderInput, cancelOrderSchema, CreateOrderInput (+16 more)

### Community 76 - "schemas/ingredients.ts"
Cohesion: 0.13
Nodes (17): checkTopping(), hasTwoDecimals, Ingredient, IngredientForm, ingredientFormSchema, ingredientFormShape, ingredientSchema, newIngredientFormSchema (+9 more)

### Community 77 - "Ingredient"
Cohesion: 0.12
Nodes (14): INamedEntity, Name, Ingredient, CurrentStock, IngredientId, IsActive, Name, ToppingPortion (+6 more)

### Community 78 - "dependencies"
Cohesion: 0.13
Nodes (15): dependencies, class-variance-authority, cn, @hookform/resolvers, lucide-react, next, next-themes, radix-ui (+7 more)

### Community 103 - "orders/[id]/page.tsx"
Cohesion: 0.23
Nodes (16): metadata, MyOrder(), MyOrderPage(), MyOrderSkeleton(), Detail(), metadata, OrderDetail(), OrderDetailSkeleton() (+8 more)

### Community 105 - "OrderItemTopping"
Cohesion: 0.20
Nodes (9): OrderItemTopping, Coverage, ExtraAmount, Ingredient, IngredientId, OrderItem, OrderItemId, OrderItemToppingId (+1 more)

### Community 112 - "devDependencies"
Cohesion: 0.20
Nodes (10): devDependencies, eslint, eslint-config-next, shadcn, tailwindcss, @tailwindcss/turbopack, @types/node, @types/react (+2 more)

### Community 114 - "AuthExtensions.cs"
Cohesion: 0.12
Nodes (4): Policies, Roles, PizzaShop.Api.Auth, PizzaShop.Api.Db

### Community 115 - "scripts"
Cohesion: 0.40
Nodes (5): scripts, build, dev, lint, start

### Community 116 - "eslint.config.mjs"
Cohesion: 0.50
Nodes (3): eslint, eslint-config-next, eslintConfig

### Community 119 - ".AddPizzaShopRateLimiting"
Cohesion: 0.19
Nodes (5): RateLimitingExtensions, RateLimitingOptions, AuthPerMinute, OrderCreatePerMinute, UserPerMinute

### Community 125 - "OrderItemToppingRequest"
Cohesion: 0.11
Nodes (15): OrderType, Delivery, DineIn, Takeout, ToppingAmount, Extra, Light, Standard (+7 more)

### Community 126 - "users/actions.ts"
Cohesion: 0.17
Nodes (12): server-only, userIdSchema, pagedSchema(), rolesFor(), User, userListQuerySchema, userPageSchema, UserRole (+4 more)

### Community 127 - "my-orders/page.tsx"
Cohesion: 0.23
Nodes (11): MenuPage(), metadata, RecipeGrid(), RecipeGridSkeleton(), hrefForPage(), metadata, MyOrdersPage(), MyOrdersSkeleton() (+3 more)

### Community 129 - ".FromPriced"
Cohesion: 0.23
Nodes (4): OrderQuoteDto, OrderQuoteItemDto, OrderQuoteMapper, OrderQuoteToppingDto

### Community 130 - "client.ts"
Cohesion: 0.25
Nodes (12): ApiFetchOptions, getClientIp(), withSession(), apiBaseUrl(), callApi(), callApiJson(), CallApiOptions, readApiError() (+4 more)

### Community 132 - "IngredientFormDialog"
Cohesion: 0.23
Nodes (12): AdjustStockDialog(), DeleteIngredientDialog(), IngredientAdminActions(), NewIngredientButton(), defaultsFor(), FieldMessage(), IngredientFormDialog(), InventoryTable() (+4 more)

### Community 133 - "recipes/[id]/page.tsx"
Cohesion: 0.20
Nodes (14): Inventory(), InventoryPage(), InventorySkeleton(), metadata, DeleteRecipeDialog(), EditRecipe(), EditRecipePage(), EditRecipeSkeleton() (+6 more)

### Community 136 - "problem.ts"
Cohesion: 0.32
Nodes (7): RFC-9457, describeApiError(), lowerFirst(), Problem, problemSchema, toFieldErrors(), toFieldPath()

### Community 137 - "currentUser.ts"
Cohesion: 0.57
Nodes (5): CustomerRedirect(), Home(), getCurrentUser, homePathFor(), getAccessToken()

## Ambiguous Edges - Review These
- `pnpm workspace (packages: web)` → `Tech Stack (pnpm, Next.js 16, ASP.NET 10, PostgreSQL, Azure)`  [AMBIGUOUS]
  pnpm-workspace.yaml · relation: conceptually_related_to

## Knowledge Gaps
- **147 isolated node(s):** `OrderId`, `OrderNumber`, `Status`, `OrderType`, `SubTotal` (+142 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 632 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **81 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `PizzaShop.Api.Models` connect `PizzaShop.Api.Models` to `.Update`, `OrdersEndpoints.cs`, `Ingredient`, `system_componentmodel_dataannotations`, `AuthExtensions.cs`, `PizzaShop.Api.Dtos`, `OrderDto.cs`, `OrderItemToppingRequest`?**
  _High betweenness centrality (0.036) - this node is a cross-community bridge._
- **What connects `OrderId`, `OrderNumber`, `Status` to the rest of the system?**
  _147 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Pizza Shop POS README` be split into smaller, more focused modules?**
  _Cohesion score 0.1164021164021164 - nodes in this community are weakly interconnected._
- **Why does `Ingredient` connect `Ingredient` to `OrderItemTopping`, `PizzaShop.Api.Models`, `.Price`, `PizzaShopContext`, `OrderIngredientUsage`, `Recipe`, `.Update`?**
  _High betweenness centrality (0.034) - this node is a cross-community bridge._
- **Should `web/package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.11764705882352941 - nodes in this community are weakly interconnected._
- **Why does `PizzaShopContext` connect `PizzaShopContext` to `.NameTakenAsync`, `Ingredient`, `AuthExtensions.cs`, `OrderIngredientUsage`, `Order`, `.UpdateRoles`, `Recipe`, `.ConfigureConventions`, `.GetAll`?**
  _High betweenness centrality (0.028) - this node is a cross-community bridge._

### Low-confidence Hints
_AMBIGUOUS edges — the extractor was unsure. Verify before acting on these._

- **What is the exact relationship between `pnpm workspace (packages: web)` and `Tech Stack (pnpm, Next.js 16, ASP.NET 10, PostgreSQL, Azure)`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._