import { EachMessageHandler } from 'kafkajs'
import { KafkaClient } from '../service/kafka.service'
import { ISubscriberConfig, ISubscriberStartFn } from '../interface/subscriber'

export class Subscriber {
  kafkaClient: KafkaClient

  constructor(config: ISubscriberConfig) {
    this.kafkaClient = new KafkaClient(config)
  }

  start: ISubscriberStartFn = async (
    topic: string,
    groupId: string,
    msgHandler: EachMessageHandler
  ) => {
    await this.kafkaClient.initConsumer(topic, groupId, msgHandler)
  }

  disconnect = async () => {
    await this.kafkaClient.disconnect()
  }
}
