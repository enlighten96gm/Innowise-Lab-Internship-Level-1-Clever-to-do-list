import React, { useEffect, useState } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'
import './App.css';
import CalendarPage from './components/calendar';
import CreateTaskPage from './components/create-task-page';
import LoginPage from './components/login-page';
import RegisterPage from './components/register-page';
import fireBase from './fire';
import { CALENDAR_ROUTE, CREATE_TASK_ROUTE, LOGIN_ROUTE, REGISTER_ROUTE } from './utils/routes';

const App = () => {
  const [user, setUser] = useState('')
  const [logInUp, setLogInUp] = useState(false)
  const [createTask, setCreateTask] = useState(false)
  const [isAuth, setIsAuth] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  let [day, setDay] = useState('')
  const [userInfo, setUserInfo] = useState('')
  const [inputRender, setInputRender] = useState('')
  const currentDatTasks = []
  const currentTaskForDelete = []
  const [tasksCount, setTasksCount] = useState(0)
  const [restore, setRestore] = useState('')
  const today = (new Date()).getDate()

  const LoginRegisterSwitcher = () => {
    clearInput()
    if (logInUp) {
      setLogInUp(false)
    } else {
      setLogInUp(true)
    }
  }
  const calendarTaskSwitcher = () => {
    if (createTask) {
      setCreateTask(false)
    } else {
      setCreateTask(true)
    }
  }
  const clearInput = () => {
    setEmail('')
    setPassword('')
    setEmailError('')
    setPasswordError('')
  }
const loginHandler = () => {
  fireBase
  .auth()
  .signInWithEmailAndPassword(email, password)
  .catch(err => {
      switch (err.code) {
          case "auth/invalid-email":
          case "auth/user-disabled":
          case "auth/user-not-found":
              setEmailError(err.message)
              break
          case "auth/wrong-password":
              setPasswordError(err.message)
              break
          default:
              break;
          
      }
  })
}

const RegisterHandler = () => {
  fireBase
  .auth()
  .createUserWithEmailAndPassword(email, password)
  .catch(err => {
      switch (err.code) {
          case "auth/email-already-in-use":
          case "auth/invalid-email":
              setEmailError(err.message)
              break
          case "auth/weak-password":
              setPasswordError(err.message)
              break
          default:
              break;
          
      }
  })
}

const logOutHandler = () => {
  fireBase.auth().signOut()
}

const authObserver = () => {
  fireBase.auth().onAuthStateChanged((user) => {
    if (user) {
      clearInput()
      setUser(user)
      setIsAuth(true)
    } else {
      setUser('')
      setIsAuth(false)
    }
  })
}
useEffect(() => {
  authObserver()
}, [user])
useEffect( async () => {
  await fireBase.database().ref().child(`${user.uid}`).once('value').then(function(task) {
    setUserInfo(task.val())
  })
}, [day, user, inputRender, restore])
useEffect(() => {
  if (userInfo) {
    for (let key of Object.entries(userInfo)) {
      if (day === key[0]) {
          if (Object.keys(key[1]).length !== 0) {}
          setTasksCount(Object.keys(key[1]).length)
          for (let entries of Object.entries(key[1])) {
              const singleTaskData = Object.values(entries)[1]
              const singleTaskForDelete = Object.entries(entries)
              currentTaskForDelete.push(singleTaskForDelete)
              currentDatTasks.push(singleTaskData)
          }
      }
      if (!Object.keys(userInfo).includes(day)) {
          setTasksCount(0)
      }
  }
  }  
}, [day, userInfo, createTask, restore])
  return (
    <div className='root'>
      <BrowserRouter>
      {user === ''
      ?
      <Switch>
        <Route path={logInUp === false ? LOGIN_ROUTE : REGISTER_ROUTE} 
        render={() => 
        logInUp === false
        ?
        <LoginPage 
        LoginRegisterSwitcher={LoginRegisterSwitcher} 
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        loginHandler={loginHandler}
        emailError={emailError}
        passwordError={passwordError}
        /> 
        :
        <RegisterPage 
        LoginRegisterSwitcher={LoginRegisterSwitcher} 
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        RegisterHandler={RegisterHandler}
        emailError={emailError}
        passwordError={passwordError}
        />
          } />
        <Redirect to={logInUp === false ? LOGIN_ROUTE : REGISTER_ROUTE} />
      </Switch>
      :
      <Switch>
        <Route path={createTask === false ? CALENDAR_ROUTE : CREATE_TASK_ROUTE} 
        render={() =>
        createTask === false
        ?
        <CalendarPage 
        logOutHandler={logOutHandler}
        calendarTaskSwitcher={calendarTaskSwitcher}
        user={user}
        setDay={setDay}
        day={day}
        userInfo={userInfo}
        tasksCount={tasksCount}
        currentDatTasks={currentDatTasks}
        />
        :
        <CreateTaskPage
        calendarTaskSwitcher={calendarTaskSwitcher}
        user={user}
        day={day}
        setInputRender={setInputRender}
        tasksCount={tasksCount}
        currentDatTasks={currentDatTasks}
        setRestore={setRestore}
        restore={restore}
        currentTaskForDelete={currentTaskForDelete}
        />
        } />
        <Redirect to={createTask === false ? CALENDAR_ROUTE : CREATE_TASK_ROUTE} />
      </Switch>
      }
      </BrowserRouter>
    </div>
    
  )
}
export default App;
