export type ReassignmentParams = {
    totalStorageToMove: number;
    totalBrokersAfter: number;
    brokerReplicationThroughput: number;
    averageClusterThroughputIn: number;
    replicationFactor: number;
    replicationThrottle: number;
};

export const calculateReassignmentDuration = ({
    totalStorageToMove,
    totalBrokersAfter,
    brokerReplicationThroughput,
    averageClusterThroughputIn,
    replicationFactor,
    replicationThrottle,
}: ReassignmentParams): number => {
    return totalStorageToMove /
        ((replicationThrottle - brokerReplicationThroughput) * totalBrokersAfter -
            (averageClusterThroughputIn * replicationFactor));
};


export const calculateReassignmentThrottle = ({
    totalStorageToMove,
    totalBrokersAfter,
    brokerReplicationThroughput,
    averageClusterThroughputIn,
    replicationFactor,
    duration,
}: Omit<ReassignmentParams, "replicationThrottle"> & { duration: number }): number => {
    // Rearranged from duration = totalStorageToMove / ((throttle - brokerReplicationThroughput) * totalBrokersAfter - (averageClusterThroughputIn * replicationFactor))
    // Solve for throttle:
    // duration * ((throttle - brokerReplicationThroughput) * totalBrokersAfter - (averageClusterThroughputIn * replicationFactor)) = totalStorageToMove
    // (throttle - brokerReplicationThroughput) * totalBrokersAfter = (totalStorageToMove / duration) + (averageClusterThroughputIn * replicationFactor)
    // throttle - brokerReplicationThroughput = ((totalStorageToMove / duration) + (averageClusterThroughputIn * replicationFactor)) / totalBrokersAfter
    // throttle = brokerReplicationThroughput + (((totalStorageToMove / duration) + (averageClusterThroughputIn * replicationFactor)) / totalBrokersAfter)
    return brokerReplicationThroughput + (((totalStorageToMove / duration) + (averageClusterThroughputIn * replicationFactor)) / totalBrokersAfter);
};
// TODO How to calculate data points
