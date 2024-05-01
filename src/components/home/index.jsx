import React from "react";
import { useAuth } from "../../contexts/authContext";
import { Link } from "react-router-dom";

const Home = () => {
  const { currentUser } = useAuth();
  console.log(currentUser);
  console.log("User Access Token :", currentUser.accessToken);
  return (
    <>
      <div className="flex justify-between p-4 px-10">
        <div className="text-2xl pt-14">
          Hello{" "}
          <span className="font-bold">
            {" "}
            {currentUser.displayName
              ? currentUser.displayName
              : currentUser.email}
            ,
          </span>
          <div className="italic">Welcome to Expense Tracker!!!</div>
        </div>
        {currentUser.displayName ? (
          <div className="text-xl pt-14 italic font-thin">
            your proflie is now Completed. Job Offers are waiting for You.
          </div>
        ) : (
          <div className="text-xl pt-14">
            your proflie is incomplete please{" "}
            <Link to="/completepage" className="text-blue-600 italic">
              complete now
            </Link>{" "}
          </div>
        )}
      </div>
      <hr />
    </>
  );
};

export default Home;
