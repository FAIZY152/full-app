import { Outlet } from "react-router-dom";
import Navbar from "../pages/Navbar";
import Footer from "./Footer";
import Whattsapp from "../pages/utils/Whatsapp";

const MainLayput = () => {
  return (
    <div className="min-h-screen flex flex-col w-full dark:bg-gray-800 dark:border-gray-700 border-gray-200  dark:text-gray-100">
      <header>
        <Navbar />
      </header>
      <div className="flex-1">
        <Outlet />
        <Whattsapp />
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default MainLayput;
