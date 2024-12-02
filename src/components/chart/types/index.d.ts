export interface ChartProps {
    labels: string[];
    data: string[];
    title: string;
}

export interface BarChartProps extends ChartProps {
    labelX: string;
    labelY: string;

}