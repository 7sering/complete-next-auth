"use client";

export default function SignoutButton({ type }: { type?: string }) {
  return (
    <div>
      <button className="p-3 bg-green-500 text-white rounded-md">
        Sign Out
      </button>
    </div>
  );
}
