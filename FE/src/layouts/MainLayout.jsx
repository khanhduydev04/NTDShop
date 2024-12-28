import { Outlet } from "react-router-dom";
import { Header } from "../components/client/header";
import { Footer } from "../components/client/footer";

export const MainLayout = () => {
    return (
        <div>
            <Header />
            <main className="flex-1 bg-[#F8F9FD]">
                <div className="w-full max-w-[1200px] mx-auto py-10 px-4 lg:px-0">
                    <Outlet />
                </div>
            </main>
            <Footer />
        </div>
    );
};