import {
  pgTable,
  pgEnum,
  integer,
  varchar,
  text,
  real,
  timestamp,
} from "drizzle-orm/pg-core";

// Termékek és kategóriák ---------------

export const categoryEnum = pgEnum("product_category", [
  "kerti-disz",
  "haz-elem",
]);

export const categories = pgTable("categories", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  slug: varchar({ length: 255 }).notNull().unique(),
});

export const products = pgTable("products", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  categoryId: integer().references(() => categories.id),
  slug: varchar({ length: 255 }).notNull().unique(),
  name: varchar({ length: 255 }).notNull(),
  description: text().notNull(),
  price: integer().notNull(),
  salePrice: integer(),
  stock: integer().notNull().default(0),
  img: varchar({ length: 255 }).notNull(),
  heightCm: integer().notNull(),
  widthCm: integer().notNull(),
  weightKg: real().notNull(),
  color: varchar({ length: 50 }).notNull(),
  createdAt: timestamp().notNull().defaultNow(),
});

export type Category = typeof categories.$inferSelect;
export type Product = typeof products.$inferSelect;
export type NewProduct = typeof products.$inferInsert;

// Rendelések --------------

export const orderStatusEnum = pgEnum("order_status", [
  "uj",
  "feldolgozas",
  "elkuldve",
  "teljesitve",
  "lemondva",
]);

export const orders = pgTable("orders", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull(),
  phone: varchar({ length: 50 }).notNull(),
  zip: varchar({ length: 4 }).notNull(),
  city: varchar({ length: 255 }).notNull(),
  address: varchar({ length: 255 }).notNull(),
  note: text(),
  total: integer().notNull(),
  status: orderStatusEnum().notNull().default("uj"),
  cancelToken: varchar({ length: 36 }).unique(),
  createdAt: timestamp().notNull().defaultNow(),
});

export const orderItems = pgTable("order_items", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  orderId: integer()
    .notNull()
    .references(() => orders.id, { onDelete: "cascade" }),
  productId: integer().references(() => products.id, { onDelete: "set null" }),
  name: varchar({ length: 255 }).notNull(),
  unitPrice: integer().notNull(),
  quantity: integer().notNull(),
  img: varchar({ length: 255 }),
});

export type Order = typeof orders.$inferSelect;
export type OrderItem = typeof orderItems.$inferSelect;

// Kapcsolati űrlap -----------------

export const contactForm = pgTable("contact_form", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  createdAt: timestamp().notNull().defaultNow(),
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull(),
  phone: varchar({ length: 50 }).notNull(),
  message: varchar({ length: 255 }).notNull(),
});
export type Contact = typeof contactForm.$inferSelect;

export type ProductWithCategory = Product & {
  categoryName: string | null;
};
