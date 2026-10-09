export default function Home() {
  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
      <p className="text-zinc-600 dark:text-zinc-400">
        Orders, inventory, and sales at a glance.
      </p>
    </div>
  );
}
