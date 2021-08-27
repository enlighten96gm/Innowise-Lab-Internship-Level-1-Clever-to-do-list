import React, { useEffect, useRef, useState } from 'react';
import css from '../../css-modules/calendar-page.module.css';
import SingleDotComponent from '../shared/single-dot-compinent';

const SingleDateComponent = ({
  item,
  setDay,
  day,
  userInfo,
  setPrevActiveElement,
  prevActiveElement,
  setSingleComponentWidth,
  singleComponentWidth,
}) => {
  const dateToArray = item.split(' ');
  const active = { backgroundColor: 'red' };
  let [dotsArray, setDotsArray] = useState([]);
  const calendarElement = useRef(null);
  const onElementClick = () => {
    if (prevActiveElement !== null) {
      prevActiveElement.style.backgroundColor = 'blanchedalmond';
    }
    calendarElement.current.style.backgroundColor = 'red';
    setPrevActiveElement(calendarElement.current);
    const currentTargetDay = calendarElement.current.innerText.split('\n')[1];
    setDay(currentTargetDay);
  };
  const handleDotsCount = (argument) => {
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
    setSingleComponentWidth((singleComponentWidth += calendarElement.current.offsetWidth + 15));
  }, item);
  useEffect(() => {
    if (userInfo) {
      Object.entries(userInfo).forEach((item) => {
        if (item[0] === dateToArray[2]) {
          setDotsArray(handleDotsCount(item[1]));
        }
      });
    }
  }, [userInfo]);

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
