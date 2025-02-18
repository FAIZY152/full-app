export interface OrderItem {
    menuId: string;
    name: string;
    image: string;
    price: number;
    quantity: number;
  }
  
  // Define the structure of the order
  export interface Order {
    _id: string;
    user: string; // User ID
    resturent: string; // Restaurant ID
    cartItems: OrderItem[];
    totalPrice: number;
    status: "pending" | "confirmed" | "preparing" | "outofdelivery" | "delivered";
    createdAt: string; // Date ISO String
    updatedAt: string; // Date ISO String
  }
  
  // Define the response structure from the API
  
  // Define the structure of the order store
  export interface OrderStore {
    loading: boolean;
    order: Order[] | any;
    createOrder: (orderData: any) => Promise<void>;
    SingleOrder: (userId: string) => Promise<void>;
    getAllOrders: () => Promise<void>;
    updateOrderStatus: (orderId: string, status: string) => Promise<void>;
  }
  