import { MdAdminPanelSettings } from "react-icons/md";
import { LuClipboardEdit } from "react-icons/lu";
import { FaNewspaper } from "react-icons/fa";
import { FaArrowsToDot } from "react-icons/fa6";
import clsx from "clsx";
import { Chart } from "../components/Chart";
import { useSelector } from "react-redux";
import TaskTable from "../components/Dashboard/TaskTable";
import UserTable from "../components/Dashboard/UserTable";

const Dashboard = () => {
  
  const { tasks } = useSelector((state) => state.task);
  const { users } = useSelector((state) => state.user);

  const completedTask = () => {
    const completed = tasks.filter((task) => task.stage === "completed");
    return completed.length;
  }
  const inProgress = () => {
    const progressed = tasks.filter((task) => task.stage === "in progress");
    return progressed.length;
  }
  const todo = () => {
    const pending = tasks.filter((task) => task.stage === "todo");
    return pending.length;
  }

  const stats = [
    {
      _id: "1",
      label: "TOTAL TASK",
      total: tasks.length || 0,
      icon: <FaNewspaper />,
      bg: "bg-[#1d4ed8]",
    },
    {
      _id: "2",
      label: "COMPLTED TASK",
      total: completedTask() || 0,
      icon: <MdAdminPanelSettings />,
      bg: "bg-[#0f766e]",
    },
    {
      _id: "3",
      label: "TASK IN PROGRESS ",
      total: inProgress() || 0,
      icon: <LuClipboardEdit />,
      bg: "bg-[#f59e0b]",
    },
    {
      _id: "4",
      label: "TODOS",
      total: todo() || 0,
      icon: <FaArrowsToDot />,
      bg: "bg-[#be185d]" || 0,
    },
  ];

  const Card = ({ label, count, bg, icon }) => {
    return (
      <div className='w-full h-32 bg-white p-5 shadow-md rounded-md flex items-center justify-between'>
        <div className='h-full flex flex-1 flex-col justify-between'>
          <p className='text-base text-gray-600'>{label}</p>
          <span className='text-2xl font-semibold'>{count}</span>
          <span className='text-sm text-gray-400'>{"110 last month"}</span>
        </div>

        <div
          className={clsx(
            "w-10 h-10 rounded-full flex items-center justify-center text-white",
            bg
          )}
        >
          {icon}
        </div>
      </div>
    );
  };

  return (
    <div className='h-full py-4'>
      <div className='grid grid-cols-1 md:grid-cols-4 gap-5'>
        {stats.map(({ icon, bg, label, total }, index) => (
          <Card key={index} icon={icon} bg={bg} label={label} count={total} />
        ))}
      </div>

      <div className='w-full bg-white my-16 p-4 rounded shadow-sm'>
        <h4 className='text-xl text-gray-600 font-semibold'>
          Chart by Priority
        </h4>
        <Chart />
      </div>

      <div className='w-full flex flex-col md:flex-row gap-4 2xl:gap-10 py-8'>
        {/* /left */}

        <TaskTable tasks={tasks} />

        {/* /right */}

        <UserTable users={users} />
      </div>
    </div>
  );
};

export default Dashboard;