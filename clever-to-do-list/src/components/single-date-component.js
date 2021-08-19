import React, { useEffect, useState } from 'react'
import css from '../css-modules/calendar-page.module.css'
import SingleDotComponent from './single-dot-compinent'

const SingleDateComponent = ({item, setDay, day, userInfo}) => {
    const dateToArray = item.split(' ')
    const active = {backgroundColor: 'red'}
    let [dotsArray, setDotsArray] = useState([])
    let checkLength = 0
    const handleDotsCount = (argument) => {
        const arr = []
        for (let i = 0; i < argument; i += 1) {
            arr.push(<SingleDotComponent />)
        }
        return arr
    }

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
            Object.entries(userInfo).forEach((item) => {
                if (item[0] === dateToArray[2]) {
                    checkLength = Object.keys(item[1]).length
                    setDotsArray(handleDotsCount(checkLength))
                }
            })
        }  
    }, [userInfo])

    return (
        <div style={dateToArray[2] === day ? active : null} className={css.single}>
            <div className={css.string__date}>{dateToArray[0]}</div>
            <div className={css.number__date}>{dateToArray[2]}</div>
            <div className={css.task__dots}>{dotsArray}</div>
        </div>
    )
}

export default SingleDateComponent