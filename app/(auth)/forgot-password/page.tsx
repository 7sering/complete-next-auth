"use client";

import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

import axios from "axios";
import { useState } from "react";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<LoginErrorType>();

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    axios
      .post("/api/auth/forgot-password", { email: email })
      .then((res) => {
        setLoading(false);
        const response = res.data;
        if (response.status == 200) {
          toast.success(response.message, { theme: "colored" });
        } else if (response.status == 400) {
          setErrors(response.errors);
        } else if (response.status == 500) {
          toast.success(response.message, { theme: "colored" });
        }
      })
      .catch((err) => {
        setLoading(false);
        console.log("The error is", err);
      });
  };
  return (
    <>
      <ToastContainer />
      <section className="bg-gray-900 text-white">
        <div className="h-screen w-screen flex justify-center items-center">
          <div className="w-[500px] bg-slate-800 p-5 rounded-lg shadow-lg shadow-black">
            <h1 className="font-3xl font-bold">Forgot Password</h1>
            <p className="text-gray-400 text-sm">
              Enter your email address to reset your password.
            </p>

            <form onSubmit={submit}>
              <div className="mt-5">
                <label className="block font-bold  mb-2">Email</label>
                <input
                  type="email"
                  placeholder="Enter your email..."
                  className="w-full h-10 p-2 border rounded-md text-black outline-neutral-500"
                  onChange={(event) => setEmail(event.target.value)}
                />
                <span className="text-red-500">{errors?.email}</span>
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
