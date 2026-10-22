export type Product = {
  id: string;
  category: Category;
  slug: string;
  name: string;
  price: number;
  parameters: {
    heightCm: number;
    widthCm: number;
    weightKg: number;
    color: string;
  };

  img: string;
};

export const CATEGORIES = {
  "kerti-disz": "Kerti dísz",
  "haz-elem": "Ház elem",
} as const;
export type Category = keyof typeof CATEGORIES;

const products: Product[] = [
  {
    id: "1",
    category: "haz-elem",
    slug: "szelkakas",
    name: "Réz szélkakas",
    price: 145000,
    parameters: {
      heightCm: 120,
      widthCm: 80,
      weightKg: 6,
      color: "gray",
    },

    img: "/products/szelkakas.jpg",
  },
  {
    id: "2",
    category: "kerti-disz",
    slug: "flamingo",
    name: "Bádog flamingo",
    price: 125000,
    parameters: {
      heightCm: 100,
      widthCm: 60,
      weightKg: 3,
      color: "gray",
    },

    img: "/products/flamingo.webp",
  },
  {
    id: "3",
    category: "haz-elem",
    slug: "sarkany",
    name: "Vízköpő sárkány",
    price: 65000,
    parameters: {
      heightCm: 30,
      widthCm: 45,
      weightKg: 1.5,
      color: "gray",
    },

    img: "/products/sarkany.jpg",
  },
  {
    id: "4",
    category: "haz-elem",
    slug: "csucsdisz",
    name: "Bádog csúcsdísz",
    price: 35000,
    parameters: {
      heightCm: 70,
      widthCm: 30,
      weightKg: 3,
      color: "gray",
    },

    img: "/products/csucsdisz.jpg",
  },
];

export async function getProducts() {
  return products;
}

export async function getProductBySlug(slug: string) {
  return products.find((p) => p.slug === slug) ?? null;
}

export async function getFirstProducts(count = 3) {
  return products.slice(0, count);
}
