import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import { signOut } from "firebase/auth";
import { toast } from "react-toastify";
import auth from "../config/firebase.config";
import { setUser } from "../redux/features/user/userSlice";

const Navbar = () => {
  const { user } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const handleLogOut = () => {
    signOut(auth)
      .then(() => {
        toast.success("Log Out Successful");
        dispatch(setUser(null));
      })
      .catch((e) => console.log(e));
  };

  return (
    <div className="navbar bg-base-200">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            <Link to="/all-books">
              <li className="btn btn-ghost">All Books</li>
            </Link>
            <Link to="/create-book">
              <li className="btn btn-ghost">Create Book</li>
            </Link>
            {user?.email && (
              <>
                <Link to="/wishlist">
                  <li className="btn btn-ghost">Wishlist</li>
                </Link>
                <Link to="/bookmark">
                  <li className="btn btn-ghost">Bookmark</li>
                </Link>
              </>
            )}
          </ul>
        </div>
        <Link to="/" className="btn btn-ghost  text-xl uppercase">
          Book Spot
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <Link to="/all-books">
            <li className="btn btn-ghost">All Books</li>
          </Link>
          <Link to="/create-book">
            <li className="btn btn-ghost">Create Book</li>
          </Link>
          {user?.email && (
            <>
              <Link to="/wishlist">
                <li className="btn btn-ghost">Wishlist</li>
              </Link>
              <Link to="/bookmark">
                <li className="btn btn-ghost">Bookmark</li>
              </Link>
            </>
          )}
        </ul>
      </div>
      <div className="navbar-end space-x-3">
        {user.email ? (
          <button onClick={handleLogOut} className="btn btn-accent">
            Log Out
          </button>
        ) : (
          <>
            <Link to="/login" className="btn btn-primary">
              Login
            </Link>
            <Link to="/signup" className="btn btn-secondary">
              Sign Up
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
