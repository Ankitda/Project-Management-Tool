import { Transition } from '@headlessui/react';
import React, { Fragment, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setOpenSidebar } from '../redux/slices/authSlice';
import clsx from 'clsx';
import { IoClose } from 'react-icons/io5';
import Sidebar from '../components/Sidebar';

const MobileSidebar = () => {
    const { isSidebarOpen } = useSelector((state) => state.auth);
    const mobileMenuRef = useRef(null);
    const dispatch = useDispatch();

    const closeSidebar = () => {
        dispatch(setOpenSidebar(false));
    };

    return (
        <>
            <Transition
                show={isSidebarOpen}
                as={Fragment}
                enter='transition-opacity duration-700'
                enterFrom='opacity-x-10'
                enterTo='opacity-x-100'
                leave='transition-opacity duration-700'
                leaveFrom='opacity-x-100'
                leaveTo='opacity-x-0'
            >
                {(ref) => (
                    <div
                        ref={(node) => (mobileMenuRef.current = node)}
                        className={clsx(
                            "absolute md:hidden w-full h-screen bg-black/40 transition-all duration-700 transform z-50",
                            isSidebarOpen ? "translate-x-0" : "translate-x-full"
                        )}
                        onClick={() => closeSidebar()}
                    >
                        <div className='bg-white w-[80%] h-full'>

                            <div className='w-full flex justify-end px-5 py-10'>
                                <IoClose size={25} />
                            </div>

                            <div className='-mt-[92px]'>
                                <Sidebar />
                            </div>
                        </div>
                    </div>
                )}
            </Transition>
        </>
    );
}

export default MobileSidebar