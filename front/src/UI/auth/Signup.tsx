import { UserStore } from "@/store/UserStroe";
import { signupInpt } from "@/types/UserTypes";
import { Loader2 } from "lucide-react";
import { ChangeEvent, useState } from "react";
import { SiFoodpanda } from "react-icons/si";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const SignUp = () => {
  // const loading = false;
  const { loading, signup } = UserStore();

  const navigate = useNavigate();

  const [input, setinput] = useState<signupInpt>({
    fullname: "",
    email: "",
    password: "",
    phone: "",
  });

  const ChangeHandler = async (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setinput({ ...input, [name]: value });
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await signup(input);
      if (res) {
        toast.success("Registered Successfully");
        navigate("/", { replace: true });
      }
    } catch (error) {
      const er = error as Error;
      toast.error(er.message);
    }
  };

  return (
    <div className="py-16">
      <div className="flex bg-white rounded-lg shadow-lg overflow-hidden mx-auto max-w-sm lg:max-w-4xl dark:bg-gray-800 dark:border-gray-700 border-gray-200  dark:text-gray-100">
        <div
          className="hidden lg:block lg:w-1/2 bg-cover rounded-md"
          style={{
            backgroundImage: 'url("./images/signup.jpg")',
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundSize: "cover",
            borderRadius: "8px",
          }}></div>
        <div className="w-full p-8 lg:w-1/2">
          <div className="flex justify-center gap-3 items-center">
            <SiFoodpanda className="text-[#FF2B85] font-bold text-3xl" />
            <h2 className="text-2xl font-extrabold text-[#FF2B85] font-[Roboto Condensed]  text-gray-700 text-center dark:text-gray-100">
              Food Panda
            </h2>
          </div>

          <form
            onSubmit={handleSubmit}
            className="dark:bg-gray-800 dark:border-gray-700 border-gray-200  dark:text-gray-100">
            <div className="mt-4 flex items-center justify-between dark:bg-gray-800 dark:border-gray-700 border-gray-200 dark:text-gray-100   ">
              <span className="border-b w-1/5 lg:w-1/4" />
              <Link
                to={"/login"}
                className="text-xs dark:text-gray-100 text-center text-gray-500 uppercase">
                login
              </Link>
              <span className="border-b w-1/5 lg:w-1/4" />
            </div>
            <div className="mt-4">
              <label className="block dark:text-gray-100 text-gray-700 text-sm font-bold mb-2">
                Full Name
              </label>
              <input
                className="bg-gray-200 text-gray-700   dark:bg-gray-800 dark:border-gray-700 border-gray-200  dark:text-gray-100 focus:outline-none focus:shadow-outline border  rounded py-2 px-4 block w-full appearance-none"
                type="text"
                placeholder="Full Name"
                onChange={ChangeHandler}
                name="fullname"
              />
            </div>
            <div className="mt-4">
              <label className="block dark:text-gray-100 text-gray-700 text-sm font-bold mb-2">
                Email Address
              </label>
              <input
                className="bg-gray-200 text-gray-700   dark:bg-gray-800 dark:border-gray-700 border-gray-200  dark:text-gray-100 focus:outline-none focus:shadow-outline border  rounded py-2 px-4 block w-full appearance-none"
                type="email"
                placeholder="Email Address"
                onChange={ChangeHandler}
                name="email"
              />
            </div>
            <div className="mt-4">
              <div className="flex justify-between">
                <label className="block dark:text-gray-100 text-gray-700 text-sm font-bold mb-2">
                  Password
                </label>
              </div>
              <input
                className="bg-gray-200 text-gray-700   dark:bg-gray-800 dark:border-gray-700 border-gray-200  dark:text-gray-100 focus:outline-none focus:shadow-outline border  rounded py-2 px-4 block w-full appearance-none"
                type="password"
                placeholder="Password"
                name="password"
                autoComplete="current-password"
                onChange={ChangeHandler}
              />
            </div>
            <div className="mt-4">
              <label className="block dark:text-gray-100 text-gray-700 text-sm font-bold mb-2">
                Contact
              </label>
              <input
                className="bg-gray-200 text-gray-700   dark:bg-gray-800 dark:border-gray-700 border-gray-200  dark:text-gray-100 focus:outline-none focus:shadow-outline border  rounded py-2 px-4 block w-full appearance-none"
                type="text"
                placeholder="Contact"
                onChange={ChangeHandler}
                name="phone"
              />
            </div>

            <div className="mt-8">
              {loading ? (
                <button className="bg-[#FF2B85] flex items-center justify-center text-white font-bold py-2 px-4 w-full rounded hover:bg-[#ff88ba]">
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />{" "}
                  <span>Please Wait</span>
                </button>
              ) : (
                <button className="bg-[#FF2B85] text-white font-bold py-2 px-4 w-full rounded hover:bg-[#ff88ba]">
                  Regester
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
