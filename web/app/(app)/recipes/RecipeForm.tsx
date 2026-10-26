"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { PlusIcon, Trash2Icon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { useFieldArray, useForm, useWatch, type Path } from "react-hook-form";
import { toast } from "sonner";
import { ChoiceGroup } from "@/components/forms/ChoiceGroup";
import { FormAlert } from "@/components/forms/FormAlert";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select";
import type { Ingredient } from "@/lib/api/schemas/ingredients";
import type { Recipe } from "@/lib/api/schemas/menu";
import { recipeFormSchema, type RecipeForm as RecipeFormValues } from "@/lib/api/schemas/recipes";
import { applyActionErrors } from "@/lib/helpers/forms";
import { createRecipe, updateRecipe } from "./actions";

type RecipeFormProps = {
  // Absent = a new recipe.
  recipe?: Recipe;
  ingredients: Ingredient[];
};

const STATUS_CHOICES = [
  { value: "active", label: "On the menu" },
  { value: "retired", label: "Retired" },
] as const;

// An empty row; NaN shows as an empty number input until the admin types an amount.
const blankItem = () => ({ ingredientId: "", amount: Number.NaN });

const FieldMessage = ({ id, message }: { id: string; message?: string }) =>
  message ? (
    <p id={id} className="text-sm text-destructive">
      {message}
    </p>
  ) : null;

