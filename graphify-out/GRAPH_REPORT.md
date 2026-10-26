# Graph Report - pizza-shop  (2026-10-25)

## Corpus Check
- 193 files · ~45,681 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 6 file(s) not represented in the graph (top: .example 2, (none) 2, .ico 1)

## Summary
- 1556 nodes · 3497 edges · 133 communities (53 shown, 80 thin omitted)
- Extraction: 96% EXTRACTED · 4% INFERRED · 0% AMBIGUOUS · INFERRED: 132 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `053e6e94`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- Pizza Shop POS README
- web/package.json
- RecipeForm.tsx
- compilerOptions
- AdjustStockDialog.tsx
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
- .InactiveIngredient_LeavesToppings_CannotBeOrdered_OrAddedToNewRecipes
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
- ToppingAmount
- .Update
- .BuildModel
- .TransformAsync
- OrderItem
- PizzaShop.Api.Models
- OrderType
- orders/[id]/page.tsx
- CartView.tsx
- Ingredient
- orders/actions.ts
- TestApi
- TestApi.cs
- NavLinks.tsx
- OrderIngredientUsage
- OrderStatus
- .PlaceAsync
- RoleGuard.tsx
- .NewUserAsync
- api/menu.ts
- auth/actions.ts
- schemas/orders.ts
- .Update
- .RoleChange_AppliesAfterRefresh_NotBefore
- .ReadProblemAsync
- .NameTakenAsync
- PizzaBuilder.tsx
- client.ts
- dependencies
- AddIngredientToppingFields
- AddOrderIdempotencyKey
- .FromPriced
- OrderItemTopping
- devDependencies
- AuthExtensions.cs
- scripts
- eslint.config.mjs
- OrderItemToppingRequest
- RecipeItemRequest
- new/page.tsx
- CurrentUserDto.cs
- UserMenu.tsx
- next
- CartProvider.tsx
- UpdateRecipeRequest

## God Nodes (most connected - your core abstractions)
1. `next` - 40 edges
2. `react` - 37 edges
3. `PizzaShopContext` - 32 edges
4. `Order` - 30 edges
5. `PizzaShop.Api.Models` - 29 edges
6. `Ingredient` - 28 edges
7. `TestApi` - 24 edges
8. `Recipe` - 23 edges
9. `apiJson()` - 20 edges
10. `PizzaShop.Api.Requests` - 20 edges

## Surprising Connections (you probably didn't know these)
- `Next.js Agent Rules (breaking-change docs warning)` --conceptually_related_to--> `Frontend Conventions (Server Components, Zod, feature hooks)`  [INFERRED]
  web/AGENTS.md → CLAUDE.md
- `OrderCalculatorTests` --references--> `PizzaSize`  [EXTRACTED]
  Tests/PizzaShop.Api.Tests/OrderCalculatorTests.cs → api/Models/PizzaSize.cs
- `LoginPage()` --calls--> `LoginForm()`  [EXTRACTED]
  web/app/(auth)/login/page.tsx → web/app/(auth)/login/LoginForm.tsx
- `RegisterPage()` --calls--> `RegisterForm()`  [EXTRACTED]
  web/app/(auth)/register/page.tsx → web/app/(auth)/register/RegisterForm.tsx
- `StaffOnly()` --calls--> `requireStaff()`  [EXTRACTED]
  web/components/RoleGuard.tsx → web/lib/auth/currentUser.ts

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Order creation inventory deduction flow** — claude_inventory_deduction, claude_orderitems, claude_orderitemtoppings, claude_recipeitems, claude_ingredients [EXTRACTED 1.00]
- **Local dev database setup** — readme_pnpm_scripts, readme_env_example, readme_podman_compose, docker_compose_postgres, docker_compose_postgres_data [INFERRED 0.85]
- **Price snapshot pattern for historical stability** — claude_price_stability, claude_orderitems, claude_orderitemtoppings, claude_orders [INFERRED 0.85]
- **create-next-app Default Boilerplate Assets (currently unused)** — web_public_file_file_icon, web_public_globe_globe_icon, web_public_next_next_js_wordmark, web_public_vercel_vercel_logo, web_public_window_window_icon [INFERRED 0.85]

