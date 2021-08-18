import React, { useEffect, useState } from 'react'
import css from '../css-modules/create-task-page.module.css'
import fireBase from '../fire'
import SingleCreateTaskComponent from './single-create-task-component'

const CreateTaskPage = ({calendarTaskSwitcher, user, day, setInputRender, tasksCount, currentDatTasks, setRestore, restore, currentTaskForDelete}) => {
    const [task, setTask] = useState('')
    let singleCreateTaskElement = currentTaskForDelete.map(item => {
        return <SingleCreateTaskComponent item={item} user={user} day={day} task={task}/>
    })
    const handleUser = async () => {
        await fireBase.database().ref(`${user.uid}/` + `${day}/` + `task:${tasksCount}`).set({
            task: task,
        })
        setTask('')
        setInputRender(task)
        setRestore(restore += 1)
    }
    const handleInputChange = (e) => {
        setTask(e.target.value)
    }
    useEffect(() => {
    }, [task, user, setInputRender, restore, currentDatTasks])
    return (
        <div className={css.main}>
            <div className={css.wrapper}>
                <div className={css.header}>
                    <div onClick={calendarTaskSwitcher} className={css.return}></div>
                    <div className={css.header__text}>Today's Task. . .</div>
                </div>
                <div className={css.task__container}>
                    {/* от сель */}
                    {singleCreateTaskElement}
                    {/* до сель будет повторяться от пропсов */}
                </div>
                <div>
                    <div onClick={handleUser} className={css.create__task_button}>Create</div>
                    <input onChange={handleInputChange} value={task} className={css.create__task_input} type='text'/>
                </div>
            </div>
        </div>
    )
}
export default CreateTaskPage