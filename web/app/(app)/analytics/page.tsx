import { ComingSoon } from "@/components/ComingSoon";
import { AdminOnly } from "@/components/RoleGuard";

const AnalyticsPage = () => {
  return <ComingSoon title="Analytics" description="Sales, cancellations and ingredient usage." guard={<AdminOnly />} />;
};

export default AnalyticsPage;
