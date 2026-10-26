import type { Metadata } from "next";
import Form from "next/form";
import Link from "next/link";
import { Suspense } from "react";
import { Pager } from "@/components/orders/Pager";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { roleOf, userListQuerySchema, type UserRole } from "@/lib/api/schemas/users";
import { listUsers, USERS_PAGE_SIZE } from "@/lib/api/users";
import { requireAdmin } from "@/lib/auth/currentUser";
import { UserRoleControl } from "./UserRoleControl";

export const metadata: Metadata = { title: "Users · Pizza Shop POS" };

const hrefFor = (email: string | undefined, page = 1) => {
  const query = new URLSearchParams();
  if (email) query.set("email", email);
  if (page > 1) query.set("page", String(page));
  const search = query.toString();
  return search ? `/users?${search}` : "/users";
};

const ROLE_BADGE_CLASSES: Record<UserRole, string> = {
  Admin: "bg-primary/10 text-primary",
  Staff: "bg-sky-100 text-sky-800 dark:bg-sky-500/15 dark:text-sky-300",
  Customer: "bg-muted text-muted-foreground",
};

// A plain GET form: the search lives in the URL, so it survives reloads and paging, and
// next/form navigates client-side without a full page load.
const SearchForm = ({ email }: { email?: string }) => {
  return (
    <Form action="/users" className="flex gap-2" role="search">
      <Input
        type="search"
        name="email"
        defaultValue={email}
        placeholder="Search by email"
        aria-label="Search by email"
        maxLength={256}
        className="sm:w-72"
      />
      <Button type="submit" variant="outline">
        Search
      </Button>
    </Form>
  );
};

const UsersTable = async ({ searchParams }: { searchParams: PageProps<"/users">["searchParams"] }) => {
  const admin = await requireAdmin();
  const { email, page } = userListQuerySchema.parse(await searchParams);
  const result = await listUsers({ email, page });
  const pageCount = Math.max(1, Math.ceil(result.totalCount / USERS_PAGE_SIZE));

  return (
    <div className="flex flex-col gap-4">
      {/* Keyed so the box shows the current search after back/forward navigation. */}
      <SearchForm key={email ?? ""} email={email} />

      {result.items.length === 0 ? (
        <p className="rounded-lg border border-dashed px-4 py-12 text-center text-muted-foreground">
          {email ? (
            <>
              No users match &quot;{email}&quot;.{" "}
              <Link href="/users" className="underline underline-offset-4">
                Show everyone
              </Link>
            </>
          ) : (
            "No users yet."
          )}
        </p>
      ) : (
        <div className="rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Email</TableHead>
                <TableHead className="hidden sm:table-cell">Role</TableHead>
                <TableHead className="text-right">
                  <span className="sr-only">Change role</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {result.items.map((user) => {
                const role = roleOf(user);
                const userEmail = user.email ?? "(no email)";
                return (
                  <TableRow key={user.userId}>
                    <TableCell className="max-w-64 truncate font-medium">{userEmail}</TableCell>
                    <TableCell className="hidden sm:table-cell">
                      <Badge variant="secondary" className={ROLE_BADGE_CLASSES[role]}>
                        {role}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <UserRoleControl
                        userId={user.userId}
                        email={userEmail}
                        role={role}
                        isSelf={user.email?.toLowerCase() === admin.email.toLowerCase()}
                      />
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      )}

      <Pager
        page={result.page}
        pageCount={pageCount}
        totalCount={result.totalCount}
        itemLabel="users"
        hrefForPage={(target) => hrefFor(email, target)}
      />
    </div>
  );
};

const UsersTableSkeleton = () => {
  return (
    <div className="flex flex-col gap-4" aria-busy="true" aria-label="Loading users">
      <Skeleton className="h-8 w-80" />
      <div className="flex flex-col gap-2 rounded-lg border p-4">
        {Array.from({ length: 6 }, (_, i) => (
          <Skeleton key={i} className="h-8 w-full" />
        ))}
      </div>
    </div>
  );
};

const UsersPage = ({ searchParams }: PageProps<"/users">) => {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-semibold tracking-tight">Users</h1>
        <p className="text-muted-foreground">
          Everyone who signs up is a customer. Give staff and admins their role here; it takes effect
          within 15 minutes, the next time their session refreshes.
        </p>
      </div>
      <Suspense fallback={<UsersTableSkeleton />}>
        <UsersTable searchParams={searchParams} />
      </Suspense>
    </div>
  );
};

export default UsersPage;
