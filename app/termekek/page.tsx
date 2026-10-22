import type { Metadata } from "next";
import ProductPage from "./ProductsPage";

export const metadata: Metadata = {
  title: "Kézműves bádogos dekorációs termékek Somogyból",
  description:
    "Rendelhető , egyedi, kézzel készített bádog dekorációs elemek, házakra, kertekbe. József Zoltán bádogosmester kezeiből",
};

export default function ProductsPageWrapper() {
  return <ProductPage></ProductPage>;
}
