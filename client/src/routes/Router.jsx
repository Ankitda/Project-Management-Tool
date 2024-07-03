import { Navigate, Outlet, createBrowserRouter, useLocation } from "react-router-dom"

import Dashboard from "../pages/Dashboard"
import Tasks from "../pages/Tasks"
import Users from "../pages/Users"
import Trash from "../pages/Trash"
import TaskDetail from "../pages/TaskDetail"
import Login from "../pages/Login"

import { useSelector } from "react-redux"


function Layout() {
    const user = ""

    const location = useLocation();

    return user ? (
        <div className='w-full h-screen flex flex-col md:flex-row'>
            <div className='w-1/5 h-screen bg-white sticky top-0 hidden md:block'>
                {/* <Sidebar /> */}
            </div>

            {/* <MobileSidebar /> */}

            <div className='flex-1 overflow-y-auto'>
                {/* <Navbar /> */}

                <div className='p-4 2xl:px-10'>
                    <Outlet />
                </div>
            </div>
        </div>
    ) : (
        <Navigate to='/log-in' state={{ from: location }} replace />
    );
}

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Dashboard />,
        children: [
            {
                path: "/dashboard",
                element: <Dashboard />,
            },
            {
                path: "/task",
                element: <Tasks />,
            },
            {
                path: '/completed/:status',
                element: <Tasks />,
            },
            {
                path: "/in-progress/:status",
                element: <Tasks />,
            },
            {
                path: "/todo/:status",
                element: <Tasks />,
            },
            {
                path: "/team",
                element: <Users />,
            },
            {
                path: "/trashed",
                element: <Trash />,
            },
            {
                path: "/task/:id",
                element: <TaskDetail />,
            },
        ]
    },
    {
        path: "/log-in",
        element: <Login />,
    }

])
