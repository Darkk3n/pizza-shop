import Link from "next/link";
import { connection } from "next/server";
import { RecipeCard } from "@/components/menu/RecipeCard";
import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getPublicMenu } from "@/lib/api/public";
import type { PublicMenu } from "@/lib/api/schemas/public";
import { formatMoney } from "@/lib/helpers/format";

// Sections of the signed-out landing and menu, all fed by one cached GET /api/public/menu.
// connection() keeps them out of the prerender, so `next build` never needs the API; at runtime the
// cache serves every visitor. A failed call shows a short note instead of breaking the whole page.
const loadMenu = async (): Promise<PublicMenu | null> => {
  await connection();
  try {
    return await getPublicMenu();
  } catch (error) {
    console.error("Public menu unavailable", error);
    return null;
  }
};

const Unavailable = () => {
  return (
    <p className="rounded-lg border border-dashed px-4 py-10 text-center text-muted-foreground">
      The menu can&apos;t be loaded right now. Please try again in a moment.
    </p>
  );
};

const RecipeGrid = ({ recipes, columns }: { recipes: PublicMenu["recipes"]; columns: "three" | "four" }) => {
  return (
    <ul className={columns === "four" ? "grid gap-4 sm:grid-cols-2 lg:grid-cols-4" : "grid gap-4 sm:grid-cols-2 lg:grid-cols-3"}>
      {recipes.map((recipe) => (
        <li key={recipe.recipeId}>
          <RecipeCard recipe={recipe} ingredients={recipe.ingredients} />
        </li>
      ))}
    </ul>
  );
};

const HIGHLIGHTS = 4;

// Landing page: most ordered lately, or the first recipes of the menu for a shop with no recent orders.
export const PopularPizzas = async () => {
  const menu = await loadMenu();
  if (!menu) return <Unavailable />;

  const byId = new Map(menu.recipes.map((recipe) => [recipe.recipeId, recipe]));
  const popular = menu.popularRecipeIds.flatMap((id) => byId.get(id) ?? []);
  const recipes = popular.length > 0 ? popular : menu.recipes.slice(0, HIGHLIGHTS);
  if (recipes.length === 0) return null;

  return (
    <section aria-labelledby="popular" className="flex flex-col gap-4">
      <div className="flex items-baseline justify-between gap-2">
        <h2 id="popular" className="text-2xl font-semibold tracking-tight">
          {popular.length > 0 ? "Popular right now" : "From our menu"}
        </h2>
        <Link href="/menu" className="text-sm text-muted-foreground hover:underline">
          Full menu
        </Link>
      </div>
      <RecipeGrid recipes={recipes} columns="four" />
    </section>
  );
};

// Each size's price for the cheapest pizza, rounded to cents like the API's quotes.
const fromPrice = (basePrice: number, multiplier: number) => Math.round(basePrice * multiplier * 100) / 100;

// Menu page: every pizza, then what sizes and toppings cost.
export const FullMenu = async () => {
  const menu = await loadMenu();
  if (!menu) return <Unavailable />;
  if (menu.recipes.length === 0) {
    return (
      <p className="rounded-lg border border-dashed px-4 py-12 text-center text-muted-foreground">
        The menu is empty right now. Check back soon.
      </p>
    );
  }

  const cheapest = Math.min(...menu.recipes.map((recipe) => recipe.basePrice));

  return (
    <div className="flex flex-col gap-10">
      <section aria-labelledby="pizzas" className="flex flex-col gap-4">
        <h2 id="pizzas" className="text-xl font-semibold tracking-tight">
          Pizzas
        </h2>
        <RecipeGrid recipes={menu.recipes} columns="three" />
      </section>

      <div className="grid gap-10 lg:grid-cols-2">
        {menu.sizes.length > 0 && (
          <section aria-labelledby="sizes" className="flex flex-col gap-3">
            <div className="flex flex-col gap-1">
              <h2 id="sizes" className="text-xl font-semibold tracking-tight">
                Sizes
              </h2>
              <p className="text-sm text-muted-foreground">Prices on the menu are for a Small; bigger sizes scale them.</p>
            </div>
            <div className="rounded-xl border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Size</TableHead>
                    <TableHead className="text-right">Pizzas from</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {menu.sizes.map((size) => (
                    <TableRow key={size.name}>
                      <TableCell className="font-medium">{size.name}</TableCell>
                      <TableCell className="text-right font-mono tabular-nums">
                        {formatMoney(fromPrice(cheapest, size.priceMultiplier))}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </section>
        )}

        {menu.toppings.length > 0 && (
          <section aria-labelledby="toppings" className="flex flex-col gap-3">
            <div className="flex flex-col gap-1">
              <h2 id="toppings" className="text-xl font-semibold tracking-tight">
                Extra toppings
              </h2>
              <p className="text-sm text-muted-foreground">
                Per Small pizza. Half a pizza costs half; light and extra portions are available too.
              </p>
            </div>
            <ul className="divide-y rounded-xl border px-4">
              {menu.toppings.map((topping) => (
                <li key={topping.name} className="flex items-baseline justify-between gap-3 py-2.5 text-sm">
                  <span>{topping.name}</span>
                  <span className="font-mono tabular-nums text-muted-foreground">+{formatMoney(topping.price)}</span>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </div>
  );
};

export const RecipeGridSkeleton = ({ count }: { count: number }) => {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4" aria-busy="true" aria-label="Loading menu">
      {Array.from({ length: count }, (_, i) => (
        <Skeleton key={i} className="h-36 rounded-xl" />
      ))}
    </div>
  );
};
