'use client';
import { title } from "@/components/primitives";
import Graph from "@/components/graph";
import { useState } from "react";
import getDataPoints from "./logic";

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
	const [storage, setStorage] = useState(1000);
	const [brokersBefore, setBrokersBefore] = useState(5);
	const [replication, setReplication] = useState(3);
	const [throughput, setThroughput] = useState(100);
	const [brokersAfter, setBrokersAfter] = useState(6);
	console.log("params", {
		totalStorageToMove: storage,
		totalBrokersAfter: brokersAfter,
		brokerReplicationThroughput: throughput * replication / brokersBefore,
		averageClusterThroughputIn: throughput,
		replicationFactor: replication
	});
	
	console.log("getDataPoints", getDataPoints({
		totalStorageToMove: storage,
		totalBrokersAfter: brokersAfter,
		brokerReplicationThroughput: throughput * replication / brokersBefore,
		averageClusterThroughputIn: throughput,
		replicationFactor: replication
	}));
	
	return (
		<div>
			<h1 className={title()}>Estimation</h1>
			<div className="w-[1200px] mx-auto h-[600px] flex items-center justify-center gap-8">
				{/* Parameter input panel */}
				<div className="flex flex-col gap-4 w-80 bg-white dark:bg-zinc-900 rounded-xl shadow p-6">
					<label className="flex flex-col text-left">
						<span className="font-medium mb-1">Amount of storage to move (GB)</span>
						<input type="number" className="input input-bordered" value={storage} onChange={e => setStorage(Number(e.target.value))} min={0} />
					</label>
					<label className="flex flex-col text-left">
						<span className="font-medium mb-1">Amount of brokers before</span>
						<input type="number" className="input input-bordered" value={brokersBefore} onChange={e => setBrokersBefore(Number(e.target.value))} min={1} />
					</label>
					<label className="flex flex-col text-left">
						<span className="font-medium mb-1">Cluster average inbound throughput (MB/s)</span>
						<input type="number" className="input input-bordered" value={throughput} onChange={e => setThroughput(Number(e.target.value))} min={1} />
					</label>
					<label className="flex flex-col text-left">
						<span className="font-medium mb-1">Amount of brokers after</span>
						<input type="number" className="input input-bordered" value={brokersAfter} onChange={e => setBrokersAfter(Number(e.target.value))} min={1} />
					</label>
					<label className="flex flex-col text-left">
						<span className="font-medium mb-1">Replication factor</span>
						<input type="number" className="input input-bordered" value={replication} onChange={e => setReplication(Number(e.target.value))} min={1} />
					</label>
				</div>
				{/* Graph panel */}
				<div className="flex-1 h-full min-w-0 flex">
					<div className="w-full h-full flex items-center justify-center">
						<Graph points={getDataPoints({
							totalStorageToMove: storage,
							totalBrokersAfter: brokersAfter,
							brokerReplicationThroughput: throughput*replication/brokersBefore,
							averageClusterThroughputIn: throughput,
							replicationFactor: replication
						}).map(({ throttle, duration }) => ({ x: throttle, y: duration }))} xLabel="Throttle (MB/s)" yLabel="Duration (hrs)" />
					</div>
				</div>
			</div>
		</div>
	);
}

