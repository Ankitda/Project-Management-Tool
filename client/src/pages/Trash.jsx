import { useState } from "react";
import clsx from "clsx";
import {
  MdDelete,
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
  MdKeyboardDoubleArrowUp,
  MdOutlineRestore,
} from "react-icons/md";
import { tasks } from "../assets/data";
import Button from "../components/Button";
import { PRIOTITYSTYELS, TASK_TYPE } from "../utils/utility";
import ConfirmationDialog from "../components/Tasks/ConfirmationDialog";
import { useDispatch, useSelector } from "react-redux";
import { deleteTrashTasks, deleteAllTasks } from "../redux/slices/trashSlice";
import { addTask } from "../redux/slices/taskSlice";
// import AddUser from "../components/AddUser";
// import ConfirmatioDialog from "../components/Dialogs";

const ICONS = {
  high: <MdKeyboardDoubleArrowUp />,
  medium: <MdKeyboardArrowUp />,
  low: <MdKeyboardArrowDown />,
};

const Trash = () => {

  const { trashedTasks } = useSelector((state) => state.trash);
  const dispatch = useDispatch();
  const [openDialog, setOpenDialog] = useState(false);
  const [trashTaskId, setTrashTaskId] = useState("");

  const deleteAllClick = () => {
    dispatch(deleteAllTasks())
  };

  const restoreAll = () => {
    dispatch(addTask(trashedTasks))
    deleteAllClick();
  };

  const handleDelete = () => {
    const newTrashedTasks = trashedTasks.filter((task) => task._id !== trashTaskId);
    dispatch(deleteTrashTasks(newTrashedTasks));
  }

  const deleteTasks = (tasksId) => {
    setTrashTaskId(tasksId);
    setOpenDialog(true);
  }

  const restoreClick = (id) => {
    const restoreTask = trashedTasks.filter((task) => task._id === id);
    const newTrashedTasks = trashedTasks.filter((task) => task._id !== id);
    dispatch(addTask(restoreTask[0]));
    dispatch(deleteTrashTasks(newTrashedTasks));
  };

  const TableHeader = () => (
    <thead className='border-b border-gray-300'>
      <tr className='text-black  text-left'>
        <th className='py-2'>Task Title</th>
        <th className='py-2'>Priority</th>
        <th className='py-2'>Stage</th>
        <th className='py-2 line-clamp-1'>Modified On</th>
      </tr>
    </thead>
  );

  const TableRow = ({ item }) => (
    <tr className='border-b border-gray-200 text-gray-600 hover:bg-gray-400/10'>
      <td className='py-2'>
        <div className='flex items-center gap-2'>
          <div
            className={clsx("w-4 h-4 rounded-full", TASK_TYPE[item.stage])}
          />
          <p className='w-full line-clamp-2 text-base text-black'>
            {item?.title}
          </p>
        </div>
      </td>

      <td className='py-2 capitalize'>
        <div className={"flex gap-1 items-center"}>
          <span className={clsx("text-lg", PRIOTITYSTYELS[item?.priority])}>
            {ICONS[item?.priority]}
          </span>
          <span className=''>{item?.priority}</span>
        </div>
      </td>

      <td className='py-2 capitalize text-center md:text-start'>
        {item?.stage}
      </td>
      <td className='py-2 text-sm'>{new Date(item?.date).toDateString()}</td>

      <td className='py-2 flex gap-1 justify-end'>
        <Button
          icon={<MdOutlineRestore className='text-xl text-gray-500' />}
          onClick={() => restoreClick(item._id)}
        />
        <Button
          icon={<MdDelete className='text-xl text-red-600' />}
          onClick={() => deleteTasks(item._id)}
        />
      </td>
    </tr>
  );

  return (
    <>
      <div className='w-full md:px-1 px-0 mb-6'>
        <div className='flex items-center justify-between mb-8'>
          <h2 className="text-2xl font-semibold capitalize">
            Trashed Tasks
          </h2>

          <div className='flex gap-2 md:gap-4 items-center'>
            {
              trashedTasks?.length > 0 &&
              <>
                <Button
                  label='Restore All'
                  icon={<MdOutlineRestore className='text-lg hidden md:flex' />}
                  className='flex flex-row-reverse gap-1 items-center  text-black text-sm md:text-base rounded-md 2xl:py-2.5'
                  onClick={() => restoreAll()}
                />
                <Button
                  label='Delete All'
                  icon={<MdDelete className='text-lg hidden md:flex' />}
                  className='flex flex-row-reverse gap-1 items-center  text-red-600 text-sm md:text-base rounded-md 2xl:py-2.5'
                  onClick={deleteAllClick}
                />

              </>
            }
          </div>
        </div>

        {
          trashedTasks?.length === 0 ?
            (<div className="text-center text-gray-500">No trashed tasks found</div>)
            :
            (<div className='bg-white px-2 md:px-6 py-4 shadow-md rounded'>
              <div className='overflow-x-auto'>
                <table className='w-full'>
                  <TableHeader />
                  <tbody>
                    {trashedTasks?.map((tk, id) => (
                      <TableRow key={id} item={tk} />
                    ))}
                  </tbody>
                </table>
              </div>
            </div>)
        }

      </div>

      {/* <AddUser open={open} setOpen={setOpen} /> */}

      <ConfirmationDialog open={openDialog} setOpen={setOpenDialog} onClick={handleDelete} />
    </>
  );
};

export default Trash;