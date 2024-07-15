import { FaQuestion } from "react-icons/fa";
import Button from '../Button';
import ModalWrapper from '../ModalWrapper';


const ConfirmationDialog = ({ open, setOpen }) => {

    const close = () => {
        setOpen(false);
    }

    return (
        <ModalWrapper open={open} close={close}>

            <div className='flex flex-col justify-center items-center gap-y-4'>
                <div className='w-14 h-14 rounded-full flex justify-center items-center p-4 bg-red-600'>
                    <FaQuestion className='text-white text-5xl' />
                </div>
                <p className='text-2xl text-center font-medium'>Are you sure you want to delete this task?</p>

                <div className='flex gap-4'>

                    <Button label="Cancel" onClick={close} className={'bg-slate-200 text-slate-800 rounded-md'} />
                    <Button label="Delete" onClick={close} className={'bg-red-600 text-white rounded-md'} />

                </div>

            </div>

        </ModalWrapper>
    )
}

export default ConfirmationDialog
