import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import css from '../../css-modules/create-task-page.module.css';
import firebaseApi from '../../utils/firebase-api';
import { CALENDAR_ROUTE } from '../../utils/routes';
import SingleCreateTaskComponent from '../shared/single-create-task-component';

const CreateTaskPage = ({
  calendarTaskSwitcher,
  user,
  day,
  setInputRender,
  tasksCount,
  setRestore,
  restore,
  checkArr,
}) => {
  const [task, setTask] = useState('');
  const singleCreateTaskElement = checkArr.map((item) => {
    return (
      <SingleCreateTaskComponent
        item={item}
        user={user}
        day={day}
        task={task}
        setRestore={setRestore}
        restore={restore}
      />
    );
  });
  const handleUser = async () => {
    if (task) {
      await firebaseApi.addNewTask(user, day, tasksCount, task);
      setTask('');
      setInputRender(task);
    }
  };
  const handleInputChange = (e) => {
    setTask(e.target.value);
  };
  return (
    <div className={css.main}>
      <div className={css.wrapper}>
        <div className={css.header}>
          <NavLink to={CALENDAR_ROUTE}>
            <div onClick={calendarTaskSwitcher} className={css.return} />
          </NavLink>
          <div className={css.header__text}>Today's Task. . .</div>
        </div>
        <div className={css.task__container}>{singleCreateTaskElement}</div>
        <div>
          <div onClick={handleUser} className={css.create__task_button}>
            Create
          </div>
          <input
            onChange={handleInputChange}
            value={task}
            className={css.create__task_input}
            type="text"
          />
        </div>
      </div>
    </div>
  );
};
export default CreateTaskPage;
