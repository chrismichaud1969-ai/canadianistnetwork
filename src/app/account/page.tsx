import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import LogoutButton from "@/components/LogoutButton";

export default async function AccountPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="mx-auto max-w-sm px-4 py-16 sm:px-6">
      <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
        Account
      </h1>
      <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
        Signed in as <strong>{user.email}</strong>
      </p>

      <div className="mt-6">
        <LogoutButton />
      </div>
    </div>
  );
}
