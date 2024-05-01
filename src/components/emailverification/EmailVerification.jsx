import React from "react";
import { useAuth } from "../../contexts/authContext";
import { auth } from "../../firebase/firebase";
import { toast } from "react-toastify";

const EmailVerification = () => {
  const { currentUser, sendEmailVerificationn } = useAuth();
  console.log(currentUser);
  const idToken = currentUser.accessToken;
  // const email = currentUser.email;
  const API_KEY = "AIzaSyBwkcpqHN_-L8cx_jCyPZoX6EqOvYgFw2A";

  const handleSendVerificationEmail = () => {
    // Call the function to send the verification email
    sendEmailVerificationn(idToken, API_KEY);
  };

  const handleVerifyEmail = () => {
    // Add logic to verify the email
    // You can redirect the user to the next page or perform any other action here
    if (currentUser && currentUser.emailVerified) {
      toast.success("Email verified successfully!");
      window.location.href = "/home";
    } else {
      toast.error("Please Verify your email address!");
    }
  };

  return (
    <main className="w-full h-screen flex self-center place-content-center place-items-center">
      <div className="w-96 text-gray-600 space-y-5 p-4 shadow-xl border rounded-xl">
        <div className="text-center mb-6">
          <div className="mt-2">
            <h3 className="text-gray-800 text-xl font-semibold sm:text-2xl">
              Email Verification
            </h3>
          </div>
        </div>
        <div className="flex justify-center space-x-4">
          <button
            onClick={handleSendVerificationEmail}
            className="w-full px-4 py-2 text-white font-medium rounded-lg bg-indigo-600 hover:bg-indigo-700 hover:shadow-xl transition duration-300"
          >
            Send Verification Email
          </button>
          <button
            onClick={handleVerifyEmail}
            className="w-full px-4 py-2 text-white font-medium rounded-lg bg-green-500 hover:bg-green-700 hover:shadow-xl transition duration-300"
          >
            Verify Email Status
          </button>
        </div>
      </div>
    </main>
  );
};

export default EmailVerification;
