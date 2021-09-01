import React, { useEffect, useRef, useState } from 'react';
import css from '../../css-modules/calendar-page.module.css';
import { SingleDateType } from '../../utils/types';
import SingleDotComponent from './single-dot-compinent';

const SingleDateComponent: React.FC<SingleDateType> = ({
  item,
  setDay,
  day,
  userInfo,
  setPrevActiveElement,
  prevActiveElement,
  setSingleElementWidth,
}) => {
  const dateToArray = item.split(' ');
  const active: any = { backgroundColor: 'red' };
  let [dotsArray, setDotsArray] = useState([]) as any;

  const calendarElement: any = useRef(null);
  const onElementClick = () => {
    if (prevActiveElement !== null) {
      prevActiveElement.style.backgroundColor = 'blanchedalmond';
    }
    calendarElement.current.style.backgroundColor = 'red';
    setPrevActiveElement(calendarElement.current);
    const currentTargetDay = calendarElement.current.innerText.split('\n')[1];
    setDay(currentTargetDay);
  };
  const handleDotsCount = (argument: any) => {
    const arr = [];
    if (Object.keys(argument).length > 4) {
      arr.push(Object.keys(argument).length + '+');
    } else {
      for (let value of Object.values(argument)) {
        arr.push(<SingleDotComponent value={value} dotsArray={dotsArray} />);
      }
    }
    return arr;
  };
  useEffect(() => {
    setSingleElementWidth(calendarElement.current.offsetWidth);
    if (userInfo) {
      Object.entries(userInfo).forEach((item) => {
        if (item[0] === dateToArray[2]) {
          setDotsArray(handleDotsCount(item[1]));
        }
      });
    }
  }, [userInfo]);
  useEffect(() => {
    let checkCurrentDay;
    if (day.split('').length === 1) {
      checkCurrentDay = '0' + day;
    } else {
      checkCurrentDay = day;
    }
    if (
      checkCurrentDay ===
      calendarElement.current.innerText
        .split('')
        .splice(calendarElement.current.innerText.split('').length - 2, 2)
        .join('')
    ) {
      calendarElement.current.style.backgroundColor = 'red';
      setPrevActiveElement(calendarElement.current);
    }
  }, []);

  return (
    <div
      ref={calendarElement}
      onClick={onElementClick}
      style={dateToArray[2] === day ? active : null}
      className={css.single}
    >
      <div className={css.string__date}>
        {dateToArray[0]}
        <span className={css.span__date}>{dateToArray[1]}</span>
      </div>
      <div className={css.number__date}>{dateToArray[2]}</div>
      <div className={css.task__dots}>{dotsArray}</div>
    </div>
  );
};

export default SingleDateComponent;
