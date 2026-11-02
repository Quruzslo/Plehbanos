"use client";
import { useActionState, useState } from "react";
import { z } from "zod";
import { LockKeyIcon, AtIcon, type Icon } from "@phosphor-icons/react";
import { signInAction } from "@/lib/auth/auth-actions";

const signInSchema = z.object({
  email: z.email("Érvénytelen email cím"),
  password: z.string().min(1, "Add meg a jelszavad").max(128),
});
type FieldErrors = Partial<
  Record<keyof z.infer<typeof signInSchema>, string[]>
>;

function Field({
  id,
  label,
  icon: IconCmp,
  error,
  ...props
}: {
  id: string;
  label: string;
  icon: Icon;
  error?: string;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="flex flex-col gap-1">
      <div
        className={`group flex items-end gap-3 border-b transition-colors focus-within:border-succes ${
          error ? "border-red-400" : "border-white/20"
        }`}
      >
        <IconCmp
          size={22}
          className="mb-2.5 shrink-0 text-white/50 transition-colors group-focus-within:text-succes"
        />
        <div className="relative w-full">
          <input
            id={id}
            name={id}
            placeholder=" "
            aria-invalid={!!error}
            aria-describedby={error ? `${id}-error` : undefined}
            className="peer w-full bg-transparent pt-6 pb-2 text-base text-white outline-none"
            {...props}
          />
          <label
            htmlFor={id}
            className="pointer-events-none absolute left-0 top-6 origin-left -translate-y-5 scale-75 text-white/50 transition-all duration-200 ease-out peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-5 peer-focus:scale-75 peer-focus:text-succes"
          >
            {label}
          </label>
        </div>
      </div>
      {error && (
        <p id={`${id}-error`} className="text-sm text-red-400">
          {error}
        </p>
      )}
    </div>
  );
}

export default function Login() {
  const [state, formAction, pending] = useActionState(signInAction, null);
  const [errors, setErrors] = useState<FieldErrors>({});

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    const parsed = signInSchema.safeParse(
      Object.fromEntries(new FormData(e.currentTarget)),
    );
    if (!parsed.success) {
      e.preventDefault();
      setErrors(z.flattenError(parsed.error).fieldErrors);
      return;
    }
    setErrors({});
  }

  return (
    <section className="flex min-h-dvh w-full bg-text">
      <div className="m-auto w-[90%] rounded-[10px] border border-white/15 px-6 py-10 text-white lg:w-[420px]">
        <h1 className="mb-10 text-center text-[25px] font-bold">
          Bejelentkezés
        </h1>

        <form
          action={formAction}
          onSubmit={handleSubmit}
          noValidate
          className="flex flex-col gap-6"
        >
          <Field
            id="email"
            label="E-mail cím"
            icon={AtIcon}
            type="email"
            autoComplete="email"
            error={errors.email?.[0]}
          />
          <Field
            id="password"
            label="Jelszó"
            icon={LockKeyIcon}
            type="password"
            autoComplete="current-password"
            error={errors.password?.[0]}
          />

          {state?.error && (
            <p role="alert" className="text-sm text-red-400">
              {state.error}
            </p>
          )}

          <button
            type="submit"
            disabled={pending}
            className="mt-4 rounded-[10px] bg-white py-3 font-semibold text-text transition-opacity hover:opacity-90 disabled:opacity-50"
          >
            {pending ? "Belépés..." : "Belépés"}
          </button>
        </form>
      </div>
    </section>
  );
}
