import { useEffect, useRef, useState } from "react";
import { useAuth } from "../../contexts/authContext";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Home = () => {
  const { currentUser } = useAuth();

  const [ExpenseItems, setExpenseItems] = useState([]);
  const [isExpenseOpen, setIsExpenseOpen] = useState(false);
  const [money, setMoney] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");

  const moneyRef = useRef(null);
  const descriptionRef = useRef(null);
  const categoryRef = useRef(null);

  const [editedMoney, setEditedMoney] = useState("");
  const [editedDescription, setEditedDescription] = useState("");
  const [editedCategory, setEditedCategory] = useState("");

  const url =
    "https://signup-signin-2d739-default-rtdb.firebaseio.com/expenses.json";

  const fetchData = async () => {
    try {
      const response = await axios.get(url);
      console.log("fetch Response:", response);
      const expenseData = response.data;
      console.log("expenseData", expenseData);
      if (expenseData) {
        const expenses = Object.keys(expenseData).map((key) => ({
          id: key,
          ...expenseData[key],
        }));
        setExpenseItems(expenses);
      }
    } catch (error) {
      console.error("Error fetching expenses:", error);
      toast.error("Failed to fetch expenses. Please try again later.");
    }
  };
  useEffect(() => {
    fetchData();
  }, [url]);

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
      const response = await axios.post(
        "https://signup-signin-2d739-default-rtdb.firebaseio.com/expenses.json",
        {
          money,
          description,
          category,
        }
      );

      const newItem = {
        id: response.data.name, // Use the ID from the response
        money,
        description,
        category,
      };

      // Check if an item with the same ID exists in the current state
      const existingItemIndex = ExpenseItems.findIndex(
        (item) => item.id === newItem.id
      );

      if (existingItemIndex !== -1) {
        // If an item with the same ID exists, update it in the state
        const updatedItems = [...ExpenseItems];
        updatedItems[existingItemIndex] = newItem;
        setExpenseItems(updatedItems);
      } else {
        // Otherwise, add the new item to the state
        setExpenseItems((prevItems) => [...prevItems, newItem]);
      }

      setIsExpenseOpen(true);
      handleReset();

      toast.success("Expense added successfully to the server!");
    } catch (error) {
      console.error("Error adding expense:", error);
      toast.error("Failed to add expense. Please try again later.");
    }
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   if (!money.trim() || !description.trim() || !category.trim()) {
  //     toast.info("Please fill in all fields in the expense form");
  //     return;
  //   }

  //   try {
  //     await axios.post(
  //       "https://signup-signin-2d739-default-rtdb.firebaseio.com/expenses.json",
  //       {
  //         money,
  //         description,
  //         category,
  //         // id:currentUser[key],
  //       }
  //     );

  //     const expenseList = [
  //       ...ExpenseItems,
  //       {
  //         money,
  //         description,
  //         category,
  //       },
  //     ];

  //     console.log(expenseList);
  //     setExpenseItems(expenseList);
  //     setIsExpenseOpen(true);
  //     handleReset();

  //     toast.success("Expense added successfully to the server!");
  //     window.location.reload();
  //   } catch (error) {
  //     console.error("Error adding expense:", error);
  //     toast.error("Failed to add expense. Please try again later.");
  //   }
  // };

  //deleting an expense data
  console.log("ExpenseItems", ExpenseItems);

  const handleDelete = async (itemToDelete) => {
    console.log("handleDelete-id: ", itemToDelete.id);

    try {
      const response = await axios.delete(
        `https://signup-signin-2d739-default-rtdb.firebaseio.com/expenses/${itemToDelete.id}.json`
      );
      console.log("Delete Response:", response); // Log the response from the delete request
      console.log("Deleting item with ID:", itemToDelete.id);
      const updatedItems = ExpenseItems.filter(
        (item) => item.id !== itemToDelete.id
      );
      setExpenseItems(updatedItems);
      toast.success("Expense deleted successfully!");
    } catch (error) {
      console.error("Error deleting expense:", error);
      toast.error("Failed to delete expense. Please try again later.");
    }
  };

  //// Editing an expense data
  // const handleEdit = async (item) => {
  //   try {
  //     // Populate input fields with item values
  //     console.log("handleEdit receiving item", item);
  //     console.log("handleedit-id", item.id);

  //     setMoney(item.money);
  //     setDescription(item.description);
  //     setCategory(item.category);

  //     // Update the edited expense with its ID
  //     const editedExpense = {
  //       money: editedMoney, // Use the edited values
  //       description: editedDescription,
  //       category: editedCategory,
  //       id: item.id, // Include the original ID
  //     };
  //     console.log("editedExpense item", editedExpense);
  //     await axios.put(
  //       `https://signup-signin-2d739-default-rtdb.firebaseio.com/expenses/${item.id}.json`,
  //       editedExpense
  //     );

  //     // Fetch updated data after editing
  //     fetchData();

  //     toast.info("Expense data updated successfully");
  //   } catch (error) {
  //     console.error("Error editing expense:", error);
  //     toast.error("Failed to update expense. Please try again later.");
  //   }
  // };

  // editing an expense data
  const handleEdit = async (item) => {
    console.log("handleEdit receiving item", item);
    console.log("handleedit-id", item.id);
    console.log("handleEdit receiving item", item);
    // await handleDelete(item);

    try {
      //deleting data from the database
      await handleDelete(item);

      // Populate input fields with item values
      setMoney(item.money);
      setDescription(item.description);
      setCategory(item.category);

      toast.info("Expense data is now in edit mode");
    } catch (error) {
      console.error("Error editing expense:", error);
      toast.error("Failed to edit expense. Please try again later.");
    }
  };

  console.log("ExpenseItems which is used in map", ExpenseItems);
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
              ref={moneyRef}
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
              ref={descriptionRef}
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
              ref={categoryRef}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="" disabled defaultValue="">
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
            <div
              style={{
                display: "flex",
                gap: "2rem",
                justifyContent: "center",
                alignItems: "center",
                margin: "1rem auto",
              }}
            >
              <button
                className="text-sm bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded-full no-underline btn"
                onClick={() => handleEdit(item)}
              >
                Edit
              </button>
              <button
                className="text-sm bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full no-underline btn"
                onClick={() => handleDelete(item)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Home;
