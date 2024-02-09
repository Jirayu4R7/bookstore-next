import Breadcrumb from "@/app/components/breadcrumb";
import CategoriesSection from "./categories-section";
import { genPageMetadata } from "../seo";

export const metadata = genPageMetadata({ title: "Categories" });

export default function Page() {
  // const ca  fetchCategories
  return (
    <main className="main-container">
      <Breadcrumb />
      <CategoriesSection />
    </main>
  );
}
