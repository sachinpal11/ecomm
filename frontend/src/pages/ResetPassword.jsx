import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Logo from "../assets/flxora_black.png";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { Link } from "react-router-dom";
import { resetPassword } from "../api/auth/authAPI";

const resetPasswordSchema = z
  .object({
    email: z.string().min(1, "Email is required").email("Invalid email address"),
    oldPassword: z.string().min(1, "Old password is required"),
    newPassword: z
      .string()
      .min(8, "New password must be at least 8 characters")
      .regex(/[A-Z]/, "Must contain at least one uppercase letter")
      .regex(/[0-9]/, "Must contain at least one number")
      .regex(/[^A-Za-z0-9]/, "Must contain at least one special character"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

function ResetPassword() {
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(resetPasswordSchema),
  });

  const onSubmit = async (data) => {
    const toastId = toast.loading("Resetting your password...");

    try {
       await resetPassword(data);
      toast.success("Password reset successful!", { id: toastId });
      navigate("/login");
    } catch (error) {
      console.log("Reset password error:", error);
      const message = error?.response?.data?.message || "Reset failed. Please try again.";
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
        Reset Your Password
      </h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 w-full"
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

        {/* Old Password */}
        <div>
          <div className="relative">
            <Lock className="absolute left-3 top-3.5 text-gray-400" size={18} />
            <input
              type={showOldPassword ? "text" : "password"}
              {...register("oldPassword")}
              placeholder="Old Password"
              className="w-full border rounded-full pl-10 pr-10 py-3 outline-none focus:border-black"
            />
            <button
              type="button"
              onClick={() => setShowOldPassword(!showOldPassword)}
              className="absolute right-3 top-3.5 text-gray-500"
            >
              {showOldPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          {errors.oldPassword && (
            <p className="text-red-500 text-xs mt-1">{errors.oldPassword.message}</p>
          )}
        </div>

        {/* New Password */}
        <div>
          <div className="relative">
            <Lock className="absolute left-3 top-3.5 text-gray-400" size={18} />
            <input
              type={showNewPassword ? "text" : "password"}
              {...register("newPassword")}
              placeholder="New Password"
              className="w-full border rounded-full pl-10 pr-10 py-3 outline-none focus:border-black"
            />
            <button
              type="button"
              onClick={() => setShowNewPassword(!showNewPassword)}
              className="absolute right-3 top-3.5 text-gray-500"
            >
              {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          {errors.newPassword && (
            <p className="text-red-500 text-xs mt-1">{errors.newPassword.message}</p>
          )}
        </div>

        {/* Confirm Password */}
        <div>
          <div className="relative">
            <Lock className="absolute left-3 top-3.5 text-gray-400" size={18} />
            <input
              type="password"
              {...register("confirmPassword")}
              placeholder="Confirm New Password"
              className="w-full border rounded-full pl-10 pr-4 py-3 outline-none focus:border-black"
            />
          </div>
          {errors.confirmPassword && (
            <p className="text-red-500 text-xs mt-1">{errors.confirmPassword.message}</p>
          )}
        </div>

        {/* Button */}
        <button
          type="submit"
          className="bg-black text-white py-3 rounded-full mt-2 hover:bg-neutral-800 transition"
        >
          Reset Password
        </button>
      </form>

      {/* Back to Login */}
      <p className="text-center text-sm text-gray-500 mt-6">
        Remember your password?{" "}
        <Link to="/login" className="text-black font-medium hover:underline">
          Login
        </Link>
      </p>
    </div>
  );
}

export default ResetPassword;
