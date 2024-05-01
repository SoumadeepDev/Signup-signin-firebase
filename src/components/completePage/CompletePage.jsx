import React, { useState } from "react";
import { FaGithub } from "react-icons/fa";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";

const CompletePage = () => {
  const [fullName, setFullName] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");

  const handleFullNameChange = (e) => {
    setFullName(e.target.value);
  };

  const handlePhotoUrlChange = (e) => {
    setPhotoUrl(e.target.value);
  };

  const handleCancel = () => {
    setFullName(""); // Reset full name input
    setPhotoUrl(""); // Reset photo URL input
  };

  const updateUserProfile = async () => {
    const idToken =
      "eyJhbGciOiJSUzI1NiIsImtpZCI6ImEyMzhkZDA0Y2JhYTU4MGIzMDRjODgxZTFjMDA4ZWMyOGZiYmFkZGMiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vc2lnbnVwLXNpZ25pbi0yZDczOSIsImF1ZCI6InNpZ251cC1zaWduaW4tMmQ3MzkiLCJhdXRoX3RpbWUiOjE3MTQ1NzAyOTUsInVzZXJfaWQiOiIzOTVnQmoxNm82WFhjSkc4YjBDVFl1bTFxODQyIiwic3ViIjoiMzk1Z0JqMTZvNlhYY0pHOGIwQ1RZdW0xcTg0MiIsImlhdCI6MTcxNDU3MDI5NSwiZXhwIjoxNzE0NTczODk1LCJlbWFpbCI6InNvdW1hZGVlcEBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZW1haWwiOlsic291bWFkZWVwQGdtYWlsLmNvbSJdfSwic2lnbl9pbl9wcm92aWRlciI6InBhc3N3b3JkIn19.o9yjDp3kvCmIL-bFEMYhMYiGJWojJQ6dq_TImj4SMjDfWyY6ojmX_fHx_XP2FLTrDPJiIA1H-I304L83HFwKUA3JjAfTpw8Zv-bHyUMadExF8vum1GzvErZwomLd9_lK8mDpmNO5hReBfx6fJSodcSOUX2XU5bB_-rEQujC65vdM_fisLF5FmN4jxHDL44oUH8RILo9jKmRxpk6qCF9rye8fX4ArWpR1e4Ad6afcEtNGQxReidka_E8s93acLUiOS6TJWvoX5cICQ-BRxCBV0Tp5wOSHCZJEv6lL20tFR_B4uIhDHOj2AHFf6WHF_Ok7M6cIdFfh-anq-y-ib-lP_Q"; // Replace with actual user ID token
    const API_KEY = "AIzaSyBwkcpqHN_-L8cx_jCyPZoX6EqOvYgFw2A"; // Replace with your Firebase API key

    try {
      const response = await axios.post(
        `https://identitytoolkit.googleapis.com/v1/accounts:update?key=${API_KEY}`,
        {
          idToken,
          displayName: fullName,
          photoUrl,
          returnSecureToken: true,
        }
      );

      console.log("Profile updated successfully:", response.data);
      toast.info("Profile Updated Successfully");
      // Handle success
    } catch (error) {
      console.error("Error updating profile:", error.response.data.error);
      // Handle error
    }
  };

  return (
    <div>
      <div className="contact-form">
        <h3>Contact Details</h3>
        <label htmlFor="FullName" name="FullName">
          <FaGithub />
        </label>
        <input
          type="text"
          name="FullName"
          id="FullName"
          className="nameInput"
          placeholder="Enter your full name here"
          value={fullName}
          onChange={handleFullNameChange}
        />
        <input
          type="text"
          name="photoUrl"
          id="photoUrl"
          className="photoUrl"
          placeholder="Paste your profile photo link here..."
          value={photoUrl}
          onChange={handlePhotoUrlChange}
        />
        <div className="btnContainer">
          <button
            onClick={handleCancel}
            className="text-sm bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full no-underline btn"
          >
            Cancel
          </button>
          <button
            onClick={updateUserProfile}
            className="text-sm bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full no-underline btn"
          >
            Update
          </button>
          <Link
            to="/home"
            className="text-sm bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-2 rounded-full no-underline btn md:w-full text-center justify-center align-middle flex"
          >
            <button>Go to Home Page</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CompletePage;
