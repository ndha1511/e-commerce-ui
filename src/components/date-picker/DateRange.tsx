import { useMemo } from "react";
import DatePicker from "react-datepicker";
import { formatDate, formatDate2 } from "../../utils/datetime";


export interface DateRangeProps {
    startDate?: string;
    endDate?: string;
    setStartDate: (date: string) => void;
    setEndDate: (date: string) => void;
    mode: "monthYear" | "year" | "date"
}

const format = {
    "monthYear": "yyyy-MM",
    "year": "yyyy",
    "date": "yyyy-MM-dd"
}

const DateRange: React.FC<DateRangeProps> = (props) => {
    const { startDate, endDate, setStartDate, setEndDate, mode } = props;


    const startDateFormat = useMemo(() => {
        return formatDate2(startDate || "", format[mode]);
     
    }, [startDate, mode]);

    const endDateFormat = useMemo(() => {
        return formatDate2(endDate || "", format[mode]);
     
    }, [endDate, mode])

    return <div className="d-flex gap-2 align-items-center">
        <DatePicker
            selected={new Date(startDateFormat || "")}
            onChange={(date: Date | null) => {
                if(date) {
                    setStartDate(formatDate(date))
                }
            }}
            className="date-promotion"
            dateFormat={format[mode]}
            showMonthYearPicker={mode === "monthYear"}
            showYearPicker={mode === "year"}
            placeholderText="Chọn ngày"
        />
        <i className="bi bi-dash"></i>
        <DatePicker
            selected={new Date(endDateFormat || "")}
            onChange={(date: Date | null) => {
                if(date) {
                    setEndDate(formatDate(date))
                }
            }}
            className="date-promotion"
            dateFormat={format[mode]}
            placeholderText="Chọn ngày"
            showMonthYearPicker={mode === "monthYear"}
            showYearPicker={mode === "year"}
        />
        
    </div>

}

export default DateRange;