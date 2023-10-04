"use client";

import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

import axios from "axios";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

export default function ResetPassword({
  params,
}: {
  params: { email: string };
}) {
  const searchParams = useSearchParams();
  const [authState, setAuthState] = useState({
    password: "",
    cpassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<LoginErrorType>();

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    axios
      .post("/api/auth/reset-password", {
        email: params.email,
        signature: searchParams.get("signature"),
        password: authState.password,
        password_confirmation: authState.cpassword,
      })
      .then((res) => {
        const response = res.data;
        if (response.status == 400) {
          toast.error(response.message, { theme: "colored" });
        } else if (response.status == 200) {
          toast.success(response.message, { theme: "colored" });
        }
      })
      .catch((err) => {
        setLoading(false);
        console.log("Error....", err);
      });
  };
  return (
    <>
      <ToastContainer />
      <section className="bg-gray-900 text-white">
        <div className="h-screen w-screen flex justify-center items-center">
          <div className="w-[500px] bg-slate-800 p-5 rounded-lg shadow-lg shadow-black">
            <h1 className="font-3xl font-bold">Reset Password</h1>

            <form onSubmit={submit}>
              <div className="mt-5">
                <label className="block font-bold  mb-2">Password</label>
                <input
                  type="password"
                  placeholder="Enter your new password..."
                  className="w-full h-10 p-2 border rounded-md text-black outline-neutral-500"
                  onChange={(event) =>
                    setAuthState({ ...authState, password: event.target.value })
                  }
                />
                {/* <span className="text-red-500">{errors?.email}</span> */}
              </div>
              <div className="mt-5">
                <label className="block font-bold  mb-2">
                  Confirm Password
                </label>
                <input
                  type="password"
                  placeholder="Confirm your new  password........."
                  className="w-full h-10 p-2 border rounded-md text-black outline-neutral-500"
                  onChange={(event) =>
                    setAuthState({
                      ...authState,
                      cpassword: event.target.value,
                    })
                  }
                />
                {/* <span className="text-red-500">{errors?.email}</span> */}
              </div>
              <div className="mt-4">
                <button
                  disabled={loading}
                  className="w-full h-8 bg-blue-600 text-white rounded-md hover:bg-green-600"
                >
                  {loading ? "Processing..." : "Submit"}
                </button>
              </div>
              <div className="mt-5 text-center">
                <Link
                  href="/login"
                  className="text-blue-300 hover:text-orange-300 font-bold"
                >
                  Back To Login
                </Link>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
