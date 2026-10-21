import { ComingSoon } from "@/components/ComingSoon";
import { StaffOnly } from "@/components/RoleGuard";

const InventoryPage = () => {
  return <ComingSoon title="Inventory" description="Stock levels, restocks and waste." guard={<StaffOnly />} />;
};

export default InventoryPage;
