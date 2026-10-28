CREATE TYPE "public"."product_category" AS ENUM('kerti-disz', 'haz-elem');--> statement-breakpoint
CREATE TABLE "products" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "products_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"category" "product_category" NOT NULL,
	"slug" varchar(255) NOT NULL,
	"name" varchar(255) NOT NULL,
	"description" text NOT NULL,
	"price" integer NOT NULL,
	"salePrice" integer,
	"stock" integer DEFAULT 0 NOT NULL,
	"img" varchar(255) NOT NULL,
	"heightCm" integer NOT NULL,
	"widthCm" integer NOT NULL,
	"weightKg" real NOT NULL,
	"color" varchar(50) NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "products_slug_unique" UNIQUE("slug")
);
