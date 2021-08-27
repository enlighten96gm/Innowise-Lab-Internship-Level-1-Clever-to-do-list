import React, { useEffect, useRef, useState } from 'react';
import css from '../../css-modules/calendar-page.module.css';
import getDate from '../../functions/get-date';
import LoaderComponent from '../loader-component';
import SingleDateComponent from '../shared/single-date-component';
import SingleTaskComponent from '../shared/singleTaskComponent';

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
  loader,
}) => {
  const [dateArray, setDateArray] = useState(getDate(30));
  const [offsetFlag, setOffsetFlag] = useState(false);
  const [prevActiveElement, setPrevActiveElement] = useState(null);
  const [singleComponentWidth, setSingleComponentWidth] = useState(0);
  const [chosenDay, setChosenDay] = useState(
    dateArray[dateArray.length - 2] || dateArray[dateArray.length - 2]
  );
  let sliderState = {
    pressed: false,
    startX: '',
    x: '',
    firstPos: 0,
    dragged: false,
    currentPosition: '',
    firstTouch: '',
  };
  let { pressed, startX, x, firstPos, dragged, currentPosition, firstTouch } = sliderState;
  const singleCalendarComponent = dateArray.map((item) => {
    return (
      <SingleDateComponent
        key={item}
        item={item}
        setDay={setDay}
        day={day}
        userInfo={userInfo}
        setPrevActiveElement={setPrevActiveElement}
        prevActiveElement={prevActiveElement}
        setSingleComponentWidth={setSingleComponentWidth}
        singleComponentWidth={singleComponentWidth}
      />
    );
  });
  let singleTaskElement = checkArr.map((item) => {
    return (
      <SingleTaskComponent
        key={item[0][1]}
        item={item}
        user={user}
        day={day}
        setRestore={setRestore}
        restore={restore}
      />
    );
  });
  const sliderElement = useRef(null);
  const innerSliderElement = useRef(null);
  const handleMouseDown = (e) => {
    if (e.target.innerText.split('\n').join('') === chosenDay.split(' ').splice(0, 3).join('')) {
      setOffsetFlag(true);
    }
    firstPos = e.pageX;
    pressed = true;
    startX = e.pageX - innerSliderElement.current.offsetLeft;
  };
  const handleTouchStart = (e) => {
    pressed = true;
    firstTouch = e.touches[0].clientX;
    startX = e.touches[0].clientX - innerSliderElement.current.offsetLeft;
  };
  const handleMouseOut = () => {
    pressed = false;
  };
  const handleMouseMove = (e) => {
    dragged = true;
    if (!pressed) return;
    x = e.pageX;
    innerSliderElement.current.style.left = `${x - startX}px`;
    if (parseInt(innerSliderElement.current.style.left) > 0) {
      innerSliderElement.current.style.left = '0px';
    }
    if (Number(innerSliderElement.current.style.left.split('px').join('')) < -9750) {
      innerSliderElement.current.style.left = '-9750px';
    }
  };
  const handleTouchMove = (e) => {
    if (!pressed) return;
    currentPosition = e.touches[0].clientX;
    innerSliderElement.current.style.left = `${currentPosition - startX}px`;
  };
  useEffect(() => {
    const handleMouseUpTwo = () => {
      pressed = false;
    };
    window.addEventListener('mouseup', handleMouseUpTwo);
    return window.removeEventListener('mouseup', handleMouseUpTwo);
  }, []);
  useEffect(() => {
    if (offsetFlag) {
      setDateArray(getDate(60));
    } else {
      setDateArray(getDate(30));
    }
  }, [offsetFlag]);
  return (
    <div onMouseOut={handleMouseOut} className={css.main}>
      <div className={css.wrapper}>
        <div className={css.header}>
          <div>Tassker...</div>
          <div onClick={logOutHandler} className={css.signout__button}>
            ...Sign Out
          </div>
        </div>
        <div
          ref={sliderElement}
          onTouchMove={handleTouchMove}
          onMouseMove={handleMouseMove}
          onTouchStart={handleTouchStart}
          onMouseDown={handleMouseDown}
          className={css.carousel}
        >
          <div ref={innerSliderElement} className={css.inside__carousel}>
            {singleCalendarComponent}
          </div>
        </div>
        <div className={css.task__container}>
          <div className={css.task__container_text}>{tasksCount} Tasks Today?!</div>
          {!loader ? singleTaskElement : <LoaderComponent />}
        </div>
        <div className={css.add__task_container}>
          <div onClick={calendarTaskSwitcher} className={css.add__task_btn}>
            Add a New Task
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarPage;
