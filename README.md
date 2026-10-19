# Pizza Shop POS

A full-stack point-of-sale system for pizza restaurant owners: order management, automatic inventory deduction, recipe and cost management, and live sales analytics.

> **Status:** Early development. The `web` and `api` projects are scaffolded; the features below describe the planned scope.

## Features

- **Pizza customizer:** build pizzas by size, with toppings on the whole pie or on the left or right half.
- **Inventory auto-deduction:** placing an order reduces ingredient stock based on the recipe plus any added toppings.
- **Recipe and cost management:** define recipes from ingredients with precise measurements.
- **Price stability:** orders store price snapshots, so later menu price changes don't alter historical sales data.
- **Sales analytics:** live view of orders and revenue.
- **Session security:** sessions time out after 30 minutes of inactivity in production.

## Tech Stack

| Layer    | Technology                                                              |
| -------- | ----------------------------------------------------------------------- |
| Monorepo | pnpm workspaces                                                         |
| Frontend | Next.js 16 (App Router), React 19, Tailwind CSS 4, React Hook Form, Zod |
| Backend  | ASP.NET 10 Minimal APIs, C# 14, Entity Framework Core                   |
| Database | PostgreSQL 18 (container locally)                                       |
| Cloud    | Azure: Static Web Apps (web), App Service / Container Apps (api)        |

## Repository Structure

```
pizza-shop/
├── api/                  # ASP.NET 10 Minimal API (PizzaShop.Api)
├── web/                  # Next.js frontend
├── docker-compose.yml    # Local PostgreSQL
├── .env.example          # Database credentials template
└── package.json          # Root scripts for running everything
```

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) and [pnpm](https://pnpm.io/)
- [.NET 10 SDK](https://dotnet.microsoft.com/download)
- [Podman](https://podman.io/) with `podman compose` (used by the `db:*` scripts)
- EF Core CLI tools: `dotnet tool install --global dotnet-ef`

### Setup

1. Install dependencies:

   ```bash
   pnpm install
   ```

2. Create your environment file and set the database credentials:

   ```bash
   cp .env.example .env
   ```

3. Start PostgreSQL:

   ```bash
   pnpm db:up
   ```

4. Start the web and API dev servers:

   ```bash
   pnpm dev
   ```

   This runs both projects concurrently and opens the browser when the frontend is ready.

| Service  | URL                                                     |
| -------- | ------------------------------------------------------- |
| Web      | http://localhost:3000                                   |
| API      | http://localhost:5261 (https://localhost:7033 on HTTPS) |
| Postgres | localhost:5432, database `pizzashop_db`                 |

In Development the API seeds sample data on startup: a menu (ingredients, toppings and recipes; only when the database has none) and these accounts, all with the password `Dev!Pass123`:

| Account                  | Role     |
| ------------------------ | -------- |
| `admin@pizzashop.dev`    | Admin    |
| `staff@pizzashop.dev`    | Staff    |
| `customer@pizzashop.dev` | Customer |

Set `DevSeed:Enabled` to `false` to turn it off. It never runs outside Development.

## Scripts

| Command        | Description                                         |
| -------------- | --------------------------------------------------- |
| `pnpm dev`     | Run web and API together in watch mode              |
| `pnpm dev:web` | Run only the Next.js frontend                       |
| `pnpm dev:api` | Run only the API with `dotnet watch`                |
| `pnpm db:up`   | Start the PostgreSQL container                      |
| `pnpm db:down` | Stop the PostgreSQL container                       |
| `pnpm test:api` | Run the API integration tests (own `pizzashop_tests` database) |

### Database migrations

```bash
dotnet ef migrations add <Name> --project api
dotnet ef database update --project api
```

## Data Model

```
UnitOfMeasure ─< Ingredients ─< RecipeItems >─ Recipes
                     │                            │
                     │                            │ (nullable)
                     └──< OrderItemToppings >── OrderItems >── Orders
                                                  │
                                    PizzaSizes ───┘ (nullable)
```

| Table               | Purpose                                                                             |
| ------------------- | ----------------------------------------------------------------------------------- |
| `UnitOfMeasure`     | Seeded measurement units for ingredients                                            |
| `Ingredients`       | Stock items with current quantity on hand                                           |
| `PizzaSizes`        | Seeded sizes with a price multiplier (e.g. 1.00, 1.25, 1.50)                        |
| `Recipes`           | Menu items with a base price                                                        |
| `RecipeItems`       | Ingredient amounts per recipe (high precision, `decimal(10,4)`)                     |
| `Orders`            | Order header: number, status, type (DineIn/Takeout/Delivery), totals, timestamp     |
| `OrderItems`        | Line items with a name and unit price snapshot; recipe is nullable for custom pies  |
| `OrderItemToppings` | Per-item toppings with coverage (Whole/LeftHalf/RightHalf), amount, price adjustment |

Currency values use `decimal(10,2)` and timestamps use `DateTimeOffset`.

## Conventions

**Frontend**

- Server Components by default; add `"use client";` only for interactive components and forms.
- Validate all form inputs and API payloads with Zod, deriving types with `z.infer<typeof schema>`.
- Keep complex form logic in feature-specific hooks (e.g. `hooks/usePizzaBuilder.ts`).

**Backend**

- Organize Minimal API endpoints with extension methods or typed endpoint groups to keep `Program.cs` small.
- Return typed DTOs with standard HTTP status codes.
- Use `DateTimeOffset`, never `DateTime`, for time values.
