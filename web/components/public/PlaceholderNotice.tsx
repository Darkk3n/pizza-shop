import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

// Marks text that still needs the owner's real content (legal pages) before going public.
export const PlaceholderNotice = () => {
  return (
    <Alert>
      <AlertTitle>Placeholder text</AlertTitle>
      <AlertDescription>
        This page is a starting template, not legal advice. Replace it with your own reviewed text before launch.
      </AlertDescription>
    </Alert>
  );
};
