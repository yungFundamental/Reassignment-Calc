import { calculateReassignmentDuration, ReassignmentParams } from "../../logic/kafka";

type DataPoint = { throttle: number; duration: number };

type GetDataPointsParams = Omit<ReassignmentParams, "replicationThrottle">;

const getDataPoints = (params: GetDataPointsParams): DataPoint[] => {
  const { brokerReplicationThroughput } = params;
  const range: number[] = Array.from({ length: 11 }, (_, i) => brokerReplicationThroughput + 10 + i * 10);
  const dataPoints: DataPoint[] = range.map((throttle) => {
    const duration = calculateReassignmentDuration({
      ...params,
      replicationThrottle: throttle,
    });
    return { throttle, duration };
  });
  return dataPoints;
};

console.log("getDataPoints", getDataPoints({
  totalStorageToMove: 1000,
  totalBrokersAfter: 6,
  brokerReplicationThroughput: 100,
  averageClusterThroughputIn: 100,
  replicationFactor: 3,
}));

export default getDataPoints;
