import { useForm } from "react-hook-form";
import { DialogTitle } from "@headlessui/react";
import Textbox from "../TextBox";
import Button from "../Button";
import ModalWrapper from "../ModalWrapper";

const AddUser = ({ open, setOpen }) => {

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const handleOnSubmit = (data) => {
        console.log("user data submitted successfully", data);
        setOpen(false);
    };

    const close = () => {
        setOpen(false);
    }

    return (
        <ModalWrapper open={open} close={close}>

            <form onSubmit={handleSubmit(handleOnSubmit)}>
                <DialogTitle
                    as='h2'
                    className='text-base font-bold leading-6 text-gray-900 mb-4'
                >
                    {"ADD NEW USER"}
                </DialogTitle>
                <div className='mt-2 flex flex-col gap-6'>
                    <Textbox
                        placeholder='Full name'
                        type='text'
                        name='name'
                        label='Full Name'
                        className='w-full rounded'
                        register={register("name", {
                            required: "Full name is required!",
                        })}
                        error={errors.name ? errors.name.message : ""}
                    />
                    <Textbox
                        placeholder='Title'
                        type='text'
                        name='title'
                        label='Title'
                        className='w-full rounded'
                        register={register("title", {
                            required: "Title is required!",
                        })}
                        error={errors.title ? errors.title.message : ""}
                    />
                    <Textbox
                        placeholder='Email Address'
                        type='email'
                        name='email'
                        label='Email Address'
                        className='w-full rounded'
                        register={register("email", {
                            required: "Email Address is required!",
                        })}
                        error={errors.email ? errors.email.message : ""}
                    />

                    <Textbox
                        placeholder='Role'
                        type='text'
                        name='role'
                        label='Role'
                        className='w-full rounded'
                        register={register("role", {
                            required: "User role is required!",
                        })}
                        error={errors.role ? errors.role.message : ""}
                    />
                </div>


                <div className='py-3 mt-4 sm:flex sm:flex-row-reverse'>
                    <Button
                        type='submit'
                        className='bg-blue-600 px-8 text-sm font-semibold text-white hover:bg-blue-700  sm:w-auto'
                        label='Submit'
                    />

                    <Button
                        type='button'
                        className='bg-white px-5 text-sm font-semibold text-gray-900 sm:w-auto'
                        onClick={() => setOpen(false)}
                        label='Cancel'
                    />
                </div>

            </form>

        </ModalWrapper>


    )
}

export default AddUser

