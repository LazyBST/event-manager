import { isEmpty } from 'lodash'
import { KafkaClient } from '../service/kafka.service'
import { IKafkaConfig } from '../interface/kafka'

export class Emitter {
  private kafkaClient: KafkaClient

  constructor(config: IKafkaConfig) {
    this.kafkaClient = new KafkaClient(config)
  }

  emitEvents = async <IEvent>(kfTopic: string, events: IEvent[]) => {
    try {
      if (isEmpty(kfTopic)) {
        throw new Error('invalid kafka topic :: ' + kfTopic)
      }

      const stringifiedEvents = events.map((event) => JSON.stringify(event))
      const kafkaEvents = stringifiedEvents.map((event) => ({
        value: event,
      }))

      await this.kafkaClient.emitEventsToTopic(kfTopic, kafkaEvents)
    } catch (err) {
      throw new Error(`unable to emit event :: ${err}`)
    }
  }

  disconnect = async () => {
    await this.kafkaClient.disconnect()
  }
}