export const RecipeForm = ({ recipe, ingredients }: RecipeFormProps) => {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [formError, setFormError] = useState<string | null>(null);
  const {
    control,
    register,
    handleSubmit,
    setValue,
    setError,
    formState: { errors },
  } = useForm<RecipeFormValues>({
    resolver: zodResolver(recipeFormSchema),
    defaultValues: recipe
      ? {
          name: recipe.name,
          basePrice: recipe.basePrice,
          isActive: recipe.isActive,
          items: recipe.items.map(({ ingredientId, amount }) => ({ ingredientId, amount })),
        }
      : { name: "", basePrice: Number.NaN, isActive: true, items: [blankItem()] },
  });
  const { fields, append, remove } = useFieldArray({ control, name: "items" });
  const [isActive, items] = useWatch({ control, name: ["isActive", "items"] });

  // Retired ingredients can't be newly added, but ones already in this recipe stay pickable
  // (the API allows keeping them), so editing an older recipe doesn't force a change.
  const inRecipe = new Set(recipe?.items.map((item) => item.ingredientId));
  const pickable = ingredients.filter((i) => i.isActive || inRecipe.has(i.ingredientId));
  const unitOf = new Map(ingredients.map((i) => [i.ingredientId, i.unitOfMeasureName]));
  const itemsError = errors.items?.root?.message ?? errors.items?.message;

  const onSubmit = handleSubmit((values) => {
    setFormError(null);
    startTransition(async () => {
      const result = recipe ? await updateRecipe(recipe.recipeId, values) : await createRecipe(values);
      if (result.ok) {
        toast.success(recipe ? `${values.name.trim()} saved.` : `${values.name.trim()} added to the menu.`);
        router.push("/recipes");
        return;
      }
      // 409 = another recipe already has this name.
      if (result.status === 409) {
        setError("name", { message: result.message ?? "Another recipe already has this name." });
        return;
      }
      const fieldPaths: Path<RecipeFormValues>[] = [
        "name",
        "basePrice",
        ...fields.flatMap((_, i) => [`items.${i}.ingredientId`, `items.${i}.amount`] as const),
      ];
      setFormError(applyActionErrors(result, setError, fieldPaths) ?? "Couldn't save the recipe.");
    });
  });

  return (
    <form onSubmit={onSubmit} noValidate className="flex max-w-2xl flex-col gap-6">
      <FormAlert message={formError} />

      {/* items-start: the price has a hint line below it, so without this the shorter name
          column stretches to match and its input drifts down out of line. */}
      <div className="grid items-start gap-4 sm:grid-cols-[1fr_12rem]">
        <div className="grid gap-2">
          <Label htmlFor="recipe-name">Name</Label>
          <Input
            id="recipe-name"
            autoComplete="off"
            aria-invalid={errors.name ? true : undefined}
            aria-describedby={errors.name ? "recipe-name-message" : undefined}
            {...register("name")}
          />
          <FieldMessage id="recipe-name-message" message={errors.name?.message} />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="recipe-price">Small price ($)</Label>
          <Input
            id="recipe-price"
            type="number"
            inputMode="decimal"
            step="0.01"
            min="0"
            aria-invalid={errors.basePrice ? true : undefined}
            aria-describedby={errors.basePrice ? "recipe-price-message" : "recipe-price-hint"}
            {...register("basePrice", { valueAsNumber: true })}
          />
          {errors.basePrice ? (
            <FieldMessage id="recipe-price-message" message={errors.basePrice.message} />
          ) : (
            <p id="recipe-price-hint" className="text-sm text-muted-foreground">
              Larger sizes scale it.
            </p>
          )}
        </div>
      </div>

      {recipe && (
        <ChoiceGroup
          legend="Status"
          value={isActive ? "active" : "retired"}
          choices={STATUS_CHOICES}
          onChange={(next) => setValue("isActive", next === "active", { shouldDirty: true })}
        />
      )}

      <fieldset className="flex flex-col gap-3">
        <legend className="mb-1 text-sm font-medium">Ingredients</legend>
        <p className="text-sm text-muted-foreground">
          Amounts are for a Small pizza; orders scale them by size and deduct them from stock.
        </p>
        <ul className="flex flex-col gap-3">
          {fields.map((field, index) => {
            const ingredientId = items?.[index]?.ingredientId;
            const rowErrors = errors.items?.[index];
            const selectId = `item-${field.id}-ingredient`;
            const amountId = `item-${field.id}-amount`;
            return (
              <li key={field.id} className="grid grid-cols-[1fr_auto] items-start gap-2 sm:grid-cols-[1fr_10rem_auto]">
                <div className="col-span-2 grid gap-1 sm:col-span-1">
                  <Label htmlFor={selectId} className="sr-only">
                    Ingredient {index + 1}
                  </Label>
                  <NativeSelect
                    id={selectId}
                    className="w-full"
                    aria-invalid={rowErrors?.ingredientId ? true : undefined}
                    aria-describedby={rowErrors?.ingredientId ? `${selectId}-message` : undefined}
                    {...register(`items.${index}.ingredientId`)}
                  >
                    <NativeSelectOption value="" disabled>
                      Pick an ingredient
                    </NativeSelectOption>
                    {pickable.map((ingredient) => (
                      <NativeSelectOption key={ingredient.ingredientId} value={ingredient.ingredientId}>
                        {ingredient.name}
                        {ingredient.isActive ? "" : " (retired)"}
                      </NativeSelectOption>
                    ))}
                  </NativeSelect>
                  <FieldMessage id={`${selectId}-message`} message={rowErrors?.ingredientId?.message} />
                </div>
                <div className="grid gap-1">
                  <Label htmlFor={amountId} className="sr-only">
                    Amount {index + 1}
                  </Label>
                  <div className="flex items-center gap-2">
                    <Input
                      id={amountId}
                      type="number"
                      inputMode="decimal"
                      step="0.0001"
                      min="0"
                      placeholder="Amount"
                      aria-invalid={rowErrors?.amount ? true : undefined}
                      aria-describedby={rowErrors?.amount ? `${amountId}-message` : undefined}
                      {...register(`items.${index}.amount`, { valueAsNumber: true })}
                    />
                    <span className="w-12 shrink-0 truncate text-sm text-muted-foreground">
                      {(ingredientId && unitOf.get(ingredientId)) || ""}
                    </span>
                  </div>
                  <FieldMessage id={`${amountId}-message`} message={rowErrors?.amount?.message} />
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  disabled={fields.length === 1}
                  onClick={() => remove(index)}
                  aria-label={`Remove ingredient ${index + 1}`}
                >
                  <Trash2Icon />
                </Button>
              </li>
            );
          })}
        </ul>
        <FieldMessage id="recipe-items-message" message={itemsError} />
        <Button type="button" variant="outline" size="sm" className="w-fit" onClick={() => append(blankItem())}>
          <PlusIcon />
          Add ingredient
        </Button>
      </fieldset>

      <div className="flex gap-2">
        <Button type="submit" disabled={pending}>
          {pending ? "Saving…" : recipe ? "Save changes" : "Add recipe"}
        </Button>
        <Link href="/recipes" className={buttonVariants({ variant: "outline" })}>
          Cancel
        </Link>
      </div>
    </form>
  );
};
