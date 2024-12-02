import { Bar } from "react-chartjs-2";
import { CategoryScale, Chart as ChartJS } from "chart.js/auto";
import { BarChartProps } from "./types";

ChartJS.register(CategoryScale)
const BarChart: React.FC<BarChartProps> = (props) => {

    const {labels, data, title, labelX, labelY } = props;

    return <Bar
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
        options={{
            plugins: {
                title: {
                    display: true,
                    text: title, // Tiêu đề biểu đồ
                },
            },
            scales: {
                x: {
                    title: {
                        display: true,
                        text: labelX, 
                    },
                },
                y: {
                    title: {
                        display: true,
                        text: labelY, 
                    },
                    beginAtZero: true, 
                },
            },
            responsive: true, 
        }}
    />
}

export default BarChart;