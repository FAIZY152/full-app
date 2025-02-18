import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Minus, Plus, Trash2 } from "lucide-react";

import UseCartStore from "@/store/UseCartStore";
import useResturent from "@/store/UseResturent";
import { CartItem } from "@/types/CartTypes";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { UserStore } from "@/store/UserStroe";
import UseOrderStore from "@/store/UseOrder";

export default function CartPageUI() {
  const { resturent } = useResturent();
  const { cart, CartIncrement, CartDecrement, clearCart } = UseCartStore();
  const { createOrder } = UseOrderStore();
  const { user } = UserStore();

  const navigate = useNavigate();
  let totalPrice = () => {
    try {
      let total = 0;
      cart?.forEach((item) => {
        total += item.price * (item.quantity || 1); // Multiply price by quantity
      });
      return total;
    } catch (error: any) {
      toast.error("Error calculating total price");
      return 0; // Return 0 in case of an error
    }
  };

  const handleCreateOrder = async () => {
    if (cart.length === 0) {
      toast.error("Cart is empty!");
      return;
    }

    try {
      const orderData = {
        user: user?._id, // Replace with the actual user ID from auth
        resturent: resturent?._id, // Replace with the actual restaurant ID
        cartItems: cart.map((item: CartItem) => ({
          menuid: item._id,
          name: item.name,
          image: item.image,
          price: item.price,
          quantity: item.quantity,
        })),
        totalPrice: totalPrice(),
      };

      await createOrder(orderData);
      navigate("/order-status");

      clearCart(); // Clear the cart after successful order creation
    } catch (error) {
      toast.error("Failed to create order");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 dark:bg-gray-800 dark:border-gray-700 border-gray-200 shadow-md dark:text-gray-300">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-xl sm:text-2xl md:text-3xl font-bold">
            Your Cart
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-4">
            {cart?.map((item: CartItem) => (
              <li
                key={item._id}
                className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white p-4 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 border-gray-200  dark:text-gray-300">
                <div className="flex items-center space-x-4 mb-4 sm:mb-0">
                  <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-md overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="object-cover w-full h-full rounded"
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm sm:text-base">
                      {item.name}
                    </h3>
                    <p className="text-xs sm:text-sm dark:text-gray-400 text-gray-600">
                      Rs {item.price * item.quantity} each
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2 w-full sm:w-auto justify-between sm:justify-start">
                  <Button
                    onClick={() => CartDecrement(item._id)}
                    className="rounded"
                    variant="outline"
                    size="icon"
                    aria-label={`Decrease quantity of ${item.name}`}>
                    <Minus className="h-3 w-3 sm:h-4 sm:w-4" />
                  </Button>
                  <Input
                    type="number"
                    value={item.quantity}
                    className="w-12 sm:w-16 text-center rounded shadow-md text-sm sm:text-base"
                    readOnly
                    aria-label={`Quantity of ${item.name}`}
                  />
                  <Button
                    onClick={() => CartIncrement(item._id)}
                    className="rounded bg-pink-100 dark:bg-gray-800 dark:border-gray-200 border-gray-200  shadow-md dark:text-gray-300"
                    variant="outline"
                    size="icon"
                    aria-label={`Increase quantity of ${item.name}`}>
                    <Plus className="h-3 w-3 sm:h-4 sm:w-4" />
                  </Button>
                  <Button
                    className="rounded bg-pink-600 text-white"
                    variant="destructive"
                    size="icon"
                    aria-label={`Remove ${item.name} from cart`}>
                    <Trash2 className="h-3 w-3 sm:h-4 sm:w-4" />
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        </CardContent>
        <CardFooter className="flex flex-col items-end">
          <div className="w-full space-y-2">
            <div className="flex justify-between font-medium text-sm sm:text-base md:text-lg">
              <span>Delivery Fee:</span>
              <span>Rs. {resturent?.deliveryPrice || 100}</span>
            </div>
            <div className="flex justify-between font-medium text-sm sm:text-base md:text-lg">
              <span>Total:</span>
              <span>Rs. {totalPrice()}</span>
            </div>
          </div>
          <div className="mt-3 p-2 flex justify-start gap-4 items-center">
            <Button
              onClick={() => navigate("/profile")}
              className="mt-4 w-full sm:w-auto bg-gray-600 rounded hover:bg-gray-900 text-white">
              Update Adress
            </Button>

            <Button
              onClick={handleCreateOrder}
              className="mt-4 w-full sm:w-auto bg-pink-600 hover:bg-pink-900 rounded text-white">
              Proceed to Checkout
            </Button>
          </div>
        </CardFooter>
      </Card>
      {/* <ReviewAdress open={open} setOpen={setOpen} /> */}
    </div>
  );
}
