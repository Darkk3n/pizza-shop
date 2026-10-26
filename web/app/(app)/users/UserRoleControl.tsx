"use client";

import { useState, useTransition } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select";
import { userRoleSchema, type UserRole } from "@/lib/api/schemas/users";
import { updateUserRole } from "./actions";

const ROLE_LABELS: Record<UserRole, string> = {
  Customer: "Customer (orders only)",
  Staff: "Staff (orders + inventory)",
  Admin: "Admin (everything)",
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
        toast.success(`${email} is now ${selected === "Customer" ? "a customer" : selected.toLowerCase()}.`);
      } else {
        // 409 = the last admin; anything else is unexpected. Either way, show the stored role again.
        setError(result.message || Object.values(result.fieldErrors ?? {}).join(" ") || "Couldn't change the role.");
        setSelected(role);
      }
    });
  };

  return (
    <div className="flex flex-col items-end gap-1">
      <div className="flex items-center gap-2">
        <label htmlFor={selectId} className="sr-only">
          Role for {email}
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
              {ROLE_LABELS[option]}
            </NativeSelectOption>
          ))}
        </NativeSelect>
        {selected !== role && (
          <Button size="sm" disabled={pending} onClick={save}>
            {pending ? "Saving…" : "Save"}
          </Button>
        )}
      </div>
      {isSelf && (
        <p id={`${selectId}-self`} className="text-xs text-muted-foreground">
          That&apos;s you. Another admin can change your role.
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
