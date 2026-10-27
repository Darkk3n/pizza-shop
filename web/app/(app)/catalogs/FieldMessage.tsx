export const FieldMessage = ({ id, message }: { id: string; message?: string }) =>
  message ? (
    <p id={id} className="text-sm text-destructive">
      {message}
    </p>
  ) : null;
