import { IKafkaConfig } from './kafka';
import { EachMessageHandler } from 'kafkajs';
export interface ISubscriberConfig extends IKafkaConfig {
}
export interface ISubscriberStartFn {
    (topic: string, groupId: string, msgHandler: EachMessageHandler): Promise<void>;
}
export interface ISubscriberEventHandler extends EachMessageHandler {
}
