import useResturent from "@/store/UseResturent";
import axios from "axios";
import { toast } from "sonner";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type MenuState = {
  loading: boolean;
  menu: any;
  createMenu: (formdata: FormData) => Promise<void>;
  MenuEdit: (menuId: string, formdata: FormData) => Promise<void>;
  DeleteMenu: (restaurantId: string, menuId: string) => Promise<void>;
};

const API_URL = import.meta.env.VITE_BACKEND_URL;

const API_ENDPOINT = `${API_URL}/api/v1/menu`;

const UseMenu = create<MenuState>()(
  persist(
    (set) => ({
      loading: false,
      menu: null,
      createMenu: async (formdata: FormData) => {
        try {
          set({ loading: true });
          const response = await axios.post(
            `${API_ENDPOINT}/create-menu`,
            formdata,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );
          if (response.data.success) {
            set({ loading: false, menu: response.data.menu });
            toast.success(response.data.message);
          }
          // Update the restaurant state with the new menu
          useResturent.getState().addMenuResturent(response.data.menu);
        } catch (error: any) {
          set({ loading: false });
          toast.error(error.response.data.message);
        }
      },

      MenuEdit: async (menuId: string, formdata: FormData) => {
        try {
          set({ loading: true });
          const response = await axios.put(
            `${API_ENDPOINT}/edit-menu/${menuId}`,
            formdata,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );
          if (response.data.success) {
            set({ loading: false, menu: response.data.menu });
            toast.success(response.data.message);
          }
          // Update the restaurant state with the updated menu
          await useResturent
            .getState()
            .updatedMenuResturent(response.data.menu);
        } catch (error: any) {
          set({ loading: false });
          toast.error(error.response.data.message);
        }
      },
      DeleteMenu: async (restaurantId: string, menuId: string) => {
        try {
          const response = await axios.delete(
            `${API_ENDPOINT}/delete-menu/${restaurantId}/${menuId}`
          );

          if (response.data.success) {
            toast.error("Menu item deleted:", response.data.resturent);
            toast.success(response.data.message);

            // Update the state immediately after successful deletion
            useResturent.getState().deleteMenuResturent(menuId);
          }
        } catch (error: any) {
          console.error("Error deleting menu item:", error.message);
          toast.error("Failed to delete menu item");
        }
      },
      // deleteMenu: async (menuId: string) => {
      //   try {
      //     set({ loading: true });
      //     const response = await axios.delete(
      //       `${API_ENDPOINT}/delete-menu/${menuId}`
      //     );
      //     if (response.data.successs) {
      //       toast.error(response.data);
      //       set({ loading: false });
      //       toast.success(response.data.message);
      //     }
      //     // update Resturent
      //     useResturent.getState().deleteMenuResturent(menuId);
      //   } catch (error: any) {
      //     set({ loading: false });
      //     toast.error(error.response.data.message);
      //   }
      // },
    }),
    {
      name: "menu-name",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
export default UseMenu;
