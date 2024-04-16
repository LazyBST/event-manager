export interface IKafkaConfig {
    clientId: string;
    brokers: string[];
    ssl?: boolean;
    sasl?: {
        mechanism: 'scram-sha-512';
        username: string;
        password: string;
    } | {
        mechanism: 'scram-sha-256';
        username: string;
        password: string;
    };
}
export interface IKafkaEvent<IEvent> {
    kfHeader?: Record<string, any>;
    event: IEvent;
}
