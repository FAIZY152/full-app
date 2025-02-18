import axios from "axios";

const API_ENDPOINT = "http://localhost:5401/api/v1/resturent";
export const searchLocation = async (country: string, city: string) => {
  try {
    const response = await axios.get(`${API_ENDPOINT}/search/location`, {
      params: { country, city },
    });
    toast.error(response.data);
    return response.data; // Returns the list of restaurants
  } catch (error: any) {
    console.error("Error fetching restaurants by location:", error);
    toast.error(error.message);
    return [];
  }
};

// API call for search by restaurant name and location
export const searchName = async (searchQuery: string) => {
  try {
    // Send the same searchQuery for both city and restaurantName fields
    const response = await axios.get(`${API_ENDPOINT}/search/name`, {
      params: { city: searchQuery, resturentName: searchQuery },
    });

    toast.error(response.data);
    return response.data;
  } catch (error: any) {
    console.error("Error fetching restaurants:", error);
    toast.error(error.message);

    return [];
  }
};

// API call for filtering by cuisine
// export const searchCuisine = async (country, city, cuisines) => {
//   try {
//     const response = await axios.get("/api/restaurants", {
//       params: { country, city, cuisine: cuisines },
//     });
//     return response.data;
//   } catch (error) {
//     console.error("Error fetching restaurants by cuisine:", error);
//     return [];
//   }
// };
