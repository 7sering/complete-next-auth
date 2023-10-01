import {
  CustomSession,
  authOptions,
} from "@/app/api/auth/[...nextauth]/opation";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";

export default async function AdminDashboard() {
  const session: CustomSession | null = await getServerSession(authOptions);
  if (session == null || session?.user?.role == "Admin") {
    return redirect("/admin/login?error=please login first");
  }
  return (
    <>
      <div className="flex items-center justify-center px-10 pt-10">
        <h1>Admin Dashboard</h1>
      </div>
    </>
  );
}
