import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/authContext";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Home = () => {
  const { currentUser } = useAuth();

  const [ExpenseItems, setExpenseItem] = useState([]);
  const [isExpenseOpen, setIsExpenseOpen] = useState(false);
  const [money, setMoney] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");

  const handleReset = () => {
    setMoney("");
    setDescription("");
    setCategory("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!money.trim() || !description.trim() || !category.trim()) {
      toast.info("Please fill in all fields in the expense form");
      return;
    }

    try {
      // Make a POST request to your Firebase Realtime Database endpoint
      await axios.post(
        "https://signup-signin-2d739-default-rtdb.firebaseio.com/expenses.json",
        {
          money,
          description,
          category,
          userId: currentUser.uid,
          timestamp: new Date().toISOString(),
        }
      );

      const expenseList = [
        ...ExpenseItems,
        {
          money,
          description,
          category,
        },
      ];

      setExpenseItem(expenseList);
      setIsExpenseOpen(true);
      handleReset();

      toast.success("Expense added successfully to the server!");
    } catch (error) {
      console.error("Error adding expense:", error);
      toast.error("Failed to add expense. Please try again later.");
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://signup-signin-2d739-default-rtdb.firebaseio.com/expenses.json"
        );
        const expenseData = response.data;
        // console.log(expenseData);
        if (expenseData) {
          const expenses = Object.keys(expenseData).map((key) => ({
            id: key,
            ...expenseData[key],
          }));
          // console.log(expenses);
          setExpenseItem(expenses);
        }
      } catch (error) {
        console.error("Error fetching expenses:", error);
        toast.error("Failed to fetch expenses. Please try again later.");
      }
    };

    fetchData();
  }, []);

  console.log(ExpenseItems);
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
          className="p-4 flex items-center flex-col gap-5 formContainer"
        >
          <h1 className="items-center font-serif text-xl text-orange-500">
            Expense Tracker
          </h1>
          <div className="mb-4 flex">
            <label htmlFor="money" className="ExpenseLabel">
              Spend Money Amount:
            </label>
            <input
              type="number"
              id="money"
              name="money"
              placeholder="Enter your value in INR"
              value={money}
              onChange={(e) => setMoney(e.target.value)}
              className="border border-gray-300 rounded-md p-1"
            />
          </div>

          <div className="mb-4 flex">
            <label htmlFor="description" className="ExpenseLabel">
              Spenditure Description:
            </label>
            <input
              type="text"
              id="description"
              name="description"
              className="border border-gray-300 rounded-md p-1"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="mb-4 flex">
            <label htmlFor="category" className="ExpenseLabel">
              Expense Category:
            </label>
            <select
              id="category"
              name="category"
              className="border border-gray-300 rounded-md p-2 font-semibold mx-2"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="" disabled selected>
                Please select from below
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

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 justify-center mt-2 mb-2 py-10 ml-4">
        {ExpenseItems.map((item, index) => (
          <div
            key={index}
            className="expenseShowContainer shadow-lg shadow-slate-400"
          >
            <div className="w-full max-w-lg border border-gray-300 rounded-md p-4 flex flex-col items-center">
              <label
                htmlFor={`money-${index}`}
                className="block font-semibold expenseLabel"
              >
                Expense Amount
              </label>
              <p id={`money-${index}`} className="mb-2 text-center">
                Rs.{item.money}
              </p>
              <hr className="border-t border-gray-200 w-full my-2" />
              <label
                htmlFor={`description-${index}`}
                className="block font-semibold expenseLabel"
              >
                Expense Description
              </label>
              <p id={`description-${index}`} className="mb-2 text-center">
                {item.description}
              </p>
              <hr className="border-t border-gray-200 w-full my-2" />
              <label
                htmlFor={`category-${index}`}
                className="block font-semibold expenseLabel"
              >
                Expense Category
              </label>
              <p id={`category-${index}`} className="text-center">
                {item.category}
              </p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Home;
