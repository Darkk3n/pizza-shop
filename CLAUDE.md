# Pizza Shop POS — AI Assistant Guidelines

## Overview

A full-stack POS system for pizza restaurant owners featuring order management, inventory auto-deduction, recipe/cost management, and live sales analytics.

## Tech Stack

- **Monorepo:** pnpm workspaces (`web`, `api`)
- **Frontend:** Next.js 16 (App Router), React 19, Tailwind CSS, React Hook Form, Zod
- **Backend:** ASP.NET 10 Minimal APIs, C# 14, Entity Framework Core
- **Database:** PostgreSQL (Docker locally, Managed Postgres on cloud)
- **Cloud/Infra:** Azure (Static Web Apps for Web, App Service/Container Apps for API)

## Repository Structure & Commands

- **Frontend:** `web/`
- **Backend:** `api/`
- **Backend tests:** `Tests/PizzaShop.Api.Tests/` (xUnit + `WebApplicationFactory`), run with `pnpm test:api`. They use a separate `pizzashop_tests` database, dropped and re-migrated each run, on the server from `api/appsettings.Development.json` (override with `PIZZASHOP_TEST_CONNECTION`). Solution file: `PizzaShop.slnx`.
- **Health check:** `GET /health` (anonymous, never rate limited) → `Healthy` 200 / `Unhealthy` 503 when the database is unreachable.
- **Run local dev environment:** `pnpm dev`
- **Development sample data:** `api/Db/DevelopmentSeeder.cs` runs only in Development (`DevSeed:Enabled`, default true). It creates `admin@`, `staff@` and `customer@pizzashop.dev` (password `Dev!Pass123`), and a menu only when there are no ingredients or recipes. Reference data needed everywhere (units, sizes, roles) stays in `HasData`; sample data must never go there.
- **Database local docker:** `db:up` (PostgreSQL plus **Mailpit**, the local email catcher: SMTP on 1025, inbox at http://localhost:8025; nothing reaches real addresses)
- **EF Core Migrations:** `dotnet ef migrations add <Name> --project api`
- **EF Core Update DB:** `dotnet ef database update --project api`

## Architectural Conventions

### Frontend (`web`)

- Use Next.js App Router (`app/` directory).
- Default to Server Components; explicitly place `"use client";` at the top of files handling UI interactivity or React Hook Form.
- Always use Zod schemas to validate form inputs and API request payloads. Derive TypeScript types using `z.infer<typeof schema>`.
- Keep complex form logic inside feature-specific hooks (`hooks/usePizzaBuilder.ts`).
- Always use arrow functions (`const Name = () => {}`) for components, hooks, helpers, and handlers; never `function` declarations. For default exports (pages, layouts), declare the const and then `export default Name;`. Exception: `components/ui/` is shadcn/ui-generated (`pnpm dlx shadcn@latest add <name>` from `web/`); leave it as generated.
- **BFF auth:** the browser never calls the API or sees tokens. Tokens live in httpOnly cookies (`lib/auth/cookies.ts`); login/register/logout are Server Actions (`lib/auth/actions.ts`); `proxy.ts` refreshes the access token shortly before expiry and sends signed-out visitors to `/login?next=`. Server code calls the API through `lib/api/client.ts` (`apiFetch` / `apiJson`, adds the bearer token and `X-Forwarded-For`) with Zod response schemas in `lib/api/schemas/`. `API_BASE_URL` goes in `web/.env.local` (see `web/.env.example`).
- **`lib/` layout:** `lib/api/` (HTTP client, Problem Details, Zod schemas, data functions like `api/orders.ts`), `lib/auth/` (session, current user, auth actions), `lib/helpers/` (pure helpers: formatting, form/action errors, nav per role, sidebar). `lib/utils.ts` stays at the root: it is shadcn's `cn()` and `components.json` points there.
- **Access checks:** `proxy.ts` only checks for a session cookie. Every page and Server Action that needs a role calls `requireStaff()` / `requireAdmin()` (`lib/auth/currentUser.ts`), which renders `app/forbidden.tsx`. Nav per role is in `lib/helpers/navigation.ts`.
- **Cache Components is on:** anything that reads cookies, `searchParams` or `params` must sit inside `<Suspense>` (the build fails otherwise). Signed-in screens live in `app/(app)/` (with the shell); sign-in screens in `app/(auth)/`.
- **Server Action errors:** return `ActionResult` (`lib/helpers/actions.ts`: `apiFailure` maps Problem Details, including indexed keys like `Items[0].RecipeId` to RHF paths) and apply them with `applyActionErrors` (`lib/helpers/forms.ts`). Call `refresh()` after mutations.

### Backend (`api`)

- Use Minimal APIs organized via extension methods or typed endpoint groups (avoid bloated `Program.cs`).
- Use `DateTimeOffset` (not `DateTime`) for all time-based properties (`CreatedAt`, timestamps).
- Standardize responses using standard HTTP status codes and typed DTOs.
- Cover new endpoints and business rules with integration tests through the public HTTP API (`Tests/PizzaShop.Api.Tests`, helpers in `Infrastructure/TestApi.cs`). Tests create uniquely named data and run sequentially. `SecurityTests` fails if an endpoint lacks authorization metadata, so a new anonymous route must be added to its allowlist on purpose.
- Keep pure business math out of endpoint handlers when it's worth unit testing: order pricing and stock deductions live in `api/Orders/OrderCalculator.cs` (no DB/HTTP), unit-tested in `OrderCalculatorTests` without the API host.
- Every error response is Problem Details (`application/problem+json`): return `TypedResults.Problem` / `ValidationProblem`; `UseStatusCodePages` fills empty 401/403/404/405/400 bodies and `UseExceptionHandler` turns unhandled exceptions into a generic 500 outside Development.
- DB Context maps `Decimal(10,2)` for currency and `Decimal(10,4)` for recipe ingredient measurements.

## Core Features & Business Rules

1. **Pizza Customizer:** Non-blocking client state handling size and fractional toppings (`Whole`, `LeftHalf`, `RightHalf`).
2. **Inventory Deduction:** Creating an order MUST automatically reduce ingredient stock based on `RecipeItems` + `OrderItemToppings`, in the same transaction as the order, and record exactly what it deducted in `OrderIngredientUsages`. Recipe amounts and topping portions are per Small and scale by `PizzaSizes.PriceMultiplier`; toppings also scale by coverage (half = 0.5) and amount (Light 0.5 / Standard 1 / Extra 1.5). Orders may push stock negative; manual stock adjustments (`POST /api/ingredients/{id}/stock-adjustments`, for restocks/waste/recounts) may not.
3. **Price Stability:** Orders store price snapshots (`UnitPrice`, `PriceAdjustment`) so future menu price updates don't alter historic financial data. Prices and tax (`Orders:TaxRate` in appsettings) are computed server-side; clients never send prices.
4. **Security:** Session timeouts after 30 minutes of inactivity in production environments. Implemented with ASP.NET Core Identity bearer tokens: access token 15 min, refresh token 30 min (`Auth:AccessTokenMinutes` / `Auth:RefreshTokenMinutes`); each refresh issues a new refresh token, so only 30 idle minutes end the session.
5. **Idempotent Orders:** `POST /api/orders` requires an `Idempotency-Key` header (GUID). Clients generate one per checkout (`crypto.randomUUID()`) and reuse it on every retry; a replay returns the original order, a reused key with a different body (or another user's key) returns 422.
6. **Roles & Access:** Accounts come from `/api/auth/register` (Identity `MapIdentityApi`); a user with no role is a **Customer**. Stored roles are **Admin** and **Staff** (`api/Auth/Roles.cs`), enforced with the `Admin`/`Staff` policies (`api/Auth/Policies.cs`; Admin passes Staff). Every endpoint group calls `.RequireAuthorization()` (no global fallback policy, so new groups must opt in); only `/` and the anonymous Identity endpoints are public.
   - **Customer:** read units, sizes, recipes and `/api/toppings`; place orders; see only their own orders (others' are 404).
   - **Staff:** all orders, order status, ingredient reads and stock adjustments.
   - **Admin:** catalog writes, `/api/users` role management (can't remove the last admin), statistics.
   - `GET /api/auth/me` returns the caller's `{ email, roles }` from the token's claims (not the DB, so it matches what the API enforces; `Cache-Control: no-store`). It drives which screens the UI shows and is not a security boundary.
   - The first admin is created at startup from `Auth:BootstrapAdmin:Email` / `Password` (user-secrets or env vars, never committed).
7. **Retiring Menu Items:** Recipes and ingredients that appear in orders can't be deleted (409); set `IsActive = false` instead. Inactive recipes are hidden from customers and rejected in new orders (staff/admin still see them). Inactive ingredients are hidden from `/api/toppings`, rejected as toppings, and can't be newly added to recipes (recipes that already contain them stay editable).
8. **Cancellation:** `POST /api/orders/{id}/cancel` (optional `{ reason }`) is the only way to reach `Cancelled`; `PATCH .../status` rejects it.
   - **Who/when:** customers may cancel their own orders while `Pending`; staff/admin any order not yet `Completed`. Completed orders can't be cancelled.
   - **Stock:** a cancellation MUST return exactly the stock the order deducted (from `OrderIngredientUsages`, not recomputed from current recipes), in the same transaction as the status change.
   - **Safety:** status changes and cancellations update conditionally on the current status, so stock is never returned twice; a repeated cancel returns 200 without restocking.
   - **Statistics:** cancelled orders keep their items and totals, plus `CancelledAt` / `CancelledByUserId` / `CancellationReason`, and must be reported separately rather than dropped.
9. **Rate Limiting:** built-in ASP.NET rate limiter, in memory per instance (`api/Extensions/RateLimitingExtensions.cs`, limits in `RateLimiting` config). Rejections are 429 Problem Details with `Retry-After`.
   - **Limits (per minute):**
     - **Global:** 300 per signed-in user (per client IP when anonymous) on every endpoint.
     - **`Auth` policy:** 20 per client IP on the Identity endpoints (never per account, because password spraying hits many accounts).
     - **`OrderCreate` policy:** 20 per user on `POST /api/orders`.
   - **Client IP:** comes from `X-Forwarded-For`, honored only from `ForwardedHeaders:KnownProxies` / `KnownNetworks` (loopback when empty). The Next.js BFF must forward the browser's IP, and production config must list the real proxies, or every client shares one bucket (or can spoof its IP).
10. **Statistics:** Admin only, one endpoint per dashboard section under `/api/statistics`: `sales`, `items`, `cancellations` and `ingredient-usage` (`api/Endpoints/StatisticsEndpoints.cs`).
    - **What counts:** a sale is every non-cancelled order, counted when it's placed. Cancelled orders are always reported separately, never dropped. Ingredient usage sums the recorded `OrderIngredientUsages` of non-cancelled orders.
    - **Range:** `from` / `to` are local dates, both inclusive, in `Statistics:TimeZone` (IANA id, validated at startup; `America/Mexico_City`). Without dates the range is the last `days` days including today (default 7; ignored when `from` is given); at most 366 days. Every endpoint filters `Orders.CreatedAt` (indexed) on the same UTC bounds.
    - **Pure math:** range resolution and the zero-filled daily buckets live in `api/Statistics/StatisticsCalculator.cs`, unit-tested in `StatisticsCalculatorTests`.
11. **Account emails:** sign-in requires a confirmed email (`Auth:RequireConfirmedEmail`, default true; login answers 401 `NotAllowed` until then). Identity's `MapIdentityApi` endpoints (`register`, `resendConfirmationEmail`, `forgotPassword`, `resetPassword`, `confirmEmail`) send through `api/Email/IdentityEmailSender.cs`.
    - **Links go to the web app** (`Email:WebBaseUrl`): `/confirm-email?userId=&code=` forwards to `GET /api/auth/confirmEmail`, and `/reset-password?email=&code=` posts to `/api/auth/resetPassword`. Identity HTML-encodes the link it hands over (`&amp;`), so `AccountEmails` decodes it before reading the query. A non-GUID `userId` gets 401 (an endpoint filter), not Identity's 500.
    - **Delivery is SMTP** (`Email:Smtp`, MailKit): Mailpit locally; any SMTP provider (Azure Communication Services, SendGrid, ...) is configuration only. A failed send is logged, never thrown, so these endpoints answer the same whether or not an account exists.
    - **Existing accounts:** accounts from before confirmation was required are marked confirmed (migration `ConfirmExistingUserEmails`); the bootstrap admin and dev seed accounts are created confirmed.
    - **Tests** swap SMTP for `Infrastructure/RecordingEmailDelivery.cs`; `TestApi.NewUserAsync` registers and confirms through the recorded link.

## Database Schema Overview

Identity tables (`AspNetUsers`, `AspNetRoles` seeded with Admin/Staff, `AspNetUserRoles`, ...) and `DataProtectionKeys` (encrypt the bearer tokens; must persist across deploys) live in the same database via `IdentityDbContext<AppUser, IdentityRole<Guid>, Guid>`.

### UnitOfMeasure (Seeded)

- UnitOfMeasureId: Guid PK
- Name: String(20) NOT NULL

### Ingredients

- IngredientId: Guid PK
- Name: String(50) NOT NULL
- UnitOfMeasureId: Guid FK -> UnitOfMeasure.UnitOfMeasureId NOT NULL
- CurrentStock: Decimal(10,2) NOT NULL (Default: 0.00)
- IsActive: Bool NOT NULL (Default: true) -- false = retired (see rule 7)
- ToppingPrice: Decimal(10,2) NULL -- Set together with ToppingPortion; both NULL = not offered as a topping
- ToppingPortion: Decimal(10,4) NULL -- One Small, Whole, Standard serving in the ingredient's unit

### PizzaSizes (Seeded)

- PizzaSizeId: Guid PK
- Name: String(20) NOT NULL -- e.g., "Small", "Medium", "Large"
- PriceMultiplier: Decimal(3,2) NOT NULL (Default: 1.00) -- e.g., 1.00, 1.25, 1.50

### Recipes

- RecipeId: Guid PK
- Name: String(50) NOT NULL
- BasePrice: Decimal(10,2) NOT NULL
- IsActive: Bool NOT NULL (Default: true) -- false = off the menu (see rule 7)

### RecipeItems

- RecipeItemId: Guid PK
- RecipeId: Guid FK -> Recipes.RecipeId NOT NULL
- IngredientId: Guid FK -> Ingredients.IngredientId NOT NULL
- Amount: Decimal(10,4) NOT NULL -- High precision for small units (e.g., yeast, spices)

### Orders

- OrderId: Guid PK
- OrderNumber: Int Identity / Auto-increment NOT NULL
- Status: String(20) NOT NULL -- "Pending", "Preparing", "Ready", "Completed" (forward-only; skipping steps allowed), or "Cancelled" (terminal, via the cancel endpoint only)
- OrderType: String(20) NOT NULL -- "DineIn", "Takeout", "Delivery"
- SubTotal: Decimal(10,2) NOT NULL
- Tax: Decimal(10,2) NOT NULL
- Total: Decimal(10,2) NOT NULL
- CreatedAt: DateTimeOffset NOT NULL
- PlacedByUserId: Guid FK -> AspNetUsers.Id NOT NULL -- Customer who ordered, or staff member for walk-ins
- IdempotencyKey: Guid NOT NULL UNIQUE -- From the Idempotency-Key header; not exposed in DTOs
- RequestHash: String(64) NOT NULL -- SHA-256 of the create request, detects key reuse with a different body
- CancelledAt: DateTimeOffset NULL
- CancelledByUserId: Guid FK -> AspNetUsers.Id NULL
- CancellationReason: String(200) NULL

### OrderIngredientUsages

- OrderIngredientUsageId: Guid PK
- OrderId: Guid FK -> Orders.OrderId NOT NULL (cascade)
- IngredientId: Guid FK -> Ingredients.IngredientId NOT NULL -- UNIQUE with OrderId
- Amount: Decimal(10,4) NOT NULL -- Stock this order deducted (recipe + toppings combined); returned on cancellation

### OrderItems

- OrderItemId: Guid PK
- OrderId: Guid FK -> Orders.OrderId NOT NULL
- RecipeId: Guid FK -> Recipes.RecipeId NULL -- Nullable for 100% custom scratch pizzas
- PizzaSizeId: Guid FK -> PizzaSizes.PizzaSizeId NULL -- Nullable for non-sized items (e.g., drinks)
- ItemNameSnapshot: String(100) NOT NULL -- e.g., "Large Pepperoni" or "16\" Custom Pie"
- Quantity: Int NOT NULL (Default: 1)
- UnitPrice: Decimal(10,2) NOT NULL
- LineTotal: Decimal(10,2) NOT NULL

### OrderItemToppings

- OrderItemToppingId: Guid PK
- OrderItemId: Guid FK -> OrderItems.OrderItemId NOT NULL
- IngredientId: Guid FK -> Ingredients.IngredientId NOT NULL
- Coverage: String(20) NOT NULL -- "Whole", "LeftHalf", "RightHalf"
- ExtraAmount: String(20) NOT NULL -- "Light", "Standard", "Extra"
- PriceAdjustment: Decimal(10,2) NOT NULL (Default: 0.00)
