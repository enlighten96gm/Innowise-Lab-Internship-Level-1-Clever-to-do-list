import React from 'react'
import css from '../css-modules/calendar-page.module.css'

const SingleDateComponent = ({item}) => {
    const today = (new Date()).getDate()
    const dateToArray = item.split(' ')
    if (dateToArray[2] === today.toString()) {
       // бахаю стили тупо изи)
        console.log(today);
        // console.log(dateToArray[2]);
    }
    return (
        <div className={css.single}>
            <div className={css.string__date}>{dateToArray[0]}</div>
            <div className={css.number__date}>{dateToArray[2]}</div>
        </div>
    )
}

export default SingleDateComponent