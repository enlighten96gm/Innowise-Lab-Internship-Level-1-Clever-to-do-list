import React, { useEffect, useState } from 'react'
import css from '../css-modules/calendar-page.module.css'
import firebaseApi from '../utils/firebase-api';

const SingleTaskComponent = ({item, user, day}) => {
    // console.log(Object.values(item));
    const handleCheckboxSwitch = () => {
        firebaseApi.updateCheckbox(user, day, item, 'true')
    }
    // не проходит рендер
    // скорее всего айдишнику нужно бдует задать еще и дополнительно значение конкретного дня иначе они совпадают и начинается мясо
    return (
        <div className={css.task__container_task}>
            <div className={css.custom__checkbox__container}>
                <input onClick={handleCheckboxSwitch} checked={Object.values(item[1][1])[0]} className={css.custom__checkbox} id={`checkbox${Object.values(item[1][1])[1]}`} type='checkbox' />
                <label for={`checkbox${Object.values(item[1][1])[1]}`}></label>
            </div>
            <div>{Object.values(item[1][1])[1]}</div>
        </div> 
    )
}

export default SingleTaskComponent