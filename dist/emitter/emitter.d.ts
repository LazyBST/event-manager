import { IKafkaConfig } from '../interface/kafka';
export declare class Emitter {
    private kafkaClient;
    constructor(config: IKafkaConfig);
    emitEvents: <IEvent>(kfTopic: string, events: IEvent[]) => Promise<void>;
}
