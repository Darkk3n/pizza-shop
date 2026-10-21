import type { FieldValues, Path, UseFormSetError } from "react-hook-form";
import type { ActionFailure } from "@/lib/helpers/actions";

// Puts a failed Server Action's errors onto React Hook Form fields; returns the message
// to show above the form (including field errors for fields the form doesn't have).
export const applyActionErrors = <T extends FieldValues>(
  result: ActionFailure,
  setError: UseFormSetError<T>,
  fields: readonly Path<T>[],
) => {
  const unplaced: string[] = [];
  for (const [field, message] of Object.entries(result.fieldErrors ?? {})) {
    if ((fields as readonly string[]).includes(field)) setError(field as Path<T>, { message });
    else unplaced.push(message);
  }
  return [result.message, ...unplaced].filter(Boolean).join(" ") || null;
};
