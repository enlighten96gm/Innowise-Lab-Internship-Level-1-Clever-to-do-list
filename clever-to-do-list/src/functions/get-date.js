const getDate = () => {
    const today = new Date();

    const year = today.getFullYear();
    const month = today.getMonth();
    const date = today.getDate();
    const days = []

    for(var i=0; i<30; i++){
        const singleDay = new Date(year, month, date + i)
        days.push(singleDay.toDateString())
    }
    return days
}
export default getDate