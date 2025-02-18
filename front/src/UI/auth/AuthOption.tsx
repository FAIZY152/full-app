import { ArrowRight, User, UtensilsCrossed, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const AuthOption = () => {
  return (
    <div className="">
      {/* Header with logo */}
      <header className="container max-w-4xl mx-auto pt-8 px-4">
        <div className="flex justify-between items-center">
          <img
            src="https://www.foodpanda.com/wp-content/uploads/2024/05/foodpanda-logo-RGB-stacked.png"
            alt="FoodPanda Logo"
            width={180}
            height={40}
            className="h-10 w-auto rounded-lg"
          />
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full text-pink-600 dark:text-pink-400 hover:bg-pink-100 dark:hover:bg-gray-700">
            <X className="h-6 w-6" />
            <span className="sr-only">Close</span>
          </Button>
        </div>
      </header>

      {/* Auth options */}
      <main className="container max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-8 text-gray-800 dark:text-gray-100">
          How would you like to start?
        </h1>
        <div className="grid gap-6 md:grid-cols-2 md:gap-8">
          {/* Restaurant Holder Option */}
          <Link to="/restaurant-signup" className="group">
            <div className="relative p-6 bg-pink-600 text-white dark:bg-pink-700 rounded-xl transition-transform transform hover:scale-105">
              <UtensilsCrossed className="h-12 w-12 mb-4" />
              <h2 className="text-2xl font-semibold mb-2">
                As A Restaurant Holder
              </h2>
              <p className="text-pink-100 dark:text-pink-300">
                Earn money by taking online orders
              </p>
              <ArrowRight className="h-6 w-6 absolute bottom-4 right-4 transform group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Customer Option */}
          <Link to="/signup" className="group">
            <div className="relative p-6 bg-white dark:bg-gray-800 border-2 border-pink-200 dark:border-gray-600 rounded-xl transition-transform transform hover:scale-105">
              <User className="h-12 w-12 mb-4 text-pink-600 dark:text-pink-400" />
              <h2 className="text-2xl font-semibold mb-2 text-gray-800 dark:text-gray-100">
                Sign up to Order & Customer
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Get your favorite food delivered
              </p>
              <ArrowRight className="h-6 w-6 absolute bottom-4 right-4 text-pink-600 dark:text-pink-400 transform group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        </div>

        {/* Login Section */}
        <div className="mt-12 text-center space-y-4">
          <p className="text-gray-600 dark:text-gray-400">
            Already have an account?
          </p>
          <div className="space-x-4">
            <Button
              asChild
              variant="outline"
              className="border-pink-200 dark:border-gray-600 text-pink-600 dark:text-pink-400 hover:bg-pink-50 dark:hover:bg-gray-700">
              <Link to="/restaurant-login">
                Log in as a Restaurant Holder
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="border-pink-200 dark:border-gray-600 text-pink-600 dark:text-pink-400 hover:bg-pink-50 dark:hover:bg-gray-700">
              <Link to="/login">
                Log in as a Customer
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AuthOption;
