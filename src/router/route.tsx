import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import SignUp from "../pages/SignUp/SignUp";
import Main from "../layout/Main";
import AllBooks from "../pages/AllBooks/AllBooks";
import CreateBook from "../pages/CreateBook/CreateBook";
import SingleBook from "../pages/SingleBook/SingleBook";
import EditBook from "../pages/SingleBook/EditBook/EditBook";
import Wishlist from "../pages/Wishlist/Wishlist";
import Bookmark from "../pages/Bookmark/Bookmark";
import PrivateRoute from "./PrivateRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <SignUp />,
      },
      {
        path: "/all-books",
        element: <AllBooks />,
      },
      {
        path: "/create-book",
        element: (
          <PrivateRoute>
            <CreateBook />,
          </PrivateRoute>
        ),
      },
      {
        path: "/book/:id",
        element: (
          <PrivateRoute>
            <SingleBook />,
          </PrivateRoute>
        ),
      },
      {
        path: "/book/edit/:id",
        element: (
          <PrivateRoute>
            <EditBook />,
          </PrivateRoute>
        ),
      },
      {
        path: "/wishlist",
        element: (
          <PrivateRoute>
            <Wishlist />,
          </PrivateRoute>
        ),
      },
      {
        path: "/bookmark",
        element: (
          <PrivateRoute>
            <Bookmark />,
          </PrivateRoute>
        ),
      },
    ],
  },
]);

export default router;
