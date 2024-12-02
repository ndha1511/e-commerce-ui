import { Line } from "react-chartjs-2";
import { CategoryScale, Chart as ChartJS } from "chart.js/auto";
import { ChartProps } from "./types";

ChartJS.register(CategoryScale)
const LineChart: React.FC<ChartProps> = (props) => {

    const {labels, data, title } = props;

    return <Line
        data={{
            labels: labels,
            datasets: [
                {
                    label: title,
                    data: data,
                    backgroundColor: ["#36a2eb", "#ff6384", "#4bc0c0", "#ff9f40", "#9966ff", "#ffcd56"],
                    borderWidth: 1,
                }
            ]
        }}
    />
}

export default LineChart;