import { createBrowserRouter } from "react-router-dom"

import Layout from "../layout/Layout"

import Dashboard from "../pages/Dashboard"
import Tasks from "../pages/Tasks"
import Users from "../pages/Users"
import Trash from "../pages/Trash"
import TaskDetail from "../pages/TaskDetail"
import Login from "../pages/Login"


export const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
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
