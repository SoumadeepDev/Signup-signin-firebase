import React from "react";
import { useAuth } from "../../contexts/authContext";
import { Link } from "react-router-dom";

const Home = () => {
  const { currentUser } = useAuth();
  // console.log(currentUser);
  // console.log("User Access Token :", currentUser.accessToken);

  const handleSubmit = (e) => {
    e.preventDefault();
  };
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
      {!currentUser.isAnonymous && (
        <form
          onSubmit={handleSubmit}
          className="p-4 flex items-center flex-col gap-5"
        >
          <h1 className="items-center font-serif text-xl text-orange-500">
            Expense Tracker
          </h1>
          <div className="mb-4">
            <label htmlFor="money">Spend Money Amount:</label>
            <input
              type="number"
              id="money"
              name="money"
              className="border border-gray-300 rounded-md p-1"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="description">Spenditure Description:</label>
            <input
              type="text"
              id="description"
              name="description"
              className="border border-gray-300 rounded-md p-1"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="category">Expense Category:</label>
            <select
              id="category"
              name="category"
              className="border border-gray-300 rounded-md p-2 font-semibold ml-20 mx-2"
            >
              <option disabled selected>
                please select from below
              </option>
              <option value="salary">Salary</option>
              <option value="food">Food</option>
              <option value="shopping">Shopping</option>
              <option value="transportation">Transportation</option>
              <option value="entertainment">Entertainment</option>
              <option value="utilities">Utilities</option>
            </select>
          </div>
          <button
            type="submit"
            className="text-sm items-center flex-auto justify-center align-middle bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full no-underline btn"
          >
            ADD
          </button>
        </form>
      )}
    </>
  );
};

export default Home;
