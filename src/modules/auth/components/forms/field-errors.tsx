import { AnyFieldMeta } from "@tanstack/react-form";
import { ZodError } from "zod/v4";

export function ErrorField({ meta }: { meta: AnyFieldMeta }) {
  if (!meta.isTouched) return null;

  return meta.errors.map(({ message }: ZodError, idx) => (
    <p key={idx} className="text-destructive mt-2 text-xs" role="alert" aria-live="polite">
      {message}
    </p>
  ));
}
