import SearchStore from "@/store/SearchStore";
import { useEffect } from "react";

const SearchRestaurants = () => {
  const { searchQuery, setSearchQuery, fetchRestaurantsByName } = SearchStore();

  const handleSearchQueryChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => setSearchQuery(event.target.value);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetchRestaurantsByName();
    setSearchQuery("");
  };
  useEffect(() => {
    if (searchQuery) {
      fetchRestaurantsByName();
    }
  }, [searchQuery, fetchRestaurantsByName]);

  
  return (
    <div className="w-full px-3">
      <form className="md:w-full mx-auto" onSubmit={handleSubmit}>
        <label
          htmlFor="default-search"
          className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">
          Search
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20">
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            value={searchQuery}
            placeholder="Search by Restaurant & City Or Cuisines 👌"
            onChange={handleSearchQueryChange}
            type="search"
            id="default-search"
            className="block outline-none w-full p-4 ps-10 md:text-sm text-[11px]  text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-pink-500 focus:border-pink-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-pink-500 dark:focus:border-pink-500"
            required
          />
          <button
            type="submit"
            className="text-white py-1 px-2 absolute end-2 bottom-2.5 rounded bg-pink-700 hover:bg-pink-800 focus:ring-4 focus:outline-none focus:ring-pink-300 font-medium  text-sm md:px-4 md:py-2 dark:bg-pink-600 dark:hover:bg-pink-700 dark:focus:ring-pink-800">
            Search
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchRestaurants;
