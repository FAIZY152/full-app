import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { UserStore } from "@/store/UserStroe";
import { Key, Loader2, Mail, User } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [fullname, setFullName] = useState<string>("");

  const loading = false;

  const { forgetPassword } = UserStore();

  const navigate = useNavigate();
  const handleForgetPassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await forgetPassword(email, fullname, password);
    navigate("/login");
  };

  return (
    <div className="flex items-center justify-center min-h-screen w-full dark:bg-gray-800 dark:border-gray-700 border-gray-200  dark:text-gray-100">
      <form
        className="flex flex-col gap-5 md:p-8 w-full max-w-md rounded-lg mx-4"
        onSubmit={handleForgetPassword}>
        <div className="text-center">
          <h1 className="font-extrabold text-2xl mb-2">Forgot Password</h1>
          <p className="text-sm text-gray-600">
            Enter your email address to reset your password
          </p>
        </div>
        <div className="relative w-full">
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="pl-10"
          />
          <Mail className="absolute inset-y-2 left-2 text-gray-600 pointer-events-none" />
        </div>
        <div className="relative w-full">
          <Input
            type="text"
            value={fullname}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Enter your full name to reset your password"
            className="pl-10"
          />
          <User className="absolute inset-y-2 left-2 text-gray-600 pointer-events-none" />
        </div>
        <div className="relative w-full">
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your New Password"
            className="pl-10"
          />
          <Key className="absolute inset-y-2 left-2 text-gray-600 pointer-events-none" />
        </div>
        {loading ? (
          <Button disabled className="bg-orange hover:bg-hoverOrange">
            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
          </Button>
        ) : (
          <Button className="bg-[#FF2B85] hover:bg-[#8d6777]">
            Send Reset Link
          </Button>
        )}
        <span className="text-center">
          Back to
          <Link to="/login" className="text-[#FF2B85]">
            Login
          </Link>
        </span>
      </form>
    </div>
  );
};

export default ForgotPassword;
