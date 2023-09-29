import SignoutButton from "@/components/signoutButton";

export default function Home() {
  return (
    <>
      <div>
        <h2 className="text-center pt-[150px] font-bold text-3xl">
          Next Auth Production Ready
        </h2>
        <center className="mt-5">
          <SignoutButton />
        </center>
      </div>
    </>
  );
}
