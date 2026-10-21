import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import type { Order } from "@/lib/api/schemas/orders";
import { AMOUNT_LABELS, COVERAGE_LABELS, formatMoney } from "@/lib/helpers/format";

// Items, toppings and totals as stored on the order (price snapshots), for staff and customers.
// Coverage is always spelled out because the kitchen reads it.
export const OrderItemsTable = ({ order }: { order: Order }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Item</TableHead>
          <TableHead className="text-right">Qty</TableHead>
          <TableHead className="text-right">Unit</TableHead>
          <TableHead className="text-right">Line</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {order.items.map((item) => (
          <TableRow key={item.orderItemId}>
            <TableCell className="whitespace-normal">
              <div className="font-medium">{item.itemNameSnapshot}</div>
              {item.toppings.length > 0 && (
                <ul className="mt-1 flex flex-col gap-0.5 text-sm text-muted-foreground">
                  {item.toppings.map((topping) => (
                    <li key={topping.orderItemToppingId}>
                      + {topping.ingredientName} · {COVERAGE_LABELS[topping.coverage]}
                      {topping.extraAmount !== "Standard" && ` · ${AMOUNT_LABELS[topping.extraAmount]}`}
                      <span className="font-mono"> ({formatMoney(topping.priceAdjustment)})</span>
                    </li>
                  ))}
                </ul>
              )}
            </TableCell>
            <TableCell className="text-right align-top tabular-nums">{item.quantity}</TableCell>
            <TableCell className="text-right align-top font-mono tabular-nums">{formatMoney(item.unitPrice)}</TableCell>
            <TableCell className="text-right align-top font-mono tabular-nums">{formatMoney(item.lineTotal)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Subtotal</TableCell>
          <TableCell className="text-right font-mono tabular-nums">{formatMoney(order.subTotal)}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell colSpan={3}>Tax</TableCell>
          <TableCell className="text-right font-mono tabular-nums">{formatMoney(order.tax)}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell colSpan={3} className="font-semibold">
            Total
          </TableCell>
          <TableCell className="text-right font-mono font-semibold tabular-nums">{formatMoney(order.total)}</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
};
