import { MapPin } from "lucide-react";
import GetStarted from "./GetStarted";
import React from "react";
import { useNavigate } from "react-router-dom";
import SearchStore from "@/store/SearchStore";

const HeroSection = () => {
  // const [searchText, setSearchText] = useState<string>("");
  const { mainSearch, setMainSearch } = SearchStore();
  // const { text } = useParams();

  const handleCountryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMainSearch(event.target.value);
  };
  const navigate = useNavigate();

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate(`/search/${mainSearch}`);
    await SearchStore.getState().fetchByCountry();
    setMainSearch("");
  };

  return (
    <div className="w-full min-h-screen dark:bg-gray-800 dark:border-gray-700 border-gray-200 shadow-md dark:text-gray-300  ">
      <div className="relative min-h-[500px] bg-gradient-to-b from-white to-pink-300 dark:from-black dark:to-pink-500 w-full overflow-hidden bg-gray-50 dark:bg-gray-800 dark:border-gray-700 border-gray-200 dark:text-gray-300">
        <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8 ">
          <div className="grid items-center gap-8 lg:grid-cols-2">
            {/* Left Column - Text and Form */}
            <div className="max-w-xl  border-gray-200 shadow-md dark:text-gray-300">
              <h1 className="mb-8 text-4xl font-bold capitalize tracking-tight text-gray-800 sm:text-5xl md:text-6xl  border-gray-200 dark:text-white">
                It's the food and groceries you love,
                <span className="block">delivered</span>
              </h1>
              <form className="w-full" onSubmit={handleSearch}>
                <div className="relative rounded-lg shadow-lg">
                  <input
                    value={mainSearch}
                    onChange={handleCountryChange}
                    type="text"
                    name="country"
                    placeholder="Search Restaurants By Country & Restaurant Name"
                    className="w-full dark:bg-gray-800 dark:border-gray-700 border-gray-200 shadow-md dark:text-gray-300 rounded-lg  px-4 py-4 pr-24 text-sm focus:border-pink-500 focus:ring-pink-500 sm:text-base"
                    required
                  />
                  <button
                    disabled
                    type="button"
                    className="absolute right-1 top-1/2 -translate-y-1/2 transform text-pink-500 hover:text-pink-600">
                    <MapPin className="h-5 w-5" />
                    <span className="sr-only">Locate me</span>
                  </button>
                </div>

                <button
                  type="submit"
                  className="mt-4 w-full rounded-lg bg-pink-500 px-6 py-4 text-center text-sm font-semibold text-white shadow-md transition-colors hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 sm:text-base">
                  Find food
                </button>
              </form>
            </div>

            {/* Right Column - Image */}
            <div className="relative hidden lg:block">
              <div className="relative h-[400px] w-full">
                <img
                  src="./images/hero.webp"
                  alt="Food delivery illustration with panda mascot"
                  className="absolute right-0 top-0 h-full w-auto object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <h2 className="text-3xl lg:text-4xl font-bold text-gray-700 px-5 dark:bg-gray-800 dark:border-gray-700 border-gray-200  dark:text-gray-100">
        Put us in your pocket
      </h2>
      <div className="mt-1 p-1">
        <GetStarted />
      </div>
    </div>
  );
};

export default HeroSection;