## Communities (133 total, 80 thin omitted)

### Community 0 - "Pizza Shop POS README"
Cohesion: 0.12
Nodes (19): Ingredients table, OrderItems table, OrderItemToppings table, Orders table, Pizza Customizer (size, crust, fractional toppings), Pizza Shop POS, PizzaSizes table, RecipeItems table (+11 more)

### Community 1 - "web/package.json"
Cohesion: 0.12
Nodes (16): class-variance-authority, cn, next-themes, radix-ui, react-dom, shadcn, tailwindcss, @tailwindcss/turbopack (+8 more)

### Community 2 - "RecipeForm.tsx"
Cohesion: 0.14
Nodes (13): lucide-react, blankItem(), FieldMessage(), RecipeForm(), RecipeFormProps, STATUS_CHOICES, NativeSelect(), NativeSelectOption() (+5 more)

### Community 3 - "compilerOptions"
Cohesion: 0.11
Nodes (18): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+10 more)

### Community 4 - "AdjustStockDialog.tsx"
Cohesion: 0.07
Nodes (25): @hookform/resolvers, sonner, AdjustStockDialog(), MODE_CHOICES, MODE_COPY, InventoryTable(), isOut(), View (+17 more)

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
Cohesion: 0.12
Nodes (19): hrefForPage(), metadata, MyOrdersPage(), MyOrdersSkeleton(), MyOrdersTable(), FILTERS, hrefFor(), metadata (+11 more)

### Community 13 - "ApiFactory"
Cohesion: 0.07
Nodes (12): HealthTests, ApiCollection, ApiFactory, Environment, Settings, DevelopmentApiFactory, Environment, RateLimitedApiFactory (+4 more)

### Community 14 - "system_componentmodel_dataannotations"
Cohesion: 0.10
Nodes (9): AdjustIngredientStockRequest, CancelOrderRequest, CreateIngredientRequest, CreatePizzaSizeRequest, CreateUnitOfMeasureRequest, UpdateIngredientRequest, UpdatePizzaSizeRequest, UpdateUnitOfMeasureRequest (+1 more)

### Community 15 - "MigrationBuilder"
Cohesion: 0.07
Nodes (4): InitialCreate, AddRecipeItemUniqueIndex, AddIdentity, AddMenuActiveAndOrderCancellation

### Community 19 - "RecipeItem"
Cohesion: 0.07
Nodes (9): AuthExtensions, DevelopmentSeeder, RecipeItem, Amount, Ingredient, IngredientId, Recipe, RecipeId (+1 more)

### Community 20 - "PizzaShopContext"
Cohesion: 0.10
Nodes (11): PizzaShopContext, DataProtectionKeys, Ingredients, OrderIngredientUsages, OrderItems, OrderItemToppings, Orders, PizzaSizes (+3 more)

### Community 21 - "Order"
Cohesion: 0.08
Nodes (19): Order, CancellationReason, CancelledAt, CancelledBy, CancelledByUserId, CreatedAt, IdempotencyKey, IngredientUsages (+11 more)

### Community 23 - ".UpdateRoles"
Cohesion: 0.10
Nodes (3): UserDto, UsersEndpoints, AppUser

### Community 26 - "RateLimitingExtensions.cs"
Cohesion: 0.06
Nodes (12): CorsExtensions, ForwardedHeadersExtensions, RateLimitingExtensions, RateLimitPolicies, OrderOptions, TaxRate, RateLimitingOptions, AuthPerMinute (+4 more)

### Community 28 - "OrderDto.cs"
Cohesion: 0.32
Nodes (6): OrderDto, OrderItemDto, OrderItemToppingDto, OrderMapper, OrderSummaryDto, PagedResult

### Community 31 - ".Update"
Cohesion: 0.13
Nodes (3): IngredientDto, IngredientMapper, IngredientsEndpoints

### Community 32 - "ToppingAmount"
Cohesion: 0.22
Nodes (8): ToppingAmount, Extra, Light, Standard, ToppingCoverage, LeftHalf, RightHalf, Whole

### Community 38 - ".Update"
Cohesion: 0.14
Nodes (3): UnitOfMeasureDto, UnitOfMeasureMapper, UnitsOfMeasureEndpoints

