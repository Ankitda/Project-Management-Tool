import Button from "../Button";
import { useEffect } from "react";
import { FaBug, FaThumbsUp, FaUser } from "react-icons/fa";
import { GrInProgress } from "react-icons/gr";
import { MdOutlineDoneAll, MdOutlineMessage } from "react-icons/md";
import moment from "moment";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { addActivities, addExistingActivities } from "../../redux/slices/taskSlice";

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

const Activities = ({ activity, taskId }) => {

    const { register, handleSubmit, formState: { errors } } = useForm();
    const { user } = useSelector((state) => state.auth);
    const { tasks, taskActivities } = useSelector((state) => state.task);
    const dispatch = useDispatch();

    const displayData = (data) => {

        let activites = {
            type: data?.checkboxInput.toLowerCase(),
            activity: data?.textareaInput,
            date: data?.dateInput,
            by: user._id,
            _id: Date.now()
        }
        const id = tasks.findIndex((task) => task._id === taskId);

        dispatch(addActivities({ data: activites, id: id }));
    }

    useEffect(() => {
        dispatch(addExistingActivities({ existingData: activity }));
    }, []);

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

                {
                    taskActivities?.length === 0 ? (
                        <p className='text-gray-500'>No Activities</p>
                    ) : (
                        taskActivities?.map((el, index) => (
                            <Card key={index} item={el} />
                        ))
                    )
                }
            </div>

            <div className='w-full md:w-1/3'>
                <h4 className='text-gray-600 font-semibold text-lg mb-5'>
                    Add Activity
                </h4>

                <form onSubmit={handleSubmit(displayData)}>

                    <div className='w-full flex flex-wrap gap-5'>
                        {act_types.map((item) => (
                            <div key={item} className='flex gap-2 items-center'>
                                <input
                                    type='radio'
                                    className='w-4 h-4'
                                    value={item}
                                    {...register('checkboxInput',{required:true})}
                                // checked={selected === item ? true : false}
                                // onChange={(e) => setSelected(item)}
                                />
                                <p>{item}</p>
                            </div>
                        ))}

                        <input
                            type="date"
                            className='bg-white w-full border border-gray-300 outline-none p-4 rounded-md focus:ring-2 ring-blue-500'
                            {...register("dateInput", { required: true })}
                        />

                        <textarea
                            rows={10}
                            {...register("textareaInput", { required: true })}
                            placeholder='Type ......'
                            className='bg-white w-full border border-gray-300 outline-none p-4 rounded-md focus:ring-2 ring-blue-500'
                        ></textarea>


                        <Button
                            type='submit'
                            label='Submit'
                            className='bg-blue-600 text-white rounded'
                        />

                    </div>
                </form>
            </div>
        </div >
    );
};

export default Activities;