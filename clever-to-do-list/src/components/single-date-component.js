import React, { useEffect, useState } from 'react'
import css from '../css-modules/calendar-page.module.css'

const SingleDateComponent = ({item}) => {
    const today = (new Date()).getDate()
    const dateToArray = item.split(' ')

    
    useEffect(() => {
        const currentDay = document.querySelectorAll(`.${css.single}`)
        const handleChosenDay = (e) => {
            currentDay.forEach(item => {
                item.style.backgroundColor = 'blanchedalmond'
            })
            e.target.style.backgroundColor = 'red'
        }

        currentDay.forEach(item => {
            item.addEventListener('click', handleChosenDay)
        })
        return () => currentDay.forEach(item => {
            item.removeEventListener('click', handleChosenDay)
        })
    }, [])

    return (
        <div className={css.single}>
            <div className={css.string__date}>{dateToArray[0]}</div>
            <div className={css.number__date}>{dateToArray[2]}</div>
        </div>
    )
}

export default SingleDateComponent