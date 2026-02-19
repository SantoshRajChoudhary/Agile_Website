import * as React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";
import { Slot } from "@radix-ui/react-slot";
import { Controller, FormProvider, useFormContext } from "react-hook-form";

import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";

/* ------------------------------------------------------------------ */
/* Form Root */
/* ------------------------------------------------------------------ */

const Form = FormProvider;

/* ------------------------------------------------------------------ */
/* Form Field Context */
/* ------------------------------------------------------------------ */

const FormFieldContext = React.createContext({});

/* ------------------------------------------------------------------ */
/* FormField */
/* ------------------------------------------------------------------ */

const FormField = (props) => {
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  );
};

/* ------------------------------------------------------------------ */
/* useFormField Hook */
/* ------------------------------------------------------------------ */

const useFormField = () => {
  const fieldContext = React.useContext(FormFieldContext);
  const itemContext = React.useContext(FormItemContext);
  const { getFieldState, formState } = useFormContext();

  if (!fieldContext?.name) {
    throw new Error("useFormField must be used within <FormField>");
  }

  const fieldState = getFieldState(fieldContext.name, formState);
  const { id } = itemContext;

  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState,
  };
};

/* ------------------------------------------------------------------ */
/* Form Item Context */
/* ------------------------------------------------------------------ */

const FormItemContext = React.createContext({});

/* ------------------------------------------------------------------ */
/* FormItem */
/* ------------------------------------------------------------------ */

const FormItem = React.forwardRef(({ className, ...props }, ref) => {
  const id = React.useId();

  return (
    <FormItemContext.Provider value={{ id }}>
      <div ref={ref} className={cn("space-y-2", className)} {...props} />
    </FormItemContext.Provider>
  );
});
FormItem.displayName = "FormItem";

/* ------------------------------------------------------------------ */
/* FormLabel */
/* ------------------------------------------------------------------ */

const FormLabel = React.forwardRef(({ className, ...props }, ref) => {
  const { error, formItemId } = useFormField();

  return (
    <Label
      ref={ref}
      htmlFor={formItemId}
      className={cn(error && "text-destructive", className)}
      {...props}
    />
  );
});
FormLabel.displayName = "FormLabel";

/* ------------------------------------------------------------------ */
/* FormControl */
/* ------------------------------------------------------------------ */

const FormControl = React.forwardRef((props, ref) => {
  const { error, formItemId, formDescriptionId, formMessageId } =
    useFormField();

  return (
    <Slot
      ref={ref}
      id={formItemId}
      aria-describedby={
        error
          ? `${formDescriptionId} ${formMessageId}`
          : formDescriptionId
      }
      aria-invalid={!!error}
      {...props}
    />
  );
});
FormControl.displayName = "FormControl";

/* ------------------------------------------------------------------ */
/* FormDescription */
/* ------------------------------------------------------------------ */

const FormDescription = React.forwardRef(
  ({ className, ...props }, ref) => {
    const { formDescriptionId } = useFormField();

    return (
      <p
        ref={ref}
        id={formDescriptionId}
        className={cn("text-sm text-muted-foreground", className)}
        {...props}
      />
    );
  }
);
FormDescription.displayName = "FormDescription";

/* ------------------------------------------------------------------ */
/* FormMessage */
/* ------------------------------------------------------------------ */

const FormMessage = React.forwardRef(
  ({ className, children, ...props }, ref) => {
    const { error, formMessageId } = useFormField();
    const message = error?.message || children;

    if (!message) return null;

    return (
      <p
        ref={ref}
        id={formMessageId}
        className={cn("text-sm font-medium text-destructive", className)}
        {...props}
      >
        {String(message)}
      </p>
    );
  }
);
FormMessage.displayName = "FormMessage";

/* ------------------------------------------------------------------ */
/* Exports */
/* ------------------------------------------------------------------ */

export {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  useFormField,
};
