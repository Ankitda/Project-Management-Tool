import React, { useRef } from "react";
import { MdOutlineSearch } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { setOpenSidebar } from "../redux/slices/authSlice";
import UserAvatar from "./UserAvatar";
import NotificationPanel from "./NotificationPanel";
import { useNavigate } from "react-router-dom";

// dummy data for notification 

const data = [
    {
        _id: "65c5bbf3787832cf99f28e6d",
        team: [
            "65c202d4aa62f32ffd1303cc",
            "65c27a0e18c0a1b750ad5cad",
            "65c30b96e639681a13def0b5",
        ],
        text: "New task has been assigned to you and 2 others. The task priority is set a normal priority, so check and act accordingly. The task date is Thu Feb 29 2024. Thank you!!!",
        task: null,
        notiType: "alert",
        isRead: [],
        createdAt: "2024-02-09T05:45:23.353Z",
        updatedAt: "2024-02-09T05:45:23.353Z",
        __v: 0,
    },
    {
        _id: "65c5f12ab5204a81bde866ab",
        team: [
            "65c202d4aa62f32ffd1303cc",
            "65c30b96e639681a13def0b5",
            "65c317360fd860f958baa08e",
        ],
        text: "New task has been assigned to you and 2 others. The task priority is set a high priority, so check and act accordingly. The task date is Fri Feb 09 2024. Thank you!!!",
        task: {
            _id: "65c5f12ab5204a81bde866a9",
            title: "Test task",
        },
        notiType: "alert",
        isRead: [],
        createdAt: "2024-02-09T09:32:26.810Z",
        updatedAt: "2024-02-09T09:32:26.810Z",
        __v: 0,
    },
];

const Navbar = () => {

    const inputRef = useRef();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        const validation = /^[a-zA-Z\s\-]+$/;
        e.preventDefault();
        if(inputRef.current?.value && validation.test(inputRef.current.value)) {
            navigate(`/search/${inputRef.current?.value}`);
        }
    };

    return (
        <div className='w-full flex justify-between items-center bg-white px-4 py-3 2xl:py-4 sticky z-10 top-0'>
            <div className='flex gap-4'>
                <button
                    onClick={() => dispatch(setOpenSidebar(true))}
                    className='text-2xl text-gray-500 block md:hidden'
                >
                    ☰
                </button>

                <form onSubmit={(e) => handleSubmit(e)}>
                    <div className='w-64 2xl:w-[400px] flex items-center py-2 px-3 gap-2 rounded-full bg-[#f3f4f6]'>
                        <MdOutlineSearch className='text-gray-500 text-xl' />

                        <input
                            type='text'
                            ref={inputRef}
                            placeholder='Search Task....'
                            className='flex-1 outline-none bg-transparent placeholder:text-gray-500 text-gray-800'
                        />
                    </div>
                </form>
            </div>

            <div className='flex gap-2 items-center'>
                <NotificationPanel data={data} />

                <UserAvatar />
            </div>
        </div>
    );
};

export default Navbar;