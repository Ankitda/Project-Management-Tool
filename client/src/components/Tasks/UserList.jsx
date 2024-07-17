import { Field, Label, Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react'
import { BsChevronExpand } from "react-icons/bs";
import { MdCheck } from "react-icons/md";
import clsx from 'clsx'
import { useState } from 'react'
import { getInitials } from '../../utils/utility';

import { summary } from '../../assets/data';


const UserList = ({ setTeam }) => {

    const [users, setUsers] = useState(summary.users);
    const [selected, setSelected] = useState([]);
    const [currentUser, setCurrentUser] = useState(null);


    const selectedPeople = (person) => {
        setSelected(person)
        setCurrentUser(person[person?.length - 1].name);
        if (person?.length > 1) {
            setTeam(person.map(user => {
                return {
                    _id: user._id,
                    name: user.name,
                    title: user.title,
                    email: user.email
                }
            }))
        }
    }

    // console.log("selected", selected);

    return (
        <Field as='div' className={"w-full flex flex-col gap-1"}>

            <Label className="text-slate-800">Assign Task To:</Label>

            <Listbox value={selected} onChange={(el) => selectedPeople(el)} multiple>
                <ListboxButton
                    className={clsx(
                        'relative w-full cursor-default rounded bg-white pl-3 pr-10 text-left px-3 py-3.5 2xl:py-3 border border-gray-300 sm:text-sm'
                    )}
                >
                    <span className='block truncate'>
                        { selected.length < 1 ? "Select Team" : selected?.map((user) => user.name).join(", ") }
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
                    {users.map((person, index) => (
                        <ListboxOption
                            key={index}
                            value={person}
                            className={clsx(
                                'relative cursor-default select-none py-2 pl-10 pr-4', currentUser === person.name ? "bg-amber-100 text-amber-900" : "text-gray-900"
                            )}
                        >
                            {({ selected }) => (
                                <>
                                    <div
                                        className={clsx(
                                            "flex items-center gap-2 truncate",
                                            selected ? "font-medium" : "font-normal"
                                        )}
                                    >
                                        <div className='w-6 h-6 rounded-full text-white flex items-center justify-center bg-violet-600'>
                                            <span className='text-center text-[10px]'>
                                                {getInitials(person.name)}
                                            </span>
                                        </div>
                                        <span>{person.name}</span>
                                    </div>
                                    {selected ? (
                                        <span className='absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600'>
                                            <MdCheck className='h-5 w-5' aria-hidden='true' />
                                        </span>
                                    ) : null}
                                </>
                            )}
                        </ListboxOption>
                    ))}
                </ListboxOptions>
            </Listbox>
        </Field>
    )
}

export default UserList