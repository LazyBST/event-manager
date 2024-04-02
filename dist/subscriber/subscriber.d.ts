import { KafkaClient } from '../service/kafka.service';
import { ISubscriberConfig, ISubscriberStartFn } from '../interface/subscriber';
export declare class Subscriber {
    kafkaClient: KafkaClient;
    constructor(config: ISubscriberConfig);
    start: ISubscriberStartFn;
    disconnect: () => Promise<void>;
}
