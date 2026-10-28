import {
  pgTable,
  pgEnum,
  integer,
  varchar,
  text,
  real,
  timestamp,
} from "drizzle-orm/pg-core";

export const categoryEnum = pgEnum("product_category", [
  "kerti-disz",
  "haz-elem",
]);

export const products = pgTable("products", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  category: categoryEnum().notNull(),
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

export type Product = typeof products.$inferSelect;
export type NewProduct = typeof products.$inferInsert;
