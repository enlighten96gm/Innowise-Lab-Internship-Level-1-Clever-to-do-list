import React, { useEffect, useState } from 'react'
import css from '../css-modules/calendar-page.module.css'
import getDate from '../functions/get-date'
import LoaderComponent from './loader-component'
import SingleDateComponent from './single-date-component'
import SingleTaskComponent from './singleTaskComponent'

const CalendarPage = ({
logOutHandler, 
calendarTaskSwitcher, 
user, 
setDay, 
day, 
userInfo, 
tasksCount, 
checkArr, 
setRestore, 
restore, 
loader
}) => {
    const [dateArray, setDateArray] = useState(getDate(30))
    const [offsetFlag, setOffsetFlag] = useState(false)
    let sliderState = {
        pressed: false,
        startX: '',
        x: '',
        firstPos: 0,
        dragged: false,
        currentPosition: '',
        firstTouch: ''
    }
    let {
pressed, startX, x, firstPos, dragged, currentPosition, firstTouch
} = sliderState
    const singleCalendarComponent = dateArray.map((item, index) => {
        return <SingleDateComponent key={index} item={item} setDay={setDay} day={day} userInfo={userInfo}/>
    })
    let singleTaskElement = checkArr.map((item, index) => {
        return <SingleTaskComponent key={index} item={item} user={user} day={day} setRestore={setRestore} restore={restore}/>
    })
    useEffect(() => {
        if (offsetFlag) {
            setDateArray(getDate(60))
        } else {
            setDateArray(getDate(30))
        }
    }, [offsetFlag])
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
        window.addEventListener('mouseup', () => {
            pressed = false 
        })
        window.addEventListener('touchend', () => {
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
            if (innerSlider.getBoundingClientRect().right < -3850) {
                setOffsetFlag(true)
            } else if (innerSlider.getBoundingClientRect().right < -3750) {
                setOffsetFlag(false)
            }
            if (Number((innerSlider.style.left).split('px').join('')) < -9750) {
                innerSlider.style.left = '-9750px'
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
                    {!loader ? singleTaskElement : <LoaderComponent />}
                </div>
                    <div className={css.add__task_container}>
                        <div onClick={calendarTaskSwitcher} className={css.add__task_btn}>Add a New Task</div>
                    </div>
            </div>
        </div>
    )
}

export default CalendarPage