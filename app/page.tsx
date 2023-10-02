// import { getServerSession } from "next-auth";
// import { redirect } from "next/navigation";

import Link from "next/link";

export default async function Home() {
  // const session = await getServerSession();
  // if (!session) {
  //   redirect("/login");
  // }

  return (
    <>
      <div>
        <h2 className="text-center pt-[150px] font-bold text-3xl">
          Next Auth Production Ready
        </h2>
        <p className="text-center">Lets Create Couples Auth Sytem </p>
        <center className="mt-5">
          {/* <p>{JSON.stringify(session)}</p> */}
          <Link
            href="/login"
            className=" mt-5 text-green-500 hover:text-blue-700 font-bold text-xl cursor-pointer"
          >
            Login
          </Link>
        </center>
      </div>
    </>
  );
}
