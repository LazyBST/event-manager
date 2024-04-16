import { isEmpty } from 'lodash'
import { KafkaClient } from '../service/kafka.service'
import { IKafkaConfig, IKafkaEvent } from '../interface/kafka'

export class Emitter {
  private kafkaClient: KafkaClient

  constructor(config: IKafkaConfig) {
    this.kafkaClient = new KafkaClient(config)
  }

  emitEvents = async <IEvent>(
    kfTopic: string,
    events: IKafkaEvent<IEvent>[]
  ) => {
    try {
      if (isEmpty(kfTopic)) {
        throw new Error('invalid kafka topic :: ' + kfTopic)
      }

      const stringifiedEvents = events.map((event) => {
        const kfHeader = event?.kfHeader
        let header

        if (!isEmpty(kfHeader)) {
          header = JSON.stringify(kfHeader)
          delete event?.kfHeader
        }

        return {
          msg: JSON.stringify(event),
          header,
        }
      })
      const kafkaEvents = stringifiedEvents.map(({ msg, header }) => ({
        value: msg,
        header,
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
