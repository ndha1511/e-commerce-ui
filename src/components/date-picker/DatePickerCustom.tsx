import React, { useMemo } from "react";
import DatePicker from "react-datepicker";
import { formatDate, formatDate2 } from "../../utils/datetime";


export interface DatePickerCustomProps {
    date: string;
    setDate: (value: string) => void;
    mode: "monthYear" | "year" | "date"
}

const format = {
    "monthYear": "yyyy-MM",
    "year": "yyyy",
    "date": "yyyy-MM-dd"
}

const DatePickerCustom: React.FC<DatePickerCustomProps> = (props) => {
    const { date, setDate, mode } = props;

    const dateFormat = useMemo(() => {
        return formatDate2(date || "", format[mode]);

    }, [date, mode]);

    return <div className="d-flex gap-2 align-items-center">
        <DatePicker
            selected={new Date(dateFormat || "")}
            onChange={(date: Date | null) => {
                if (date) {
                    setDate(formatDate2(formatDate(date), format[mode]));
                }
            }}
            className="date-custom"
            dateFormat={format[mode]}
            showMonthYearPicker={mode === "monthYear"}
            showYearPicker={mode === "year"} />
    </div>

}

export default DatePickerCustom;