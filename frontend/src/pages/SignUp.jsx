import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Logo from "../assets/flxora_black.png";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Mail, Lock, User, Eye, EyeOff } from "lucide-react";
import { Link } from "react-router";
import { useDispatch } from "react-redux";
import { signup } from "../api/auth/authThunk";

const signupSchema = z.object({
  firstName: z.string().min(1, "First name is required"),

  lastName: z.string().optional(),

  email: z.string().min(1, "Email is required").email("Invalid email address"),

  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Must contain at least one uppercase letter")
    .regex(/[0-9]/, "Must contain at least one number")
    .regex(/[^A-Za-z0-9]/, "Must contain at least one special character"),
});

function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signupSchema),
  });

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const toastId = toast.loading("Creating your account...");

    try {
      const res = await dispatch(signup(data)).unwrap();

      toast.success("Signup successful! Please verify your email.", {
        id: toastId,
      });
    } catch (error) {
      toast.error(error?.message || "Signup failed", { id: toastId });
    }
  };

  return (
    <div className="w-full md:w-3/4 -mt-10 flex flex-col items-center justify-center px-6">
      <div className="flex justify-center -mt-10 mb-6">
        <img src={Logo} className="w-50 -my-20" alt="FLXORA" />
      </div>

      <h1 className="text-2xl font-semibold mb-6 text-center">
        Create Your Account
      </h1>

      <form
        onSubmit={handleSubmit(onSubmit, (errors) =>
          console.log("ERRORS:", errors),
        )}
        className="flex flex-col gap-4"
      >
        {/* First Name */}
        <div>
          <div className="relative">
            <User className="absolute left-3 top-3.5 text-gray-400" size={18} />
            <input
              {...register("firstName")}
              placeholder="First Name"
              className="w-full border rounded-full pl-10 pr-4 py-3 outline-none focus:border-black"
            />
          </div>

          {errors.firstName && (
            <p className="text-red-500 text-xs mt-1">
              {errors.firstName.message}
            </p>
          )}
        </div>

        {/* Last Name */}
        <div>
          <div className="relative">
            <User className="absolute left-3 top-3.5 text-gray-400" size={18} />
            <input
              {...register("lastName")}
              placeholder="Last Name"
              className="w-full border rounded-full pl-10 pr-4 py-3 outline-none focus:border-black"
            />
          </div>
        </div>

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

        {/* Password Rules */}
        <div className="text-sm text-gray-500">
          <p>Password must contain:</p>
          <p>✔ Minimum 8 characters</p>
          <p>✔ Uppercase letter, number & special character</p>
        </div>

        {/* Button */}
        <button
          type="submit"
          className="bg-black text-white py-3 rounded-full mt-2 hover:bg-neutral-800 transition"
        >
          Create Account
        </button>
      </form>

      <p className="text-center text-sm text-gray-500 mt-6">
        Already have an account?{" "}
        <Link
          to="/login"
          className="text-black font-medium cursor-pointer hover:underline"
        >
          Login
        </Link>
      </p>
    </div>
  );
}

export default Signup;
