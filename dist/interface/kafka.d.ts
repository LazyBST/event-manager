export interface IKafkaConfig {
    clientId: string;
    brokers: string[];
    ssl?: boolean;
    credentials?: {
        mechanism: 'scram-sha-256' | 'scram-sha-512';
        username: string;
        password: string;
    };
}
