"use client";
import { useActionState } from "react";
import { LockKeyIcon, AtIcon } from "@phosphor-icons/react";
import { signInAction } from "@/lib/auth/auth-actions";

export default function Login() {
  const [state, formAction, pending] = useActionState(signInAction, null);

  return (
    <section className="w-full min-h-dvh flex flex-col bg-text">
      <div className="flex flex-col text-white w-[90%] lg:w-[450px] m-auto rounded-[10px] items-center border border-white/50 py-[35px]">
        <h1 className="text-[25px] font-bold mb-[50px]">Bejelentkezés</h1>

        <form
          action={formAction}
          className="flex flex-col gap-[20px] w-full px-[15px]"
        >
          <div className="flex flex-row gap-5 w-full">
            <AtIcon size={32} className="p-[5px]" />
            <input
              type="email"
              name="email"
              placeholder="E-mail cím"
              autoComplete="email"
              required
              className="w-full"
            />
          </div>
          <div className="flex flex-row gap-5 w-full">
            <LockKeyIcon size={32} className="p-[5px]" />
            <input
              type="password"
              name="password"
              placeholder="Jelszó"
              autoComplete="current-password"
              required
              className="w-full"
            />
          </div>

          {state?.error && (
            <p className="text-red-400 text-sm">{state.error}</p>
          )}

          <button type="submit" disabled={pending}>
            {pending ? "Belépés..." : "Belépés"}
          </button>
        </form>
      </div>
    </section>
  );
}
