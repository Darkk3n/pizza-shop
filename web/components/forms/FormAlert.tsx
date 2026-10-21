import { CircleAlertIcon } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

// Form-level error (wrong password, rate limited, API down); announced to screen readers.
export const FormAlert = ({ message }: { message: string | null }) => {
  if (!message) return null;
  return (
    <Alert variant="destructive" role="alert">
      <CircleAlertIcon />
      <AlertDescription>{message}</AlertDescription>
    </Alert>
  );
};
