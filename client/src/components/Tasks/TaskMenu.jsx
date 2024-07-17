import clsx from "clsx";
import { IoMdAdd } from "react-icons/io";
import { TASK_TYPE } from "../../utils/utility"; 

const TaskMenu = ({ label, className, param = "" }) => {
  return (
    <>
      {
        param === "" &&
        <div className='w-full h-10 md:h-12 px-2 md:px-4 rounded-full bg-white flex items-center justify-between'>
          <div className='flex gap-2 items-center'>
            <div className={clsx("w-4 h-4 rounded-full ", className)} />
            <p className='text-sm md:text-base text-gray-600'>{label}</p>
          </div>

          {/* <button className='hidden md:block'>
            <IoMdAdd className='text-lg text-black' />
            </button> */}
        </div>
      }

      {
        param === "completed" &&
        <div className='w-full h-10 md:h-12 px-2 md:px-4 rounded-full bg-white flex items-center justify-between'>
          <div className='flex gap-2 items-center'>
            <div className={clsx("w-4 h-4 rounded-full ", TASK_TYPE.completed)} />
            <p className='text-sm md:text-base text-gray-600'>completed</p>
          </div>
        </div>
      }

      {
        param === "todo" &&
        <div className='w-full h-10 md:h-12 px-2 md:px-4 rounded-full bg-white flex items-center justify-between'>
          <div className='flex gap-2 items-center'>
            <div className={clsx("w-4 h-4 rounded-full ", TASK_TYPE.todo)} />
            <p className='text-sm md:text-base text-gray-600'>To Do</p>
          </div>
        </div>
      }

      {
        param === "in progress" &&
        <div className='w-full h-10 md:h-12 px-2 md:px-4 rounded-full bg-white flex items-center justify-between'>
          <div className='flex gap-2 items-center'>
            <div className={clsx("w-4 h-4 rounded-full ", TASK_TYPE["in progress"])} />
            <p className='text-sm md:text-base text-gray-600'>In Progress</p>
          </div>
        </div>
      }

    </>
  );
};

export default TaskMenu;