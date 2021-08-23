import React from 'react'
import css from '../css-modules/calendar-page.module.css'
import firebaseApi from '../utils/firebase-api';

const SingleTaskComponent = ({
item, 
user, 
day, 
setRestore, 
restore
}) => {
    const handleCheckboxSwitch = (e) => {
        if (e.target.checked === true) {
            firebaseApi.updateCheckbox(user, day, item, 'true')
        } else {
            firebaseApi.updateCheckbox(user, day, item, '')
        }
        setRestore(restore += 'a')
    }
    // скорее всего айдишнику нужно бдует задать еще и дополнительно значение конкретного дня иначе они совпадают и начинается мясо
    return (
        <div className={css.task__container_task}>
            <div className={css.custom__checkbox__container}>
                <input onChange={handleCheckboxSwitch} checked={Object.values(item[1][1])[0]} className={css.custom__checkbox} id={`checkbox${Object.values(item[1][1])[1]}`} type='checkbox' />
                <label htmlFor={`checkbox${Object.values(item[1][1])[1]}`} />
            </div>
            <div>{Object.values(item[1][1])[1]}</div>
        </div> 
    )
}

export default SingleTaskComponent