### Community 42 - "OrderItem"
Cohesion: 0.12
Nodes (13): OrderItem, ItemNameSnapshot, LineTotal, Order, OrderId, OrderItemId, PizzaSize, PizzaSizeId (+5 more)

### Community 43 - "PizzaShop.Api.Models"
Cohesion: 0.16
Nodes (3): PizzaShop.Api.Models, PizzaShop.Api.Dtos, PizzaShop.Api.Endpoints

### Community 44 - "OrderType"
Cohesion: 0.33
Nodes (5): OrderType, Delivery, DineIn, Takeout, CreateOrderRequest

### Community 45 - "orders/[id]/page.tsx"
Cohesion: 0.12
Nodes (27): metadata, MyOrder(), MyOrderPage(), MyOrderSkeleton(), OrderActions(), OrderActionsProps, reportFailure(), Detail() (+19 more)

### Community 46 - "CartView.tsx"
Cohesion: 0.14
Nodes (16): CartView(), ORDER_TYPE_CHOICES, CartPage(), metadata, MenuPage(), metadata, RecipeGrid(), RecipeGridSkeleton() (+8 more)

### Community 47 - "Ingredient"
Cohesion: 0.05
Nodes (27): INamedEntity, Name, Ingredient, CurrentStock, IngredientId, IsActive, Name, ToppingPortion (+19 more)

### Community 48 - "orders/actions.ts"
Cohesion: 0.16
Nodes (28): RFC-9457, zod, idempotencyKeySchema, placeOrder(), adjustStock(), ingredientIdSchema, createRecipe(), deleteRecipe() (+20 more)

### Community 49 - "TestApi"
Cohesion: 0.17
Nodes (3): TestApi, TestUser, RateLimitingTests

### Community 50 - "TestApi.cs"
Cohesion: 0.15
Nodes (3): PizzaShop.Api.Tests, PizzaShop.Api.Orders, PizzaShop.Api.Tests.Infrastructure

### Community 51 - "NavLinks.tsx"
Cohesion: 0.06
Nodes (46): AppLayout(), AuthLayout(), geistMono, geistSans, metadata, AppShell(), AppShellProps, Brand() (+38 more)

### Community 52 - "OrderIngredientUsage"
Cohesion: 0.25
Nodes (7): OrderIngredientUsage, Amount, Ingredient, IngredientId, Order, OrderId, OrderIngredientUsageId

### Community 53 - "OrderStatus"
Cohesion: 0.33
Nodes (6): OrderStatus, Cancelled, Completed, Pending, Preparing, Ready

### Community 55 - "RoleGuard.tsx"
Cohesion: 0.40
Nodes (6): AnalyticsPage(), UsersPage(), ComingSoon(), ComingSoonProps, AdminOnly(), StaffOnly()

### Community 58 - "api/menu.ts"
Cohesion: 0.28
Nodes (13): POST(), problemJson(), Builder(), BuilderPage(), BuilderSkeleton(), metadata, PizzaBuilder(), apiJson() (+5 more)

### Community 68 - "auth/actions.ts"
Cohesion: 0.18
Nodes (22): react-hook-form, FIELDS, LoginForm(), FIELDS, RegisterForm(), FormAlert(), FormInput(), getClientIp() (+14 more)

### Community 69 - "schemas/orders.ts"
Cohesion: 0.08
Nodes (32): BuilderAction, BuilderState, MAX_QUANTITY, reducer(), ToppingChoice, usePizzaBuilder(), UsePizzaBuilderOptions, quoteKey() (+24 more)

### Community 71 - ".Update"
Cohesion: 0.08
Nodes (8): PizzaSizeDto, PizzaSizeMapper, RecipeDto, RecipeItemDto, RecipeMapper, ToppingDto, ToppingMapper, PizzaSizesEndpoints

### Community 72 - ".RoleChange_AppliesAfterRefresh_NotBefore"
Cohesion: 0.26
Nodes (3): UpdateUserRolesRequest, LoginResponse, UsersTests

### Community 76 - "PizzaBuilder.tsx"
Cohesion: 0.19
Nodes (11): AMOUNT_CHOICES, COVERAGE_CHOICES, PizzaBuilderProps, PizzaSize, pizzaSizeSchema, Recipe, recipeSchema, Topping (+3 more)

