import { useState } from "react";
import { FaList } from "react-icons/fa";
import { MdGridView } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";
import { useParams } from "react-router-dom";
// import Loading from "../components/Loader";

import { TASK_TYPE } from "../utils/utility";
import Button from "../components/Button";
import Tabs from "../components/Tasks/Tabs";
import TaskMenu from "../components/Tasks/TaskMenu";
import BoardView from "../components/Tasks/BoardView";
import Table from "../components/Tasks/Table";
import { tasks } from "../assets/data";
import TaskCard from "../components/Tasks/TaskCard";
// import Table from "../components/task/Table";
// import AddTask from "../components/task/AddTask";

const TABS = [
  { title: "Board View", icon: <MdGridView /> },
  { title: "List View", icon: <FaList /> },
];

const Tasks = () => {
  const params = useParams();

  const [selected, setSelected] = useState(0);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const status = params?.status || "";

  return loading ? (
    <div className='py-10'>
      {/* <Loading /> */}
      <div>
        Loading ....
      </div>
    </div>
  ) : (
    <div className='w-full'>
      <div className='flex items-center justify-between mb-4'>
        <h2 className="text-2xl font-semibold capitalize">
          {status ? `${status} Tasks` : "Tasks"}
        </h2>

        {!status && (
          <Button
            onClick={() => setOpen(true)}
            label='Create Task'
            icon={<IoMdAdd className='text-lg' />}
            className='flex flex-row-reverse gap-1 items-center bg-blue-600 text-white rounded-md py-2 2xl:py-2.5'
          />
        )}
      </div>

      <Tabs tabs={TABS} setSelected={setSelected}>
        {!status && (
          <div className='w-full flex justify-between gap-4 md:gap-x-12 py-4'>
            <TaskMenu label='To Do' className={TASK_TYPE.todo} />
            <TaskMenu label='In Progress' className={TASK_TYPE["in progress"]} />
            <TaskMenu label='completed' className={TASK_TYPE.completed} />
          </div>
        )}

        {selected !== 1 ? (

          <div className='w-full py-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 2xl:gap-10'>
            {tasks.map((task, index) => (
              <TaskCard task={task} key={index} />
            ))}
          </div>

        ) : (
          <div className='w-full'>
            <Table tasks={tasks} />
          </div>
        )}
      </Tabs>

    </div>
  )
}

export default Tasks;