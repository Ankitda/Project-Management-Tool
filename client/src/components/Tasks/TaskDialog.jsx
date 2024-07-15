import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { AiTwotoneFolderOpen } from "react-icons/ai";
import { BsThreeDots } from "react-icons/bs";
import { HiDuplicate } from "react-icons/hi";
import { MdAdd, MdOutlineEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";

import { useNavigate } from "react-router-dom"



const TaskDialog = ({task}) => {
    
    const navigate = useNavigate();
    
    const items = [
        {
            label: "Open Task",
            icon: <AiTwotoneFolderOpen className='mr-2 h-5 w-5' aria-hidden='true' />,
            onClick: () => navigate(`/task/${task._id}`),
        },
        {
            label: "Edit",
            icon: <MdOutlineEdit className='mr-2 h-5 w-5' aria-hidden='true' />,
            onClick: () => setOpenEdit(true),
        }
    ];

    return (
        <Menu as="div" className="relative inline-block text-left">

            <MenuButton className="inline-flex w-full justify-center rounded-md px-4 py-2 text-sm font-medium text-gray-600 ">
                <BsThreeDots />
            </MenuButton>

            <MenuItems className='absolute p-4 right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none'>
                <div className='px-1 py-1 space-y-2'>
                    {items.map((el) => (
                        <MenuItem key={el.label}>
                            <button
                                onClick={el?.onClick}
                                className={`text-gray-900 group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                            >
                                {el.icon}
                                {el.label}
                            </button>
                        </MenuItem>
                    ))}
                </div>

                <div className='px-1 py-1'>
                    <MenuItem>
                        <button
                            onClick={() => deleteClicks()}
                            className={`text-red-900 group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                        >
                            <RiDeleteBin6Line
                                className='mr-2 h-5 w-5 text-red-400'
                                aria-hidden='true'
                            />
                            Delete
                        </button>
                    </MenuItem>
                </div>
            </MenuItems>

        </Menu>
    )
}

export default TaskDialog