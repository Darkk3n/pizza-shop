import { ComingSoon } from "@/components/ComingSoon";
import { AdminOnly } from "@/components/RoleGuard";

const RecipesPage = () => {
  return <ComingSoon title="Recipes" description="Menu items, prices and ingredients." guard={<AdminOnly />} />;
};

export default RecipesPage;
