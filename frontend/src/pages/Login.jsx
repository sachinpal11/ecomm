import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Logo from "../assets/flxora_black.png";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../api/auth/authThunk";

const loginSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email address"),

  password: z.string().min(1, "Password is required"),
});

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const[disable,setDisable] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    const toastId = toast.loading("Logging you in...");

    try {
      setDisable(true);
      const res = await dispatch(login(data)).unwrap();
      setDisable(false);

      toast.success(res.message || "Login successful!", {
        id: toastId,
      });

      navigate("/");
    } catch (error) {
      console.log("Login error:", error);
      setDisable(false);
      const message = error?.message || "Login failed. Please try again.";

      toast.error(message, { id: toastId });
    }
  };

  return (
    <div className="w-full max-w-md flex flex-col items-center justify-center px-6 py-12">
      {/* Logo */}
      <div className="h-30">
        <img src={Logo} className="w-48 h-auto" alt="FLXORA" />
      </div>

      <h1 className="text-2xl font-semibold mb-6 text-center">
        Login to your Account
      </h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 w-full max-w-md"
      >
        {/* Email */}
        <div>
          <div className="relative">
            <Mail className="absolute left-3 top-3.5 text-gray-400" size={18} />

            <input
              type="email"
              {...register("email")}
              placeholder="Email"
              className="w-full border rounded-full pl-10 pr-4 py-3 outline-none focus:border-black"
            />
          </div>

          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* Password */}
        <div>
          <div className="relative">
            <Lock className="absolute left-3 top-3.5 text-gray-400" size={18} />

            <input
              type={showPassword ? "text" : "password"}
              {...register("password")}
              placeholder="Password"
              className="w-full border rounded-full pl-10 pr-10 py-3 outline-none focus:border-black"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3.5 text-gray-500"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {errors.password && (
            <p className="text-red-500 text-xs mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Button */}
        <button
          type="submit"
          disabled={disable}
          className="bg-black text-white py-3 rounded-full mt-2 hover:bg-neutral-800 transition"
        >
          Login
        </button>
      </form>

      {/* Signup */}
      <p className="text-center text-sm text-gray-500 mt-6">
        Don't have an account?{" "}
        <Link to="/signup" className="text-black font-medium hover:underline">
          Signup
        </Link>
      </p>

      {/* Reset Password */}
      <p className="text-center text-sm text-gray-500 mt-2">
        Forgot Password?{" "}
        <Link to="/reset-password" className="text-black font-medium hover:underline">
          Reset here
        </Link>
      </p>
    </div>
  );
}

export default Login;
