import SignoutButton from "@/components/signoutButton";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/opation";
import { redirect } from "next/navigation";
import { json } from "stream/consumers";

export default async function Home() {
  const session = await getServerSession();
  if (!session) {
    redirect("/login");
  }
  return (
    <>
      <div>
        <h2 className="text-center pt-[150px] font-bold text-3xl">
          Next Auth Production Ready
        </h2>
        <center className="mt-5">
          <p>{JSON.stringify(session)}</p>
          <SignoutButton />
        </center>
      </div>
    </>
  );
}
