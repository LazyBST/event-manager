import { Consumer, Kafka, Producer, Message, EachMessageHandler } from 'kafkajs';
import { IKafkaConfig } from '../interface/kafka';
export declare class KafkaClient {
    kafkaClient: Kafka;
    consumer: Consumer | null;
    producer: Producer | null;
    constructor(config: IKafkaConfig);
    private getProducer;
    initConsumer: (topic: string, groupId: string, msgHandler: EachMessageHandler) => Promise<void>;
    emitEventsToTopic: (topic: string, messages: Message[]) => Promise<void>;
    disconnect: () => Promise<void>;
}
