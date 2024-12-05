import DatePickerCustom from "../../../../components/date-picker/DatePickerCustom";
import DateRange from "../../../../components/date-picker/DateRange";
import {
  formatDate,
  formatDate2,
  getStartAndEndOfMonth,
  getStartAndEndOfYear,
} from "../../../../utils/datetime";
import { isMobile } from "../../../../utils/responsive";
import { Mode, SatisticsProps, SatisticsSearch } from "../types";
import Select from "react-select";

interface ModeOption {
  value: Mode["mode"];
  label: string;
}

const modeOptions: ModeOption[] = [
  { value: "daily", label: "Theo ngày" },
  { value: "weekly", label: "Theo tuần" },
  { value: "monthly", label: "Theo tháng" },
  { value: "year", label: "Theo năm" },
];

const StatisticsToolbar: React.FC<SatisticsProps> = (props) => {
  const { search, setSearch, mode, setMode } = props;

  const setStartDate = (date: string) => {
    setSearch((prev: SatisticsSearch) => {
      return {
        ...prev,
        startDate: date,
      };
    });
  };

  const setEndDate = (date: string) => {
    setSearch((prev: SatisticsSearch) => {
      return {
        ...prev,
        endDate: date,
      };
    });
  };

  const setMonthYear = (date: string) => {
    const { startOfMonthString, endOfMonthString } =
      getStartAndEndOfMonth(date);
    setSearch((prev: SatisticsSearch) => {
      return {
        ...prev,
        monthYear: date,
        startDate: startOfMonthString,
        endDate: endOfMonthString,
      };
    });
  };

  const setYear = (date: string) => {
    const { startOfYearString, endOfYearString } = getStartAndEndOfYear(
      Number(formatDate2(date, "yyyy"))
    );
    setSearch((prev: SatisticsSearch) => {
      return {
        ...prev,
        year: Number(formatDate2(date, "yyyy")),
        startDate: startOfYearString,
        endDate: endOfYearString,
      };
    });
  };

  const renderMode = () => {
    switch (mode) {
      case "daily":
        return (
          <DateRange
            startDate={search.startDate}
            endDate={search.endDate}
            setEndDate={setEndDate}
            setStartDate={setStartDate}
            mode="date"
          />
        );
      case "monthly":
        return (
          <DatePickerCustom
            date={search.monthYear || formatDate(new Date())}
            setDate={setMonthYear}
            mode="monthYear"
          />
        );
      case "weekly":
        return (
          <DateRange
            startDate={search.startDate}
            endDate={search.endDate}
            setEndDate={setEndDate}
            setStartDate={setStartDate}
            mode="date"
          />
        );
      case "year":
        return (
          <DatePickerCustom
            date={search.year?.toString() || formatDate(new Date())}
            setDate={setYear}
            mode="year"
          />
        );
      default:
        return null;
    }
  };
  const mobile = isMobile();
  return (
    <div className="d-flex flex-column gap-2">
      <div className={`d-flex gap-3  ${mobile ? "flex-column" : ""}`}>
        <div className="d-flex align-items-center gap-3">
          <span>Loại thống kê: </span>
          <Select
            options={modeOptions}
            value={modeOptions.find((option) => option.value === mode)}
            onChange={(value) => {
              setMode(value?.value || "daily");
            }}
          />
        </div>
        <div className={`${mobile ? "" : ""}`}>
          {" "}
          {renderMode()}
        </div>
      </div>
    </div>
  );
};

export default StatisticsToolbar;
