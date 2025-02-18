import { Button } from "@/components/ui/button";
import {
  HandPlatter,
  Loader2,
  MenuIcon,
  Moon,
  PackageCheck,
  ShoppingCart,
  SquareMenu,
  Sun,
  User,
  UtensilsCrossed,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link } from "react-router-dom";

// Mobile sheet
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserStore } from "@/store/UserStroe";
import UseCartStore from "@/store/UseCartStore";
import { useThemeStore } from "@/store/UseThemeStore";
import useResturent from "@/store/UseResturent";
import { useEffect } from "react";

const Navbar = () => {
  const { isAuthentiacte, user, loading, logout, isAdmin } = UserStore();
  const { cart } = UseCartStore();
  const { setTheme } = useThemeStore();
  const { resturent, getResturent } = useResturent();

  useEffect(() => {
    if (isAdmin) {
      getResturent();
    }
  }, [isAdmin, getResturent]);

  const handelLogout = async () => {
    await logout();
  };
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white dark:bg-gray-800 dark:border-gray-700 border-gray-200  dark:text-gray-100">
      <div className="container flex h-16 items-center px-4">
        <div className="flex items-center space-x-4">
          <Link
            to={"/"}
            className="flex items-center space-x-1 md:space-x-2 md:pl-10 pl-1">
            <div className="rounded-full">
              <img
                src="./images/logo.jpg"
                alt="logo"
                className="md:h-7 md:w-7  w-5 h-5 "
              />
            </div>
            <span className="lg:text-xl text-lg font-bold text-pink-500">
              foodpanda
            </span>
          </Link>
        </div>
        <div className="ml-auto flex items-center md:space-x-2 space-x-2 ">
          {isAuthentiacte ? (
            <div className="hidden md:flex md:justify-start md:items-center md:gap-9 md:mx-2">
              <Link
                to={"/"}
                className="cursor-pointer text-ms py-2 font-semibold border-b hover:border-pink-500 duration-200 ">
                Home
              </Link>
              <Link
                to={"/profile"}
                className="cursor-pointer text-ms py-2 font-semibold border-b hover:border-pink-500 duration-200 ">
                Profile
              </Link>
              <Link
                to={`${isAdmin ? "/admin/order" : "/order-status"}`}
                className="cursor-pointer text-ms py-2 font-semibold border-b hover:border-pink-500 duration-200 ">
                Orders
              </Link>
              {isAdmin && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button
                      className="text-black mt-2 bg-white border border-gray-300
            focus:outline-none focus:ring-4 focus:ring-pink-300 md:font-medium font-normal
             rounded-xl md:text-sm text-[10px] md:px-5 px-3 md:py-2.5 py-2 text-center me-2 mb-2 dark:bg-pink-600
              dark:hover:bg-pink-700 dark:focus:ring-pink-800">
                      Dashboard
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <Link to={"/admin/add-resturents"}>
                      <DropdownMenuItem className="py-2 hover:bg-gray-200 cursor-pointer">
                        Resturents
                      </DropdownMenuItem>
                    </Link>
                    {resturent && (
                      <>
                        <Link to={"/admin/add-menu"}>
                          <DropdownMenuItem className="py-2 hover:bg-gray-200 cursor-pointer">
                            Menu
                          </DropdownMenuItem>
                        </Link>
                        <Link to={"/admin/order"}>
                          <DropdownMenuItem className="py-2 hover:bg-gray-200 cursor-pointer">
                            Orders
                          </DropdownMenuItem>
                        </Link>
                      </>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>
          ) : (
            <div className="flex justify-start items-center gap-3 mt-2">
              <Link to={"/auth"}>
                <button
                  type="button"
                  className="text-black border border-gray-300
            focus:outline-none focus:ring-4 focus:ring-pink-300 md:font-medium font-normal
             rounded-xl md:text-sm text-[10px] md:px-5 px-1.5 md:py-2.5 py-1.5 text-center me-2 mb-2 dark:bg-gray-900 dark:text-white
              dark:hover:bg-pink-700 dark:focus:ring-pink-800">
                  Log in
                </button>
              </Link>
              <Link to={"/auth"}>
                <button
                  type="button"
                  className="text-white bg-pink-600 hover:bg-pink-600 
                    focus:outline-none focus:ring-4 focus:ring-pink-300 md:font-medium font-normal
                  rounded-xl md:text-sm text-[10px] md:px-5 px-1.5 md:py-2.5 py-1.5 text-center me-2 mb-2 dark:bg-pink-600
              dark:hover:bg-pink-700 dark:focus:ring-pink-800">
                  Sign up
                </button>
              </Link>
            </div>
          )}

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                size="icon"
                className="relative border border-gray-200 hover:border-gray-300 p-2 rounded-full shadow-md transition-transform transform hover:scale-105">
                <Sun className="h-6 w-6 text-gray-700 dark:text-gray-300" />
                <Moon className="h-6 w-6 text-gray-700 dark:text-gray-300 hidden" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setTheme("light")}>
                Light
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("dark")}>
                Dark
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Link to={"/cart-page"}>
            <Button
              size="icon"
              className="relative border border-gray-200 hover:border-gray-300 p-2 rounded-full shadow-md transition-transform transform hover:scale-105">
              <ShoppingCart className="h-6 w-6 text-gray-700 dark:text-gray-300" />
              {cart.length > 0 && (
                <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs">
                  {cart.length}
                </span>
              )}
            </Button>
          </Link>
          {isAuthentiacte && (
            <Link to={"/profile"}>
              <Avatar>
                <AvatarImage src={user?.profilePicture} />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </Link>
          )}

          {/* Mobile Responcsive */}
          <div className="md:hidden sm:visible">
            <MobileNav />
          </div>
        </div>

        {isAuthentiacte && (
          <div className="hidden md:flex md:justify-end md:items-center gap-3 md:mt-2 md:mx-8">
            {loading ? (
              <button className="bg-[#FF2B85] flex items-center justify-center text-white font-bold py-2 px-4 w-full rounded hover:bg-[#ff88ba]">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />{" "}
                <span>Please Wait</span>
              </button>
            ) : (
              <button
                onClick={handelLogout}
                type="button"
                className="text-white bg-pink-600 hover:bg-pink-600 
                focus:outline-none focus:ring-4 focus:ring-pink-300 md:font-medium font-normal
                 rounded-xl md:text-sm text-[10px] md:px-5 px-3 md:py-2.5 py-2 text-center me-2 mb-2 dark:bg-pink-600
                  dark:hover:bg-pink-700 dark:focus:ring-pink-800">
                Log out
              </button>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export const MobileNav = () => {
  const { isAuthentiacte, user, loading, logout, isAdmin } = UserStore();
  const { resturent, getResturent } = useResturent();

  useEffect(() => {
    if (isAdmin) {
      getResturent();
    }
  }, [isAdmin, getResturent]);

  const handelLogout = async () => {
    await logout();
  };
  return (
    <Sheet>
      <SheetTrigger asChild>
        {isAuthentiacte && (
          <Button size="icon">
            <MenuIcon className="h-8 w-8 rotate-0 border border-gray-200 hover:border-gray-300 scale-100 rounded-sm" />
          </Button>
        )}
      </SheetTrigger>
      <SheetContent>
        <SheetHeader className="flex justify-between items-center mx-2">
          <SheetTitle className="text-2xl  font-bold  text-center">
            Food Panda
          </SheetTitle>
          <h1 className="text-sm my-2 font-normal text-center">
            Welcome To Our App
          </h1>
          <Separator className="my-5" />
        </SheetHeader>
        <SheetDescription className="flex-1">
          <Link to={"/profile"}>
            <div className="flex items-center gap-6 cursor-pointer p-2 text-gray-900 hover:bg-gray-300 hover:rounded-md duration-100">
              <User />
              <p>Proflie</p>
            </div>
          </Link>
          <Link
            to={"/order-status"}
            className="flex items-center gap-6 cursor-pointer p-2 text-gray-900 hover:bg-gray-300 hover:rounded-md duration-100">
            <HandPlatter />
            <p>Orders</p>
          </Link>
          {isAdmin && (
            <>
              {resturent && (
                <>
                  <Link to={"/admin/add-menu"}>
                    <div className="flex items-center gap-6 cursor-pointer p-2 text-gray-900 hover:bg-gray-300 hover:rounded-md duration-100">
                      <SquareMenu />
                      <p>Menu</p>
                    </div>
                  </Link>
                  <Link to={"/admin/order"}>
                    <div className="flex items-center gap-6 cursor-pointer p-2 text-gray-900 hover:bg-gray-300 hover:rounded-md duration-100">
                      <PackageCheck />
                      <p>Resturents Orders</p>
                    </div>
                  </Link>
                </>
              )}
              <Link to={"/admin/add-resturents"}>
                <div className="flex items-center gap-6 cursor-pointer p-2 text-gray-900 hover:bg-gray-300 hover:rounded-md duration-100">
                  <UtensilsCrossed />
                  <p>Resturents</p>
                </div>
              </Link>
            </>
          )}
        </SheetDescription>

        <SheetFooter>
          <SheetClose asChild>
            <div className="absolute bottom-1 right-1">
              <div className="flex justify-start items-center gap-3 ">
                <Avatar>
                  <AvatarImage src={user?.profilePicture} />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <h1 className="font-bold text-xl ">Muhammad Fayaz</h1>
              </div>
              <div className="w-full">
                {loading ? (
                  <button className="bg-[#FF2B85] flex items-center justify-center text-white font-bold py-2 px-4 w-full rounded hover:bg-[#ff88ba]">
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />{" "}
                    <span>Please Wait</span>
                  </button>
                ) : (
                  <Button
                    onClick={handelLogout}
                    className="w-full px-3  py-3 bg-pink-500 text-white font-semibold hover:bg-pink-400"
                    type="submit">
                    Log out
                  </Button>
                )}
              </div>
            </div>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
export default Navbar;
