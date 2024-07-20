import React from 'react'
import ModalWrapper from '../ModalWrapper'
import { useForm } from 'react-hook-form'
import { DialogTitle } from '@headlessui/react';
import Textbox from '../TextBox';
import Button from '../Button';
import { useDispatch, useSelector } from 'react-redux';
import { deleteAllUsers, addUser } from '../../redux/slices/userSlice';

const EditTask = ({ open, setOpen = () => { }, defaultValues }) => {

    let { name, title, email, role, _id } = defaultValues;
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { users } = useSelector(state => state.user);
    const dispatch = useDispatch();

    const handleOnSubmit = (data) => {

        const newUser = {
            _id: Date.now(),
            name: data?.name,
            title: data?.title,
            email: data?.email,
            role: data?.role,
            isActive: true,
            isAdmin: data?.role === "Admin" ? true : false, 
        }

        const oldUsers = [...users];
        const replacingUser = oldUsers.filter(user => user._id !== _id);

        const newUsers = [newUser, ...replacingUser];

        dispatch(deleteAllUsers());
        dispatch(addUser(newUsers));
        setOpen(false);
    }

    return (
        <ModalWrapper open={open} close={() => setOpen(false)}>
            <form onSubmit={handleSubmit(handleOnSubmit)}>
                <DialogTitle
                    as='h2'
                    className='text-base font-bold leading-6 text-gray-900 mb-4'
                >
                    {"Edit User"}
                </DialogTitle>
                <div className='mt-2 flex flex-col gap-6'>
                    <Textbox
                        placeholder={name ? name : "Full name"}
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
                        placeholder={title ? title : "Title"}
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
                        placeholder={email ? email : "Email Address"}
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
                        placeholder={role ? role : "Role"}
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
                        label='Edit'
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

export default EditTask