import React, { useEffect, useState } from 'react'
import css from '../css-modules/calendar-page.module.css'

const SingleDateComponent = ({item, setDay, day, userInfo}) => {
    const dateToArray = item.split(' ')
    const active = {backgroundColor: 'red'}
    let [dotsLength, setDotsLength] = useState(0)

    useEffect(() => {
        const currentDay = document.querySelectorAll(`.${css.single}`)
        const handleChosenDay = (e) => {
            currentDay.forEach(item => {
                item.style.backgroundColor = 'blanchedalmond'
            })
            e.target.style.backgroundColor = 'red'
            const currentTargetDay = (e.target.innerText).split('\n')[1]
            setDay(currentTargetDay)
        }
        currentDay.forEach(item => {
            item.addEventListener('click', handleChosenDay)
        })
        return () => currentDay.forEach(item => {
            item.removeEventListener('click', handleChosenDay)
        })
    })
    useEffect(() => {
        if (userInfo) {
            Object.entries(userInfo).forEach((item, index) => {
                if (item[0] === dateToArray[2]) {
                    setDotsLength(Object.keys(item[1]).length)
                }
            })
        }
    }, [userInfo])

    return (
        <div style={dateToArray[2] === day ? active : null} className={css.single}>
            <div className={css.string__date}>{dateToArray[0]}</div>
            <div className={css.number__date}>{dateToArray[2]}</div>
            <div className={css.task__dots}>{dotsLength}</div>
        </div>
    )
}

export default SingleDateComponent