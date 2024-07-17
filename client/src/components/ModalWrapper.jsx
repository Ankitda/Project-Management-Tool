import { Dialog, DialogPanel } from "@headlessui/react"

const ModalWrapper = ({children, open, close}) => {
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
                                <div className='w-full mt-3 sm:ml-2 sm:mt-0 sm:text-left'>

                                   {children}

                                </div>
                            </div>
                        </div>
                    </DialogPanel>
                </div>
            </div>
        </Dialog>
    )
}

export default ModalWrapper