import fireBase from "../fire"

const firebaseApi = {
    addNewTask: async (user, day, tasksCount, task) => {
        const response = await fireBase.database().ref(`${user.uid}/` + `${day}/` + `task:${tasksCount}`).set({
            checked: '',
            task: task,
        })
        return response
    },
    getData: async (user, setUserInfo, setLoader) => {
        // setLoader(true)
        const response = await fireBase.database().ref().child(`${user.uid}`).once('value').then(function(task) {
            setUserInfo(task.val())
        })
        // setLoader(false)
          return response
    },
    deleteTask: async (user, day, item) => {
        const response = await fireBase.database().ref(`${user.uid}/` + `${day}/` + `${item[0][1]}`).remove()
        return response
    },
    updateTask: async (user, day, item, task) => {
        const response = await fireBase.database().ref(`${user.uid}/` + `${day}/` + `${item[0][1]}`).update({
            task: task,
        })
        return response
    },
    updateCheckbox: async (user, day, item, checker) => {
        const response = await fireBase.database().ref(`${user.uid}/` + `${day}/` + `${item[0][1]}`).update({
            checked: checker,
        })
        return response
    },
    setLogin: async (email, password, setEmailError, setPasswordError) => {
        await fireBase.auth().signInWithEmailAndPassword(email, password).catch(err => {
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
    },
    setRegister: async (email, password, setEmailError, setPasswordError) => {
        await fireBase.auth().createUserWithEmailAndPassword(email, password).catch(err => {
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
}
export default firebaseApi