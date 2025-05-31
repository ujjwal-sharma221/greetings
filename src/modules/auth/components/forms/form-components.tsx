import { useState } from "react";
import { LoaderCircleIcon, EyeIcon, EyeOffIcon, LucideIcon } from "lucide-react";
import { createFormHookContexts, createFormHook, useStore } from "@tanstack/react-form";

import { ErrorField } from "./field-errors";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const { fieldContext, formContext, useFieldContext, useFormContext } =
  createFormHookContexts();

export const { useAppForm } = createFormHook({
  fieldContext,
  formContext,
  fieldComponents: {
    TextField,
    PasswordField,
  },
  formComponents: {
    SubmitButton,
  },
});

export function TextField({ label, Icon }: { label: string; Icon: LucideIcon }) {
  const field = useFieldContext<string>();

  return (
    <div className="group relative">
      <label htmlFor={field.name}>
        <span className="text-sm">{label}</span>
      </label>
      <div className="relative">
        <Input
          placeholder=""
          id={field.name}
          value={field.state.value}
          onChange={(e) => field.handleChange(e.target.value)}
          onBlur={field.handleBlur}
          className="peer rounded-xl pe-9"
        />
        <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-3 peer-disabled:opacity-50">
          <Icon size={16} aria-hidden="true" />
        </div>
      </div>
      <ErrorField meta={field.state.meta} />
    </div>
  );
}

export function PasswordField({ label }: { label: string }) {
  const field = useFieldContext<string>();
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const toggleVisibility = () => setIsVisible((prevState) => !prevState);

  return (
    <div className="group relative">
      <label htmlFor={field.name}>
        <span className="text-sm">{label}</span>
      </label>
      <div className="relative">
        <Input
          placeholder=""
          id={field.name}
          value={field.state.value}
          onChange={(e) => field.handleChange(e.target.value)}
          onBlur={field.handleBlur}
          className="peer rounded-xl"
          type={isVisible ? "text" : "password"}
        />
        <button
          className="text-muted-foreground/80 hover:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-md transition-[color,box-shadow] outline-none focus:z-10 focus-visible:ring-[3px] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
          type="button"
          onClick={toggleVisibility}
          aria-label={isVisible ? "Hide password" : "Show password"}
          aria-pressed={isVisible}
          aria-controls="password"
        >
          {isVisible ? (
            <EyeOffIcon size={16} aria-hidden="true" />
          ) : (
            <EyeIcon size={16} aria-hidden="true" />
          )}
        </button>
      </div>
      <ErrorField meta={field.state.meta} />
    </div>
  );
}

export function SubmitButton({
  children,
  isPending,
}: {
  children: React.ReactNode;
  isPending?: boolean;
}) {
  const form = useFormContext();
  const [isSubmitting, canSubmit] = useStore(form.store, (state) => [
    state.isSubmitting,
    state.canSubmit,
  ]);

  return (
    <Button
      disabled={isSubmitting || !canSubmit || isPending}
      type="submit"
      className="group relative w-full rounded-xl disabled:opacity-100"
      size="lg"
    >
      {isSubmitting || isPending ? (
        <div className="absolute inset-0 flex items-center justify-center">
          <LoaderCircleIcon className="animate-spin" size={16} aria-hidden="true" />
        </div>
      ) : (
        children
      )}
    </Button>
  );
}
