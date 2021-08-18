import React, { useEffect } from 'react'
import css from '../css-modules/create-task-page.module.css'
import fireBase from '../fire'

const SingleCreateTaskComponent = ({item, user, day, task}) => {
    const handleDeleteTask = async () => {
        await fireBase.database().ref(`${user.uid}/` + `${day}/` + `${item[0][1]}`).remove()
    }
    const handleUpdateTask = async () => {
        await fireBase.database().ref(`${user.uid}/` + `${day}/` + `${item[0][1]}`).update({
            task: task,
        })
    }
    // useEffect(() => {
    //     console.log(Object.values(item[1][1])[0]);
    // })
    return (
        <div className={css.task__container_task}>
            <div className={css.custom__checkbox__container}>
                <input className={css.custom__checkbox} id={`checkbox${Object.values(item)[0]}`} type='checkbox' />
                <label for={`checkbox${Object.values(item[1][1])[0]}`}></label>
            </div>
            <div className={css.task__container_label}>{Object.values(item[1][1])[0]}</div>
            <div className={css.task__button_container}>
                <div onClick={handleUpdateTask} className={css.task__container__update}>Update</div>
                <span>||</span>
                <div onClick={handleDeleteTask} className={css.task__container__delete}>Delete</div>
            </div>
        </div>
    )
}

export default SingleCreateTaskComponent