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
- **Run local dev environment:** `pnpm dev`
- **Database local docker:** `db:up`
- **EF Core Migrations:** `dotnet ef migrations add <Name> --project api`
- **EF Core Update DB:** `dotnet ef database update --project api`

## Architectural Conventions

### Frontend (`web`)

- Use Next.js App Router (`app/` directory).
- Default to Server Components; explicitly place `"use client";` at the top of files handling UI interactivity or React Hook Form.
- Always use Zod schemas to validate form inputs and API request payloads. Derive TypeScript types using `z.infer<typeof schema>`.
- Keep complex form logic inside feature-specific hooks (`hooks/usePizzaBuilder.ts`).

### Backend (`api`)

- Use Minimal APIs organized via extension methods or typed endpoint groups (avoid bloated `Program.cs`).
- Use `DateTimeOffset` (not `DateTime`) for all time-based properties (`CreatedAt`, timestamps).
- Standardize responses using standard HTTP status codes and typed DTOs.
- DB Context maps `Decimal(10,2)` for currency and `Decimal(10,4)` for recipe ingredient measurements.

## Core Features & Business Rules

1. **Pizza Customizer:** Non-blocking client state handling size, crust, and fractional toppings (`Whole`, `LeftHalf`, `RightHalf`).
2. **Inventory Deduction:** Creating an order MUST automatically reduce ingredient stock based on `RecipeItems` + `OrderItemToppings`.
3. **Price Stability:** Orders store price snapshots (`UnitPrice`, `PriceAdjustment`) so future menu price updates don't alter historic financial data.
4. **Security:** Session timeouts after 30 minutes of inactivity in production environments.

## Database Schema Overview

### UnitOfMeasure (Seeded)

- UnitOfMeasureId: Guid PK
- Name: String(20) NOT NULL

### Ingredients

- IngredientId: Guid PK
- Name: String(50) NOT NULL
- UnitOfMeasureId: Guid FK -> UnitOfMeasure.UnitOfMeasureId NOT NULL
- CurrentStock: Decimal(10,2) NOT NULL (Default: 0.00)

### PizzaSizes (Seeded)

- PizzaSizeId: Guid PK
- Name: String(20) NOT NULL -- e.g., "Small", "Medium", "Large"
- PriceMultiplier: Decimal(3,2) NOT NULL (Default: 1.00) -- e.g., 1.00, 1.25, 1.50

### Recipes

- RecipeId: Guid PK
- Name: String(50) NOT NULL
- BasePrice: Decimal(10,2) NOT NULL

### RecipeItems

- RecipeItemId: Guid PK
- RecipeId: Guid FK -> Recipes.RecipeId NOT NULL
- IngredientId: Guid FK -> Ingredients.IngredientId NOT NULL
- Amount: Decimal(10,4) NOT NULL -- High precision for small units (e.g., yeast, spices)

### Orders

- OrderId: Guid PK
- OrderNumber: Int Identity / Auto-increment NOT NULL
- Status: String(20) NOT NULL -- "Pending", "Preparing", "Ready", "Completed"
- OrderType: String(20) NOT NULL -- "DineIn", "Takeout", "Delivery"
- SubTotal: Decimal(10,2) NOT NULL
- Tax: Decimal(10,2) NOT NULL
- Total: Decimal(10,2) NOT NULL
- CreatedAt: DateTimeOffset NOT NULL

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
