import React, { useEffect, useState } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import CalendarPage from './components/pages/calendar';
import CreateTaskPage from './components/pages/create-task-page';
import LoginPage from './components/pages/login-page';
import RegisterPage from './components/pages/register-page';
import fireBase from './fire';
import firebaseApi from './utils/firebase-api';
import { CALENDAR_ROUTE, CREATE_TASK_ROUTE, LOGIN_ROUTE, REGISTER_ROUTE } from './utils/routes';

import './App.css';
import NotificationComponent from './utils/notification';
import errorsHandler from './utils/errors-handler';

const App = () => {
  const [user, setUser] = useState('');
  const [logInUp, setLogInUp] = useState(false);
  const [createTask, setCreateTask] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  let [day, setDay] = useState(new Date().getDate().toString());
  const [userInfo, setUserInfo] = useState('');
  const [inputRender, setInputRender] = useState('');
  const currentTaskForDelete = [];
  const [tasksCount, setTasksCount] = useState(0);
  const [restore, setRestore] = useState('');
  let [checkArr, setCheckArr] = useState('');
  const [loader, setLoader] = useState(false);
  const [errorToast, setErrorMessage] = useState('');

  const LoginRegisterSwitcher = () => {
    clearInput();
    setLogInUp((logInUp) => !logInUp);
  };
  const calendarTaskSwitcher = () => {
    setCreateTask((createTask) => !createTask);
  };
  const clearInput = () => {
    setEmail('');
    setPassword('');
  };
  const loginHandler = () => {
    errorsHandler(firebaseApi.setLogin(email, password), setErrorMessage);
  };
  const RegisterHandler = () => {
    errorsHandler(firebaseApi.setRegister(email, password), setErrorMessage);
  };
  const logOutHandler = () => {
    fireBase.auth().signOut();
  };
  const authObserver = () => {
    fireBase.auth().onAuthStateChanged((user) => {
      if (user) {
        clearInput();
        setUser(user);
      } else {
        setUser('');
      }
    });
  };
  useEffect(() => {
    authObserver();
  }, [user]);
  useEffect(() => {
    firebaseApi.getData(user, setUserInfo, setLoader);
  }, [day, user, inputRender, restore, errorToast]);
  useEffect(() => {
    if (userInfo) {
      for (let key of Object.entries(userInfo)) {
        if (day === key[0]) {
          if (Object.keys(key[1]).length !== 0) setTasksCount(Object.keys(key[1]).length);
          for (let entries of Object.entries(key[1])) {
            const singleTaskForDelete = Object.entries(entries);
            currentTaskForDelete.push(singleTaskForDelete);
          }
        }
        if (!Object.keys(userInfo).includes(day)) {
          setTasksCount(0);
        }
      }
    }
    setCheckArr(currentTaskForDelete);
  }, [day, userInfo, createTask, restore, user]);
  return (
    <div className="root">
      <BrowserRouter>
        {user === '' ? (
          <Switch>
            <Route
              path={LOGIN_ROUTE}
              render={() => {
                return (
                  <LoginPage
                    LoginRegisterSwitcher={LoginRegisterSwitcher}
                    email={email}
                    setEmail={setEmail}
                    password={password}
                    setPassword={setPassword}
                    loginHandler={loginHandler}
                  />
                );
              }}
            />
            <Route
              path={REGISTER_ROUTE}
              render={() => {
                return (
                  <RegisterPage
                    LoginRegisterSwitcher={LoginRegisterSwitcher}
                    email={email}
                    setEmail={setEmail}
                    password={password}
                    setPassword={setPassword}
                    RegisterHandler={RegisterHandler}
                  />
                );
              }}
            />
            <Redirect to={logInUp ? LOGIN_ROUTE : REGISTER_ROUTE} />
          </Switch>
        ) : (
          <Switch>
            <Route
              path={CALENDAR_ROUTE}
              render={() => {
                return (
                  <CalendarPage
                    logOutHandler={logOutHandler}
                    calendarTaskSwitcher={calendarTaskSwitcher}
                    user={user}
                    setDay={setDay}
                    day={day}
                    userInfo={userInfo}
                    tasksCount={tasksCount}
                    checkArr={checkArr}
                    setRestore={setRestore}
                    restore={restore}
                    loader={loader}
                  />
                );
              }}
            />
            <Route
              path={CREATE_TASK_ROUTE}
              render={() => {
                return (
                  <CreateTaskPage
                    calendarTaskSwitcher={calendarTaskSwitcher}
                    user={user}
                    day={day}
                    setInputRender={setInputRender}
                    tasksCount={tasksCount}
                    setRestore={setRestore}
                    restore={restore}
                    checkArr={checkArr}
                  />
                );
              }}
            />
            <Redirect to={CALENDAR_ROUTE} />
          </Switch>
        )}
      </BrowserRouter>
      {errorToast ? (
        <NotificationComponent errorToast={errorToast} setErrorMessage={setErrorMessage} />
      ) : null}
    </div>
  );
};
export default App;
