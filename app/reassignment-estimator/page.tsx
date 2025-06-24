'use client';
import { title } from "@/components/primitives";
import Graph from "@/components/graph";
import { useState } from "react";
import getDataPoints from "../../logic/reassignment-graph";
import { NumberInput } from "@heroui/react";


export default function EstimationPage() {
	const [storage, setStorage] = useState(1000);
	const [brokerReplicationThroughput, setBrokerReplicationThroughput] = useState(25);
	const [replication, setReplication] = useState(3);
	const [clusterInboundThroughput, setClusterInboundThroughput] = useState(100);
	const [brokersAfter, setBrokersAfter] = useState(6);
	
	return (
		<>
			<h1 className={title()}>Estimation</h1>
			<div className="max-w-6xl w-full mx-auto h-[70vh] flex items-center justify-center gap-8">
				{/* Parameter input panel */}
				<div className="flex flex-col gap-4 w-80 bg-white dark:bg-zinc-900 rounded-xl shadow p-6">
					<label className="flex flex-col text-left">
						<NumberInput size="lg" className="input input-bordered" label="Amount of storage to move (GB)" value={storage} onValueChange={setStorage} min={0} />
					</label>
					<label className="flex flex-col text-left">
						<NumberInput size="lg" className="input input-bordered" label="Amount of broker replication throughput" value={brokerReplicationThroughput} onValueChange={setBrokerReplicationThroughput} min={1} />
					</label>
					<label className="flex flex-col text-left">
						<NumberInput size="lg" className="input input-bordered" label="Cluster average inbound throughput (MB/s)" value={clusterInboundThroughput} onValueChange={setClusterInboundThroughput} min={1} />
					</label>
					<label className="flex flex-col text-left">
							<NumberInput size="lg" className="input input-bordered" label="Broker count" value={brokersAfter} onValueChange={setBrokersAfter} min={1} />
					</label>
					<label className="flex flex-col text-left">
						<NumberInput size="lg" className="input input-bordered" label="Replication factor" value={replication} onValueChange={setReplication} min={1} enterKeyHint="done" />
					</label>
				</div>
				{/* Graph panel */}
				<div className="flex-1 h-full min-w-0 flex">
					<div className="w-full h-full flex items-center justify-center">
						<Graph points={getDataPoints({
							totalStorageToMove: storage,
							totalBrokersAfter: brokersAfter,
							brokerReplicationThroughput,
							averageClusterThroughputIn: clusterInboundThroughput,
							replicationFactor: replication
						}).map(({ throttle, duration }) => ({ x: throttle, y: duration }))} xLabel="Throttle (MB/s)" yLabel="Duration (hrs)" />
					</div>
				</div>
			</div>
		</>
	);
}

