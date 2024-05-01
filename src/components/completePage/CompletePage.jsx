import React, { useState } from "react";
import { FaGithub } from "react-icons/fa";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/authContext";

const CompletePage = () => {
  const [fullName, setFullName] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");

  const { currentUser } = useAuth();
  console.log(currentUser);
  console.log("User Access Token :", currentUser.accessToken);

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
    const idToken = currentUser.accessToken;
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
