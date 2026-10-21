import { ComingSoon } from "@/components/ComingSoon";
import { AdminOnly } from "@/components/RoleGuard";

const UsersPage = () => {
  return <ComingSoon title="Users" description="Staff and admin roles." guard={<AdminOnly />} />;
};

export default UsersPage;