### Community 77 - "client.ts"
Cohesion: 0.16
Nodes (21): ApiFetchOptions, withSession(), apiBaseUrl(), callApi(), callApiJson(), CallApiOptions, readApiError(), LoginResponse (+13 more)

### Community 78 - "dependencies"
Cohesion: 0.13
Nodes (15): dependencies, class-variance-authority, cn, @hookform/resolvers, lucide-react, next, next-themes, radix-ui (+7 more)

### Community 103 - ".FromPriced"
Cohesion: 0.23
Nodes (4): OrderQuoteDto, OrderQuoteItemDto, OrderQuoteMapper, OrderQuoteToppingDto

### Community 105 - "OrderItemTopping"
Cohesion: 0.20
Nodes (9): OrderItemTopping, Coverage, ExtraAmount, Ingredient, IngredientId, OrderItem, OrderItemId, OrderItemToppingId (+1 more)

### Community 112 - "devDependencies"
Cohesion: 0.20
Nodes (10): devDependencies, eslint, eslint-config-next, shadcn, tailwindcss, @tailwindcss/turbopack, @types/node, @types/react (+2 more)

### Community 114 - "AuthExtensions.cs"
Cohesion: 0.20
Nodes (3): Policies, Roles, PizzaShop.Api.Auth

### Community 115 - "scripts"
Cohesion: 0.40
Nodes (5): scripts, build, dev, lint, start

### Community 116 - "eslint.config.mjs"
Cohesion: 0.50
Nodes (3): eslint, eslint-config-next, eslintConfig

### Community 127 - "new/page.tsx"
Cohesion: 0.67
Nodes (3): metadata, NewRecipe(), NewRecipePage()

### Community 133 - "next"
Cohesion: 0.10
Nodes (19): next, react, server-only, Inventory(), InventoryPage(), InventorySkeleton(), metadata, CustomerRedirect() (+11 more)

### Community 134 - "CartProvider.tsx"
Cohesion: 0.31
Nodes (8): CartButton(), CartContext, CartLine, CartProvider(), CartState, sameConfiguration(), useCart(), clampQuantity()

## Ambiguous Edges - Review These
- `pnpm workspace (packages: web)` → `Tech Stack (pnpm, Next.js 16, ASP.NET 10, PostgreSQL, Azure)`  [AMBIGUOUS]
  pnpm-workspace.yaml · relation: conceptually_related_to

## Knowledge Gaps
- **145 isolated node(s):** `class-variance-authority`, `next-themes`, `radix-ui`, `react-dom`, `shadcn` (+140 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 626 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **80 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Ingredient` connect `Ingredient` to `OrderItemTopping`, `PizzaShop.Api.Models`, `PizzaShopContext`, `OrderIngredientUsage`, `.Update`?**
  _High betweenness centrality (0.040) - this node is a cross-community bridge._
- **What connects `class-variance-authority`, `next-themes`, `radix-ui` to the rest of the system?**
  _145 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Pizza Shop POS README` be split into smaller, more focused modules?**
  _Cohesion score 0.1164021164021164 - nodes in this community are weakly interconnected._
- **Why does `PizzaShopContext` connect `PizzaShopContext` to `PizzaShop.Api.Models`, `.NameTakenAsync`, `Ingredient`, `OrderIngredientUsage`, `Order`, `.UpdateRoles`, `.ConfigureConventions`, `.GetAll`?**
  _High betweenness centrality (0.040) - this node is a cross-community bridge._
- **Should `web/package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.11764705882352941 - nodes in this community are weakly interconnected._
- **Why does `PizzaShop.Api.Models` connect `PizzaShop.Api.Models` to `ToppingAmount`, `.Update`, `system_componentmodel_dataannotations`, `Ingredient`, `TestApi.cs`, `OrderDto.cs`?**
  _High betweenness centrality (0.030) - this node is a cross-community bridge._

### Low-confidence Hints
_AMBIGUOUS edges — the extractor was unsure. Verify before acting on these._

- **What is the exact relationship between `pnpm workspace (packages: web)` and `Tech Stack (pnpm, Next.js 16, ASP.NET 10, PostgreSQL, Azure)`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._