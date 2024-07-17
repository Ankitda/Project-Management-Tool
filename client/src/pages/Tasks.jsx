import { useEffect, useState } from "react";
import { FaList } from "react-icons/fa";
import { MdGridView } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";
import { TASK_TYPE } from "../utils/utility";
import Button from "../components/Button";
import Tabs from "../components/Tasks/Tabs";
import TaskMenu from "../components/Tasks/TaskMenu";
import TaskTable from "../components/Tasks/TaskTable";
import TaskCard from "../components/Tasks/TaskCard";
import AddTask from "../components/Tasks/AddTask";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const TABS = [
  { title: "Board View", icon: <MdGridView /> },
  { title: "List View", icon: <FaList /> },
];

const Tasks = () => {

  const params = useParams();
  const { tasks } = useSelector(state => state.task);
  const { user } = useSelector(state => state.auth);
  const [selected, setSelected] = useState(0);
  const [taskFiltered, setTaskFiltered] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (params?.status) {
      setTaskFiltered(
        tasks.filter((task) => task.stage === params?.status)
      );
    } else {
      setTaskFiltered(tasks);
    }
  }, [params?.status])

  return (
    <div className='w-full'>
      <div className='flex items-center justify-between mb-4'>
        <h2 className="text-2xl font-semibold capitalize">
          {params?.status ? `${params?.status} Tasks` : "Tasks"}
        </h2>

        {!params?.status && user?.isAdmin && (
          <Button
            onClick={() => setOpen(true)}
            label='Create Task'
            icon={<IoMdAdd className='text-lg' />}
            className='flex flex-row-reverse gap-1 items-center bg-blue-600 text-white rounded-md py-2 2xl:py-2.5'
          />
        )}
      </div>

      <Tabs tabs={TABS} setSelected={setSelected}>

        <div className='w-full flex justify-between gap-4 md:gap-x-12 py-4'>
          {params?.status === undefined ? (
            <>
              <TaskMenu label='To Do' className={TASK_TYPE.todo} />
              <TaskMenu label='In Progress' className={TASK_TYPE["in progress"]} />
              <TaskMenu label='completed' className={TASK_TYPE.completed} />
            </>

          ) : (
            <TaskMenu param={params?.status} />
          )}
        </div>


        {selected !== 1 ? (

          <div className='w-full py-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 2xl:gap-10'>
            {taskFiltered.map((task, index) => (
              <TaskCard task={task} key={index} />
            ))}
          </div>

        ) : (
          <div className='w-full'>
            <TaskTable tasks={taskFiltered} />
          </div>
        )}
      </Tabs>

      {open && <AddTask open={open} setOpen={setOpen} />}

    </div>
  )
}

export default Tasks;