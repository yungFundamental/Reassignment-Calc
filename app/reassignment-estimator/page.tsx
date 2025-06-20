'use client';
import { title } from "@/components/primitives";
import Graph from "@/components/graph";

const data = [
	{ throttle: 10, duration: 120 },
	{ throttle: 20, duration: 80 },
	{ throttle: 30, duration: 60 },
	{ throttle: 40, duration: 50 },
	{ throttle: 50, duration: 45 },
	{ throttle: 60, duration: 43 },
	{ throttle: 70, duration: 42 },
	{ throttle: 80, duration: 41 },
];

// Convert data to points for Graph
const points = data.map((d) => ({ x: d.throttle, y: d.duration }));

export default function EstimationPage() {
	return (
		<div>
			<h1 className={title()}>Estimation</h1>
				<div className="w-3/4 mx-auto h-[600px] flex items-center justify-center">
					{/* Responsive: let Graph fill parent by omitting width/height props */}
					<Graph points={points} xLabel="Throttle (MB/s)" yLabel="Duration (hrs)"/>
				</div>
			</div>
	);
}

