import React, { useState } from "react";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import Textbox from "../TextBox";
import { useForm } from "react-hook-form";
import UserList from "./UserList";
import SelectedList from "./SelectedList";
import { BiImages } from "react-icons/bi";
import Button from "../Button";

const LISTS = ["TODO", "IN PROGRESS", "COMPLETED"];
const PRIORIRY = ["HIGH", "MEDIUM", "NORMAL", "LOW"];

const uploadedFileURLs = [];

const AddTask = ({ open, setOpen }) => {
    const task = "";

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const [team, setTeam] = useState([]);
    const [stage, setStage] = useState('');
    const [priority, setPriority] = useState(PRIORIRY[2]);
    const [assets, setAssets] = useState([]);
    const [uploading, setUploading] = useState(false);

    const submitHandler = () => { };

    const handleSelect = (e) => {
        setAssets(e.target.files);
        setUploading(true);
    };

    // console.log("assets", uploading);

    const close = () => {
        setOpen(false);
    };

    return (
        <>
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

                                        <form onSubmit={handleSubmit(submitHandler)}>
                                            <DialogTitle
                                                as='h2'
                                                className='text-base font-bold leading-6 text-gray-900 mb-4'
                                            >
                                                {task ? "UPDATE TASK" : "ADD TASK"}
                                            </DialogTitle>

                                            <div className='mt-2 flex flex-col gap-6'>
                                                <Textbox
                                                    placeholder='Task Title'
                                                    type='text'
                                                    name='title'
                                                    label='Task Title'
                                                    className='w-full rounded'
                                                    register={register("title", { required: "Title is required" })}
                                                    error={errors.title ? errors.title.message : ""}
                                                />

                                                <UserList setTeam={setTeam} />

                                                <div className='flex gap-4'>

                                                    <SelectedList
                                                        label='Task Stage'
                                                        lists={LISTS}
                                                        stageSelected={stage}
                                                        handleStageSelected={setStage}
                                                    />

                                                    <div className='w-full'>
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
                                                    </div>
                                                </div>

                                                <div className='flex gap-4'>

                                                    <SelectedList
                                                        label='Priority Level'
                                                        lists={PRIORIRY}
                                                        stageSelected={priority}
                                                        handleStageSelected={setPriority}
                                                    />

                                                    <div className='w-full flex items-center justify-center mt-4'>

                                                        {
                                                            uploading ? (
                                                                <span className='text-xl py-2 text-red-500'>
                                                                    Asset uploaded
                                                                </span>
                                                            ) : (

                                                                <label
                                                                    className='flex items-center gap-1 text-base text-ascent-2 hover:text-ascent-1 cursor-pointer my-4'
                                                                    htmlFor='imgUpload'
                                                                >
                                                                    <input
                                                                        type='file'
                                                                        className='hidden'
                                                                        id='imgUpload'
                                                                        onChange={(e) => handleSelect(e)}
                                                                        accept='.jpg, .png, .jpeg'
                                                                        multiple={true}
                                                                    />
                                                                    <BiImages />
                                                                    <span>Add Assets</span>
                                                                </label>

                                                            )
                                                        }
                                                    </div>
                                                </div>

                                                <div className='py-6 sm:flex sm:flex-row-reverse gap-4'>

                                                    <Button
                                                        label='Submit'
                                                        type='submit'
                                                        className='bg-blue-600 px-8 text-sm font-semibold text-white hover:bg-blue-700  sm:w-auto'
                                                    />

                                                    <Button
                                                        type='button'
                                                        className='bg-white px-5 text-sm font-semibold text-gray-900 sm:w-auto'
                                                        onClick={() => setOpen(false)}
                                                        label='Cancel'
                                                    />
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </DialogPanel>
                    </div>
                </div>
            </Dialog>
        </>
    );
};

export default AddTask;
