import Breadcrumb from "@/app/components/breadcrumb";
import CategoriesSection from "./categories-section";

export default function Page() {
  // const ca  fetchCategories
  return (
    <main className="main-container">
      <Breadcrumb />
      <CategoriesSection />
    </main>
  );
}
