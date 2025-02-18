import { ResturentTypes } from "@/types/RestaurentTypes";
import axios from "axios";
import { toast } from "sonner";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

const API_ENDPOINT = "http://localhost:5401/api/v1/resturent";

axios.defaults.withCredentials = true;
const useResturent = create<ResturentTypes>()(
  persist(
    (set) => ({
      loading: false,
      resturent: null,
      singleResturent: null,
      permit: false,
      // Create Restaurant
      createResturents: async (formdata: FormData) => {
        try {
          set({ loading: true });
          const res = await axios.post(
            `${API_ENDPOINT}/create-resturent`,
            formdata,
            {
              headers: { "Content-Type": "multipart/form-data" },
            }
          );
          if (res.data.success) {
            toast.success(res.data.message);
          }
        } catch (error: any) {
          toast.error(
            error.response?.data?.message || "Error creating restaurant"
          );
        } finally {
          set({ loading: false });
        }
      },

      handlePermit: () => {
        set({ permit: false });
      },

      reset: () => {
        set({
          loading: false,
          resturent: null,
        });
      },
      // Get Restaurant
      getResturent: async () => {
        try {
          set({ loading: true });
          const res = await axios.get(`${API_ENDPOINT}/get-resturent`);
          if (res.data.success && res.data.resturent) {
            set({ resturent: res.data.resturent });
          } else {
            set({ resturent: null });
          }
        } catch (error: any) {
          set({ resturent: null });
          toast.error(
            error.response?.data?.message || "Error fetching restaurant"
          );
        } finally {
          set({ loading: false });
        }
      },

      // Update Restaurant
      updateResturent: async (formdata: FormData) => {
        try {
          set({ loading: true });
          const res = await axios.put(
            `${API_ENDPOINT}/update-resturent`,
            formdata,
            {
              headers: { "Content-Type": "multipart/form-data" },
            }
          );
          if (res.data.success) {
            toast.success(res.data.message);
          }
        } catch (error: any) {
          toast.error(
            error.response?.data?.message || "Error updating restaurant"
          );
        } finally {
          set({ loading: false });
        }
      },

      GetSingleResturent: async (resturentId: string) => {
        try {
          const response = await axios.get(
            `${API_ENDPOINT}/resturents/${resturentId}`
          );
          if (response.data.success) {
            set({ singleResturent: response.data.resturent });
          } else {
            set({ singleResturent: null });
          }
        } catch (error: any) {
          toast.error("Error in Get Resturent");
        }
      },

      // Menus Related

      addMenuResturent: async (menu: any) => {
        set((state: any) => ({
          resturent: state.resturent
            ? { ...state.resturent, menu: [...state.resturent.menu, menu] }
            : { menu: [menu] }, // Initialize if resturent is null
        }));
      },
      updatedMenuResturent: async (updateMenu: any) => {
        try {
          set((state: any) => {
            if (state.resturent) {
              const update = state.resturent.menu.map((menu: any) =>
                menu._id === updateMenu._id ? updateMenu : menu
              );
              return {
                resturent: {
                  ...state.resturent,
                  menu: update,
                },
              };
            }
            // Always return a valid object even if state.resturent is falsy
            return state;
          });
        } catch (error: any) {}
      },
      deleteMenuResturent: async (menuId: string) => {
        set((state: any) => ({
          resturent: state.resturent
            ? {
                ...state.resturent,
                menu: state.resturent.menu.filter(
                  (menu: any) => menu._id !== menuId // Ensure you are using the correct identifier
                ),
              }
            : null,
        }));
      },
    }),
    {
      name: "resturent",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useResturent;
