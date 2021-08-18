import React, { useEffect } from 'react'
import css from '../css-modules/calendar-page.module.css'

const SingleTaskComponent = ({item}) => {
    useEffect(() => {
        console.log();
    }, [])
    return (
        <div className={css.task__container_task}>
            <div className={css.custom__checkbox__container}>
                <input className={css.custom__checkbox} id={`checkbox${Object.values(item)[0]}`} type='checkbox' />
                <label for={`checkbox${Object.values(item)[0]}`}></label>
            </div>
            <div>{Object.values(item)[0]}</div>
        </div>
        
    )
}

export default SingleTaskComponent