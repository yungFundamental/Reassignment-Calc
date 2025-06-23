'use client';
import { title } from "@/components/primitives";
import Graph from "@/components/graph";
import { useState } from "react";
import getDataPoints from "./logic";
import { Slider } from "@heroui/slider";

export default function EstimationPage() {
	const [storage, setStorage] = useState(1000);
	const [brokerReplicationThroughput, setBrokerReplicationThroughput] = useState(25);
	const [replication, setReplication] = useState(3);
	const [clusterInboundThroughput, setClusterInboundThroughput] = useState(100);
	const [brokersAfter, setBrokersAfter] = useState(6);
	const [numOfPoints, setNumOfPoints] = useState(10);
	
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
						<span className="font-medium mb-1">Amount of broker replication throughput</span>
						<input type="number" className="input input-bordered" value={brokerReplicationThroughput} onChange={e => setBrokerReplicationThroughput(Number(e.target.value))} min={1} />
					</label>
					<label className="flex flex-col text-left">
						<span className="font-medium mb-1">Cluster average inbound throughput (MB/s)</span>
						<input type="number" className="input input-bordered" value={clusterInboundThroughput} onChange={e => setClusterInboundThroughput(Number(e.target.value))} min={1} />
					</label>
					<label className="flex flex-col text-left">
						<span className="font-medium mb-1">Amount of brokers after</span>
						<input type="number" className="input input-bordered" value={brokersAfter} onChange={e => setBrokersAfter(Number(e.target.value))} min={1} />
					</label>
					<label className="flex flex-col text-left">
						<span className="font-medium mb-1">Replication factor</span>
						<input type="number" className="input input-bordered" value={replication} onChange={e => setReplication(Number(e.target.value))} min={1} />
					</label>
					<div className="flex flex-col gap-2">
						<span className="font-medium">Number of data points</span>
						<Slider
							value={numOfPoints}
							onChange={value => setNumOfPoints(Array.isArray(value) ? value[0] : value)}
							minValue={10}
							maxValue={100}
							step={10}
							className="w-full"
							showSteps
						/>
					</div>
				</div>
				{/* Graph panel */}
				<div className="flex-1 h-full min-w-0 flex">
					<div className="w-full h-full flex items-center justify-center">
						<Graph points={getDataPoints({
							totalStorageToMove: storage,
							totalBrokersAfter: brokersAfter,
							brokerReplicationThroughput,
							averageClusterThroughputIn: clusterInboundThroughput,
							replicationFactor: replication,
							numOfPoints,
						}).map(({ throttle, duration }) => ({ x: throttle, y: duration }))} xLabel="Throttle (MB/s)" yLabel="Duration (hrs)" />
					</div>
				</div>
			</div>
		</div>
	);
}

