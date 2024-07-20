import { useForm } from "react-hook-form";
// import ModalWrapper from "../ModalWrapper";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import Textbox from "../TextBox";
import Button from "../Button";
import { useDispatch, useSelector } from "react-redux";
import { addSubTasks, setRefresh } from "../../redux/slices/taskSlice";

const AddSubTask = ({ open, setOpen, id}) => {

    const {tasks, refresh} = useSelector((state) => state.task);
    const dispatch = useDispatch();
    const { register, handleSubmit, formState: { errors } } = useForm();

    // const [addSbTask] = useCreateSubTaskMutation();

    const handleOnSubmit = async (data) => {
        // try {
        //   const res = await addSbTask({ data, id }).unwrap();
        //   toast.success(res.message);
        //   setTimeout(() => {
        //     setOpen(false);
        //   }, 500);
        // } catch (err) {
        //   console.log(err);
        //   toast.error(err?.data?.message || err.error);
        // }

        const index = tasks.findIndex((task) => task._id === id);

        let newSubTask = {
            _id: Date.now(),
            title: data?.title,
            date: data?.date,
            tag : data?.tag
        }

        // console.log(index);

        dispatch(addSubTasks({ data: newSubTask, index }));
        dispatch(setRefresh(!refresh));
        setOpen(false);
    };

    const close = () => {
        setOpen(false);
    }

    return (

        <Dialog open={open} as="div" className="w-full fixed inset-0 flex items-center justify-center z-50" onClose={close}>
            <div className="absolute inset-0 bg-black opacity-50"></div>
            <div className='fixed inset-0 z-10 w-screen overflow-y-auto'>
                <div className='flex h-full items-center justify-center p-4 text-center sm:p-0'>
                    <DialogPanel

                        className='w-full relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all pb-0 sm:my-8 sm:w-full sm:max-w-lg'
                    >
                        <div className='bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4'>
                            <div className='sm:flex sm:items-start'>
                                <div className='w-full mt-3  sm:ml-4 sm:mt-0 sm:text-left'>

                                    <form onSubmit={handleSubmit(handleOnSubmit)}>
                                        <DialogTitle
                                            as='h2'
                                            className='text-base font-bold leading-6 text-gray-900 mb-4'
                                        >
                                            ADD SUB-TASK
                                        </DialogTitle>
                                        <div className='mt-2 flex flex-col gap-6'>
                                            <Textbox
                                                placeholder='Sub-Task title'
                                                type='text'
                                                name='title'
                                                label='Title'
                                                className='w-full rounded'
                                                register={register("title", {
                                                    required: "Title is required!",
                                                })}
                                                error={errors.title ? errors.title.message : ""}
                                            />

                                            <div className='flex items-center gap-4'>
                                                <Textbox
                                                    placeholder='Date'
                                                    type='date'
                                                    name='date'
                                                    label='Task Date'
                                                    className='w-full rounded'
                                                    register={register("date", {
                                                        required: "Date is required!",
                                                    })}
                                                    error={errors.date ? errors.date.message : ""}
                                                />
                                                <Textbox
                                                    placeholder='Tag'
                                                    type='text'
                                                    name='tag'
                                                    label='Tag'
                                                    className='w-full rounded'
                                                    register={register("tag", {
                                                        required: "Tag is required!",
                                                    })}
                                                    error={errors.tag ? errors.tag.message : ""}
                                                />
                                            </div>
                                        </div>
                                        <div className='py-3 mt-4 flex sm:flex-row-reverse gap-4'>
                                            <Button
                                                type='submit'
                                                className='bg-blue-600 text-sm font-semibold text-white hover:bg-blue-700 sm:ml-3 sm:w-auto'
                                                label='Add Task'
                                            />

                                            <Button
                                                type='button'
                                                className='bg-white border text-sm font-semibold text-gray-900 sm:w-auto'
                                                onClick={() => setOpen(false)}
                                                label='Cancel'
                                            />
                                        </div>
                                    </form>

                                </div>
                            </div>
                        </div>
                    </DialogPanel>
                </div>
            </div>
        </Dialog>


    );
};

export default AddSubTask;