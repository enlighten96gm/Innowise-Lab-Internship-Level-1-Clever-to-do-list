import React, { useEffect, useState } from 'react'
import css from '../css-modules/calendar-page.module.css'
import getDate from '../functions/get-date'
import SingleDateComponent from './single-date-component'

const CalendarPage = ({logOutHandler}) => {
    const [dateArray, setDateArray] = useState(getDate())
    const singleCalendarComponent = dateArray.map(item => {
        return <SingleDateComponent item={item}/>
    })
    useEffect(() => {
        console.log(dateArray);
    }, [])
    return (
        <div className={css.main}>
            <div className={css.wrapper}>
                <div className={css.header}>
                    <div>Tassker...</div>
                    <div onClick={logOutHandler} className={css.signout__button}>...Sign Out</div>
                </div>
                <div className={css.carousel}>
                    <div className={css.inside__carousel}>
                        {singleCalendarComponent}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CalendarPage