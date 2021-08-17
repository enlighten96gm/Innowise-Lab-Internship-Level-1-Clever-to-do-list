import React, { useState } from 'react'
import css from '../css-modules/create-task-page.module.css'
import fireBase from '../fire'

const CreateTaskPage = ({calendarTaskSwitcher, user}) => {
    const [task, setTask] = useState('')
    let [taskCounter, setTaskCounter] = useState(0)
    let [day, setDay] = useState(0)
    const handleUser = async () => {
        await fireBase.database().ref(`${user.uid}/` + `Monday/` + taskCounter).set({
            task: task,
        })
        setTask('')
        setTaskCounter( taskCounter += 1)
        setDay(day += 1)
    }
    const handleInputChange = (e) => {
        setTask(e.target.value)
    }
    return (
        <div className={css.main}>
            <div className={css.wrapper}>
                <div className={css.header}>
                    <div onClick={calendarTaskSwitcher} className={css.return}></div>
                    <div className={css.header__text}>Today's Task. . .</div>
                </div>
                <div className={css.task__container}>
                    {/* от сель */}
                    <div className={css.task__container_task}>
                        <div className={css.custom__checkbox__container}>
                            <input className={css.custom__checkbox} id='checkbox' type='checkbox' />
                            <label for='checkbox'></label>
                        </div>
                        <div className={css.task__container_label}>Pay bills</div>
                        <div className={css.task__button_container}>
                            <div className={css.task__container__update}>Update</div>
                            <span>||</span>
                            <div className={css.task__container__delete}>Delete</div>
                        </div>
                    </div>
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