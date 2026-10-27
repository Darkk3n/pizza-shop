# Pizza Shop

A full-stack point-of-sale system for pizza restaurants: customer ordering, a live kitchen board, automatic inventory deduction, recipe and cost management, and sales analytics.

> **Status:** Feature-complete for in-store use (takeout and dine-in), covered by 115 API tests and CI on every push. Next up: Azure deployment, then discounts. Payments and delivery are not in scope yet.

## Features

### Customers

- **Home page:** follow orders in progress as they move through the kitchen, order a recent order again in one click, and see the most popular pizzas.
- **Pizza builder:** pick a size and add toppings on the whole pie or on the left or right half, as light, standard or extra. The price updates live as the pizza changes; it is always computed by the server, never by the browser.
- **Cart and checkout:** takeout or dine-in. Checkout is safe to retry: a double click or a dropped connection never creates a second order.
- **Order history:** past orders with their items, and cancellation while an order is still pending.
- **Accounts:** sign-up with email confirmation and password reset by email.

### Staff

- **Kitchen dashboard:** Pending, Preparing and Ready columns, oldest first, with one button to move each order to its next step.
- **Live notifications:** a toast and a sound for every new customer order and for cancellations made by someone else, on any staff screen. An open staff screen stays signed in; customers still time out after 30 minutes of inactivity.
- **Orders:** every order, filtered by status, where staff change the status (forward only) or cancel it with a reason.
- **Inventory:** current stock per ingredient, with restocks, waste and recounts recorded as adjustments. Manual adjustments can't take stock below zero; orders can, so a sale is never blocked by a miscount.

### Admins

- **Recipes:** build pizzas from ingredients and amounts, set the base price, and take them off the menu.
- **Catalogs:** ingredients and toppings (price and portion), pizza sizes (a multiplier that scales both price and ingredient usage) and units of measure.
- **Users:** promote accounts to Staff or Admin. The last admin can't be demoted.
- **Analytics:** sales and daily trend, top pizzas and toppings, ingredient usage and cancellations for any date range, plus a restock projection based on the last week's usage.

### Business rules worth noting

- **Inventory follows every order.** Placing an order deducts the recipe and topping amounts, scaled by size, half coverage and light/extra, in the same transaction as the order. The exact amounts are recorded per order, so a cancellation returns precisely what was taken even if the recipe changed since.
- **History never changes.** Orders keep a snapshot of names and prices, so later menu or price changes don't alter past sales. Recipes, ingredients and sizes that appear in orders can't be deleted; they are retired instead, which hides them from customers and new orders.
- **Cancelled orders are reported, not hidden.** They keep their items and totals, who cancelled and why, and appear in their own analytics section.
- **Dates are local.** Analytics ranges are whole days in the restaurant's time zone (America/Mexico_City), whatever the server's clock.
- **Hardened API.** Role-based access on every endpoint (a test fails if one is left open), rate limiting per user and per IP, and consistent Problem Details errors.

## Tech Stack

| Layer    | Technology                                                                                          |
| -------- | --------------------------------------------------------------------------------------------------- |
| Monorepo | pnpm workspaces                                                                                     |
| Frontend | Next.js 16 (App Router), React 19, Tailwind CSS 4, React Hook Form, Zod                             |
| Backend  | ASP.NET 10 Minimal APIs, C# 14, Entity Framework Core                                               |
| Database | PostgreSQL 18 (container locally)                                                                   |
| Email    | SMTP via MailKit (Mailpit locally)                                                                  |
| CI       | GitHub Actions: API build, tests and migration check; web typecheck, lint and build                 |
| Cloud    | Azure (planned): App Service (Linux) for web and api, Azure Database for PostgreSQL Flexible Server |

## Repository Structure

```
pizza-shop/
├── api/                      # ASP.NET 10 Minimal API (PizzaShop.Api)
├── web/                      # Next.js frontend (backend-for-frontend)
├── Tests/PizzaShop.Api.Tests # Integration and unit tests
├── .github/workflows/        # CI
└── CLAUDE.md                 # Architecture, conventions and business rules
```

## Architecture

```
Browser ──► Next.js (web) ──► ASP.NET API ──► PostgreSQL
            Server Components,  Identity bearer tokens,
            Server Actions,     EF Core, rate limiting
            httpOnly cookies
```

The browser never talks to the API or sees a token. The Next.js app is a backend-for-frontend: it keeps the tokens in httpOnly cookies, renders pages on the server, runs form submissions as Server Actions, and refreshes the session shortly before it expires.

## Data Model

```
UnitOfMeasure ─< Ingredients ─< RecipeItems >─ Recipes
                     │                            │
                     ├──< OrderItemToppings >── OrderItems >── Orders ── Users
                     │                            │              │
                     │              PizzaSizes ───┘              │
                     └──────< OrderIngredientUsages >────────────┘
```

| Table                   | Purpose                                                                               |
| ----------------------- | ------------------------------------------------------------------------------------- |
| `UnitOfMeasure`         | Units ingredients are stocked and measured in                                         |
| `Ingredients`           | Stock on hand; optionally a topping with a price and portion; can be retired          |
| `PizzaSizes`            | Sizes with a multiplier for price and ingredient usage; can be retired                |
| `Recipes`               | Menu pizzas with a base (Small) price; can be retired                                 |
| `RecipeItems`           | Ingredient amounts per recipe (high precision, `decimal(10,4)`)                       |
| `Orders`                | Number, status, type, totals, who placed it, idempotency key, cancellation details    |
| `OrderItems`            | Line items with name and unit price snapshots                                         |
| `OrderItemToppings`     | Per-item toppings with coverage (Whole/LeftHalf/RightHalf), amount and price snapshot |
| `OrderIngredientUsages` | Exactly what each order deducted from stock, returned on cancellation                 |

Users and roles live in the same database (ASP.NET Core Identity). Currency uses `decimal(10,2)` and timestamps use `DateTimeOffset`.

## Conventions

**Frontend**

- Server Components by default; `"use client";` only for interactive components and forms.
- Zod validates every form and every API response, and types are derived with `z.infer<typeof schema>`.
- Mutations are Server Actions that return a typed result. API validation errors (including indexed fields like `Items[0].RecipeId`) map back onto the right form field.
- Every page and Server Action checks the caller's role itself; hiding a link is never the security boundary.
- Complex form logic lives in feature hooks (e.g. `hooks/usePizzaBuilder.ts`); UI primitives come from shadcn/ui.

**Backend**

- Minimal API endpoint groups per resource, each opting into authorization explicitly; `Program.cs` stays small.
- Typed DTOs and standard status codes; every error is Problem Details (`application/problem+json`).
- Business math (order pricing, stock deduction, statistics ranges, restock projection) is pure code with its own unit tests, separate from the endpoints.
- Integration tests run through the public HTTP API against a real PostgreSQL database.
- Prices and tax are always computed on the server; clients never send a price.
- `DateTimeOffset`, never `DateTime`, for time values.

**Workflow**

- `CLAUDE.md` is the single source of truth for architecture and business rules, updated in the same change as the code.
- Each feature lands as a small, focused commit, and CI must pass on `main`.
