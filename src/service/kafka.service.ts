import { Consumer, Kafka, Producer, Message, EachMessageHandler } from 'kafkajs'
import { isNil } from 'lodash'
import { IKafkaConfig } from '../interface/kafka'

export class KafkaClient {
  kafkaClient: Kafka

  consumer: Consumer | null = null

  producer: Producer | null = null

  constructor(config: IKafkaConfig) {
    const kafka = new Kafka(config)
    this.kafkaClient = kafka
  }

  private getProducer = async (): Promise<Producer> => {
    if (isNil(this.producer)) {
      const kafka = this.kafkaClient
      const producer = kafka.producer()
      await producer.connect()
      this.producer = producer
    }

    return this.producer
  }

  initConsumer = async (
    topic: string,
    groupId: string,
    msgHandler: EachMessageHandler
  ) => {
    const kafka = this.kafkaClient
    const consumer = kafka.consumer({ groupId })
    await consumer.connect()
    this.consumer = consumer

    await consumer.subscribe({ topic })
    await consumer.run({
      eachMessage: msgHandler,
    })
  }

  emitEventsToTopic = async (topic: string, messages: Message[]) => {
    const producer = await this.getProducer()
    await producer.send({
      topic,
      messages,
    })
  }

  disconnect = async () => {
    await this.producer?.disconnect()
    await this.consumer?.disconnect()
  }
}
