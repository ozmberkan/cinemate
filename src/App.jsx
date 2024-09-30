import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import Login from "./pages/Auth/Login";
import Home from "./pages/Home/Home";
import Register from "./pages/Auth/Register";
import Layout from "./layouts/Layout";
import Landing from "./pages/Landing/Landing";
import { useSelector } from "react-redux";

const App = () => {
  const { user } = useSelector((store) => store.user);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Landing />,
    },
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "home",
          element: user ? <Home /> : <Navigate to="/login" />,
        },
      ],
    },
    {
      path: "login",
      element: <Login />,
    },
    {
      path: "register",
      element: <Register />,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
