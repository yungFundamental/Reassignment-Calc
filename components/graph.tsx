import React from "react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Legend,
} from "recharts";
import { useTheme } from "next-themes";

type Point = {
    x: number;
    y: number;
};

type GraphProps = {
    width?: number;
    height?: number;
    points: Point[];
    color?: string;
    xLabel?: string;
    yLabel?: string;
};

const Graph: React.FC<GraphProps> = ({
    width = 400,
    height = 200,
    points,
    color = "#0074D9",
    xLabel = "Throttle (MB/s)",
    yLabel = "Duration (sec)",
}) => {
    const { theme } = useTheme();
    const chartColor = color || (theme === "dark" ? "#00C8FF" : "#0074D9");
    const data = points.map(p => ({ x: p.x, y: p.y }));

    return (
        <ResponsiveContainer width={width} height={height}>
            <LineChart
                data={data}
                margin={{ top: 20, right: 20, left: 20, bottom: 20 }}
            >
                <CartesianGrid
                    strokeDasharray="3 3"
                    stroke={theme === "dark" ? "#444" : "#ccc"}
                />
                <XAxis
                    dataKey="x"
                    stroke={theme === "dark" ? "#aaa" : "#333"}
                    label={{
                        value: xLabel,
                        position: "insideBottomRight",
                        offset: -5,
                    }}
                />
                <YAxis
                    stroke={theme === "dark" ? "#aaa" : "#333"}
                    label={{
                        value: yLabel,
                        angle: -90,
                        position: "insideLeft",
                    }}
                />
                <Tooltip
                    contentStyle={{
                        background: theme === "dark" ? "#222" : "#fff",
                        color: theme === "dark" ? "#fff" : "#222",
                    }}
                />
                <Legend />
                <Line
                    type="monotone"
                    dataKey="y"
                    stroke={chartColor}
                    strokeWidth={2}
                    dot={{ r: 3, fill: chartColor }}
                />
            </LineChart>
        </ResponsiveContainer>
    );
};

export default Graph;