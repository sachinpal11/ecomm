import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Logo from "../assets/flxora_black.png";
import toast from "react-hot-toast";
import { verifyMail, resendMail } from "../api/auth/authAPI";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { verifyUser } from "../api/auth/authSlice";
function VerificationLink() {
  const navigate = useNavigate();
  const { token } = useParams();

  const email = useSelector((state) => state.auth.user?.email);

  const [loading, setLoading] = useState(true);
  const [expired, setExpired] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!token) {
      toast.error("No verification link Found");
      navigate("/signup");
      return;
    }

    const verifyEmail = async () => {
      const toastId = toast.loading("Verifying your email...");

      try {
        const res = await verifyMail(token);

        toast.success("Email verified successfully!", { id: toastId });
        dispatch(verifyUser());

        setTimeout(() => {
          navigate("/login");
        }, 1500);
      } catch (error) {
        setExpired(true);

        toast.error(error?.response?.data?.message || "Verification failed", {
          id: toastId,
        });
      } finally {
        setLoading(false);
      }
    };

    verifyEmail();
  }, [token, navigate]);

  const handleResend = async () => {
    const toastId = toast.loading("Sending verification email...");
    try {
      const res = await resendMail(email);
      console.log(res.data);
      toast.success("Verification email sent!", { id: toastId });
      dispatch(verifyUser());
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to send email", {
        id: toastId,
      });
    }
  };

  return (
    <div className="w-full flex justify-center px-6">
      <div className="w-full max-w-md flex flex-col items-center">
        <div className="mb-8">
          <img src={Logo} className="w-48 h-auto" alt="FLXORA" />
        </div>

        <div className="bg-white shadow-lg rounded-xl p-10 text-center w-full">
        {loading && (
          <>
            <h2 className="text-xl font-semibold mb-4">Verifying your email</h2>

            <p className="text-gray-500">Please Check your Email Inbox...</p>
          </>
        )}

        {!loading && !expired && (
          <>
            <h2 className="text-xl font-semibold mb-4">
              Verification Complete
            </h2>

            <p className="text-gray-500">You can now continue using FLXORA.</p>
          </>
        )}

        {!loading && expired && (
          <>
            <h2 className="text-xl font-semibold mb-4">
              Verification Link Expired
            </h2>

            <p className="text-gray-500 mb-6">
              Your verification link has expired. Click below to resend a new
              verification email.
            </p>

            <button
              onClick={handleResend}
              className="bg-black text-white px-6 py-3 rounded-full hover:bg-neutral-800 transition"
            >
              Resend Verification Email
            </button>
          </>
        )}
      </div>
    </div>
  </div>
  );
}

export default VerificationLink;
