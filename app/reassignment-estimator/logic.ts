import { calculateReassignmentDuration, ReassignmentParams, calculateReassignmentThrottle} from "../../logic/kafka";

type DataPoint = { throttle: number; duration: number };

type GetDataPointsParams = Omit<ReassignmentParams, "replicationThrottle">;

const getDataPoints = (params: GetDataPointsParams): DataPoint[] => {

  const minThrottle = Math.ceil(calculateReassignmentThrottle({ duration: 3, ...params }));
  const range: number[] = Array.from({ length: params.numOfPoints }, (_, i) => minThrottle + i * 10);
  const dataPoints: DataPoint[] = range.map((throttle) => {
    const duration = calculateReassignmentDuration({
      ...params,
      replicationThrottle: throttle,
    });
    return { throttle, duration };
  });
  return dataPoints;
};

export default getDataPoints;
