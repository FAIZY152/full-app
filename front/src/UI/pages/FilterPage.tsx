import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import SearchStore from "@/store/SearchStore";
import { useEffect } from "react";

export type FilterOptionsState = {
  id: string;
  label: string;
};

const filterOptions: FilterOptionsState[] = [
  { id: "Biryani", label: "Biryani" },
  { id: "tea", label: "Tea" },
  { id: "sweets", label: "Sweets" },
  { id: "burger", label: "Burger" },
  { id: "vegetarian", label: "Vegetarian" },
];

const FilterPage = () => {
  const {
    cuisines,
    setCuisines,
    fetchRestaurantsByCuisine,
    setRestaurants,
    S_restaurants,
    appliedFilterHandler,
  } = SearchStore();

  // Reset filters
  const resetFilters = () => {
    setCuisines([]); // Reset cuisines to an empty array
    setRestaurants(S_restaurants); // Fetch all restaurants without filters
    fetchRestaurantsByCuisine([]); // Fetch all restaurants (without filters)
  };

  // Fetch restaurants whenever cuisines change
  useEffect(() => {
    fetchRestaurantsByCuisine(cuisines); // Pass the cuisines array when filters change
  }, [cuisines, fetchRestaurantsByCuisine]);

  return (
    <div className="md:w-72 dark:bg-gray-800 dark:border-gray-700 border-gray-200 shadow-md dark:text-gray-300">
      <div className="py-3 md:py-5 px-4 mx-2 flex flex-col md:flex-row md:justify-between items-center">
        <h1 className="text-base md:text-2xl font-extrabold text-gray-600 dark:bg-gray-800 dark:border-gray-700 border-gray-200  dark:text-gray-100">
          Filter
        </h1>
        <button
          onClick={resetFilters}
          type="button"
          className="text-white bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-pink-300 dark:focus:ring-pink-800 font-medium md:text-sm text-[12px] md:px-5 px-3 md:py-2.5 py:2 mt-1 rounded text-center me-2 mb-2">
          Reset
        </button>
      </div>
      {filterOptions.map((option) => (
        <div key={option.id} className="flex items-center space-x-2 my-5">
          <Checkbox
            id={option.id}
            checked={cuisines.includes(option.label)}
            onClick={() => appliedFilterHandler(option.label)}
          />
          <Label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            {option.label}
          </Label>
        </div>
      ))}
    </div>
  );
};

export default FilterPage;
