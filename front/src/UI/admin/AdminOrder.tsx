import { Pizza, Search } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import UseOrderStore from "@/store/UseOrder";
import { useEffect } from "react";

const AdminOrder = () => {
  const { loading, order, getAllOrders, updateOrderStatus } = UseOrderStore();

  useEffect(() => {
    getAllOrders(); // Fetch orders once
  }, [getAllOrders]);

  const handleStatusChange = async (orderId: string, status: string) => {
    if (!orderId) {
      console.error("Order ID is undefined!");
      return;
    }
    await updateOrderStatus(orderId, status); // Update status
  };

  if (loading) {
    return (
      <div className="flex min-h-[400px] flex-col items-center justify-center p-4">
        <Pizza className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
        <h2 className="mb-2 text-lg font-semibold">Loading Orders...</h2>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Order Management</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search orders..." className="pl-8" />
            </div>
          </div>

          <div className="rounded-md border dark:bg-gray-800 dark:border-gray-700 border-gray-200  dark:text-gray-100">
            <Table className="w-full text-left border  rounded dark:bg-gray-800 dark:border-gray-700 border-gray-200  dark:text-gray-100">
              <TableHeader className="bg-gray-100">
                <TableRow>
                  <TableHead className="py-2 px-4 font-bold text-sm text-gray-700">
                    Order ID
                  </TableHead>
                  <TableHead className="py-2 px-4 font-bold text-sm text-gray-700">
                    Customer
                  </TableHead>
                  <TableHead className="py-2 px-4 font-bold text-sm text-gray-700">
                    Status
                  </TableHead>
                  <TableHead className="py-2 px-4 font-bold text-sm text-gray-700">
                    Total
                  </TableHead>
                  <TableHead className="py-2 px-4 font-bold text-sm text-gray-700">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {order?.map((orderItem: any, index: number) => (
                  <TableRow
                    key={orderItem._id || index}
                    className="hover:bg-gray-50 transition dark:bg-gray-800 dark:border-gray-700 border-gray-200  dark:text-gray-100">
                    <TableCell className="py-2 px-4 font-medium">
                      {index + 1}
                    </TableCell>
                    <TableCell className="py-2 px-4">
                      {orderItem?.user?.fullname || "N/A"}
                    </TableCell>
                    <TableCell className="py-2 px-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          orderItem?.status === "pending"
                            ? "bg-yellow-200 text-yellow-800"
                            : orderItem?.status === "preparing"
                            ? "bg-blue-200 text-blue-800"
                            : orderItem?.status === "confirmed"
                            ? "bg-purple-200 text-purple-800"
                            : "bg-green-200 text-green-800"
                        }`}>
                        {orderItem?.status || "Unknown"}
                      </span>
                    </TableCell>
                    <TableCell className="py-2 px-4">
                      <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full font-semibold text-sm">
                        Rs. {orderItem?.totalPrice || "0.00"}
                      </span>
                    </TableCell>
                    <TableCell className="py-2 px-4 text-right dark:bg-gray-800 dark:border-gray-700 border-gray-200  dark:text-gray-100">
                      <Select
                        value={orderItem.status}
                        onValueChange={(value) =>
                          handleStatusChange(orderItem._id, value)
                        }>
                        <SelectTrigger className="w-[130px] border border-gray-300 rounded">
                          <SelectValue placeholder="Update status" />
                        </SelectTrigger>
                        <SelectContent className="rounded bg-white shadow-md dark:bg-gray-800 dark:border-gray-700 border-gray-200  dark:text-gray-100">
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="confirmed">Confirmed</SelectItem>
                          <SelectItem value="preparing">Preparing</SelectItem>
                          <SelectItem value="delivered">Delivered</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="mt-4 flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Showing {order?.length || 0} orders
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminOrder;
