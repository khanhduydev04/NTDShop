import { Outlet, useLocation } from "react-router-dom";
import { Header } from "../components/client/header";
import { Footer } from "../components/Client/footer";
import Banner from "@/components/Client/Banner";

export const MainLayout = () => {
    const location = useLocation();

    return (
        <div>
            <Header />
            <main className="flex-1 bg-[#F8F9FD] text-black">
                <div className="w-full max-w-[1200px] mx-auto">
                    {location.pathname === "/" && <Banner />}
                </div>
                <div className="w-full max-w-[1200px] mx-auto py-4 px-4 lg:px-0">
                    <Outlet />
                </div>
            </main>
            <Footer />
        </div>
    );
};