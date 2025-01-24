import { Outlet, useLocation } from "react-router-dom";
import { Header } from "../components/client/header";
import { Footer } from "../components/Client/footer";
import BottomMenu from "@/components/Client/BottomMenu";

export const MainLayout = () => {
  return (
    <div className="relative min-h-screen">
      <Header />
      <main className="text-black bg-white pt-[100px]">
        <Outlet />
      </main>
      <Footer />
      <BottomMenu></BottomMenu>
    </div>
  );
};
