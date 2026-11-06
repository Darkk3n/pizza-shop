import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

// Marks text that still needs the owner's real content (legal pages) before going public.
export const PlaceholderNotice = () => {
  return (
    <Alert>
      <AlertTitle>Texto provisional</AlertTitle>
      <AlertDescription>
        Esta página es una plantilla inicial, no asesoría legal. Reemplázala con un texto revisado antes del lanzamiento.
      </AlertDescription>
    </Alert>
  );
};
