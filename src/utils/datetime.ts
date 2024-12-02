/**
 * YYY-MM-DD
 */
export const formatDate = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); 
    const day = String(date.getDate()).padStart(2, '0'); 
    return `${year}-${month}-${day}`;
}

export const getDateStringToday = () => {
    const today = new Date();
    const nextDay = new Date();
    nextDay.setDate(today.getDate() + 1);

    const startDate = formatDate(today);
    const endDate = formatDate(nextDay);

    return { startDate, endDate };
}

export const getDateToday = () => {
    return new Date();
}