import { IKafkaConfig, IKafkaEvent } from '../interface/kafka';
export declare class Emitter {
    private kafkaClient;
    constructor(config: IKafkaConfig);
    emitEvents: <IEvent>(kfTopic: string, events: IKafkaEvent<IEvent>[]) => Promise<void>;
    disconnect: () => Promise<void>;
}
