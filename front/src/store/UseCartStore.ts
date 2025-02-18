import { CartItem, CartStore } from "@/types/CartTypes";
import { MenuItem } from "@/types/RestaurentTypes";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

const UseCartStore = create<CartStore>()(
  persist(
    (set) => ({
      cart: [],
      addToCart: (item: MenuItem) => {
        set((state: any) => {
          const existItem = state.cart.find(
            (cartItem: CartItem) => cartItem._id === item._id
          );
          if (existItem) {
            return {
              cart: state.cart.map((cartItem: CartItem) =>
                cartItem._id === item._id
                  ? { ...cartItem, quantity: cartItem.quantity + 1 }
                  : cartItem
              ),
            };
          } else {
            return {
              cart: [...state.cart, { ...item, quantity: 1 }],
            };
          }
        });
      },
      clearCart: () => {
        set({ cart: [] });
      },
      removeFromCart: (itemId: string) => {
        set((state: any) => {
          const updateCart = state.cart.filter(
            (cartItem: CartItem) => cartItem._id !== itemId
          );
          return { cart: updateCart };
        });
      },
      CartIncrement: (itemId: string) => {
        set((state: any) => {
          const updateCart = state.cart.map((cartItem: CartItem) => {
            if (cartItem._id === itemId) {
              return { ...cartItem, quantity: cartItem.quantity + 1 };
            } else {
              return cartItem;
            }
          });
          return { cart: updateCart };
        });
      },
      CartDecrement: (itemId: string) => {
        set((state: any) => {
          const updateCart = state.cart.map((cartItem: CartItem) => {
            if (cartItem._id === itemId && cartItem.quantity > 1) {
              return { ...cartItem, quantity: cartItem.quantity - 1 };
            } else {
              return cartItem;
            }
          });
          return { cart: updateCart };
        });
      },
    }),
    {
      name: "user-cart-store",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default UseCartStore;
