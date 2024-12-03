/**
 * YYY-MM-DD
 */
export const formatDate = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); 
    const day = String(date.getDate()).padStart(2, '0'); 
    return `${year}-${month}-${day}`;
}

export function formatDate2(date: string, format: string): string {
   
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
        return date;
    }

    const [year, month, day] = date.split("-");

    switch (format) {
        case "yyyy-MM":
            return `${year}-${month}`;
        case "mm-yyyy":
            return `${month}-${year}`;
        case "dd-MM-yyyy":
            return `${day}-${month}-${year}`;
        case "yyyy":
            return year;
        default:
            return date;
    }
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

export function getStartAndEndOfWeek() {
    const now = new Date();
    const dayOfWeek = now.getDay(); 
    const diffToMonday = dayOfWeek === 0 ? -6 : 1 - dayOfWeek; 
    
    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() + diffToMonday);

    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);

    const startOfWeekString = formatDate(startOfWeek);
    const endOfWeekString = formatDate(endOfWeek);

    return {
        startOfWeekString,
        endOfWeekString
    };
}

export function getStartAndEndOfMonth(dateString: string) {
    const [year, month] = dateString.split('-').map(Number);

    const startOfMonth = new Date(year, month - 1, 1);

    const endOfMonth = new Date(year, month, 0); 

    const startOfMonthString = formatDate(startOfMonth);

    const endOfMonthString = formatDate(endOfMonth);

    return {
        startOfMonthString,
        endOfMonthString
    };
}

export function getStartAndEndOfYear(year: number) {
   
    const startOfYear = new Date(year, 0, 1); 

    const endOfYear = new Date(year, 11, 31);

    const startOfYearString = formatDate(startOfYear);
    const endOfYearString = formatDate(endOfYear);

    return {
        startOfYearString,
        endOfYearString
    };
}
