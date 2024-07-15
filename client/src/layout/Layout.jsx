import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import MobileSidebar from "./MobileSidebar";

const Layout = () => {

    const { user } = useSelector((state) => state.auth);

    const location = useLocation();

    return user ? (
        <div className='relative w-full md:h-screen flex flex-col md:flex-row'>
            <div className='w-1/5 h-screen bg-white sticky top-0 hidden md:block'>
                <Sidebar />
            </div>

            <MobileSidebar />

            <div className='flex-shrink-0 md:flex-auto overflow-y-auto'>
                <Navbar />

                <div className='p-4 2xl:px-10'>
                    <Outlet />
                </div>
            </div>
        </div>
    ) : (
        <Navigate to='/log-in' state={{ from: location }} replace />
    );
}

export default Layout;