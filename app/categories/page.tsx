import CategoriesTable from "@/components/category/CategoriesTable";
import { CategoryForm } from "@/components/category/CategoryForm";

export default function Categories() {
  return (
    <div className="mx-5 my-5">
      <div className="text-lg font-bold">Categories Page</div>

      <div className="flex items-center space-x-4 h-5 my-5">
        <CategoryForm update={false} />
      </div>

      <CategoriesTable />
    </div>
  );
}
