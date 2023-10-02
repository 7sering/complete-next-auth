import SignoutButton from "@/components/signoutButton";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  const session = await getServerSession();
  if (!session) {
    redirect("/login");
  }
  return (
    <>
      <div>
        <h2 className="text-center pt-[150px] font-bold text-3xl">
          Welcome User Dashboard
        </h2>
        <center className="mt-5">
          <p>{JSON.stringify(session)}</p>
          <SignoutButton />
        </center>
      </div>
    </>
  );
}
