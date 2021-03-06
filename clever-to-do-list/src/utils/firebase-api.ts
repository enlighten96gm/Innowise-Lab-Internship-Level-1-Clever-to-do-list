import { firebaseApiType } from './types';
import fireBase from '../fire';

const firebaseApi: firebaseApiType = {
  addNewTask: async (user, day, tasksCount, task) => {
    const response = await fireBase
      .database()
      .ref(`${user.uid}/` + `${day}/` + `task:${tasksCount}`)
      .set({
        checked: '',
        task: task,
      });
    return response;
  },
  getData: async (user, setUserInfo, setLoader) => {
    const response = await fireBase
      .database()
      .ref()
      .child(`${user.uid}`)
      .once('value')
      .then(function (task) {
        setUserInfo(task.val());
      });
    return response;
  },
  deleteTask: async (user, day, item) => {
    const response = await fireBase
      .database()
      .ref(`${user.uid}/` + `${day}/` + `${item[0][1]}`)
      .remove();
    return response;
  },
  updateTask: async (user, day, item, task) => {
    const response = await fireBase
      .database()
      .ref(`${user.uid}/` + `${day}/` + `${item[0][1]}`)
      .update({
        task: task,
      });
    return response;
  },
  updateCheckbox: async (user, day, item, checker) => {
    const response = await fireBase
      .database()
      .ref(`${user.uid}/` + `${day}/` + `${item[0][1]}`)
      .update({
        checked: checker,
      });
    return response;
  },
  setLogin: async (email, password) => {
    const response = await fireBase.auth().signInWithEmailAndPassword(email, password);
    return response;
  },
  setRegister: async (email, password) => {
    const response = await fireBase.auth().createUserWithEmailAndPassword(email, password);
    return response;
  },
};
export default firebaseApi;
