import RolesTable from "@/components/role/RolesTable";
import { RoleForm } from "@/components/role/RoleForm";

export default function Roles() {
  return (
    <div className="mx-5 my-5">
      <div className="text-lg font-bold">Roles Page</div>
      <RolesTable />
    </div>
  );
}
