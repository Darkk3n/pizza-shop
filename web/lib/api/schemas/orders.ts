import { z } from "zod";

// Enums are strings on the wire (numbers are rejected by the API). Order matches api/Models/Enums.cs:
// Pending..Completed is the workflow, so a later entry is a later step.
export const ORDER_WORKFLOW = ["Pending", "Preparing", "Ready", "Completed"] as const;
export const orderStatusSchema = z.enum([...ORDER_WORKFLOW, "Cancelled"]);
export type OrderStatus = z.infer<typeof orderStatusSchema>;

export const orderTypeSchema = z.enum(["DineIn", "Takeout", "Delivery"]);
export type OrderType = z.infer<typeof orderTypeSchema>;

export const toppingCoverageSchema = z.enum(["Whole", "LeftHalf", "RightHalf"]);
export type ToppingCoverage = z.infer<typeof toppingCoverageSchema>;
export const toppingAmountSchema = z.enum(["Light", "Standard", "Extra"]);
export type ToppingAmount = z.infer<typeof toppingAmountSchema>;

// One order line as POST /api/orders and /api/orders/quote take it. No prices: the API computes them.
export const orderItemRequestSchema = z.object({
  recipeId: z.uuid(),
  pizzaSizeId: z.uuid().nullable(),
  quantity: z.number().int().min(1).max(100),
  toppings: z
    .array(
      z.object({
        ingredientId: z.uuid(),
        coverage: toppingCoverageSchema,
        extraAmount: toppingAmountSchema,
      }),
    )
    // The API allows each ingredient once per item.
    .refine((toppings) => new Set(toppings.map((t) => t.ingredientId)).size === toppings.length, {
      message: "Each topping can be added once.",
    }),
});

export type OrderItemRequest = z.infer<typeof orderItemRequestSchema>;

export const quoteRequestSchema = z.object({ items: z.array(orderItemRequestSchema).min(1) });

// POST /api/orders body (the Idempotency-Key goes in a header).
export const createOrderSchema = z.object({
  orderType: orderTypeSchema,
  items: z.array(orderItemRequestSchema).min(1, "Your cart is empty."),
});

export type CreateOrderInput = z.infer<typeof createOrderSchema>;

// POST /api/orders/quote: what the items cost right now. Nothing is saved.
export const orderQuoteSchema = z.object({
  items: z.array(
    z.object({
      recipeId: z.uuid(),
      pizzaSizeId: z.uuid().nullable(),
      itemNameSnapshot: z.string(),
      quantity: z.number().int(),
      unitPrice: z.number(),
      lineTotal: z.number(),
      toppings: z.array(
        z.object({
          ingredientId: z.uuid(),
          ingredientName: z.string(),
          coverage: toppingCoverageSchema,
          extraAmount: toppingAmountSchema,
          priceAdjustment: z.number(),
        }),
      ),
    }),
  ),
  subTotal: z.number(),
  tax: z.number(),
  total: z.number(),
});

export type OrderQuote = z.infer<typeof orderQuoteSchema>;

export const orderSummarySchema = z.object({
  orderId: z.uuid(),
  orderNumber: z.number().int(),
  status: orderStatusSchema,
  orderType: orderTypeSchema,
  subTotal: z.number(),
  tax: z.number(),
  total: z.number(),
  createdAt: z.string(),
  placedByEmail: z.string().nullable(),
  itemCount: z.number().int(),
});

export type OrderSummary = z.infer<typeof orderSummarySchema>;

export const orderItemToppingSchema = z.object({
  orderItemToppingId: z.uuid(),
  ingredientId: z.uuid(),
  ingredientName: z.string(),
  coverage: toppingCoverageSchema,
  extraAmount: toppingAmountSchema,
  priceAdjustment: z.number(),
});

export const orderItemSchema = z.object({
  orderItemId: z.uuid(),
  recipeId: z.uuid().nullable(),
  pizzaSizeId: z.uuid().nullable(),
  itemNameSnapshot: z.string(),
  quantity: z.number().int(),
  unitPrice: z.number(),
  lineTotal: z.number(),
  toppings: z.array(orderItemToppingSchema),
});

export const orderSchema = z.object({
  orderId: z.uuid(),
  orderNumber: z.number().int(),
  status: orderStatusSchema,
  orderType: orderTypeSchema,
  subTotal: z.number(),
  tax: z.number(),
  total: z.number(),
  createdAt: z.string(),
  placedByEmail: z.string().nullable(),
  cancelledAt: z.string().nullable(),
  cancelledByEmail: z.string().nullable(),
  cancellationReason: z.string().nullable(),
  items: z.array(orderItemSchema),
});

export type Order = z.infer<typeof orderSchema>;

export const pagedSchema = <T extends z.ZodType>(item: T) =>
  z.object({
    items: z.array(item),
    page: z.number().int(),
    pageSize: z.number().int(),
    totalCount: z.number().int(),
  });

export const orderSummaryPageSchema = pagedSchema(orderSummarySchema);

// Query string for the order board; invalid values fall back to defaults instead of erroring.
export const orderListQuerySchema = z.object({
  status: orderStatusSchema.optional().catch(undefined),
  page: z.coerce.number().int().min(1).max(100000).catch(1),
});

export const cancelOrderSchema = z.object({
  reason: z.string().trim().max(200, "Keep the reason under 200 characters."),
});

export type CancelOrderInput = z.infer<typeof cancelOrderSchema>;

// Forward-only, skipping allowed (PATCH /api/orders/{id}/status rejects anything else).
export const nextStatuses = (status: OrderStatus): OrderStatus[] => {
  const index = ORDER_WORKFLOW.indexOf(status as (typeof ORDER_WORKFLOW)[number]);
  return index === -1 ? [] : ORDER_WORKFLOW.slice(index + 1);
};

// Staff can cancel anything not yet Completed (customers only Pending, handled by the API).
export const isCancellable = (status: OrderStatus) =>
  status === "Pending" || status === "Preparing" || status === "Ready";

// GET /api/orders/feed, polled by staff screens through the BFF route app/api/orders/feed.
export const orderFeedSchema = z.object({
  latestOrderNumber: z.number().int(),
  cancelledSince: z.string(),
  activeVersion: z.string(),
  newOrders: z.array(
    z.object({
      orderId: z.uuid(),
      orderNumber: z.number().int(),
      orderType: orderTypeSchema,
      total: z.number(),
      placedByEmail: z.string().nullable(),
      itemCount: z.number().int(),
    }),
  ),
  cancelledOrders: z.array(
    z.object({
      orderId: z.uuid(),
      orderNumber: z.number().int(),
      cancelledByEmail: z.string().nullable(),
      cancellationReason: z.string().nullable(),
    }),
  ),
});

export type OrderFeed = z.infer<typeof orderFeedSchema>;

// Both cursors come back verbatim from the previous feed response.
export const orderFeedQuerySchema = z.object({
  after: z.coerce.number().int().min(0).optional(),
  cancelledAfter: z.iso.datetime({ offset: true }).optional(),
});

export type OrderFeedQuery = z.infer<typeof orderFeedQuerySchema>;
