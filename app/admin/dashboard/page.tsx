import {
  CustomSession,
  authOptions,
} from "@/app/api/auth/[...nextauth]/opation";
import { getServerSession } from "next-auth";
import React from "react";

export default async function AdminDashboard() {
  const session: CustomSession | null = await getServerSession(authOptions);

  return (
    <div className="flex justify-center items-center px-10 pt-10 flex-col">
      <h1 className="text-2xl">Hello Admin How are you </h1>
      <h1 className="text-sm justify-center font-bold">
        {session && JSON.stringify(session)}
      </h1>
    </div>
  );
}
