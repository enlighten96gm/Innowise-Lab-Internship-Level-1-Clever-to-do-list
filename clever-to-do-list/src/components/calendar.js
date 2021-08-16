import React from 'react'
import css from '../css-modules/calendar-page.module.css'

const CalendarPage = ({logOutHandler}) => {
    return (
        <div className={css.main}>
            <div className={css.wrapper}>
                <div className={css.header}>
                    <div>Tassker...</div>
                    <div onClick={logOutHandler} className={css.signout__button}>...Sign Out</div>
                </div>
                <div>
                    
                </div>
            </div>
        </div>
    )
}

export default CalendarPage