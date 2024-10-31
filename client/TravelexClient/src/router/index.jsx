import { createBrowserRouter, redirect } from "react-router-dom";
import HomePage from "../views/HomePage";
import LoginPage from "../views/LoginPage";
import Profile from "../views/Profile";
import Register from "../views/Register";
import Wishlist from "../views/Wishlist";
import AddWishlist from "../views/AddWishlist";
import AddDestination from "../views/AddDestination";
import BaseLayout from "../BaseLayout/BaseLayout";

const base_url = "http://localhost:3000";

const router = createBrowserRouter([
  {
    path: "/register",
    element: <Register base_url={base_url} />,
  },
  {
    path: "/login",
    element: <LoginPage base_url={base_url} />,
    loader: () => {
      if (localStorage.access_token) {
        return redirect("/");
      }
      return null;
    },
  },
  {
    element: <BaseLayout />,
    loader: () => {
      if (!localStorage.access_token) {
        return redirect("/login");
      }
      return null;
    },
    children: [
      {
        path: "/",
        element: <HomePage base_url={base_url} />,
      },
      {
        path: "/profile",
        element: <Profile base_url={base_url} />,
      },
      {
        path: "/wishlist",
        element: <Wishlist base_url={base_url} />,
      },
      {
        path: "/add-wishlist",
        element: <AddWishlist base_url={base_url} />,
      },
      {
        path: "/add-destination",
        element: <AddDestination base_url={base_url} />,
      },
    ],
  },
]);

export default router;
