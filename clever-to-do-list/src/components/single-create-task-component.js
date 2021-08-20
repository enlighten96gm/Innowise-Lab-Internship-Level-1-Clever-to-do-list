import React, { useEffect } from 'react'
import css from '../css-modules/create-task-page.module.css'
import firebaseApi from '../utils/firebase-api'

const SingleCreateTaskComponent = ({item, user, day, task, setRestore, restore}) => {
    const handleDeleteTask = () => {
        firebaseApi.deleteTask(user, day, item)
        setRestore(restore += 'a')
    }
    const handleUpdateTask = () => {
        firebaseApi.updateTask(user, day, item, task)
        setRestore(restore += 'a')
    }
    const handleCheckboxSwitch = (e) => {
        // console.log(e.target.checked);
        if (e.target.checked === true) {
            firebaseApi.updateCheckbox(user, day, item, 'true')
        } else {
            firebaseApi.updateCheckbox(user, day, item, '')
        }
        setRestore(restore += 'a')
    }
    return (
        <div className={css.task__container_task}>
            <div className={css.custom__checkbox__container}>
                <input onClick={handleCheckboxSwitch} checked={Object.values(item[1][1])[0]} className={css.custom__checkbox} id={`checkbox${Object.values(item)[1]}`} type='checkbox' />
                <label for={`checkbox${Object.values(item[1][1])[1]}`}></label>
            </div>
            <div className={css.task__container_label}>{Object.values(item[1][1])[1]}</div>
            <div className={css.task__button_container}>
                <div onClick={handleUpdateTask} className={css.task__container__update}>Update</div>
                <span>||</span>
                <div onClick={handleDeleteTask} className={css.task__container__delete}>Delete</div>
            </div>
        </div>
    )
}

export default SingleCreateTaskComponent