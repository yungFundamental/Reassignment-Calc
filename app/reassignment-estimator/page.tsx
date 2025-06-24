'use client';
import { title } from "@/components/primitives";
import Graph from "@/components/graph";
import { useState } from "react";
import getDataPoints from "../../logic/reassignment-graph";
import { NumberInput } from "@heroui/react";
import { Slider } from "@heroui/slider";
import { calculateMinimalThrottle, calculateReassignmentThrottle } from "@/logic/kafka";


const minInterval = 2;
const maxInterval = 50;

export default function EstimationPage() {
	const [storage, setStorage] = useState(1000);
	const [brokerReplicationThroughput, setBrokerReplicationThroughput] = useState(25);
	const [replication, setReplication] = useState(3);
	const [clusterInboundThroughput, setClusterInboundThroughput] = useState(100);
	const [brokersAfter, setBrokersAfter] = useState(6);
	const [throttleInterval, setThrottleInterval] = useState(10);
	const reassignmentParams = {
		totalStorageToMove: storage,
		totalBrokersAfter: brokersAfter,
		brokerReplicationThroughput,
		averageClusterThroughputIn: clusterInboundThroughput,
		replicationFactor: replication,
	};
	const [startThrottle, setStartThrottle] = useState(
		Math.ceil(calculateReassignmentThrottle({
			...reassignmentParams,
			duration: 3,
		}))
	);

	const minimalThrottle = calculateMinimalThrottle({...reassignmentParams});

	return (
		<>
			<h1 className={title()}>Estimation</h1>
			<div className="max-w-6xl w-full mx-auto h-[70vh] flex items-center justify-center gap-8">
				{/* Parameter input panel */}
				<div className="flex flex-col gap-4 w-80 bg-white dark:bg-zinc-900 rounded-xl shadow p-6">
					<label className="flex flex-col text-left">
						<NumberInput size="lg" className="input input-bordered" label="Storage to move (GB)" value={storage} onValueChange={setStorage} min={0} />
					</label>
					<label className="flex flex-col text-left">
						<NumberInput size="lg" className="input input-bordered" label="Broker replication throughput" value={brokerReplicationThroughput} onValueChange={setBrokerReplicationThroughput} min={1} />
					</label>
					<label className="flex flex-col text-left">
						<NumberInput size="lg" className="input input-bordered" label="Cluster throughput in (MB/s)" value={clusterInboundThroughput} onValueChange={setClusterInboundThroughput} min={1} />
					</label>
					<label className="flex flex-col text-left">
							<NumberInput size="lg" className="input input-bordered" label="Brokers count" value={brokersAfter} onValueChange={setBrokersAfter} min={1} />
					</label>
					<label className="flex flex-col text-left">
						<NumberInput size="lg" className="input input-bordered" label="Replication factor" value={replication} onValueChange={setReplication} min={1} enterKeyHint="done" />
					</label>
					<div className="flex flex-col gap-2">
						<Slider
							label="Zoom"
							value={(maxInterval + minInterval - throttleInterval) / maxInterval}
							onChange={value => {setThrottleInterval(maxInterval + minInterval - (Array.isArray(value) ? value[0] : value) * maxInterval)}}
							minValue={minInterval/maxInterval}
							maxValue={1}
							step={1/maxInterval}
							className="w-full"
							hideValue
						/>
					</div>
				</div>
				{/* Graph panel */}
				<div className="flex-1 h-full min-w-0 flex">
					<div className="w-full h-full flex flex-col items-center justify-center">
						<Graph points={getDataPoints({
							totalStorageToMove: storage,
							totalBrokersAfter: brokersAfter,
							brokerReplicationThroughput,
							averageClusterThroughputIn: clusterInboundThroughput,
							replicationFactor: replication,
							throttleStep: throttleInterval,
							startThrottle,
						}).map(({ throttle, duration }) => ({ x: throttle, y: duration }))} xLabel="Throttle (MB/s)" yLabel="Duration (hrs)" />
						<div className="w-full mt-4">
							<Slider
								label="Placement"
								value={startThrottle}
								onChange={value => {setStartThrottle(Array.isArray(value) ? value[0] : value)}}
								minValue={minimalThrottle}
								maxValue={minimalThrottle + 1000}
								step={1}
								className="w-full"
								hideValue
							/>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

