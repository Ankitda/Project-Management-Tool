import { Field, Label, Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react'
import { BsChevronExpand } from 'react-icons/bs'
import { MdCheck } from 'react-icons/md'
import clsx from 'clsx'

const SelectedList = ({label, lists, stageSelected, handleStageSelected }) => {

    const handleSelect = (el) => {
        handleStageSelected(el);
    }

    return (
        <Field as='div' className={"w-full flex flex-col gap-1"}>
            <Label>{label}</Label>

            <Listbox value={stageSelected} onChange={(el) => handleSelect(el)}>
                <ListboxButton
                    className={clsx(
                        'relative w-full cursor-default rounded bg-white text-left border border-gray-300 sm:text-sm px-3 py-3.5 2xl:py-3'
                    )}
                >
                    <span className='block truncate'>
                        {stageSelected ? stageSelected : "Select Stage" }
                    </span>
                    <span className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2'>
                        <BsChevronExpand
                            className='h-5 w-5 text-gray-400'
                            aria-hidden='true'
                        />
                    </span>
                </ListboxButton>
                <ListboxOptions
                    anchor="bottom"
                    className={clsx(
                        `z-50 w-[var(--button-width)] mt-1 max-h-60 overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm`
                    )}
                >
                    {lists.map((stage, index) => (
                        <ListboxOption
                            key={index}
                            value={stage}
                            className={clsx(
                                'relative cursor-default select-none py-2 pl-10 pr-4', stageSelected === stage ? "bg-amber-100 text-amber-900" : "text-gray-900"
                            )}
                        >

                            <span className={`block truncate ${stageSelected === stage ? "font-medium" : "font-normal"}`}>
                                {stage}
                            </span>
                            {stageSelected === stage ? (
                                <span className='absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600'>
                                    <MdCheck className='h-5 w-5' aria-hidden='true' />
                                </span>

                            ) : null}

                        </ListboxOption>
                    ))}
                </ListboxOptions>
            </Listbox>

        </Field>
    )
}

export default SelectedList