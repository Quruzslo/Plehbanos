import type { Order } from "@/lib/db/schema";

// Ezekben az állapotokban mondható le a rendelés (még nincs a futárnál).

export const CANCELLABLE: Order["status"][] = ["uj", "feldolgozas"];
