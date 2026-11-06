"use client";

import { useState, useTransition } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select";
import { userRoleSchema, type UserRole } from "@/lib/api/schemas/users";
import { ROLE_LABELS } from "@/lib/helpers/format";
import { updateUserRole } from "./actions";

const ROLE_OPTIONS: Record<UserRole, string> = {
  Customer: `${ROLE_LABELS.Customer} (solo pedidos)`,
  Staff: `${ROLE_LABELS.Staff} (pedidos + inventario)`,
  Admin: `${ROLE_LABELS.Admin} (todo)`,
};

type UserRoleControlProps = {
  userId: string;
  email: string;
  role: UserRole;
  // Admins don't change their own role here, so they can't lock themselves out by accident;
  // another admin can.
  isSelf: boolean;
};

// Pick a role, then Save: changing a select on its own shouldn't change someone's access
// (keyboard arrows fire change events in some browsers).
export const UserRoleControl = ({ userId, email, role, isSelf }: UserRoleControlProps) => {
  const [selected, setSelected] = useState<UserRole>(role);
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();
  const selectId = `role-${userId}`;

  // A refresh after saving brings the new role in; drop the local choice so it follows it.
  const [savedRole, setSavedRole] = useState(role);
  if (role !== savedRole) {
    setSavedRole(role);
    setSelected(role);
  }

  const save = () => {
    setError(null);
    startTransition(async () => {
      const result = await updateUserRole(userId, selected);
      if (result.ok) {
        toast.success(`${email} ahora tiene el rol ${ROLE_LABELS[selected]}.`);
      } else {
        // 409 = the last admin; anything else is unexpected. Either way, show the stored role again.
        setError(result.message || Object.values(result.fieldErrors ?? {}).join(" ") || "No se pudo cambiar el rol.");
        setSelected(role);
      }
    });
  };

  return (
    <div className="flex flex-col items-end gap-1">
      <div className="flex items-center gap-2">
        <label htmlFor={selectId} className="sr-only">
          Rol de {email}
        </label>
        <NativeSelect
          id={selectId}
          size="sm"
          value={selected}
          disabled={isSelf || pending}
          aria-describedby={error ? `${selectId}-error` : isSelf ? `${selectId}-self` : undefined}
          onChange={(event) => {
            setError(null);
            setSelected(userRoleSchema.parse(event.target.value));
          }}
        >
          {userRoleSchema.options.map((option) => (
            <NativeSelectOption key={option} value={option}>
              {ROLE_OPTIONS[option]}
            </NativeSelectOption>
          ))}
        </NativeSelect>
        {selected !== role && (
          <Button size="sm" disabled={pending} onClick={save}>
            {pending ? "Guardando…" : "Guardar"}
          </Button>
        )}
      </div>
      {isSelf && (
        <p id={`${selectId}-self`} className="text-xs text-muted-foreground">
          Es tu cuenta. Otro administrador puede cambiar tu rol.
        </p>
      )}
      {error && (
        <p id={`${selectId}-error`} role="alert" className="max-w-72 text-right text-xs text-destructive">
          {error}
        </p>
      )}
    </div>
  );
};
