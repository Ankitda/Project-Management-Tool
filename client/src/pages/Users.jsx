import { useState } from "react";
import Button from "../components/Button";
import { IoMdAdd } from "react-icons/io";
import { getInitials } from "../utils/utility";
import clsx from "clsx";
import AddUser from "../components/Users/AddUser";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser } from "../redux/slices/userSlice";
import ConfirmationDialog from "../components/Tasks/ConfirmationDialog";
import EditTask from "../components/Users/EditUser";

const Users = () => {

  const { users } = useSelector((state) => state.user)
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [userId, setUserId] = useState(null);
  const [userSelected, setUserSelected] = useState({});

  const deleteHandler = () => {
    const newUsers = users.filter((user) => user._id !== userId);
    dispatch(deleteUser(newUsers));
  };

  const deleteClick = (id) => {
    setUserId(id);
    setOpenDialog(true);
  };

  const editClick = (el) => {
    setUserSelected(el);
    setOpenEdit(true);
  };

  const TableHeader = () => (
    <thead className='border-b border-gray-300'>
      <tr className='text-black text-left'>
        <th className="py-4">Full Name</th>
        <th className="py-4">Title</th>
        <th className="py-4">Email</th>
        <th className="py-4">Role</th>
        <th className="py-4">Active</th>
      </tr>
    </thead>
  );

  const TableRow = ({ user }) => (
    <tr className='border-b border-gray-200 text-gray-600 hover:bg-gray-400/10'>
      <td className='p-2'>
        <div className='flex items-center gap-3'>
          <div className='w-9 h-9 rounded-full text-white flex items-center justify-center text-sm bg-blue-700'>
            <span className='text-xs md:text-sm text-center'>
              {getInitials(user.name)}
            </span>
          </div>
          {user.name}
        </div>
      </td>

      <td className='p-2'>{user.title}</td>
      <td className='p-2'>{user.email || "user.emal.com"}</td>
      <td className='p-2'>{user.role}</td>

      <td>
        <p
          className={clsx(
            "w-fit px-4 py-1 rounded-full",
            user?.isActive ? "bg-blue-200" : "bg-slate-200"
          )}
        >
          {user?.isActive ? "Active" : "Disabled"}
        </p>
      </td>

      <td className='p-2 flex gap-4 justify-end'>
        <Button
          className='text-blue-600 hover:text-blue-500 font-semibold sm:px-0'
          label='Edit'
          type='button'
          onClick={() => editClick(user)}
        />

        <Button
          className='text-red-700 hover:text-red-500 font-semibold sm:px-0'
          label='Delete'
          type='button'
          onClick={() => deleteClick(user?._id)}
        />
      </td>
    </tr>
  );

  return (
    <>
      <div className='w-full md:px-1 px-0 mb-6'>
        <div className='flex items-center justify-between mb-8'>
          <h2 className="text-2xl font-semibold capitalize">
            Team Members
          </h2>
          <Button
            label='Add New User'
            icon={<IoMdAdd className='text-lg' />}
            className='flex flex-row-reverse gap-1 items-center bg-blue-600 text-white rounded-md 2xl:py-2.5'
            onClick={() => setOpen(true)}
          />
        </div>

        <div className='bg-white px-2 md:px-4 shadow-md rounded'>
          <div className='overflow-x-auto'>
            <table className='w-full'>
              <TableHeader />
              <tbody>
                {users?.map((user, index) => (
                  <TableRow key={index} user={user} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <AddUser
        open={open}
        setOpen={setOpen}
      />

      <ConfirmationDialog
        open={openDialog}
        setOpen={setOpenDialog}
        onClick={deleteHandler}
      />

      <EditTask
        open={openEdit}
        setOpen={setOpenEdit}
        defaultValues={userSelected}
      />

    </>
  );
};

export default Users;