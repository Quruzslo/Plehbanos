// export type Product = {
//   id: string;
//   category: Category;
//   slug: string;
//   name: string;
//   description: string;
//   price: number;
//   parameters: {
//     heightCm: number;
//     widthCm: number;
//     weightKg: number;
//     color: string;
//   };
//   stock: number;
//   img: string;
//   salePrice: number | null;
// };

// export const CATEGORIES = {
//   "kerti-disz": "Kerti dísz",
//   "haz-elem": "Ház elem",
// } as const;
// export type Category = keyof typeof CATEGORIES;

// const products: Product[] = [
//   {
//     id: "1",
//     category: "haz-elem",
//     slug: "szelkakas",
//     name: "Réz szélkakas",
//     description:
//       "Kézzel formázott rézlemezből készült szélkakas, amely a tetőgerincen vagy egy kerti oszlop tetején mutatja a szélirányt. A réz az időjárás hatására idővel nemes patinát kap, így évről évre karakteresebb lesz. 120 cm-es magasságával messziről is látszik, a ház jellegzetes díszévé válik.",
//     price: 145000,
//     parameters: {
//       heightCm: 120,
//       widthCm: 80,
//       weightKg: 6,
//       color: "rez",
//     },
//     stock: 1,
//     img: "/products/szelkakas.jpg",
//     salePrice: 125000,
//   },
//   {
//     id: "2",
//     category: "kerti-disz",
//     slug: "flamingo",
//     name: "Bádog flamingó",
//     description:
//       "Kézzel hajlított bádoglemezből készült flamingó, a megszokott műanyag kerti figurák egyedi és tartós alternatívája. Kültéri használatra készült, így egész évben a helyén maradhat. Egy darab, ami a kert hangulatát egyszerre teszi játékossá és igényessé.",
//     price: 125000,
//     parameters: {
//       heightCm: 100,
//       widthCm: 60,
//       weightKg: 3,
//       color: "szurke",
//     },
//     stock: 1,
//     img: "/products/flamingo.webp",
//     salePrice: 0,
//   },
//   {
//     id: "3",
//     category: "haz-elem",
//     slug: "sarkany",
//     name: "Vízköpő sárkány",
//     description:
//       "Az ereszcsatorna kifolyójára szerelhető sárkányfej, amelynek száján át távozik az esővíz. A régi templomok és kastélyok vízköpőinek hagyományát idézi: funkcionális elem és díszítés egyben. Esős időben válik igazán látványossá.",
//     price: 65000,
//     parameters: {
//       heightCm: 30,
//       widthCm: 45,
//       weightKg: 1.5,
//       color: "szurke",
//     },
//     stock: 1,
//     img: "/products/sarkany.jpg",
//     salePrice: 55000,
//   },
//   {
//     id: "4",
//     category: "haz-elem",
//     slug: "csucsdisz",
//     name: "Bádog csúcsdísz",
//     description:
//       "Tornyok, sátortetők és tetőgerincek csúcsára készült díszítőelem, a régi polgári házak és kúriák tetőit idéző formával. Kézzel készül bádoglemezből, és pontot tesz a tetőzet végére. Egyedi méretben és formában is kérhető.",
//     price: 35000,
//     parameters: {
//       heightCm: 70,
//       widthCm: 30,
//       weightKg: 3,
//       color: "szurke",
//     },
//     stock: 1,
//     img: "/products/csucsdisz.jpg",
//     salePrice: 25000,
//   },
// ];
// export function getProducts(category: Category | null = null) {
//   return category ? products.filter((p) => p.category === category) : products;
// }

// export async function getProductBySlug(slug: string) {
//   return products.find((p) => p.slug === slug) ?? null;
// }

// export async function getFirstProducts(count = 3) {
//   return products.slice(0, count);
// }

// export function getCategories() {
//   return [...new Set(products.map((p) => p.category))];
// }

// export function getCategoriesCount(cat: any) {
//   if (cat === "") return products.length;
//   return products.filter((p) => p.category === cat).length;
// }
