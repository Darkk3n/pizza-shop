import { PizzaIcon } from "lucide-react";
import Link from "next/link";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { formatMoney } from "@/lib/helpers/format";

type RecipeCardProps = {
  recipe: { recipeId: string; name: string; basePrice: number };
  ingredients: string[];
};

// A menu entry: the whole card opens the pizza builder. Used on /menu, the customer home page and
// the signed-out menu and landing (where /menu/{id} sends visitors to sign in first).
export const RecipeCard = ({ recipe, ingredients }: RecipeCardProps) => {
  return (
    <Card className="relative h-full transition-colors hover:bg-muted/50">
      <CardHeader className="gap-3">
        <div className="flex items-start justify-between gap-3">
          <PizzaIcon className="size-8 shrink-0 text-primary" aria-hidden="true" />
          <span className="font-mono text-sm text-muted-foreground">
            from <span className="font-semibold text-foreground">{formatMoney(recipe.basePrice)}</span>
          </span>
        </div>
        <CardTitle className="text-lg">
          {/* Stretched link: the whole card opens the builder. */}
          <Link
            href={`/menu/${recipe.recipeId}`}
            className="after:absolute after:inset-0 after:rounded-xl focus-visible:outline-none focus-visible:after:ring-2 focus-visible:after:ring-ring"
          >
            {recipe.name}
          </Link>
        </CardTitle>
        <CardDescription>{ingredients.join(", ")}</CardDescription>
      </CardHeader>
    </Card>
  );
};
