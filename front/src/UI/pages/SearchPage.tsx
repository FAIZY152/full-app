import SearchRestaurants from "./SearchRestaurants";
import { Badge } from "@/components/ui/badge";
import { BikeIcon, Clock, Globe, MapPin } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
// import NoResultsFound from "./utils/NotFoundResult";
import { Link, useParams } from "react-router-dom";
import FilterPage from "./FilterPage";
import SearchStore from "@/store/SearchStore";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { ResturentT } from "@/types/RestaurentTypes";
import CardSkeleton from "./utils/CardsSkeleton";
import NoResultsFound from "./utils/NotFoundResult";

// import { useParams } from "react-router-dom"

const SearchPage = () => {
  const { S_restaurants, loading } = SearchStore();
  let { text } = useParams();

  // Search type

  return (
    <div className="max-w-7xl mx-auto  min-h-screen py-10 px-4">
      <div className="w-full flex justify-start items-starr gap-5">
        {/* <div className=" w-[30%] flex flex-col gap-3  p-4 shadow-md bg-white">
          <div className="py-3 md:py-5 px-4 mx-2 flex flex-col md:flex-row md:justify-between items-center">
            <h1 className="text-base md:text-2xl font-extrabold text-gray-600">
              Filter
            </h1>
            <button
              type="button"
              className="text-white bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-pink-300 dark:focus:ring-pink-800 font-medium md:text-sm text-[12px] md:px-5 px-3  md:py-2.5 py:2 mt-1 rounded text-center me-2 mb-2">
              Reset
            </button>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox id="terms" />
            <label
              htmlFor="terms"
              className="md:text-sm text-[12px] md:font-medium text-gray-600 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Biryani
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="terms" />
            <label
              htmlFor="terms"
              className="md:text-sm text-[12px] md:font-medium text-gray-600 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Chicken
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="terms" />
            <label
              htmlFor="terms"
              className="md:text-sm text-[12px] md:font-medium text-gray-600 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Sweets
            </label>
          </div>
        </div> */}
        <FilterPage />

        <div className="w-full">
          {/* Restaurants */}
          <div>
            <SearchRestaurants />
          </div>

          {/* Cards */}
          <div className="w-full max-w-7xl mx-auto p-4">
            <h1 className="text-2xl md:text-3xl font-bold mb-6">
              {S_restaurants?.length} Restaurants found
            </h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4">
              {loading ? (
                <CardSkeleton />
              ) : !loading && S_restaurants?.length === 0 ? (
                <NoResultsFound searchTxt={text} />
              ) : (
                S_restaurants?.map((restaurant: ResturentT) => (
                  <Card
                    key={restaurant._id}
                    className="bg-white dark:bg-gray-800 shadow-xl rounded-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300">
                    <div className="relative">
                      <AspectRatio ratio={16 / 6}>
                        <img
                          src={restaurant.imageFile}
                          alt=""
                          className="w-full h-full object-cover"
                        />
                      </AspectRatio>
                      <div className="absolute top-2 left-2 bg-white dark:bg-gray-700 bg-opacity-75 rounded-lg px-3 py-1">
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          Featured
                        </span>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                          {restaurant.resturentName}
                        </h1>
                        <div>
                          <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                            <Clock size={14} />
                            <span className="md:text-sm text-[10px] font-medium">
                              {restaurant.deliveryTime} mins
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300 mt-2">
                            <BikeIcon size={14} />
                            <span className="md:text-sm text-[10px] font-medium">
                              Rs. {restaurant.deliveryPrice}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="mt-2 gap-1 flex items-center text-gray-600 dark:text-gray-400">
                        <MapPin size={16} />
                        <p className="text-sm">
                          City:
                          <span className="font-medium">{restaurant.city}</span>
                        </p>
                      </div>
                      <div className="mt-2 gap-1 flex items-center text-gray-600 dark:text-gray-400">
                        <Globe size={16} />
                        <p className="text-sm">
                          Country:{" "}
                          <span className="font-medium">
                            {restaurant.country}
                          </span>
                        </p>
                      </div>
                      <div className="flex gap-2 mt-4 flex-wrap">
                        {restaurant.cusines.map(
                          (cuisine: string, idx: number) => (
                            <Badge
                              key={idx}
                              className="font-medium px-2 py-1 dark:bg-gray-800 dark:border-gray-700 border-gray-200  dark:text-gray-100  rounded-full shadow-md bg-pink-200">
                              {cuisine}
                            </Badge>
                          )
                        )}
                      </div>
                    </CardContent>
                    <CardFooter className="p-4 border-t dark:border-t-gray-700 border-t-gray-100 text-white flex justify-end">
                      <Link to={`/resturent-menu/${restaurant._id}`}>
                        <Button className="bg-pink-600 hover:bg-pink-500 font-semibold py-2 px-4 rounded-full shadow-md transition-colors duration-200">
                          View Menus
                        </Button>
                      </Link>
                    </CardFooter>
                  </Card>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
