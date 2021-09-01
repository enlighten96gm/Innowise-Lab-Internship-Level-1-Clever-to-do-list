import React from 'react';
import css from '../../css-modules/calendar-page.module.css';
import firebaseApi from '../../utils/firebase-api';
import { SingleTaskType } from '../../utils/types';

const SingleTaskComponent: React.FC<SingleTaskType> = ({
  item,
  user,
  day,
  setRestore,
  restore,
}) => {
  const checkBoxValue: any = Object.values(item[1][1])[0];
  const labelValue = Object.values(item[1][1])[1];
  const handleCheckboxSwitch = (e: any) => {
    if (e.target.checked === true) {
      firebaseApi.updateCheckbox(user, day, item, 'true');
    } else {
      firebaseApi.updateCheckbox(user, day, item, '');
    }
    setRestore((restore += 'a'));
  };
  return (
    <div className={css.task__container_task}>
      <div className={css.custom__checkbox__container}>
        <input
          onChange={handleCheckboxSwitch}
          checked={checkBoxValue}
          className={css.custom__checkbox}
          id={`checkbox${labelValue}`}
          type="checkbox"
        />
        <label htmlFor={`checkbox${labelValue}`} />
      </div>
      <div>{labelValue}</div>
    </div>
  );
};

export default SingleTaskComponent;
