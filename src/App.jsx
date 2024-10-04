import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import Login from "./pages/Auth/Login";
import Home from "./pages/Home/Home";
import Register from "./pages/Auth/Register";
import Layout from "./layouts/Layout";
import { useSelector } from "react-redux";
import Users from "./pages/Users/Users";
import AddList from "./pages/List/Add/AddList";
import Profile from "./pages/Profile/Profile";
import ProfileDetail from "./pages/Profile/ProfileDetail/ProfileDetail";
import AllList from "./pages/List/AllList/AllList";

const App = () => {
  const { user } = useSelector((store) => store.user);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "users",
          element: user ? <Users /> : <Navigate to="/" />,
        },
        {
          path: "add-list",
          element: user ? <AddList /> : <Navigate to="/" />,
        },
        {
          path: "profile",
          element: user ? <Profile /> : <Navigate to="/" />,
        },
        {
          path: "profile/:id",
          element: user ? <ProfileDetail /> : <Navigate to="/" />,
        },
        {
          path: "lists",
          element: user ? <AllList /> : <Navigate to="/" />,
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
