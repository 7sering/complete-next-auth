"use client";

import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

import axios from "axios";
import { useState } from "react";

export default function ResetPassword({
  params,
}: {
  params: { email: string };
}) {
  const [authState, setAuthState] = useState({
    password: "",
    cpassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<LoginErrorType>();

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
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
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
