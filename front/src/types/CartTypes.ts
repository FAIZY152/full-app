import { MenuItem } from "./RestaurentTypes";

export interface CartItem extends MenuItem {
  quantity: number;
}

export type CartStore = {
  cart: CartItem[];
  addToCart: (item: MenuItem) => void;
  removeFromCart: (itemId: string) => void;
  clearCart: () => void;
  CartIncrement: (itemId: string) => void;
  CartDecrement: (itemId: string) => void;

};
