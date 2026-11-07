"use client";

import { useState, useTransition } from "react";
import { cancelOrder } from "../actions";

export default function CancelButton({ token }: { token: string }) {
  const [confirming, setConfirming] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  const handleCancel = () =>
    startTransition(async () => {
      const res = await cancelOrder(token);
      if (res.error) setError(res.error);
    });

  if (!confirming) {
    return (
      <button
        type="button"
        onClick={() => setConfirming(true)}
        className="bg-accent text-white font-bold p-[12px] rounded-md cursor-pointer"
      >
        Rendelés lemondása
      </button>
    );
  }

  return (
    <div className="flex flex-col gap-[15px]">
      <p className="font-bold">Biztosan lemondod a rendelést?</p>
      <div className="flex gap-[10px]">
        <button
          type="button"
          onClick={handleCancel}
          disabled={pending}
          className="bg-accent text-white font-bold p-[12px] rounded-md cursor-pointer disabled:opacity-50"
        >
          {pending ? "Lemondás…" : "Igen, lemondom"}
        </button>
        <button
          type="button"
          onClick={() => setConfirming(false)}
          disabled={pending}
          className="border border-text/20 font-bold p-[12px] rounded-md cursor-pointer"
        >
          Mégsem
        </button>
      </div>
      {error && <p className="text-red-600">{error}</p>}
    </div>
  );
}
