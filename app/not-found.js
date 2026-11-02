import Link from "next/link";

export default function NotFound() {
  return (
    <section
      data-header="light"
      className="flex min-h-dvh flex-col items-center justify-center gap-4 text-center"
    >
      <h1 className="text-[25px] font-bold">Ez az oldal nem található</h1>
      <p className="opacity-70">
        Lehet, hogy elírtad a címet, vagy az oldal már nem létezik.
      </p>
      <Link href="/" className="underline">
        Vissza a főoldalra
      </Link>
    </section>
  );
}
