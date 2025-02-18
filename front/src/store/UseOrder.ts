import { create, StateCreator } from "zustand";
import axios from "axios";
import { toast } from "sonner";
import { createJSONStorage, persist, PersistOptions } from "zustand/middleware";
import { Order, OrderStore } from "@/types/OrderTypes";

const API_URL = import.meta.env.VITE_BACKEND_URL;

type MyPersist = (
  config: StateCreator<OrderStore>,
  options: PersistOptions<OrderStore>
) => StateCreator<OrderStore>;

const API_ENDPOINT = `${API_URL}/api/v1/order`;

const UseOrderStore = create<OrderStore>(
  (persist as MyPersist)(
    (set) => ({
      loading: false,
      order: [],
      createOrder: async (orderData: any) => {
        try {
          set({ loading: true });
          const response = await axios.post(
            `${API_ENDPOINT}/create-order`,
            orderData,
            {
              headers: { "Content-Type": "application/json" },
            }
          );

          if (response.data.success) {
            toast.success("Order placed successfully!");
          }
        } catch (error: any) {
          console.error(
            "Error creating order:",
            error.response?.data || error.message
          );
        } finally {
          set({ loading: false });
        }
      },
      SingleOrder: async (userId: string) => {
        try {
          set({ loading: true });
          const response = await axios.get(
            `${API_ENDPOINT}/get-orders/${userId}`
          );
          if (response.data.success) {
            set({ order: response.data.orders });
          } else {
            set({ order: [] });
            toast.error(response.data.message || "Failed to fetch orders");
          }
        } catch (error: any) {
          toast.error(error.response?.data?.message || "Error fetching orders");
        } finally {
          set({ loading: false });
        }
      },
      getAllOrders: async () => {
        try {
          set({ loading: true });
          const response = await axios.get(`${API_ENDPOINT}/admin/all-orders`);
          if (response.data.success) {
            set({ order: response.data.orders });
          } else {
            toast.error(response.data.message || "Failed to fetch orders");
          }
        } catch (error: any) {
          toast.error(error.response?.data?.message || "Error fetching orders");
        } finally {
          set({ loading: false });
        }
      },
      updateOrderStatus: async (id: string, status: string) => {
        try {
          set({ loading: true });
          const response = await axios.patch(
            `${API_ENDPOINT}/admin/orders/${id}`,
            { status },
            { headers: { "Content-Type": "application/json" } }
          );
          if (response.data.success) {
            // Optionally, update the status in local state
            set((state) => ({
              order: state.order.map((order: Order | any) =>
                order._id === id ? { ...order, status } : order
              ),
            }));
            toast.success(response.data.message);
          } else {
            toast.error(
              response.data.message || "Failed to update order status"
            );
          }
        } catch (error: any) {
          toast.error(
            error.response?.data?.message || "Error updating order status"
          );
        } finally {
          set({ loading: false });
        }
      },
    }),
    {
      name: "order-store",
      storage: createJSONStorage(() => localStorage),
      // Unique name for localStorage
    }
  )
);

export default UseOrderStore;
