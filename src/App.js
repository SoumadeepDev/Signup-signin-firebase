import ForgotPassword from "./components/ForgotPassword/ForgotPassword";
import Login from "./components/auth/login";
import Register from "./components/auth/register";
import CompletePage from "./components/completePage/CompletePage";
import EmailVerification from "./components/emailverification/EmailVerification";
import ExpenseHome from "./components/expenseListHome/ExpenseHome";

import Header from "./components/header";
import Home from "./components/home";

import { AuthProvider } from "./contexts/authContext";
import { useRoutes } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

function App() {
  const routesArray = [
    {
      path: "*",
      element: <Login />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/home",
      element: <Home />,
    },
    {
      path: "/completepage",
      element: <CompletePage />,
    },
    {
      path: "/forgotpassword",
      element: <ForgotPassword />,
    },
    {
      path: "/emailverificationpage",
      element: <EmailVerification />,
    },
    {
      path: "/home/expensehome",
      element: <ExpenseHome />,
    },
  ];
  let routesElement = useRoutes(routesArray);
  return (
    <AuthProvider>
      <ToastContainer />
      <Header />
      <div className="w-full h-screen flex flex-col">{routesElement}</div>
    </AuthProvider>
  );
}

export default App;
