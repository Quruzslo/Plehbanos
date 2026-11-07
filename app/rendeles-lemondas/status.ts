import type { Order } from "@/lib/db/schema";

// Ezekben az állapotokban mondható le a rendelés (még nincs a futárnál).
// Ha csomagolás közben már nem akarod engedni, hagyd benne csak az "uj"-t.
export const CANCELLABLE: Order["status"][] = ["uj", "feldolgozas"];
