import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Logo from "../assets/flxora_black.png";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { Link } from "react-router";
import { useDispatch } from "react-redux";
import { login } from "../api/auth/authThunk";

const loginSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email address"),

  password: z.string().min(1, "Password is required"),
});

function Login() {
  const [showPassword, setShowPassword] = useState(false);
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
      const res = await dispatch(login(data)).unwrap();

      toast.success("Login successful!", { id: toastId });

      navigate("/");
    } catch (error) {
      toast.error(error?.message || "Login failed", { id: toastId });
    }
  };

  return (
    <div className="w-full md:w-3/4 -mt-10 flex flex-col items-center justify-center px-6">
      <div className="flex justify-center -mt-10 mb-6">
        <img src={Logo} className="w-50 -my-20" alt="FLXORA" />
      </div>

      <h1 className="text-2xl font-semibold mb-6 text-center">
        Login to your Account
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        {/* Email */}
        <div>
          <div className="relative">
            <Mail className="absolute left-3 top-3.5 text-gray-400" size={18} />

            <input
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
          className="bg-black text-white py-3 rounded-full mt-2 hover:bg-neutral-800 transition"
        >
          Login
        </button>
      </form>

      <p className="text-center text-sm text-gray-500 mt-6">
        Don't have an account?{" "}
        <Link
          to="/signup"
          className="text-black font-medium cursor-pointer hover:underline"
        >
          Signup
        </Link>
      </p>
    </div>
  );
}

export default Login;
