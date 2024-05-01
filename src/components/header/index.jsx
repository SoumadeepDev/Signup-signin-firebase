import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/authContext";
import { doSignOut } from "../../firebase/auth";

const Header = () => {
  const navigate = useNavigate();
  const { userLoggedIn } = useAuth();
  return (
    <nav className="flex flex-row gap-x-2 w-full z-20 fixed top-0 left-0 h-12 border-b place-content-center items-center bg-gray-200">
      {userLoggedIn ? (
        <>
          <button
            onClick={() => {
              doSignOut().then(() => {
                navigate("/login");
              });
            }}
            className="text-sm bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full no-underline"
          >
            Logout
          </button>
        </>
      ) : (
        <>
          <Link
            className="text-sm  bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full no-underline"
            to={"/login"}
          >
            Login
          </Link>
          <Link
            className="text-sm bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full no-underline"
            to={"/register"}
          >
            Register New Account
          </Link>
        </>
      )}
    </nav>
  );
};

export default Header;
