import { FormEvent, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { loginUser } from "../../redux/features/user/userSlice";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";

const Login = () => {
  const { error, user } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  if (user.email) {
    toast.success("Login successful");
    navigate(from, { replace: true });
    return;
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    dispatch(loginUser({ email, password })).catch((e) => console.log(e));

    // Reset the form
    setEmail("");
    setPassword("");
  };

  const handleGoogleLogin = () => {
    // Implement Google login logic here
    console.log("Perform Google login");
  };

  return (
    <div
      className="flex flex-col justify-center items-center h-screen bg-gray-100"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1519682337058-a94d519337bc?ixid=MnwxMjA3fDB8MHxwcm9maWxlLXBhZ2V8MXw2MDIwMDM4fHxlbnwwfHx8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80')",
        backgroundSize: "cover",
      }}
    >
      <h1 className="text-4xl font-bold mb-8">Login</h1>
      <form
        className="bg-white shadow-lg rounded-lg px-12 py-10 w-96"
        onSubmit={handleSubmit}
      >
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            className="appearance-none bg-gray-100 border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring focus:border-blue-500"
            id="email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="appearance-none bg-gray-100 border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring focus:border-blue-500"
            id="password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error && <p className="my-4 text-red-600 font-medium">{error}</p>}
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Sign In
          </button>
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={handleGoogleLogin}
          >
            Sign in with Google
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
