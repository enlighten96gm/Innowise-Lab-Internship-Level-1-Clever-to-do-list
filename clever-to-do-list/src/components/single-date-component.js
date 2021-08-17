import React, { useEffect, useState } from 'react'
import css from '../css-modules/calendar-page.module.css'

const SingleDateComponent = ({item}) => {

    let [todayStyle, setTodayStyle] = useState('')
    const today = (new Date()).getDate()
    const dateToArray = item.split(' ')
    const todayStyleHandler = () => {
        if (dateToArray[2] === today.toString()) {
            setTodayStyle({
                backgroundColor: 'black',
                color: 'white',
                boxShadow: '5px 1px 1px 1px white'
            })    
        }
    }
    
    useEffect(() => {
        const currentDay = document.querySelectorAll(`.${css.single}`)
        const handleChosenDay = (e) => {
            e.target.style.backgroundColor = 'red'
        }
        todayStyleHandler()
        currentDay.forEach(item => {
            item.addEventListener('click', handleChosenDay)
        })
        return () => currentDay.forEach(item => {
            item.removeEventListener('click', handleChosenDay)
        })
    }, [])

    return (
        <div style={todayStyle !== '' ? todayStyle : null} className={css.single}>
            <div className={css.string__date}>{dateToArray[0]}</div>
            <div className={css.number__date}>{dateToArray[2]}</div>
        </div>
    )
}

export default SingleDateComponent