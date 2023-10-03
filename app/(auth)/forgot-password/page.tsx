import React from "react";

export default function ForgotPassword() {
  return (
    <>
      <section className="bg-gray-900 text-white">
        <div className="h-screen w-screen flex justify-center items-center">
          <div className="w-[500px] bg-slate-800 p-5 rounded-lg shadow-lg shadow-black">
            <h1 className="font-3xl font-bold">Forgot Password</h1>
            <p className="text-gray-400 text-sm">
              Enter your email address to reset your password.
            </p>

            <form>
              <div className="mt-5">
                <label className="block font-bold  mb-2">Email</label>
                <input
                  type="email"
                  placeholder="Enter your email..."
                  className="w-full h-10 p-2 border rounded-md text-black outline-neutral-500"
                />
              </div>
              <div className="mt-4">
                <button className="w-full h-8 bg-blue-600 text-white rounded-md hover:bg-green-600">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
