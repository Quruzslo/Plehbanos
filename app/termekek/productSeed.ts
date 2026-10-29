// import "dotenv/config";
// import { drizzle } from "drizzle-orm/node-postgres";
// import { products } from "@/src/db/schema";

// const db = drizzle(process.env.DATABASE_URL!);

// type NewProduct = typeof products.$inferInsert;

// const seedProducts: NewProduct[] = [
//   {
//     category: "haz-elem",
//     slug: "szelkakas",
//     name: "Réz szélkakas",
//     description:
//       "Kézzel formázott rézlemezből készült szélkakas, amely a tetőgerincen vagy egy kerti oszlop tetején mutatja a szélirányt. A réz az időjárás hatására idővel nemes patinát kap, így évről évre karakteresebb lesz. 120 cm-es magasságával messziről is látszik, a ház jellegzetes díszévé válik.",
//     price: 145000,
//     salePrice: 125000,
//     heightCm: 120,
//     widthCm: 80,
//     weightKg: 6,
//     color: "rez",
//     stock: 1,
//     img: "/products/szelkakas.jpg",
//   },
//   {
//     category: "kerti-disz",
//     slug: "flamingo",
//     name: "Bádog flamingó",
//     description:
//       "Kézzel hajlított bádoglemezből készült flamingó, a megszokott műanyag kerti figurák egyedi és tartós alternatívája. Kültéri használatra készült, így egész évben a helyén maradhat. Egy darab, ami a kert hangulatát egyszerre teszi játékossá és igényessé.",
//     price: 125000,
//     salePrice: 0,
//     heightCm: 100,
//     widthCm: 60,
//     weightKg: 3,
//     color: "szurke",
//     stock: 1,
//     img: "/products/flamingo.webp",
//   },
//   {
//     category: "haz-elem",
//     slug: "sarkany",
//     name: "Vízköpő sárkány",
//     description:
//       "Az ereszcsatorna kifolyójára szerelhető sárkányfej, amelynek száján át távozik az esővíz. A régi templomok és kastélyok vízköpőinek hagyományát idézi: funkcionális elem és díszítés egyben. Esős időben válik igazán látványossá.",
//     price: 65000,
//     salePrice: 55000,
//     heightCm: 30,
//     widthCm: 45,
//     weightKg: 1.5,
//     color: "szurke",
//     stock: 1,
//     img: "/products/sarkany.jpg",
//   },
//   {
//     category: "haz-elem",
//     slug: "csucsdisz",
//     name: "Bádog csúcsdísz",
//     description:
//       "Tornyok, sátortetők és tetőgerincek csúcsára készült díszítőelem, a régi polgári házak és kúriák tetőit idéző formával. Kézzel készül bádoglemezből, és pontot tesz a tetőzet végére. Egyedi méretben és formában is kérhető.",
//     price: 35000,
//     salePrice: 25000,
//     heightCm: 70,
//     widthCm: 30,
//     weightKg: 3,
//     color: "szurke",
//     stock: 1,
//     img: "/products/csucsdisz.jpg",
//   },
// ];

// async function main() {
//   await db.insert(products).values(seedProducts);
//   console.log(`Seed kész: ${seedProducts.length} termék`);
// }

// main()
//   .catch((e) => {
//     console.error(e);
//     process.exitCode = 1;
//   })
//   .finally(() => db.$client.end());
