import Link from "next/link";
import { ThemeToggle } from "@/components/ThemeToggle";
import { buttonVariants } from "@/components/ui/button";

// Rendered by forbidden() (requireStaff / requireAdmin) for a signed-in user without the role, outside
// the app shell, so it carries its own theme toggle like the sign-in screens.
const Forbidden = () => {
  return (
    <main id="main-content" className="relative flex flex-1 flex-col items-center justify-center gap-4 px-4 py-16 text-center">
      <div className="absolute top-3 right-3">
        <ThemeToggle />
      </div>
      <p className="text-sm font-medium text-primary">403</p>
      <h1 className="text-2xl font-semibold tracking-tight">No tienes acceso a esta página</h1>
      <p className="max-w-md text-muted-foreground">
        Tu cuenta no puede abrir esta pantalla. Si crees que debería, pide a un administrador que actualice tu rol.
      </p>
      <Link href="/" className={buttonVariants({ variant: "outline" })}>
        Ir a tu página de inicio
      </Link>
    </main>
  );
};

export default Forbidden;
