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
        element: <CreateBook />,
      },
      {
        path: "/book/:id",
        element: <SingleBook />,
      },
      {
        path: "/book/edit/:id",
        element: <EditBook />,
      },
      {
        path: "/wishlist",
        element: <Wishlist />,
      },
      {
        path: "/bookmark",
        element: <Bookmark />,
      },
    ],
  },
]);

export default router;
