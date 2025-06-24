import { calculateReassignmentDuration, ReassignmentParams, calculateReassignmentThrottle} from "./kafka";

type DataPoint = { throttle: number; duration: number };

type GetDataPointsParams = Omit<ReassignmentParams, "replicationThrottle"> & {
  throttleStep?: number;
  startThrottle?: number;
};

const getDataPoints = (params: GetDataPointsParams): DataPoint[] => {
  const { throttleStep = 10, ...reassignmentParams } = params;
  const minThrottle = Math.ceil(calculateReassignmentThrottle({duration: 3, ...reassignmentParams}));
  const startThrottle = params.startThrottle === undefined || params.startThrottle < minThrottle ? minThrottle : params.startThrottle;
  const range: number[] = Array.from({ length: 11 }, (_, i) => startThrottle + i * throttleStep);
  const dataPoints: DataPoint[] = range.map((throttle) => {
    const duration = calculateReassignmentDuration({
      ...reassignmentParams,
      replicationThrottle: throttle,
    });
    return { throttle, duration };
  });
  return dataPoints;
};

export default getDataPoints;
