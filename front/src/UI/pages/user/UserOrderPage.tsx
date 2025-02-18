import { Pizza } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

import { useEffect } from "react";
import { UserStore } from "@/store/UserStroe";
import UseOrderStore from "@/store/UseOrder";
import { Badge } from "@/components/ui/badge";

// This would come from your API/database in a real application

const UserOrderPage = () => {
  // load order of user on home
  const { SingleOrder, loading, order } = UseOrderStore();
  const { user } = UserStore();
  useEffect(() => {
    if (user?._id) {
      SingleOrder(user._id);
    }
  }, [user?._id]);

  if (loading) {
    return (
      <div className="flex min-h-[400px] flex-col items-center justify-center p-4">
        <Pizza className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
        <h2 className="mb-2 text-lg font-semibold">Loading Orders...</h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full">
      {!order || order?.length === 0 ? (
        <div className="flex min-h-[400px] flex-col items-center justify-center p-4">
          <div className="rounded-lg border border-dashed p-8 text-center">
            <Pizza className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
            <h2 className="mb-2 text-lg font-semibold">Orders Not Found</h2>
            <p className="text-sm text-muted-foreground">
              You haven't placed any orders yet.
            </p>
          </div>
        </div>
      ) : (
        <div className="w-full flex md:justify-between items-center flex-col p-4 ">
          {order?.map((oder: any) => {
            return (
              <Card className="w-full max-w-3xl mx-auto">
                <CardHeader className="space-y-1">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-2xl">Order Details</CardTitle>
                    <Badge
                      className={
                        oder?.status === "pending"
                          ? "bg-yellow-500 text-white rounded font-semibold"
                          : "bg-green-500 text-white rounded font-semibold"
                      }>
                      {oder?.status}
                    </Badge>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    <p>
                      {oder?.resturent?.resturentName} - {oder?.resturent?.city}
                    </p>
                  </div>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[200px] pr-4">
                    <div className="space-y-4">
                      {oder?.cartItems?.map((item: any) => (
                        <div
                          key={item._id}
                          className="flex items-center space-x-4 border-b pb-4">
                          <div className="relative h-24 w-24 overflow-hidden rounded-md">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="object-cover"
                            />
                          </div>
                          <div className="flex-1 space-y-1">
                            <h3 className="font-medium">{item?.name}</h3>
                            <div className="text-sm text-muted-foreground">
                              Quantity: {item?.quantity || "1"}
                            </div>
                          </div>
                        </div>
                      ))}
                      <div className="mt-6 flex justify-between items-center border-t pt-4">
                        <span className="text-lg font-medium">
                          Total Amount
                        </span>
                        <span className="text-lg font-bold">
                          Rs. {oder?.totalPrice.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
};
export default UserOrderPage;
