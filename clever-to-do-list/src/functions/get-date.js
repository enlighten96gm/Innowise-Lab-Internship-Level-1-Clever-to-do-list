const getDate = (argument) => {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();
    const date = today.getDate();
    const days = []

    for(let i = 0; i < argument; i += 1){
        const singleDay = new Date(year, month, date + i)
        days.push(singleDay.toDateString())
    }
    return days
}
export default getDate