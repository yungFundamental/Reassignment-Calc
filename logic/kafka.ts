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
// TODO - Responsive graph
// TODO How to calculate data points
