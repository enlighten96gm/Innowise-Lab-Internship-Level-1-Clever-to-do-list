type ObjectInArray = {
    checked: string
    task: string
}
type UserInfoType = {
    '01': {
        'task:0': {
            checked: string
            task: string
        }
    } 
}
export type checkArrayType = Array<Array<Array<string> | Array<ObjectInArray>>>
export type LoginPageType = {
    LoginRegisterSwitcher: () => void
    email: string
    loginHandler: () => void
    password: string
    setEmail: (e: string) => void
    setPassword: (e: string) => void
}
export type RegisterPageType = {
    LoginRegisterSwitcher: () => void
    RegisterHandler: () => void
    email: string
    password: string
    setEmail: (e: string) => void
    setPassword: (e: string) => void
}
export type CalendarPageType = {
    logOutHandler: () => void
    calendarTaskSwitcher: () => void
    user: any
    setDay: () => void
    day: string
    userInfo: UserInfoType
    tasksCount: number
    checkArr: checkArrayType
    setRestore: () => void
    restore: string
    loader: boolean
}
export type CreateTaskPageType = {
    calendarTaskSwitcher: () => void
    user: any
    day: string
    setInputRender: (task: string) => void
    tasksCount: number
    setRestore: () => void
    restore: string
    checkArr: checkArrayType
}
export type SliderStateType = {
    pressed: boolean
    startX: string | number | null | any
    x: string | number | bigint | any
    firstPos: number
    dragged: boolean
    currentPosition: string | any
    firstTouch: string | number
}
export type handlerType = (e: MouseEvent) => void
export type firebaseApiType = {
    addNewTask: (user: any, day: string, taskCount: number, task: string) => Promise<any>
    getData: (user: any, setUserInfo: (value: any) => void, setLoader: () => void) => Promise<any>
    deleteTask: (user: any, day: string, item: any) => Promise<any>
    updateTask: (user: any, day: string, item: any, task: string) => Promise<any>
    updateCheckbox: (user: any, day: string, item: any, checker: string) => Promise<any>
    setLogin: (email: string, password: string) => Promise<any>
    setRegister: (email: string, password: string) => Promise<any>
}
export type NotificationTypeComponent = {
    errorToast: string
    setErrorMessage: (value: string) => void
}
export type SingleCreateTaskType = {
    item: Array<Array<string> | Array<ObjectInArray>>
    user: any
    day: string
    task: string
    setRestore: (value: string) => void
    restore: string
}
export type SingleDateType = {
    item: string
    setDay: (value: any) => void
    day: string
    userInfo: UserInfoType
    setPrevActiveElement: (value: any) => void
    prevActiveElement: any
    setSingleElementWidth: (value: any) => void
}
export type DotValueType = {
    checked: string
    task: string
}
export type SingleDotType = {
    value: any
    dotsArray: any
}
export type SingleTaskType = {
    item: Array<Array<string> | Array<ObjectInArray>>
    user: any
    day: string
    setRestore: (value: string) => void
    restore: string
}