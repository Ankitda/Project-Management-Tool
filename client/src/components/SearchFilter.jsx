import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import TaskCard from './Tasks/TaskCard';

const SearchFilter = () => {

    const { tasks } = useSelector((state) => state.task);
    const {name} = useParams();
    const [taskFetched, setTaskFetched] = useState([]);

    useEffect(() => {

        const filteredTask = tasks.filter((task) => task.title === name);
        if(filteredTask.length > 0){
            setTaskFetched(filteredTask);
        }else{
            setTaskFetched([]);
        } 
             
    },[name])

    return (
        <div className='flex justify-center items-center gap-4 p-4'>
            {
                taskFetched.length > 0 ? (

                    <TaskCard key={taskFetched[0]._id} task={taskFetched[0]} />

                )
                 : 
                (   
                    <div className='text-red-500 font-serif text-2xl leading-6 tracking-normal'>
                        No Such Task Found 
                    </div>
                )
            }

        </div>
    )
}

export default SearchFilter