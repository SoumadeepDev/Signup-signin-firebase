import { sendPasswordResetEmail } from "firebase/auth";
import React, { useState } from "react";
import { useAuth } from "../../contexts/authContext";
import { auth } from "../../firebase/firebase";
import { toast } from "react-toastify";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const { sendEmailVerification } = useAuth(); // Import the sendEmailVerification function from your AuthContext

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const emailVal = email.trim();

    try {
      await sendPasswordResetEmail(auth, emailVal);
      // You can add a message or redirect the user to a confirmation page here
      toast.success("Password reset email sent successfully!");
    } catch (error) {
      toast.error("Error sending password reset email:", error.message);
      // Handle error (optional)
    }
  };

  return (
    <main className="w-full h-screen flex self-center place-content-center place-items-center">
      <div className="w-96 text-gray-600 space-y-5 p-4 shadow-xl border rounded-xl">
        <div className="text-center mb-6">
          <div className="mt-2">
            <h3 className="text-gray-800 text-xl font-semibold sm:text-2xl">
              Forgot Password
            </h3>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm text-gray-600 font-bold">Email</label>
            <input
              type="email"
              autoComplete="email"
              name="email"
              required
              value={email}
              onChange={handleEmailChange}
              className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:indigo-600 shadow-sm rounded-lg transition duration-300"
            />
          </div>

          <button
            type="submit"
            className="w-full px-4 py-2 text-white font-medium rounded-lg bg-indigo-600 hover:bg-indigo-700 hover:shadow-xl transition duration-300"
          >
            Reset Password
          </button>
        </form>
      </div>
    </main>
  );
};

export default ForgotPassword;
