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
    points: Point[];
    color?: string;
    xLabel?: string;
    yLabel?: string;
};

const Graph: React.FC<GraphProps> = ({
    points,
    color = "#0074D9",
    xLabel = "X",
    yLabel = "Y",
}) => {
    const { theme } = useTheme();
    const chartColor = color || (theme === "dark" ? "#00C8FF" : "#0074D9");
    const data = points.map(p => ({
        x: p.x,
        y: p.y,
        [xLabel]: p.x,
        [yLabel]: p.y,
    }));

    return (
        <ResponsiveContainer width="100%" height="100%">
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
                    formatter={(_, name) => {
                        if (name === 'y') return [_, yLabel];
                        if (name === 'x') return [_, xLabel];
                        return [_, name];
                    }}
                    labelFormatter={label => `${xLabel}: ${label}`}
                    contentStyle={{
                        background: theme === "dark" ? "#222" : "#fff",
                        color: theme === "dark" ? "#fff" : "#222",
                    }}
                />
                <Legend formatter={() => yLabel} />
                <Line
                    type="monotone"
                    dataKey="y"
                    stroke={chartColor}
                    strokeWidth={2}
                    dot={{ r: 3, fill: chartColor }}
                    name={yLabel}
                />
            </LineChart>
        </ResponsiveContainer>
    );
};

export default Graph;