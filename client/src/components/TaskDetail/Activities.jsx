import Button from "../Button";
import { useState } from "react";
import { FaBug, FaThumbsUp, FaUser } from "react-icons/fa";
import { GrInProgress } from "react-icons/gr";
import { MdOutlineDoneAll, MdOutlineMessage } from "react-icons/md";
import moment from "moment";

const assets = [
    "https://images.pexels.com/photos/2418664/pexels-photo-2418664.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    "https://images.pexels.com/photos/8797307/pexels-photo-8797307.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    "https://images.pexels.com/photos/2534523/pexels-photo-2534523.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    "https://images.pexels.com/photos/804049/pexels-photo-804049.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
];

const TASKTYPEICON = {
    commented: (
        <div className='w-10 h-10 rounded-full bg-gray-500 flex items-center justify-center text-white'>
            <MdOutlineMessage />,
        </div>
    ),
    started: (
        <div className='w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white'>
            <FaThumbsUp size={20} />
        </div>
    ),
    assigned: (
        <div className='w-6 h-6 flex items-center justify-center rounded-full bg-gray-500 text-white'>
            <FaUser size={14} />
        </div>
    ),
    bug: (
        <div className='text-red-600'>
            <FaBug size={24} />
        </div>
    ),
    completed: (
        <div className='w-10 h-10 rounded-full bg-green-600 flex items-center justify-center text-white'>
            <MdOutlineDoneAll size={24} />
        </div>
    ),
    "in progress": (
        <div className='w-8 h-8 flex items-center justify-center rounded-full bg-violet-600 text-white'>
            <GrInProgress size={16} />
        </div>
    ),
};

const act_types = [
    "Started",
    "Completed",
    "In Progress",
    "Commented",
    "Bug",
    "Assigned",
];

const Activities = ({ activity }) => {

    const [selected, setSelected] = useState(act_types[0]);
    const [text, setText] = useState("");

    const handleSubmit = async () => { };

    const Card = ({ item }) => {
        return (
            <div className='flex space-x-4'>
                <div className='flex flex-col items-center flex-shrink-0'>
                    <div className='w-10 h-10 flex items-center justify-center'>
                        {TASKTYPEICON[item?.type]}
                    </div>
                    {item?.type !== "completed" && <div className='w-0.5 h-full'>
                        <div className='w-full bg-slate-300 h-full'></div>
                    </div>}
                </div>

                <div className='flex flex-col gap-y-1 mb-8'>
                    <p className='font-semibold'>{item?.by?.name}</p>
                    <div className='text-gray-500 space-y-2'>
                        <span className='capitalize'>{item?.type} </span>
                        <span className='text-sm'>{moment(item?.date).fromNow()}</span>
                    </div>
                    <div className='text-gray-700'>{item?.activity}</div>
                </div>
            </div>
        );
    };

    return (
        <div className='w-full flex gap-10 2xl:gap-20 min-h-screen px-10 py-8 bg-white shadow rounded-md justify-between overflow-y-auto'>
            <div className='w-full md:w-1/2'>
                <h4 className='text-gray-600 font-semibold text-lg mb-5'>Activities</h4>

                <div className='w-full'>
                    {activity?.map((el, index) => (
                        <Card
                            key={index}
                            item={el}
                            isConnected={index < activity.length - 1}
                        />
                    ))}
                </div>
            </div>

            <div className='w-full md:w-1/3'>
                <h4 className='text-gray-600 font-semibold text-lg mb-5'>
                    Add Activity
                </h4>
                <div className='w-full flex flex-wrap gap-5'>
                    {act_types.map((item) => (
                        <div key={item} className='flex gap-2 items-center'>
                            <input
                                type='checkbox'
                                className='w-4 h-4'
                                value={item}
                                checked={selected === item ? true : false}
                                onChange={(e) => setSelected(item)}
                            />
                            <p>{item}</p>
                        </div>
                    ))}
                    <input type="date" className='bg-white w-full border border-gray-300 outline-none p-4 rounded-md focus:ring-2 ring-blue-500' />
                    <textarea
                        rows={10}
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder='Type ......'
                        className='bg-white w-full border border-gray-300 outline-none p-4 rounded-md focus:ring-2 ring-blue-500'
                    ></textarea>


                    <Button
                        type='button'
                        label='Submit'
                        onClick={handleSubmit}
                        className='bg-blue-600 text-white rounded'
                    />

                </div>
            </div>
        </div>
    );
};

export default Activities;