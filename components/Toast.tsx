"use client";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

export default function Toast() {
  const params = useSearchParams();

  useEffect(() => {
    if (params?.get("error") && params.get("error") != "") {
      toast.error(params.get("error"), { theme: "colored" });
    }
  }, [params]);

  return (
    <div>
      <ToastContainer />
    </div>
  );
}
