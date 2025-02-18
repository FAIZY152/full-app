import { ResturentT } from "@/types/RestaurentTypes";
import axios from "axios";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

// Types for restaurant and state

const API_URL = import.meta.env.VITE_BACKEND_URL;

const API_ENDPOINT = `${API_URL}/api/v1/resturent`;

export interface SearchStoreState {
  loading: boolean;
  mainSearch: string;
  searchQuery: string;
  cuisines: string[];
  S_restaurants: ResturentT[] | null;

  // Setters
  setMainSearch: (mainSearch: string) => void;
  setRestaurants: (restaurants: any) => void;
  setSearchQuery: (searchQuery: string) => void;
  setCuisines: (cuisines: string[] | ((prev: string[]) => string[])) => void;
  appliedFilterHandler: (label: string) => any;

  // Fetch function
  fetchByCountry: () => Promise<void>;
  fetchRestaurantsByName: () => Promise<void>;
  // fetchRestaurantsByCusine: () => Promise<void>;
  fetchRestaurantsByCuisine: (cuisines: string[]) => Promise<void>;
}

const SearchStore = create<SearchStoreState>()(
  persist(
    (set, get) => ({
      loading: false,
      mainSearch: "",
      searchQuery: "", // Single input field for city or restaurant name
      cuisines: [],
      S_restaurants: [],

      // Setters for inputs
      setMainSearch: (mainSearch: string) => set({ mainSearch }),
      setSearchQuery: (searchQuery: string) => set({ searchQuery }),
      setCuisines: (cuisines) =>
        set((state) => ({
          cuisines:
            typeof cuisines === "function"
              ? cuisines(state.cuisines)
              : cuisines,
        })),

      // Set the restaurants fetched from API
      setRestaurants: (restaurants: ResturentT[]) =>
        set({ S_restaurants: restaurants }),

      // fetch search data

      fetchByCountry: async () => {
        set({ loading: true });
        const { mainSearch } = SearchStore.getState();
        try {
          await new Promise((resolve) => setTimeout(resolve, 500)); // for show skeleton purpose
          // Call the API for searching by restaurantName or city
          const response = await axios.get(`${API_ENDPOINT}/search/location`, {
            params: { mainSearch },
          });

          if (response.data.success) {
            set({ S_restaurants: response.data.data });
            set({ loading: false });
          }
        } catch (error) {
          console.error("Error fetching restaurants:", error);
          set({ S_restaurants: [] });
          set({ loading: false });
        } finally {
          set({ loading: false });
        }
      },
      fetchRestaurantsByName: async () => {
        set({ loading: true });
        const { searchQuery } = SearchStore.getState();
        try {
          await new Promise((resolve) => setTimeout(resolve, 500)); // for show skeleton purpose
          // Call the API for searching by restaurantName or city
          const response = await axios.get(
            `${API_ENDPOINT}/search/searchByname`,
            {
              params: { searchQuery },
            }
          );

          if (response.data.success) {
            set({ S_restaurants: response.data.data });
            set({ loading: false });
          }
        } catch (error) {
          console.error("Error fetching restaurants:", error);
          set({ S_restaurants: [] });
          set({ loading: false });
        } finally {
          set({ loading: false });
        }
      },
      // Fetch restaurants by selected cuisines
      fetchRestaurantsByCuisine: async (cuisines: string[]) => {
        const { setRestaurants } = get();
        try {
          const response = await axios.post(`${API_ENDPOINT}/search/cuisines`, {
            cuisines: cuisines.length > 0 ? cuisines : undefined, // Send undefined to fetch all restaurants
          });

          setRestaurants(response.data.data);
        } catch (error: any) {
          console.error("Error fetching restaurants:", error.message);
        }
      },

      appliedFilterHandler: (label: string) => {
        const { setCuisines } = get();
        setCuisines(
          (prev: string[]) =>
            prev.includes(label)
              ? prev.filter((filter) => filter !== label) // Remove filter
              : [...prev, label] // Add filter
        );
      },
    }),
    {
      name: "search-store",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default SearchStore;
