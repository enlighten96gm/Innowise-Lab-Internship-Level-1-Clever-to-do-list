import React, { useEffect, useState } from 'react'
import css from '../css-modules/calendar-page.module.css'
import getDate from '../functions/get-date'
import SingleDateComponent from './single-date-component'
import SingleTaskComponent from './singleTaskComponent'

const CalendarPage = ({logOutHandler, calendarTaskSwitcher, user, setDay, day, userInfo, tasksCount, currentTaskState, createTask, checkArr, setRestore, restore}) => {
    const [dateArray, setDateArray] = useState(getDate())
    let sliderState = {
        pressed: false,
        startX: '',
        x: '',
        firstPos: 0,
        dragged: false,
        currentPosition: '',
        firstTouch: ''
    }
    let {pressed, startX, x, firstPos, dragged, currentPosition, firstTouch} = sliderState
    const singleCalendarComponent = dateArray.map(item => {
        return <SingleDateComponent item={item} setDay={setDay} day={day} userInfo={userInfo}/>
    })
    let singleTaskElement = checkArr.map(item => {
        return <SingleTaskComponent key={Object.values(item[1][1])[1]} item={item} user={user} day={day} setRestore={setRestore} restore={restore}/>
    })
    useEffect(() => {
        const slider = document.querySelector(`.${css.carousel}`)
        const innerSlider = document.querySelector(`.${css.inside__carousel}`)
        slider.addEventListener('mousedown', (e) => {
            firstPos = e.pageX
            pressed = true
            startX = e.pageX - innerSlider.offsetLeft
        })
        slider.addEventListener('touchstart', (e) => {
            pressed = true
            firstTouch = e.touches[0].clientX
            startX = e.touches[0].clientX - innerSlider.offsetLeft
        })
        window.addEventListener('mouseup', (e) => {
            pressed = false 
        })
        window.addEventListener('touchend', (e) => {
            pressed = false
        })
        slider.addEventListener('mousemove', (e) => {
            dragged = true
            if (!pressed) return;
            x = e.pageX
            innerSlider.style.left = `${x - startX}px`
            if (parseInt(innerSlider.style.left) > 0) {
                innerSlider.style.left = '0px'
            } 
        })
        slider.addEventListener('touchmove', (e) => {
            if (!pressed) return;
            currentPosition = e.touches[0].clientX
            innerSlider.style.left = `${currentPosition - startX}px`
        })
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
                <div className={css.task__container}>
                    <div className={css.task__container_text}>{tasksCount} Tasks Today?!</div>
                    {singleTaskElement}
                </div>
                    <div className={css.add__task_container}>
                        <div onClick={calendarTaskSwitcher} className={css.add__task_btn}>Add a New Task</div>
                    </div>
            </div>
        </div>
    )
}

export default CalendarPage