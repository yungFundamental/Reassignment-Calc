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
    return brokerReplicationThroughput + (((totalStorageToMove / duration) + (averageClusterThroughputIn * replicationFactor)) / totalBrokersAfter);
};
